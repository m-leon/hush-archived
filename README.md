# Hush
A simple web app built with Laravel and React similar to pastebin. The frontend has built in encryption and decryption functions to prevent the server from sniffing any of the text posted on the site.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) so they are never sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### Live demo
Online at https://hush.maxleon.net/. This host is for demonstration purposes only. Data is subject to being removed.

### Hosting (Development)

Requirements:
* Git
* Yarn (or npm)
* PHP
* Composer
* PHP Extensions: BCMath, JSON, MBString, PDO SQLite 3, XML
```
git clone https://github.com/m-leon/hush.git
cd hush/src
composer install
yarn install
yarn dev
cp .env.ex .env
touch /tmp/hush.sqlite # If you want to change it, change in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

For a production environment read README.production.md

### Audit
This app has only been audited by me. If you are willing and able to audit please contact me at max@maxleon.net

### License
[MIT](https://opensource.org/licenses/MIT)
