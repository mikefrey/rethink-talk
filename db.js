const r = require('rethinkdb')

const connOpts = { host: 'localhost', db: 'nodemn' }

exports.connect = () => r.connect(connOpts)
