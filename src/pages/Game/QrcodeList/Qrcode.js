import React from 'react'
import QRCode from 'qrcode.react'
import firebase from '../../../utils/firebase'
import { makeStyles } from '@material-ui/core/styles'

// Qrcode
// listen to firebase 'state'
// also clickable and random pick
const useStyles = makeStyles({
  root: {
    width: '33%',
    paddingTop: 20,
    paddingBottom: 20,
    float: 'left',
  },
})

const Qrcode = ({ gameDoc, cardDoc, state, photoURL }) => {
  const classes = useStyles()

  const handleQrcodeOnClick = (e) => {
    console.log('TODO')
    // const db = firebase.firestore()

    // db.collection('games')
    //   .get()
    //   .then((querySnapshot) => {
    //     const data = querySnapshot.docs.map((doc) => doc.data())
    //     console.log(data)
    //   })
  }

  return (
    <div className={classes.root}>
      {state === 0 && <QRCode value={cardDoc} onClick={handleQrcodeOnClick} />}
      {state === 1 && <QRCode value={cardDoc} fgColor={'#CCCCCC'} />}
      {state === 2 && <img width="128" height="128" src={photoURL} alt={'alt'}></img>}
      <p>
        {window.location.href}
        pick/{gameDoc}/{cardDoc}
      </p>
    </div>
  )
}

export default Qrcode
