var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      db.Message.findAll({ include: [db.User, db.Room] })
        .then(function(message) {
          res.json(message);
        });
    },
    post: function (req, res) { // a function which handles posting a message to the database
      db.User.findOrCreate({ where: {username: req.body.username} })
        .spread(function(user, created) {
          db.Room.findOrCreate({ where: {roomname: req.body.roomname} })
          .spread(function(room, created) {
            console.log('------------------->creating');
            db.Message.create({
              UserId: user.get('id'),
              message: req.body.message,
              RoomId: room.get('id')
            })
            .then(function(message) {
              res.sendStatus(201);
            });
          });
        });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({ where: {username: req.body.username} })
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      db.Room.findAll()
        .then(function(rooms) {
          res.json(rooms);
        });
    },
    post: function (req, res ) {
      db.Room.findOrCreate({where: {roomname: req.body.roomname} })
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  }


};
