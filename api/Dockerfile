# Stage 0, based on Node.js
FROM node:12.16

WORKDIR /app

# Copy the package.json file first in order to cache the modules
COPY ../package.json .
COPY ../package-lock.json .

# Install npm dependencies
RUN npm install --silent

# Copy Json Server Api
COPY /api ./api

RUN npm run api

# expose port 3000
EXPOSE 3000

CMD npm run api
