/* eslint-disable @next/next/no-img-element */
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

type NavItem = {
  label: string;
  href: string;
};

const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Give Feedback", href: "/submit" },
  { label: "View All Feedback", href: "/view/all" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-sidebar-bg text-body-text border-r border-divider">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4 overflow-y-auto sidebar-scroll">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-full bg-accent-secondary flex items-center justify-center text-accent-primary">
            {/* simple chat bubble icon */}
            <span className="text-lg leading-none">💬</span>
          </div>
          <div>
            <div className="font-serif-display italic text-[20px] leading-none">
              NUSA
            </div>
            <div className="text-xs text-muted-text mt-1">team feedback</div>
          </div>
        </div>

        <nav className="space-y-1 mb-8">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? "bg-accent-primary text-white"
                    : "text-muted-text hover:bg-card-bg"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-accent-secondary flex items-center justify-center text-[11px] text-accent-primary font-semibold">
                  {item.label.charAt(0)}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mb-2 text-[11px] font-medium tracking-[0.08em] uppercase text-muted-text">
          Members
        </div>

        <div className="space-y-1">
          {PEOPLE.map((person) => {
            const slug = nameToSlug(person);
            const href = `/view/${slug}`;
            const active = pathname === href;
            return (
              <Link
                key={person}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  active
                    ? "bg-accent-primary text-white"
                    : "text-body-text hover:bg-card-bg"
                }`}
              >
                <div className="h-7 w-7 rounded-full bg-accent-secondary flex items-center justify-center text-[12px] font-semibold text-accent-primary">
                  {initialsFromName(person)}
                </div>
                <span className="truncate">{person}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-divider">
        <p className="text-[11px] text-muted-text">
          anonymous peer feedback
        </p>
      </div>
    </aside>
  );
}

