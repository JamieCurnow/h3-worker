import { Stack } from 'h3'
import { IncomingMessage } from 'unenv/runtime/node/http/request'
import { ServerResponse } from 'unenv/runtime/node/http/response'
import { sortStack } from './sortStack'

export interface WorkerWrapperOptions {
  /** The base path for the app - defaults to '/' */
  basePath?: string
  /** Sort the h3 route stack by length to avoid ordering issues */
  sortStack?: boolean
}

export interface WorkerApp {
  (req: IncomingMessage, res: ServerResponse): Promise<any>
  stack: Stack
  _handle: WorkerPHandle
  use: WorkerAppUse
}

export type WorerMiddleware = (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => any) => any

export interface WorkerInputLayer {
  route?: string
  match?: WorkerMatcher
  handle: WorkerHandle | WorkerLazyHandle
  lazy?: boolean
  promisify?: boolean
}

export declare type WorkerLazyHandle = () => WorkerHandle | Promise<WorkerHandle>

export declare type WorkerMatcher = (url: string, req?: IncomingMessage) => boolean


export interface WorkerAppUse {
  (route: string | string[], handle: WorerMiddleware | WorerMiddleware[], options?: Partial<WorkerInputLayer>): WorkerApp
  (route: string | string[], handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (handle: WorerMiddleware | WorerMiddleware[], options?: Partial<WorkerInputLayer>): WorkerApp
  (handle: WorkerHandle | WorkerHandle[], options?: Partial<WorkerInputLayer>): WorkerApp
  (options: WorkerInputLayer): WorkerApp
}

export type WorkerHandle<T = any> = (req: IncomingMessage, res: ServerResponse) => T
export type WorkerPHandle = WorkerHandle<Promise<any>>

export { handleEvent } from './handleEvent'
export { createApp } from './createApp'
export { sortStack } from './sortStack'