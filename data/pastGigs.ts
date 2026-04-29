import pastGigsJson from './PastGigs.json'
import type { PastGig } from './contentTypes'

export const pastGigs = (pastGigsJson.pastGigs ?? []) as PastGig[]

export const getPastGigVenues = () => {
  const seen = new Set<string>()

  return pastGigs
    .map((gig) => gig.venue?.trim())
    .filter((venue): venue is string => Boolean(venue))
    .filter((venue) => {
      if (seen.has(venue)) return false
      seen.add(venue)
      return true
    })
}

export const getVisiblePastGigs = (
  gigs: PastGig[],
  showAll = false,
  initialCount = 18
) => (showAll ? gigs : gigs.slice(0, initialCount))
