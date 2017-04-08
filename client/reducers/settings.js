
import { handleActions } from 'redux-actions'
import * as types from '../constants'
import R from 'ramda'

const initialState = {
  currentMapView: [types.MAP_VIEW_ALL_FIELDS],
  currentFertilizers: types.FERTILIZERS_NITRIC
}

const lensMapView = R.lensProp('currentMapView')
const lensFertilizers = R.lensProp('currentFertilizers')

export default handleActions({
  [types.SELECT_FIELD] (state) {
    return R.set(lensMapView, types.MAP_VIEW_FIELD, state)
  },

  [types.SET_NDVI] (state) {
    if(R.contains(types.MAP_VIEW_NDVI, R.view(lensMapView, state))) {
      return state
    } else {
      return R.push(types.MAP_VIEW_NDVI, state)
    }
  },

  [types.CLICK_FERTILIZERS] (state, {payload}) {
    return R.set(lensFertilizers, payload, state)
  },

}, initialState)
