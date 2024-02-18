--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists students;
DROP TABLE if exists tutors;
DROP TABLE if exists courses;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE tutors(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(40) not null, 
    lastName VARCHAR(40) not null,
    startDate DATE not null,
    dob DATE not null,
    courses VARCHAR(255),
    sex CHAR(1) not null,
    photo CHAR(3),
    PRIMARY KEY (id)
    )ENGINE=INNODB AUTO_INCREMENT = 176;

INSERT INTO tutors(firstName, lastName, startDate, dob, courses, sex, photo)
VALUES
    ('Sofie', 'Stephens', 20200321, 19951113, 'Creative Writing 101', 'F', 'wet'),
    ('Claus', 'Weismann', 20210301, 19961003, 'German 101,German 201', 'M', 'wey'),
    ('Ivonne', 'Pohl', 20210801, 19921006, 'French 101,French 201', 'F', 'wli'),
    ('Milan', 'Zukal', 20220901, 19870416, 'Python 101', 'M', '1gs'),
    ('Sebastian', 'Kruse', 20220901, 19880710, 'Danish 101', 'M', 'hhf'),
    ('Gale', 'Vasquez', 20230901, 19980511, 'Spanish 101', 'O', 'uus');


CREATE TABLE courses(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40) not null, 
    tutorName VARCHAR(40),
    tutorId INT,
    schedule VARCHAR(255),
    room VARCHAR(5),
    PRIMARY KEY (id),
    FOREIGN KEY (tutorId) REFERENCES tutors(id)
    )ENGINE=INNODB AUTO_INCREMENT = 510;

INSERT INTO courses(title, tutorName, tutorId, schedule, room)
VALUES
    ('French 101', 'Ivonne Pohl', 178, 'Mon & Wed 18:30-20:00', '1.03'),
    ('French 201', 'Ivonne Pohl', 178, 'Mon & Thurs 16:30-18:00', '1.03'),
    ('Python 101', 'Milan Zukal', 179, 'Tues & Fri 16:30-18:00', '2.01A'),
    ('Spanish 101', 'Gale Vasquez', 181, 'Mon & Wed 16:30-18:00', '2.01A'),
    ('German 101', 'Claus Weismann', 177, 'Mon & Thurs 17:00-18:30', '1.02'),
    ('German 201', 'Claus Weismann', 177, 'Tues & Fri 16:30-18:00', '1.02'),
    ('Danish 101', 'Sebastian Kruse', 180, 'Tues & Thurs 17:30-19:00', '1.01'),
    ('Creative Writing 101', 'Sofie Stephens', 176, 'Wed & Fri 16:30-18:00', '1.01');


CREATE TABLE students(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(40) not null, 
    lastName VARCHAR(40) not null,
    dob DATE not null,
    course VARCHAR(40) not null,
    sex CHAR(1) not null,
    scholarship BOOL not null,
    photo CHAR(3),
    PRIMARY KEY (id)
    )ENGINE=INNODB AUTO_INCREMENT = 1550;

INSERT INTO students(firstName, lastName, dob, course, sex, photo, scholarship)
VALUES
    ('Sofia', 'Jones', 20011003, 'German 101', 'F', 'tyu', 0),
    ('Lucy', 'Evans', 20010916, 'French 101', 'F', 'tpy', 0),
    ('Michael', 'Blunt', 20021010, 'French 101', 'M', 'tpp', 0),
    ('Tiiu', 'Tamm', 20001106, 'Spanish 101', 'F', 'wef', 0),
    ('Julie', 'Peters', 20000815, 'French 101', 'F', 'ddu', 0),
    ('Rain', 'Walsh', 20010311, 'French 201', 'N', 'asd', 0),
    ('Eoin', 'Murphy', 19961030, 'French 201', 'M', 'sfp', 0),
    ('Erik', 'Reppo', 20001205, 'Spanish 101', 'M', 'tee', 0),
    ('Nieve', 'Peron', 20000810, 'Python 101', 'N', 'lur', 1),
    ('Patrice', 'Mcneil', 20020903, 'Python 101', 'F', 'qqe', 0),
    ('Susana', 'Calzada', 20000403, 'Python 101', 'F', 'bbb', 0),
    ('Tania', 'Cunningham', 19981003, 'Creative Writing 101', 'N', 'iaa', 1),
    ('Beverly', 'Patterson', 19980804, 'Creative Writing 101', 'F', 'iii', 0),
    ('Dora', 'Hayden', 20011003, 'German 101', 'F', 'dca', 0),
    ('Haruka', 'Kawamura', 20011003, 'German 101', 'N', 'rrq', 0),
    ('Marietta', 'Diaz', 20011207, 'Danish 101', 'F', 'sap', 0),
    ('Alex', 'Weber', 20010203, 'Danish 101', 'N', 'gfz', 0),
    ('Sorcha', 'Fitzpatrick', 19990912, 'Danish 101', 'F', 'iol', 0),
    ('Remigio', 'Teran', 19981103, 'German 201', 'M', 'aau', 1),
    ('Stefan', 'Shore', 19991023, 'German 201', 'N', 'wex', 0);