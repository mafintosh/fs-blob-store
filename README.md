# fs-blob-store

[blob store](https://github.com/maxogden/abstract-blob-store) that stores blobs on the local file system

```
npm install fs-blob-store
```

[![build status](http://img.shields.io/travis/mafintosh/fs-blob-store.svg?style=flat)](http://travis-ci.org/mafintosh/fs-blob-store)
![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

[![blob-store-compatible](https://raw.githubusercontent.com/maxogden/abstract-blob-store/master/badge.png)](https://github.com/maxogden/abstract-blob-store)

## Usage

``` js
var fs = require('fs-blob-store')
var blobs = fs('some-directory')

var ws = blobs.createWriteStream({
  key: 'some/path/file.txt'
})

ws.write('hello world\n')
ws.end(function() {
  var rs = blobs.createReadStream({
    key: 'some/path/file.txt'
  })

  rs.pipe(process.stdout)
})
```

## Atomicity

By default, `fs-blob-store` doesn't make atomic writes which may lead to
partially written files when an error occurs or if the process crashes.

By using the `atomic: true` option, `fs-blob-store` will use
[fs-write-stream-atomic](https://github.com/npm/fs-write-stream-atomic)
which guarantees write atomicity.

Note that when using that option, a key will only start to exist and be
available for reading once its initial write is fully completed.

```js
var ws = blobs.createWriteStream({
  key: 'some/path/file.txt',
  atomic: true,
})
```

## License

MIT
