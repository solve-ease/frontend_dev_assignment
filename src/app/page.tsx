"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import WorkerCardSkeleton from "./WorkerCardSkeleton";
import Pagination from "./Pagination";
import Filters from "./Filters";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);
  const CARDS_PER_PAGE = 12;
  // Basic cache to prevent redundant API calls
  const cacheRef = useRef<WorkerType[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      // --- Old logic (commented as per instructions) ---
      // try {
      //   const response = await import("../../workers.json");
      //   setWorkersData(response.default);
      // } catch (error) {
      //   console.error("Failed to load workers:", error);
      // } finally {
      //   setLoading(false);
      // }
      // --- End old logic ---
      try {
        if (cacheRef.current) {
          setWorkersData(cacheRef.current);
        } else {
          const res = await fetch("/api/workers");
          if (!res.ok) throw new Error("API error");
          const json = await res.json();
          if (!json.success || !Array.isArray(json.data))
            throw new Error("Invalid data");
          setWorkersData(json.data);
          cacheRef.current = json.data;
        }
      } catch (err: any) {
        setError("Failed to load workers. Please try again later.");
        setWorkersData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Get all unique services here
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
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 pb-16">
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <h1 className="text-4xl font-extrabold mb-7 text-center tracking-tight bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(59,130,246,0.25)] animate-pulse" style={{ WebkitTextStroke: '1px rgba(59,130,246,0.10)' }}>
          Our Workers
        </h1>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white/90 shadow flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2 backdrop-blur-sm">
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
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-8 lg:gap-10">
          {loading ? (
            Array.from({ length: CARDS_PER_PAGE }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-600 font-semibold py-8">
              {error}
            </div>
          ) : (
            paginatedWorkers.map((worker: WorkerType, idx: number) => {
              const isPriority = idx === 0;
              // Service badge color
              const serviceColors: Record<string, string> = {
                Welder: "bg-blue-100 text-blue-700",
                Painter: "bg-pink-100 text-pink-700",
                Plumber: "bg-green-100 text-green-700",
                Roofer: "bg-yellow-100 text-yellow-700",
                Driver: "bg-purple-100 text-purple-700",
                Gardener: "bg-emerald-100 text-emerald-700",
              };
              const badgeColor =
                serviceColors[worker.service] || "bg-gray-100 text-gray-700";
              return (
                <div
                  key={worker.id}
                  className="relative bg-gradient-to-br from-white via-blue-50 to-pink-50 border border-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.045] hover:border-blue-400 group flex flex-col cursor-pointer ring-1 ring-transparent hover:ring-blue-200"
                  style={{ minHeight: 340 }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:opacity-90 transition-opacity duration-200 rounded-t-3xl"
                      {...(isPriority
                        ? { priority: true }
                        : { loading: "lazy" })}
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${badgeColor} border border-white/70`}
                    >
                      {worker.service}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h2 className="text-xl font-bold text-gray-900 truncate">
                        {worker.name}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        ₹{Math.round(worker.pricePerDay * 1.18)} / day
                      </span>
                    </div>
                  </div>
                  <div className="w-full px-4 pb-3 pt-1 flex items-center justify-end">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-white font-semibold text-sm shadow hover:brightness-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      View Profile
                    </button>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-11/12 h-2 bg-gradient-to-r from-blue-200/60 via-pink-200/60 to-yellow-200/60 rounded-b-2xl blur-sm opacity-70 pointer-events-none" />
                </div>
              );
            })
          )}
        </div>

        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
