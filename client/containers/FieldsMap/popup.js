import React, { Component } from 'react'
import * as constants from '../../constants'
import style from './popup.css'

export default class Popup extends Component {
  render() {
    const isNitric = () => this.props.currentFertilizers === constants.FERTILIZERS_NITRIC
    console.log('popup', this.props.data)
    return (
      <div >
        <div className={style.title}>
          {isNitric() ? 'Норма азота' : 'Норма фосфора и калия'}
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
          <div className={style.button}>
            Сохранить
          </div>
        </div>
      </div>
    )
  }
}
