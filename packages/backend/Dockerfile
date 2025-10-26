# syntax=docker/dockerfile:1.4

# Use an official node.js runtime as a parent image
FROM node:22.15.0-bookworm-slim AS base

# override default shell
SHELL ["/bin/bash", "-c"]

# create /.env.files and /dist directories
RUN mkdir -p /.env.files /dist

# copy app source and config files
COPY package.json package-lock.json dist/. /dist/
COPY .env.files/.env.production /.env.files/

# set working directory
WORKDIR /dist

# clean install modules
RUN npm ci --omit=dev

# copy packages archives
COPY --from=packages vittel-types-2.0.0.tgz /dist/
COPY --from=packages vittel-utils-2.0.0.tgz /dist/

# overwrite symlinked packages in node_modules
RUN PACKAGES=() && \
    PACKAGES[0]="vittel-types-2.0.0.tgz node_modules/@vittel/types" && \
    PACKAGES[1]="vittel-utils-2.0.0.tgz node_modules/@vittel/utils" && \
    printf "%s\n" "${PACKAGES[@]}" | \
    xargs -tn 2 bash -c 'rm -rf "$1" && mkdir -p "$1" && tar -xzf "$0" -C "$1" --strip-components=1'

# build actual runtime
FROM node:22.15.0-bookworm-slim

# copy from base
COPY --chown=node:node --from=base /dist/. /dist/
COPY --chown=node:node --from=base /.env.files/. /.env.files/

# define user
USER node

# set working directory
WORKDIR /dist

# set env as production
ENV NODE_ENV=production

# start production server
CMD [ "node", "server.js" ]