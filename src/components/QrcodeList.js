import React, { useState } from 'react'
import Qrcode from './Qrcode'
import Button from '@material-ui/core/Button'

const QrcodeList = ({ count, nextStepEvent }) => {
  const [status, setStatus] = useState(0)

  return (
    <div className="QrcodeList">
      {[...Array(count)].map((x, i) => (
        <Qrcode key={i} value={Math.random().toString(36).substring(6)} />
      ))}
      <Button variant="contained" color="primary" onClick={nextStepEvent}>
        Next
      </Button>
    </div>
  )
}

export default QrcodeList
