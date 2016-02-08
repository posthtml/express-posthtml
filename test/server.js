var express = require('express')

var app = express()

var bem = require('posthtml-bem')
var each = require('posthtml-each')
var include = require('posthtml-include')

app.engine('html', require('../index'))

app.set('views', __dirname)
app.set('view engine', 'html')
app.set('view options', [ include({ encoding: 'utf-8' }), bem() ])

app.get('/', (req, res) => {
  res.render('include')
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
