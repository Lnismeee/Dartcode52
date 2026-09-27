import SectionDeco from './SectionDeco'

function InviteDetails({ text, groomPhoto, bridePhoto }) {
  return (
    <section className="section invite">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>

      <p className="invite__text">
        {text.leadBefore} <strong>{text.guestName}</strong>
        <br />
        {text.leadAfter}
      </p>

      <div className="invite__families">
        <div className="invite__family">
          {groomPhoto && (
            <div className="invite__family-photo">
              <img src={groomPhoto} alt={text.groomLabel} loading="lazy" />
            </div>
          )}
          <h3>{text.groomLabel}</h3>
          <p>{text.groomFamily.father}</p>
          <p>{text.groomFamily.mother}</p>
          <p className="invite__address">{text.groomFamily.address}</p>
        </div>

        <div className="invite__divider" aria-hidden="true">
          <svg viewBox="0 0 32 30" fill="none">
            <defs>
              <linearGradient id="heartFill" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="var(--blue-soft)" />
                <stop offset="100%" stopColor="var(--blue-deep)" />
              </linearGradient>
            </defs>
            <path
              d="M16 28C7 21.5 1.5 16.2 1.5 10.2A8.2 8.2 0 0 1 16 5.4 8.2 8.2 0 0 1 30.5 10.2C30.5 16.2 25 21.5 16 28Z"
              fill="url(#heartFill)"
            />
          </svg>
        </div>

        <div className="invite__family">
          {bridePhoto && (
            <div className="invite__family-photo">
              <img src={bridePhoto} alt={text.brideLabel} loading="lazy" />
            </div>
          )}
          <h3>{text.brideLabel}</h3>
          <p>{text.brideFamily.father}</p>
          <p>{text.brideFamily.mother}</p>
          <p className="invite__address">{text.brideFamily.address}</p>
        </div>
      </div>

    </section>
  )
}

export default InviteDetails
