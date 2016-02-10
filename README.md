# [PostHTML](https://github.com/posthtml/posthtml)
View Engine for [Express](expressjs.com)

[PostHTML Plugins Catalog](https://maltsev.github.io/posthtml-plugins/)

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
If views share common plugins (e.g [BEM](https://github.com/rajdee/posthtml-bem)), but view specific additions are necessary, use the extend option. Now the global setup is used and will be extended with the local plugins of the respective route.

```javascript
app.set('view options', [ PostHTML Global Plugins ])
```

```javascript
res.render('file', { plugins: [ PostHTML Local Plugins ], extend: true, })
```

# Example

```javascript
var express = require('express')

var app = express()

// Engine
app.engine('html', require('express-posthtml'))

// Settings
app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [/* PostHTML Plugins */]) // Global Setup

// Global Use
app.get('/', (req, res) => {
    res.render('file')
  })
// Local
app.get('/local', (req, res) => {
    res.render('file', { plugins: [/* PostHTML Plugins */] } )
  })
// Extend
app.get('/extend', (req, res) => {
    res.render('file', { plugins: [/* PostHTML Plugins */], extend: true } )
  })  

app.listen(3000, () => {
    console.log('Server started!')
  })
```
