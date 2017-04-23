import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import style from './style.css';
import Popup from '../Popup'
import Dropdown from '../UI/Dropdown'
import WorkForm from '../WorkForms'

const WORK_LIST = [
  'plowing',
  'sowing',
  'fertilizing',
  'chemical',
  'harvesting',
]

const WORK_TITLES = [
  'Вспашка',
  'Посев',
  'Химическая обработка',
  'Внесение удобрений',
  'Уборка',
]

class FieldHistory extends Component {

  componentDidMount() {
    this.Popup.handleOpen()
  }

  render() {
    return (
      <div className={style.root}>
        <Popup
          ref={node => {this.Popup = node}}
        >
          <WorkForm popup={this.Popup} />
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
