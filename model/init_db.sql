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
    dob DATE not null,
    course VARCHAR(40) not null,
    sex CHAR(1) not null,
    scholarship BOOL not null,
    photo CHAR(3) not null,
    PRIMARY KEY (id)
    );

INSERT INTO students(firstName, lastName, dob, course, sex, photo, scholarship)
VALUES
    ('Sofia', 'Jones', 20011003, 'French 101', 'F', 'tyu', 0),
    ('Lucy', 'Evans', 20010916, 'French 101', 'F', 'tpy', 0),
    ('Michael', 'Blunt', 20021010, 'French 101', 'M', 'tpp', 0),
    ('Tiiu', 'Tamm', 20001106, 'French 101', 'F', 'wef', 0),
    ('Julie', 'Peters', 20000815, 'French 101', 'F', 'ddu', 0),
    ('Sofie', 'Stephens', 20001113, 'French 201', 'F', 'wet', 1),
    ('Ivonne', 'Pohl', 20010506, 'French 201', 'F', 'wli', 0),
    ('Rain', 'Walsh', 20010311, 'French 201', 'N', 'asd', 0),
    ('Gale', 'Vasquez', 20020511, 'French 201', 'O', 'uus', 0),
    ('Erik', 'Reppo', 20001205, 'Python 101', 'M', 'tee', 0),
    ('Patrice', 'Mcneil', 20020903, 'Python 101', 'F', 'qqe', 0),
    ('Susana', 'Calzada', 20000403, 'Python 101', 'F', 'fff', 0),
    ('Tania', 'Cunningham', 19981003, 'Creative Writing 101', 'N', 'iaa', 1),
    ('Beverly', 'Patterson', 19980804, 'Creative Writing 101', 'F', 'iii', 0),
    ('Claus', 'Weimann', 19971003, 'Creative Writing 101', 'M', 'wey', 0),
    ('Dora', 'Hayden', 20011003, 'Creative Writing 101', 'F', 'dca', 0),
    ('Haruka', 'Kawamura', 20011003, 'Creative Writing 101', 'N', 'rrq', 0),
    ('Marietta', 'Diaz', 20011207, 'Danish 101', 'F', 'sap', 0),
    ('Ali', 'Weber', 20010203, 'Danish 101', 'F', 'gfz', 0),
    ('Remigio', 'Teran', 19981103, 'Danish 101', 'M', 'aau', 1),
    ('Sarah', 'Shore', 19991023, 'Danish 101', 'N', 'wex', 0);