/* Đôi nhẫn - cùng hình với favicon, nhưng nét rỗng để đặt trên nền sáng.
   Dùng currentColor nên đổi màu bằng thuộc tính color của thẻ cha. */
function RingsMark({ className = '' }) {
  return (
    <svg
      className={`rings-mark ${className}`.trim()}
      viewBox="6 8 52 36"
      aria-hidden="true"
      role="presentation"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="24" cy="26" r="15" opacity="0.75" />
        <circle cx="40" cy="26" r="15" />
        <path d="M34.6 15.4 A15 15 0 0 0 26.6 11.2" opacity="0.75" />
      </g>
    </svg>
  )
}

export default RingsMark
