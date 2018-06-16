-- create user for mysql
GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';
-- reload mysql users
FLUSH PRIVILEGES;