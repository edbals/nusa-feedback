import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10 animate-page-in text-center">
      <h1 className="text-2xl font-bold text-body-text mb-2">
        Page not found
      </h1>
      <p className="text-sm text-muted-text mb-6">
        The person you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-wider text-accent-primary hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
