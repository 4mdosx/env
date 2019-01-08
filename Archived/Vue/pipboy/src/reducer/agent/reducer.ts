import { RootAction } from '../index'
import { Reducer, combineReducers } from 'redux'
import { getType } from 'react-redux-typescript'
import { actionCreators } from './actions'
import { MERGE_SETTING } from './actions'

export interface State {
  readonly auth: {
    u_id?: string
  },
  readonly privacy: any
}

export const initialState: State = {
  auth: {},
  privacy: {
    storage: true,
    cookie: true,
    report: true
  }
}

const auth: Reducer<State['auth']> =
(state: State['auth'] = initialState.auth, action: RootAction) => {
  switch (action.type) {
    case getType(actionCreators.update_agent):
      return action.payload
    case getType(actionCreators.reset_agent):
      return {}
    default: return state
  }
}
const privacy: Reducer<State['privacy']> =
(state: State['privacy'] = initialState.privacy, action: RootAction) => {
  switch (action.type) {
    case MERGE_SETTING:
      return {...state, ...action.payload.privacy}
    default: return state
  }
}

export const reducer =  combineReducers({
  auth,
  privacy
})
