import wonderlandContent from './wonderland.json'
import summerJamContent from './summerJam.json'
import type {
  SummerJamContent,
  SummerJamEvent,
  SummerJamPage,
  WonderlandPageContent,
} from './contentTypes'

const wonderland = wonderlandContent as WonderlandPageContent
const summerJam = summerJamContent as SummerJamContent

/**
 * Wonderland and Summer Jam event data.
 * Editable fields live in wonderland.json and summerJam.json for Decap CMS.
 */
export const summerJamEvent: SummerJamEvent = summerJam.event

export const wonderlandPageContent: WonderlandPageContent = wonderland

export const summerJamPage: SummerJamPage = {
  event: summerJamEvent,
  ...summerJam.page,
}
