import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ locals, request }) => {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const contact = formData.get('contact') as string;
    const role = formData.get('role') as string;
    const county = formData.get('county') as string;
    const country = formData.get('country') as string;

    // Validate required fields
    if (!fullName || !contact || !role || !county) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try multiple ways to access D1 database
    const db = locals.runtime?.env?.DB || 
               (request as any).cf?.env?.DB || 
               (globalThis as any).DB;
    if (!db) {
      return new Response(JSON.stringify({ error: 'Database not available' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into D1 database
    await db.prepare(`
      INSERT INTO waitlist (full_name, contact, role, county, country, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(fullName, contact, role, county, country || null).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};