import { useEffect, useRef } from "react";

export default function Waveform({
  waveformUrl,
  samples = 100,
  position = 0,
  duration = 1,
  onSeek,
}) {
  const canvasRef = useRef(null);
  const dataRef = useRef([]);

  // the generic draw routine
  const draw = () => {
    const data = dataRef.current;
    if (!data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 1) measure CSS size
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    // 2) backstore for HiDPI
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    // 3) reset any prior transforms, then scale
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // 4) clear & draw
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const barWidth = cssWidth / samples;
    const playedBars = Math.floor((position / duration) * samples);

    data.forEach((val, i) => {
      const x = i * barWidth;
      const barH = val * cssHeight;

      // dark for “played”, gray for “up next”
      ctx.fillStyle = i < playedBars ? "#1B1212" : "#ccc";
      ctx.fillRect(x, cssHeight - barH, barWidth * 0.8, barH);
    });
  };

  // fetch & preprocess JSON once per URL
  useEffect(() => {
    if (!waveformUrl) return;
    fetch(waveformUrl)
      .then((r) => r.json())
      .then((raw) => {
        // down-sample
        const blockSize = Math.floor(raw.length / samples);
        const filtered = Array.from({ length: samples }, (_, i) => {
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(raw[i * blockSize + j]);
          }
          return sum / blockSize;
        });

        // normalize
        const mx = Math.max(...filtered, 1);
        dataRef.current = filtered.map((n) => n / mx);

        // initial draw
        draw();
      })
      .catch(console.error);
  }, [waveformUrl, samples]);

  // re-draw as playhead moves
  useEffect(() => {
    draw();
  }, [position, duration]);

  // clicking on canvas seeks
  useEffect(() => {
    if (!onSeek) return;
    const c = canvasRef.current;
    const handler = (e) => {
      const { left, width } = c.getBoundingClientRect();
      const x = e.clientX - left;
      const pct = Math.max(0, Math.min(1, x / width));
      onSeek(pct * duration * 1000);
    };
    c.addEventListener("click", handler);
    return () => c.removeEventListener("click", handler);
  }, [duration, onSeek]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-10 cursor-pointer"
      aria-label="Waveform"
    />
  );
}
