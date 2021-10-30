# h3-worker
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

```ts
import { createApp, handleEvent } from 'h3-worker'

// Create the app
const app = createApp()

// Add some routes (no need to worry about order)
app.use('/', () => 'Hello world')
app.use('/json', () => ({ hello: 'JSON' }))

// Type the body if you like
app.use<{ firstName: string }>('/first-name', (req) => {
  const { body } = req
  return `Hi ${body.firstName}`
})

// Add the event listener
addEventListener('fetch', (event) => {
  // Respond with a handleEvent() call, passing in the event and your app. Options are optional
  event.respondWith(handleEvent(event, app, { basePath: '', sortStack: true }))
})
```

## TaDa!
