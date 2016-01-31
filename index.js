var fs = require('fs')
var path = require('path')

var posthtml = require('posthtml')

module.exports = function (path, options, callback) {
  fs.readFile(path, function (err, content) {
    if (err) return callback(new Error(err))
    var plugins = options.plugins
    var posthtml = posthtml(plugins)
      .process(content.toString())
      .then((result) => {
        return callback(null, result.html)
      })
  })
}
