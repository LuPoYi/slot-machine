import React from 'react'
import QRCode from 'qrcode.react'
import firebase from '../firebase'

const Qrcode = ({ value }) => {
  const handleQrcodeClick = (e) => {
    const db = firebase.firestore()

    db.collection('Hi')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())
        console.log(data)
      })
  }

  return (
    <div className="Qrcode">
      <QRCode value={value} onClick={handleQrcodeClick} />
      <br />
      {value}
    </div>
  )
}

export default Qrcode
