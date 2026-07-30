import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'
import clubUpContent from '../data/wonderland-events/club-up-september-2026.json'
import homeContent from '../data/home.json'
import summerJamContent from '../data/summerJam.json'
import wonderlandContent from '../data/wonderland.json'

type DecapField = {
  name: string
  widget: string
  fields?: DecapField[]
  [key: string]: unknown
}

type DecapCollection = {
  name: string
  folder?: string
  create?: boolean
  format?: string
  fields?: DecapField[]
  files?: {
    name: string
    fields: DecapField[]
  }[]
}

const config = yaml.load(
  fs.readFileSync(
    path.join(process.cwd(), 'public/admin/config.yml'),
    'utf8'
  )
) as { collections: DecapCollection[] }

const eventCollection = config.collections.find(
  (collection) => collection.name === 'wonderland_events'
)
const siteContent = config.collections.find(
  (collection) => collection.name === 'site_content'
)
const wonderlandFile = siteContent?.files?.find(
  (file) => file.name === 'wonderland'
)
const homeFile = siteContent?.files?.find((file) => file.name === 'home')
const summerJamFile = siteContent?.files?.find(
  (file) => file.name === 'summer_jam'
)

const missingFieldPaths = (
  value: unknown,
  fields: DecapField[] = [],
  prefix = ''
): string[] => {
  if (!value || typeof value !== 'object') return []

  if (Array.isArray(value)) {
    return value.length > 0
      ? missingFieldPaths(value[0], fields, `${prefix}[]`)
      : []
  }

  const fieldMap = new Map(fields.map((field) => [field.name, field]))

  return Object.entries(value).flatMap(([key, nestedValue]) => {
    const field = fieldMap.get(key)
    const fieldPath = prefix ? `${prefix}.${key}` : key

    if (!field) return [fieldPath]

    return missingFieldPaths(
      nestedValue,
      field.fields,
      fieldPath
    )
  })
}

describe('Decap Wonderland event model', () => {
  it('defines a creatable JSON folder collection', () => {
    expect(eventCollection).toEqual(
      expect.objectContaining({
        folder: 'data/wonderland-events',
        create: true,
        format: 'json',
      })
    )
  })

  it('represents every stored Club UP field in Decap', () => {
    expect(
      missingFieldPaths(clubUpContent, eventCollection?.fields)
    ).toEqual([])
  })

  it('exposes venue identity and optional event images to editors', () => {
    const venueUrlField = eventCollection?.fields?.find(
      (field) => field.name === 'venueUrl'
    )
    const imagesField = eventCollection?.fields?.find(
      (field) => field.name === 'images'
    )

    expect(venueUrlField).toEqual(
      expect.objectContaining({ widget: 'string' })
    )
    expect(imagesField).toEqual(
      expect.objectContaining({
        widget: 'object',
        required: false,
      })
    )
    expect(imagesField?.fields?.map((field) => field.name)).toEqual([
      'landscape16x9',
      'landscape4x3',
      'square',
    ])
  })

  it('represents the changed page content in Decap', () => {
    expect(missingFieldPaths(homeContent, homeFile?.fields)).toEqual([])
    expect(
      missingFieldPaths(wonderlandContent, wonderlandFile?.fields)
    ).toEqual([])
    expect(
      missingFieldPaths(summerJamContent, summerJamFile?.fields)
    ).toEqual([])
  })

  it('selects the current event through the event relation', () => {
    const currentEventField = wonderlandFile?.fields.find(
      (field) => field.name === 'currentEventSlug'
    )

    expect(currentEventField).toEqual(
      expect.objectContaining({
        widget: 'relation',
        collection: 'wonderland_events',
        value_field: '{{slug}}',
      })
    )
  })
})
