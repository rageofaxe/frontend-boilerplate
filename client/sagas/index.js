import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* mySaga() {
  while (true) {
    const { payload: { ids, id } } = yield take(FETCH);

    yield put(actions.fetchSelectedSuccess({
      markers: markers.places,
      id,
    }));
  }
}

export default mySaga;
