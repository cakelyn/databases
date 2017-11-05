var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages
      var sql = 'SELECT messages.message FROM messages \
                 LEFT OUTER JOIN users ON (messages.userid = users.id) \
                 LEFT OUTER JOIN rooms ON (messages.roomid = rooms.id) \
                 ORDER BY messages.id DESC';
      db.query(sql, function(err, res) {
        if (err) {
          console.log('MODELS error getting messages from DB: ', err.sqlMessage);
        } else {
          callback(res);
        }
      });
    },
    post: function (params, callback) { // a function which can be used to insert a message into the database

      // curl -d '{"message":"Hey", "username":"Kate", "roomname":"Lobby"}' -H "Content-Type: application/json" -X POST http://localhost:3000/classes/messages

      // data { message: 'Hey', username: 'Kate', roomname: 'lobby' }



      var sql = 'INSERT INTO messages (message, userid, roomid) \
                 VALUE (?, (SELECT id FROM users WHERE username = ? LIMIT 1), (SELECT id FROM rooms WHERE roomname = ? LIMIT 1))';

      db.query(sql, params, function(err, res) {
        if (err) {
          console.log('MODELS error inserting message into DB: ',err);
        } else {
          callback(null, res);
        }
      });

    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      // query the database for users
      db.query('SELECT * FROM users', function(err, res) {
        if (err) {
          console.log('MODELS error getting users from DB: ', err.sqlMessage);
        } else {
          callback(res);
        }
      });
    },
    // curl -d '{"username":"Kate"}' -H "Content-Type: application/json" -X POST http://localhost:3000/classes/users
    post: function (params, callback) {

      var sql = 'INSERT INTO users (username) VALUE (?)';

      db.query(sql, params, function(err, res) {
        if (err) {
          console.log('MODELS error inserting username into DB: ', err.sqlMessage);
        } else {
          callback(null, res);
        }
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      // query the database for users
      db.query('SELECT * FROM rooms', function(err, res) {
        if (err) {
          console.log('MODELS error getting rooms from DB: ', err.sqlMessage);
        } else {
          callback(res);
        }
      });
    },
    // curl -d '{"roomname":"Lobby"}' -H "Content-Type: application/json" -X POST http://localhost:3000/classes/rooms
    post: function (params, callback) {

      var sql = 'INSERT INTO rooms (roomname) VALUE (?)';
      var mysql_err_dup_entry = 1062;

      db.query(sql, params, function(err, res) {
        if (err && err.errno === mysql_err_dup_entry) {
          consolelog('Please enter a unqiue roomname. ' + params + ' already exists.');
          callback(null, res);
        }
        if (err) {
          console.log('MODELS error inserting roomname into DB: ', err.sqlMessage);
        } else {
          callback(null, res);
        }
      });
    }
  }
};
