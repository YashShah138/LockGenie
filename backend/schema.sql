CREATE DATABASE pass_app;
USE pass_app;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPass VARCHAR(255) NOT NULL
);

CREATE TABLE passwords (
    passID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED NOT NULL,
    web_name VARCHAR(100) NOT NULL,
    web_pass VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(id)
);

INSERT INTO users (username, email, hashedPass)
VALUES 
('test1', 'test@test1.com', 'testPass1234'),
('test2', 'test@test2.com', 'testPass5678');

INSERT INTO passwords (userID, web_name, web_pass)
VALUES
(1, 'youtube', 'youtubePass'),
(1, 'google', 'googlePass');