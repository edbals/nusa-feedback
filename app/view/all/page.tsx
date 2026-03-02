export const dynamic = "force-dynamic";

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
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
            Activity
          </p>
          <h1 className="font-serif-display italic text-[28px] lg:text-[34px] font-bold text-white">
            All Feedback
          </h1>
          <p className="mt-2 text-[12.5px] text-muted-text">
            → The most recent anonymous feedback entries across the NUSA team.
          </p>
        </header>

        {feedback.length === 0 ? (
          <p className="text-[12.5px] text-muted-text">
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
                  className="bg-card-bg rounded-[10px] shadow-card p-4 flex items-center gap-3"
                >
                  <div className="h-9 w-9 rounded-full bg-accent-secondary/20 border border-accent-secondary/30 flex items-center justify-center text-[12px] font-semibold text-accent-secondary shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-white truncate">
                      Anonymous shared feedback about{" "}
                      <span className="font-semibold text-accent-primary">{person}</span>
                    </p>
                    <p className="text-[11px] text-muted-text mt-0.5">
                      {formatRelativeTime(entry.created_at)}
                    </p>
                  </div>
                  <Link
                    href={`/view/${nameToSlug(person)}`}
                    className="text-[11px] text-accent-primary hover:text-white transition-colors shrink-0"
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
