import { $ } from 'zx'

$.verbose = false
const { stdout } = await $`ifconfig | grep "inet "`
const ip = stdout.match(/inet (\d+\.\d+\.\d+\.\d+)/g).filter((x) => !x.includes('127.0.0.1'))[0].split(' ')[1]

console.log(ip)

