# develop stage
FROM node:13.7 as develop-stage
WORKDIR /app
# COPY package.json ./
COPY package*.json ./
RUN yarn global add @quasar/cli
# RUN apk add build-base python-dev py-pip jpeg-dev zlib-dev
# ENV LIBRARY_PATH=/lib:/usr/lib
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn
RUN yarn cache clean
RUN quasar build
# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
