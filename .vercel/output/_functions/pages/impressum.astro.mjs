import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_3ZUTLLz0.mjs';
export { renderers } from '../renderers.mjs';

const $$Impressum = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Impressum | Marktforschung Kinderb\xFCcher", "description": "Impressumshinweise" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-24 bg-white min-h-[70vh]"> <div class="container mx-auto px-6 max-w-3xl"> <h1 class="font-heading font-extrabold text-4xl text-brand-navy mb-8">
Impressum
</h1> <div class="prose prose-brand max-w-none text-brand-navy/80 space-y-6"> <h2 class="text-2xl font-bold font-heading text-brand-navy mt-8 mb-4">
Angaben gemäß § 5 TMG
</h2> <p> <strong>Marcel Debruyker</strong><br>
[Musterstraße 1]<br>
[12345 Musterstadt]<br> </p> <h2 class="text-2xl font-bold font-heading text-brand-navy mt-8 mb-4">
Kontakt
</h2> <p>
Telefon: [Deine Telefonnummer]<br>
E-Mail: [Deine E-Mail]<br> </p> <h2 class="text-2xl font-bold font-heading text-brand-navy mt-8 mb-4">
Umsatzsteuer-ID
</h2> <p>
Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                    Umsatzsteuergesetz:<br>
[DE XXX XXX XXX]
</p> <div class="mt-12 p-6 bg-brand-blush/50 rounded-xl border border-brand-sand/30"> <p class="text-sm"> <em>Hinweis: Bitte fülle die Platzhalter [in Klammern]
                            mit deinen echten Firmendaten aus.</em> </p> </div> </div> </div> </div> ` })}`;
}, "/Users/marcel.debruyker/interviewer/src/pages/impressum.astro", void 0);

const $$file = "/Users/marcel.debruyker/interviewer/src/pages/impressum.astro";
const $$url = "/impressum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Impressum,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
