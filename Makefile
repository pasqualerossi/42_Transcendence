all:
	docker-compose -f ./docker-compose.yml up --build

clean:
	docker-compose -f ./docker-compose.yml down

fclean:
	docker-compose -f ./ddocker-compose.yml down --volumes --rmi all

re: fclean all

stop:
	docker kill $$(docker ps -q)

delete:
	docker container prune -f
	docker rmi $$(docker images -q)

show:
	docker container ls -a
	docker image ls -a