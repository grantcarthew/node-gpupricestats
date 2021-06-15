FROM node:current-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm --no-update-notifier install
ADD ./dist/. .
CMD npm --no-update-notifier start

