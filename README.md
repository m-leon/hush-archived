# Hush

A simple web app built with Node and React similar to [pastebin](https://pastebin.com/). The frontend has built in encryption functionality to prevent sniffing from unauthorized users, including the server.

Secret keys are stored in the [fragment identifier](https://tools.ietf.org/html/rfc1808#section-2.4.1) which are not sent to the server. This also allows for URLs to be able to sent to other users through known safe channels to prevent sniffing.

### Hosting (Development)

For a production environment read [README.production.md](README.production.md)

Requirements:

- Git
- npm (or Yarn)

```
git clone https://github.com/m-leon/hush.git
npm run setup
npm run start
```

### Roadmap

- [x] Replace Laravel backend with Express
- [ ] Replace REST-style API with GraphQL
- [ ] Improve frontend with Material-UI
- [ ] Replace crypto-js with node-forge

### Audit

This app has only been audited by me. If you are willing and able to audit please contact me at max@maxleon.net

### License

[MIT](https://opensource.org/licenses/MIT)
