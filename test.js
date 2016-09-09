var tape = require('tape')
var tests = require('abstract-blob-store/tests')
var fs = require('./')
var os = require('os')
var path = require('path')
var rimraf = require('rimraf')
var Readable = require('stream').Readable

var common = function (atomic) {
  return {
    setup: function(t, cb) {
      const opts = {
        path: path.join(os.tmpdir(), ''+process.pid),
        atomic: atomic,
      }
      // make a new blobs instance on every test
      cb(null, fs(opts))
    },
    teardown: function(t, store, blob, cb) {
      rimraf.sync(store.path)
      cb()
    }
  }
}

tests(tape, common())

tests(tape, common(true))

tape(function (t) {
  var store = fs({
    path: path.join(os.tmpdir(), ''+process.pid),
    atomic: true,
  })
  rimraf.sync(store.path)

  var i = 0
  var brokenReadStream = new Readable()
  brokenReadStream._read = function () {
    i++
    if (i == 3) {
      this.emit(new Error('simulated error'))
    }
  }

  brokenReadStream.pipe(store.createWriteStream('somekey'))

  setTimeout(function () {
    store.exists('somekey', function (err, exists) {
      if (err) return t.fail(err)
      t.equal(exists, false)
      t.end()
    })
  }, 200)
})