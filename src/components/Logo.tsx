export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 64" className={className} aria-label="Sardine Run Africa" role="img">
      {/* Sardine mark: three fish forming a rising arc */}
      <g>
        <path
          d="M8 44c8-2 13-7 15-12-5-1-11 1-14 5-2 2-2 5-1 7Z"
          fill="#2ea3f2"
          opacity="0.85"
        />
        <path
          d="M18 34c9-3 15-9 17-15-6-1-13 2-16 7-2 3-2 6-1 8Z"
          fill="#4fb0f4"
        />
        <path
          d="M31 22c10-3 16-9 18-16-7-1-14 2-17 8-2 3-2 6-1 8Z"
          fill="#f15a2b"
        />
        <circle cx="12" cy="41" r="1.1" fill="#051724" />
        <circle cx="23" cy="30" r="1.1" fill="#051724" />
        <circle cx="36" cy="17" r="1.1" fill="#051724" />
      </g>
      <text
        x="60"
        y="30"
        fontFamily="var(--font-sora), sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="0.5"
        fill="currentColor"
      >
        SARDINE RUN
      </text>
      <text
        x="60"
        y="54"
        fontFamily="var(--font-sora), sans-serif"
        fontWeight="600"
        fontSize="19"
        letterSpacing="8.5"
        fill="#f15a2b"
      >
        AFRICA
      </text>
    </svg>
  );
}
