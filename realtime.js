const r = require('rethinkdb')
const connOpts = { host: 'localhost', db: 'nodemn' }

r.connect(connOpts).then(conn => {

  r.table('messages').changes().run(conn)
    .then(cursor => {
      cursor.each((err, res) => {
        console.log(res.new_val.msg)
      })
    })
    .catch(err => {
      console.error(err)
    })
})
