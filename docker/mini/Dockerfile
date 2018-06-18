 
FROM debian:jessie

# install native packages/dependencies/libraries

RUN apt-get update

RUN apt-get install -y -q --no-install-recommends \
	wget \
	curl \
	software-properties-common

## mariadb
##  rm -rf /var/lib/apt/lists/* \ apt-get -y autoclean
COPY ./docker/mini/mysql/create_admin.sh	/usr/local/bin/create_admin.sh
RUN chmod +x /usr/local/bin/create_admin.sh
ENV MYSQL_BIND_ADDRESS 0.0.0.0
ENV MYSQL_PORT 3306
ENV MYSQL_ADMIN_PASS root
ENV MYSQL_ADMIN_USER root
ENV MYSQL_ADMIN_HOST %

RUN apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db && \
add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://sgp1.mirrors.digitalocean.com/mariadb/repo/10.3/debian jessie main' && \
apt-get update && \
DEBIAN_FRONTEND=noninteractive && \
echo "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password password root'" | bash && \
echo "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password_again password root'" | bash && \
apt-get install mariadb-server -y && \
rm -f /tmp/config && \
service mysql restart

VOLUME ["/var/lib/mysql", "/etc/mysql"]
## install nodejs

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.4.7
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install  8.9.1 \
    && nvm alias default 8.9.1 \
    && nvm use 8.9.1

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN apt-get install git
RUN node -v
RUN npm -v


## Sails JS / Node JS code
RUN mkdir -p /todo-server
WORKDIR /todo-server

COPY ./todo-application/todo-server/package.json /todo-server
RUN npm install

COPY ./todo-application/todo-server /todo-server
COPY ./wait-for-it/wait-for-it.sh /todo-server
EXPOSE 1350

RUN echo "mysql -u root -proot -e 'CREATE DATABASE IF NOT EXISTS tododb DEFAULT CHARSET utf8mb4; CREATE USER 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword'; GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword' WITH GRANT OPTION; FLUSH PRIVILEGES;'" >> /tmp/init_db && \
bash /tmp/init_db

ENV DB_HOST 127.0.0.1
ENV DB_USER todoserver
ENV DB_PASSWORD todoserverpassword
ENV DB_DATABASE tododb
ENV PORT 1350
ENV NODE_ENV alterdb 

CMD ["./wait-for-it.sh", "db:1350", "--", "npm", "start"]