import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Menu from '../../components/Menu'
import FieldsSidebar from '../../components/FieldsSidebar'
import FieldsSidebarItem from '../../components/FieldsSidebar/item'
import {
  FeatureGroup,
  LayersControl,
  Map,
  TileLayer,
  ZoomControl,
  GeoJSON,
} from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl

import * as FieldsActions from '../../actions/fields'
import {
  API_FIELDS,
  API_ALL_FIELDS,
} from '../../constants'
import style from '../Fields/style.css'

const FERTILIZERS = 'fertilizers'

class AllFields extends Component {

  state = {
    isOpen: false,
    subRoute: FERTILIZERS,
    key: 0,
  }

  clickField = (field) => {
    this.selectField(field)
    browserHistory.push(`/fields/${field.id}`);
  }

  selectField = (field) => {
    this.props.actions.selectField(field)
    this.props.actions.callLayers(field)
    this.props.actions.callGeometry(field)
  }

  apiFields = () => {
    fetch(`${API_FIELDS}?limit=20&offset=0`)
    .then(response => response.json())
    .then(({ data }) => {
      this.props.actions.updateFields(data)
      this.selectField(data.rows[0])
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

  componentDidMount() {
    this.props.actions.selectField(this.props.report.id)
  }

  render() {
    const { actions, fields, geometry } = this.props
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
                  onClick={() => this.clickField(item)}
                />)}
              </div>
            </FieldsSidebar>

            <div className={style.content}>
              <div className={style.map}>
                <Map
                  center={geometry.allFieldsCentroid}
                  zoom={11}
                  zoomControl={false}
                  style={{height: '100%'}}
                >
                  <ZoomControl position='bottomright' />
                  <LayersControl position='topright'>
                    <BaseLayer checked name='Карта'>
                      <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                    </BaseLayer>
                    <Overlay
                      name='Все поля'
                      key={`all${this.state.key}`}
                      checked
                    >
                      <FeatureGroup>
                        {geometry.allFields.map((item, index) => <GeoJSON
                          data={item.geometry}
                          style={{fillOpacity: 0, weight: 1, color: 'red'}}
                          key={`${index}all${this.state.key}`}
                        >
                        </GeoJSON>)}
                      </FeatureGroup>
                    </Overlay>
                  </LayersControl>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ geometry, fields, report, settings, routing }) {
  return {
    fields,
    report,
    settings,
    geometry,
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
)(AllFields)
