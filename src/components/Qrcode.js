import React from 'react'
import QRCode from 'qrcode.react'

const Qrcode = ({ value }) => {
  return (
    <div className="Qrcode">
      <QRCode value={value} />
      <br />
      {value}
    </div>
  )
}

export default Qrcode
