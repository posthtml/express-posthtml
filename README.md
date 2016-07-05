[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]

<div align="center">
  <a href="http://expressjs.com">
    <img width="180" height="150" title="Express" src="https://worldvectorlogo.com/logos/express-109.svg">
  </a>
  <img width="120" height="120" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>Express PostHTML</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -S express-posthtml
```

<h2 align="center">Usage</h2>

#### Engine

Register PostHTML as View Engine

```javascript
app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
```

#### Global

All Views will be render with this plugin setup, if no local setup provided.

```js
app.set('view options', [ PostHTML Plugins ])
```

```js
res.render('file')
```

#### Local

View specific setup by adding plugins separately to the respective routes. Note that if you have set plugins globally, routes with local setup will not use the global setup by default.

```js
app.set('view options', [])
```

```js
res.render('file', { plugins: [ PostHTML Plugins ] })
```

#### Extend

If views share common plugins (e.g for [BEM Support][bem]), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

[bem]: https://github.com/rajdee/posthtml-bem

```js
app.set('view options', [ PostHTML Global Plugins ])
```

```js
res.render('file', { plugins: [ PostHTML Local Plugins ], extend: true })
```

<h2 align="center">Example</h2>

```js
'use strict'

import express from 'express'
import posthtml from 'express-posthtml'

// Plugins
import bem from 'posthtml-bem'
import import from 'posthtml-import'

const app = express()

app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [ import(), bem() ]) // Global

app.get('/', (req, res) => {
    res.render('file')
  })

// Local
app.get('/local', (req, res) => {
  res.render('file', { plugins: [ import(), bem({
    elemPrefix: '_', modPrefix: '-', modDlmtr: '--'
  }) ]})
})

// Extend
app.get('/extend', (req, res) => {
  res.render('file', { plugins: [ require('posthtml-each')() ], extend: true })
})

app.listen(3000, () => console.log('=> Server started'))
```

<h2 align="center">LICENSE</h2>

> MIT License (MIT)

> Copyright (c) 2016 PostHTML Michael Ciniawsky <michael.ciniawsky@gmail.com>

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

[deps]: https://david-dm.org/posthtml/express-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/express-posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/posthtml/express-posthtml.svg
[travis-url]: https://travis-ci.org/posthtml/express-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/express-posthtml?branch=master
