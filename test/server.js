var express = require('express')

var app = express()

var bem = require('posthtml-bem')
var each = require('posthtml-each')

app.engine('html', require('../index'))

app.set('views', __dirname)
app.set('view engine', 'html')
app.set('view options', [ bem() ])

app.get('/', (req, res) => {
  res.render('bem')
})

app.get('/local', (req, res) => {
  res.render('bem', { plugins: [
    bem({
      elemPrefix: '__',
      modPrefix: '--',
      modDlmtr: '-'
    })
  ]})
})

app.get('/extend', (req, res) => {
  res.render('bem', { extend: true, plugins: [ each() ] })
})

app.listen(3000)
