var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      // gets messages from the database
      // use models for query, controller for action
      // models.messages.get(callback with what we want to do with data)
      // res.send()
      models.messages.get(function(data) {
        res.send(data);
      });
    },
    post: function (req, res) {
    // a function which handles posting a message to the database
      // posts messages to the database
      // use models for query, controller for action
      // models.messages.post(callback with what we want to do with data)
      // res.send()

      var params = [req.body.message, req.body.username, req.body.roomname];
      models.messages.post(params, function(err, results) {
        if (err) {
          console.log('error posting to controller', err);
        }
        res.sendStatus(201);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(data) {
        res.send(data);
      });
    },
    post: function (req, res) {
    }
  }
};

// EXAMPLE
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });