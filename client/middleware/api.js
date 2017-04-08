import * as types from '../constants'

export default store => next => action  => {
  if(action.type === types.SELECT_FIELD) {
    console.log('FETCH');
  }
  return next(action)
}
