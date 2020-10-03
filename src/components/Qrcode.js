import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import firebase from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    width: '33%',
    padding: 20,
  },
})

const Qrcode = ({ value }) => {
  const classes = useStyles()
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
    <div className={classes.root}>
      {status == 0 && <QRCode value={value} onClick={nextStepEvent} />}
      {status == 1 && <QRCode value={value} onClick={nextStepEvent} fgColor={'#CCCCCC'} />}
      {status == 2 && (
        <img
          width="128"
          height="128"
          src="https://ca.slack-edge.com/TGQCRQ19V-UGNK3SF24-7fd0f15d7b10-512"></img>
      )}
    </div>
  )
}

export default Qrcode
