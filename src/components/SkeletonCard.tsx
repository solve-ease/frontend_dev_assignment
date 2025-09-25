const SkeletonCard = () => {
  return (
    <div className="border rounded-lg shadow animate-pulse bg-gray-300 flex flex-col h-72">
      <div className="w-full h-48 bg-gray-400 rounded-t-lg"></div>
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="h-6 bg-gray-400 rounded w-3/4"></div>
        <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        <div className="h-5 bg-gray-400 rounded mt-auto w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
