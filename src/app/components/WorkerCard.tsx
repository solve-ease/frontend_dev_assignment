import React, { useState, memo } from "react";
import Image from "next/image";
import { WorkerType } from "@/types/workers";
import { AlertCircle, Loader2 } from "lucide-react";
import { WorkerModal } from "./WorkerModal";

export const WorkerCard = memo(({ worker }: { worker: WorkerType }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-full h-55 overflow-hidden bg-gray-100">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          )}
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
              <AlertCircle className="w-6 h-6 mb-1" />
              <span className="text-xs">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={worker.image}
              alt={worker.name}
              fill
              unoptimized
              className={`object-cover group-hover:scale-110 transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 space-y-3">
          {/* Header Section */}
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
              {worker.name}
            </h3>
            <p className="text-sm text-gray-600 capitalize">{worker.service}</p>
          </div>

          {/* Price Section */}
          <div className="bg-gray-50 rounded-lg p-3 text-center group-hover:bg-blue-50 transition-colors duration-200">
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-lg font-bold text-green-600 group-hover:text-blue-600 transition-colors duration-200">
                ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">/ day</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">+18% GST included</div>
          </div>

          {/* Contact Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Contacting ${worker.name}`);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 font-medium text-sm transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
          >
            Contact Worker
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <WorkerModal worker={worker} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
});

WorkerCard.displayName = "WorkerCard";
