var blobs = require('fs-blob-store')

var store = blobs('tmp')

var test = store.createWriteStream({key: 'foo/bar/baz/test.txt'}, function(err, opts) {
  console.log('done')
  store.createReadStream(opts).pipe(process.stdout)
})

test.write('hello ')
test.end('world\n')