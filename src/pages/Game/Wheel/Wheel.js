import React, { useState } from 'react'
import './wheel.css'

const Wheel = () => {
  const [degree, setDegree] = useState(1800)

  const spinOnClick = () => {}

  return (
    <div id="wrapper">
      <div id="wheel">
        <div id="inner-wheel">
          <div className="sec">
            <span className="fa fa-bell-o">1</span>
          </div>
          <div className="sec">
            <span className="fa fa-comment-o">2</span>
          </div>
          <div className="sec">
            <span className="fa fa-smile-o">3</span>
          </div>
          <div className="sec">
            <span className="fa fa-heart-o">4</span>
          </div>
          <div className="sec">
            <span className="fa fa-star-o">5</span>
          </div>
          <div className="sec">
            <span className="fa fa-lightbulb-o">6</span>
          </div>
        </div>

        <div id="spin" onClick={spinOnClick}>
          <div id="inner-spin"></div>
        </div>

        <div id="shine"></div>
      </div>

      <div id="txt"></div>
    </div>
  )
}

export default Wheel
