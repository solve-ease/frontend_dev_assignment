import { NextResponse } from 'next/server';
import workersData from '../../../../workers.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: workersData,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 });
  }
}
