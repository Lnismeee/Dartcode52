/* Dải ruy băng uốn lượn trang trí nền, cho các phần nhiều khoảng trống.
   Vẽ bằng SVG nên co giãn theo khổ màn hình mà không vỡ nét.
   Đặt phía sau nội dung, không bắt sự kiện chuột. */
function Ribbons({ variant = 'a' }) {
  return (
    <div className={`ribbons ribbons--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 400 600" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={`ribbonFill-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue-soft)" stopOpacity="0.85" />
            <stop offset="55%" stopColor="var(--blue)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--blue-pale)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Dải lụa bản rộng, vắt chéo */}
        <path
          d="M-40 120 C 80 60, 150 200, 250 150 S 400 60, 470 130
             L470 178 C 400 112, 320 246, 250 198 S 80 112, -40 168 Z"
          fill={`url(#ribbonFill-${variant})`}
        />

        {/* Dải mảnh chạy song song, lệch nhịp */}
        <path
          d="M-40 300 C 90 250, 140 400, 250 340 S 390 250, 470 320"
          stroke="var(--blue)"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
        />
        <path
          d="M-40 330 C 90 280, 140 430, 250 370 S 390 280, 470 350"
          stroke="var(--blue-soft)"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          fill="none"
        />

        {/* Dải lụa thứ hai ở dưới */}
        <path
          d="M-40 470 C 100 420, 160 560, 260 500 S 400 420, 470 480
             L470 522 C 400 466, 330 600, 260 544 S 100 466, -40 512 Z"
          fill={`url(#ribbonFill-${variant})`}
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

export default Ribbons
