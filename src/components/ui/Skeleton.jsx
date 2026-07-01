export default function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <Skeleton className="mb-3 aspect-square w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-3 h-3 w-1/2" />
      <div className="flex justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
