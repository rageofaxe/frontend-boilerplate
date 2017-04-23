import R from 'ramda'
import { handleActions } from 'redux-actions'
import * as types from '../constants'

const initialState = {
  rows: [],
  count: 0,
  id: 4,
}

export default handleActions({
  [types.UPDATE_FIELDS] (state, action) {
    return action.payload
  },

  ["@@router/LOCATION_CHANGE"] (state, {payload}) {
    const [route, id] = R.pipe(
      R.split('/'),
      R.filter(R.identity)
    )(payload.pathname)

    if(R.equals("fields", route) && R.not(R.isNil(id))) {
      console.log(route, id)
      return find
    }

    return state
  }
}, initialState)
