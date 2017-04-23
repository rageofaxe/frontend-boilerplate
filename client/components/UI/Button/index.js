import React, { Component } from 'react'
import style from './style.css'

export default class Button extends Component {
    render() {
        return (
            <div className={style.bigButton} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}