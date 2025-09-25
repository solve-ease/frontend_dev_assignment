import { NextRequest, NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export async function GET(request: NextRequest) {
  try {
    // Add small delay to simulate real API behavior
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const service = searchParams.get('service') || ''
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999')

    // Filter workers based on query parameters
    let filteredWorkers = workersData.filter(worker => {
      const matchesService = !service || worker.service === service
      const matchesPrice = worker.pricePerDay >= minPrice && worker.pricePerDay <= maxPrice
      const isValid = worker.pricePerDay > 0 && worker.id !== null
      
      return isValid && matchesService && matchesPrice
    })

    // Sort by name
    filteredWorkers.sort((a, b) => a.name.localeCompare(b.name))

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
      },
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch workers data',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

