#!/bin/sh
cd /app

php artisan migrate

php-fpm
