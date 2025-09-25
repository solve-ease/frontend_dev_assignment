import { NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export async function GET() {
  try {
    return NextResponse.json(workersData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workers data' },
      { status: 500 }
    )
  }
}