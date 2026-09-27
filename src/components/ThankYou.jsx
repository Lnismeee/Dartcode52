import Credit from './Credit'

/* Lời cảm ơn cuối thiệp: ảnh lớn, chữ "Thank you!" viết tay đè lên,
   lời nhắn và dòng ghi người thiết kế ngay dưới. Dùng lại cách xử lý như ảnh
   bìa - điện thoại thì ảnh tràn khung, máy tính thì thu về khung dọc đặt giữa. */
function ThankYou({ photo, title, note, credit, creditUrl }) {
  if (!photo) return null

  return (
    <section className="thankyou">
      <div className="thankyou__card">
        <img className="thankyou__photo" src={photo} alt="" loading="lazy" />
        {/* Tối dần xuống đáy để chữ trắng đọc được trên mọi ảnh */}
        <div className="thankyou__scrim" aria-hidden="true" />

        <div className="thankyou__overlay">
          <p className="thankyou__title">{title}</p>
          <p className="thankyou__note">{note}</p>
          {credit && <Credit text={credit} url={creditUrl} />}
        </div>
      </div>
    </section>
  )
}

export default ThankYou
