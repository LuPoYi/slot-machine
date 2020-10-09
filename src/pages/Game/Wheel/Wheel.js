import React, { useState } from 'react'
import './wheel.css'

const Wheel = ({ nameList }) => {
  if (nameList == null) {
    nameList = [0, 1, 2, 3, 4, 5]
  }

  const [degree, setDegree] = useState(1800)

  const spinOnClick = () => {
    let count = 0
    let final = 700
    let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1
    let totalDegree = degree * 5 + extraDegree
    console.log('totalDegree', totalDegree)
    let interval = setInterval(function () {
      count++
      if (count === final) {
        clearInterval(interval)
      }
    }, 10)
    setDegree(totalDegree)
  }

  let pieceList = nameList.map((name) => {
    return (
      <div className="sec">
        <span className="name">{name}</span>
      </div>
    )
  })

  return (
    <div id="wrapper">
      <div id="wheel">
        <div id="inner-wheel" style={{ transform: `rotate( ${degree}deg )` }}>
          {pieceList}
        </div>

        <div id="spin" onClick={spinOnClick}>
          <div id="inner-spin"></div>
        </div>

        <div id="shine"></div>
      </div>

      <div id="txt"></div>
      <div className="test"></div>
    </div>
  )
}

export default Wheel
