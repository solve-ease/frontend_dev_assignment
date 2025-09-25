import { WorkerType } from "@/types/workers";
import Image from "next/image";
import React from "react";

interface WorkerDetailsModalProps {
  worker: WorkerType | null;
  open: boolean;
  onClose: () => void;
  onBook: (worker: WorkerType) => void;
}

const WorkerDetailsModal: React.FC<WorkerDetailsModalProps> = ({
  worker,
  open,
  onClose,
  onBook,
}) => {
  if (!open || !worker) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-32 rounded-xl overflow-hidden shadow">
            <Image
              src={worker.image}
              alt={worker.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
            {worker.name}
          </h2>
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            {worker.service}
          </span>
          <div className="text-gray-700 text-center mb-2">
            <div className="font-medium">
              Price:{" "}
              <span className="text-blue-600 font-bold">
                ₹{Math.round(worker.pricePerDay * 1.18)}
              </span>{" "}
              / day
            </div>
            <div className="text-sm mt-1">ID: {worker.id}</div>
          </div>
          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-white font-semibold text-base shadow hover:brightness-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => onBook(worker)}
            >
              Book this Worker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailsModal;
