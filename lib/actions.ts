"use server";

import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "./supabase";

export type SubmitState = { error?: string; success?: boolean };

export async function submitFeedback(
  _prev: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const recipient = formData.get("recipient") as string | null;
  const whatILike = formData.get("what_i_like") as string | null;
  const canImprove = formData.get("can_improve") as string | null;

  if (!recipient?.trim()) {
    return { error: "Please select a recipient." };
  }
  if (!whatILike?.trim() || whatILike.trim().length < 10) {
    return { error: '"What I like" must be at least 10 characters.' };
  }
  if (!canImprove?.trim() || canImprove.trim().length < 10) {
    return { error: '"What could be improved" must be at least 10 characters.' };
  }

  const { error } = await supabase.from("feedback").insert({
    recipient: recipient.trim(),
    what_i_like: whatILike.trim(),
    can_improve: canImprove.trim(),
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { error: "Failed to save feedback. Please try again." };
  }

  return { success: true };
}

export async function getFeedbackCounts(): Promise<Record<string, number>> {
  noStore();
  const { data, error } = await supabase
    .from("feedback")
    .select("recipient");

  if (error) {
    console.error("Supabase count error:", error);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.recipient] = (counts[row.recipient] ?? 0) + 1;
  }
  return counts;
}

export async function getFeedbackForRecipient(
  recipientName: string
): Promise<{ id: string; what_i_like: string; can_improve: string; created_at: string }[]> {
  noStore();
  const { data, error } = await supabase
    .from("feedback")
    .select("id, what_i_like, can_improve, created_at")
    .eq("recipient", recipientName)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  return data ?? [];
}

export type DashboardOverview = {
  totalCount: number;
  lastUpdated: string | null;
};

export async function getDashboardOverview(): Promise<DashboardOverview> {
  noStore();
  const { data, count, error } = await supabase
    .from("feedback")
    .select("created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Supabase dashboard overview error:", error);
    return { totalCount: 0, lastUpdated: null };
  }

  const totalCount = count ?? 0;
  const lastUpdated = data && data[0] ? data[0].created_at : null;

  return { totalCount, lastUpdated };
}

export type RecentFeedbackRow = {
  id: string;
  recipient: string;
  created_at: string;
};

export async function getRecentFeedback(
  limit = 5
): Promise<RecentFeedbackRow[]> {
  noStore();
  const { data, error } = await supabase
    .from("feedback")
    .select("id, recipient, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Supabase recent feedback error:", error);
    return [];
  }

  return data ?? [];
}
