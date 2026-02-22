import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }

        // Get env vars — check both PUBLIC_ and non-PUBLIC_ prefixed versions
        const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || '';
        const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

        // Log (to Vercel Function Logs) if env vars are missing
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("MISSING ENV VARS:", {
                hasUrl: !!supabaseUrl,
                hasKey: !!supabaseAnonKey,
                // Log all available env var keys for debugging (values are NOT logged)
                envKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPA')),
            });
            return new Response(
                JSON.stringify({ error: "Database configuration missing. Please check Vercel environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)." }),
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Insert into Supabase
        const { data, error } = await supabase
            .from('screener_responses')
            .insert([
                {
                    email: body.email,
                    activities: body.activities,
                    book_series: body.book_series,
                    ages: body.ages,
                    genders: body.genders,
                    has_tech: body.has_tech,
                    created_at: body.created_at || new Date().toISOString()
                }
            ]);

        if (error) {
            console.error("Supabase insert error:", JSON.stringify(error));
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        console.error("API error:", e);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
