FROM node:8.11.3

# `node` is a non-root user provided by official node images.
#USER node
 
 

#COPY . /todo-application/
RUN mkdir -p /todo-server

WORKDIR /todo-server

COPY ./todo-application/todo-server/package.json /todo-server
#RUN ls -a
RUN npm install
COPY ./todo-application/todo-server /todo-server
EXPOSE 1350
CMD ["npm", "start"]