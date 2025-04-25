import { useEffect, useRef, useState, useCallback } from "react";
import Waveform from "./Waveform";

export default function RadioPlayer({
  channels = [
    {
      name: "Essential Groove Radio (Default)",
      url: "https://soundcloud.com/boyos_soundsystem/sets/essential-groove",
    },
  ],
}) {
  if (!Array.isArray(channels) || channels.length === 0) {
    return <div className="p-4 text-center">No channels provided</div>;
  }

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  const [channelIndex, setChannelIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [waveformUrl, setWaveformUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentArtist, setCurrentArtist] = useState("–");
  const [currentTitle, setCurrentTitle] = useState("–");
  const [trackUrl, setTrackUrl] = useState("");

  // 1) instantiate SC.Widget once
  useEffect(() => {
    if (!iframeRef.current || !window.SC) return;
    const widget = window.SC.Widget(iframeRef.current);
    widgetRef.current = widget;

    // READY → populate tracks / duration / waveform
    widget.bind(window.SC.Widget.Events.READY, () => {
      setTrackIndex(0);
      setPosition(0);
      widget.getSounds((list) => {
        setTracks(list);
        widget.getCurrentSound((s) => {
          setWaveformUrl(s ? s.waveform_url : "");
          setCurrentArtist(s ? s.user?.username : "–");
          setCurrentTitle(s ? s.title : "–");
          setTrackUrl(s ? s.permalink_url : "");
        });
      });
      widget.getDuration((d) => setDuration(d));
    });

    // PLAY → update play state / current track / waveform
    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
      widget.getCurrentSoundIndex((i) => setTrackIndex(i));
      widget.getCurrentSound((s) => {
        setWaveformUrl(s ? s.waveform_url : "");
        setCurrentArtist(s ? s.user?.username : "–");
        setCurrentTitle(s ? s.title : "–");
        setTrackUrl(s ? s.permalink_url : "");
      });
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
    widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, ({ currentPosition }) =>
      setPosition(currentPosition)
    );

    // Loop to first track when finished
    widget.bind(window.SC.Widget.Events.FINISH, () => {
      widget.skip(0);
      widget.play();
    });

    return () => {
      // Only unbind if the iframe is still in the DOM and widgetRef is valid
      if (
        widgetRef.current &&
        widgetRef.current.options &&
        widgetRef.current.options.iframe &&
        document.body.contains(widgetRef.current.options.iframe)
      ) {
        widgetRef.current.unbind();
      }
      widgetRef.current = null;
    };
  }, []);

  // 2) whenever channelIndex changes, reload that playlist
  useEffect(() => {
    const widget = widgetRef.current;
    const { url } = channels[channelIndex];
    if (!widget || !url) return;

    widget.load(url, {
      show_artwork: false,
      visual: false,
      callback: () => {
        setPosition(0);
        setTrackIndex(0);
        setIsPlaying(false);

        widget.getSounds((list) => {
          setTracks(list);
          // Pick a random index from the original list
          const randomIndex = Math.floor(Math.random() * list.length);
          widget.skip(randomIndex);
          // Do NOT set track info here!
        });
        widget.getDuration((d) => setDuration(d));
        if (isPlaying) widget.play();
      },
    });
  }, [channelIndex]);

  // playback controls
  const togglePlay = useCallback(() => {
    widgetRef.current?.toggle();
  }, []);
  const nextTrack = useCallback(() => {
    const w = widgetRef.current;
    if (!w) return;
    if (trackIndex === tracks.length - 1) {
      w.skip(0);
      w.play();
    } else {
      w.next();
    }
  }, [trackIndex, tracks.length]);

  const prevTrack = useCallback(() => {
    const w = widgetRef.current;
    if (!w) return;
    if (trackIndex === 0) {
      w.skip(tracks.length - 1);
      w.play();
    } else {
      w.prev();
    }
  }, [trackIndex, tracks.length]);

  const seekTo = useCallback(
    (ms) => {
      const w = widgetRef.current;
      if (!w) return;
      w.seekTo(Math.max(0, Math.min(ms, duration)));
    },
    [duration]
  );

  // formatter for mm:ss or hh:mm:ss
  const fmt = (ms) => {
    const t = Math.floor(ms / 1000);
    if (t >= 3600) {
      const h = String(Math.floor(t / 3600)).padStart(2, "0");
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
      const s = String(t % 60).padStart(2, "0");
      return `${h}:${m}:${s}`;
    }
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const current = tracks[trackIndex] || { user: { username: "–" }, title: "–" };

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
          position: "absolute",
          width: 0,
          height: 0,
          border: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <div className="fixed max-w-[500px] bottom-0 left-0 right-0 m-auto z-50 bg-[#adadad] p-2 shadow-lg border-[#1B1212] border font-[moret]">
        {/* header bars + title */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <div
              className={`h-[1px] w-full bg-[#1B1212] ${
                isPlaying ? "animate-vibrate-bars" : ""
              }`}
            />
            <div
              className={`h-[1px] w-full bg-[#1B1212] ${
                isPlaying ? "animate-vibrate-bars" : ""
              }`}
            />
            <div
              className={`h-[1px] w-full bg-[#1B1212] ${
                isPlaying ? "animate-vibrate-bars" : ""
              }`}
            />
          </div>
          <div className="whitespace-nowrap text-[#1B1212] text-lg font-semibold">
            Essential Groove Radio
          </div>
        </div>

        <img
          src="/images/essential_groove.png"
          className={`absolute w-24 h-auto z-60 bottom-42 right-2 transition-transform ${
            isPlaying ? "animate-spin-vinyl" : ""
          }`}
          alt="Essential Groove logo"
        />

        {/* Meta */}
        <div className="relative text-left">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="inline-flex justify-between w-full items-center hover:underline cursor-pointer"
            aria-label="Select channel"
            aria-expanded={dropdownOpen}
            aria-controls="channel-dropdown"
            aria-haspopup="true"
            id="channel-dropdown"
          >
            <div className="flex gap-2">
              <span className="font-bold">Channel:</span>
              <span>{channels[channelIndex].name}</span>
            </div>
            <svg
              className={`h-6 w-6 text-[#1B1212] transition-transform duration-200 ${
                dropdownOpen ? "" : "rotate-180"
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M18 15l-6-6l-6 6h12" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="absolute z-10 mt-1 w-full overflow-hidden border"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="channel-dropdown"
            >
              <ul
                className="overflow-auto [&::-webkit-scrollbar]:w-4
                      [&::-webkit-scrollbar-track]:bg-[#adadad]
                      [&::-webkit-scrollbar-thumb]:bg-[#c4c4c4]
                      scrollbar-track-bordered 
                      scrollbar-thumb-bordered
                      list-none text-s bg-[#c4c4c4] w-full max-h-22"
              >
                {channels.map((ch, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setChannelIndex(i);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer border-b-1 hover:font-bold"
                    style={{ overflowAnchor: "none" }}
                  >
                    {ch.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="">
          {fmt(position)} / {fmt(duration)}
        </div>
        <div className="flex gap-1 truncate">
          {trackUrl ? (
            <a
              href={trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:text-blue-700 transition truncate"
              title="Open track on SoundCloud"
            >
              {currentArtist} – {currentTitle}
            </a>
          ) : (
            <>
              <span className="font-bold">{currentArtist}</span>
              <span>–</span>
              <span className="truncate">{currentTitle}</span>
            </>
          )}
        </div>

        {/* Controls + Waveform */}
        <div className="flex items-baseline mt-2 gap-2">
          <div className="flex items-center text-[#1B1212]">
            <button
              onClick={prevTrack}
              aria-label="Previous"
              className="px-3 py-1 border-[#1B1212] border"
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
                {" "}
                <polygon points="19 20 9 12 19 4 19 20" />{" "}
                <line x1="5" y1="19" x2="5" y2="5" />
              </svg>
            </button>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="px-3 py-1 border-t border-b border-[#1B1212]"
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
                  {" "}
                  <rect x="6" y="4" width="4" height="16" />{" "}
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
                  {" "}
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <button
              onClick={nextTrack}
              aria-label="Next"
              className="px-3 py-1 border-[#1B1212] border"
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
                {" "}
                <polygon points="5 4 15 12 5 20 5 4" />{" "}
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>
          </div>

          {/* our animated + clickable waveform */}
          <div className="flex-1 h-8 max-h-8">
            <Waveform
              waveformUrl={waveformUrl}
              samples={120}
              position={position}
              duration={duration}
              isPlaying={isPlaying}
              onSeek={seekTo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
