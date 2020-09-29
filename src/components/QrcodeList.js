import React, { useState, useEffect } from 'react'
import Qrcode from './Qrcode'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'

const QrcodeList = ({ doc, nextStepEvent }) => {
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
    <div className="QrcodeList">
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
