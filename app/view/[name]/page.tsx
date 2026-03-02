export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getFeedbackForRecipient } from "@/lib/actions";
import { slugToName } from "@/lib/people";
import { formatRelativeTime } from "@/lib/date";

type Props = { params: Promise<{ name: string }> };

export default async function ViewFeedbackPage({ params }: Props) {
  const { name: slug } = await params;
  const recipientName = slugToName(slug);
  if (!recipientName) notFound();

  const feedback = await getFeedbackForRecipient(recipientName);

  const initials = recipientName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-accent-primary/10 border-2 border-accent-primary/30 flex items-center justify-center text-[18px] font-semibold text-accent-primary shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
              Peer Feedback
            </p>
            <h1 className="font-serif-display italic text-[26px] lg:text-[32px] font-bold text-white">
              {recipientName}
            </h1>
            <p className="mt-1 text-[12.5px] text-muted-text">
              <span className="text-accent-primary font-semibold">{feedback.length}</span>{" "}
              {feedback.length === 1 ? "response" : "responses"} collected.
            </p>
          </div>
        </header>

        {feedback.length === 0 ? (
          <div className="bg-card-bg rounded-[10px] shadow-card p-10 text-center">
            <p className="text-[12.5px] text-muted-text">
              No feedback yet. Be the first to share something.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {feedback.map((entry, i) => (
              <li
                key={entry.id}
                className="bg-card-bg rounded-[10px] shadow-card p-5 opacity-0 animate-stagger-fade"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-2">
                      → What they like
                    </p>
                    <p className="text-[12.5px] text-white whitespace-pre-wrap">
                      {entry.what_i_like}
                    </p>
                  </div>

                  <hr className="border-divider" />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-text mb-2">
                      → What could improve
                    </p>
                    <p className="text-[12.5px] text-white whitespace-pre-wrap">
                      {entry.can_improve}
                    </p>
                  </div>

                  <p className="text-[11px] text-muted-text text-right">
                    {formatRelativeTime(entry.created_at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
