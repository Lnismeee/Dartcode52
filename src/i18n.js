/* Toàn bộ chữ hiển thị trên thiệp, tách theo ngôn ngữ.
   Thêm ngôn ngữ mới = thêm một khoá ở đây và một nút trong LANGUAGES. */

export const LANGUAGES = [
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "en", label: "EN", name: "English" },
];

export const CONTENT = {
  vi: {
    htmlTitle: "Thiệp Cưới - Lan Hương & Lã Ngọc",
    dateLabel: "17 . 10 . 2026",
    cover: {
      eyebrow: "Trân trọng kính mời",
      button: "Mở Thiệp",
    },
    music: {
      play: "Bật nhạc",
      pause: "Tắt nhạc",
    },
    hero: {
      eyebrow: "Save The Date",
    },
    countdown: {
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
    },
    invite: {
      title: "Thiệp Mời",
      guestName: "Quý khách",
      leadBefore: "Trân trọng kính mời",
      leadAfter: "đến dự buổi tiệc chung vui cùng gia đình chúng tôi",
      groomLabel: "Nhà Trai",
      brideLabel: "Nhà Gái",
      groomFamily: {
        father: "Ông: Lã Văn Ánh",
        mother: "Bà: Trần Thị Dung",
        address: "Thôn Liễu Trì, Xã Quang Minh, Thành phố Hà Nội",
      },
      brideFamily: {
        father: "Ông: Nguyễn Đình Phương",
        mother: "Bà: Dương Thị Thanh",
        address: "Xóm Cầu Gỗ, Xã Phú Bình, Tỉnh Thái Nguyên",
      },
      events: [
        {
          title: "Lễ Vu Quy",
          time: "Thứ Bảy, 17/10/2026 - 16:00",
          venue:
            "Tư gia nhà gái - Xóm Cầu Gỗ, Xã Phú Bình, Tỉnh Thái Nguyên",
        },
      ],
      mapTitle: "Địa chỉ dự tiệc",
      mapLabel: "Bản đồ",
      mapLink: "Mở bằng Google Maps",
    },
    couple: {
      title: "Chú Rể & Cô Dâu",
      groomLabel: "Chú Rể",
      brideLabel: "Cô Dâu",
    },
    albumIntro: {
      the: "The",
      album: "ALBUM",
      of: "OF",
      love: "LOVE",
    },
    gallery: {
      title: "Album Ảnh Cưới",
      photoAlt: "Ảnh cưới",
    },
    rsvp: {
      title: "Xác Nhận Tham Dự",
      name: "Họ và tên",
      namePlaceholder: "Nhập tên của bạn",
      attending: "Bạn có thể tham dự không?",
      optionYes: "Chắc chắn sẽ tham dự",
      optionMaybe: "Có thể tham dự",
      optionNo: "Xin phép vắng mặt",
      guests: "Số lượng người tham dự",
      message: "Lời chúc",
      messagePlaceholder: "Gửi lời chúc mừng đến cô dâu chú rể...",
      submit: "Gửi Xác Nhận",
      sending: "Đang gửi...",
      error: "Không thể gửi xác nhận. Vui lòng thử lại sau.",
      thanksTitle: "Cảm Ơn!",
      thanksBefore: "Cảm ơn",
      thanksAfter: "đã xác nhận tham dự.",
      thanksNote:
        "Rất mong được đón tiếp bạn trong ngày trọng đại của chúng tôi!",
    },
    wishes: {
      title: "Sổ Lưu Bút",
      subtitle: "Lời chúc từ những người thân yêu",
      empty: "Chưa có lời chúc nào. Hãy là người đầu tiên nhé!",
      countOne: "lời chúc",
      countMany: "lời chúc",
    },
    credit: "Made by Dartcode52",
    thankYou: {
      title: "Cảm Ơn!",
      note: "Sự hiện diện của Quý khách là niềm vinh hạnh đối với gia đình chúng tôi. Xin chân thành cảm ơn!",
    },
  },

  en: {
    htmlTitle: "Wedding Invitation - Lan Huong & La Ngoc",
    dateLabel: "17 . OCT . 2026",
    cover: {
      eyebrow: "You are cordially invited",
      button: "Open Invitation",
    },
    music: {
      play: "Play music",
      pause: "Pause music",
    },
    hero: {
      eyebrow: "Save The Date",
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    invite: {
      title: "Invitation",
      guestName: "Dear Guest",
      leadBefore: "We warmly invite",
      leadAfter: "to join us at the celebration of our wedding",
      groomLabel: "Groom's Family",
      brideLabel: "Bride's Family",
      groomFamily: {
        father: "Mr. La Van Anh",
        mother: "Mrs. Tran Thi Dung",
        address: "Lieu Tri Hamlet, Quang Minh Commune, Hanoi",
      },
      brideFamily: {
        father: "Mr. Nguyen Dinh Phuong",
        mother: "Mrs. Duong Thi Thanh",
        address: "Cau Go Hamlet, Phu Binh Commune, Thai Nguyen Province",
      },
      events: [
        {
          title: "Vu Quy Ceremony",
          time: "Saturday, 17 October 2026 - 4:00 PM",
          venue:
            "Bride's family home - Cau Go Hamlet, Phu Binh Commune, Thai Nguyen Province",
        },
      ],
      mapTitle: "Directions",
      mapLabel: "Map of",
      mapLink: "Open in Google Maps",
    },
    couple: {
      title: "The Bride & Groom",
      groomLabel: "The Groom",
      brideLabel: "The Bride",
    },
    albumIntro: {
      the: "The",
      album: "ALBUM",
      of: "OF",
      love: "LOVE",
    },
    gallery: {
      title: "Our Wedding Album",
      photoAlt: "Wedding photo",
    },
    rsvp: {
      title: "RSVP",
      name: "Full name",
      namePlaceholder: "Enter your name",
      attending: "Will you be able to join us?",
      optionYes: "Joyfully accepts",
      optionMaybe: "Might be able to come",
      optionNo: "Regretfully declines",
      guests: "Number of guests",
      message: "Your wishes",
      messagePlaceholder: "Send your best wishes to the bride and groom...",
      submit: "Send RSVP",
      sending: "Sending...",
      error: "Could not send your RSVP. Please try again later.",
      thanksTitle: "Thank You!",
      thanksBefore: "Thank you",
      thanksAfter: "for confirming your attendance.",
      thanksNote: "We look forward to celebrating with you on our special day!",
    },
    wishes: {
      title: "Guest Book",
      subtitle: "Wishes from our loved ones",
      empty: "No wishes yet. Be the first to write one!",
      countOne: "wish",
      countMany: "wishes",
    },
    credit: "Made by Dartcode52",
    thankYou: {
      title: "Thank you!",
      note: "Your presence is the greatest honour for our families. Thank you from the bottom of our hearts!",
    },
  },
};
