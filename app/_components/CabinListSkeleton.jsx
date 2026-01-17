import CabinCardSkeleton from "./CabinCardSkeleton";

function CabinListSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {Array.from({ length: 6 }).map((_, i) => (
        <CabinCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default CabinListSkeleton;
