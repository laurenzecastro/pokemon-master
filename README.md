# pokemon-master

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deploying on Heroku

Follow the steps found in https://nuxtjs.org/faq/heroku-deployment/

Create a _Procfile_ (no extension)

```
web: nuxt start
```

This will instruct run the nuxt start command and tell heroku to direct external HTTP traffic to it.

Finally, we can push the app on Heroku with:

```
git push heroku master
```

To deploy a non-master branch to Heroku use:

```
git push heroku develop:master
```
