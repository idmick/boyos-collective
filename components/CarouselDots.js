export default function CarouselDots({ total, current, onDotClick }) {
  if (total <= 6) {
    return (
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? 'bg-[#8B008B]' : 'bg-gray-300'
            }`}
            aria-label={`Go to album ${idx + 1}`}
          />
        ))}
      </div>
    )
  }

  // Instagram-style logic
  let start = Math.max(0, Math.min(current - 2, total - 5))
  let end = Math.min(total, start + 5)
  let dots = []
  for (let i = start; i < end; i++) {
    dots.push(
      <button
        key={i}
        onClick={() => onDotClick(i)}
        className={`w-3 h-3 rounded-full transition ${
          i === current ? 'bg-[#8B008B]' : 'bg-gray-300'
        }`}
        aria-label={`Go to album ${i + 1}`}
      />
    )
  }
  if (end < total) {
    dots.push(
      <span
        key="more"
        className="w-2 h-2 rounded-full bg-gray-400 opacity-60 inline-block"
        aria-hidden="true"
      />
    )
  }
  return <div className="flex justify-center mt-4 gap-2">{dots}</div>
}
