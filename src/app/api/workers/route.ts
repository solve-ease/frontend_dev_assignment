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
    const search = searchParams.get('search')

    let filteredWorkers = workersData.filter((worker: WorkerType) => 
      worker.pricePerDay > 0 && worker.id !== null
    )

    // Apply filters
    if (service && service !== 'all') {
      filteredWorkers = filteredWorkers.filter((worker: WorkerType) => 
        worker.service.toLowerCase() === service.toLowerCase()
      )
    }

    if (minPrice) {
      filteredWorkers = filteredWorkers.filter((worker: WorkerType) => 
        worker.pricePerDay >= parseInt(minPrice)
      )
    }

    if (maxPrice) {
      filteredWorkers = filteredWorkers.filter((worker: WorkerType) => 
        worker.pricePerDay <= parseInt(maxPrice)
      )
    }

    if (search) {
      filteredWorkers = filteredWorkers.filter((worker: WorkerType) => 
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.service.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by name
    filteredWorkers.sort((a: WorkerType, b: WorkerType) => a.name.localeCompare(b.name))

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredWorkers.length / limit)

    return NextResponse.json({
      success: true,
      data: paginatedWorkers,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredWorkers.length,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data'
    }, { status: 500 })
  }
}

