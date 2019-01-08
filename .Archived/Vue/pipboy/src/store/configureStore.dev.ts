import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootReducer, rootEpic, RootState } from '@src/reducer'

const composeEnhancers = (
  // @ts-ignore
  process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const history = createHistory()
const routerMiddlewareWithHistory = routerMiddleware(history)
const epicMiddleware = createEpicMiddleware(rootEpic)

const middlewares = [
  routerMiddlewareWithHistory,
  thunk,
  epicMiddleware
]

// compose enhancers
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
)

const configureStore = (preloadedState?: RootState) => {
  const store = createStore(
    rootReducer,
    preloadedState!,
    enhancer
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer').rootReducer
      const nextRootEpic = require('../reducer').rootEpic
      store.replaceReducer(nextRootReducer)
      epicMiddleware.replaceEpic(nextRootEpic)
    })
  }
  return store
}

export default configureStore
export const routerHistory = history