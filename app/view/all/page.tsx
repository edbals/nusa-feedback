import Link from "next/link";
import { getRecentFeedback } from "@/lib/actions";
import { nameToSlug } from "@/lib/people";
import { formatRelativeTime } from "@/lib/date";

export default async function ViewAllPage() {
  const feedback = await getRecentFeedback(20);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl lg:text-[28px] font-bold text-body-text">
            All feedback
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            The most recent anonymous feedback entries across the NUSA team.
          </p>
        </header>

        {feedback.length === 0 ? (
          <p className="text-sm text-muted-text">
            No feedback has been shared yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {feedback.map((entry) => {
              const person = entry.recipient;
              const initials = person
                .split(" ")
                .map((p) => p[0])
                .join("")
                .toUpperCase();

              return (
                <li
                  key={entry.id}
                  className="bg-card-bg rounded-xl shadow-card p-4 flex items-center gap-3"
                >
                  <div className="h-9 w-9 rounded-full bg-accent-secondary flex items-center justify-center text-[12px] font-semibold text-accent-primary">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-body-text truncate">
                      Anonymous shared feedback about{" "}
                      <span className="font-medium">{person}</span>
                    </p>
                    <p className="text-xs text-muted-text">
                      {formatRelativeTime(entry.created_at)}
                    </p>
                  </div>
                  <Link
                    href={`/view/${nameToSlug(person)}`}
                    className="text-xs text-accent-primary hover:underline"
                  >
                    View →
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

