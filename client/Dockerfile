FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/ngnix/conf.d/default.conf
COPY --from=builder /add/build usr/share/nginx/html