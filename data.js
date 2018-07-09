/**
 * Created by BoxCatGarden on 2018/6/10.
 * The access-layer, providing a public DB-connection pool.
 */
module.exports = require('mysql').createPool(require('./config.json')['database.pool']);