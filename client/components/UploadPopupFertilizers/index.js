import React, { Component } from 'react'
import style from './style.css'

class UploadPopup extends Component {

  render() {
    return (
      <div className={style.root}>
        <div className={style.title}>Давайте загрузим файл элементарных участков</div>
        <div className={style.dragAndDrop}>
          <div className={style.icon}>
            <img src="/public/svg/upload.svg" />
          </div>
          <div className={style.description}>
            Перетащите сюда файл с эл. участками вашего поля или загрузите с диска
          </div>
        </div>

        <div
          className={style.uploadFileButton}
        >
          Загрузить
        </div>
        <a className={style.dragAndDrop} href="#">
          У меня нет такого файла, где его взять?
        </a>
      </div>
    )
  }
}

export default UploadPopup
