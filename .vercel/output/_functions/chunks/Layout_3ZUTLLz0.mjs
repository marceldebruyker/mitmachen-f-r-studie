import { e as createComponent, g as addAttribute, n as renderHead, o as renderSlot, k as renderComponent, r as renderTemplate, h as createAstro } from './astro/server_CxmVvn8Q.mjs';
import 'piccolore';
/* empty css                               */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    console.log("Cookies accepted, Pixel would start now.");
  };
  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
    console.log("Cookies declined.");
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 animate-in slide-in-from-bottom-full duration-500", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto bg-brand-navy p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 md:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-grow text-white", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-heading font-bold text-lg mb-2", children: "Wir nutzen Cookies & Pixel 🍪" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
        "Um unsere Seite zu optimieren und dir die passenden Stellenanzeigen/Aufrufe auf Instagram zeigen zu können, nutzen wir das Meta-Pixel. Bist du damit einverstanden? Weitere Infos findest du in unserer ",
        /* @__PURE__ */ jsx("a", { href: "/datenschutz", className: "underline text-brand-sand hover:text-white", children: "Datenschutzerklärung" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full md:w-auto flex-col sm:flex-row gap-3 flex-shrink-0", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDecline,
          className: "px-6 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 text-sm font-medium transition-colors",
          children: "Nur Essenzielle"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleAccept,
          className: "px-6 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coral/90 text-white text-sm font-bold shadow-lg shadow-brand-coral/20 transition-all",
          children: "Alle akzeptieren"
        }
      )
    ] })
  ] }) });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Mitmachen & 40\u20AC erhalten | Marktforschung Kinderb\xFCcher",
    description = "Wir suchen M\xFCtter f\xFCr ein kurzes, entspanntes 30-min\xFCtiges Online-Interview zum Thema Kinderb\xFCcher. Aufwandsentsch\xE4digung: 40 \u20AC."
  } = Astro2.props;
  return renderTemplate`<html lang="de" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-brand-blush text-brand-navy font-body antialiased selection:bg-brand-coral selection:text-white min-h-screen flex flex-col"> ${renderSlot($$result, $$slots["default"])} <footer class="mt-auto py-8 bg-brand-navy text-white text-sm"> <div class="container mx-auto px-6 text-center space-y-4"> <p>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Marktforschung Kinderbücher
</p> <div class="flex justify-center gap-6 text-brand-sand"> <a href="/impressum" class="hover:text-white transition-colors">Impressum</a> <a href="/datenschutz" class="hover:text-white transition-colors">Datenschutz</a> </div> </div> </footer> ${renderComponent($$result, "CookieBanner", CookieBanner, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/marcel.debruyker/interviewer/src/components/CookieBanner", "client:component-export": "default" })} </body></html>`;
}, "/Users/marcel.debruyker/interviewer/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
