import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_CxmVvn8Q.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C_P77yym.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/marcel.debruyker/interviewer/","cacheDir":"file:///Users/marcel.debruyker/interviewer/node_modules/.astro/","outDir":"file:///Users/marcel.debruyker/interviewer/dist/","srcDir":"file:///Users/marcel.debruyker/interviewer/src/","publicDir":"file:///Users/marcel.debruyker/interviewer/public/","buildClientDir":"file:///Users/marcel.debruyker/interviewer/dist/client/","buildServerDir":"file:///Users/marcel.debruyker/interviewer/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-screener","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-screener\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-screener","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-screener.ts","pathname":"/api/submit-screener","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/datenschutz.CDCgw-Rz.css"}],"routeData":{"route":"/datenschutz","isIndex":false,"type":"page","pattern":"^\\/datenschutz\\/?$","segments":[[{"content":"datenschutz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/datenschutz.astro","pathname":"/datenschutz","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/datenschutz.CDCgw-Rz.css"}],"routeData":{"route":"/impressum","isIndex":false,"type":"page","pattern":"^\\/impressum\\/?$","segments":[[{"content":"impressum","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/impressum.astro","pathname":"/impressum","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/datenschutz.CDCgw-Rz.css"}],"routeData":{"route":"/interview","isIndex":false,"type":"page","pattern":"^\\/interview\\/?$","segments":[[{"content":"interview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/interview.astro","pathname":"/interview","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/datenschutz.CDCgw-Rz.css"},{"type":"inline","content":"@keyframes fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in-up[data-astro-cid-bbe6dxrz]{animation:fadeInUp .8s cubic-bezier(.16,1,.3,1) forwards}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/marcel.debruyker/interviewer/src/pages/datenschutz.astro",{"propagation":"none","containsHead":true}],["/Users/marcel.debruyker/interviewer/src/pages/impressum.astro",{"propagation":"none","containsHead":true}],["/Users/marcel.debruyker/interviewer/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/marcel.debruyker/interviewer/src/pages/interview.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/submit-screener@_@ts":"pages/api/submit-screener.astro.mjs","\u0000@astro-page:src/pages/datenschutz@_@astro":"pages/datenschutz.astro.mjs","\u0000@astro-page:src/pages/impressum@_@astro":"pages/impressum.astro.mjs","\u0000@astro-page:src/pages/interview@_@astro":"pages/interview.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Hx5p6OQI.mjs","/Users/marcel.debruyker/interviewer/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CNAkw6d8.mjs","/Users/marcel.debruyker/interviewer/src/components/ScreenerForm":"_astro/ScreenerForm.D4_Q_Ily.js","/Users/marcel.debruyker/interviewer/src/components/CookieBanner":"_astro/CookieBanner.Bx_2Gako.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","/Users/marcel.debruyker/interviewer/src/pages/interview.astro?astro&type=script&index=0&lang.ts":"_astro/interview.astro_astro_type_script_index_0_lang.AIREhXiX.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/marcel.debruyker/interviewer/src/pages/interview.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"login-form\"),e=document.getElementById(\"pin-input\"),d=document.getElementById(\"error-msg\"),r=document.getElementById(\"gatekeeper\"),t=document.getElementById(\"survey-container\"),o=\"BUCH26\";s?.addEventListener(\"submit\",n=>{n.preventDefault(),e?.value.toUpperCase().trim()===o?(r?.classList.add(\"hidden\"),t?.classList.remove(\"hidden\"),t?.classList.add(\"animate-in\",\"fade-in\",\"zoom-in-95\",\"duration-500\")):(d?.classList.remove(\"hidden\"),e?.classList.add(\"border-red-500\",\"bg-red-50\"),setTimeout(()=>{e?.classList.remove(\"border-red-500\",\"bg-red-50\")},1e3))});"]],"assets":["/_astro/outfit-latin-400-normal.BGsTXAXT.woff2","/_astro/inter-cyrillic-ext-500-normal.B0yAr1jD.woff2","/_astro/outfit-latin-ext-400-normal.5tcqmc2S.woff2","/_astro/outfit-latin-ext-700-normal.CI4iH74K.woff2","/_astro/inter-cyrillic-500-normal.BasfLYem.woff2","/_astro/inter-greek-500-normal.BIZE56-Y.woff2","/_astro/inter-greek-ext-500-normal.C4iEst2y.woff2","/_astro/outfit-latin-700-normal.Cu9v6i1X.woff2","/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-vietnamese-500-normal.DOriooB6.woff2","/_astro/inter-latin-ext-500-normal.CV4jyFjo.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-cyrillic-ext-500-normal.BmqWE9Dz.woff","/_astro/outfit-latin-400-normal.DMwTpYkH.woff","/_astro/outfit-latin-ext-400-normal.DHm7mdGe.woff","/_astro/outfit-latin-ext-700-normal.fjS8-Gm7.woff","/_astro/inter-greek-500-normal.Xzm54t5V.woff","/_astro/inter-greek-ext-500-normal.2j5mBUwD.woff","/_astro/outfit-latin-700-normal.D4itBLBr.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-cyrillic-500-normal.CxZf_p3X.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-vietnamese-500-normal.mJboJaSs.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-latin-ext-500-normal.BxGbmqWO.woff","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/datenschutz.CDCgw-Rz.css","/favicon.ico","/favicon.svg","/muttertochter.png","/_astro/CookieBanner.Bx_2Gako.js","/_astro/ScreenerForm.D4_Q_Ily.js","/_astro/client.Dc9Vh3na.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"qW9CneiLOyAWfPVco//joYrBTS/9Ske6YKjTLj92UOw="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
