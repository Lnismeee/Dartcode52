import { useEffect, useRef, useState } from "react";
import SectionDeco from "./SectionDeco";

const AUTOPLAY_MS = 1500;

// Người bật chế độ giảm chuyển động thì không tự chạy, để họ tự bấm
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Gallery({ photos, text }) {
  // Ảnh nào tải lỗi thì bỏ hẳn, tránh hiện icon ảnh vỡ trên thiệp cưới
  const [failed, setFailed] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(prefersReducedMotion);

  const visible = photos.filter((photo) => !failed[photo.src]);
  const count = visible.length;

  // Ảnh đang chọn có thể bị loại giữa chừng nên phải kẹp lại chỉ số
  const safeIndex = count > 0 ? Math.min(activeIndex, count - 1) : 0;
  const targetSrc = count > 0 ? visible[safeIndex].src : null;

  /* Hai lớp ảnh chồng nhau: lớp đang hiện và lớp cũ đang mờ dần.
     Chỉ đổi sau khi ảnh mới GIẢI MÃ XONG, nhờ vậy không có khoảnh khắc trống. */
  const [shown, setShown] = useState({ src: targetSrc, prev: null });
  const shownSrc = shown.src;

  useEffect(() => {
    if (!targetSrc || targetSrc === shownSrc) return;

    let cancelled = false;
    const loader = new Image();
    loader.src = targetSrc;

    const swap = () => {
      if (!cancelled) setShown({ src: targetSrc, prev: shownSrc });
    };

    // decode() báo ảnh đã sẵn sàng vẽ, chứ onload chỉ báo tải xong
    if (typeof loader.decode === "function") {
      loader.decode().then(swap, swap);
    } else {
      loader.onload = swap;
      loader.onerror = swap;
    }

    return () => {
      cancelled = true;
    };
  }, [targetSrc, shownSrc]);

  /* Tải sẵn ảnh kế tiếp để cú đổi sau diễn ra tức thì.
     Ở nhịp 2 giây mà đợi tải mới đổi thì sẽ bị giật. */
  const preloadRef = useRef(null);
  useEffect(() => {
    if (count < 2) return;
    const next = visible[(safeIndex + 1) % count];
    if (!next) return;
    const img = new Image();
    img.src = next.src;
    preloadRef.current = img;
  }, [safeIndex, count, visible]);

  /* Tự chuyển ảnh. Đặt safeIndex vào danh sách phụ thuộc nên mỗi lần đổi ảnh
     - dù tự động hay do bấm tay - đồng hồ đều đếm lại từ đầu. */
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;

    const timer = setTimeout(
      () => setActiveIndex((index) => (index + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [safeIndex, paused, reducedMotion, count]);

  // Chưa có ảnh nào thì ẩn hẳn phần album
  if (count === 0) return null;

  const active = visible[safeIndex];
  const markFailed = (src) => setFailed((prev) => ({ ...prev, [src]: true }));
  const autoplayOn = !reducedMotion && count > 1;

  return (
    <section className="section gallery">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>

      {/* Rê chuột hay tab vào đây thì dừng tự chuyển, để khách ngắm kỹ một tấm */}
      <div
        className="gallery__viewer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <figure className="gallery__feature">
          {shown.prev && (
            <img
              key={shown.prev}
              className="gallery__layer gallery__layer--out"
              src={shown.prev}
              alt=""
              aria-hidden="true"
              onAnimationEnd={() =>
                setShown((prev) => ({ ...prev, prev: null }))
              }
            />
          )}

          <img
            key={shown.src}
            className="gallery__layer gallery__layer--in"
            src={shown.src}
            alt={active.alt}
            onError={() => markFailed(shown.src)}
          />

          {autoplayOn && (
            <span
              key={`${safeIndex}-${paused}`}
              className={`gallery__progress${paused ? " is-paused" : ""}`}
              aria-hidden="true"
            />
          )}
        </figure>

        {count > 1 && (
          <div
            className="gallery__strip"
            role="tablist"
            aria-label={text.title}
          >
            {visible.map((photo, index) => (
              <button
                type="button"
                key={photo.src}
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={photo.alt}
                className={`gallery__thumb${index === safeIndex ? " is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  onError={() => markFailed(photo.src)}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
