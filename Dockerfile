FROM node:20-alpine

WORKDIR /bsxxu/

COPY ./.next/standalone ./
COPY ./public ./public/
COPY ./.next/static ./.next/static/

EXPOSE 80

ENTRYPOINT ["node", "/bsxxu/server.js"]
