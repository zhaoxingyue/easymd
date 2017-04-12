'use strict'

import test from 'ava'
import shelljs from 'shelljs'
import Promise from 'bluebird'
import cp from 'child_process'
import fs from 'fs'
Promise.promisifyAll(cp)

test('Test open markdown file', async t => {
  try {
    const cmd = 'easymd -b README.md'
    const _root = await cp.execAsync('cd ~ && pwd')
    const result = await cp.execAsync(cmd)
    const viewsPath = `${_root.split('\n')[0]}/.easymd/views/README.html`

    const content = fs.readFileSync(viewsPath).toString()
    t.is(content.indexOf('<!DOCTYPE html>'), 0)
  } catch (e) {
    console.log(e)
    t.fail()
  }
})

test('Test create html file', async t => {
  try {
    const cmd = 'easymd -f README.md'
    const result = await cp.execAsync(cmd)

    const viewsPath = process.cwd() + '/README.html'
    const content = fs.readFileSync(viewsPath).toString()
    t.is(content.indexOf('<!DOCTYPE html>'), 0)
  } catch (e) {
    console.log(e)
    t.fail()
  }
})

test('Test other option', async t => {
  const cmd = 'easymd -c'
  try {
    const result = await cp.execAsync(cmd)
  } catch (err) {
    t.is(err.code, 1)
    t.not(err.message.indexOf('error: unknown option `-c\''), -1)
  }
})

test('Test no option', async t => {
  const cmd = 'easymd -b'
  try {
    const result = await cp.execAsync(cmd)
  } catch (err) {
    t.is(err.code, 1)
    t.not(err.message.indexOf('error: option `-b, --browser <file>\' argument missing\n\n'), -1)
  }
})
