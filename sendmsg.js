var host = 'localhost'
var usr = process.argv[2]
var msg = process.argv[3]

var r = require('rethinkdb')
var connOpts = { host: host, db: 'nodemn' }

r.connect(connOpts).then(function(conn) {

  r.table('users').filter({ username: usr }).nth(0).run(conn)
    .then(function(user) {
      console.log(user)
      if (user) return user
    })
    .catch(function(err) {
      console.log('caught')
      return r.table('users')
        .insert({ username: usr }, {returnChanges:true}).run(conn)
        .then(function(res) {
          return res.changes[0].new_val
        })
    })
    .then(function(user) {

      r.table('messages')
        .insert({ userID: user.id, msg: msg })
        .run(conn)
        .then(function(res) {
          conn.close()
        })
    })

})
