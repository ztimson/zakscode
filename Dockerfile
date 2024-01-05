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
FROM nginx:1.23-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy aditional files
COPY package.json /usr/share/nginx/html
COPY docker/robots.txt /usr/share/nginx/html/robots.txt
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Setup environment varible script
COPY docker/setup-environment.sh /docker-entrypoint.d/setup-environment.sh
RUN chmod +x /docker-entrypoint.d/setup-environment.sh

EXPOSE 80
