'use client';
import React, { useCallback, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Filters from '@/components/Filters';
import WorkerCard from '@/components/WorkerCard';
import SkeletonCard from '@/components/SkeletonCard';
import Pagination from '@/components/Pagination';
import { useWorkers } from '@/hooks/useWorkers';
import type { WorkerType } from '@/types/workers';
import { motion } from 'framer-motion';

export default function WorkersPage() {
  const { data: workers, loading, error } = useWorkers();
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  const services = useMemo(() => {
    if (!workers) return [];
    return Array.from(new Set(workers.map((w) => w.service))).sort();
  }, [workers]);

  const priceBounds = useMemo(() => {
    if (!workers || workers.length === 0) return { min: 0, max: 10000 };
    const prices = workers.map((w) => w.pricePerDay);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [workers]);

  React.useEffect(() => {
    if (!workers) return;
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
  }, [workers, priceBounds.min, priceBounds.max]);

  const handleFilterChange = useCallback(
    ({ service, minPrice, maxPrice }: { service: string | null; minPrice: number; maxPrice: number }) => {
      setServiceFilter(service);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setCurrentPage(1);
    },
    []
  );

  const filtered = useMemo(() => {
    if (!workers) return [];
    return workers
      .filter((w) => (serviceFilter ? w.service === serviceFilter : true))
      .filter((w) => w.pricePerDay >= minPrice && w.pricePerDay <= maxPrice)
      .filter((w) => w.pricePerDay > 0)
      .filter((w) => w.id !== null)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workers, serviceFilter, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPageSafe]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Workers</h1>

        <div className="mb-6">
          <Filters
            onFilterChange={handleFilterChange}
            initialMin={priceBounds.min}
            initialMax={priceBounds.max}
            services={services}
          />
        </div>

        {error && <div className="text-red-600 mb-4">Error loading workers: {error}</div>}

        <section id="workers" aria-live="polite">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {paginated.map((worker: WorkerType) => (
                  <motion.div
                    key={worker.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  >
                    <WorkerCard worker={worker} />
                  </motion.div>
                ))}
              </motion.div>

              {filtered.length === 0 && (
                <p className="text-center mt-8 text-gray-600">
                  No workers found for selected filters.
                </p>
              )}

              <Pagination
                currentPage={currentPageSafe}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
