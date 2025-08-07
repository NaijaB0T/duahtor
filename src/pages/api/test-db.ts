import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get D1 database from runtime
    const db = (request as any).cf?.env?.DB;
    if (!db) {
      return new Response(JSON.stringify({ 
        error: 'Database not available',
        success: false 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Test database connection by querying the table structure
    const tableInfo = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='waitlist'").first();
    
    if (!tableInfo) {
      return new Response(JSON.stringify({ 
        error: 'Waitlist table not found',
        success: false 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Count total waitlist entries
    const count = await db.prepare("SELECT COUNT(*) as total FROM waitlist").first();
    
    // Get recent entries (last 5)
    const recent = await db.prepare("SELECT full_name, role, county, created_at FROM waitlist ORDER BY created_at DESC LIMIT 5").all();

    return new Response(JSON.stringify({
      success: true,
      message: 'Database connection successful',
      data: {
        totalEntries: count?.total || 0,
        recentEntries: recent.results || [],
        tableExists: true
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Database test error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown database error',
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};