import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }

        // Insert into Supabase
        // Table name is assumed to be 'screener_responses'
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
            console.error("Supabase insert error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        console.error("API error:", e);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
