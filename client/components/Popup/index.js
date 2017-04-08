import React, { Component } from 'react'
import Portal from 'react-portal'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import style from './style.css';

class Popup extends Component {

  state = {
    isOpen: false,
    isFadeOut: false,
  }

  handleClose = () => {
    this.setState({ isFadeOut: true }, () => {
      setTimeout(() => {
        this.setState({ isOpen: false })
      }, 300)
    })

  }

  handleOpen = () => {
    this.setState({ isOpen: true, isFadeOut: false })
  }

  render() {
    const {openByClickOn, children} = this.props

    return (
      <Portal
        closeOnEsc
        closeOnOutsideClick
        onClose={this.handleClose}
        isOpened={this.state.isOpen}
        onOpen={this.handleOpen}
      >
        <div
          className={this.state.isFadeOut ? style.overlayOff : style.overlay}
          onClick={e => this.handleClose()}
        >
          <div onClick={e => e.stopPropagation()}>
            <div className={this.state.isFadeOut ? style.contentOff : style.content}>
              {children}
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

export default Popup
