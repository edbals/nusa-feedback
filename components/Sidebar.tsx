"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PEOPLE, nameToSlug } from "@/lib/people";

function initialsFromName(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

type NavItem = { label: string; href: string };

const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Give Feedback", href: "/submit" },
  { label: "View All", href: "/view/all" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-56 bg-sidebar-bg text-body-text border-r border-divider shrink-0 relative z-10">
      <div className="flex-1 flex flex-col px-4 pt-6 pb-4 overflow-y-auto sidebar-scroll">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="h-8 w-8 rounded-full bg-accent-primary/10 border border-accent-primary/40 flex items-center justify-center">
            <span className="text-accent-primary text-xs font-bold">N</span>
          </div>
          <div>
            <div className="font-serif-display italic text-[18px] leading-none text-white">
              NUSA
            </div>
            <div className="text-[10px] text-muted-text mt-0.5 tracking-[0.1em] uppercase">
              team feedback
            </div>
          </div>
        </div>

        {/* Primary nav */}
        <nav className="space-y-0.5 mb-8">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-colors ${
                  active
                    ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/25"
                    : "text-muted-text hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-accent-primary/70">→</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Members section */}
        <div className="mb-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-accent-primary px-3">
          Members
        </div>

        <div className="space-y-0.5">
          {PEOPLE.map((person) => {
            const slug = nameToSlug(person);
            const href = `/view/${slug}`;
            const active = pathname === href;
            return (
              <Link
                key={person}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition-colors ${
                  active
                    ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/25"
                    : "text-muted-text hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="h-6 w-6 rounded-full bg-accent-secondary/20 border border-accent-secondary/30 flex items-center justify-center text-[10px] font-semibold text-accent-secondary shrink-0">
                  {initialsFromName(person)}
                </div>
                <span className="truncate">{person}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-divider">
        <p className="text-[10px] text-muted-text tracking-[0.1em] uppercase">
          anonymous · peer feedback
        </p>
      </div>
    </aside>
  );
}
