import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const mod = await import('../../../../workers.json')
    const workersData = mod.default
    return NextResponse.json(
      {
        success: true,
        data: workersData
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      }
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data'
    }, { status: 500 })
  }
}

