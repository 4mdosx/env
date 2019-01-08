import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootReducer, rootEpic, RootState } from '@src/reducer'

const history = createHistory()
const routerMiddlewareWithHistory = routerMiddleware(history)
const epicMiddleware = createEpicMiddleware(rootEpic)

const middlewares = [
  routerMiddlewareWithHistory,
  thunk,
  epicMiddleware
]

// compose enhancers
const enhancer = compose(
  applyMiddleware(...middlewares),
)

const configureStore = (preloadedState?: RootState) => {
  return createStore(
    rootReducer,
    preloadedState!,
    enhancer
  )
}

export default configureStore
export const routerHistory = history