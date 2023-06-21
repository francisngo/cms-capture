FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["pnpm", "start"]