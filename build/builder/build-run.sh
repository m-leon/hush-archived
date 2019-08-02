#!/bin/sh
cd /app

rm -f BUILD_COMPLETE

npm install
npm run production

composer install
php artisan key:generate -n
php artisan migrate --force

echo $(date) > BUILD_COMPLETE
