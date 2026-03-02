"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "GIVE", href: "/submit" },
  { label: "ALL", href: "/view/all" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar-bg border-t border-divider flex items-center justify-around px-4 h-16">
      {navItems.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-[10px] tracking-[0.14em] font-semibold transition-colors ${
              active
                ? "text-white"
                : "text-white/45"
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full transition-colors ${
                active ? "bg-accent-primary" : "bg-transparent"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
