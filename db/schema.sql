### Schema
-- DROP DATABASE IF EXISTS burger_db;
-- CREATE DATABASE burger_db;
-- USE zmeyu00fgdm9q29d;

DROP DATABASE IF EXISTS mc_guest_book;
CREATE DATABASE mc_guest_book;
USE mc_guest_book;

CREATE TABLE guest_book
(
	id int NOT NULL AUTO_INCREMENT,
	guest VARCHAR(60) NOT NULL,
    message VARCHAR(255) NOT NULL,
	today DATETIME NULL,
	PRIMARY KEY (id)
);