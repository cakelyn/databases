CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(15) UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  userid INT,
  message VARCHAR(140),
  roomid INT,
  PRIMARY KEY (id)

);

-- add in foreign keys
  --FOREIGN KEY (userid) REFERENCES users(id),
  --FOREIGN KEY (roomid) REFERENCES rooms(id)
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/