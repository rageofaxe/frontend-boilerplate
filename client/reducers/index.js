
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import fields from './fields'
import geometry from './geometry'
import report from './report'
import settings from './settings'

export default combineReducers({
  routing,
  fields,
  report,
  geometry,
  settings,
})
