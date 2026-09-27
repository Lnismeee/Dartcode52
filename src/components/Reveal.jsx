import { useEffect, useRef, useState } from 'react'

/* Bọc quanh một phần nội dung để nó trôi vào khi cuộn tới.
   from: 'up' | 'left' | 'right' - hướng trượt vào.
   Chỉ chạy một lần rồi ngắt observer.

   KHÔNG dùng bộ đếm thời gian làm lưới an toàn: lúc trang vừa tải, ảnh chưa
   xong nên mọi phần còn dồn sát nhau ở đầu trang, bộ đếm sẽ tưởng nhầm là đã
   cuộn tới và bật hiện hết. IntersectionObserver tự báo lại khi tab từ ẩn
   chuyển sang hiện, nên không cần lưới an toàn. */
function Reveal({ children, from = 'up' }) {
  const ref = useRef(null)
  // Trình duyệt cũ không có IntersectionObserver thì hiện luôn, không giấu nội dung
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0,
        // Thu đáy khung nhìn lại 18%: phần nội dung phải nhô lên qua mốc đó
        // mới coi là đã cuộn tới, nhờ vậy hiệu ứng chạy đúng lúc mắt nhìn vào.
        rootMargin: '0px 0px -18% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${from}${shown ? ' is-shown' : ''}`}
    >
      {children}
    </div>
  )
}

export default Reveal
