import { useMemo } from 'react'

/* Bong bóng nổi từ đáy lên đỉnh màn hình.

   Dùng số nguyên tố cùng nhau (37, 23) khi rải vị trí và thời gian, nhờ vậy
   các bong bóng không rơi vào cùng một cột hay cùng một nhịp - nếu dùng bội
   số chung thì chúng xếp thành hàng lối rất lộ. */
function Bubbles({ count = 14, className = '' }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 22 + ((i * 23) % 7) * 11
        const duration = 16 + ((i * 13) % 9) * 2.5
        return {
          left: `${(i * 37 + 6) % 94}%`,
          width: `${size}px`,
          height: `${size}px`,
          // Bong bóng to nổi chậm hơn cho giống thật
          animationDuration: `${duration}s`,
          // Delay âm để lúc mở trang đã có sẵn bong bóng giữa đường, không phải chờ
          animationDelay: `${-((i * duration) / count).toFixed(1)}s`,
        }
      }),
    [count],
  )

  return (
    <div className={`bubbles ${className}`.trim()} aria-hidden="true">
      {bubbles.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  )
}

export default Bubbles
