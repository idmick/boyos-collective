'use client'
export default function ClientVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/images/optimized/boyos-wonderland-mini-fest-at-2200.jpg"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src="/videos/wonderland_fest_24.mp4" type="video/mp4" />
    </video>
  )
}
