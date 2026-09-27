import { useEffect, useRef, useState } from 'react'

/* Nhạc nền. Thả một file .mp3 bất kỳ vào  src/assets/nhac/
   Không có file thì nút tự ẩn, không báo lỗi ra thiệp.

   Trình duyệt chặn phát tiếng khi trang vừa tải, nên nhạc chỉ bắt đầu
   lúc khách bấm "Mở Thiệp" - đó mới là cú chạm hợp lệ. Nếu vẫn bị chặn,
   nút vẫn hiện để khách tự bấm. */
function MusicToggle({ track, active, text }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    if (!active || !track) return
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    )
  }, [active, track])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      )
    }
  }

  if (!track || !available) return null

  return (
    <>
      <audio
        ref={audioRef}
        src={track}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />

      <button
        type="button"
        className={`music${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? text.pause : text.play}
        title={playing ? text.pause : text.play}
      >
        <span className="music__bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </button>
    </>
  )
}

export default MusicToggle
