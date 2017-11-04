CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL,
  username VARCHAR(15),
  message VARCHAR(140),
  roomname INT,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INT NOT NULL,
  username VARCHAR(15),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT NOT NULL,
  roomname VARCHAR(15),
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/