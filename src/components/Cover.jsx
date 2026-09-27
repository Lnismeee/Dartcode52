import RingsMark from './RingsMark'

/* Hai kiểu bìa:
   - Có ảnh cưới  -> ảnh tràn màn hình, tên và ngày đè lên phía dưới
   - Chưa có ảnh  -> khung kính mờ trên nền xanh như trước */
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

            <h1 className="cover__onphoto-names">
              <span className="cover__onphoto-name">{groom}</span>
              <span className="cover__onphoto-amp">&amp;</span>
              <span className="cover__onphoto-name">{bride}</span>
            </h1>

            <p className="cover__onphoto-date">{dateLabel}</p>

            <button
              type="button"
              className="cover__button cover__button--onphoto"
              onClick={onOpen}
            >
              {text.button}
            </button>
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
          <span className="cover__name">{groom}</span>
          <span className="cover__amp">&amp;</span>
          <span className="cover__name">{bride}</span>
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
