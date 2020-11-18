const tape = require('tape')
const tests = require('abstract-blob-store/tests')
const fs = require('./')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')

const common = {
  setup: function(t, cb) {
    // make a new blobs instance on every test
    cb(null, fs(path.join(os.tmpdir(), ''+process.pid)))
  },
  teardown: function(t, store, blob, cb) {
    rimraf.sync(store.path)
    cb()
  }
}

tests(tape, common)
