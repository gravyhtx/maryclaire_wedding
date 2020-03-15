### Schema
-- DROP DATABASE IF EXISTS burger_db;
-- CREATE DATABASE burger_db;
-- USE zmeyu00fgdm9q29d;

DROP DATABASE IF EXISTS mc_guest_book;
CREATE DATABASE mc_guest_book;
USE mc_guest_book;

CREATE TABLE guest_book
(
	ID int NOT NULL AUTO_INCREMENT,
	Guest VARCHAR(50) NOT NULL DEFAULT "Anonymous",
    Message VARCHAR(255) NOT NULL DEFAULT "Congrats!",
	Today DATETIME NULL,
	PRIMARY KEY (id)
);