import React, { memo, useRef, useEffect } from "react";
import Image from "next/image";
import { WorkerType } from "@/types/workers";
import { X, Star } from "lucide-react";

interface WorkerModalProps {
  worker: WorkerType | null;
  onClose: () => void;
}

export const WorkerModal = memo(({ worker, onClose }: WorkerModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Worker Image */}
        <div className="relative w-full h-60 rounded-t-xl overflow-hidden">
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Worker Details */}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{worker.name}</h2>
          <p className="text-gray-600 capitalize">{worker.service}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: 1 }).map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < (worker.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              {worker.rating ? worker.rating.toFixed(1) : "No rating"}
            </span>
          </div>

          {/* Availability badge */}
          <div className="mb-3">
            {worker.available ? (
              <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded">
                Available in your area
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-medium text-red-700 bg-red-100 border border-red-200 rounded">
                Not available in your area
              </span>
            )}
          </div>

          {/* Price */}
          <p className="text-xl font-semibold text-green-600">
            ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()} / day
          </p>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            +18% GST
          </span>

          {/* CTA */}
          <button
            onClick={() => {
              alert(`Contacting ${worker.name}`);
            }}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Contact Worker
          </button>
        </div>
      </div>
    </div>
  );
});

WorkerModal.displayName = "WorkerModal";
