import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'

const Qrcode = ({ value }) => {
  const [status, setStatus] = useState(0)

  const handleQrcodeClick = (e) => {
    const db = firebase.firestore()

    db.collection('games')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())
        console.log(data)
      })
  }

  const nextStepEvent = (e) => {
    setStatus(status + 1)
  }

  return (
    <div className="Qrcode">
      {status == 0 && <QRCode value={value} onClick={handleQrcodeClick} />}
      {status == 1 && <QRCode value={value} onClick={handleQrcodeClick} fgColor={'#CCCCCC'} />}
      {status == 2 && (
        <img
          width="128"
          height="128"
          src="https://ca.slack-edge.com/TGQCRQ19V-UGNK3SF24-7fd0f15d7b10-512"></img>
      )}
      <br />
      {value}
      <Button variant="contained" color="default" onClick={nextStepEvent}>
        Next
      </Button>
    </div>
  )
}

export default Qrcode
