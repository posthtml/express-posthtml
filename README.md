[![NPM][npm]][npm-url]
[![Node][node]][node-url]
[![Dependencies][deps]][deps-url]
[![DevDependencies][devdeps]][devdeps-url]
[![Standard Code Style][style]][style-url]

<div align="center">
    <img width="125" height="150" title="Express" src="https://worldvectorlogo.com/logos/109.svg">
    <img width="125" height="150" title="PostHTML " src="http://posthtml.github.io/posthtml/logo.svg">
</div>

## Install

```bash
(sudo) npm i -S posthtml
```

## Usage
#### Engine
Register PostHTML as View Engine

```javascript
app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
```

## Plugins
#### Global

All Views will be render with this plugin setup, if no local setup provided.

```javascript
app.set('view options', [ PostHTML Plugins ])
```

```javascript
res.render('file')
```

#### Local

View specific setup by adding plugins separately to the respective routes. Note that if you have set plugins globally, routes with local setup will not use the global setup by default.

```javascript
app.set('view options', [])
```

```javascript
res.render('file', { plugins: [ PostHTML Plugins ] })
```

#### Extend

If views share common plugins (e.g for [BEM Support][bem]), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

[bem]: https://github.com/rajdee/posthtml-bem

```js
app.set('view options', [ PostHTML Global Plugins ])
```

```js
res.render('file', { plugins: [ PostHTML Local Plugins ], extend: true, })
```

## Example
#### Plugins

```js
'use strict'

// Plugins
const bem = require('posthtml-bem')
const each = require('posthtml-each')
const include = require('posthtml-include')

// App
const express = require('express')

let app = express()

// App Engine
app.engine('html', require('posthtml'))

// Settings
app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [ include(), bem(), ]) // Global Setup

// Global Use
app.get('/', (req, res) => {
    res.render('file')
  })
// Local Use
app.get('/local', (req, res) => {
    res.render('file', { plugins: [ include(), bem({
      elemPrefix: '_',
      modPrefix: '-',
      modDlmtr: '--'})
    ] })
  })
// Extend Use
app.get('/extend', (req, res) => {
    res.render('file', { plugins: [ each() ], extend: true } )
  })  

app.listen(3000, () => {
    console.log('==> Server started')
  }
)
```

## Package

```js
'use strict'

// Package
const html = require('posthtml-package-html')(/* options */)

// Package for local use
const $html = require('posthtml-package-html')({
  bem: { elemPrefix: '__', modPrefix: '-', modDlmtr: '--'}
})

// App
const express = require('express')

let app = express()

// App Engine
app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', html) // Global Setup

// Global Use
app.get('/', (req, res) => {
  res.render('file')
})

// Local Use
app.get('/local', (req, res) => {   
  res.render('file', { plugins: $html })
})

// Extend Use
app.get('/extend', (req, res) => {   
  res.render('file', { extend: true, plugins: [
    require('posthtml-style-to-file')({ path: './public/styles/style.css' })   
  ] })
})

app.listen(3000, () => {
    console.log('=> Server started')
  }
)
```

## LICENSE

> MIT License (MIT)

> Copyright (c) 2016 Michael Ciniawsky

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/express-posthtml.svg
[npm-url]: https://npmjs.com/package/express-posthtml

[node]: https://img.shields.io/node/v/gh-badges.svg?maxAge=2592000
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/posthtml/express-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/express-posthtml

[devdeps]: https://david-dm.org/posthtml/express-posthtml/dev-status.svg
[devdeps-url]: https://david-dm.org/posthtml/express-posthtml#info=devDependencies

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/posthtml/express-posthtml.svg
[travis-url]: https://travis-ci.org/posthtml/express-posthtml

[travis-rel]: http://img.shields.io/travis/posthtml/express-posthtml.svg?branch=release/1.0.0
[travis-rel-url]:https://travis-ci.org/posthtml/express-posthtml?branch=release/1.0.0

[travis-dev]: http://img.shields.io/travis/posthtml/express-posthtml.svg?branch=develop
[travis-dev-url]: https://travis-ci.org/posthtml/express-posthtml?branch=develop

[cover]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/express-posthtml?branch=master

[cover-rel]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg?branch=release/1.0.0
[cover-rel-url]: https://coveralls.io/github/posthtml/express-posthtml?branch=release/1.0.0

[cover-dev]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg?branch=develop
[cover-dev-url]: https://coveralls.io/github/posthtml/express-posthtml?branch=develop

[license]: https://img.shields.io/github/license/posthtml/express-posthtml.svg
[license-url]: https://raw.githubusercontent.com/posthtml/express-posthtml/master/LICENSE
