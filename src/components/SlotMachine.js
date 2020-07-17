import React, { Component } from 'react';

class SlotMachine extends Component {
  render() {
    return (
      <div className="slot-machine">
        <slotWindow />
        <br />
        <button onClick={this.handleClick}>Spin</button>
      </div>
    )
  }
}

export default SlotMachine