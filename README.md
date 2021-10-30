# h3-worker (WIP - not fit for production)
Use [h3](https://github.com/unjs/h3) in a ([Cloudflare](https://developers.cloudflare.com/workers/)) worker!

This little package uses some helpers from [h3](https://github.com/unjs/h3) and [unenv](https://github.com/unjs/unenv) to make h3 apps work in a Cloudflare worker environment.

## Install

```bash
# Using npm
npm install h3-worker

# Using yarn
yarn add h3-worker
```

## Usage

- Set up your Cloudflare worker project - I recommend [worker-typescript-template](https://github.com/cloudflare/worker-typescript-template)
- Check out the [h3](https://github.com/unjs/h3) docs
- Write some routes and use the `handleEvent` method from `h3-worker` to `respondWith`

** Note that you need to put the most specific routes first

```ts
import { createApp, handleEvent } from 'h3-worker'

const app = createApp()

app.use('/', () => 'Hello world')
app.use('/json', () => ({ hello: 'JSON' }))

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event, app, { basePath: '', sortStack: true }))
})
```

## TaDa!
