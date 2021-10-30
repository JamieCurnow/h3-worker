import { AppOptions, createApp as _createApp, Stack } from 'h3'
import { IncomingMessage as _IncomingMessage } from 'unenv/runtime/node/http/request'
import { WorkerApp } from '.'

/** Create the H3 app with types specifically for Cloudflare Worker environments */
export const createApp = (options?: AppOptions) => {
  return _createApp(options) as unknown as WorkerApp
}
