# docker-sailsjs-example

- This uses [wait-for-it.sh](https://github.com/vishnubob/wait-for-it)  
Run the following commands to get `wait-for-it` repository. (Added `wait-for-it` as git submodule.)
```
git pull && git submodule init && git submodule update
```
-  [Control startup order in Compose](https://docs.docker.com/compose/startup-order/)


- This uses [wait-for-it.sh](https://github.com/vishnubob/wait-for-it)  
Run the following commands to get `wait-for-it` repository. (Added `wait-for-it` as git submodule.)
```
git pull && git submodule init && git submodule update
```
-  [Control startup order in Compose](https://docs.docker.com/compose/startup-order/)


## todo-server
- **Environment Variables for `todo-server`**

| Name | Description |
|---|---|
|PORT| application port
|DB_HOST| MySQL host
|DB_USER| MySQL username (must have alter permission)
|DB_PASSWORD| MySQL password
|DB_DATABASE| Database name 
|NODE_ENV| sails js environment mode (production, development , alterdb). 'alterdb' by default to create tables. \)O- O)\
- Ports
   - `1350` - api server

```bash
# build the containers, start it in de-attached mode. (runs in background).
docker-compose up --build -d

# list all (including stopped) containers, it should contain
# `todo-nodejs` and `todo-nodejs-mariadb`
docker container ls -a

# list running containers
docker ps

# destroy container and volume
docker-compose down -v

# destroy image
docker image rm <SHA>

# start or stop a container
docker container start <CONTAINER_NAME>
docker container stop <CONTAINER_NAME>

```

## mariadb: storage of your database data
- Create a data directory in your host system. example: `/my/database/data`  
It can also be `/var/lib/mysql`.   
Then `/my/database/data` will be mounted to the container as `/var/lib/mysql`

- https://stackoverflow.com/a/44949611
- https://hub.docker.com/_/mariadb/ (Caveats, Where to Store Data Section)
