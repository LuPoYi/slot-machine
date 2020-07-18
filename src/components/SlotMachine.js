import React, { Component } from 'react';
import ReactDom from 'react-dom'
import SlotWrap from './SlotWrap';

class SlotMachine extends Component {

  constructor() {
    super()

    this.state = {
      startedAt: null,
      pickIndex: 0,
      translateY: 0,
      itemHeight: 400,
      startOffset: 40000,
      height: 4000,
      duration: 4000, // time
      finalPosition: 0,
      isFinished: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.animate = this.animate.bind(this)
  }

  handleClick() {
    const pickIndex = Math.floor(Math.random() * 10) // 0 ~ 9
    this.setState({
      pickIndex: pickIndex,
      startedAt: null,
      finalPosition: pickIndex * this.state.itemHeight,
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
      this.setState({ isFinished: true })
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
            <SlotWrap />
          </div>
        </div>
        <br /><br /><br /><br /><br />
        <p>pickIndex: {this.state.pickIndex}</p>
        <p>finalPosition: {this.state.finalPosition}</p>
        <p>isFinished: {this.state.isFinished ? "Y" : "N"}</p>
        <button onClick={this.handleClick}>Spin</button>
      </div>
    )
  }
}

export default SlotMachine



// start: function() {
//   if (this.opts) {
//     return
//   }
//   const slot = this.$refs.slot
//   const itemHeight = this.$refs.slotWindow.clientHeight
//   const length = Object.keys(this.prizes).length;
//   const choice = vm.winPrizeType

//   this.opts = {
//     el: slot.querySelector('.slot__wrap'),
//     finalPos: choice * itemHeight,
//     startOffset: itemHeight * 100,
//     height: (length + 1) * itemHeight,
//     duration: 4000, // milliseconds
//     isFinished: false,
//   }
//   next(this.animate)
// },
// animate: function(timestamp) {
//   if (this.startedAt == null) {
//     this.startedAt = timestamp
//   }

//   const timeDiff = timestamp - this.startedAt
//   if (this.opts.isFinished) {
//     return
//   }
//   const timeRemaining = Math.max(this.opts.duration - timeDiff, 0)
//   const power = 3
//   const percentage = 1 - (Math.pow(timeRemaining, power) / Math.pow(this.opts.duration, power))
//   const offset = percentage * this.opts.startOffset
//   const pos = -1 * Math.floor((offset + this.opts.finalPos) % this.opts.height)

//   this.opts.el.style.transform = "translateY(" + pos + "px)"

//   if (timeDiff > this.opts.duration) {
//     this.opts.isFinished = true
//   }

//   // finish
//   if (this.opts.isFinished) {
//     this.opts = null
//     this.startedAt = null
//     this.isPulling = false;

//   } else {
//     next(this.animate)
//   }
// },