import { Stack } from 'h3'
import { IncomingMessage as _IncomingMessage } from 'unenv/runtime/node/http/request'
import { ServerResponse } from 'unenv/runtime/node/http/response'

export interface WorkerWrapperOptions {
  /** The base path for the app - defaults to '/' */
  basePath?: string
  /** Sort the h3 route stack by length to avoid ordering issues */
  sortStack?: boolean
}

export interface IncomingMessage<Body = any> extends _IncomingMessage {
  body: Body
}

export interface WorkerApp {
  <Body>(req: IncomingMessage<Body>, res: ServerResponse): Promise<any>
  stack: Stack
  _handle: WorkerPHandle
  use: WorkerAppUse
}

export type WorkerMiddleware<Body = any> = (req: IncomingMessage<Body>, res: ServerResponse, next: (err?: Error) => any) => any

export interface WorkerInputLayer {
  route?: string
  match?: WorkerMatcher
  handle: WorkerHandle | WorkerLazyHandle
  lazy?: boolean
  promisify?: boolean
}

export type WorkerLazyHandle = () => WorkerHandle | Promise<WorkerHandle>

export type WorkerMatcher = (url: string, req?: IncomingMessage) => boolean


export interface WorkerAppUse {
  <Body>(route: string | string[], handle: WorkerMiddleware<Body> | WorkerMiddleware<Body>[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(route: string | string[], handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(handle: WorkerMiddleware<Body> | WorkerMiddleware<Body>[], options?: Partial<WorkerInputLayer>): WorkerApp
  <Body>(handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (options: WorkerInputLayer): WorkerApp
}

export type WorkerHandle<T = any> = (req: IncomingMessage<T>, res: ServerResponse) => T
export type WorkerPHandle = WorkerHandle<Promise<any>>

export { handleEvent } from './handleEvent'
export { createApp } from './createApp'
export { sortStack } from './sortStack'