'use strict'

const marked = require('marked')
const ht = require('highlight.js')

module.exports = md => {
  // highlight.js Auto render Code
  marked.setOptions({
    highlight: code => {
      return ht.highlightAuto(code).value
    }
  })

  // use bootstrap <table> style
  const renderer = new marked.Renderer()
  renderer.table = (header, body) => {
    return `<table class="table table-striped">${header}${body}</table>`
  }

  const header = '<!DOCTYPE html>' +
          '<html lang="zh-CN">' +
          '<head>' +
          '<title>Marked Demo</title>' +
          '<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">' +
          '<link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css">' +
          '</head><body><div class="container">'

  const footer = '</div><script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>' +
          '<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>' +
          '<script >hljs.initHighlightingOnLoad()</script>' +
          '<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>' +
          '</body></html>'

  return header + marked(md.toString(), {renderer: renderer}) + footer
}
