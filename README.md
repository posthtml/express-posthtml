[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-badge]

# Express PostHTML <img width="200" height="220" align="right" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">


<div align="center">
  <img width="100" height="100" title="Express" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png">
  <a href="https://github.com/posthtml/posthtml">
    <img width="200" height="220" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <h1>Express PostHTML</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -S express-posthtml
```

<h2 align="center">Usage</h2>

### Engine

Register PostHTML as Express View Engine

```js
app.engine('html', require('express-posthtml'))
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`plugins`|`{Array}`|`[]`|PostHTML Plugins|
|`options`|`{Object}`|`{}`|PostHTML Options|

### Global

All views will render with this setup, if no local setup provided.

```js
app.set('view options', { plugins: [], options: {} })
```

```js
res.render('file.ext')
```

### Local

View specific setup by adding plugins separately to the respective routes. Note that if you have set plugins globally, routes with local setup will not use the global setup by default.

```js
app.set('view options', { options: { parser: pug }})
```

```js
res.render('file.pug', { plugins: [...plugins] })
```

### Extend

If views share common plugins (e.g for [BEM Support][bem]), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

[bem]: https://github.com/rajdee/posthtml-bem

```js
app.set('view options', { plugins: [...plugins], options: {} })
```

```js
res.render('file', { plugins: [/* PostHTML Plugins */], extend: true })
```

<h2 align="center">Example</h2>

```js
import express from 'express'
import posthtml from 'express-posthtml'

const app = express()

app.engine('html', require('posthtml'))

const plugins = [
  require('posthtml-bem')()
  require('posthtml-expressions')()
]
const options = {}

app.set('views', /* Path to views */)
app.set('view options', { plugins: plugins, options: options })

app.get('/', (req, res) => res.render('index.html'))

app.listen(3000)
```

<h2 align="center">Maintainers</h2>

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

[npm]: https://img.shields.io/npm/v/express-posthtml.svg
[npm-url]: https://npmjs.com/package/express-posthtml

[node]: https://img.shields.io/node/v/postcss-load-plugins.svg
[node-url]: https://nodejs.org/

[deps]: https://david-dm.org/posthtml/express-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/express-posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[tests]: http://img.shields.io/travis/posthtml/express-posthtml.svg
[tests-url]: https://travis-ci.org/posthtml/express-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/express-posthtml/badge.svg
[cover-url]: https://coveralls.io/github/posthtml/express-posthtml

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
