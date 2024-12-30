FROM node:20-alpine as build

# Variables
ARG NODE_ENV=prod
ARG NODE_OPTIONS="--max_old_space_size=4096"
ENV NG_CLI_ANALYTICS=ci \
    NODE_ENV=${NODE_ENV} \
    NODE_OPTIONS=${NODE_OPTIONS}

# Setup
RUN mkdir /app
WORKDIR /app
COPY . .

# Build
RUN if [ ! -d "dist" ]; then npm install && npm run build; fi

# Use Nginx to serve
FROM git.zakscode.com/ztimson/momentum:latest
RUN rm -rf /app/server/public/assets /app/server/public/index.html
COPY --from=build /app/dist /app/server/public
