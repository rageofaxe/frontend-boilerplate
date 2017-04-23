import { fork, call, put, take, select } from 'redux-saga/effects'
import {
  GET_LAYERS, CALL_LAYERS, API_LAYERS,
  GET_GEOMETRY, CALL_GEOMETRY, API_GEOMETRY,
  SELECT_FIELD,
  WORKS_IN_PROGRESS, WORKS_HISTORY,
} from '../constants'

const api = url => {
  return fetch(url)
    .then(response => response.json())
    .then(({data}) => {
      return data
    })
}

function* getLayers() {
  while (true) {
    yield take(CALL_LAYERS)
    const { report } = yield select()
    const payload = yield call(api, `${API_LAYERS}${report.id}`)
    yield put({type: GET_LAYERS, payload})
  }
}

function* selectField() {
  while (true) {
    const { payload } = yield take(SELECT_FIELD)
    yield put({
      type: WORKS_IN_PROGRESS,
      payload: yield call(api, `http://api.onesoil.by/v1.0.0/fields/operations?id=${payload.id || payload}&planned=1`)
    })
    yield put({
      type: WORKS_HISTORY,
      payload: yield call(api, `http://api.onesoil.by/v1.0.0/fields/operations?id=${payload.id || payload}&planned=0`)
    })
  }
}

function* getGeometry() {
  while (true) {
    yield take(CALL_GEOMETRY)
    const { report } = yield select()
    const payload = yield call(api, `${API_GEOMETRY}${report.id}`)
    yield put({type: GET_GEOMETRY, payload})
  }
}

export default function* () {
  yield [
    fork(getLayers),
    fork(getGeometry),
    fork(selectField)
  ]
}
