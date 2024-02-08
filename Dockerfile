# Use an official node.js runtime as a parent image
FROM node:lts-bookworm-slim

# install npm at the global scope
RUN npm cache clean --force && \
    npm i npm@latest -g && \
    # create /.env.files, /dist and /dist/uploads directory
    mkdir -p /.env.files /dist/uploads

# bundle app source
COPY .env.files /.env.files/
COPY package.json /dist/
COPY dist/. /dist/

# Set the working directory to /dist
WORKDIR /dist

# install modules
RUN npm install --omit=dev

# set env as production
ENV NODE_ENV=production

# start production server
CMD [ "node", "server.js" ]