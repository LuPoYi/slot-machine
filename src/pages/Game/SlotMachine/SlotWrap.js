import React from 'react'
import itemData from '../../../assets/itemData.json'

const SlotWrap = () => {
  const SlotItem = ({ photoURL, name }) => {
    return (
      <div className="slot-item" id={name}>
        <img src={photoURL} alt=""></img>
        <div className="name">{name}</div>
      </div>
    )
  }

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

export default SlotWrap
