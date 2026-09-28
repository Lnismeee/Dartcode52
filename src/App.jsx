import { useCallback, useEffect, useState } from "react";
import Cover from "./components/Cover";
import Countdown from "./components/Countdown";
import InviteDetails from "./components/InviteDetails";
import Gallery from "./components/Gallery";
import RsvpForm from "./components/RsvpForm";
import LanguageSwitch from "./components/LanguageSwitch";
import WishesWall from "./components/WishesWall";
import Reveal from "./components/Reveal";
import Bubbles from "./components/Bubbles";
import MusicToggle from "./components/MusicToggle";
import Envelope from "./components/Envelope";
import Couple from "./components/Couple";
import EventMap from "./components/EventMap";
import AlbumIntro from "./components/AlbumIntro";
import ThankYou from "./components/ThankYou";
import Ribbons from "./components/Ribbons";
import { PhotoZoomProvider } from "./components/PhotoZoom";
import { CONTENT } from "./i18n";
import "./App.css";

const sapXep = (modules) =>
  Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((path) => modules[path]);

const ANH_BIA = sapXep(
  import.meta.glob(
    "./assets/anh/bia/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_PHONG_BI = sapXep(
  import.meta.glob(
    "./assets/anh/phong-bi/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_NHA_TRAI = sapXep(
  import.meta.glob(
    "./assets/anh/nha-trai/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_NHA_GAI = sapXep(
  import.meta.glob(
    "./assets/anh/nha-gai/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_CHU_RE = sapXep(
  import.meta.glob(
    "./assets/anh/chu-re/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_CO_DAU = sapXep(
  import.meta.glob(
    "./assets/anh/co-dau/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_CAM_ON = sapXep(
  import.meta.glob(
    "./assets/anh/cam-on/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
const ANH_ALBUM_BIA = sapXep(
  import.meta.glob(
    "./assets/anh/album-bia/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);
/* NHAC NEN - tha mot file .mp3 bat ky vao  src/assets/nhac/
   Khong can dat ten theo quy tac, no lay file dau tien. */
const NHAC = sapXep(
  import.meta.glob("./assets/nhac/*.{mp3,MP3,m4a,M4A,ogg,OGG}", {
    eager: true,
    import: "default",
  }),
);
const NHAC_NEN = NHAC[0] ?? null;

const ANH_ALBUM = sapXep(
  import.meta.glob(
    "./assets/anh/album/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" },
  ),
);

/* Thư mục nào để trống thì mượn tạm ảnh album, để trang không bị khuyết.
   Riêng album trống thì phần album tự ẩn. */
const muon = (i) => ANH_ALBUM[i] ?? ANH_ALBUM[0] ?? null;

const COVER_PHOTO = ANH_BIA[0] ?? muon(0);
const GROOM_PHOTO = ANH_CHU_RE[0] ?? muon(1);
const BRIDE_PHOTO = ANH_CO_DAU[0] ?? muon(2);
const THANKYOU_PHOTO = ANH_CAM_ON[0] ?? muon(3);
const FAMILY_GROOM_PHOTO = ANH_NHA_TRAI[0] ?? GROOM_PHOTO;
const FAMILY_BRIDE_PHOTO = ANH_NHA_GAI[0] ?? BRIDE_PHOTO;

// Mở đầu album và phong bì đều cần đúng 2 tấm
const ALBUM_INTRO_PHOTOS = (
  ANH_ALBUM_BIA.length >= 2 ? ANH_ALBUM_BIA : ANH_ALBUM
).slice(0, 2);

const ENVELOPE_PHOTOS = (
  ANH_PHONG_BI.length >= 2 ? ANH_PHONG_BI : ANH_ALBUM
).slice(0, 2);
const WEDDING_INFO = {
  groom: "Lã Ngọc",
  bride: "Lan Hương",
  weddingDate: new Date("2026-10-17T16:00:00"),
  photos: ANH_ALBUM.map((src) => ({ src })),
};

/* ĐỊA ĐIỂM TỔ CHỨC

   Chỉ cần dán MỘT link Google Maps vào đây. Mở Google Maps, tìm địa điểm,
   bấm Chia sẻ rồi sao chép đường liên kết.

   Toạ độ cho bản đồ nhúng được tách tự động từ chính link đó, nên không còn
   cảnh sửa link mà quên sửa toạ độ - bản đồ một nơi, nút bấm một nẻo. */
const EVENT_MAPS = [
  {
    mapUrl:
      "https://www.google.com/maps/place/C%E1%BA%A7u+B%E1%BA%A3o+L%C3%BD/@21.4888143,105.9427041,961m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135239fa5fc0c83:0x4bac19f235b6fd98!8m2!3d21.4888143!4d105.945279!16s%2Fg%2F11h5tyk5nn?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  },
];

/* Google nhúng toạ độ thật của địa điểm vào link dưới dạng  !3d<vĩ độ>!4d<kinh độ>.
   Nếu không tìm thấy thì lấy tạm phần sau dấu @ - đó là tâm khung nhìn,
   lệch một chút so với địa điểm nhưng vẫn đúng khu vực. */
const layToaDo = (url) => {
  if (!url) return null;
  const chinhXac = url.match(/!3d(-?[\d.]+)!4d(-?[\d.]+)/);
  if (chinhXac) return `${chinhXac[1]},${chinhXac[2]}`;
  const tamKhung = url.match(/@(-?[\d.]+),(-?[\d.]+)/);
  return tamKhung ? `${tamKhung[1]},${tamKhung[2]}` : null;
};

function App() {
  // 'cover' -> 'invitation'
  const [stage, setStage] = useState("cover");
  const [lang, setLang] = useState("vi");
  // Tăng lên mỗi khi có người gửi lời chúc, để sổ lưu bút tải lại
  const [wishesKey, setWishesKey] = useState(0);
  // Loi chuc nguoi dung vua gui o phien nay, hien ngay khong cho tai lai
  const [loiChucVuaGui, setLoiChucVuaGui] = useState(null);

  const handleOpen = useCallback(() => setStage("invitation"), []);

  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.htmlTitle;
  }, [lang, t.htmlTitle]);

  const events = t.invite.events.map((event, i) => ({
    ...event,
    mapUrl: EVENT_MAPS[i]?.mapUrl,
    mapEmbedUrl: EVENT_MAPS[i]
      ? `https://www.google.com/maps?q=${layToaDo(EVENT_MAPS[i].mapUrl)}&z=16&hl=${lang}&output=embed`
      : undefined,
  }));

  const photos = WEDDING_INFO.photos.map((photo, i) => ({
    ...photo,
    alt: `${t.gallery.photoAlt} ${i + 1}`,
  }));

  return (
    <PhotoZoomProvider>
      <div className="app">
      {/* MOT lop bong bong duy nhat cho ca trang, ghim theo khung nhin nen
          bong bong noi lien mach tu duoi len tren khong bi cat theo tung phan.
          Phai la con truc tiep cua .app: dat trong phan tu co transform
          (nhu .reveal) thi position fixed se neo vao phan tu do thay vi khung nhin. */}
      <Bubbles count={16} className="bubbles--global" />

      <LanguageSwitch lang={lang} onChange={setLang} />

      {/* Nhạc bật từ lúc bấm mở thiệp, chạy suốt phần còn lại */}
      <MusicToggle track={NHAC_NEN} active={stage !== "cover"} text={t.music} />

      {stage === "cover" && (
        <Cover
          groom={WEDDING_INFO.groom}
          bride={WEDDING_INFO.bride}
          dateLabel={t.dateLabel}
          text={t.cover}
          photo={COVER_PHOTO}
          onOpen={handleOpen}
        />
      )}

      {stage === "invitation" && (
        <main className="invitation">
          <header className="hero">
            <div className="hero__rings" aria-hidden="true">
              <span className="hero__ring hero__ring--1" />
              <span className="hero__ring hero__ring--2" />
              <span className="hero__ring hero__ring--3" />
            </div>

            <p className="hero__eyebrow">{t.hero.eyebrow}</p>
            {/* Co dau dung truoc - theo yeu cau trong ban nhan xet */}
            <h1 className="hero__names">
              <span className="hero__name">{WEDDING_INFO.bride}</span>
              <span className="hero__amp">&amp;</span>
              <span className="hero__name">{WEDDING_INFO.groom}</span>
            </h1>

            <div className="hero__ornament" aria-hidden="true">
              <span className="hero__ornament-line" />
              <span className="hero__ornament-gem"></span>
              <span className="hero__ornament-line" />
            </div>

            <p className="hero__date">{t.dateLabel}</p>
            <Countdown
              targetDate={WEDDING_INFO.weddingDate}
              labels={t.countdown}
            />

            <div className="hero__wave" aria-hidden="true" />
          </header>

          {ENVELOPE_PHOTOS.length > 0 && (
            <Reveal>
              <section className="section envelope-section">
                <Ribbons variant="a" />
                <Envelope photos={ENVELOPE_PHOTOS} photoAlt={t.gallery.photoAlt} />
              </section>
            </Reveal>
          )}

          <Reveal>
            <InviteDetails
              text={t.invite}
              groomPhoto={FAMILY_GROOM_PHOTO}
              bridePhoto={FAMILY_BRIDE_PHOTO}
            />
          </Reveal>

          <Reveal>
            <Couple
              text={t.couple}
              groomName={WEDDING_INFO.groom}
              brideName={WEDDING_INFO.bride}
              groomPhoto={GROOM_PHOTO}
              bridePhoto={BRIDE_PHOTO}
            />
          </Reveal>

          {ALBUM_INTRO_PHOTOS.length > 0 && (
            <Reveal>
              <section className="section album-intro-section">
                <AlbumIntro
                  photos={ALBUM_INTRO_PHOTOS}
                  text={t.albumIntro}
                  photoAlt={t.gallery.photoAlt}
                />
              </section>
            </Reveal>
          )}

          <Reveal>
            <Gallery photos={photos} text={t.gallery} />
          </Reveal>

          <Reveal>
            <EventMap
              events={events}
              text={{
                title: t.invite.mapTitle,
                mapLabel: t.invite.mapLabel,
                mapLink: t.invite.mapLink,
              }}
            />
          </Reveal>

          <Reveal>
            <RsvpForm
              text={t.rsvp}
              onSubmitted={(loiChuc) => {
                if (loiChuc) setLoiChucVuaGui(loiChuc);
                setWishesKey((key) => key + 1);
              }}
            />
          </Reveal>

          <Reveal>
            <WishesWall
              text={t.wishes}
              refreshKey={wishesKey}
              loiChucVuaGui={loiChucVuaGui}
            />
          </Reveal>

          <Reveal>
            <ThankYou
              photo={THANKYOU_PHOTO}
              title={t.thankYou.title}
              note={t.thankYou.note}
              credit={t.credit}
            />
          </Reveal>
        </main>
      )}
      </div>
    </PhotoZoomProvider>
  );
}

export default App;
