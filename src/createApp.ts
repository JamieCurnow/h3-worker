import { AppOptions, createApp as _createApp, Stack } from 'h3'
import { IncomingMessage } from 'unenv/runtime/node/http/request'
import { ServerResponse } from 'unenv/runtime/node/http/response'

interface WorkerApp {
  (req: IncomingMessage, res: ServerResponse): Promise<any>
  stack: Stack
  _handle: WorkerPHandle
  use: WorkerAppUse
}

type WorerMiddleware = (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => any) => any

interface WorkerInputLayer {
  route?: string
  match?: WorkerMatcher
  handle: WorkerHandle | WorkerLazyHandle
  lazy?: boolean
  promisify?: boolean
}

declare type WorkerLazyHandle = () => WorkerHandle | Promise<WorkerHandle>

declare type WorkerMatcher = (url: string, req?: IncomingMessage) => boolean


interface WorkerAppUse {
  (route: string | string[], handle: WorerMiddleware | WorerMiddleware[], options?: Partial<WorkerInputLayer>): WorkerApp
  (route: string | string[], handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (handle: WorerMiddleware | WorerMiddleware[], options?: Partial<WorkerInputLayer>): WorkerApp
  (handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (options: WorkerInputLayer): WorkerApp
}

type WorkerHandle<T = any> = (req: IncomingMessage, res: ServerResponse) => T
type WorkerPHandle = WorkerHandle<Promise<any>>

/** Create the H3 app with types specifically for Cloudflare Worker environments */
export const createApp = (options?: AppOptions) => {
  return _createApp(options) as unknown as WorkerApp
}