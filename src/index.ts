import { App, useBase } from 'h3'
import { createCall } from 'unenv/runtime/fetch/index'
import type { Handle } from 'unenv/runtime/fetch/call'
import { requestHasBody, useRequestBody } from './utils/body'

export interface WorkerWrapperOptions {
  // The base path for the app - defaults to '/'
  basePath?: string
}

export const handleEvent = async (event: FetchEvent, app: App, opts?: WorkerWrapperOptions): Promise<Response> => {
  const handle = useBase(opts?.basePath || '', app) as unknown as Handle
  const localCall = createCall(handle)
  const url = new URL(event.request.url)

  let body
  if (requestHasBody(event.request)) {
    body = await useRequestBody(event.request)
  }

  const r = await localCall({
    event,
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    // @ts-ignore
    headers: event.request.headers,
    method: event.request.method,
    redirect: event.request.redirect,
    body
  })

  return new Response(r.body, {
    // @ts-ignore
    headers: r.headers,
    status: r.status,
    statusText: r.statusText
  })
}