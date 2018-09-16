#!/bin/sh

# Wait till npm has run
while [ ! -f /app/public/js/app.js ]; do
  sleep 5
done

# Wait till PHP FPM is running
until nc -z hush-php 9000; do
  sleep 5
done

nginx -g 'daemon off;'
