import * as fetch from 'isomorphic-fetch'

// interface WithRawError extends Error {
//   response?: any
// }

// async function checkStatus (response: any) {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   }

//   const wError: WithRawError = new Error(response.statusText)
//   wError.response = response
//   throw wError
// }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request (url: string, options?: any) {

  const response = await fetch(url, options)

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = {
      error: true,
      message: error.message || response.statusText
    }
  }

  const ret = {
    data: data,
    headers: {status: response.status}
  }

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }

  return ret
}

export default request
