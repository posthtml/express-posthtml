// ------------------------------------
// #EXPRESS - POSTHTML - TEST
// ------------------------------------

'use strict'
const path = require('path')

const express = require('express')
const supertest = require('supertest')

const posthtml = require('..')

test('Pug', () => {
  const app = express()

  const plugins = [
    require('posthtml-expressions')({ locals: { foo: 'bar' } })
  ]
  const options = { parser: require('posthtml-pug')() }

  app.engine('pug', posthtml)

  app.set('views', path.resolve(__dirname, 'fixtures'))
  app.set('view options', { plugins: plugins, options: options })

  app.get('/', (req, res) => res.render('index.pug'))

  return supertest(app).get('/').expect(200).then((res) => {
    expect(res.text.trim()).toEqual('<div>bar</div>')
  })
})

test('HTML', () => {
  const app = express()

  const plugins = [
    require('posthtml-expressions')({ locals: { foo: 'bar' } })
  ]

  app.engine('html', posthtml)

  app.set('views', path.resolve(__dirname, 'fixtures'))
  app.set('view options', { plugins: plugins })

  app.get('/', (req, res) => res.render('index.html'))

  return supertest(app).get('/').expect(200).then((res) => {
    expect(res.text.trim()).toEqual('<div>bar</div>')
  })
})

test('SSML', () => {
  const app = express()

  const plugins = [
    require('posthtml-expressions')({ locals: { foo: 'bar' } })
  ]
  const options = { parser: require('posthtml-sugarml')() }

  app.engine('ssml', posthtml)

  app.set('views', path.resolve(__dirname, 'fixtures'))
  app.set('view options', { plugins: plugins, options: options })

  app.get('/', (req, res) => res.render('index.ssml'))

  return supertest(app).get('/').expect(200).then((res) => {
    expect(res.text.trim()).toEqual('<div>bar</div>')
  })
})

test.skip('Error', () => {
  const app = express()

  const plugins = [
    require('posthtml-expressions')({ locals: { foo: 'bar' } })
  ]
  const options = { parser: require('posthtml-sugarml')() }

  app.engine('ssml', posthtml)

  app.set('views', path.resolve(__dirname, 'fixtures'))
  app.set('view options', { plugins: plugins, options: options })

  app.get('/', (req, res) => res.render('error.ssml'))

  return supertest(app).get('/').then((res) => expect(res.status).toEqual(500))
})
