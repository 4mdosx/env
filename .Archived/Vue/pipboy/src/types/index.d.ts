declare module 'pipboy' {
  interface UsersAction {
    type: string,
    id: number,
    payload: {
      name: string,
      email: string,
      avater?: [string | null]
    }
  }
}

declare module 'pipboytypes' {
  export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

  export const AUTH_REQUEST = 'AUTH_REQUEST'
  export const AUTH_SUCCESS = 'AUTH_SUCCESS'
  export const AUTH_FAILURE = 'AUTH_FAILURE'

  export const USER_FAILURE = 'USER_FAILURE'
  export const USER_REQUEST = 'USER_REQUEST'
  export const USER_SUCCESS = 'USER_SUCCESS'
}

declare module 'rmc-list-view'