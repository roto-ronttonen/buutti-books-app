# About project

Easiset way to start the app is to run `docker-compose up` or `sudo docker-compose up` if user doesn't have required permissions

Building the docker images might take a while

This is obviously not a production ready setup

Requires docker and docker-compose

## Without docker

You can start dev servers without docker with the following steps

Requires yarn and node installed

### Mongodb

https://docs.mongodb.com/manual/installation/

### Back

Inside folder `./back`

`echo "DATABASE_URL=mongodb://localhost:27017/books" > .env`

`yarn start:dev`

### Front

Inside folder `./front`

`echo "REACT_APP_API_URL=http://localhost:8881" > .env`

`yarn start`
