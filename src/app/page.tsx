"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { WorkerType } from "@/types/workers";
import WorkerCard from "./components/WorkerCard"
import Navbar from "./components/Navbar"
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import { FilterState } from "@/types/workers";
import { ApiResponse } from "@/types/workers";
import {
  Filter,
  Search,
  AlertCircle,
} from "lucide-react";


// MAIN WORKERS PAGE COMPONENT

export default function WorkersPage() {

  // LEGACY CODE (COMMENTED OUT - DON'T DELETE)

  /*
  const [workersData, setWorkersData] = useState<WorkerType[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
      }
    }
    loadData()
    loadData() // This was a duplicate call - bug fixed
  }, [])
  */

  // NEW STATE MANAGEMENT

  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    service: "",
    minPrice: 0,
    maxPrice: 1000,
    searchQuery: "",
  });

  const itemsPerPage = 12;

  // API INTEGRATION WITH CACHING

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = "workers_data";
      const cacheTimestamp = "workers_timestamp";
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimestamp);

      if (cachedData && cachedTime) {
        const isValid = Date.now() - parseInt(cachedTime) < cacheExpiry;
        if (isValid) {
          const parsedData = JSON.parse(cachedData);
          setWorkers(parsedData);
          setLoading(false);
          return;
        }
      }

      const response = await fetch("/api/workers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch workers");
      }

      const validWorkers = (result.data || []).filter(
        (worker) => worker.id !== null && worker.pricePerDay > 0
      );

      setWorkers(validWorkers);

      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(validWorkers));
      localStorage.setItem(cacheTimestamp, Date.now().toString());
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      // Fallback to cached data if available
      const cachedData = localStorage.getItem("workers_data");
      if (cachedData) {
        try {
          setWorkers(JSON.parse(cachedData));
          setError("Using cached data due to network error");
        } catch {
          // Ignore parsing errors
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // COMPUTED VALUES WITH MEMOIZATION

  const {
    filteredWorkers,
    paginatedWorkers,
    totalPages,
    uniqueServices,
    priceRange,
  } = useMemo(() => {
    // Get unique services
    const services = Array.from(
      new Set(workers.map((worker) => worker.service))
    ).sort();

    // Calculate price range
    const prices = workers.map((w) => Math.round(w.pricePerDay * 1.18));
    const range = {
      min: Math.min(...prices) || 0,
      max: Math.max(...prices) || 1000,
    };

    // Filter workers
    let filtered = workers.filter((worker) => {
      const matchesService =
        !filters.service ||
        worker.service.toLowerCase() === filters.service.toLowerCase();
      const price = Math.round(worker.pricePerDay * 1.18);
      const matchesPrice =
        price >= filters.minPrice && price <= filters.maxPrice;
      const matchesSearch =
        !filters.searchQuery ||
        worker.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        worker.service
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return matchesService && matchesPrice && matchesSearch;
    });

    // Sort by name
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredWorkers: filtered,
      paginatedWorkers: paginated,
      totalPages,
      uniqueServices: services,
      priceRange: range,
    };
  }, [workers, filters, currentPage, itemsPerPage]);

  // Update price range in filters when workers data changes
  useEffect(() => {
    if (workers.length > 0) {
      setFilters((prev) => {
        // If user has not changed defaults, set to API range
        if (prev.minPrice === 0 && prev.maxPrice === 1000) {
          return {
            ...prev,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
          };
        }
        // otherwise preserve user's values but clamp them within the new range
        return {
          ...prev,
          minPrice: Math.max(priceRange.min, prev.minPrice),
          maxPrice: Math.min(priceRange.max, prev.maxPrice),
        };
      });
    }
  }, [workers.length, priceRange.min, priceRange.max]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // EVENT HANDLERS

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ERROR STATE

  if (error && workers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Unable to load workers data
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchWorkers}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN RENDER

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Skilled Workers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our verified professionals and find the perfect
            worker for your needs
          </p>
          {error && workers.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden w-full mb-6 bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <div className="hidden lg:block">
              <Filters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                services={uniqueServices}
                priceRange={priceRange}
                isVisible={true}
                onClose={() => setShowFilters(false)}
                closeOnOutsideClick={false}
              />
            </div>

            <Filters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              services={uniqueServices}
              priceRange={priceRange}
              isVisible={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Workers Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            {!loading && (
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <p className="text-gray-600">
                  Showing {paginatedWorkers.length} of {filteredWorkers.length}{" "}
                  workers
                  {filters.service && (
                    <span className="ml-1">in {filters.service}</span>
                  )}
                </p>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}


            {/* Workers Grid */}
            {!loading && paginatedWorkers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No workers found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() =>
                    handleFiltersChange({
                      service: "",
                      minPrice: priceRange.min,
                      maxPrice: priceRange.max,
                      searchQuery: "",
                    })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}