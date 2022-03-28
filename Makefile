CONTAINER_NAME=gisa-app
PWD=$(shell pwd)
APP_DIR=/usr/src

build:
	@echo "Buildando a imagem a partir do Dockerfile"
	@docker build -t gisa-app .

start: build 
	@echo "Subindo ${CONTAINER_NAME}"
	@docker run -it --rm -v ${PWD}:${APP_DIR} --name ${CONTAINER_NAME} -p 0.0.0.0:80:3000 ${CONTAINER_NAME}

stop:
	@echo "Parando ${CONTAINER_NAME}"
	@docker stop ${CONTAINER_NAME}