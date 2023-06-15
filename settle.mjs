#!/usr/bin/env bash
":" //# comment; exec /usr/bin/env node --input-type=module - "$@" < "$0"

import { $ } from 'zx'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from './lib/test.mjs'

async function injectPath () {
  const shellrc = await $`cat ~/.zshrc`
  const cwd = process.cwd()
  if (!shellrc.stdout.includes(`export PATH="${cwd}/.bin:$PATH"`)) {
    await $`echo 'export PATH="${cwd}/.bin:$PATH"' >> ~/.zshrc`
  }
}

async function mvBinFile (form, to) {
  const fileContent = addShebang(await fs.readFile(form, 'utf-8'))
  await fs.writeFile(to, fileContent)
  await fs.chmod(to, 0o755)
}

function addShebang (raw) {
  const shebang = '#!/usr/bin/env bash'
  const shebang2 = `":" //# comment; exec /usr/bin/env node --input-type=module - "$@" < "$0"`
  return `${shebang}\n${shebang2}\n${raw}`
}

async function createExecFiles () {
  if (await test('./.bin')) await fs.rm('./.bin', { recursive: true })
  await fs.mkdir('./.bin')

  const files = await fs.readdir('./bin').then(files => files.filter(file => file.match(/.js|.mjs/)))
  for (const file of files) {
    const filePath = path.join(process.cwd(), './bin', file)
    const basename = file.split('.')[0]
    mvBinFile(filePath, path.join(process.cwd(), './.bin', basename))
  }
}

async function main () {
  await injectPath()
  await createExecFiles()
}


main()