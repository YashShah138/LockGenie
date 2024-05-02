CREATE DATABASE pass_app;
USE pass_app;

/* User table (stores user info 
                [name, email, password]
              )
*/
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPass VARCHAR(255) NOT NULL
);

/* Password table (stores password info using the userID as a foreign key
                    [userID, website name, website password]
                  )
*/
CREATE TABLE passwords (
    passID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED NOT NULL,
    web_name VARCHAR(100) NOT NULL,
    web_pass VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(id)
);


/* Test values */
INSERT INTO users (username, email, hashedPass)
VALUES 
('test1', 'test@test1.com', 'testPass1234'),
('test2', 'test@test2.com', 'testPass5678');

INSERT INTO passwords (userID, web_name, web_pass)
VALUES
(1, 'github', 'githubPass'),
(1, 'dev', 'devPass')
(2, 'google', 'googlePass'),
(2, 'stack overflow', 'soPass');
