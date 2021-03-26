CREATE DATABASE if not exists wordguessr;

CREATE TABLE if not exists wordguessr.user(
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_sub VARCHAR(88) NOT NULL
);

CREATE TABLE if not exists wordguessr.game(
  game_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_sub VARCHAR(88) NOT NULL,
  game_mode VARCHAR(88) NOT NULL,
  word VARCHAR(88) NOT NULL,
  guess_count int NOT NULL,
  guesses longtext null
);
