# Stage 0, based on Node.js, to build and compile Angular
FROM node:12.16-slim as build

WORKDIR /app

# Copy the package.json file first in order to cache the modules
COPY ./package.json .
COPY ./package-lock.json .

# Install npm dependencies
RUN npm install --silent

# Copy the project
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY /nginx/nginx.conf .
COPY /src ./src

ARG conf

# Building the Angular app /dist i18n
RUN npm run build:prod

# Stage 1, based on Nginx, to have only the compiled app
FROM nginx

# copy artifact build from the 'build environment'
RUN apt-get update

COPY --from=build /app/dist/fr /usr/share/nginx/html

RUN touch /var/run/nginx.pid
RUN ls -l /usr/share/nginx/html

# expose port 8080
EXPOSE 8080

# run nginx
CMD ["nginx", "-g", "daemon off;"]
