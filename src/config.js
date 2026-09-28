/* Dia chi Google Apps Script nhan xac nhan tham du va tra ve loi chuc.
   Bang tinh: "Xac nhan tham du - Dam cuoi" tren Google Drive.
   Ma nguon: repo Dartcode52-server, file google-sheet/Code.gs

   Duong dan nay von cong khai (khach nao mo thiep cung tai ve), nen ghi
   thang vao day - khong can khai bao gi tren GitHub.

   Muon thu voi server tren may thi tao file  .env.local  o thu muc nay:
        VITE_API_URL=http://localhost:4000

   Neu sau nay trien khai lai Apps Script bang "Ban trien khai moi" thi
   duong dan se doi -> sua lai dong duoi. Con "Quan ly ban trien khai >
   Phien ban moi" thi giu nguyen duong dan, khong phai sua. */
const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbwd5pH5UG1zK0SuTpOOFaZ_rKIJ1F5wrc-d4GGOKq0i-oHF8NDj_nnsGrGe685eNpWA/exec'

export const API_URL = import.meta.env.VITE_API_URL || GOOGLE_SHEETS_URL

/* Dung de an So Luu But khi khong co dia chi */
export const CO_MAY_CHU = Boolean(API_URL)
