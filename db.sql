CREATE DATABASE if not exists wordguessr;

CREATE TABLE if not exists wordguessr.user(
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_sub VARCHAR(88) NOT NULL
);
