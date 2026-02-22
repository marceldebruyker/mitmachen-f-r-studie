import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_3ZUTLLz0.mjs';
export { renderers } from '../renderers.mjs';

const $$Interview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Interview Portal | Marktforschung Kinderb\xFCcher", "description": "Sicherer Zugang zur Befragung w\xE4hrend des Interviews" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex-grow flex items-center justify-center bg-brand-blush/30 py-12 px-6">  <div id="gatekeeper" class="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-brand-sand/30 text-center transition-all"> <h2 class="font-heading font-extrabold text-3xl text-brand-navy mb-4">
Willkommen!
</h2> <p class="text-brand-navy/70 mb-8">
Bitte gib den Zugangscode ein, den ich dir gerade im Google Meet
                Call genannt habe.
</p> <form id="login-form" class="space-y-4"> <input type="text" id="pin-input" placeholder="Zugangscode (z.B. BUCH26)" required class="w-full text-center text-xl tracking-widest px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-coral focus:ring-0 outline-none uppercase transition-all"> <p id="error-msg" class="text-red-500 text-sm hidden">
Falscher Code. Bitte nochmal probieren.
</p> <button type="submit" class="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-4 rounded-xl shadow-md transition-all">
Befragung starten
</button> </form> </div>  <div id="survey-container" class="max-w-4xl w-full hidden"> <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-sand/30"> <div class="mb-8 border-b border-gray-100 pb-4 flex justify-between items-end"> <div> <h2 class="font-heading font-extrabold text-2xl md:text-3xl text-brand-navy">
Interview Befragung
</h2> <p class="text-brand-navy/60">
Bitte fülle dies nun gemeinsam mit mir aus.
</p> </div> <span class="text-sm font-bold text-brand-coral bg-brand-coral/10 px-3 py-1 rounded-full">Phase 1</span> </div>  <div class="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400"> <p>
[Hier wird die eigentliche Befragung via Tally.so iframe
                        eingebettet]
</p> </div> </div> </div> </div> ${renderScript($$result2, "/Users/marcel.debruyker/interviewer/src/pages/interview.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/marcel.debruyker/interviewer/src/pages/interview.astro", void 0);

const $$file = "/Users/marcel.debruyker/interviewer/src/pages/interview.astro";
const $$url = "/interview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Interview,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
