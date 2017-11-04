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
          console.log(err);
        } else {
          callback(res);
        }
      });
    },
    post: function (params, callback) { // a function which can be used to insert a message into the database

      // curl -d '{"message":"Hey", "username":"Kate", "roomname":"lobby"}' -H "Content-Type: application/json" -X POST http://localhost:3000/classes/messages
      // data { message: 'Hey', username: 'Kate', roomname: 'lobby' }

      var sql = 'INSERT INTO messages (message, userid, roomid) \
                 VALUE (?, (SELECT id FROM users WHERE username = ? LIMIT 1), (SELECT id FROM rooms WHERE roomname = ? LIMIT 1), ?)';

      db.query(sql, params, function(err, res) {
        if (err) {
          console.log('error inserting message in DB',err);
        } else {
          callback(null, res);
        }
      });

    }
  },

// INSERT INTO messages (message, username, roomname) VALUES ('Hey', (SELECT id FROM users WHERE username='Kate'), (SELECT id FROM rooms WHERE roomname='lobby'));


  users: {
    // Ditto as above.
    get: function () {
      // query the database for users
      db.query('SELECT * FROM users', function(err, res) {
        if (err) {
          console.log(err);
        } else {
          callback(res);
        }
      });
    },
    post: function () {
      // query the database to post users
    }
  }
};

