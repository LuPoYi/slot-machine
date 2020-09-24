import React, { useState } from 'react'
import Qrcode from './Qrcode'

const QrcodeList = ({ count }) => {
  const [status, setStatus] = useState(0)

  return (
    <div className="QrcodeList">
      {[...Array(count)].map((x, i) => (
        <Qrcode key={i} />
      ))}
    </div>
  )
}

export default QrcodeList
