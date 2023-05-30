# This file is used to build a Docker image. It contains a set of instructions that Docker follows to create the image.

# This specifies the base image for the Docker image, using node image with the tag buster.
FROM node:buster

# This updates the package lists inside the Docker image.
RUN apt-get update -y

# This upgrades the installed packages inside the Docker image.
RUN apt-get upgrade -y

# This updates the globally installed npm package to the latest version.
RUN npm update -g npm

# This sets the working directory inside the Docker image to /frontend.
WORKDIR /frontend

# This copies the package.json file from the current directory locally to the working directory in the Docker image.
COPY package*.json .

# This copies the vue.config.js file from the current directory locally to the working directory in the Docker image.
COPY vue.config.js .

# This runs the npm install command inside the Docker image to install the dependencies specified in the package.json file.
RUN  npm install

# This informs Docker that the container listens on port 8080.
EXPOSE 8080

# This specifies the default command to run when the container starts. This runs the npm run serve command, which starts the development server for this project.
ENTRYPOINT ["npm", "run", "serve"]