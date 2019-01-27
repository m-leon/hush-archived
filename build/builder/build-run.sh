#!/bin/sh
cd /app

rm BUILD_COMPLETE

yarn install
yarn production

composer install
php artisan key:generate -n
php artisan migrate --force

echo $(date) > BUILD_COMPLETE
