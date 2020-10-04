import React, { useState, useEffect } from 'react'
import Qrcode from './Qrcode'
import firebase from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import itemData from '../data/itemData.json'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

const QrcodeList = ({ gameDoc, nextStepEvent }) => {
  const classes = useStyles()

  const [cardSet, setCardSet] = useState({})

  useEffect(() => {
    const db = firebase.firestore()
    db.collection('games')
      .doc(gameDoc)
      .collection('cards')
      .onSnapshot(function (snapshot) {
        setCardSet(Object.assign({}, ...snapshot.docs.map((doc) => ({ [doc.id]: doc.data() }))))
      })
  }, [])

  const handleRandomPickOnClick = (e) => {
    const db = firebase.firestore()
    db.collection('games')
      .doc(gameDoc)
      .collection('cards')
      .get()
      .then((snapshot) => {
        const itemDataLength = itemData.length
        const promises = []
        snapshot.forEach((doc) => {
          const item = itemData[Math.floor(Math.random() * itemDataLength)]
          promises.push(
            doc.ref.update({
              name: item.name,
              photoURL: item.photoURL,
              state: 2,
            })
          )
        })
        return Promise.all(promises)
      })
  }

  return (
    <div className={classes.root}>
      {Object.keys(cardSet).map((key) => (
        <Qrcode
          key={key}
          cardDoc={key}
          gameDoc={gameDoc}
          state={cardSet[key]['state']}
          photoURL={cardSet[key]['photoURL']}
        />
      ))}

      <Button variant="contained" color="primary" onClick={nextStepEvent}>
        Next!
      </Button>

      <Button color="default" onClick={handleRandomPickOnClick}>
        Random
      </Button>
    </div>
  )
}

export default QrcodeList