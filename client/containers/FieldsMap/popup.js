import React, { Component } from 'react'
import * as constants from '../../constants'
import $ from 'jquery'
import style from './popup.css'

export default class Popup extends Component {
  render() {
    const fertelizerTitle =
      this.props.fertilizerId === 1 ? 'Фосфора' :
      this.props.fertilizerId === 2 ? 'Азота' : 'Калия'
    console.log('>>>', this.props.popup)
    return (
      <div >
        <div className={style.title}>
          Норма {fertelizerTitle}
        </div>
        <div className={style.control}>
          <div
            className={style.inputWrapper}
            ref={node => {this.inputWrapper = node}}
            onClick={() => {this.input.focus()}}
          >
            <input
              className={style.input}
              ref={node => {this.input = node}}
              defaultValue={this.props.data.phosphorus}
            />
            <div className={style.dim}>кг/га</div>
          </div>
          <div
            className={style.button}
            onClick={() => {

              this.props.setSector({
                sectorId: this.props.data.id,
                fertilizerId: this.props.fertilizerId,
                value: this.input.value
              })
            }}
          >
            Сохранить
          </div>
        </div>
      </div>
    )
  }
}
