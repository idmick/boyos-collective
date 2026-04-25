import { useEffect, useRef, useState, useCallback } from 'react'
import Waveform from './Waveform'

export default function RadioPlayer({
  channels = [
    {
      name: 'Essential Groove Radio (Default)',
      url: 'https://soundcloud.com/boyos_soundsystem/sets/essential-groove',
    },
  ],
  onPlayStateChange = () => {},
}) {
  if (!Array.isArray(channels) || channels.length === 0) {
    return (
      <div className="p-4 text-center text-[var(--color-surface-paper)]">
        No channels provided
      </div>
    )
  }

  const shuffleArray = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  const iframeRef = useRef(null)
  const widgetRef = useRef(null)

  const [channelIndex, setChannelIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [tracks, setTracks] = useState([])
  const [waveformUrl, setWaveformUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(1)
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentArtist, setCurrentArtist] = useState('–')
  const [currentTitle, setCurrentTitle] = useState('–')
  const [trackUrl, setTrackUrl] = useState('')
  const selectorId = 'radio-channel-selector'
  const dropdownId = 'radio-channel-dropdown'

  useEffect(() => {
    if (typeof onPlayStateChange === 'function') {
      onPlayStateChange(isPlaying)
    }
  }, [isPlaying, onPlayStateChange])

  // 1) instantiate SC.Widget once
  useEffect(() => {
    if (!iframeRef.current || !window.SC) return
    const widget = window.SC.Widget(iframeRef.current)
    widgetRef.current = widget

    // READY → populate tracks / duration / waveform
    widget.bind(window.SC.Widget.Events.READY, () => {
      setTrackIndex(0)
      setPosition(0)
      widget.getSounds((list) => {
        setTracks(list)
        widget.getCurrentSound((s) => {
          setWaveformUrl(s ? s.waveform_url : '')
          setCurrentArtist(s ? s.user?.username : '–')
          setCurrentTitle(s ? s.title : '–')
          setTrackUrl(s ? s.permalink_url : '')
        })
      })
      widget.getDuration((d) => setDuration(d))
    })

    // PLAY → update play state / current track / waveform
    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true)
      widget.getCurrentSoundIndex((i) => setTrackIndex(i))
      widget.getCurrentSound((s) => {
        setWaveformUrl(s ? s.waveform_url : '')
        setCurrentArtist(s ? s.user?.username : '–')
        setCurrentTitle(s ? s.title : '–')
        setTrackUrl(s ? s.permalink_url : '')
      })
    })

    widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false))
    widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, ({ currentPosition }) =>
      setPosition(currentPosition)
    )

    // Loop to first track when finished
    widget.bind(window.SC.Widget.Events.FINISH, () => {
      widget.skip(0)
      widget.play()
    })

    return () => {
      // Only unbind if the iframe is still in the DOM and widgetRef is valid
      if (
        widgetRef.current &&
        widgetRef.current.options &&
        widgetRef.current.options.iframe &&
        document.body.contains(widgetRef.current.options.iframe)
      ) {
        widgetRef.current.unbind()
      }
      widgetRef.current = null
    }
  }, [])

  // 2) whenever channelIndex changes, reload that playlist
  useEffect(() => {
    const widget = widgetRef.current
    const { url } = channels[channelIndex]
    if (!widget || !url) return

    widget.load(url, {
      show_artwork: false,
      visual: false,
      callback: () => {
        setPosition(0)
        setTrackIndex(0)
        setIsPlaying(false)

        widget.getSounds((list) => {
          setTracks(list)
          // Pick a random index from the original list
          const randomIndex = Math.floor(Math.random() * list.length)
          widget.skip(randomIndex)
          // Do NOT set track info here!
        })
        widget.getDuration((d) => setDuration(d))
        if (isPlaying) widget.play()
      },
    })
  }, [channelIndex])

  // playback controls
  const togglePlay = useCallback(() => {
    widgetRef.current?.toggle()
  }, [])
  const nextTrack = useCallback(() => {
    const w = widgetRef.current
    if (!w) return
    if (trackIndex === tracks.length - 1) {
      w.skip(0)
      w.play()
    } else {
      w.next()
    }
  }, [trackIndex, tracks.length])

  const prevTrack = useCallback(() => {
    const w = widgetRef.current
    if (!w) return
    if (trackIndex === 0) {
      w.skip(tracks.length - 1)
      w.play()
    } else {
      w.prev()
    }
  }, [trackIndex, tracks.length])

  const seekTo = useCallback(
    (ms) => {
      const w = widgetRef.current
      if (!w) return
      w.seekTo(Math.max(0, Math.min(ms, duration)))
    },
    [duration]
  )

  // formatter for mm:ss or hh:mm:ss
  const fmt = (ms) => {
    const t = Math.floor(ms / 1000)
    if (t >= 3600) {
      const h = String(Math.floor(t / 3600)).padStart(2, '0')
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0')
      const s = String(t % 60).padStart(2, '0')
      return `${h}:${m}:${s}`
    }
    const m = String(Math.floor(t / 60)).padStart(2, '0')
    const s = String(t % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const current = tracks[trackIndex] || { user: { username: '–' }, title: '–' }

  return (
    <>
      {/** hide the visual widget UI but keep the JS API alive */}

      <iframe
        ref={iframeRef}
        allow="autoplay"
        src={
          `https://w.soundcloud.com/player/?url=${encodeURIComponent(
            channels[channelIndex].url
          )}` +
          `&visual=false&hide_related=true` +
          `&show_comments=false&show_user=false&show_reposts=false` +
          `&single_active=true`
        }
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          border: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="type-body fixed bottom-0 left-0 right-0 z-[300] border-t border-[color:rgb(var(--color-border-subtle)/0.12)] bg-[#222019] px-3 py-3 text-[var(--color-surface-paper)] shadow-[0_-10px_40px_rgba(0,0,0,0.35)] md:px-5 md:py-[10px]">
        <div className="flex items-center gap-3 md:min-h-[56px]">
          <img
            src="/images/essential_groove.png"
            className={`h-11 w-11 shrink-0 self-start rounded-full object-contain md:self-center ${
              isPlaying ? 'animate-spin-vinyl' : ''
            }`}
            alt="Essential Groove Radio"
          />
          <div className="min-w-0 flex-1">
            {/* header bars + title */}
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
              <div className="min-w-0 flex-1">
                <div className="type-meta text-[var(--color-brand-secondary)]">
                  Essential Groove Radio
                </div>
                <div className="type-body mt-1 flex min-w-0 flex-wrap gap-1 text-xs leading-5 text-[color:rgb(var(--color-surface-paper-rgb)/0.62)]">
                  {trackUrl ? (
                    <a
                      href={trackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-full truncate transition hover:text-[var(--color-brand-primary)]"
                      title="Open track on SoundCloud"
                    >
                      {currentArtist} – {currentTitle}
                    </a>
                  ) : (
                    <>
                      <span className="font-semibold">{currentArtist}</span>
                      <span>–</span>
                      <span className="truncate">{currentTitle}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="relative w-full md:w-auto md:self-center">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="type-control inline-flex w-full items-center justify-between rounded border border-[color:rgb(var(--color-border-subtle)/0.16)] px-3 py-2 text-[color:rgb(var(--color-surface-paper-rgb)/0.55)] transition hover:border-[var(--color-brand-secondary)] hover:text-[var(--color-brand-secondary)] md:w-auto md:justify-center md:px-2 md:py-0.5"
                  aria-label="Select channel"
                  aria-expanded={dropdownOpen}
                  aria-controls={dropdownId}
                  aria-haspopup="true"
                  id={selectorId}
                >
                  <span className="truncate">
                    Channel: {channels[channelIndex].name}
                  </span>
                  <span className="ml-2 shrink-0">
                    {dropdownOpen ? '↓' : '↑'}
                  </span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute bottom-[calc(100%+12px)] left-0 right-0 z-10 overflow-hidden rounded-lg border border-[color:rgb(var(--color-border-subtle)/0.16)] bg-[#2a2520] shadow-[0_-8px_30px_rgba(0,0,0,0.5)] md:left-auto md:right-0 md:min-w-[260px]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={selectorId}
                    id={dropdownId}
                  >
                    <ul className="type-body max-h-56 w-full list-none overflow-auto text-sm">
                      {channels.map((ch, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setChannelIndex(i)
                            setDropdownOpen(false)
                          }}
                          className={`cursor-pointer border-b border-[color:rgb(var(--color-border-subtle)/0.06)] px-4 py-3 text-[color:rgb(var(--color-surface-paper-rgb)/0.62)] transition hover:bg-white/5 hover:text-[var(--color-surface-paper)] ${
                            i === channelIndex
                              ? 'text-[var(--color-brand-secondary)]'
                              : ''
                          }`}
                          style={{ overflowAnchor: 'none' }}
                        >
                          {ch.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls + Waveform */}
          <div className="flex shrink-0 gap-2 self-end text-[var(--color-surface-paper)] md:self-center">
            <div className="flex items-center">
              <button
                onClick={prevTrack}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-l-md border border-[color:rgb(var(--color-border-subtle)/0.18)] transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {' '}
                  <polygon points="19 20 9 12 19 4 19 20" />{' '}
                  <line x1="5" y1="19" x2="5" y2="5" />
                </svg>
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-9 w-10 items-center justify-center border-y border-[color:rgb(var(--color-border-subtle)/0.18)] transition hover:bg-[var(--color-brand-primary)]"
              >
                {isPlaying ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <rect x="6" y="4" width="4" height="16" />{' '}
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              <button
                onClick={nextTrack}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-r-md border border-[color:rgb(var(--color-border-subtle)/0.18)] transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {' '}
                  <polygon points="5 4 15 12 5 20 5 4" />{' '}
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </button>
            </div>

            {/* our animated + clickable waveform */}
            <div className="hidden h-8 w-56 max-h-8 md:block">
              <Waveform
                waveformUrl={waveformUrl}
                samples={120}
                position={position}
                duration={duration}
                isPlaying={isPlaying}
                onSeek={seekTo}
              />
            </div>
            <div className="type-meta hidden w-24 text-[color:rgb(var(--color-surface-paper-rgb)/0.36)] lg:block">
              {fmt(position)} / {fmt(duration)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
