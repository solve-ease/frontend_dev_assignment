"use client";
import React, { useEffect, useState, useMemo } from "react";
import { WorkerType } from "../types/workers";
import Image from "next/image";

const PAGE_SIZE = 9;

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg h-56 w-full flex flex-col gap-2 p-4">
      <div className="bg-gray-300 h-32 w-full rounded" />
      <div className="bg-gray-300 h-4 w-1/2 rounded" />
      <div className="bg-gray-300 h-4 w-1/3 rounded" />
    </div>
  );
}

function WorkerCard({ worker }: { worker: WorkerType }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center p-4">
      <div className="w-24 h-24 relative mb-2">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover rounded-full"
          priority={worker.id <= 10}
        />
      </div>
      <h3 className="font-semibold text-lg">{worker.name}</h3>
      <p className="text-sm text-gray-500">{worker.service}</p>
      <span className="mt-2 text-blue-600 font-bold">
        ₹{worker.pricePerDay}/day
      </span>
    </div>
  );
}

export default function HomePage() {
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);

  // Filters
  const [serviceFilter, setServiceFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState<[number, number] | null>(null);

  // Fetch workers from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/workers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWorkers(data.data);
        } else {
          setError("Failed to fetch workers.");
        }
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  // Memoized filtered workers
  const filteredWorkers = useMemo(() => {
    let result = workers;
    if (serviceFilter) {
      result = result.filter((w) => w.service === serviceFilter);
    }
    if (priceFilter) {
      result = result.filter(
        (w) => w.pricePerDay >= priceFilter[0] && w.pricePerDay <= priceFilter[1]
      );
    }
    return result;
  }, [workers, serviceFilter, priceFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredWorkers.length / PAGE_SIZE);
  const paginatedWorkers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredWorkers.slice(start, start + PAGE_SIZE);
  }, [filteredWorkers, page]);

  // Get unique services for filter dropdown
  const serviceOptions = useMemo(
    () => Array.from(new Set(workers.map((w) => w.service))),
    [workers]
  );

  // Get min/max price for price filter
  const minPrice = useMemo(
    () => Math.min(...workers.map((w) => w.pricePerDay)),
    [workers]
  );
  const maxPrice = useMemo(
    () => Math.max(...workers.map((w) => w.pricePerDay)),
    [workers]
  );

  // Handle filter changes
  function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setServiceFilter(e.target.value);
    setPage(1);
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") {
    const value = Number(e.target.value);
    setPriceFilter((prev) => {
      if (!prev) return type === "min" ? [value, maxPrice] : [minPrice, value];
      return type === "min" ? [value, prev[1]] : [prev[0], value];
    });
    setPage(1);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 bg-[#000000]">
      <h1 className="text-2xl font-bold mb-4 text-white">Find a Worker</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={serviceFilter}
          onChange={handleServiceChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Services</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-white">Price/Day:</span>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={priceFilter ? priceFilter[0] : minPrice}
            onChange={(e) => handlePriceChange(e, "min")}
            className="border rounded px-2 py-1 w-20"
          />
          <span className="text-white">-</span>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={priceFilter ? priceFilter[1] : maxPrice}
            onChange={(e) => handlePriceChange(e, "max")}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
        <button
          className="ml-2 px-3 py-2 bg-gray-200 rounded"
          onClick={() => {
            setServiceFilter("");
            setPriceFilter(null);
            setPage(1);
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
          : paginatedWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
