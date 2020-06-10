# Stage 1
FROM node:12 as react-build

WORKDIR /app

ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install --prod

COPY . ./
RUN yarn build --production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
