import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let fullName: string, contact: string, role: string, county: string, country: string, tshirtSize: string;
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await request.json();
      fullName = data.fullName;
      contact = data.contact;
      role = data.role;
      county = data.county;
      country = data.country;
      tshirtSize = data.tshirtSize;
    } else {
      const formData = await request.formData();
      fullName = formData.get('fullName') as string;
      contact = formData.get('contact') as string;
      role = formData.get('role') as string;
      county = formData.get('county') as string;
      country = formData.get('country') as string;
      tshirtSize = formData.get('tshirtSize') as string;
    }

    // Validation
    if (!fullName || !contact || !role || !county) {
      return new Response(
        JSON.stringify({ error: 'Full name, contact, role, and county are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Contact validation (email or phone)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address or phone number' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try multiple ways to access the D1 database
    let DB = null;
    
    // Method 1: Through locals.runtime.env (Astro Cloudflare adapter)
    if (locals?.runtime?.env?.DB) {
      DB = locals.runtime.env.DB;
    }
    // Method 2: Direct from locals (alternative pattern)
    else if (locals?.DB) {
      DB = locals.DB;
    }
    // Method 3: From runtime context (if available)
    else if ((globalThis as any).DB) {
      DB = (globalThis as any).DB;
    }
    
    if (!DB) {
      return new Response(
        JSON.stringify({ error: 'Database service unavailable. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Insert into waitlist table
      await DB.prepare(
        'INSERT INTO waitlist (full_name, contact, role, county, country, tshirt_size) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(fullName, contact, role, county, country || null, tshirtSize || null).run();

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Successfully joined the waitlist!' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );

    } catch (dbError: any) {
      // Handle duplicate contact error
      if (dbError.message && dbError.message.includes('UNIQUE constraint failed')) {
        return new Response(
          JSON.stringify({ error: 'This contact information is already on the waitlist' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save to waitlist' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};