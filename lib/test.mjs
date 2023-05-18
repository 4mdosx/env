
import { $ } from 'zx'

export default async function test (path, permission = '-e') {
  const result = await $`test ${permission} ${path} && echo 'true' || echo 'false' >&2`
  return result.stdout === 'true'
}
