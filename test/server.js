'use strict'

const html = require('posthtml-package-html')({
  include: { root: './public/views/', encoding: 'utf-8' }
})

const html_local = require('posthtml-package-html')({
  bem: { elemPrefix: '_', modPrefix: '-', modDlmtr: '--' },
  include: { root: './public/views/', encoding: 'utf-8' }
})

const express = require('express')

let app = express()

app.engine('html', require('../index'))

app.set('views', __dirname + '/public/views/')
app.set('view engine', 'html')
app.set('view options', html)

app.get('/', (req, res) => {
  res.render('global')
})

app.get('/local', (req, res) => {
  res.render('local', { plugins: html_local })
})

app.get('/extend', (req, res) => {
  res.render('extend', { plugins: [ require('posthtml-style-to-file')({ path:
    './public/styles/style.css' }) ], extend: true })
})

app.listen(3000, () => {
  console.log('==> Server started')
})
