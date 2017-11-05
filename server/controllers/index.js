var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      models.messages.get(function(data) {
        res.send(data);
      });
    },
    post: function (req, res) { // a function which handles posting a message to the database
      var params = [req.body.message, req.body.username, req.body.roomname];
      models.messages.post(params, function(err, results) {
        if (err) {
          console.log('CONTROLLER error posting message: ', err.sqlMessage);
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
      var params = [req.body.username];
      models.users.post(params, function(err, results) {
        if (err) {
          console.log('CONTROLLER error posting username: ', err.sqlMessage);
        }
        res.sendStatus(201);
      });
    }
  },
  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get(function(data) {
        res.send(data);
      });
    },
    post: function (req, res ) {
     console.log('room received by server = ',req.body);
      var params = [req.body.roomname];
      models.rooms.post(params, function(err, results) {
        if (err) {
          console.log('CONTROLLER error posting roomname: ', err.sqlMessage);
        }
        res.sendStatus(201);
      });
    }
  }


};
