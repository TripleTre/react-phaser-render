var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./test-conf')
var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
app.use('/', express.static('./'))

var uri = 'http://localhost:' + 1987

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting test server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  _resolve()
})

var server = app.listen(1987)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
