FROM node:8.11.3-alpine
RUN apk add --no-cache git bash && mkdir -p /todo-server

WORKDIR /todo-server

COPY ./todo-application/todo-server/package.json /todo-server
#RUN ls -a
RUN npm install
COPY ./todo-application/todo-server /todo-server
COPY ./wait-for-it/wait-for-it.sh /todo-server
EXPOSE 1350
CMD ["npm", "start"]