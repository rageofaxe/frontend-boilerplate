import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import style from './style.css';
import Popup from '../Popup'

class FieldHistory extends Component {

  render() {

    return (
      <div className={style.root}>
        <Popup ref={node => {this.Popup = node}}>
          <img src="/public/svg/work.png" />
        </Popup>
        <div className={style.topBar}>
          <Link
            className={style.subRoute}
            activeClassName={style.activeSubRoute}
            to='/fields/work/history'
          >
            В работе
          </Link>
          <Link
            className={style.subRoute}
            to='/fields/work/doing'
            activeClassName={style.activeSubRoute}
          >
            История операция
          </Link>
        </div>
        {this.props.children}
        <div className={style.addField} onClick={() => this.Popup.handleOpen()}>
          <img src="/public/svg/add.svg" />
          Добавить работу
        </div>
      </div>
    )
  }
}

export default FieldHistory
