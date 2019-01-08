
exports.makeANDWHERE = function (query) {
  let where = ''
  let values = []
  const safeQuery = Object.entries(query).filter(list => list[1] !== undefined)
  safeQuery.map((valueArr, index) => {
    const [key, val] = valueArr
    values.push(val)
    if (index) {
      where += `AND ${key} = ? `
    } else {
      where += ` WHERE ${key} = ? `
    }
  })
  return { where, values }
}
exports.page2offset = function (page = 1, size = 15) {
  offset = (page - 1) * size
  return {offset, limit: size}
}