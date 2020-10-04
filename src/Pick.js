import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import itemData from './data/itemData.json'
import Button from '@material-ui/core/Button'
import { shuffleArray } from './lib/helper'

// 背景確認url是否正確
// 列出全部成員
// 按三下(冒愛心) => 選取

const Pick = () => {
  const { gameDoc, cardDoc } = useParams()
  const db = firebase.firestore()
  const cardRef = db.collection('games').doc(gameDoc).collection('cards').doc(cardDoc)

  // Firebase - pick member when 3 clicks
  const handleImgOnClick = (name, photoURL) => {
    for (let i = 0; i < memberSet.length; i++) {
      if (memberSet[i].name === name) {
        memberSet[i].count++
        if (memberSet[i].count >= 3) {
          cardRef.set(
            {
              name: name,
              photoURL: photoURL,
              state: 2,
            },
            { merge: true }
          )
        }
        setIsComplete(true)
        break
      }
    }
    setMemberSet(memberSet)
  }

  // Firebase - update pick state to next 0 -> 1
  const handleStartOnClick = () => {
    cardRef.get().then(function (doc) {
      if (doc.exists && doc.data() && doc.data()['state'] === 0) {
        cardRef.update({
          state: 1,
        })
      }
    })
    setIsPicking(true)
  }

  const [isPickable, setIsPickable] = useState(false)
  const [isPicking, setIsPicking] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [memberSet, setMemberSet] = useState(shuffleArray(itemData))

  let memberImgList = memberSet.map((item) => {
    return (
      <img
        key={item.name}
        src={item.photoURL}
        alt={'alt'}
        onClick={() => handleImgOnClick(item.name, item.photoURL)}></img>
    )
  })

  useEffect(() => {
    cardRef.get().then(function (doc) {
      if (doc.data() && doc.data()['state'] === 0) {
        setIsPickable(true)
      } else {
        setIsPickable(false)
      }
    })
  }, [])

  return (
    <div>
      Pick~~~ {isComplete && <h1>Good Job!</h1>}
      <div>
        <h2>gameDoc: {gameDoc}</h2>
        <h3>cardDoc: {cardDoc}</h3>
        <h3>isPickable: {isPickable ? 'T' : 'F'}</h3>
        <h3>isPicking: {isPicking ? 'T' : 'F'}</h3>

        {isPickable && !isPicking && (
          <Button variant="contained" color="primary" onClick={handleStartOnClick}>
            Start!
          </Button>
        )}
        {isPickable && isPicking && memberImgList}
      </div>
    </div>
  )
}

export default Pick
