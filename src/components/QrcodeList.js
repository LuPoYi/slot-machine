import React, { useState, useEffect } from 'react'
import Qrcode from './Qrcode'
import firebase from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

const QrcodeList = ({ doc, nextStepEvent }) => {
  const classes = useStyles()

  const [dataSet, setDataSet] = useState()

  useEffect(() => {
    console.log('useEffect', doc)
    const db = firebase.firestore()

    db.collection('games')
      .doc(doc)
      .onSnapshot(function (doc) {
        console.log('Current data: ', doc.data())
        setDataSet(doc.data())
      })
  }, [])

  return (
    <div className={classes.root}>
      {dataSet &&
        dataSet['data'].map((item) => (
          <Qrcode key={item.index} value={item.qrcode} status={item.status} />
        ))}

      <Button variant="contained" color="primary" onClick={nextStepEvent}>
        {doc}
      </Button>
    </div>
  )
}

export default QrcodeList
