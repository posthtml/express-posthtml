var express = require('express')

var app = express()

var bem = require('posthtml-bem')

app.engine('html', require('../index'))

app.set('views', '/')
app.set('view engine', 'html')
app.set('view options', [bem()])

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/local', (req, res) => {
  res.render('index', { plugins: [bem()] })
})

app.listen(3000)
