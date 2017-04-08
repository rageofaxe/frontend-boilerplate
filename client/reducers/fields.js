
import { handleActions } from 'redux-actions'
import * as types from '../constants'

const initialState = {
  rows: [],
  count: 0,
}

export default handleActions({
  [types.UPDATE_FIELDS] (state, action) {
    return action.payload
  },
}, initialState)
