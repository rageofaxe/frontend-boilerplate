
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { render } from 'react-dom'

import Menu from '../../components/Menu'

import FieldsSidebar from '../../components/FieldsSidebar'
import FieldsSidebarItem from '../../components/FieldsSidebar/item'

import FieldsHistory from '../../components/FieldsHistory'
import FieldsHistoryItem from '../../components/FieldsHistory/item'

import Report from '../../components/Report'
import FieldsMap from '../FieldsMap/'

import * as FieldsActions from '../../actions/fields'
import {
  API_GEOMETRY,
  API_FIELDS,
  API_LAYERS,
  API_SECTORS,
  API_ALL_FIELDS,
  FERTILIZERS_POTASSIUM,
  FERTILIZERS_NITRIC,
} from '../../constants'
import style from './style.css'
import { data } from './data'

const FERTILIZERS = 'fertilizers'
const REPORT = 'report'

class Fields extends Component {

  state = {
    isOpen: false,
    subRoute: REPORT,
  }

  selectField = (id) => {
    this.props.actions.selectField(id)
  }

  apiFields = () => {
    fetch(`${API_FIELDS}?limit=20&offset=0`)
    .then(response => response.json())
    .then(({ data }) => {
      this.props.actions.updateFields(data)
      this.selectField(data.rows[0])
    })
  }

  apiGeometry = () => {
    fetch(`${API_GEOMETRY}${this.props.report.id}`)
    .then(response => response.json())
    .then((data) => {
      this.props.actions.getGeometry(data.data)
    })
  }

  apiSectors = () => {
    fetch(`${API_SECTORS}${this.props.report.id}`)
    .then(response => response.json())
    .then((data) => {
      this.props.actions.getSectors(data.data)
    })
  }

  apiLayers = () => {
    fetch(`${API_LAYERS}${this.props.report.id}`)
    .then(response => response.json())
    .then((data) => {
      this.props.actions.getLayers(data.data)
    })
  }

  apiAllFields = () => {
    fetch(`${API_ALL_FIELDS}${this.props.report.id}`)
    .then(response => response.json())
    .then((data) => {
      this.props.actions.getAllFields(data.data)
    })
  }

  // FIXME: move to store
  componentWillMount() {
    this.apiFields()
    this.apiAllFields()
  }

  // FIXME: move to sagas
  componentDidUpdate() {
    this.apiGeometry()
    this.apiLayers()
    this.apiSectors()
  }

  render() {
    const { actions, fields, settings, currentRoute } = this.props

    return (
      <div>
	      <Menu />
        <div className={style.root}>
          <div className={style.flex}>
            <FieldsSidebar>
              <div className={style.scrollBar}>
                {fields.rows.map((item, i) => <FieldsSidebarItem
                  key={i}
                  title={item.title}
                  culture={item.culture}
                  area={item.area}
                  image={item.image}
                  isActive={this.props.report.id === item.id}
                  onClick={() => this.selectField(item)}
                />)}
              </div>
            </FieldsSidebar>

            <div className={style.content}>
              <Report
                className={this.state.subRoute === 'report' ? style.slideUp : style.slideDown}
                data={this.props.report}
                currentRoute={currentRoute}
              />

              <div className={style.map}>
                <div className={style.subRouting}>
                  {this.state.subRoute === 'report' &&
                    <div>
                      <span onClick={() => this.setState({subRoute: 'report'})}>Сводка</span>
                      <span onClick={() => this.setState({subRoute: 'fertilizers'})}>
                        Удобрения
                      </span>
                    </div>
                  }
                  {this.state.subRoute === 'fertilizers' &&
                    <div style={{display: 'flex'}}>
                      <span
                        onClick={() => this.setState({subRoute: 'report'})}
                        className={style.fertilizersTitle}
                      >
                        Удобрения
                      </span>
                      <img src="/public/svg/arrow.svg" />
                      <span
                        className={
                          settings.currentFertilizers === FERTILIZERS_NITRIC
                          ? style.activeFertilizersTitle
                          : style.fertilizersTitle
                        }
                        onClick={() => actions.clickFertilizers(FERTILIZERS_NITRIC)}
                      >
                        Азотные
                      </span>
                      <span
                        className={
                          settings.currentFertilizers === FERTILIZERS_POTASSIUM
                          ? style.activeFertilizersTitle
                          : style.fertilizersTitle
                        }
                        onClick={() => actions.clickFertilizers(FERTILIZERS_POTASSIUM)}
                      >
                        Калийные и фосфорные
                      </span>
                    </div>
                  }
                </div>
                <FieldsMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ fields, report, settings, routing }) {
  return {
    fields,
    report,
    settings,
    currentRoute: routing.locationBeforeTransitions.pathname,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FieldsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fields)
