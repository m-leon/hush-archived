#!/bin/sh
cd /app

export COMPOSER_ALLOW_SUPERUSER=1
composer install

# Correct permissions on Laravel's cache directories and database
chown -R www-data:www-data /app/storage
chown -R www-data:www-data /app/bootstrap/cache
chown www-data:www-data /tmp/hush.sqlite

DOCKER_HOST=$(/sbin/ip route|awk '/default/ { print $3 }')
cat >/usr/local/etc/php-fpm.d/env.conf <<EOL
env[DOCKER_HOST] = ${DOCKER_HOST}
EOL
php artisan migrate

php-fpm
