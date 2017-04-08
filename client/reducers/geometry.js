
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
    // return R.set(R.lensPath('all', payload.geometry.features, state))
    return Object.assign({}, state, {
      allFields: payload.geometry.features,
      allFieldsCentroid: payload.centroid,
    })
  },

  [types.GET_LAYERS] (state, {payload}) {
    // return R.set(
    //   R.lensProp('currentWMS'),
    //   R.last(payload.rows) || {},
    //   R.merge(state, payload.rows)
    // )
    return Object.assign({}, state, {
      rows: payload.rows,
    });
  },

  [types.GET_SECTORS] (state, {payload}) {
    return R.set(R.lensProp('features'), payload.features, state);
  },
}, initialState)
