"use client";

import { useMemo, useState } from "react";
import { formatRelativeTime } from "@/lib/date";

type Props = {
  baseScore: number;
  totalCount: number;
  lastUpdated: string | null;
};

function summaryForScore(score: number): string {
  if (score <= 3) {
    return "Getting started — encourage your team to share feedback.";
  }
  if (score <= 6) {
    return "Good momentum — feedback is flowing.";
  }
  if (score <= 8) {
    return "Strong engagement — the team is communicating well.";
  }
  return "Excellent — this team is thriving.";
}

export default function EngagementScore({
  baseScore,
  totalCount,
  lastUpdated,
}: Props) {
  const initial = Math.round(baseScore * 10) / 10;
  const [score, setScore] = useState(
    Number.isFinite(initial) ? initial : 0
  );

  const percentage = useMemo(() => Math.max(0, Math.min(100, score * 10)), [
    score,
  ]);

  const lastUpdatedLabel = lastUpdated
    ? formatRelativeTime(lastUpdated)
    : "No feedback yet";

  const membersCount = 4; // fixed team size

  return (
    <div className="bg-card-bg rounded-xl shadow-card p-6 md:p-7 h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold text-body-text">
            Overall Engagement Score
          </h2>
          <p className="mt-1 text-sm text-muted-text">
            A simple indicator of how actively the team is sharing feedback.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-6 flex-col md:flex-row">
        <div className="flex items-center justify-center flex-1">
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 160,
              height: 160,
              background: `conic-gradient(#3D3C2E ${percentage}%, #E8E4D8 0)`,
            }}
          >
            <div className="absolute inset-5 rounded-full bg-card-bg flex flex-col items-center justify-center">
              <span className="font-serif-display text-4xl text-body-text leading-none">
                {score.toFixed(1)}
              </span>
              <span className="mt-1 text-xs text-muted-text">/10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-[12px] font-medium uppercase tracking-[0.08em] text-muted-text mb-2">
              Adjust Score
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={score}
                onChange={(e) => setScore(parseFloat(e.target.value))}
                className="w-full accent-accent-primary"
              />
              <span className="w-10 text-right text-sm text-body-text font-medium">
                {score.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="mt-2 text-sm text-body-text">
            <p className="font-medium mb-1">Summary</p>
            <p className="text-muted-text">
              {membersCount} members · {totalCount} total feedback{" "}
              {totalCount === 1 ? "entry" : "entries"} · Last updated{" "}
              {lastUpdatedLabel}
            </p>
            <p className="mt-2">{summaryForScore(score)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

