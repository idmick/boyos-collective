import { useEffect, useRef, useState, useCallback } from "react";
import Waveform from "./Waveform";

export default function RadioPlayer({
  playlistUrl = "https://api.soundcloud.com/playlists/XXXX",
}) {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  const [tracks, setTracks] = useState([]);
  const [waveformUrl, setWaveform] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [index, setIndex] = useState(0);

  // init SC widget & bind events
  useEffect(() => {
    const el = iframeRef.current;
    if (!el || !window.SC) return;
    const widget = window.SC.Widget(el);
    widgetRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      widget.getSounds((list) => {
        setTracks(list);
        widget.getCurrentSound((s) => setWaveform(s.waveform_url));
      });
      widget.getDuration((d) => setDuration(d));
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
      widget.getCurrentSoundIndex((i) => setIndex(i));
      widget.getCurrentSound((s) => setWaveform(s.waveform_url));
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
    widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, ({ currentPosition }) =>
      setPosition(currentPosition)
    );

    return () => widget.unbind();
  }, [playlistUrl]);

  // control handlers
  const togglePlay = useCallback(() => widgetRef.current?.toggle(), []);
  const nextTrack = useCallback(() => widgetRef.current?.next(), []);
  const prevTrack = useCallback(() => widgetRef.current?.prev(), []);
  const seekTo = useCallback((ms) => widgetRef.current?.seekTo(ms), []);

  // simple mm:ss formatter
  const fmt = (ms) => {
    const total = Math.floor(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const current = tracks[index] || { user: { username: "–" }, title: "–" };

  return (
    <>
      {/** hide the visual widget UI but keep the JS API alive */}
      <iframe
        ref={iframeRef}
        src={
          `https://w.soundcloud.com/player/?url=${encodeURIComponent(
            playlistUrl
          )}` +
          `&visual=false` +
          `&hide_related=true&show_comments=false&show_user=false&show_reposts=false&single_active=true`
        }
        width="1"
        height="1"
        allow="autoplay"
        className="pointer-events-none opacity-0"
      />

      <div className="fixed max-w-[500px] bottom-0 left-0 right-0 m-auto z-50 bg-pink-300 p-4 shadow-lg border-[#1B1212] border font-[Moret]">
        {/* header bars + title */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-[1px] w-full bg-[#1B1212]" />
            <div className="h-[1px] w-full bg-[#1B1212]" />
            <div className="h-[1px] w-full bg-[#1B1212]" />
          </div>
          <div className="whitespace-nowrap text-[#1B1212] text-lg font-semibold">
            Essential Groove Radio
          </div>
        </div>

        {/* Meta */}
        <div className="mt-2 flex gap-2">
          <span className="font-bold">Channel:</span>
          <span className="font-light">Essential Groove Radio</span>
        </div>
        <div className="mt-1">
          {fmt(position)} / {fmt(duration)}
        </div>
        <div className="mt-1 flex gap-1 truncate">
          <span className="font-bold">{current.user.username}</span>
          <span>–</span>
          <span className="truncate">{current.title}</span>
        </div>

        {/* Controls + Waveform */}
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              aria-label="Previous"
              className="px-3 py-1 border-[#1B1212] border"
            >
              ◀◀
            </button>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="px-3 py-1 border-t border-b border-[#1B1212]"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              onClick={nextTrack}
              aria-label="Next"
              className="px-3 py-1 border-[#1B1212] border"
            >
              ▶▶
            </button>
          </div>

          {/* our animated + clickable waveform */}
          <div className="flex-1">
            <Waveform
              waveformUrl={waveformUrl}
              samples={120}
              position={position}
              duration={duration}
              onSeek={seekTo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
