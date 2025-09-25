"use client";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className="flex items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'} bg-blue-600 rounded-full animate-pulse`}></div>
        </div>
      </div>
      {message && (
        <div className="ml-6 text-gray-600">
          <div className="text-xl font-medium">{message}</div>
          <div className="text-sm text-gray-500">Please wait while we fetch the data</div>
        </div>
      )}
    </div>
  );
}
