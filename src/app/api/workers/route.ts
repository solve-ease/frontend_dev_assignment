import { NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: workersData
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data'
    }, { status: 500 })
  }
}
