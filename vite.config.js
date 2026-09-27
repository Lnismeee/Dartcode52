import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Trang chay tai  https://lnismeee.github.io/Dartcode52/  tuc la mot duong
     dan CON, khong phai goc ten mien. Khong khai bao base thi Vite sinh ra
     duong dan kieu  /assets/index.js , trinh duyet se tim o
     lnismeee.github.io/assets/... -> khong thay -> trang trang hoan toan.

     Doi ten repo thi phai sua dong nay theo. */
  base: '/Dartcode52/',
})
