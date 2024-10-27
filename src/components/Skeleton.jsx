export function Skeleton({ type, className }) {
  switch (type) {
    case "profile":
      return (
        <div className={`border p-4 rounded-lg w-80 ${className}`}>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-[150px] bg-gray-200 animate-pulse" />
              <div className="h-4 w-[100px] bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 animate-pulse" />
          </div>
        </div>
      );

    case "list":
      return (
        <div className={`space-y-4 ${className}`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2 w-full">
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      );

    case "form":
      return (
        <div className={`space-y-4 ${className}`}>
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
          <div className="h-10 w-[100px] bg-gray-200 animate-pulse rounded" />
        </div>
      );

    case "card":
      return (
        <div className={`p-4 border rounded-lg ${className}`}>
          <div className="h-48 w-full bg-gray-200 animate-pulse mb-4" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-2" />
        </div>
      );

    default:
      return (
        <div
          className={`h-12 w-12 bg-gray-200 animate-pulse rounded-full ${className}`}
        />
      );
  }
}
