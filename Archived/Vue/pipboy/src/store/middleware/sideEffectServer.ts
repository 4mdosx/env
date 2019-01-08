// import * as keys from '@src/appConfig/key'
// import LocalStorage from '@src/service/localStorage'

// const callServer = {
//   localStorage: ((store) => (field: string, action: string = 'get') => {
//     return store[action](field)
//   })(new LocalStorage({salt: keys.localStorage}))
// }

// export interface CallAPIInterface {
//   server: ''
//   types: string[],
//   schema?: any
// }

// export const CALL_SERVER = 'callServer'

// export default (store: any) => (next: any) => (action: any) => {
//   const callAPI: CallAPIInterface = action[CALL_SERVER]
//   if (typeof callAPI === 'undefined') {
//     return next(action)
//   }
//   const { server, schema, types } = callAPI
//   const actionWith = (data: any) => {
//     const finalAction = Object.assign({}, action, data)
//     delete finalAction[CALL_SERVER]
//     return finalAction
//   }
//   const [ requestType, successType, failureType ] = types
//   next(actionWith({ type: requestType }))
//   return callServer[server](schema).then(
//     (response: any) => next(actionWith({
//       response,
//       type: successType
//     })),
//     (error: any) => next(actionWith({
//       type: failureType,
//       error: error.message || 'Something bad happened'
//     }))
//   )
// }