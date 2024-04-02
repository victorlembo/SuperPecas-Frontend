FROMnode:20-alpine as angular
 WORKDIR /ng-app
 COPY package*.json .
 RUNnpmci
 COPY . .
 RUNnpmrunbuild
 FROMnginx:alpine
 ARGname=super-pecas
 COPY--from=angular /ng-app/dist/$name/browser /usr/share/nginx/html
 EXPOSE 80