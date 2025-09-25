"use client";
import { WorkerType } from "@/types/workers";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { Search } from "lucide-react";

// Lazy load components for better performance
const WorkerCard = lazy(() => import("./components/WorkerCard"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));

// import workersData from "../../workers.json";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 12;

  // Fetch data from API as per assignment requirement
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
       
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("/api/workers");
        const result = await response.json();

        if (result.success) {
          setWorkersData(result.data);
        } else {
          setError(result.error || "Failed to fetch workers");
        }
      } catch (error) {
        console.error("Failed to load workers:", error);
        setError("Failed to load workers data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter and sort workers
  const filteredAndSortedWorkers = useMemo(() => {
    let filtered = workersData;

    // Filter by service
    if (selectedService !== "all") {
      filtered = filtered.filter(
        (worker) => worker.service === selectedService
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter((worker) => {
        const price = worker.pricePerDay;
        if (selectedPriceRange === "500+") {
          return price >= 500;
        }
        return price >= min && price <= max;
      });
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (worker) =>
          worker.name.toLowerCase().includes(searchLower) ||
          worker.service.toLowerCase().includes(searchLower)
      );
    }

    // Sort by name
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [workersData, selectedService, selectedPriceRange, searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedService, selectedPriceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedWorkers = filteredAndSortedWorkers.slice(startIndex, endIndex);

  // Get unique services for filter
  const services = useMemo(() => {
    return Array.from(
      new Set(workersData.map((worker) => worker.service))
    ).sort();
  }, [workersData]);

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Our Workers</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Workers
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner message="Loading workers..." size="lg" />
        </div>
      )}

      {!loading && (
        <>
          {/* Filters and Search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-64">
                <label htmlFor="search-workers" className="sr-only">
                  Search workers by name or service
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search-workers"
                  type="text"
                  placeholder="Search workers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-describedby="search-results-count"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Service Filter */}
                <div className="w-full sm:w-48">
                  <label htmlFor="service-filter" className="sr-only">
                    Filter by service
                  </label>
                  <select
                    id="service-filter"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Services</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div className="w-full sm:w-48">
                  <label htmlFor="price-filter" className="sr-only">
                    Filter by price range
                  </label>
                  <select
                    id="price-filter"
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-200">₹0 - ₹200/day</option>
                    <option value="200-400">₹200 - ₹400/day</option>
                    <option value="400-500">₹400 - ₹500/day</option>
                    <option value="500+">₹500+/day</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div id="search-results-count" className="text-sm text-gray-600">
              Showing {paginatedWorkers.length} of{" "}
              {filteredAndSortedWorkers.length} workers
              {selectedService !== "all" && ` in ${selectedService}`}
              {selectedPriceRange !== "all" &&
                ` (${
                  selectedPriceRange === "500+"
                    ? "₹500+"
                    : `₹${selectedPriceRange.split("-").join(" - ₹")}`
                }/day)`}
            </div>
          </div>

          {/* Workers Grid with Lazy Loading */}
          <Suspense
            fallback={
              <div className="flex justify-center py-16">
                <LoadingSpinner message="Loading workers..." size="lg" />
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {paginatedWorkers.length > 0 ? (
                paginatedWorkers.map((worker: WorkerType) => (
                  <Suspense
                    key={worker.id}
                    fallback={
                      <div className="border rounded-lg overflow-hidden shadow animate-pulse bg-white">
                        <div className="w-full h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    }
                  >
                    <WorkerCard worker={worker} />
                  </Suspense>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500 text-lg mb-2">
                    No workers found
                  </div>
                  <div className="text-gray-400 text-sm">
                    Try adjusting your search terms or filters
                  </div>
                </div>
              )}
            </div>
          </Suspense>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination navigation"
              className="flex justify-center items-center space-x-2"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                ← Prev
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
