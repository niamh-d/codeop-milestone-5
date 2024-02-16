--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists students;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE students(
    id INT NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(40) not null, 
    lastName VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );
