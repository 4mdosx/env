import * as React from 'react'

import { Provider, Store } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { actionCreators } from '@src/reducer/agent'

import { routerHistory } from '../store/configureStore'

import AppCollection from './AppCollection'
import Agent from './Agent'

const NoMatch = () => {
  return (
    <p>Nonsence</p>
  )
}

interface RootProps {
  store: Store<any>
}

class Root extends React.Component<RootProps> {
  render () {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={routerHistory}>
          <div className="storeContainer fullPage">
            <Switch>
              <Route path="/" exact={true} component={AppCollection} />
              <Route path="/apps" component={AppCollection} />
              <Route path="/agent" component={Agent} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }

  componentDidMount () {
    const { dispatch } = this.props.store
    dispatch(actionCreators.root_mounted())
  }
}

export default Root
