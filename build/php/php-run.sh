#!/bin/sh
cd /app

# Wait till DB is started
until php artisan check:db; do
  echo "Waiting for database connection to start"
  sleep 5
done

php artisan migrate

php-fpm
