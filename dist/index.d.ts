import { App } from 'h3';
export interface WorkerWrapperOptions {
    basePath?: string;
}
export declare const handleEvent: (event: FetchEvent, app: App, opts?: WorkerWrapperOptions | undefined) => Promise<Response>;
