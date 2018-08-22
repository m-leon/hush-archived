#!/bin/bash
if ! [ -x "$(command -v docker)" ]; then
  echo -e "\e[41mERROR\e[0m Docker is required to continue"
  exit 1
fi

if [ ! -w "./src/storage/" ] && [ ! -w "./src/bootstrap/cache/" ]; then
  echo -e "\e[41mERROR\e[0m This user needs write permissions to cache directories ('./src/storage/' and './src/bootstrap/cache/')"
  exit 2
fi

###### Environment variables ######
# Read existing environment variables if they exist
if [ -f .env ]; then
  echo -e "\e[42mDEBUG\e[0m Read existing .env file"
  source .env
fi

if [ -f src/.env ]; then
  echo -e "\e[42mDEBUG\e[0m Read existing src/.env file"
  source src/.env
fi

# Check for --production flag to set environment, defaults to development environment
if [[ $* == *--production* ]]; then
  echo -e "\e[42mDEBUG\e[0m Preparing for production environment"
  export APP_ENV=production
  export APP_DEBUG=false
  export NPM_COMMAND='yarn run production'
else
  echo -e "\e[42mDEBUG\e[0m Preparing for development environment"
  export APP_ENV=local
  export APP_DEBUG=true
  export NPM_COMMAND='yarn run watch'
fi

if [ -z ${APP_NAME} ]; then
  export APP_NAME=hush
else
  export APP_NAME=${APP_NAME}
fi

if [ -z ${APP_PORT} ]; then
  export APP_PORT=8080
else
  export APP_PORT=${APP_PORT}
fi

# Run permissions used for NPM, Composer, & PHP containers
if [ -z ${APP_UID} ]; then
  export APP_UID=$(id -u)
else
  export APP_UID=${APP_UID}
fi

if [ -z ${APP_GID} ]; then
  export APP_GID=$(id -g)
else
  export APP_GID=${APP_GID}
fi

# Database credentials, generated with /dev/urandom
if [ -z ${MYSQL_ROOT_PASSWORD} ]; then
  export MYSQL_ROOT_PASSWORD=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)
else
  export MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
fi

if [ -z ${MYSQL_DATABASE} ]; then
  export MYSQL_DATABASE=${APP_NAME}
else
  export MYSQL_DATABASE=${MYSQL_DATABASE}
fi

if [ -z ${MYSQL_USER} ]; then
  export MYSQL_USER=${APP_NAME}
else
  export MYSQL_USER=${MYSQL_USER}
fi

if [ -z ${MYSQL_PASSWORD} ]; then
  export MYSQL_PASSWORD=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)
else
  export MYSQL_PASSWORD=${MYSQL_PASSWORD}
fi

# Generate Laravel's APP_KEY
# Done this way rather than with artisan because PHP is not a requirement of host
if [ -z ${APP_KEY} ]; then
  export APP_KEY=base64:$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)
else
  export APP_KEY=${APP_KEY}
fi

# Port 8080 hardcoded here and in Nginx's docker definition
if [ -z ${APP_URL} ]; then
  if [ "$APP_ENV" == "local" ]; then
    export APP_URL=http://localhost:${APP_PORT}
  else
    echo -e "\e[41mERROR\e[0m APP_URL needs to be defined"
    exit 1
  fi
else
  export APP_URL=${APP_URL}
fi

export ESC="$" # Used as a pseudo-escape with envsubst
envsubst < ".env.template" > ".env"
chmod 600 .env
envsubst < "src/.env.template" > "src/.env"
chmod 600 src/.env
envsubst < "build/nginx.template.conf" > "build/nginx.conf"
envsubst < "docker.template.yml" > "docker-compose.yml"
echo -e "\e[44mINFO\e[0m Created configuration and docker files"
echo -e "\e[44mINFO\e[0m Run 'docker-compose up' to continue"
