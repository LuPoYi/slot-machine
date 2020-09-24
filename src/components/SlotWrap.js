import React, { Component } from 'react'
import SlotItem from './SlotItem'
import itemData from '../data/itemData.json'

class SlotWrap extends Component {
  render() {
    let lists = []

    itemData.forEach((item) => {
      lists.push(<SlotItem key={item.name} imgUrl={item.photoURL} name={item.name} />)
    })

    return (
      <div className="slot-wrap" id="slot-wrap">
        {lists}
      </div>
    )
  }
}

export default SlotWrap
