import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { logger, api } from '../middleware'
import rootReducer from '../reducers'
import mySaga from '../sagas'

export default function configure(initialState) {

  const sagaMiddleware = createSagaMiddleware()
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    api
  )(create)

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  store.dispatch({
    type: 'INIT',
    data: [1,2,3]
  })

  sagaMiddleware.run(mySaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
