export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  getDashboardOverview,
  getFeedbackCounts,
  getRecentFeedback,
} from "@/lib/actions";
import Image from "next/image";
import { PEOPLE, PEOPLE_PHOTOS, nameToSlug } from "@/lib/people";
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

        {/* Header */}
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
            Dashboard
          </p>
          <h1 className="font-serif-display text-[26px] lg:text-[32px] font-bold text-white leading-tight" style={{ letterSpacing: "-0.03em" }}>
            Chasing Impact: NUSA 360° Team Reflection
          </h1>
          <p className="mt-2 text-[12.5px] text-muted-text">
            → Anonymous team-wide feedback to strengthen collaboration and performance.
          </p>
        </header>

        {/* Top grid: engagement + recent */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <EngagementScore
            baseScore={baseScore}
            totalCount={overview.totalCount}
            lastUpdated={overview.lastUpdated}
          />

          {/* Recent feedback */}
          <div className="bg-card-bg rounded-[10px] shadow-card p-6 md:p-7 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
                  Activity
                </p>
                <h2 className="text-[15px] font-bold text-white">Recent Feedback</h2>
              </div>
              <span className="text-[11px] text-muted-text">
                Last {recent.length} updates
              </span>
            </div>

            {recent.length === 0 ? (
              <p className="text-[12.5px] text-muted-text">
                No feedback yet. Be the first to share one.
              </p>
            ) : (
              <ul className="divide-y divide-divider">
                {recent.map((item) => {
                    const person = item.recipient;
                  const photo = PEOPLE_PHOTOS[person];
                  return (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-accent-primary/25 shrink-0">
                        <Image src={photo} alt={person} width={32} height={32} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] text-white truncate">
                          Anonymous shared feedback about{" "}
                          <span className="font-semibold text-accent-primary">{person}</span>
                        </p>
                        <p className="text-[11px] text-muted-text mt-0.5">
                          {formatRelativeTime(item.created_at)}
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

        {/* People cards */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-4">
            Team Members
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {PEOPLE.map((name) => {
              const slug = nameToSlug(name);
              const count = counts[name] ?? 0;
              const photo = PEOPLE_PHOTOS[name];

              return (
                <article
                  key={slug}
                  className="bg-card-bg rounded-[10px] shadow-card hover:shadow-card-strong transition-shadow duration-200 p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-accent-primary/25 shrink-0">
                      <Image src={photo} alt={name} width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-white">{name}</h3>
                      <p className="text-[11px] text-muted-text mt-0.5">
                        <span className="text-accent-primary font-semibold">{count}</span>{" "}
                        {count === 1 ? "response" : "responses"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Link
                      href="/submit"
                      className="flex-1 inline-flex justify-center items-center text-[11px] font-semibold tracking-[0.08em] uppercase text-[#07091A] bg-accent-primary hover:bg-white rounded-lg py-2 transition-colors"
                    >
                      Give Feedback
                    </Link>
                    <Link
                      href={`/view/${slug}`}
                      className="flex-1 inline-flex justify-center items-center text-[11px] font-semibold tracking-[0.08em] uppercase text-accent-primary border border-accent-primary/30 hover:border-accent-primary hover:bg-accent-primary/10 rounded-lg py-2 transition-colors"
                    >
                      View →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
