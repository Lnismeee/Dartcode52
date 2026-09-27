/* Phong bì mở, hai tấm ảnh nhô lên khỏi miệng, niêm phong sáp hình trái tim.
   Xếp lớp từ sau ra trước: bóng đổ -> lòng phong bì -> ảnh -> mặt trước -> con dấu.

   Khối hình dựng bằng nhiều mảng sáng tối khác nhau thay vì một màu phẳng,
   nhờ vậy nhìn ra chất giấy có nếp gập chứ không như hình vẽ dán lên. */
function Envelope({ photos }) {
  const [first, second] = photos

  return (
    <div className="envelope" aria-hidden="true">
      <div className="envelope__stack">
        {/* Bóng đổ xuống nền, giúp phong bì có cảm giác đặt trên mặt phẳng */}
        <span className="envelope__shadow" />

        {/* Lòng phong bì - phải tối hơn mặt trước mới thấy chiều sâu */}
        <span className="envelope__pocket" />

        {first && (
          <img className="envelope__photo envelope__photo--a" src={first} alt="" />
        )}
        {second && (
          <img className="envelope__photo envelope__photo--b" src={second} alt="" />
        )}

        <svg className="envelope__front" viewBox="0 0 400 300" fill="none">
          <defs>
            {/* Mặt chính: sáng ở mép trên, thẫm dần xuống đáy */}
            <linearGradient id="envFace" x1="0.15" y1="0" x2="0.45" y2="1">
              <stop offset="0%" stopColor="var(--env-light)" />
              <stop offset="34%" stopColor="var(--env-mid)" />
              <stop offset="76%" stopColor="var(--env-dark)" />
              <stop offset="100%" stopColor="var(--env-deep)" />
            </linearGradient>

            {/* Hai vạt gập vào giữa, mỗi bên hứng sáng một kiểu */}
            <linearGradient id="envLeft" x1="0" y1="0" x2="1" y2="0.55">
              <stop offset="0%" stopColor="var(--env-deep)" />
              <stop offset="100%" stopColor="var(--env-mid)" />
            </linearGradient>
            <linearGradient id="envRight" x1="1" y1="0" x2="0" y2="0.55">
              <stop offset="0%" stopColor="var(--env-dark)" />
              <stop offset="100%" stopColor="var(--env-light)" />
            </linearGradient>

            {/* Vệt sáng chạy dọc mép gập, mạnh ở giữa nhạt dần hai đầu */}
            <linearGradient id="envEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
            </linearGradient>
          </defs>

          <path
            d="M14 126 L200 240 L386 126 L386 286 Q386 294 378 294 L22 294 Q14 294 14 286 Z"
            fill="url(#envFace)"
          />

          <path d="M14 126 L200 240 L14 292 Z" fill="url(#envLeft)" opacity="0.9" />
          <path d="M386 126 L200 240 L386 292 Z" fill="url(#envRight)" opacity="0.5" />

          {/* Cạnh gập: một vệt tối ngay dưới một vệt sáng, cho ra độ dày của giấy */}
          <path
            d="M16 129 L200 243 L384 129"
            stroke="rgba(18,44,66,0.38)"
            strokeWidth="1.6"
          />
          <path
            d="M14 126 L200 240 L386 126"
            stroke="url(#envEdge)"
            strokeWidth="2.6"
          />
        </svg>

        <span className="envelope__seal">
          <svg viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="sealBody" cx="0.35" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="var(--seal-inner)" />
                <stop offset="100%" stopColor="var(--seal-outer)" />
              </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="var(--seal-outer)" />
            <circle
              cx="24"
              cy="24"
              r="18"
              fill="url(#sealBody)"
              stroke="var(--seal-rim)"
              strokeWidth="1"
            />
            <path
              d="M24 33c-7-5-11-9-11-14a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 5-4 9-11 14Z"
              fill="var(--seal-heart)"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Envelope
