import { API_URL } from './config'

/* LUU Y QUAN TRONG - dung them  headers: { 'Content-Type': 'application/json' }

   Header do bien yeu cau thanh "khong don gian", trinh duyet se gui truoc mot
   yeu cau OPTIONS de xin phep. Google Apps Script khong tra loi OPTIONS, nen
   trinh duyet chan luon -> khach bam Gui ma khong gui duoc.

   De mac dinh thi fetch gui  text/plain , thuoc loai don gian, di thang khong
   phai xin phep. Ben Apps Script van doc duoc bang  e.postData.contents . */
export async function guiXacNhan(form) {
  // Chua khai bao VITE_API_URL thi fetch("") se tai chinh trang hien tai va tra
  // ve HTML, bao loi kho hieu. Chan tu day cho ro rang.
  if (!API_URL) throw new Error("Chua khai bao VITE_API_URL")

  const phanHoi = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(form),
  })
  if (!phanHoi.ok) throw new Error('Gui that bai')

  const duLieu = await phanHoi.json()
  if (duLieu && duLieu.error) throw new Error(duLieu.error)
  return duLieu
}

export async function layLoiChuc() {
  if (!API_URL) throw new Error("Chua khai bao VITE_API_URL")

  const phanHoi = await fetch(API_URL)
  if (!phanHoi.ok) throw new Error('Loi tai du lieu')

  const duLieu = await phanHoi.json()
  if (!Array.isArray(duLieu)) throw new Error('Du lieu khong hop le')
  return duLieu
}
