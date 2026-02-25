export const PEOPLE = [
  "Clementie Freya",
  "Ibrasya Pohan",
  "Keanan Wongso",
  "Edbert Sunarpo",
] as const;

export type PersonName = (typeof PEOPLE)[number];

export function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function slugToName(slug: string): string | null {
  const normalized = slug.toLowerCase().replace(/-/g, " ");
  const found = PEOPLE.find(
    (p) => p.toLowerCase().replace(/\s+/g, " ") === normalized
  );
  return found ?? null;
}
