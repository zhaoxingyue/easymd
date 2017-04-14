#! /usr/bin/env node
'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const open = require('open')
const program = require('commander')
const shelljs = require('shelljs')
const Promise = require('bluebird')
const chalk = require('chalk')
const cp = require('child_process')
Promise.promisifyAll(cp)

const toHTML = require('./toHTML')

/**
 * fs.writeFile create the html file
 *
 * @param {mdPath} markdown file path
 * @param {htmlPath} html file path
 */
function writeHTML (mdPath, htmlPath) {
  fs.writeFileSync(htmlPath, toHTML(fs.readFileSync(mdPath).toString()))
}

/**
 * get html file name from markdown file name
 *
 * @param {name} markdown file name
 * @return {String} html file name.
 */
function getFileName (name) {
  if (name.indexOf('/') !== -1) {
    name = name.split('/').pop()
  }
  let arr = name.split('.')
  arr.splice(arr.length - 1, 1, 'html')
  return arr.join('.')
}

/**
 * use {marked} conversion of markdown into html
 *
 * @param {mdPath} markdown file path
 */
function creatHTML (mdPath) {
  try {
    let path = ''
    process.argv[4] ? path = process.argv[4] : path = process.cwd()
    writeHTML(mdPath, `${path}/${getFileName(mdPath)}`)
  } catch (err) {
    console.log(chalk.red(String(err)))
  }
}

/**
 * write html into ~/.easymd/views/ and open file in browser
 *
 * @param {mdPath} markdown file path
 */
function openInBrowser (mdPath) {
  cp.execAsync('cd ~ && pwd')
  .then(stdout => {
    const $ = stdout.split('\n')[0]
    // create HTML folder
    shelljs.mkdir('-p', `${$}/.easymd/views`)
    const htmlPath = `${$}/.easymd/views/${getFileName(mdPath)}`
    writeHTML(mdPath, htmlPath)
    open(`file://${htmlPath}`)
  })
  .catch(err => {
    console.log(chalk.red(String(err)))
  })
}

program
  .version('0.0.1')
  .option('-f, --file <file>', 'create HTML file', creatHTML)
  .option('-b, --browser <file>', 'open markdown in browser', openInBrowser)
  .on('--help', () => {
    console.log(chalk.blue('  Examples:'))
    console.log('')
    console.log(chalk.red('    $ easymd -b index.md'))
    console.log(chalk.red('    $ easymd -f index.md /your/html/path/ '))
    console.log('')
  })

program.parse(process.argv)

if (!program.file && !program.browser) {
  program.outputHelp()
}
