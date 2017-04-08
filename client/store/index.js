
import { createStore, applyMiddleware } from 'redux'

import { logger, api } from '../middleware'
import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'
// import mySaga from '../sagas'

export default function configure(initialState) {

  // const sagaMiddleware = createSagaMiddleware()
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    api
    // sagaMiddleware,
  )(create)

  // sagaMiddleware.run(mySaga)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
