import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  isEmpty,
  flatten,
  addIndex,
  partition,
  pipe,
  max,
  min,
  reduce,
  contains,
 } from 'ramda'

import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  ZoomControl,
  Polygon,
  Tooltip,
  GeoJSON,
  WMSTileLayer,
} from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl
import * as constants from '../../constants'
import style from './style.css'
import { geometry } from './geometry'
import CustomPopup from './popup'
import * as FieldsActions from '../../actions/fields'
import { last } from 'ramda'

class FieldsMap extends Component {

  state = {
    key: 0,
    isNDVI: true,
  }

  componentWillUpdate() {
    this.state.currentWMS = this.props.geometry.currentWMS
  }

  setWMS = currentWMS => {
    // this.props.actions.setNDVI()
    // this.setState({currentWMS, isNDVI: true})
    this.forceUpdate()
  }

  render() {
    const { settings, geometry } = this.props
    const data = geometry.geometry
    const center = geometry.centroid
    const layers = geometry.rows
    const currentWMS = this.state.currentWMS || this.props.geometry.currentWMS

    console.log('>>>', currentWMS)

    const isAllFields = () =>
       contains(constants.MAP_VIEW_ALL_FIELDS, settings.currentMapView)

    const isFieldBorder = () =>
      contains(constants.MAP_VIEW_FIELD, settings.currentMapView)

    const isFieldNDVI = () => this.state.isNDVI
      contains(constants.MAP_VIEW_NDVI, settings.currentMapView)

    const isFieldSectors = () =>
      contains(constants.MAP_VIEW_SECTORS, settings.currentMapView)

    this.state.key++

    if(isEmpty(data)) {
      return null
    }

    console.log('currentWMS', currentWMS)

    const pair = pipe(
      flatten,
      addIndex(partition)((item, index) => index % 2 == 0),
      ([x, y]) => [
        [reduce(min, 180, y), reduce(min, 180, x)],
        [reduce(max, 0, y), reduce(max, 0,  x)],
      ]
    )(data.coordinates)

    return (
      <Map
        center={isAllFields() ? geometry.allFieldsCentroid : center}
        zoom={11}
        bounds={isAllFields() ? false : pair}
        boundsOptions={{padding: [100, 100]}}
        zoomControl={false}
        className={style.root}
      >
        <div className={style.footer}>
          <div className={style.dates}>
            <div className={style.datesTitle}>Дата съемки</div>
            <div className={style.datesValues}>
              {layers.map((item, index) =>
                <span
                  key={index}
                  className={style.datesValue}
                  onClick={() => this.setWMS(item)}
                >
                  {item.date}
                </span>
              )}
            </div>
          </div>
          <div className={style.footerToolbar}>
            <div className={style.footerToolbarInfo}>
              Файл в формате ZIP для бортовых компьютеров JohnDeere, Trimble, Teejet
            </div>
            <div className={style.footerToolbarButton}>
              Скачать карту для дифвнесения (N)
            </div>
          </div>
        </div>
        <LayersControl position='topright'>
          <BaseLayer checked name='Карта'>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </BaseLayer>

          <Overlay
            name='Граница поля'
            key={this.state.key}
            checked={isFieldBorder()}
          >
            <FeatureGroup>
              <GeoJSON
                data={data}
                color='tomato'
                style={{fillOpacity: 0, weight: 4,}}
              />
            </FeatureGroup>
          </Overlay>

          <Overlay
            name='Участки'
            key={`f${this.state.key}`}
            checked={isFieldSectors()}
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
                    currentFertilizers={settings.currentFertilizers}
                  />
                </Popup>
              </GeoJSON>)}
            </FeatureGroup>
          </Overlay>

          <Overlay
            name='Все поля'
            key={`all${this.state.key}`}
            checked={isAllFields()}
          >
            <FeatureGroup>
              {this.props.geometry.allFields.map((item, index) => <GeoJSON
                data={item.geometry}
                style={{fillOpacity: 0, weight: 1, color: 'red'}}
                key={`${index}all${this.state.key}`}
              >
              </GeoJSON>)}
            </FeatureGroup>
          </Overlay>

          <Overlay
            checked={isFieldNDVI()}
            name='NDVI'
            key={`wms${this.state.key}`}
          >
            <FeatureGroup>
              <WMSTileLayer
                name="wms"
                layers={currentWMS.name}
                format="image/png"
                transparent={true}
                url="http://geoserver.onesoil.by/geoserver/landsat/wms"
                key={`wms${this.state.key}`}
              />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
        <ZoomControl position='bottomright' className={style.control} />
      </Map>
    )
  }
}

function mapStateToProps({ geometry, settings }) {
  return {
    geometry,
    settings,
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
)(FieldsMap)
