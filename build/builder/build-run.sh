#!/bin/sh
cd /app

yarn install
yarn production

composer install
php artisan key:generate -n
php artisan migrate --force
