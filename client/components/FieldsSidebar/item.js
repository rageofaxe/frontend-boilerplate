import React, { Component } from 'react'
import style from './style.css';

class Item extends Component {

  render() {
    const { title, culture, area, onClick, isActive, image } = this.props
    return (
      <div className={isActive ? style.activeItem : style.item} onClick={onClick}>
        <div className={style.itemTitle}>{title}</div>
        <div className={style.itemCulture}>{culture}</div>
        <div className={style.itemData}>
          <div className={style.itemDataSquare}>
            {!!image && <img src={image} className={style.image} />}
            {area} га
          </div>
          {false && <div className={style.itemDataWeether}>-10</div>}
        </div>
      </div>
    )
  }
}

export default Item
