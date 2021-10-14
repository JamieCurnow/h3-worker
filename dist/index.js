"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEvent = void 0;
const h3_1 = require("h3");
const index_1 = require("unenv/runtime/fetch/index");
const handleEvent = async (event, app, opts) => {
    const handle = (0, h3_1.useBase)(opts?.basePath || '/', app);
    const localCall = (0, index_1.createCall)(handle);
    const url = new URL(event.request.url);
    const clonedHeaders = {};
    event.request.headers.forEach((v, k) => clonedHeaders[k] = v);
    const r = await localCall({
        event,
        url: url.toString(),
        host: url.hostname,
        protocol: url.protocol,
        headers: clonedHeaders,
        method: event.request.method,
        redirect: event.request.redirect,
        body: event.request.body
    });
    return new Response(r.body, {
        headers: r.headers,
        status: r.status,
        statusText: r.statusText
    });
};
exports.handleEvent = handleEvent;
//# sourceMappingURL=index.js.map