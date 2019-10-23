FROM node:12.13

RUN mkdir /code
WORKDIR /code/

#copy package-lock.json and package.json in order to prevent docker from caching node_modules
ADD package*.json /code/
RUN npm install
ADD . /code/