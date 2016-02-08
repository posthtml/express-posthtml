# PostHTML
View Engine for ExpressJS

# Setup

```
(sudo) npm i -S express
(sudo) npm i -S express-posthtml
```

# Usage

```
var express = require('express')

var app = express()

// Register
app.engine('html', require('express-posthtml'))

// Settings
app.set('views', /* Path to views */)
app.set('view engine', 'html')
app.set('view options', [/* PostHTML Plugins */])

// Route
app.get('/', (req, res) => {
    res.render('index', { plugins: [/* PostHTML Plugins */] } )
  })

app.listen(3000, () => {
    console.log('Server started!')
  })
```
