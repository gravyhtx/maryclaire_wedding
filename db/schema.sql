-- DROP DATABASE IF EXISTS mc_guestbook_db;
-- CREATE DATABASE mc_guestbook_db;
USE g8iknkbvx7z5mfqe;

CREATE TABLE chirps (
  id INT AUTO_INCREMENT NOT NULL,
  author VARCHAR( 255) NOT NULL,
  body VARCHAR( 255 ) NOT NULL,
  created_at DATETIME NOT NULL,

  PRIMARY KEY ( id ) 
);