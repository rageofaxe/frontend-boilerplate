import React, { Component } from 'react'
import style from './style.css'

class UploadPopup extends Component {

  render() {
    return (
      <div className={style.root}>
        <div className={style.title}>Давайте загрузим границы</div>
        <div className={style.dragAndDrop}>
          <div className={style.icon}>
            <img src="/public/svg/upload.svg" />
          </div>
          <div className={style.description}>
            Перетащите KML или ZIP файл с границами вашего поля или загрузите с диска
          </div>
        </div>

        <div
          className={style.uploadFileButton}
        >
          Загрузить
        </div>

      </div>
    )
  }
}

export default UploadPopup
