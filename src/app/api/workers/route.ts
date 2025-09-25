import { NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: workersDat
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data'
    }, { status: 500 })
  }
}

git config --global user.email 
"krishna.ks292002@gmail.com"
  git config --global user.name "Krishna292002"