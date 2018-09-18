# Hush
A simple web app built with Laravel and React similar to pastebin. The frontend has built in encryption and decryption functions to prevent the server from sniffing any of the text posted on the site.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) so they are never sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### How to run

For a development environment:
```
git clone https://github.com/m-leon/hush.git
cd hush/src
composer install
yarn install
yarn dev
cp .env.template .env
php artisan key:generate
cd ..
cp .env.ex .env
# Edit docker-compose to use a user that has write permissions on Laravel's cache directories
# If that's the current user, you can use:
sed -i -e '/user:/ s/: .*/: '"$(id -u)"':'"$(id -g)"'/' ./docker-compose.yml
docker-compose up
```

### Audit
This app has only been audited by me. If you are willing and able to audit please contact me at max@maxleon.net

### License
[MIT](https://opensource.org/licenses/MIT)
