import { describe, expect, it } from 'vitest'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'

describe('Wonderland event selection', () => {
  it('throws when the configured current event slug does not exist', () => {
    expect(() =>
      getCurrentWonderlandEvent({
        currentEventSlug: 'does-not-exist',
      })
    ).toThrowError('Unknown current Wonderland event: does-not-exist')
  })
})
