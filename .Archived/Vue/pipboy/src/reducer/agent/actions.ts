import { createAction } from 'react-redux-typescript'

export const ROOT_MOUNTED = 'ROOT_MOUNTED'
export const MERGE_SETTING = 'MERGE_SETTING'
export const UPDATE_AGENT = 'UPDATE_AGENT'
export const RESET_AGENT = 'RESET_AGENT'
export const GLOBAL_ERROR = 'GLOBAL_ERROR'

export interface Actions {
  ROOT_MOUNTED: {
    type: typeof ROOT_MOUNTED
  },
  UPDATE_AGENT: {
    type: typeof UPDATE_AGENT,
    payload: any
  }
  RESET_AGENT: {
    type: typeof RESET_AGENT
  }
  MERGE_SETTING: {
    type: typeof MERGE_SETTING,
    payload: any
  }
  GLOBAL_ERROR: {
    type: typeof GLOBAL_ERROR,
    payload: {
      module: string,
      error: any
    },
    error: boolean
  }
}

export const globalErrorLogger = (error: any) => {
  return { type: GLOBAL_ERROR, payload: {module: 'auth', error }, error: true }
}
export const actionCreators = {
  root_mounted: createAction(ROOT_MOUNTED),
  merge_setting: createAction(MERGE_SETTING, payload => ({
    type: MERGE_SETTING,
    payload
  })),
  update_agent: createAction(UPDATE_AGENT, payload => ({
    type: UPDATE_AGENT,
    payload
  })),
  reset_agent: createAction(RESET_AGENT),
  add_error_logger: createAction(GLOBAL_ERROR, (moduleName: string, error: any) => ({
    type: GLOBAL_ERROR,
    payload: {
      module: moduleName,
      error
    },
    error: true
  })) 
}