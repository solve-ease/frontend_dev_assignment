// src/app/workers/WorkersPageClient.tsx
"use client";

import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 9;
const PAGE_WINDOW = 3;

export default function WorkersPageClient() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<WorkerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [serviceFilter, setServiceFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<number>(0); // max price selected

  const maxWorkerPrice = useMemo(
    () => Math.max(...workersData.map((w) => w.pricePerDay * 1.18)),
    [workersData]
  );

  // Load workers data
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/workers.json"); // fetch JSON from public folder
        const data = await res.json();
        setWorkersData(data);
        setPriceFilter(
          Math.max(
            ...data.map((w: WorkerType) => Math.round(w.pricePerDay * 1.18))
          )
        );
      } catch (error) {
        console.error("Failed to load workers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtered workers
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((w) => w.pricePerDay > 0 && w.id !== null)
      .filter((w) => serviceFilter === "All" || w.service === serviceFilter)
      .filter((w) => Math.round(w.pricePerDay * 1.18) <= priceFilter)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workersData, serviceFilter, priceFilter]);

  const totalPages = Math.ceil(filteredWorkers.length / ITEMS_PER_PAGE);

  const paginatedWorkers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWorkers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredWorkers, currentPage]);

  const getPageNumbers = () => {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + PAGE_WINDOW - 1); // ✅ use const
    const adjustedStart =
      end - start < PAGE_WINDOW - 1
        ? Math.max(1, end - PAGE_WINDOW + 1)
        : start;

    const pages = [];
    for (let i = adjustedStart; i <= end; i++) pages.push(i);
    return pages;
  };

  const workerCards = useMemo(() => {
    return paginatedWorkers.map((worker: WorkerType, index: number) => (
      <motion.div
        key={worker.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
        }}
        className="group bg-white border border-gray-200 rounded-2xl shadow-md w-full max-w-[calc(33.333%-1.25rem)] min-h-[420px] flex flex-col overflow-hidden"
      >
        <div className="w-full h-56 relative flex items-center justify-center bg-gray-50">
          {worker.id <= 10 ? (
            <Image
              src={worker.image}
              alt={worker.name}
              width={288}
              height={224}
              className="object-contain"
              priority
            />
          ) : (
            <Image
              src={worker.image}
              alt={worker.name}
              width={288}
              height={224}
              className="object-contain"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="pt-3">
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
              {worker.name}
            </h2>
            <p className="text-gray-500 mt-1">{worker.service}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-indigo-700">
              ₹{Math.round(worker.pricePerDay * 1.18)} / day
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWorker(worker)}
              className="mt-5 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
            >
              Hire Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    ));
  }, [paginatedWorkers]);

  const serviceOptions = useMemo(() => {
    const services = Array.from(new Set(workersData.map((w) => w.service)));
    return ["All", ...services];
  }, [workersData]);

  return (
    <main className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 tracking-tight">
        Meet Our Workers
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-5 justify-center mb-8">
        {/* Service Filter */}
        <select
          value={serviceFilter}
          onChange={(e) => {
            setServiceFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2"
        >
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="price" className="text-gray-700">
            Max Price ₹{priceFilter}
          </label>
          <input
            type="range"
            id="price"
            min={0}
            max={maxWorkerPrice || 10000}
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-40"
          />
        </div>
      </div>

      {/* Workers Grid */}
      <div className="flex flex-wrap gap-5 justify-center">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <div
                key={idx}
                className="w-full max-w-[calc(33.333%-1.25rem)] h-96 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))
          : workerCards}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center mt-10 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Prev
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-indigo-700 text-white"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      )}

      {/* Worker Modal */}
      <AnimatePresence>
        {selectedWorker && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedWorker(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <div className="flex flex-col items-center">
                <Image
                  src={selectedWorker.image}
                  alt={selectedWorker.name}
                  width={200}
                  height={200}
                  className="object-contain rounded-lg mb-4"
                  loading="lazy"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedWorker.name}
                </h2>
                <p className="text-gray-600 mt-2">{selectedWorker.service}</p>
                <p className="text-xl font-semibold text-indigo-600 mt-4">
                  ₹{Math.round(selectedWorker.pricePerDay * 1.18)} / day
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition-all duration-300"
              >
                Confirm Booking
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
