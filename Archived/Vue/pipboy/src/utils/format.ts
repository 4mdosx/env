import { entries } from 'lodash'
export const urlQuery = function (query: any) {
  let result: string = ''
  for (let [key, val] of entries(query)) {
    if (val !== null) {
      result += `&${key}=${val}`
    }
  }
  if (result.length) {
    result = '?' + result.slice(1)
  }
  return result
}