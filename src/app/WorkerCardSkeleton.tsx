export default function WorkerCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-gray-200" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-4" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}
