import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import style from './style.css';
import Popup from '../../components/Popup'
import UploadPopup from '../../components/UploadPopupFertilizers'
import Report from '../../components/Report'

class FieldSidebar extends Component {

  render() {
    return (
      <div className={style.root}>
        <div
          className={style.addField}
          onClick={() => this.Popup.handleOpen()}
        >
          <img src="/public/svg/add.svg" />
          Добавить поле
        </div>
        <Popup ref={node => {this.Popup = node}}>
          <UploadPopup />
        </Popup>
        {this.props.children}
      </div>
    )
  }
}

export default FieldSidebar
