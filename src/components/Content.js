import React, { useState } from 'react'
import Welcome from './Welcome'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'

const Content = ({ count }) => {
  const [state, setState] = useState(0)
  const [gameDoc, setGameDoc] = useState('')

  const nextStep = () => {
    setState(state + 1)
  }

  const handleStartOnClick = (doc) => {
    setGameDoc(doc)
    setState(1)
  }

  return (
    <div className="content">
      {state === 0 && <Welcome handleStartOnClick={handleStartOnClick} />}
      {state === 1 && <QrcodeList gameDoc={gameDoc} nextStepEvent={nextStep} />}
      {state === 2 && <SlotMachine gameDoc={gameDoc} />}
    </div>
  )
}

export default Content
