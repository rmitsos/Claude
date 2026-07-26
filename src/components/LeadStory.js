const ACCENT_TEXT = {
  finance: "text-emerald-600 dark:text-emerald-400",
  telco: "text-violet-600 dark:text-violet-400",
  energy: "text-amber-600 dark:text-amber-400",
};

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function LeadStory({ item, category, categoryLabel }) {
  if (!item) return null;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-12 grid gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-xl hover:shadow-gray-200/60 sm:grid-cols-2 sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/40"
    >
      {item.image && (
        <div className="order-first aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 sm:order-last dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-3">
        <span
          className={`text-[11px] font-bold uppercase tracking-widest ${ACCENT_TEXT[category] || ""}`}
        >
          {categoryLabel}
        </span>
        <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:underline sm:text-3xl">
          {item.title}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.source}
          {item.pubDate ? ` · ${formatDate(item.pubDate)}` : ""}
        </div>
      </div>
    </a>
  );
}
