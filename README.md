# APP

## todo-server
- **Environment Variables for `todo-server`**

| Name | Description |
|---|---|
|PORT| application port
|DB_HOST| MySQL host
|DB_USER| MySQL username (must have alter permission)
|DB_PASSWORD| MySQL password
|DB_DATABASE| Database name 


## mariadb: storage of your database data
- Create a data directory in your host system. example: `/my/database/data`  
It can also be `/var/lib/mysql`.   
Then `/my/database/data` will be mounted to the container as `/var/lib/mysql`

- https://stackoverflow.com/a/44949611
- https://hub.docker.com/_/mariadb/ (Caveats, Where to Store Data Section)
