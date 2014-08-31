# fs-blob-store

[blob store](https://github.com/maxogden/abstract-blob-store) that stores blobs on the local file system

```
npm install fs-blob-store
```

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

## License

MIT
