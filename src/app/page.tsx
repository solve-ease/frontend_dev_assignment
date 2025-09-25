'use client'
import Navbar from '../components/Navbar';
import WorkerCard from '../components/WorkerCard';
import SkeletonCard from '../components/SkeletonCard';
import { WorkerType } from '@/types/workers';
import { useState, useEffect } from 'react';

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json');
        setWorkersData(response.default);
      } catch (error) {
        console.error('Failed to load workers:', error);
      }
    };
    loadData();
  }, []);

  const filteredWorkers = workersData
    .filter(worker => worker.pricePerDay > 0)
    .filter(worker => worker.id !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = filteredWorkers.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar />
      <main className='container mx-auto px-4 py-8 bg-[#000000]'>
        <h1 className='text-3xl font-bold mb-8 text-center text-white'>Our Workers</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {workersData.length === 0
            ? Array.from({ length: itemsPerPage }, (_, idx) => <SkeletonCard key={idx} />)
            : currentWorkers.map((worker: WorkerType) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <button onClick={goPrev} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50 text-white bg-gray-700">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-white bg-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={goNext} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50 text-white bg-gray-700">
            Next
          </button>
        </div>
      </main>
    </>
  );
}
