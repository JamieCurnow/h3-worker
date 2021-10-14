import { App, useBase } from 'h3'
import { createCall } from 'unenv/runtime/fetch/index'
import { Handle } from 'unenv/runtime/fetch/call'

export interface WorkerWrapperOptions {
  // The base path for the app - defaults to '/'
  basePath?: string
}

export const handleEvent = async (event: FetchEvent, app: App, opts?: WorkerWrapperOptions): Promise<Response> => {
  const handle = useBase(opts?.basePath || '', app) as unknown as Handle
  const localCall = createCall(handle)
  const url = new URL(event.request.url)

  const clonedHeaders: { [key: string]: string | string[] } = {}
  event.request.headers.forEach((v, k) => clonedHeaders[k] = v)

  const r = await localCall({
    event,
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    headers: clonedHeaders,
    method: event.request.method,
    redirect: event.request.redirect,
    body: event.request.body
  })

  return new Response(r.body, {
    headers: r.headers as HeadersInit,
    status: r.status,
    statusText: r.statusText
  })
}