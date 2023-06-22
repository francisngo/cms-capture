FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/

RUN pnpx prisma generate

COPY . .

EXPOSE 8080

CMD ["pnpm", "start"]