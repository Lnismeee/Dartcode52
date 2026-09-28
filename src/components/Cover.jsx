import RingsMark from './RingsMark'

/* Hai kiểu bìa:
   - Có ảnh cưới  -> ảnh tràn màn hình, tên và ngày đè lên phía dưới
   - Chưa có ảnh  -> khung kính mờ trên nền xanh như trước */
/* Mot mui ten cong co dau nhon. Ban ben phai dung chung hinh ve nay, chi lat
   nguoc lai bang scaleX(-1) trong CSS nen khong phai ve them duong dan rieng. */
function MuiTen({ ben }) {
  return (
    <svg
      className={`cover__arrow cover__arrow--${ben}`}
      viewBox="0 0 96 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 64 C18 50 34 34 62 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 1 0"
      />
      <path
        d="M62 22 L46 22 M62 22 L60 38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Cover({ groom, bride, dateLabel, text, photo, onOpen }) {
  if (photo) {
    return (
      <div className="cover cover--photo">

        {/* Điện thoại: khung này tràn kín màn hình.
            Máy tính: co lại thành khung ảnh dọc đặt giữa, vì màn hình nằm ngang
            mà ảnh cưới lại dọc, để tràn thì bị cắt mất đầu và chân. */}
        <div className="cover__photo-card">
          <img className="cover__photo" src={photo} alt="" />
          {/* Lớp tối dần từ giữa xuống đáy để chữ trắng luôn đọc được,
              dù ảnh nền sáng hay tối */}
          <div className="cover__scrim" aria-hidden="true" />

          <div className="cover__overlay">
            <RingsMark className="rings-mark--onphoto" />

            <p className="cover__onphoto-eyebrow">{text.eyebrow}</p>

            {/* Co dau dung truoc - theo yeu cau trong ban nhan xet */}
            <h1 className="cover__onphoto-names">
              <span className="cover__onphoto-name">{bride}</span>
              <span className="cover__onphoto-amp">&amp;</span>
              <span className="cover__onphoto-name">{groom}</span>
            </h1>

            <p className="cover__onphoto-date">{dateLabel}</p>

            <div className="cover__cta">
              {/* Hai mui ten cong chum vao nut tu hai phia. Dat hai ben chu
                  khong dat phia duoi vi nut nam sat day anh, khong con cho. */}
              <MuiTen ben="trai" />

              <button
                type="button"
                className="cover__button cover__button--onphoto"
                onClick={onOpen}
              >
                {text.button}
              </button>

              <MuiTen ben="phai" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cover">

      <div className="cover__frame">
        <span className="cover__corner cover__corner--tl" aria-hidden="true" />
        <span className="cover__corner cover__corner--tr" aria-hidden="true" />
        <span className="cover__corner cover__corner--bl" aria-hidden="true" />
        <span className="cover__corner cover__corner--br" aria-hidden="true" />

        <RingsMark className="rings-mark--cover" />

        <p className="cover__eyebrow">{text.eyebrow}</p>
        <h1 className="cover__names">
          <span className="cover__name">{bride}</span>
          <span className="cover__amp">&amp;</span>
          <span className="cover__name">{groom}</span>
        </h1>
        <div className="cover__flourish" aria-hidden="true">
          <span className="cover__flourish-line" />
          <span className="cover__flourish-gem">◆</span>
          <span className="cover__flourish-line" />
        </div>
        <p className="cover__date">{dateLabel}</p>

        <button type="button" className="cover__button" onClick={onOpen}>
          {text.button}
        </button>
      </div>

      <div className="cover__waves" aria-hidden="true" />
    </div>
  )
}

export default Cover
