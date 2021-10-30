import { WorkerApp } from '.'

/**
 * Sorts the h3 route stack alphebetically and by length so you don't need to worry about the order of routes.
 * 
 * This will be called automatically when using the `handleEvent` function unless turned off in the options.
 * 
 * ```ts
 * import { createApp, sortStack } from 'h3-worker'
 * 
 * const app = createApp()
 * 
 * app.use('/hello', () => 'Hello')
 * app.use('/hello-world', () => 'Hello World')
 * 
 * sortStack(app)
 * ```
 */
export const sortStack = (app: WorkerApp) => {
  const stack = app.stack || []
  return stack.sort((a, b) => b.route.length - a.route.length)
}