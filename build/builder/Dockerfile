FROM alpine:3.8 as builder

RUN apk add yarn composer

COPY build-run.sh /usr/local/bin/build-run.sh

RUN apk update && \
    apk add composer \
            php7-pdo_sqlite \
            yarn && \
    chmod +x /usr/local/bin/build-run.sh

WORKDIR /app

CMD ["/usr/local/bin/build-run.sh"]
