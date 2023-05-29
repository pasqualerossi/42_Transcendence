FROM node:buster
RUN apt-get update -y
RUN apt-get upgrade -y
RUN npm update -g npm
WORKDIR /frontend
COPY package*.json .
COPY vue.config.js .
RUN  npm install
EXPOSE 8080
ENTRYPOINT ["npm", "run", "serve"]