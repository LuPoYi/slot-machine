import React, { useState } from 'react'
import Welcome from './Welcome'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'
import Wheel from './Wheel'

const Game = ({ count }) => {
  const [state, setState] = useState(0)
  const [gameDoc, setGameDoc] = useState('')
  const [nameList, setNameList] = useState()

  const handleStartOnClick = (doc) => {
    setGameDoc(doc)
    setState(1)
  }

  const handleNextOnClick = (names) => {
    setNameList(names)
    setState(2)
  }

  return (
    <div className="game">
      {state === 0 && <Welcome count={count} handleStartOnClick={handleStartOnClick} />}
      {state === 1 && <QrcodeList gameDoc={gameDoc} handleNextOnClick={handleNextOnClick} />}
      {/* {state === 2 && <SlotMachine gameDoc={gameDoc} />} */}
      {state === 2 && <Wheel nameList={nameList} />}
    </div>
  )
}

export default Game
