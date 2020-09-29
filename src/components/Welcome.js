import React from 'react'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'

const Welcome = ({ handleStartOnClick }) => {
  const generateNewGame = () => {
    const db = firebase.firestore()
    const data = []
    const game_doc = (+new Date()).toString()
    Array.from(Array(10), (_, i) =>
      data.push({
        index: i,
        name: '',
        photoURL: '',
        status: 0,
        qrcode: Math.random().toString(36).substring(6),
      })
    )

    db.collection('games')
      .doc(game_doc)
      .set({
        data: data,
        status: 'preparation',
        result: '',
      })
      .then(function () {
        console.log('Document successfully written!')
        handleStartOnClick(game_doc)
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
