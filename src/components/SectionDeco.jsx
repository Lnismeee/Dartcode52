function SectionDeco() {
  return (
    <div className="deco" aria-hidden="true">
      <svg className="deco__svg" viewBox="0 0 140 52" role="presentation">
        <defs>
          <linearGradient id="decoCloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b9d8ee" />
          </linearGradient>
        </defs>

        <g className="deco__cloud" fill="url(#decoCloud)">
          <ellipse cx="56" cy="20" rx="14" ry="11" />
          <ellipse cx="71" cy="15" rx="17" ry="13" />
          <ellipse cx="86" cy="21" rx="13" ry="10" />
          <rect x="54" y="20" width="34" height="10" rx="5" />
        </g>

        <path
          className="deco__wave deco__wave--1"
          d="M22 40 q11 -6 22 0 t22 0 t22 0 t22 0"
          fill="none"
          stroke="#7fb0d4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="deco__wave deco__wave--2"
          d="M38 47 q9 -5 18 0 t18 0 t18 0"
          fill="none"
          stroke="#b9d8ee"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default SectionDeco
