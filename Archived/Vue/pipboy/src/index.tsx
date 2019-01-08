import 'babel-polyfill'

// tslint:disable:no-import-side-effect
// side-effect imports
import './rxjs-imports'
// tslint:enable:no-import-side-effect

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import './style/main.less'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
