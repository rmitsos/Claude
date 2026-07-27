"use client";

import { useRouter } from "next/navigation";
import { ENTITIES } from "@/lib/entities";
import { PERIODS } from "@/lib/articles";

const selectClass =
  "rounded-sm border border-rule bg-surface px-2 py-1.5 text-sm ";

// A real <form method="get"> rather than client-side state: the query lands
// in the URL, so results are shareable, bookmarkable, and the back button
// behaves. JS only upgrades it to apply on change — without JS the submit
// button still works.
export default function SearchControls({ tag, period }) {
  const router = useRouter();

  const orgs = ENTITIES.filter((e) => e.kind === "org");
  const themes = ENTITIES.filter((e) => e.kind === "theme");

  function apply(event) {
    const form = event.currentTarget.form;
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (value) params.set(key, value);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      action="/search"
      method="get"
      className="flex flex-wrap items-end gap-3 border-b border-rule pb-5"
    >
      <label className="flex flex-col gap-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Subject
        </span>
        <select name="tag" defaultValue={tag || ""} onChange={apply} className={selectClass}>
          <option value="">Everything</option>
          <optgroup label="Organisations">
            {orgs.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Themes">
            {themes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Period
        </span>
        <select name="period" defaultValue={period} onChange={apply} className={selectClass}>
          {Object.entries(PERIODS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="rounded-sm border border-rule px-3 py-1.5 text-sm font-medium hover:border-band"
      >
        Apply
      </button>

      {tag && (
        <a
          href="/search"
          className="pb-1.5 text-sm text-muted underline hover:text-ink"
        >
          Clear
        </a>
      )}
    </form>
  );
}
