FROM node:8.11.3

# `node` is a non-root user provided by official node images.
#USER node
 
 

#COPY . /todo-application/
WORKDIR /todo-server
COPY ./todo-application/todo-server/package.json .
#RUN ls -a
RUN npm install
COPY ./todo-application/todo-server /todo-server/
USER NODE
CMD ["node", "app.js"]