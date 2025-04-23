"use client";
export default function ClientVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src="/videos/wonderland_fest_24.mp4" type="video/mp4" />
      <img
        src="/images/Boyos Wonderland-093.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
        aria-hidden="true"
      />
    </video>
  );
}
