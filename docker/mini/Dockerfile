 
FROM debian:jessie

# install native packages/dependencies/libraries

RUN apt-get update

RUN apt-get install -y -q --no-install-recommends \
	make \
	nginx \
	wget \
	curl \
	sudo \
	software-properties-common \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt-get -y autoclean

## mariadb
RUN apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db
RUN add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://sgp1.mirrors.digitalocean.com/mariadb/repo/10.3/debian jessie main'
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
RUN ["/bin/bash", "-c", "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password password root'"]
RUN ["/bin/bash", "-c", "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password_again password root'"]
RUN sudo apt-get install mariadb-server -y -q && mysql -u root -proot -e 'GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES;'

RUN sudo sed -i 's|127.0.0.1|0.0.0.0|g' /etc/mysql/my.cnf
RUN sudo service mysql restart

## install nodejs

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash \
&& source ~/.profile \
&& . ~/.nvm/nvm.sh \
&& nvm install 8.9.1 \
&& nvm use 8.9.1

## Sails JS / Node JS code
RUN mkdir -p /todo-server
WORKDIR /todo-server

COPY ./todo-application/todo-server/package.json /todo-server
RUN npm install

COPY ./todo-application/todo-server /todo-server
COPY ./wait-for-it/wait-for-it.sh /todo-server
EXPOSE 1350

RUN mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS tododb DEFAULT CHARSET utf8mb4; CREATE USER 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword'; GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword' WITH GRANT OPTION; FLUSH PRIVILEGES;"

ENV DB_HOST 127.0.0.1
ENV DB_USER todoserver
ENV DB_PASSWORD todoserverpassword
ENV DB_DATABASE tododb
ENV PORT 1350
ENV NODE_ENV alterdb 

CMD ["./wait-for-it.sh", "db:1350", "--", "npm", "start"]