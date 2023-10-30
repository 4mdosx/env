
import { $ } from 'zx'

export default async function isExist (path, permission = '-e') {
  const result = await $`test ${permission} ${path} && echo 'true' || echo 'false' >&2`

  return result.stdout.trim() === 'true'
}
