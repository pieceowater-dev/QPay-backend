# Stage 1: Build Stage --------------------------------------
FROM node:21-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD https://s3.amazonaws.com/rds-downloads/rds-ca-2019-root.pem /app/rds-ca-2019-root.pem

COPY . .

RUN npm run build

# Stage 2: Production Stage --------------------------------------
FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist .
COPY --from=build /app/rds-ca-2019-root.pem .
COPY --from=build /app/src/ws-test/client ./src/ws-test/client

EXPOSE 3000

CMD ["node", "main"]
