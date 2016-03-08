[![npm][npm]][npm-1]
[![dependencies][deps]][deps-1]

 <img align="right" width="150" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

# [PostHTML](https://github.com/posthtml/posthtml) <img align="" width="125" height="50" title="ExpressJS" src="https://worldvectorlogo.com/logos/express-109.svg" />

# Install

```bash
(sudo) npm i -S express-posthtml
```

# Usage
## Engine
Register PostHTML as View Engine

```javascript
app.engine('html', require('express-posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
```

## Plugins
### Global
All Views will be render with this plugin setup, if no local setup provided.

```javascript
app.set('view options', [ PostHTML Plugins ])
```

```javascript
res.render('file')
```

### Local
View specific setup by adding plugins separately to the respective routes. Note that if you have set plugins globally, routes with local setup will not use the global setup by default.

```javascript
app.set('view options', [])
```

```javascript
res.render('file', { plugins: [ PostHTML Plugins ] })
```

### Extend
If views share common plugins (e.g for [BEM Support][bem]), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

```js
app.set('view options', [ PostHTML Global Plugins ])
```

```js
res.render('file', { plugins: [ PostHTML Local Plugins ], extend: true, })
```

# Example
## Plugins

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
app.engine('html', require('express-posthtml'))

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
const html_local = require('posthtml-package-html')({
  bem: { elemPrefix: '_', modPrefix: '-', modDlmtr: '--'}
})

// App
const express = require('express')

let app = express()

// App Engine
app.engine('html', require('express-posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', html) // Global Setup

// Global Use
app.get('/', (req, res) => {
  res.render('file')
})

// Local Use
app.get('/local', (req, res) => {   
  res.render('file', { plugins: html_local })
})

// Extend Use
app.get('/extend', (req, res) => {   
  res.render('file', { extend: true, plugins: [
    require('posthtml-style-to-file')({ path: './public/styles/style.css' })   
  ] })
})

app.listen(3000, () => {
    console.log('==> Server started')
  }
)
```

[npm]: https://badge.fury.io/js/express-posthtml.svg
[npm-1]: https://badge.fury.io/js/express-posthtml
[deps]: https://david-dm.org/michael-ciniawsky/express-posthtml.svg
[deps-1]: https://david-dm.org/michael-ciniawsky/express-posthtml
[bem]: https://github.com/rajdee/posthtml-bem
