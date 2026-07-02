export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse h-full flex flex-col">
      <div className="relative h-64 bg-[#911b1e]/10" />
      <div className="p-4 flex flex-col flex-1">
        <div className="h-3 bg-[#911b1e]/10 rounded w-1/4 mb-2" />
        <div className="h-4 bg-[#911b1e]/10 rounded w-3/4 mb-2" />
        <div className="h-4 bg-[#911b1e]/10 rounded w-2/3 mb-4" />
        <div className="flex items-center justify-between mt-auto">
          <div className="h-6 bg-[#911b1e]/10 rounded w-1/3" />
          <div className="h-10 w-10 bg-[#911b1e]/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
