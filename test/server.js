var express = require('express')

var app = express()

var html = require('posthtml-package-html')()

console.log(html)

app.engine('html', require('../index'))

app.set('views', __dirname + '/public/views/')
app.set('view engine', 'html')
app.set('view options', html)

app.get('/', (req, res) => {
  res.render('global')
})

app.get('/local', (req, res) => {
  res.render('local', { plugins: require('posthtml-package-html')({
    bem: { elemPrefix: '_', modPrefix: '-', modDlmtr: '--' } })
  })
})

app.get('/extend', (req, res) => {
  res.render('extend', { plugins: [ require('posthtml-style-to-file')({ path:
    './test/styles/style.css' }) ], extend: true })
})

app.listen(3000, () => {
  console.log('==> Server started')
})
