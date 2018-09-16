FROM php:7.2.8-fpm-alpine3.7

COPY php-run.sh /usr/local/bin/php-run.sh

RUN docker-php-ext-install pdo_mysql mbstring && \
    chmod +x /usr/local/bin/php-run.sh

CMD ["/usr/local/bin/php-run.sh"]
