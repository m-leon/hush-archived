FROM alpine:3.8 as builder

RUN apk add yarn composer

COPY build-run.sh /usr/local/bin/build-run.sh

RUN apk update && \
    apk add composer \
            php7-bcmath \
            php7-ctype \
            php7-dom \
            php7-json \
            php7-mbstring \
            php7-openssl \
            php7-pdo_sqlite \
            php7-tokenizer \
            php7-xml \
            php7-xmlwriter \
            yarn && \
    chmod +x /usr/local/bin/build-run.sh

WORKDIR /app

CMD ["/usr/local/bin/build-run.sh"]
