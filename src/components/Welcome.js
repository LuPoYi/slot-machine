import React from 'react'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'

const Welcome = ({ handleStartOnClick }) => {
  const generateNewGame = () => {
    const db = firebase.firestore()
    const gameDoc = (+new Date()).toString()

    Array.from(Array(9), (_, i) =>
      db
        .collection('games')
        .doc(gameDoc)
        .collection('cards')
        .doc(Math.random().toString(36).substring(6))
        .set({
          index: i,
          name: '',
          photoURL: '',
          state: 0,
        })
        .then(function () {
          console.log('Document successfully written1!')
          handleStartOnClick(gameDoc)
        })
        .catch(function (error) {
          console.error('Error writing document1: ', error)
        })
    )

    db.collection('games')
      .doc(gameDoc)
      .set({
        state: 0,
        result: '',
      })
      .then(function () {
        console.log('Document successfully written2!')
        handleStartOnClick(gameDoc)
      })
      .catch(function (error) {
        console.error('Error writing document2: ', error)
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
