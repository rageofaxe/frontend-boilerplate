
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Menu from '../../components/Menu'

class Fields extends Component {
  render() {
    const { todos, actions, children } = this.props
    const position = [46, 48];

    return (
     <Map center={position} zoom={5} style={{height: 400}} >
         <TileLayer
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
         />
         <Marker position={position}>
           <Popup>
             <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
           </Popup>
         </Marker>
       </Map>

    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fields)
