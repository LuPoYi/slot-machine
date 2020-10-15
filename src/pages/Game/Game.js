import React, { useState } from 'react'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'
import Wheel from './Wheel'

const Game = ({ count }) => {
  const [nameList, setNameList] = useState([])

  const handleNextOnClick = (names) => {
    setNameList(names)
  }

  return (
    <div className="game">
      {nameList.length === 0 ? (
        <QrcodeList handleNextOnClick={handleNextOnClick} />
      ) : (
        <Wheel nameList={nameList} />
      )}
    </div>
  )
}

export default Game
