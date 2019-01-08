import { createAction } from 'react-redux-typescript'
export const TEST_ACTION = 'TEST_ACTION'

export interface Actions {
  TEST_ACTION: {
    type: typeof TEST_ACTION,
    payload: any
  }
}

// export interface AuthProof {
//   user: string,
//   password: string,
//   method: 'strPassword' | 'phoneCode' | 'mailCode' | 'OAuth',
//   verifyCode: string
// }

export const actionCreators = {
  test_action: createAction(TEST_ACTION, (payload: any) => {
    return {type: TEST_ACTION, payload }
  })
}