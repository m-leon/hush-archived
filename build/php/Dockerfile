FROM php:7.3.1-fpm-alpine3.8

COPY php-run.sh /usr/local/bin/php-run.sh

RUN docker-php-ext-install pdo_mysql mbstring && \
    chmod +x /usr/local/bin/php-run.sh && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

CMD ["/usr/local/bin/php-run.sh"]
