FROM node:22

WORKDIR /bsxxu/

COPY ./.next/standalone ./
COPY ./public ./public/
COPY ./.next/static ./.next/static/

EXPOSE 3000

ENTRYPOINT ["node", "/bsxxu/server.js"]
