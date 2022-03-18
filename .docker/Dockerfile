# dev environment
# FROM node:13.12.0-alpine
# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json ./
# RUN npm install
# COPY . ./

# CMD ["npm", "start"]

# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
