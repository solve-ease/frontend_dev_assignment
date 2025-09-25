
// WORKER CARD COMPONENT

import React, { useState, memo } from "react";
import Image from "next/image";
import { WorkerType } from "@/types/workers";
import {
  AlertCircle,
  Loader2,
  
} from "lucide-react";

export const WorkerCard = memo(({ worker }: { worker: WorkerType }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden group">
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500">
            <AlertCircle className="w-8 h-8 mb-2" />
            <span className="text-sm">Image not available</span>
          </div>
        ) : (
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {worker.name}
        </h3>
        <p className="text-gray-600 mb-3 capitalize text-sm">
          {worker.service}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <span className="text-2xl font-bold text-green-600">
              ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ day</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            +18% GST
          </span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm">
          Contact Worker
        </button>
      </div>
    </div>
  );
});

WorkerCard.displayName = "WorkerCard";
