import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // adjust path if your workers.json lives somewhere else
    const filePath = path.join(process.cwd(), 'data', 'workers.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    // optionally: support query params for paging/filters here
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('API /api/wprkers error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to load workers' }, { status: 500 });
  }
}

