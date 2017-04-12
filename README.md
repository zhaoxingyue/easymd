# EASYMD

[![Build Status](https://travis-ci.org/zhaoxingyue/easymd.svg?branch=master)](https://travis-ci.org/zhaoxingyue/easymd)
[![Coverage Status](https://coveralls.io/repos/github/zhaoxingyue/easymd/badge.svg?branch=master)](https://coveralls.io/github/zhaoxingyue/easymd?branch=master)
[![Join the chat at https://gitter.im/easymd/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/easymd/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
[![Dependency Status](https://dependencyci.com/github/zhaoxingyue/easymd/badge)](https://dependencyci.com/github/zhaoxingyue/easymd)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  
**A simple cli for open markdown file**

## Why easymd ?

- Simple cli options
- Code highlight greate

## Install

Run the following command in Terminal:

```
$ npm install -g easymd
```
**Note**: To run the preceding commands, Node.js and npm must be installed.

## Usage

After you've installed easymd, you should be able to use the easymd program.

```
$ easymd --help

 Usage: easymd [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -f, --file <file>     create HTML file
    -b, --browser <file>  open markdown in browser

  Examples:

    $ mb -b index.md
    $ mb -f index.md /your/html/path/ 

```
The simplest use case would be opening the markdown file in the browser:

```
$ easymd -b README.md
```
On browser looks like this:

<img src="http://qiniu.mengxiaoban.cn/customerFiles/20170412180606_admin_browser.png" style="width: 600px;height: 500px">

Easymd also can write html file:

```
$ easymd -f README.md
```
or 
```
$ easymd -f README.md /your/output/path
```

## Running Tests & Contributing

```
$ git clone git@github.com:zhaoxingyue/easymd.git
$ npm install
$ npm test
```

Here are some important packages in the easymd ecosystem:

- [marked](https://github.com/chjj/marked) - a markdown parser and compiler.
- [highlight.js](https://github.com/isagalaev/highlight.js) - javascript syntax highlighter.
