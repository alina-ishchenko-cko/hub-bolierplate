FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY package.json /usr/src/app
RUN yarn install

WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]