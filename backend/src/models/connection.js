// Req do mySql, conectando ao node

const sqlConnection = require('mysql2/promise');

const connection = sqlConnection.createPool({
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: 'root',
    password: 'password',
    database: 'StoreManager',
  });

  module.exports = connection;
