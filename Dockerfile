# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli && npm install

COPY . .
RUN ng build --configuration production

# Stage 2: Nginx for Serving Angular
FROM nginx:alpine

# Copy built Angular app from Stage 1
COPY --from=build /app/dist/* /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
