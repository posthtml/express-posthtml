var fs = require('fs')
var posthtml = require('posthtml')

module.exports = function (path, options, callback) {
  var plugins = options.plugins || []
  fs.readFile(path, function (err, content) {
    if (err) return callback(new Error(err))
    var posthtml = posthtml(plugins)
      .process(content.toString())
      .then((result) => {
        return callback(null, result.html)
      })
  })
}
