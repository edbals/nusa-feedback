"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { submitFeedback } from "@/lib/actions";
import { PEOPLE } from "@/lib/people";

export default function SubmitForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(submitFeedback, {});
  const [isPending, setIsPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setIsPending(false);
      setShowSuccess(true);
      const t = setTimeout(() => router.push("/"), 2500);
      return () => clearTimeout(t);
    }
    if (state?.error) setIsPending(false);
  }, [state?.success, state?.error, router]);

  return (
    <>
      {showSuccess && (
        <div
          className="mb-6 py-4 px-5 bg-accent-primary/10 border border-accent-primary/40 text-accent-primary text-[12.5px] rounded-[10px] animate-[slideDown_0.3s_ease_forwards]"
          role="alert"
        >
          → Thank you. Your feedback has been submitted.
        </div>
      )}

      <form action={formAction} className="space-y-5" onSubmit={() => setIsPending(true)}>

        <div>
          <label
            htmlFor="recipient"
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-2"
          >
            Who are you giving feedback to?
          </label>
          <select
            id="recipient"
            name="recipient"
            required
            className="w-full bg-card-bg border border-divider rounded-[10px] py-2.5 px-3 text-[12.5px] text-white transition-colors"
          >
            <option value="" className="bg-card-bg">Select a person</option>
            {PEOPLE.map((name) => (
              <option key={name} value={name} className="bg-card-bg">
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="what_i_like"
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-2"
          >
            → What I like about this person
          </label>
          <textarea
            id="what_i_like"
            name="what_i_like"
            required
            minLength={10}
            rows={4}
            placeholder="At least 10 characters"
            className="w-full bg-card-bg border border-divider rounded-[10px] py-2.5 px-3 text-[12.5px] text-white placeholder:text-muted-text transition-colors resize-y"
          />
        </div>

        <div>
          <label
            htmlFor="can_improve"
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-2"
          >
            → What could be improved
          </label>
          <textarea
            id="can_improve"
            name="can_improve"
            required
            minLength={10}
            rows={4}
            placeholder="At least 10 characters"
            className="w-full bg-card-bg border border-divider rounded-[10px] py-2.5 px-3 text-[12.5px] text-white placeholder:text-muted-text transition-colors resize-y"
          />
        </div>

        {state?.error && (
          <p className="text-[12.5px] text-badge-red" role="alert">
            → {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-[11px] uppercase tracking-[0.14em] font-bold text-[#07091A] bg-accent-primary hover:bg-white py-3 px-4 rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting…" : "Submit Feedback"}
        </button>
      </form>
    </>
  );
}
