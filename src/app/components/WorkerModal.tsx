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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-xs w-full mx-4 relative overflow-hidden"
        style={{
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideInFromBottom {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-in-1 {
            animation: slideInFromBottom 0.4s ease-out 0.15s both;
          }
          .animate-slide-in-2 {
            animation: slideInFromBottom 0.4s ease-out 0.2s both;
          }
          .animate-slide-in-3 {
            animation: slideInFromBottom 0.4s ease-out 0.25s both;
          }
          .animate-slide-in-4 {
            animation: slideInFromBottom 0.4s ease-out 0.3s both;
          }
          .animate-slide-in-5 {
            animation: slideInFromBottom 0.4s ease-out 0.35s both;
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white hover:text-gray-200 bg-black/40 rounded-full p-1.5 backdrop-blur-sm transition-all duration-200 hover:bg-black/60 hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Worker Image */}
        <div className="relative w-full h-70 overflow-hidden">
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            unoptimized
          />
        </div>

        {/* Worker Details */}
        <div className="p-4 space-y-3">
          {/* Name and Service */}
          <div className="text-center space-y-1 animate-slide-in-1">
            <h2 className="text-lg font-bold text-gray-900">{worker.name}</h2>
            <p className="text-sm text-gray-600 capitalize">{worker.service}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-1 animate-slide-in-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all duration-200 ${
                  i < (worker.rating || 0)
                    ? "text-yellow-400 fill-yellow-400 hover:scale-110"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {worker.rating ? worker.rating.toFixed(1) : "No rating"}
            </span>
          </div>

          {/* Availability */}
          <div className="flex justify-center animate-slide-in-3">
            {worker.available ? (
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full transition-all duration-200 hover:bg-green-200">
                <div
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                  style={{
                    animation: "pulse 2s infinite",
                  }}
                ></div>
                Available in your area
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full transition-all duration-200 hover:bg-red-200">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Not available in your area
              </span>
            )}
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-lg p-3 text-center animate-slide-in-4 transition-all duration-200 hover:bg-gray-100">
            <div className="text-xl font-bold text-green-600">
              ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()}
              <span className="text-sm font-normal text-gray-600"> / day</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">+18% GST included</div>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => {
              alert(`Contacting ${worker.name}`);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] animate-slide-in-5 cursor-pointer"
          >
            Contact Worker
          </button>
        </div>
      </div>
    </div>
  );
});

WorkerModal.displayName = "WorkerModal";
