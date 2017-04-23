import React, { Component } from 'react'
import R from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { API_SECTORS } from '../../constants'
import {
  FeatureGroup,
  LayersControl,
  Map,
  TileLayer,
  ZoomControl,
  GeoJSON,
  Popup,
} from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl

import * as FieldsActions from '../../actions/fields'
import style from '../../containers/Fields/style.css'
import CustomPopup from '../../containers/FieldsMap/popup'

class FertelizersMap extends Component {

  state = {
    isOpen: false,
    key: 0,
  }

  componentDidMount() {
    fetch(`${API_SECTORS}${this.props.fields.id || this.props.fields}`)
      .then(response => response.json())
      .then((data) => {
        this.props.actions.getSectors(data.data)
      })
  }

  render() {
    const { actions, fields, geometry, fertilizerId } = this.props
    const centroid = R.isEmpty(geometry.centroid) ? geometry.allFieldsCentroid : geometry.centroid
    return (
      <div>
        <div className={style.root}>
          <div className={style.flex}>
            <div className={style.content}>
              <div className={style.map} style={{top: 0, width: '100%', height: '100%'}}>
                <Map
                  center={centroid}
                  zoom={14}
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
                      name='Участки'
                      key={`f${this.state.key}`}
                      checked
                    >
                      <FeatureGroup>
                        {this.props.geometry.features.map((item, index) => <GeoJSON
                          data={item.geometry}
                          style={{fillOpacity: 0, weight: 4, color: 'BlueViolet'}}
                          key={`${index}f${this.state.key}`}
                        >
                          <Popup>
                            <CustomPopup
                              data={item.properties}
                              fertilizerId={fertilizerId}
                              setSector={actions.setSector}
                            />
                          </Popup>
                        </GeoJSON>)}
                      </FeatureGroup>
                    </Overlay>
                  </LayersControl>
                </Map>
                <div
                  style={{
                    position: 'fixed',
                    bottom: 0,
                    zIndex: 400,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      fontSize: 21,
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#bfbfbf',
                      width: 450,
                      background: '#fff',
                      padding: '12px 0',
                    }}
                    onClick={this.props.handleClose}
                  >
                    Отменить
                  </div>
                  <div
                    style={{
                      fontSize: 21,
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#fff',

                      width: 450,
                      background: '#54f2c3',
                      padding: '12px 0',
                    }}
                    onClick={this.props.handleClose}
                  >
                    Сохранить
                  </div>
                </div>
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
)(FertelizersMap)
