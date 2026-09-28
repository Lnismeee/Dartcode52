import { useEffect, useMemo, useState } from 'react'
import { CO_MAY_CHU } from '../config'
import { layLoiChuc } from '../api'
import SectionDeco from './SectionDeco'

function WishesWall({ text, refreshKey, loiChucVuaGui }) {
  const [wishes, setWishes] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!CO_MAY_CHU) return
    let cancelled = false

    // Apps Script chỉ trả tên + lời chúc, không trả trạng thái tham dự hay
    // số khách - đó là dữ liệu ai mở thiệp cũng đọc được.
    layLoiChuc()
      .then((data) => {
        if (cancelled) return
        setWishes(data.slice().reverse())
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  /* Lời chúc người dùng vừa gửi được ghép lên đầu danh sách ngay, không chờ
     đọc lại từ bảng tính. Hai lý do:

     - Google Sheets ghi xong tới lúc đọc lại thấy có độ trễ. Chờ đọc lại thì
       người gửi bấm xong nhìn xuống chưa thấy đâu, tưởng hỏng.
     - Nếu lần đọc lại lỗi mạng, lời chúc vừa gửi sẽ biến mất khỏi màn hình
       dù thực tế đã lưu thành công.

     Khi bản đọc lại về mà đã có dòng đó rồi thì bỏ bản ghép tay đi, tránh
     hiện hai lần. */
  const danhSach = useMemo(() => {
    if (!loiChucVuaGui) return wishes
    const daCo = wishes.some(
      (w) => String(w.id) === String(loiChucVuaGui.id),
    )
    return daCo ? wishes : [loiChucVuaGui, ...wishes]
  }, [wishes, loiChucVuaGui])

  // Chưa khai báo máy chủ -> ẩn hẳn.
  // Gọi lỗi cũng ẩn, TRỪ KHI người dùng vừa gửi lời chúc thành công: lúc đó
  // phải cho họ thấy lời chúc của mình, không bày cái mục trống rỗng.
  if (!CO_MAY_CHU) return null
  if (status === 'error' && !loiChucVuaGui) return null

  const countLabel = danhSach.length === 1 ? text.countOne : text.countMany
  const daTai = status === 'ready' || danhSach.length > 0

  return (
    <section className="section wishes">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>
      <p className="wishes__subtitle">
        {daTai && danhSach.length > 0
          ? `${danhSach.length} ${countLabel}`
          : text.subtitle}
      </p>

      {status === 'ready' && danhSach.length === 0 && (
        <p className="wishes__empty">{text.empty}</p>
      )}

      {danhSach.length > 0 && (
        <div
          className="wishes__grid"
          role="region"
          aria-label={text.title}
          tabIndex={0}
        >
          {danhSach.map((wish, i) => {
            const laCuaMinh =
              loiChucVuaGui && String(wish.id) === String(loiChucVuaGui.id)

            return (
              <article
                className={`wishes__card${laCuaMinh ? ' wishes__card--moi' : ''}`}
                key={wish.id}
                style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
              >
                <span className="wishes__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="wishes__message">{wish.message}</p>
                <p className="wishes__name">{wish.name}</p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default WishesWall
