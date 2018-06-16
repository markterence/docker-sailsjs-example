-- create user for mysql
CREATE USER 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';
GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';
--WITH GRANT OPTION;
-- reload mysql users
FLUSH PRIVILEGES;