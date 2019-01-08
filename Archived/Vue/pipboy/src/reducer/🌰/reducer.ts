import { RootAction } from '../index'
import { Reducer } from 'redux'
// import { getType } from 'react-redux-typescript'
// import { actionCreators } from './actions'

// import * as _ from 'lodash'

export interface State {
  readonly testCount: number,
  readonly testPayload: any
}

export const initialState: State = {
  testCount: 0,
  testPayload: null
}

export const reducer: Reducer<State> =
(state = initialState, action: RootAction) => {
  switch (action.type) {
    // case getType(actionCreators.test_action):
    //   return {...state, testCount: state.testCount + 1}
    default: return state
  }
}
