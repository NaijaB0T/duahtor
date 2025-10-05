import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let fullName: string, contact: string, amountPaid: number, paymentDate: string, 
        tshirtSize: string, paymentMethod: string, notes: string;
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await request.json();
      fullName = data.fullName;
      contact = data.contact;
      amountPaid = parseFloat(data.amountPaid);
      paymentDate = data.paymentDate;
      tshirtSize = data.tshirtSize;
      paymentMethod = data.paymentMethod;
      notes = data.notes;
    } else {
      const formData = await request.formData();
      fullName = formData.get('fullName') as string;
      contact = formData.get('contact') as string;
      amountPaid = parseFloat(formData.get('amountPaid') as string);
      paymentDate = formData.get('paymentDate') as string;
      tshirtSize = formData.get('tshirtSize') as string;
      paymentMethod = formData.get('paymentMethod') as string;
      notes = formData.get('notes') as string;
    }

    // Validation
    if (!fullName || !contact || !amountPaid || !paymentDate) {
      return new Response(
        JSON.stringify({ error: 'Full name, contact, amount paid, and payment date are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Amount validation
    if (isNaN(amountPaid) || amountPaid <= 0) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid amount paid' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Date validation
    if (!Date.parse(paymentDate)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid payment date' }),
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
      // Insert into founding_supporters table
      await DB.prepare(
        'INSERT INTO founding_supporters (full_name, contact, amount_paid, payment_date, tshirt_size, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        fullName, 
        contact, 
        amountPaid, 
        paymentDate, 
        tshirtSize || null, 
        paymentMethod || null, 
        notes || null
      ).run();

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Founding supporter data recorded successfully!' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );

    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save founding supporter data' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error processing founding supporter submission:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};