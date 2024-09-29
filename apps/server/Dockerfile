FROM node:20-alpine

WORKDIR /bsxxu-server/

COPY ./dist/main.cjs .

EXPOSE 8080

ENTRYPOINT ["node", "--env-file", "/etc/bsxxu/server.env", "./main.cjs"]