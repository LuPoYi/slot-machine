import React from 'react'
import QRCode from 'qrcode.react'
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

const Qrcode = ({ gameDoc, cardDoc, state, photoURL, isShowPickURL }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {state === 0 && <QRCode value={cardDoc} />}
      {state === 1 && <QRCode value={cardDoc} fgColor={'#CCCCCC'} />}
      {state === 2 && <img width="128" height="128" src={photoURL} alt={'alt'}></img>}
      {isShowPickURL && <p>{`${window.location.host}/pick/${gameDoc}/${cardDoc}`}</p>}
    </div>
  )
}

export default Qrcode
