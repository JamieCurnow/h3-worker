import { AppOptions, createApp as _createApp, Stack } from 'h3'
import { IncomingMessage as _IncomingMessage } from 'unenv/runtime/node/http/request'
import { ServerResponse } from 'unenv/runtime/node/http/response'

interface IncomingMessage<Body = any> extends _IncomingMessage {
  body: Body
}

interface WorkerApp {
  <Body>(req: IncomingMessage<Body>, res: ServerResponse): Promise<any>
  stack: Stack
  _handle: WorkerPHandle
  use: WorkerAppUse
}

type WorkerMiddleware<Body = any> = (req: IncomingMessage<Body>, res: ServerResponse, next: (err?: Error) => any) => any

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
  <Body>(route: string | string[], handle: WorkerMiddleware<Body> | WorkerMiddleware<Body>[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(route: string | string[], handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(handle: WorkerMiddleware<Body> | WorkerMiddleware<Body>[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (options: WorkerInputLayer): WorkerApp
}

type WorkerHandle<T = any> = (req: IncomingMessage<T>, res: ServerResponse) => T
type WorkerPHandle = WorkerHandle<Promise<any>>

/** Create the H3 app with types specifically for Cloudflare Worker environments */
export const createApp = (options?: AppOptions) => {
  return _createApp(options) as unknown as WorkerApp
}
