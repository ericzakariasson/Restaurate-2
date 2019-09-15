# Builder
FROM node:10-alpine AS builder
WORKDIR /app


COPY ./package.json /app/
RUN npm i -g yarn
RUN yarn install
COPY . /app

RUN yarn run clean
RUN yarn run build

# Image production
FROM node:10-alpine AS production
WORKDIR /app

RUN npm i -g yarn

COPY --from=builder ./app/dist ./dist
COPY package.json ./

RUN yarn install --production

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]