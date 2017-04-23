import { handleActions } from 'redux-actions'
import * as types from '../constants'
import R from 'ramda'

const initialState = {
  geometry: {},
  centroid: {},
  rows: [],
  currentWMS: {},
  features: [],
  allFields: ['init'],

  mapSectors: [],
}

const currentWMSLens = R.lensProp('currentWMS')

export default handleActions({
  [types.SELECT_FIELD] (state) {
    return R.set(currentWMSLens, R.last(state.rows), state)
  },

  [types.GET_GEOMETRY] (state, {payload}) {
    return R.merge(state, payload)
  },

  [types.GET_ALL_FIELDS] (state, {payload}) {
    return Object.assign({}, state, {
      allFields: payload.geometry.features,
      allFieldsCentroid: payload.centroid,
    })
  },

  [types.GET_LAYERS] (state, {payload}) {
    return Object.assign({}, state, {
      rows: payload.rows,
      currentWMS: R.last(payload.rows),
    })
  },

  [types.GET_SECTORS] (state, {payload}) {
    return R.set(R.lensProp('features'), payload.features, state)
  },

  [types.SET_SECTOR] (state, {payload}) {
    console.log('SECTORS', state.mapSectors)
    const index = R.findIndex(item => {
      return item.sectorId === payload.sectorId && item.fertilizerId === payload.fertilizerId
    }, state.mapSectors)
    if(index > -1) {
      return Object.assign({}, state, {
        mapSectors: R.set(R.lensIndex(index), payload, state.mapSectors)
      })
    }
    return Object.assign({}, state, {
      mapSectors: R.append(payload, state.mapSectors)
    })
  },
}, initialState)
