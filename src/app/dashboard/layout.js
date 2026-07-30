"use client";

import { createContext, useContext, useMemo, useState, Suspense, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Same shape as /studio: a shared secret typed once, kept in sessionStorage
// for the tab, sent as a Bearer token on every API call. Not linked from
// anywhere and disallowed in robots.txt — see src/app/robots.js.
//
// Verifying the password is a fetch reacting to a value (the token), which
// this Next.js version's data-fetching guide (node_modules/next/dist/docs)
// steers away from doing via setState-in-an-effect — see
// node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md.
// `use()` + Suspense is the client-component-appropriate alternative:
// the verify call is a promise created during render, memoised on the
// token, and `use()` suspends until it resolves — no effect involved.

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

// Never rejects — a network failure is just another "not authorized" result,
// same as a wrong password, rather than something Suspense has to catch.
function verify(token) {
  return fetch("/api/dashboard/health", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.ok)
    .catch(() => false);
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

function PasswordForm({ onSubmit, wrong }) {
  const [input, setInput] = useState("");
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-8">
      <h1 className="font-serif text-2xl font-bold tracking-tight">GR Wire dashboard</h1>
      <p className="mt-1 text-sm text-muted">Not for readers — internal tool.</p>
      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(input);
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
        {wrong && <p className="text-xs text-fin">Wrong password.</p>}
      </form>
    </main>
  );
}

function AuthGate({ token, retryCount, onWrongPassword, children }) {
  // retryCount isn't read inside verify() — it forces a recheck even when
  // the same (wrong) password is resubmitted, which a token-only dependency
  // would otherwise ignore.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = useMemo(() => verify(token), [token, retryCount]);
  const ok = use(promise);
  if (!ok) return <PasswordForm onSubmit={onWrongPassword} wrong />;
  return children;
}

export default function DashboardLayout({ children }) {
  const [token, setToken] = useToken();
  const [retryCount, setRetryCount] = useState(0);
  const pathname = usePathname();

  if (!token) {
    return (
      <PasswordForm
        onSubmit={(value) => {
          setToken(value);
          setRetryCount((n) => n + 1);
        }}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-8">
          <p className="text-sm text-muted">Checking…</p>
        </main>
      }
    >
      <AuthGate
        token={token}
        retryCount={retryCount}
        onWrongPassword={(value) => {
          setToken(value);
          setRetryCount((n) => n + 1);
        }}
      >
        <TokenContext.Provider value={token}>
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
            <nav className="mb-6 flex gap-1 border-b border-rule">
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
            </nav>
            {children}
          </main>
        </TokenContext.Provider>
      </AuthGate>
    </Suspense>
  );
}
