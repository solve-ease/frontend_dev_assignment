import { NextRequest, NextResponse } from 'next/server'
import workersData from '../../../../workers.json'
import { WorkerType } from '@/types/workers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const service = searchParams.get('service')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'name'

    // Filter workers
    let filteredWorkers: WorkerType[] = workersData
      .filter((worker: WorkerType) => worker.pricePerDay > 0)
      .filter((worker: WorkerType) => worker.id !== null)

    // Apply service filter
    if (service && service !== 'all') {
      filteredWorkers = filteredWorkers.filter(
        (worker: WorkerType) => worker.service.toLowerCase().includes(service.toLowerCase())
      )
    }

    // Apply price range filter
    if (minPrice) {
      filteredWorkers = filteredWorkers.filter(
        (worker: WorkerType) => worker.pricePerDay >= parseInt(minPrice)
      )
    }

    if (maxPrice) {
      filteredWorkers = filteredWorkers.filter(
        (worker: WorkerType) => worker.pricePerDay <= parseInt(maxPrice)
      )
    }

    // Sort workers
    filteredWorkers.sort((a: WorkerType, b: WorkerType) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerDay - b.pricePerDay
        case 'price-high':
          return b.pricePerDay - a.pricePerDay
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    // Calculate pagination
    const totalWorkers = filteredWorkers.length
    const totalPages = Math.ceil(totalWorkers / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex)

    // Get unique services for filter options
    const services = [...new Set(workersData.map((worker: WorkerType) => worker.service))]
    const priceRange = {
      min: Math.min(...workersData.map((worker: WorkerType) => worker.pricePerDay)),
      max: Math.max(...workersData.map((worker: WorkerType) => worker.pricePerDay))
    }

    return NextResponse.json({
      success: true,
      data: {
        workers: paginatedWorkers,
        pagination: {
          currentPage: page,
          totalPages,
          totalWorkers,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          limit
        },
        filters: {
          services,
          priceRange
        }
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch workers data',
        data: null 
      },
      { status: 500 }
    )
  }
}

