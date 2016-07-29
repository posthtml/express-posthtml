[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][build]][build-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]
[![Chat][chat]][chat-badge]

# Express PostHTML <img width="200" height="220" align="right" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">

## Install

```bash
npm i -S express-posthtml
```

## Usage

### Engine

Register PostHTML as View Engine

```js
app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
```

### Global

All Views will be render with this plugin setup, if no local setup provided.

```js
app.set('view options', [ PostHTML Plugins ])
```

```js
res.render('file')
```

### Local

View specific setup by adding plugins separately to the respective routes. Note that if you have set plugins globally, routes with local setup will not use the global setup by default.

```js
app.set('view options', [])
```

```js
res.render('file', { plugins: [ PostHTML Plugins ] })
```

### Extend

If views share common plugins (e.g for [BEM Support][bem]), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

[bem]: https://github.com/rajdee/posthtml-bem

```js
app.set('view options', [ PostHTML Global Plugins ])
```

```js
res.render('file', { plugins: [ PostHTML Local Plugins ], extend: true })
```

## Example

```js

'use strict'

import express from 'express'
import posthtml from 'express-posthtml'

// Plugins
import bem from 'posthtml-bem'
import imports from 'posthtml-import'

const app = express()

app.engine('html', require('posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [ imports(), bem() ])

// Global
app.get('/', (req, res) => {
    res.render('file')
  })

// Local
app.get('/local', (req, res) => {
  res.render('file', { plugins: [ imports(), bem({
    elemPrefix: '_', modPrefix: '-', modDlmtr: '--'
  }) ]})
})

// Extend
app.get('/extend', (req, res) => {
  res.render('file', { plugins: [ require('posthtml-each')() ], extend: true })
})

app.listen(3000, () => console.log('=> Server started'))
```

## Maintainers

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
      <br />
      <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
    </td>
   </tr>
  <tbody>
</table>

## Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

## LICENSE

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/express-posthtml.svg
[npm-url]: https://npmjs.com/package/express-posthtml

[deps]: https://david-dm.org/posthtml/express-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/express-posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[build]: http://img.shields.io/travis/posthtml/express-posthtml.svg
[build-url]: https://travis-ci.org/posthtml/express-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/express-posthtml?branch=master

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
