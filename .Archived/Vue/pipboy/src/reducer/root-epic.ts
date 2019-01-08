import { combineEpics } from 'redux-observable'

import { epics as agent } from './agent/epics'

export const rootEpic = combineEpics(
  agent
)