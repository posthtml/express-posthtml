// ------------------------------------
// #EXPRESS - POSTHTML
// ------------------------------------

'use strict'

const fs = require('fs')
const posthtml = require('posthtml')

/**
 * @author Michael Ciniawsky (@michael-ciniawsky) <michael.ciniawsky@gmail.com>
 * @description PostHTML View Engine for Express
 * @license MIT
 *
 * @module express-posthtml
 * @version 1.1.0
 *
 * @requires posthtml
 *
 * @method posthtml
 *
 * @param  {String} path View Path
 * @param  {Object} options View Options
 * @param  {Function} cb Callback
 *
 * @return {Function} cb HTML
 */
module.exports = function (path, options, cb) {
  options.extend = options.extend || false

  let plugins

  if (!options.plugins && !options.extend) {
    plugins = options.settings['view options'].plugins || []
  } else if (options.extend === true) {
    plugins = options.settings['view options'].plugins
    plugins = plugins.concat(options.plugins)
  } else {
    plugins = options.plugins || []
  }

  options = options.settings['view options'].options || {}

  fs.readFile(path, 'utf8', (err, html) => {
    if (err) return cb(err)

    return posthtml(plugins)
      .process(html, options)
      .then(result => cb(null, result.html))
      .catch((err) => cb(err))
  })
}
