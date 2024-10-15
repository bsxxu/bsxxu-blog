FROM node:20-alpine AS builder

WORKDIR /build/
COPY . .

RUN npm i -g pnpm && \
  pnpm i --frozen-lockfile && \
  pnpm build

FROM node:20-alpine

WORKDIR /bsxxu/

COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/public ./public/
COPY --from=builder /build/.next/static ./.next/static/

EXPOSE 80

ENTRYPOINT ["node", "--env-file", "/etc/bsxxu/web.env", "./apps/web/server.js"]
