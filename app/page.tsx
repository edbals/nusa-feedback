export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  getDashboardOverview,
  getFeedbackCounts,
  getRecentFeedback,
} from "@/lib/actions";
import { PEOPLE, nameToSlug } from "@/lib/people";
import { formatRelativeTime } from "@/lib/date";
import EngagementScore from "@/components/EngagementScore";

export default async function HomePage() {
  const [counts, overview, recent] = await Promise.all([
    getFeedbackCounts(),
    getDashboardOverview(),
    getRecentFeedback(5),
  ]);

  const baseScore = Math.min(overview.totalCount / 2, 10);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl lg:text-[28px] font-bold text-body-text">
            NUSA team feedback
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            A dashboard view of anonymous feedback across the NUSA team.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <EngagementScore
            baseScore={baseScore}
            totalCount={overview.totalCount}
            lastUpdated={overview.lastUpdated}
          />

          <div className="bg-card-bg rounded-xl shadow-card p-6 md:p-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-body-text">
                Recent Feedback
              </h2>
              <span className="text-xs text-muted-text">
                Last {recent.length} updates
              </span>
            </div>

            {recent.length === 0 ? (
              <p className="text-sm text-muted-text">
                No feedback has been shared yet. Start by giving the first one.
              </p>
            ) : (
              <ul className="divide-y divide-divider">
                {recent.map((item) => {
                  const person = item.recipient;
                  const initials = person
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .toUpperCase();
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-accent-secondary flex items-center justify-center text-[11px] font-semibold text-accent-primary">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-body-text truncate">
                          Anonymous shared feedback about{" "}
                          <span className="font-medium">{person}</span>
                        </p>
                        <p className="text-xs text-muted-text">
                          {formatRelativeTime(item.created_at)}
                        </p>
                      </div>
                      <Link
                        href={`/view/${nameToSlug(person)}`}
                        className="text-xs text-muted-text hover:text-body-text"
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

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 pt-2">
          {PEOPLE.map((name) => {
            const slug = nameToSlug(name);
            const count = counts[name] ?? 0;
            const initials = name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .toUpperCase();

            return (
              <article
                key={slug}
                className="bg-card-bg rounded-xl shadow-card hover:shadow-card-strong transition-shadow duration-200 p-5 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent-secondary flex items-center justify-center text-[12px] font-semibold text-accent-primary">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-body-text">
                      {name}
                    </h3>
                    <p className="text-xs text-muted-text">
                      {count} {count === 1 ? "response" : "responses"}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  <Link
                    href="/submit"
                    className="flex-1 inline-flex justify-center items-center text-xs font-medium text-white bg-accent-primary hover:bg-body-text rounded-lg py-2 transition-colors"
                  >
                    Give Feedback
                  </Link>
                  <Link
                    href={`/view/${slug}`}
                    className="flex-1 inline-flex justify-center items-center text-xs font-medium text-accent-primary border border-divider hover:border-accent-primary rounded-lg py-2 bg-transparent transition-colors"
                  >
                    View
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
