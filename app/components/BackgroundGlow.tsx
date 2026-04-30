export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* main glow blobs */}
      <div className="absolute -top-28 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[rgb(var(--accent-1)/0.16)] blur-3xl sm:h-[760px] sm:w-[760px]" />
      <div className="absolute top-[45vh] left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[rgb(var(--accent-2)/0.12)] blur-3xl sm:h-[820px] sm:w-[820px]" />

      {/* subtle vignette / depth */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.06)_0%,rgba(255,255,255,0)_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />
    </div>
  );
}

