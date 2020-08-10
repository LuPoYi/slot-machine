import React, { Component } from 'react';
import ReactDom from 'react-dom'
import SlotWrap from './SlotWrap';

class SlotMachine extends Component {

  constructor() {
    super()
    this.state = {
      startedAt: null,
      totalItems: 10,
      pickIndex: 0,
      translateY: 0,
      itemHeight: 400,
      startOffset: 40 * 500, // init distances: itemHeight * (integer)
      height: 10 * 400, // totalItems * itemHeight
      duration: 4000, // time
      finalPosition: 0,
      isLoading: false,
      isFinished: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.animate = this.animate.bind(this)
  }

  handleClick() {
    const pickIndex = Math.floor(Math.random() * this.state.totalItems) // 10: 0 ~ 9
    this.setState({
      pickIndex: pickIndex,
      startedAt: null,
      finalPosition: pickIndex * this.state.itemHeight,
      isLoading: true,
      isFinished: false,
    })

    const next = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (cb) { window.setTimeout(cb, 1000 / 60) }
    next(this.animate)
  }

  animate(timestamp) {
    if (this.state.isFinished) { return }
    if (this.state.startedAt === null) { this.setState({ startedAt: timestamp }) }

    const timeDiff = timestamp - this.state.startedAt
    const timeRemaining = Math.max(this.state.duration - timeDiff, 0)
    const power = 3
    const percentage = 1 - (Math.pow(timeRemaining, power) / Math.pow(this.state.duration, power))
    const offset = percentage * this.state.startOffset
    const position = -1 * Math.floor((offset + this.state.finalPosition) % this.state.height)

    let slotWrap = document.getElementById('slot-wrap')
    ReactDom.findDOMNode(slotWrap).style.transform = "translateY(" + position + "px)"

    if (timeDiff > this.state.duration) {
      this.setState({ isFinished: true, isLoading: false })
    }

    const next = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (cb) { window.setTimeout(cb, 1000 / 60) }
    next(this.animate)
  }

  render() {
    return (
      <div>
        <div className="slot-machine">
          <div className="slot-window">
            <SlotWrap totalItems={this.state.totalItems} />
          </div>
        </div>
        <br />
        <button onClick={this.handleClick} disabled={this.state.isLoading}>{this.state.isLoading ? "Loading..." : "Spin"}</button>
        <br /><br /><br /><br /><br />
        <p>pickIndex: {this.state.pickIndex}</p>
        <p>finalPosition: {this.state.finalPosition}</p>
        <p>isFinished: {this.state.isFinished ? "Y" : "N"}</p>
      </div>
    )
  }
}

export default SlotMachine