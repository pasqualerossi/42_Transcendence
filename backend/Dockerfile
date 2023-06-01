# Sets the base image for the Dockerfile as node with the buster tag. This means it will use a Debian Buster-based image with Node.js preinstalled.
FROM node:buster

# Updates the package lists inside the Docker image.
RUN apt-get update -y

# Upgrades the installed packages inside the Docker image to their latest versions.
RUN apt-get upgrade -y

# Updates the global npm package to the latest version.
RUN npm update -g npm

# Sets the working directory inside the Docker image to /backend. This will be the directory where subsequent commands are executed.
WORKDIR /backend

# Copies the uploads directory from the host machine to the /backend/uploads directory inside the Docker image.
COPY uploads ./uploads

# Copies the package.json from the host machine to the current working directory (/backend) inside the Docker image. This is done to install the required Node.js dependencies.
COPY package*.json .

# Copies the tsconfig.json from the host machine to the current working directory (/backend) inside the Docker image. These files are used for TypeScript configuration.
COPY tsconfig*.json .

# Installs the Node.js dependencies specified in the package.json file in the current working directory.
RUN npm install

# Informs Docker that the container will listen on port 3000.
EXPOSE 3000

# Sets the default command to execute when the Docker container starts. It runs the npm script start:dev, which is expected to start the backend server in development mode.
ENTRYPOINT ["npm", "run", "start:dev"]