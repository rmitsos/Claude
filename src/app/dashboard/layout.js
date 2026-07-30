"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Same shape as /studio, deliberately — that page's password gate is
// already proven working in this exact deployment: type the secret, keep
// it in sessionStorage for the tab, send it as a Bearer token on every API
// call. No upfront verification call here either, for the same reason
// /studio doesn't have one — each page's own fetch surfaces a 401 inline
// if the password is wrong, which is simpler and has fewer moving parts
// than gating the whole tree behind a dedicated "is this token valid?"
// round-trip.

const TokenContext = createContext("");
export function useDashboardToken() {
  return useContext(TokenContext);
}

function useToken() {
  const [token, setToken] = useState(() =>
    typeof window === "undefined" ? "" : sessionStorage.getItem("grwire-dashboard-token") || ""
  );
  return [
    token,
    (value) => {
      setToken(value);
      if (typeof window !== "undefined") sessionStorage.setItem("grwire-dashboard-token", value);
    },
  ];
}

const TABS = [
  { href: "/dashboard", label: "Health" },
  { href: "/dashboard/briefs", label: "Editorial briefs" },
  { href: "/dashboard/map", label: "Relation map" },
];

const field =
  "border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-band focus:outline-none";
const button =
  "border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-50";

export default function DashboardLayout({ children }) {
  const [token, setToken] = useToken();
  const [input, setInput] = useState("");
  const pathname = usePathname();

  if (!token) {
    return (
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-8">
        <h1 className="font-serif text-2xl font-bold tracking-tight">GR Wire dashboard</h1>
        <p className="mt-1 text-sm text-muted">Not for readers — internal tool.</p>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setToken(input);
          }}
        >
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className={field}
          />
          <button type="submit" className={button}>
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <TokenContext.Provider value={token}>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <nav className="mb-6 flex items-center justify-between border-b border-rule">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`border-b-2 px-3 py-2 text-sm ${
                  pathname === tab.href
                    ? "border-band font-semibold text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setToken("")}
            className="mb-2 text-xs text-muted hover:text-ink"
          >
            Re-enter password
          </button>
        </nav>
        {children}
      </main>
    </TokenContext.Provider>
  );
}
