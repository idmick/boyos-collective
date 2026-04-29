import homeContent from './home.json'
import { getPastGigVenues } from './pastGigs'
import { summerJamEvent } from './wonderland'
import type { HomeContent, HomePage } from './contentTypes'

const content = homeContent as HomeContent

/**
 * Homepage content consumed by pages/index.js.
 * Editable fields live in home.json for Decap CMS.
 */
export const homePage: HomePage = {
  ...content,
  playedAt: getPastGigVenues(),
  nextEvent: summerJamEvent,
}
