export function ProjectListSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse"
        >
          {/* Image placeholder */}
          <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
          
          {/* Content placeholder */}
          <div className="p-6">
            {/* Title placeholder */}
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
            
            {/* Description placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
            </div>
            
            {/* Tags placeholder */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, tagIndex) => (
                <div
                  key={tagIndex}
                  className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-16"
                />
              ))}
            </div>
            
            {/* Links placeholder */}
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 2 }).map((_, linkIndex) => (
                <div
                  key={linkIndex}
                  className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
