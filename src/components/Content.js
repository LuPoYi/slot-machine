import React, { Component, useState } from 'react'
import Welcome from './Welcome'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'
import itemData from '../data/itemData.json'

const Content = ({ count }) => {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(0)
  const [doc, setDoc] = useState('')

  const nextStep = (st) => {
    setStatus(status + 1)
  }

  const handleStartOnClick = (gameDoc) => {
    setDoc(gameDoc)
    setStatus(1)
  }

  return (
    <div className="content">
      {status == 0 && <Welcome handleStartOnClick={handleStartOnClick} />}
      {status == 1 && <QrcodeList doc={doc} nextStepEvent={nextStep} />}
      {status == 2 && <SlotMachine count={3} />}
    </div>
  )
}

export default Content
