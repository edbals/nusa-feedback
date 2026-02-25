export default function ViewLoading() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10 animate-page-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-divider animate-pulse" />
          <div>
            <div className="mb-2 h-6 w-40 bg-divider rounded animate-pulse" />
            <div className="h-4 w-32 bg-divider rounded animate-pulse" />
          </div>
        </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card-bg rounded-xl p-5 h-32 animate-pulse"
          />
        ))}
      </div>
      </div>
    </div>
  );
}
