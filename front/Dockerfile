FROM node:alpine as build

ARG api_url

WORKDIR /app
COPY package*.json ./

RUN yarn install

COPY . .

ENV REACT_APP_API_URL=$api_url

RUN yarn build

FROM nginx:alpine as run

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf