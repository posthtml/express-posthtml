var fs = require('fs')
var posthtml = require('posthtml')

module.exports = function (path, options, cb) {
  var plugins

  if (!options.plugins) {
    plugins = options.settings['view options'] || []
  } else {
    plugins = options.plugins || []
  }

  fs.readFile(path, function (err, content) {
    if (err) return cb(new Error(err))
    posthtml(plugins)
      .process(content.toString())
      .then((result) => {
        return cb(null, result.html)
      })
  })
}
