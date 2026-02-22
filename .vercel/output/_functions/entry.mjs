import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cc0BM9Ip.mjs';
import { manifest } from './manifest_Bw8xb5v4.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/submit-screener.astro.mjs');
const _page2 = () => import('./pages/datenschutz.astro.mjs');
const _page3 = () => import('./pages/impressum.astro.mjs');
const _page4 = () => import('./pages/interview.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/submit-screener.ts", _page1],
    ["src/pages/datenschutz.astro", _page2],
    ["src/pages/impressum.astro", _page3],
    ["src/pages/interview.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a6210154-4fae-4492-af83-d8bc3defa94e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
