
import { handleActions } from 'redux-actions'
import * as types from '../constants'
import R from 'ramda'

const initialState = {
  history: [],
  inProgress: [],
}

const lensHistory = R.lensProp('history')
const lensInProgress = R.lensProp('inProgress')

export default handleActions({
  [types.WORKS_HISTORY] (state, {payload}) {
    return R.set(lensHistory, payload.rows, state)
  },

  [types.WORKS_IN_PROGRESS] (state, {payload}) {
    console.log('!!!!', payload)
    return R.set(lensInProgress, payload.rows, state)
  },

}, initialState)