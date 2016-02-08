# PostHTML
View Engine for ExpressJS

# Install

```
(sudo) npm i -S express
(sudo) npm i -S express-posthtml
```

# Usage
## Engine
Register PostHML as ExpressJS View Engine

```
app.engine('html', require('express-posthtml'))

app.set('views', /* Path to views */)
app.set('view engine', 'html')
```

## Plugins
### Global
All Views will be render with the same plugin setup

```
app.set('view options', [ PostHTML Plugins ])
```

### Local
View specific plugin setup to add plugins separately as needed.

```
res.render('file', {plugins: [ PostHTML Plugins ]})
```

# Example

```
var express = require('express')

var app = express()

// Engine
app.engine('html', require('express-posthtml'))

// Settings
app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [/* PostHTML Plugins */]) // Global


app.get('/', (req, res) => {
    res.render('index', { plugins: [/* PostHTML Plugins */] } ) // Local
  })

app.listen(3000, () => {
    console.log('Server started!')
  })
```
