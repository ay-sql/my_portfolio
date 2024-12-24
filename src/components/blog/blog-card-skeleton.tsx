import { Skeleton } from "@/components/ui/skeleton"

export function BlogCardSkeleton() {
  return (
    <div className="group h-[460px] flex flex-col relative bg-background rounded-lg overflow-hidden shadow-lg">
      <Skeleton className="h-48 w-full" />
      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export function BlogListSkeleton() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </div>
    </section>
  )
} 