import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as agent, State as AgentState } from './agent'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState,
  agent: AgentState
}

export const rootReducer = combineReducers({
  router,
  agent
})
