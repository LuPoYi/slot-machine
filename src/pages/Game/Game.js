import React, { useState } from 'react'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'
import Wheel from './Wheel'

const Game = ({ count }) => {
  const [state, setState] = useState(0)
  const [gameDoc, setGameDoc] = useState('')
  const [nameList, setNameList] = useState([])

  const handleNextOnClick = (names) => {
    setNameList(names)
  }

  return (
    <div className="game">
      {nameList.length === 0 ? (
        <QrcodeList gameDoc={gameDoc} handleNextOnClick={handleNextOnClick} />
      ) : (
        <Wheel nameList={nameList} />
      )}
    </div>
  )
}

export default Game
