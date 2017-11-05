var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', '');

var sequelize = new Sequelize('sequelize_test', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
  timestamps: false
  }
});

var User = db.define('User', {
  username: Sequelize.STRING
});

var Room = db.define('Room', {
  roomname: Sequelize.STRING
});

var Message = db.define('Message', {
  message: Sequelize.STRING,
});

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

User.sync({force: true})
  .then(function() {
    Room.sync({force: true})
      .then(function() {
        Message.sync({force: true});
      });
  });

exports.User = User;
exports.Room = Room;
exports.Message = Message;
