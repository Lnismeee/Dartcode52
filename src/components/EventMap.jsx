import SectionDeco from './SectionDeco'

/* Thông tin buổi lễ và bản đồ gộp chung một thẻ: tên lễ, giờ, địa điểm,
   rồi tới bản đồ và nút mở Google Maps. Đặt sau album để khách xem ảnh xong
   mới tới phần cần ghi nhớ đường đi. */
function EventMap({ events, text }) {
  if (events.length === 0) return null

  return (
    <section className="section map-section">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>

      <div className="map-section__list">
        {events.map((event) => (
          <article className="map-section__card" key={event.title}>
            <h3 className="map-section__name">{event.title}</h3>
            <p className="map-section__time">{event.time}</p>
            <p className="map-section__venue">{event.venue}</p>

            {event.mapEmbedUrl && (
              <div className="map-section__frame">
                <iframe
                  src={event.mapEmbedUrl}
                  title={`${text.mapLabel} ${event.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}

            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="map-section__link"
              >
                {text.mapLink}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventMap
