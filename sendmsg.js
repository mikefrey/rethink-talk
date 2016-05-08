const ip = process.argv[2]
const msg = process.argv[3]

const r = require('rethinkdb')
const connOpts = { host: 'localhost', db: 'nodemn' }

r.connect(connOpts).then(function(conn) {
  r.table('messages')
    .insert({ msg: msg })
    .run(conn)
    .then(function(res) {
      conn.close()
    })
})
