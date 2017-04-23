import React, { Component } from 'react'

export default class FormLine extends Component {
    render() {
        const style = {
            display: 'flex',
            marginBottom: 24,
            alignItems: 'center',
        }

        return (
            <div>
                <div></div>
                <div style={Object.assign(style, this.props.style)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}