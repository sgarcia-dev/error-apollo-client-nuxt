# Apollo Client Nuxt

A basic nuxt app testing apollo client's error handling capabilities.

The purpose behind this, is to ensure that invalid GraphQL responses (such as when the server is down and it returns a HTML error page) don't crash the page render or the server.

## How to run

* `$ npm install`
* for dev mode hot-reload at `localhost:3000`:
  * `$ npm run dev`
* for prod mode: 
  * `$ npm run build`
  * `$ npm run start`
