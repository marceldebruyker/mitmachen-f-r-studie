import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = "https://placeholder.supabase.co";
const supabaseAnonKey = "placeholder";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }
    const { data, error } = await supabase.from("screener_responses").insert([
      {
        email: body.email,
        activities: body.activities,
        book_series: body.book_series,
        ages: body.ages,
        genders: body.genders,
        has_tech: body.has_tech,
        created_at: body.created_at || (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error("API error:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
