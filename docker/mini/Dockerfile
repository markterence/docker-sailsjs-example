 
FROM debian:jessie

# install native packages/dependencies/libraries
 
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.9.1
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

ENV DB_HOST 127.0.0.1
ENV DB_USER todoserver
ENV DB_PASSWORD todoserverpassword
ENV DB_DATABASE tododb
ENV PORT 1350
ENV NODE_ENV alterdb 

VOLUME ["/var/lib/mysql", "/etc/mysql"]
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && \
	apt-get install -y -q --no-install-recommends \
	git \
	curl \
	software-properties-common && \
	apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db && \
	add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://sgp1.mirrors.digitalocean.com/mariadb/repo/10.3/debian jessie main' && \
	apt-get update && \
	DEBIAN_FRONTEND=noninteractive && \
	echo "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password password root'" | bash && \
	echo "debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password_again password root'" | bash && \
	apt-get install mariadb-server -y --no-install-recommends && \
	rm -f /tmp/config && \
	service mysql restart && \
	mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS tododb DEFAULT CHARSET utf8mb4;" && \
	mysql -u root -proot -e "CREATE USER 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword';" && \
	mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'todoserver'@'%' IDENTIFIED BY 'todoserverpassword' WITH GRANT OPTION; FLUSH PRIVILEGES;" && \
	curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash && \
	source $NVM_DIR/nvm.sh \
	&& nvm install  8.9.1 \
	&& nvm alias default 8.9.1 \
	&& nvm use 8.9.1 && node -v && npm -v

## mariadb
##  rm -rf /var/lib/apt/lists/* \ apt-get -y autoclean

RUN mkdir -p /todo-server
WORKDIR /todo-server

COPY ./todo-application/todo-server/package.json /todo-server
RUN npm install && rm -rf /var/lib/apt/lists/* && apt-get -y autoclean && apt-get remove curl
COPY ./todo-application/todo-server /todo-server
COPY ./wait-for-it/wait-for-it.sh /todo-server
EXPOSE 1350

CMD ["./wait-for-it.sh", "127.0.0.1:1350", "--", "npm", "start"]