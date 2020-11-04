# Based on Node.js
FROM node:12.16

WORKDIR /app

# Copy the package.json file first in order to cache the modules
COPY . .

# Install npm dependencies
RUN npm install

# expose port 3000
EXPOSE 3000

CMD ["npm", "start"]
