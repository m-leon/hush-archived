# Hush
A simple web app built with Laravel and React similar to pastebin. The frontend has built in encryption and decryption functions to prevent the server from sniffing any of the text posted on the site.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) so they are never sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### How to run
```
git clone https://github.com/m-leon/hush.git
cd hush
# Set URL to where you want the server to listen to
echo "APP_URL=hush.test" >> .env
echo "APP_PORT=80" >> .env # Default port is 8080
# For development environment
./init.sh
# Or for production, use the --production flag
#./init.sh --production
docker-compose up -d
```

### TODO
* Use docker secrets to manage DB passwords and other sensitive information

### License
[MIT](https://opensource.org/licenses/MIT)
