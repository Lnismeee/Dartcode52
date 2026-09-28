import { AnhPhongTo } from "./PhotoZoom"
/* Phong bì mở, hai tấm ảnh nhô lên khỏi miệng, niêm phong sáp hình trái tim.
   Xếp lớp từ sau ra trước: bóng đổ -> lòng phong bì -> ảnh -> mặt trước -> con dấu.

   Khối hình dựng bằng nhiều mảng sáng tối khác nhau thay vì một màu phẳng,
   nhờ vậy nhìn ra chất giấy có nếp gập chứ không như hình vẽ dán lên.

   VỀ NÉT VẼ: trước đây các mảng nối với nhau bằng đoạn thẳng L nên mọi góc
   đều nhọn hoắt, nhìn cứng như hình cắt giấy. Giờ đổi sang đường cong C/Q:
   bốn góc được bo, hai vạt gập võng xuống rất nhẹ, đáy chữ V bo tròn - đúng
   kiểu tờ giấy thật vốn không bao giờ thẳng tuyệt đối. */
function Envelope({ photos, photoAlt = "" }) {
  const [first, second] = photos

  // Khoi phong bi KHONG dat aria-hidden: hai tam anh ben trong bam duoc va bat
  // duoc tieu diem ban phim, ma phan tu an voi trinh doc man hinh lai chua thu
  // bam duoc thi la loi tiep can. Chi giau rieng cac manh trang tri.
  return (
    <div className="envelope">
      <div className="envelope__stack">
        {/* Bóng đổ xuống nền, giúp phong bì có cảm giác đặt trên mặt phẳng */}
        <span className="envelope__shadow" aria-hidden="true" />

        {/* Lòng phong bì - phải tối hơn mặt trước mới thấy chiều sâu */}
        <span className="envelope__pocket" aria-hidden="true" />

        {first && (
          <AnhPhongTo className="envelope__photo envelope__photo--a" src={first} alt={photoAlt} />
        )}
        {second && (
          <AnhPhongTo className="envelope__photo envelope__photo--b" src={second} alt={photoAlt} />
        )}

        <svg className="envelope__front" viewBox="0 0 400 300" fill="none" aria-hidden="true">
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

            {/* Vệt sáng chạy dọc mép gập. Trước để 0.8 nên trắng gắt như kẻ
                bút xoá; hạ xuống 0.42 và loe dần hai đầu cho mềm. */}
            <linearGradient id="envEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="22%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.42)" />
              <stop offset="78%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Quầng sáng dịu hắt lên mặt trước, phá thế phẳng lì */}
            <radialGradient id="envSheen" cx="0.32" cy="0.18" r="0.85">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Làm nhoè vệt tối dưới nếp gập: bóng giấy thật không có ranh
                giới sắc lẹm, nó tãi ra vài milimet. */}
            <filter id="envBlur" x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>

          {/* Mặt trước: bốn góc bo, đáy chữ V cong mềm */}
          <path
            d="M14 134
               Q14 126 22 126.5
               C90 172 145 206 196 236
               Q200 238.5 204 236
               C255 206 310 172 378 126.5
               Q386 126 386 134
               L386 282
               Q386 294 374 294
               L26 294
               Q14 294 14 282 Z"
            fill="url(#envFace)"
            strokeLinejoin="round"
          />

          {/* Hai vạt gập, mép ngoài võng xuống rất nhẹ như giấy chùng */}
          <path
            d="M14 134
               Q14 126 22 127
               C90 172 145 206 196 236
               Q200 239 196 242
               C140 264 80 280 24 292
               Q14 294 14 286 Z"
            fill="url(#envLeft)"
            opacity="0.88"
            strokeLinejoin="round"
          />
          <path
            d="M386 134
               Q386 126 378 127
               C310 172 255 206 204 236
               Q200 239 204 242
               C260 264 320 280 376 292
               Q386 294 386 286 Z"
            fill="url(#envRight)"
            opacity="0.48"
            strokeLinejoin="round"
          />

          {/* Quầng sáng phủ lên mặt trước */}
          <path
            d="M14 134
               Q14 126 22 126.5
               C90 172 145 206 196 236
               Q200 238.5 204 236
               C255 206 310 172 378 126.5
               Q386 126 386 134
               L386 282
               Q386 294 374 294
               L26 294
               Q14 294 14 282 Z"
            fill="url(#envSheen)"
          />

          {/* Cạnh gập: vệt tối nhoè nằm dưới vệt sáng dịu, cho ra độ dày giấy */}
          <path
            d="M16 131
               C90 176 146 209 198 239
               Q200 240.5 202 239
               C254 209 310 176 384 131"
            stroke="rgba(18,44,66,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#envBlur)"
          />
          <path
            d="M14 127
               C90 172 145 205 197 236
               Q200 238 203 236
               C255 205 310 172 386 127"
            stroke="url(#envEdge)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="envelope__seal" aria-hidden="true">
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
