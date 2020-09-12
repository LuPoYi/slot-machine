import React from 'react';

function SlotItem(props) {
  return (
    <div className="slot-item" id={props.name}>
      <img src={props.imgUrl} alt=""></img>
      <div className="name">{props.name}</div>
    </div>
  )
}

export default SlotItem