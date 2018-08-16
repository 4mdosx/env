// copy from
// https://juejin.im/post/594a31d0a0bb9f006b0b2624?utm_source=gold_browser_extension
// 浮点数精度之谜
//
/**
 * [scaleNum 通过操作其字符串将一个浮点数放大或缩小]
 * @param  {number} num      要放缩的浮点数
 * @param  {number} pos      小数点移动位数
 * pos大于0为放大，小于0为缩小；不传则默认将其变成整数
 * @return {number}          放缩后的数
 */
function scaleNum (num, pos) {
  if (num === 0 || pos === 0) {
    return num
  }

  let parts = num.toString().split('.')
  const intLen = parts[0].length
  const decimalLen = parts[1] ? parts[1].length : 0

    // 默认将其变成整数，放大倍数为原来小数位数
  if (pos === undefined) {
    return parseFloat(parts[0] + parts[1])
  } else if (pos > 0) {
        // 放大
    let zeros = pos - decimalLen
    while (zeros > 0) {
      zeros -= 1
      parts.push(0)
    }
  } else {
        // 缩小
    let zeros = Math.abs(pos) - intLen
    while (zeros > 0) {
      zeros -= 1
      parts.unshift(0)
    }
  }

  const idx = intLen + pos
  parts = parts.join('').split('')
  parts.splice(idx > 0 ? idx : 0, 0, '.')

  return parseFloat(parts.join(''))
}
export default scaleNum
