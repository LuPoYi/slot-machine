import React from 'react'
import firebase from '../../../utils/firebase'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'

const Welcome = ({ count }) => {
  let history = useHistory()
  const [group, setGroup] = React.useState('')

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

  const handleChange = (event) => {
    setGroup(event.target.value)
  }

  return (
    <div>
      <h1>Welcome!</h1>
      {/* <div>
        <InputLabel id="demo-simple-select-label">group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div> */}

      <Button variant="contained" color="primary" onClick={generateNewGame}>
        Start~
      </Button>
    </div>
  )
}

export default Welcome
