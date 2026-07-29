import fs from 'node:fs'
import path from 'node:path'
import type {
  WonderlandEvent,
  WonderlandEventContent,
  WonderlandPageContent,
} from '../data/contentTypes'

const SITE_URL = 'https://www.boyoscollective.nl'
const EVENTS_DIRECTORY = path.join(
  process.cwd(),
  'data',
  'wonderland-events'
)

const formatEventDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid Wonderland event date: ${date}`)
  }

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(parsedDate)
    .replace(',', '')
}

export const resolveWonderlandEvent = (
  slug: string,
  content: WonderlandEventContent
): WonderlandEvent => {
  const [, month, day] = content.date.split('-')
  const href = `/wonderland/${slug}` as const
  const locationLabel = `${content.venueName}, ${content.address.addressLocality}`

  return {
    ...content,
    slug,
    href,
    canonical: `${SITE_URL}${href}`,
    dateLabel: formatEventDate(content.date),
    dateShort: `${day}.${month}`,
    dateDay: String(Number(day)),
    locationLabel,
    tickerItems: [
      'Boyos Wonderland',
      formatEventDate(content.date),
      `${content.venueName} ${content.address.addressLocality}`,
      content.detailsLabel,
    ],
  }
}

export const getWonderlandEventBySlug = (
  slug: string
): WonderlandEvent | null => {
  const filePath = path.join(EVENTS_DIRECTORY, `${slug}.json`)

  if (!fs.existsSync(filePath)) return null

  const content = JSON.parse(
    fs.readFileSync(filePath, 'utf8')
  ) as WonderlandEventContent

  return resolveWonderlandEvent(slug, content)
}

export const getAllWonderlandEvents = (): WonderlandEvent[] =>
  fs
    .readdirSync(EVENTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) =>
      getWonderlandEventBySlug(fileName.replace(/\.json$/, ''))
    )
    .filter((event): event is WonderlandEvent => event !== null)
    .sort((a, b) => a.date.localeCompare(b.date))

export const getCurrentWonderlandEvent = (
  page: Pick<WonderlandPageContent, 'currentEventSlug'>
): WonderlandEvent => {
  const event = getWonderlandEventBySlug(page.currentEventSlug)

  if (!event) {
    throw new Error(
      `Unknown current Wonderland event: ${page.currentEventSlug}`
    )
  }

  return event
}
