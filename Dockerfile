FROM node:alpine
    RUN mkdir -p /usr/src
    WORKDIR /usr/src
    COPY . /usr/src

EXPOSE 3000
ENTRYPOINT [ "./dockerfile_entrypoint.sh"]