FROM node:8.11.3

# `node` is a non-root user provided by official node images.
#USER node
 
 
ADD ./todo-application/todo-server /todo-server/
#COPY . /todo-application/
WORKDIR /todo-server

CMD ["npm", "install"]

 