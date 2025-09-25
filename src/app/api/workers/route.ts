import { NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export async function GET() {
  try {
    // Add small delay to simulate real API behavior
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      data: workersData,
      count: workersData.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data'
    }, { status: 500 })
  }
}

