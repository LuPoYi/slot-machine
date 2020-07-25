import React, { Component } from 'react';
import SlotItem from './SlotItem';

// SlotItem(props) {
class SlotWrap extends Component {
  render() {
    let lists = [];

    for (let i = 0; i < this.props.totalItems; i++) {
      lists.push(<SlotItem
        key={i}
        imgUrl={"https://picsum.photos/400/400?random=" + i}
        id={i}
      />)
    }

    return (
      <div className="slot-wrap" id="slot-wrap">
        {lists}
      </div>
    )
  }
}

export default SlotWrap