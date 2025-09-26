
// FILTERS COMPONENT

import React, { useEffect, useCallback, memo } from "react";

import {
  X,
} from "lucide-react";

import { FilterState } from "@/types/workers";

export const Filters = memo(
  ({
    filters,
    onFiltersChange,
    services,
    priceRange,
    isVisible,
    onClose,
    closeOnOutsideClick = true,
  }: {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    services: string[];
    priceRange: { min: number; max: number };
    isVisible: boolean;
    onClose: () => void;
    closeOnOutsideClick?: boolean;
  }) => {
    const handleFilterChange = useCallback(
      (key: keyof FilterState, value: string | number) => {
        onFiltersChange({ ...filters, [key]: value });
      },
      [filters, onFiltersChange]
    );

    // Close with ESC
    useEffect(() => {
      if (!isVisible) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:relative lg:bg-transparent lg:block"
        onClick={closeOnOutsideClick ? onClose : undefined} // only close when allowed (mobile)
      >
        {/* Panel */}
        <div
          className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto lg:relative lg:w-full lg:shadow-none lg:bg-gray-50 lg:rounded-xl lg:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 lg:p-0">
            <div className="flex items-center justify-between mb-6 lg:mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div>
                
              </div>

              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={filters.service}
                  onChange={(e) =>
                    handleFilterChange("service", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">All Services ({services.length})</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (₹ per day, incl. GST)
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", Number(e.target.value))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", Number(e.target.value))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Range: ₹{priceRange.min.toLocaleString()} - ₹
                  {priceRange.max.toLocaleString()}
                </div>
              </div>

              {/* Active Filters */}
              {(filters.service ||
                filters.searchQuery ||
                filters.minPrice !== priceRange.min ||
                filters.maxPrice !== priceRange.max) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active Filters
                  </label>
                  <div className="space-y-2">
                    {filters.service && (
                      <div className="flex items-center justify-between text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        <span>Service: {filters.service}</span>
                        <button
                          onClick={() => handleFilterChange("service", "")}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {filters.searchQuery && (
                      <div className="flex items-center justify-between text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                        <span>Search: {filters.searchQuery}</span>
                        <button
                          onClick={() => handleFilterChange("searchQuery", "")}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              <button
                onClick={() =>
                  onFiltersChange({
                    service: "",
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                    searchQuery: "",
                  })
                }
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Clear All Filters
              </button>

              {/* Done button (mobile only) */}
              <button
                onClick={onClose}
                className="w-full py-2 px-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 lg:hidden"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Filters.displayName = "Filters";
