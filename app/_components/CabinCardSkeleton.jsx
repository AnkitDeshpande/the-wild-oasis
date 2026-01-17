function CabinCardSkeleton() {
  return (
    <div className="flex border border-primary-800 animate-pulse">
      {/* Image side — empty but structured */}
      <div className="relative flex-1 border-r border-primary-800">
        {/* empty on purpose */}
      </div>

      {/* Content side — SAME markup */}
      <div className="grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          {/* Title */}
          <div className="h-7 w-1/2 bg-primary-800/20 rounded mb-3" />

          {/* Capacity row */}
          <div className="flex gap-3 items-center mb-2">
            <div className="h-5 w-5 bg-primary-800/20 rounded" />
            <div className="h-5 w-2/3 bg-primary-800/20 rounded" />
          </div>

          {/* Price row */}
          <div className="flex justify-end gap-3 items-baseline">
            <div className="h-8 w-20 bg-primary-800/20 rounded" />
            <div className="h-4 w-14 bg-primary-800/20 rounded" />
          </div>
        </div>

        <div className="bg-primary-950 border-t border-primary-800 text-right">
          <div className="py-4 px-6 inline-block">
            <div className="h-4 w-40 bg-primary-800/20 rounded ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinCardSkeleton;
