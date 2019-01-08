// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux'
import { Actions as AgentActions } from '@src/reducer/agent'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | AgentActions[keyof AgentActions]