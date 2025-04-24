// components/Waveform.js
import { useEffect, useRef, useCallback } from 'react'

export default function Waveform({
  waveformUrl,
  samples = 100,
  position = 0,
  duration = 1,
  onSeek,
}) {
  const canvasRef = useRef(null)
  const dataRef = useRef([]) // normalized bar heights
  const dimsRef = useRef({}) // { cssWidth, cssHeight, dpr }

  // draw routine
  const drawFrame = useCallback(() => {
    const data = dataRef.current
    const { cssWidth, cssHeight } = dimsRef.current
    if (!data.length || !cssWidth || !cssHeight) return

    const c = canvasRef.current
    const ctx = c.getContext('2d')

    // clear in CSS-pixel coords
    ctx.clearRect(0, 0, cssWidth, cssHeight)

    const barW = cssWidth / samples
    const playedBar = Math.floor((position / duration) * samples)

    data.forEach((val, i) => {
      const x = i * barW
      const h = val * cssHeight
      ctx.fillStyle = i < playedBar ? '#60B5C2' : '#1B1212'
      ctx.fillRect(x, cssHeight - h, barW * 0.8, h)
    })
  }, [position, duration, samples])

  // 1️⃣ load + preprocess JSON once per URL
  useEffect(() => {
    if (!waveformUrl) return
    fetch(waveformUrl)
      .then((r) => r.json())
      .then((raw) => {
        const arr = raw.samples
        if (!Array.isArray(arr)) throw new Error('Invalid waveform data')
        // down-sample
        const block = Math.floor(arr.length / samples)
        const filt = Array.from({ length: samples }, (_, i) => {
          let sum = 0
          for (let j = 0; j < block; j++) sum += Math.abs(arr[i * block + j])
          return sum / block
        })
        // normalize
        const max = Math.max(...filt, 1)
        dataRef.current = filt.map((n) => n / max)

        // initial draw (dimensions will come from ResizeObserver)
        drawFrame()
      })
      .catch(console.error)
  }, [waveformUrl, samples, drawFrame])

  // 2️⃣ observe size changes and re-size canvas
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: cssWidth, height: cssHeight } = entry.contentRect
        const dpr = window.devicePixelRatio || 1
        dimsRef.current = { cssWidth, cssHeight, dpr }

        const ctx = c.getContext('2d')
        c.width = cssWidth * dpr
        c.height = cssHeight * dpr
        ctx.scale(dpr, dpr)

        drawFrame()
      }
    })
    ro.observe(c)
    return () => ro.disconnect()
  }, [drawFrame])

  // 3️⃣ redraw whenever position changes
  useEffect(() => {
    if (dataRef.current.length) drawFrame()
  }, [position, drawFrame])

  // 4️⃣ click → seek
  useEffect(() => {
    if (!onSeek) return
    const c = canvasRef.current
    const handler = (e) => {
      const { left, width } = c.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (e.clientX - left) / width))
      onSeek(pct * duration) // ← no *1000 here
    }
    c.addEventListener('click', handler)
    return () => c.removeEventListener('click', handler)
  }, [duration, onSeek])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer block"
      aria-label="Waveform"
    />
  )
}
