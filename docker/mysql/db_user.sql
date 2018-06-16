-- create user for mysql
CREATE USER 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';
GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';
-- reload mysql users
FLUSH PRIVILEGES;