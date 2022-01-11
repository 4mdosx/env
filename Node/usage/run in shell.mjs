#!/usr/bin/env node
// : run code in shell
import 'zx/globals'

await $`cat ../package.json | grep name`

await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 2; echo 2`,
  $`sleep 3; echo 3`,
])

await $`pwd`
