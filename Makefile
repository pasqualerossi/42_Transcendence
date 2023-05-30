# This runs the Docker-compose command to build and start the services defined in the docker-compose.yml file.
all:
	docker-compose -f ./docker-compose.yml up --build

# This stops and removes the Docker containers defined in the docker-compose.yml file.
clean:
	docker-compose -f ./docker-compose.yml down

# This stops and removes the containers but also removes any volumes and images created by the containers.
fclean:
	docker-compose -f ./ddocker-compose.yml down --volumes --rmi all

# This cleans up the environment by running fclean and then rebuilds and starts the services using all.
re: fclean all