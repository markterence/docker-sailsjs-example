FROM node:8.11.3

# `node` is a non-root user provided by official node images.
USER node

# set the working directory in the container
WORKDIR /home/node/todo-server

# copy sails js source code to current WORKDIR
ADD ./todo-application/todo-server/ .

RUN npm install