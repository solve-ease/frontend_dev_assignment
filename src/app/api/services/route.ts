import { NextRequest, NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

// GET /api/services
export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))

    // Extract unique services from workers data
    const services = Array.from(new Set(workersData.map(worker => worker.service)))
    
    // Get service statistics
    const serviceStats = services.map(service => {
      const workersInService = workersData.filter(worker => worker.service === service)
      const avgPrice = Math.round(
        workersInService.reduce((sum, worker) => sum + worker.pricePerDay, 0) / workersInService.length
      )
      const minPrice = Math.min(...workersInService.map(w => w.pricePerDay))
      const maxPrice = Math.max(...workersInService.map(w => w.pricePerDay))

      return {
        name: service,
        count: workersInService.length,
        averagePrice: avgPrice,
        priceRange: {
          min: minPrice,
          max: maxPrice
        }
      }
    })

    // Sort by count (most popular services first)
    serviceStats.sort((a, b) => b.count - a.count)

    const { searchParams } = new URL(request.url)
    const includeStats = searchParams.get('stats') === 'true'

    if (includeStats) {
      return NextResponse.json({
        success: true,
        data: serviceStats,
        metadata: {
          totalServices: services.length,
          totalWorkers: workersData.length
        },
        timestamp: new Date().toISOString()
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        }
      })
    } else {
      return NextResponse.json({
        success: true,
        data: services,
        metadata: {
          count: services.length
        },
        timestamp: new Date().toISOString()
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        }
      })
    }

  } catch (error) {
    console.error('API Error:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch services',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}