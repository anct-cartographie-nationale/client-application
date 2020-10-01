# Stage 0, based on Node.js, to build and compile Angular
FROM node:12.13.0 as builder

WORKDIR /app

# Copy the package.json file first in order to cache the modules
COPY ./package.json .
COPY ./package-lock.json .
COPY ./patch.js .

# Install npm dependencies
RUN npm install

# Launch postinstall script (to include crypto module)
RUN npm run postinstall

# Copy the project
COPY ./angular.json .
COPY ./tsconfig.json .
COPY ./src ./src

ARG conf

# Building the Angular app /dist i18n
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app
FROM nginx

## Install dependency to get lua module in .conf
RUN apt-get update

RUN apt-get --assume-yes install nginx-extras

RUN rm /etc/nginx/conf.d/*

COPY --from=builder /app/dist/fr /usr/share/nginx/html
COPY --from=builder /app/dist/en /usr/share/nginx/html/en

RUN ls -l /usr/share/nginx/html
