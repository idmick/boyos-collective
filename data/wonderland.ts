import wonderlandContent from './wonderland.json'
import summerJamContent from './summerJam.json'
import type {
  SummerJamContent,
  SummerJamEvent,
  SummerJamPage,
  WonderlandPage,
} from './contentTypes'

const wonderland = wonderlandContent as WonderlandPage
const summerJam = summerJamContent as SummerJamContent

/**
 * Wonderland and Summer Jam event data.
 * Editable fields live in wonderland.json and summerJam.json for Decap CMS.
 */
export const summerJamEvent: SummerJamEvent = summerJam.event

export const wonderlandPage: WonderlandPage = wonderland

export const summerJamPage: SummerJamPage = {
  event: summerJamEvent,
  ...summerJam.page,
}
