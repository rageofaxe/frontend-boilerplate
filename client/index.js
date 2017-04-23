import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import AllFields from './containers/AllFields'
import Fields from './containers/Fields'
import Works from './containers/Works'
import Stores from './containers/Stores'
import Weether from './containers/Weether'
import Park from './containers/Park'
import Analysis from './containers/Analysis'
import AddField from './containers/AddField'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AllFields}></Route>
      <Route path="/fields" component={AllFields}></Route>
      <Route path="/fields/:id" component={Fields}></Route>

      <Route path="/fields/work/doing" component={Fields}></Route>
      <Route path="/fields/work/history" component={Fields}></Route>

      <Route path="/add-field" component={AddField}></Route>
      <Route path="/works" component={Works}></Route>
      <Route path="/stores" component={Stores}></Route>
      <Route path="/park" component={Park}></Route>
      <Route path="/weether" component={Weether}></Route>
      <Route path="/analysis" component={Analysis}></Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
