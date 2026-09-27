/* Mở đầu phần Album: hai tấm ảnh nghiêng xen kẽ với chữ,
   xếp so le theo đường chéo - chữ trên trái, ảnh trên phải,
   ảnh dưới trái, chữ dưới phải. */
function AlbumIntro({ photos, text }) {
  const [first, second] = photos

  return (
    <div className="album-intro">
      <div className="album-intro__cell album-intro__cell--title">
        <p className="album-intro__the">{text.the}</p>
        <p className="album-intro__word">{text.album}</p>
      </div>

      <div className="album-intro__cell">
        {first && (
          <figure className="album-intro__photo album-intro__photo--a">
            <img src={first} alt="" loading="lazy" />
          </figure>
        )}
      </div>

      <div className="album-intro__cell">
        {second && (
          <figure className="album-intro__photo album-intro__photo--b">
            <img src={second} alt="" loading="lazy" />
          </figure>
        )}
      </div>

      <div className="album-intro__cell album-intro__cell--title album-intro__cell--end">
        <p className="album-intro__word">{text.of}</p>
        <p className="album-intro__word">{text.love}</p>
      </div>
    </div>
  )
}

export default AlbumIntro
