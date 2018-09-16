#!/bin/sh
cd /app

# Wait till composer is installed
while [ ! -f /app/vendor/autoload.php ]; do
  sleep 5
done

# Wait till MySQL is started
until php artisan check:db; do
  sleep 5
done

php artisan migrate

php-fpm
