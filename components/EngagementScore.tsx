"use client";

import { useMemo, useState } from "react";
import { formatRelativeTime } from "@/lib/date";

type Props = {
  baseScore: number;
  totalCount: number;
  lastUpdated: string | null;
};

function summaryForScore(score: number): string {
  if (score <= 3) return "Getting started — encourage your team to share feedback.";
  if (score <= 6) return "Good momentum — feedback is flowing.";
  if (score <= 8) return "Strong engagement — the team is communicating well.";
  return "Excellent — this team is thriving.";
}

export default function EngagementScore({ baseScore, totalCount, lastUpdated }: Props) {
  const initial = Math.round(baseScore * 10) / 10;
  const [score, setScore] = useState(Number.isFinite(initial) ? initial : 0);
  const percentage = useMemo(() => Math.max(0, Math.min(100, score * 10)), [score]);

  const lastUpdatedLabel = lastUpdated ? formatRelativeTime(lastUpdated) : "No feedback yet";
  const membersCount = 4;

  return (
    <div className="bg-hero-card-bg rounded-[10px] shadow-card-strong p-6 md:p-7 h-full flex flex-col">

      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
          Engagement Score
        </p>
        <h2 className="text-[15px] font-bold text-white">
          Overall Team Participation
        </h2>
        <p className="mt-1 text-[12.5px] text-muted-text">
          A simple indicator of how actively the team is sharing feedback.
        </p>
      </div>

      <div className="flex flex-1 items-center gap-6 flex-col md:flex-row">
        {/* Conic gauge */}
        <div className="flex items-center justify-center flex-1">
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 160,
              height: 160,
              background: `conic-gradient(#00C8FF ${percentage}%, rgba(255,255,255,0.07) 0)`,
              boxShadow: percentage > 0 ? "0 0 28px rgba(0,200,255,0.2)" : "none",
            }}
          >
            <div
              className="absolute inset-[6px] rounded-full flex flex-col items-center justify-center"
              style={{ background: "#0F2044" }}
            >
              <span className="font-serif-display italic text-[44px] font-black text-accent-primary leading-none">
                {score.toFixed(1)}
              </span>
              <span className="mt-0.5 text-[11px] text-muted-text">/10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 w-full">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-2">
              Adjust Score
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={score}
                onChange={(e) => setScore(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="w-10 text-right text-[12.5px] text-white font-semibold">
                {score.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Summary
            </p>
            <p className="text-[12.5px] text-muted-text">
              → {membersCount} members &nbsp;·&nbsp; {totalCount} total{" "}
              {totalCount === 1 ? "entry" : "entries"}
            </p>
            <p className="text-[12.5px] text-muted-text">
              → Last updated {lastUpdatedLabel}
            </p>
            <p className="text-[12.5px] text-white mt-1">{summaryForScore(score)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
