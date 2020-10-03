import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import itemData from './data/itemData.json'
import Button from '@material-ui/core/Button'

// 按三下(冒愛心) => 選取

const Pick = () => {
  const handleImgOnClick = (name) => {
    for (let i = 0; i < memberSet.length; i++) {
      if (memberSet[i].name === name) {
        memberSet[i].count++
        break
      }
    }
    setMemberSet(memberSet)

    // Firebase - pick member when 3 clicks
  }
  const handleStartOnClick = () => {
    // Firebase - update pick state to next
    setIsPicking(true)
  }

  const shuffleArray = (arr) => {
    var i, j, temp
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  const [isPickable, setIsPickable] = useState(false)
  const [isPicking, setIsPicking] = useState(false)
  const [memberSet, setMemberSet] = useState(shuffleArray(itemData))

  let { gameDoc, token } = useParams()

  let itemList = memberSet.map((item) => {
    return (
      <img key={item.name} src={item.photoURL} onClick={() => handleImgOnClick(item.name)}></img>
    )
  })

  useEffect(() => {
    const db = firebase.firestore()

    db.collection('games')
      .doc(gameDoc)
      .onSnapshot(function (doc) {
        let dataSet = doc.data() ? doc.data()['data'] : []
        let flag = false

        for (let item in dataSet) {
          //console.log("dataSet[item]['qrcode']", dataSet[item]['qrcode'])
          if (dataSet[item]['qrcode'] === token && dataSet[item]['state'] === 0) {
            flag = true
            break
          }
        }
        setIsPickable(flag)
        // setDataSet(doc.data())
      })
  }, [])

  return (
    <div>
      Pick~~~
      <div>
        <h2>gameDoc: {gameDoc}</h2>
        <h3>token: {token}</h3>
        <h3>isPickable: {isPickable ? 'T' : 'F'}</h3>
        <h3>isPicking: {isPicking ? 'T' : 'F'}</h3>
        {!isPicking && (
          <Button variant="contained" color="primary" onClick={handleStartOnClick}>
            Start!
          </Button>
        )}
        {isPickable && isPicking && itemList}
      </div>
    </div>
  )
}

export default Pick
