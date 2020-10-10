import React, { useState, useEffect } from 'react'
import Qrcode from './Qrcode'
import firebase from '../../../utils/firebase'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import itemData from '../../../assets/itemData.json'
import { useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

const QrcodeList = ({ handleNextOnClick }) => {
  const classes = useStyles()

  const [cardSet, setCardSet] = useState({})
  const [isShowPickURL, setIsShowPickURL] = useState(false)
  const { gameDoc } = useParams()
  const location = useLocation()

  useEffect(() => {
    if (queryString.parse(location.search)['showUrl']) {
      setIsShowPickURL(true)
    }
  }, [])

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
          isShowPickURL={isShowPickURL}
        />
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNextOnClick(Object.values(cardSet).map((item) => item.name))}>
        Next!
      </Button>

      <Button color="default" onClick={() => handleRandomPickOnClick()}>
        Random
      </Button>
    </div>
  )
}

export default QrcodeList
