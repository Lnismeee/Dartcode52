import { useEffect, useState } from 'react'
import { CO_MAY_CHU } from '../config'
import { layLoiChuc } from '../api'
import SectionDeco from './SectionDeco'

function WishesWall({ text, refreshKey }) {
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

  // Chưa khai báo máy chủ, hoặc gọi lỗi -> ẩn hẳn, không bày lỗi ra thiệp cưới
  if (!CO_MAY_CHU || status === 'error') return null

  const countLabel = wishes.length === 1 ? text.countOne : text.countMany

  return (
    <section className="section wishes">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>
      <p className="wishes__subtitle">
        {status === 'ready' && wishes.length > 0
          ? `${wishes.length} ${countLabel}`
          : text.subtitle}
      </p>

      {status === 'ready' && wishes.length === 0 && (
        <p className="wishes__empty">{text.empty}</p>
      )}

      {wishes.length > 0 && (
        <div
          className="wishes__grid"
          role="region"
          aria-label={text.title}
          tabIndex={0}
        >
          {wishes.map((wish, i) => (
            <article
              className="wishes__card"
              key={wish.id}
              style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
            >
              <span className="wishes__quote" aria-hidden="true">
                &ldquo;
              </span>
              <p className="wishes__message">{wish.message}</p>
              <p className="wishes__name">{wish.name}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default WishesWall
