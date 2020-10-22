# Stage 0, based on Node.js
FROM node:12.16-slim

WORKDIR /app

# Copy the package.json file first in order to cache the modules
COPY . .

# Install npm dependencies
RUN npm install

# run json-server
RUN npm run api

# expose port 3000
EXPOSE 3000

CMD npm run api
