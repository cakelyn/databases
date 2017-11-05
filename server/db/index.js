var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'chat'
});

connection.connect(function(err) {
  if (err) {
    console.error('db err', err);
    return;
  }
  console.log('connected as id', connection.threadId);
});

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports = connection;