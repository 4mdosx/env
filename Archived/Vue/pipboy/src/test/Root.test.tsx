import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from '../containers/Root'
import configureStore from '../store/configureStore'

const store = configureStore()
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Root store={store} />, div)
})
