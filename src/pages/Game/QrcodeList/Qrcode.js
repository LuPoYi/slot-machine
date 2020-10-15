import React from 'react'
import QRCode from 'qrcode.react'
import { makeStyles } from '@material-ui/core/styles'
import MemberImg from '../../../components/MemberImg'

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
  member: {
    width: 280,
    height: 280,
    position: 'relative',
    margin: 'auto',
  },
  memberPhoto: {
    width: '100%',
  },
  memberName: {
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    color: 'white',
    fontSize: 24,
    fontWeight: 800,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  memberHeart: {
    position: 'absolute',
    top: 15,
    left: 15,
    color: 'red',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
  },
})

const Qrcode = ({ gameDoc, cardDoc, state, photoURL, name, isShowPickURL }) => {
  const classes = useStyles()
  const url = `${window.location.host}/pick/${gameDoc}/${cardDoc}`

  return (
    <div className={classes.root}>
      {state === 0 && <QRCode size="140" value={url} dataUrl={url} />}
      {state === 1 && <QRCode size="140" value={url} fgColor={'#CCCCCC'} dataUrl={url} />}
      {state === 2 && <MemberImg classes={classes} name={name} photoURL={photoURL} />}

      {isShowPickURL && <p>{url}</p>}
    </div>
  )
}

export default Qrcode
