import React from 'react'
import firebase from '../../../utils/firebase'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

const Welcome = ({ count }) => {
  let history = useHistory()

  const generateNewGame = () => {
    let isError = false // TODO promise
    const db = firebase.firestore()
    const gameDoc = (+new Date()).toString()

    Array.from(Array(count), (_, i) =>
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
        })
        .catch(function (error) {
          isError = true
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
      })
      .catch(function (error) {
        isError = true
        console.error('Error writing document2: ', error)
      })
    if (!isError) {
      history.push(`/game/${gameDoc}`)
    }
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
