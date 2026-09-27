/* Dòng ghi người thiết kế, đặt cuối cùng sau lời cảm ơn.
   Cố ý để nhỏ và nhạt: khách vào đây để xem thiệp cưới, không phải xem
   ai làm ra nó - nhưng ai muốn biết thì vẫn tìm thấy. */
function Credit({ text, url }) {
  return (
    <div className="credit">
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="credit__link">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}

export default Credit
