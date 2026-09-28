import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/* Bam vao anh -> anh phong to tran man hinh.
   Ap dung cho moi anh trong thiep TRU phan album o giua, vi album da co
   cach xem rieng (bam thu nho de doi anh lon).

   Lop phu duoc dung bang createPortal thang ra <body>. Ly do: position fixed
   se neo vao phan tu to nhat co transform thay vi neo vao khung nhin, ma
   trong trang nay .reveal co transform luc cuon. Dat ngoai body thi khong
   con phan tu nao chen vao giua. */

const NgatCanhZoom = createContext(null)

export function PhotoZoomProvider({ children }) {
  // null = dang dong. Khi mo thi la { src, alt }
  const [anh, datAnh] = useState(null)
  const dong = useCallback(() => datAnh(null), [])

  useEffect(() => {
    if (!anh) return

    const nhanPhim = (e) => {
      if (e.key === 'Escape') dong()
    }
    window.addEventListener('keydown', nhanPhim)

    // Khoa cuon trang phia sau, khong thi ke ca khi dang xem anh to
    // nen van truot theo ngon tay.
    const cuonCu = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', nhanPhim)
      document.body.style.overflow = cuonCu
    }
  }, [anh, dong])

  return (
    <NgatCanhZoom.Provider value={datAnh}>
      {children}

      {anh &&
        createPortal(
          <div
            className="zoom"
            role="dialog"
            aria-modal="true"
            aria-label={anh.alt || 'Ảnh cưới'}
            onClick={dong}
          >
            <button
              type="button"
              className="zoom__close"
              onClick={dong}
              aria-label="Đóng"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6 L18 18 M18 6 L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Chan noi bot: bam vao chinh tam anh thi khong dong,
                chi bam ra vung toi xung quanh moi dong. */}
            <img
              className="zoom__img"
              src={anh.src}
              alt={anh.alt || ''}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </NgatCanhZoom.Provider>
  )
}

/* Dung y het the <img> thuong - moi thuoc tinh deu truyen thang xuong,
   nen khong lam vo bat ky quy tac CSS nao dang nham vao  ... img . */
export function AnhPhongTo({ src, alt = '', className = '', ...conLai }) {
  const moPhongTo = useContext(NgatCanhZoom)

  if (!moPhongTo) {
    // Dung ngoai provider thi cu la mot tam anh binh thuong
    return <img src={src} alt={alt} className={className} {...conLai} />
  }

  const mo = () => moPhongTo({ src, alt })

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} anh-phong-to`.trim()}
      role="button"
      tabIndex={0}
      onClick={mo}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          mo()
        }
      }}
      {...conLai}
    />
  )
}
