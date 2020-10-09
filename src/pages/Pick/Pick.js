import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import itemData from '../../assets/itemData.json'
import Button from '@material-ui/core/Button'
import { shuffleArray } from '../../utils/helper'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

// 背景確認url是否正確
// 列出全部成員
// 按三下(冒愛心) => 選取

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  member: {
    float: 'left',
    width: '50%',
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

  let memberImgList = memberSet.map((item) => {
    return (
      <div className={classes.member}>
        <img
          className={classes.memberPhoto}
          key={item.name}
          src={item.photoURL}
          alt={'alt'}
          onClick={() => handleImgOnClick(item.name, item.photoURL)}></img>
        <div className={classes.memberName}>{item.name}</div>
        <div className={classes.memberHeart}>
          {item.count === 0 && (
            <div>
              <FavoriteBorderIcon />
              <FavoriteBorderIcon />
              <FavoriteBorderIcon />
            </div>
          )}
          {item.count === 1 && (
            <div>
              <FavoriteIcon />
              <FavoriteBorderIcon />
              <FavoriteBorderIcon />
            </div>
          )}
          {item.count === 2 && (
            <div>
              <FavoriteIcon />
              <FavoriteIcon />
              <FavoriteBorderIcon />
            </div>
          )}
          {item.count === 3 && (
            <div>
              <FavoriteIcon />
              <FavoriteIcon />
              <FavoriteIcon />
            </div>
          )}
        </div>
      </div>
    )
  })

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
      Pick~~~ {isComplete && <p>Good Job!</p>}
      <p>
        gameDoc: {gameDoc} cardDoc: {cardDoc}
      </p>
      <p>
        isPickable: {isPickable ? 'T' : 'F'}; isPicking: {isPicking ? 'T' : 'F'}
      </p>
      {isPickable && !isPicking && (
        <Button variant="contained" color="primary" onClick={handleStartOnClick}>
          Start!
        </Button>
      )}
      {isPickable && isPicking && memberImgList}
    </div>
  )
}

export default Pick
