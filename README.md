# Hush
A simple web app built with Laravel and React similar to pastebin. The frontend has built in encryption and decryption functions to prevent the server from sniffing any of the text posted on the site.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) so they are never sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### How to run

For a development environment:
```
git clone https://github.com/m-leon/hush.git
cd hush/src
# With yarn installed
#yarn install
#yarn dev
# Without yarn installed
#docker run --rm -it -v $(pwd):/app -w /app node:slim yarn install
#docker run --rm -it -v $(pwd):/app -w /app node:slim yarn dev
cp .env.template .env
# Generate APP_KEY without artisan. Necessary without php & composer
#KEY=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)
#sed -i "s%^\(APP_KEY=\).*$%\1base64:$KEY%" ./.env
cd ..
cp .env.ex .env
docker-compose up
```

For a production environment read README.production.md

### Audit
This app has only been audited by me. If you are willing and able to audit please contact me at max@maxleon.net

### License
[MIT](https://opensource.org/licenses/MIT)
