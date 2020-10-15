import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import itemData from '../../assets/itemData.json'
import Button from '@material-ui/core/Button'
import { shuffleArray } from '../../utils/helper'
import MemberImg from '../../components/MemberImg'

// 背景確認url是否正確
// 列出全部成員
// 按三下(冒愛心) => 選取

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  member: {
    float: 'left',
    width: '33%',
    position: 'relative',
    cursor: 'pointer',
  },
  memberPhoto: {
    width: '100%',
  },
  memberName: {
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    color: 'white',
    fontSize: 24,
    fontWeight: 800,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  memberHeart: {
    position: 'absolute',
    top: 15,
    left: 15,
    color: 'red',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
  },
})

const Pick = () => {
  const [isPickable, setIsPickable] = useState(false)
  const [isPicking, setIsPicking] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [pickedMember, setPickedMember] = useState({})

  const [memberSet, setMemberSet] = useState(() => {
    const initialState = shuffleArray(itemData)
    return initialState
  })

  const classes = useStyles()
  const { gameDoc, cardDoc } = useParams()
  const db = firebase.firestore()
  const cardRef = db.collection('games').doc(gameDoc).collection('cards').doc(cardDoc)

  // Firebase - pick member when 3 clicks
  const handleImgOnClick = (name, photoURL) => {
    for (let i = 0; i < memberSet.length; i++) {
      if (memberSet[i].name === name) {
        if (memberSet[i].count > 2) {
          cardRef.set(
            {
              name: name,
              photoURL: photoURL,
              state: 2,
            },
            { merge: true }
          )
          setPickedMember({
            name: name,
            photoURL: photoURL,
          })
          setIsComplete(true)
          setIsPickable(false)
          setIsPicking(false)
        } else {
          memberSet[i].count++
        }

        break
      }
    }

    setMemberSet([...memberSet])
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

  useEffect(() => {
    document.title = 'Pick'
  }, [])

  useEffect(() => {
    cardRef.get().then(function (doc) {
      if (doc.data() && doc.data()['state'] <= 1) {
        setIsPickable(true)
      } else {
        setIsPickable(false)
      }
    })
  }, [])

  return (
    <div className={classes.root}>
      {isComplete && <p>Done!</p>}
      <br />
      {isPickable && !isPicking && (
        <Button variant="contained" color="primary" onClick={handleStartOnClick}>
          Start!
        </Button>
      )}
      {isPickable &&
        isPicking &&
        memberSet.map((item) => (
          <MemberImg
            classes={classes}
            name={item.name}
            photoURL={item.photoURL}
            count={item.count}
            handleImgOnClick={handleImgOnClick}
          />
        ))}
      {isComplete && (
        <MemberImg classes={classes} name={pickedMember.name} photoURL={pickedMember.photoURL} />
      )}
      <p style={{ color: 'white' }}>
        gameDoc: {gameDoc} ; cardDoc: {cardDoc} ; isPickable: {isPickable ? 'T' : 'F'} ; isPicking:{' '}
        {isPicking ? 'T' : 'F'}
      </p>
    </div>
  )
}

export default Pick
