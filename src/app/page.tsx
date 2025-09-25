"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import WorkerCardSkeleton from "./WorkerCardSkeleton";
import Pagination from "./Pagination";
import Filters from "./Filters";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);
  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import("../../workers.json");
        setWorkersData(response.default);
      } catch (error) {
        console.error("Failed to load workers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Get all unique services
  const allServices = useMemo(() => {
    return Array.from(new Set(workersData.map((w) => w.service))).sort();
  }, [workersData]);

  // Get min/max price
  const minPrice = useMemo(() => {
    return workersData.length
      ? Math.min(...workersData.map((w) => w.pricePerDay))
      : 0;
  }, [workersData]);
  const maxPrice = useMemo(() => {
    return workersData.length
      ? Math.max(...workersData.map((w) => w.pricePerDay))
      : 0;
  }, [workersData]);

  // Set initial price range when data loads
  useEffect(() => {
    if (workersData.length) {
      setSelectedMin(minPrice);
      setSelectedMax(maxPrice);
    }
  }, [minPrice, maxPrice, workersData.length]);

  // Memoize filtered and sorted workers
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      .filter((worker) =>
        selectedService ? worker.service === selectedService : true
      )
      .filter(
        (worker) =>
          worker.pricePerDay >= selectedMin && worker.pricePerDay <= selectedMax
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workersData, selectedService, selectedMin, selectedMax]);

  // Pagination logic
  const totalPages = Math.ceil(filteredWorkers.length / CARDS_PER_PAGE);
  const paginatedWorkers = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredWorkers.slice(start, start + CARDS_PER_PAGE);
  }, [filteredWorkers, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedService, selectedMin, selectedMax]);

  return (
    <main className="container mx-auto px-2 sm:px-4 py-8 bg-[#f6eded] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Workers</h1>

      {/* Filters */}
      <Filters
        services={allServices}
        selectedService={selectedService}
        onServiceChange={setSelectedService}
        minPrice={minPrice}
        maxPrice={maxPrice}
        selectedMin={selectedMin}
        selectedMax={selectedMax}
        onPriceChange={(min, max) => {
          setSelectedMin(min);
          setSelectedMax(max);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: CARDS_PER_PAGE }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))
          : paginatedWorkers.map((worker: WorkerType) => (
              <div
                key={worker.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-400 group flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-200 rounded-t-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {worker.name}
                    </h2>
                    <p className="text-blue-600 font-medium text-sm mb-2">
                      {worker.service}
                    </p>
                  </div>
                  <p className="mt-2 font-bold text-gray-800 text-base">
                    ₹{Math.round(worker.pricePerDay * 1.18)}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      / day
                    </span>
                  </p>
                </div>
              </div>
            ))}
      </div>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}
