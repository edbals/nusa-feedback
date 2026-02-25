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
          className="mb-6 py-4 px-5 bg-success text-white text-sm rounded-md animate-[slideDown_0.3s_ease_forwards]"
          role="alert"
        >
          Thank you. Your feedback has been submitted.
        </div>
      )}
      <form
        action={formAction}
        className="space-y-6"
        onSubmit={() => setIsPending(true)}
      >
        <div>
          <label
            htmlFor="recipient"
            className="block text-[12px] font-medium uppercase tracking-[0.08em] text-muted-text mb-2"
          >
            Who are you giving feedback to?
          </label>
          <select
            id="recipient"
            name="recipient"
            required
            className="w-full bg-white border border-divider rounded-lg py-2.5 px-3 text-sm text-body-text focus:border-accent-primary transition-colors"
          >
            <option value="">Select a person</option>
            {PEOPLE.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="what_i_like"
            className="block text-[12px] font-medium uppercase tracking-[0.08em] text-muted-text mb-2"
          >
            ✦ What I like about this person
          </label>
          <textarea
            id="what_i_like"
            name="what_i_like"
            required
            minLength={10}
            rows={4}
            placeholder="At least 10 characters"
            className="w-full bg-white border border-divider rounded-lg py-2.5 px-3 text-sm text-body-text placeholder:text-muted-text focus:border-accent-primary transition-colors resize-y"
          />
        </div>

        <div>
          <label
            htmlFor="can_improve"
            className="block text-[12px] font-medium uppercase tracking-[0.08em] text-muted-text mb-2"
          >
            ✦ What could be improved
          </label>
          <textarea
            id="can_improve"
            name="can_improve"
            required
            minLength={10}
            rows={4}
            placeholder="At least 10 characters"
            className="w-full bg-white border border-divider rounded-lg py-2.5 px-3 text-sm text-body-text placeholder:text-muted-text focus:border-accent-primary transition-colors resize-y"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-xs uppercase tracking-[0.1em] font-medium bg-accent-primary text-white py-3 px-4 rounded-lg hover:bg-body-text transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting…" : "Submit feedback"}
        </button>
      </form>
    </>
  );
}
