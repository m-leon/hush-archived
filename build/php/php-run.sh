#!/bin/sh
cd /app

export COMPOSER_ALLOW_SUPERUSER=1
composer install

# Correct permissions on Laravel's cache directories
chown -R www-data:www-data /app/storage
chown -R www-data:www-data /app/bootstrap/cache

# Wait till DB is started
until php artisan check:db; do
  echo "Waiting for database connection to start"
  sleep 5
done

php artisan migrate

php-fpm
