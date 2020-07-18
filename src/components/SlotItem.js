import React from 'react';

function SlotItem(props) {
  return (
    <div className="slot-item" id={props.id}>
      <img src={props.imgUrl} alt=""></img>
    </div>
  )
}

export default SlotItem