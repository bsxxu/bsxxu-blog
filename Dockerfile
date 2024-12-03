FROM node:22

WORKDIR /aiduorin/

COPY ./.next/standalone ./
COPY ./public ./public/
COPY ./.next/static ./.next/static/

EXPOSE 3000

ENTRYPOINT ["node", "/aiduorin/server.js"]
