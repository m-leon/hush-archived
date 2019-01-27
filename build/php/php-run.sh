#!/bin/sh
cd /app

# Correct permissions on Laravel's cache directories and database
chown -R www-data:www-data /app/storage
chown -R www-data:www-data /app/bootstrap/cache
chown www-data:www-data ${DB_DATABASE}

DOCKER_HOST=$(/sbin/ip route|awk '/default/ { print $3 }')
cat >/usr/local/etc/php-fpm.d/env.conf <<EOL
env[DOCKER_HOST] = ${DOCKER_HOST}
EOL

php-fpm
