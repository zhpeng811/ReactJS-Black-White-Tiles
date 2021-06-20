# https://hub.docker.com/_/node
# using node's base image
FROM node:14.17.1-alpine3.13

# create the directory for the project 
RUN mkdir /ReactJS-Black-White-Tiles

# copy the project over
COPY ./ /ReactJS-Black-White-Tiles

# set the working directory of the container to the project
WORKDIR /ReactJS-Black-White-Tiles

# install necessary node and react dependencies
RUN npm install

# start the project
CMD npm start