FROM node:20-alpine

WORKDIR /bsxxu-web/

COPY ./.next/standalone ./
COPY ./public ./apps/web/public/
COPY ./.next/static ./apps/web/.next/static/

EXPOSE 80

ENTRYPOINT ["node", "--env-file", "/etc/bsxxu/web.env", "./apps/web/server.js"]