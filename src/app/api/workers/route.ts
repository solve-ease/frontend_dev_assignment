import { NextRequest, NextResponse } from 'next/server'
import workersData from '../../../../workers.json'
import { WorkerType } from '@/types/workers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const services = searchParams.get('services')?.split(',').filter(Boolean) || []
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999')
    const sortBy = searchParams.get('sortBy') || 'name'

    // Filter workers
    const filteredWorkers: WorkerType[] = workersData
      .filter((worker: WorkerType) => worker.pricePerDay > 0)
      .filter((worker: WorkerType) => worker.id !== null)
      .filter((worker: WorkerType) => {
        // Service filter
        if (services.length > 0 && !services.includes(worker.service)) {
          return false
        }
        // Price filter (apply GST calculation here to match frontend)
        const priceWithGST = Math.round(worker.pricePerDay * 1.18)
        return priceWithGST >= minPrice && priceWithGST <= maxPrice
      })

    // Sort workers
    switch (sortBy) {
      case 'price-low':
        filteredWorkers.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'price-high':
        filteredWorkers.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'name':
      default:
        filteredWorkers.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex)

    // Calculate total pages
    const totalWorkers = filteredWorkers.length
    const totalPages = Math.ceil(totalWorkers / limit)

    // Get unique services for filter options
    const uniqueServices = Array.from(
      new Set(workersData.map((worker: WorkerType) => worker.service))
    ).sort()

    // Calculate price range for filters
    const allPrices = workersData
      .filter((worker: WorkerType) => worker.pricePerDay > 0)
      .map((worker: WorkerType) => Math.round(worker.pricePerDay * 1.18))
    const priceRange = {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices)
    }

    // Response with comprehensive data
    const responseData = {
      workers: paginatedWorkers,
      pagination: {
        currentPage: page,
        totalPages,
        totalWorkers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        services: uniqueServices,
        priceRange
      }
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workers data' },
      { status: 500 }
    )
  }
}

