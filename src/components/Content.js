import React, { Component, useState } from 'react'
import Welcome from './Welcome'
import QrcodeList from './QrcodeList'
import SlotMachine from './SlotMachine'
import itemData from '../data/itemData.json'

const Content = ({ count }) => {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(0)

  const nextStep = (st) => {
    setStatus(status + 1)
  }

  return (
    <div className="content">
      {status == 0 && <Welcome nextStepEvent={nextStep} />}
      {status == 1 && <QrcodeList count={3} nextStepEvent={nextStep} />}
      {status == 2 && <SlotMachine count={3} />}
    </div>
  )
}

export default Content
