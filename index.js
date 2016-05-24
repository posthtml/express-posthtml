// ------------------------------------
// #EXPRESS - POSTHTML
// ------------------------------------

'use strict'

const fs = require('fs')
const posthtml = require('posthtml')

exports = module.exports = function (path, options, cb) {
  options.extend = options.extend || false

  let plugins

  if (!options.plugins && options.extend === false) {
    plugins = options.settings['view options'] || []
  } else if (options.extend === true) {
    plugins = options.settings['view options'].concat(options.plugins)
  } else {
    plugins = options.plugins || []
  }

  fs.readFile(path, function (err, content) {
    if (err) return cb(new Error(err))

    posthtml(plugins)
      .process(content.toString())
      .then(result => cb(null, result.html))
  })
}
