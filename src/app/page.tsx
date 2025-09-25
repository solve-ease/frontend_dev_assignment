"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import WorkerCardSkeleton from "./WorkerCardSkeleton";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Memoize filtered and sorted workers
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workersData]);

  return (
    <main className="container mx-auto px-2 sm:px-4 py-8 bg-[#f6eded] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Workers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))
          : filteredWorkers.map((worker: WorkerType) => (
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
    </main>
  );
}
