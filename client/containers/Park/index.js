
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Menu from '../../components/Menu'
// import * as TodoActions from '../../actions/todos'
import L from 'leaflet'

class Park extends Component {
  componentDidMount() {
    const el = document.getElementById('test');
    const mymap = L.map('test').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
  }

  render() {
    const { todos, actions, children } = this.props
    return (
      <div>
	     <Menu />
       <div id="test">2</div>
      </div>
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
)(Park)
