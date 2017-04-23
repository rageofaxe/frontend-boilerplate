import React, { Component } from 'react'
import style from './style.css'

export default class Input extends Component {

    static defaultProps = {
        type: 'text'
    }

    render() {
        const {label, children, style: s, ...props} = this.props
        return (
            <div style={{width: '100%'}}>
                <input
                    className={style.root}
                    placeholder={label}
                    {...props}
                    style={this.props.style}
                />
                {children}
            </div>
        )
    }
}