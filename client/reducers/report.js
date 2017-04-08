
import { handleActions } from 'redux-actions'
import * as types from '../constants'

const initialState = {
  id: 4,
}

export default handleActions({
  [types.SELECT_FIELD] (state, action) {
    return action.payload
  },
}, initialState)
