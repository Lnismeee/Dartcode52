import SectionDeco from "./SectionDeco";
import Reveal from "./Reveal";
import Ribbons from "./Ribbons";
import { AnhPhongTo } from "./PhotoZoom"

function Couple({ text, groomName, brideName, groomPhoto, bridePhoto }) {
  return (
    <section className="section couple">
      <Ribbons variant="b" />
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>

      <div className="couple__list">
        <Reveal from="left">
          <article className="couple__row couple__row--groom">
            {groomPhoto && (
              <div className="couple__photo">
                <AnhPhongTo src={groomPhoto} alt={groomName} loading="lazy" />
              </div>
            )}
            <div className="couple__info">
              <p className="couple__label">{text.groomLabel}</p>
              <p className="couple__name">{groomName}</p>
              <span className="couple__rule" aria-hidden="true" />
            </div>
          </article>
        </Reveal>

        <Reveal from="right">
          <article className="couple__row couple__row--bride">
            {bridePhoto && (
              <div className="couple__photo">
                <AnhPhongTo src={bridePhoto} alt={brideName} loading="lazy" />
              </div>
            )}
            <div className="couple__info">
              <p className="couple__label">{text.brideLabel}</p>
              <p className="couple__name">{brideName}</p>
              <span className="couple__rule" aria-hidden="true" />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default Couple;
