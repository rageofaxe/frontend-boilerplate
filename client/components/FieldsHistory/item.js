import React, { Component } from 'react'
import style from './style.css';

class Item extends Component {

  render() {
    return (
      <div className={style.item}>
        <div className={style.itemHeader}>
          <div className={style.itemTitle}>Title</div>
          <div className={style.itemSquare}>25ga</div>
        </div>
        <div className={style.itemDateTime}>12 апреля, 12.05</div>
        
      </div>
    )
  }
}

export default Item
