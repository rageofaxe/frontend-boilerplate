import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import style from './style.css';

class Menu extends Component {

  render() {
    const data = [
      {name: 'Поля', url: '/fields', icon: <img src="/public/svg/fields.svg" />},
      {name: 'Работы', url: '/works', icon: <img src="/public/svg/works.svg" />},
      {name: 'Склады', url: '/stores', icon: <img src="/public/svg/stores.svg" />},
      {name: 'Парк', url: '/park', icon: <img src="/public/svg/park.svg" />},
      {name: 'Погода', url: '/weether', icon: <img src="/public/svg/weether.svg" />},
      {name: 'Анализ', url: '/analysis', icon: <img src="/public/svg/analysis.svg" />},
    ]

    return (
      <div className={style.root}>
        <div className={style.logo}>
          <img src="/public/svg/logo.svg" />
        </div>
        <div className={style.items}>
          {data.map((item, i) =>
            <div
              onClick={browserHistory.push.bind(this, item.url)}
              key={i}
              className={style.item}
            >
              <div className={style.itemLogo}>
                {item.icon}
              </div>
              {item.name}
            </div>
          )}
        </div>
        <div className={style.info}>
          <div style={{background: 'tomato', width: 32, height: 32, borderRadius: '50%'}}></div>
          <div className={style.infoName}>
            <span>Пётр</span>
            <span>Кропоткин</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu
