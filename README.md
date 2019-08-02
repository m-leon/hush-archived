# Hush

A simple web app built with Laravel and React similar to pastebin. The frontend has built in encryption and decryption functions to prevent the server from sniffing any of the text posted on the site.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) so they are never sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### Hosting (Development)

For a production environment read [README.production.md](README.production.md)

Requirements:

- Git
- npm (or Yarn)
- PHP
- Composer
- PHP Extensions: BCMath, JSON, MBString, PDO SQLite 3, XML

```
git clone https://github.com/m-leon/hush.git
cd hush/src
composer install
npm install
npm run dev
cp .env.ex .env
touch /tmp/hush.db        # If you want to change it, change in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Audit

This app has only been audited by me. If you are willing and able to audit please contact me at max@maxleon.net

### License

[MIT](https://opensource.org/licenses/MIT)
