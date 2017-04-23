import React, { Component } from 'react'
import style from './style.css';

class Item extends Component {

  render() {
    return (
      <div className={style.item}>
        <div className={style.itemHeader}>
          <div className={style.itemTitle}>{this.props.data.type}</div>
          <div className={style.itemSquare}>25ga</div>
        </div>
        <div className={style.itemDateTime}>{this.props.data.start}</div>
        
      </div>
    )
  }
}

export default Item
