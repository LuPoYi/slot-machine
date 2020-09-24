import React, { useState } from 'react'
import Qrcode from './Qrcode'

const QrcodeList = ({ count }) => {
  const [status, setStatus] = useState(0)

  return (
    <div className="QrcodeList">
      {[...Array(count)].map((x, i) => (
        <Qrcode key={i} value={Math.random().toString(36).substring(6)} />
      ))}
    </div>
  )
}

export default QrcodeList
