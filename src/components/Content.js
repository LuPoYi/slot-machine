import React, { Component } from 'react'
import SlotMachine from './SlotMachine'
import QrcodeList from './QrcodeList'
import itemData from '../data/itemData.json'

class Content extends Component {
  constructor() {
    super()
    this.state = { jsonData: JSON.stringify(itemData) }
  }

  updateJsonData(jsonData) {
    this.setState({ jsonData: jsonData })
  }

  render() {
    return (
      <div>
        <SlotMachine jsonData={this.state.jsonData} />
        <QrcodeList count={9} />
      </div>
    )
  }
}

export default Content
