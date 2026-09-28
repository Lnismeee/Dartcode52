/* Dia chi Google Apps Script nhan xac nhan tham du va tra ve loi chuc.

   Khai bao o hai noi:

   1. Khi chay tren may minh  ->  tao file  .env.local  o thu muc nay:
        VITE_API_URL=https://script.google.com/macros/s/..../exec

   2. Khi chay tren GitHub Pages  ->  GitHub > Settings >
        Secrets and variables > Actions > Variables > New variable
        Ten:    VITE_API_URL
        Gia tri: cung duong dan tren

   De trong cung khong sao: phan Xac Nhan Tham Du va So Luu But se tu an,
   thiep van chay binh thuong, khach khong thay loi nao. */
export const API_URL = import.meta.env.VITE_API_URL || ''

/* Dung de an hai phan do khi chua khai bao dia chi */
export const CO_MAY_CHU = Boolean(API_URL)
