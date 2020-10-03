import React from 'react'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'

const Welcome = ({ handleStartOnClick }) => {
  const generateNewGame = () => {
    const db = firebase.firestore()
    const data = []
    const gameDoc = (+new Date()).toString()
    Array.from(Array(9), (_, i) =>
      data.push({
        index: i,
        name: '',
        photoURL: '',
        state: 0,
        qrcode: Math.random().toString(36).substring(6),
      })
    )

    db.collection('games')
      .doc(gameDoc)
      .set({
        data: data,
        state: 0,
        result: '',
      })
      .then(function () {
        console.log('Document successfully written!')
        handleStartOnClick(gameDoc)
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <Button variant="contained" color="primary" onClick={generateNewGame}>
        Start
      </Button>
    </div>
  )
}

export default Welcome
