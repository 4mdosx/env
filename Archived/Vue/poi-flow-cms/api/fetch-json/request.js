function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.status)
  error.status = response.status
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request (url, options) {
  const response = await fetch(url, options)

  checkStatus(response)

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = {
      type: response.headers.get('content-type').split(';')[0],
      body: response.body
    }
  }

  const ret = {
    data,
    headers: {}
  }

  return ret
}

export default request
