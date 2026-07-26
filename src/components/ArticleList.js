function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const ACCENT = {
  finance: "bg-emerald-500",
  telco: "bg-violet-500",
  energy: "bg-amber-500",
};

function ArticleCard({ item, accent }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`h-full w-full opacity-10 ${accent}`} />
        )}
        <span className={`absolute left-3 top-3 h-1.5 w-1.5 rounded-full ${accent}`} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-gray-900 group-hover:underline dark:text-gray-100">
          {item.title}
        </h3>
        <div className="mt-auto flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">{item.source}</span>
          {item.pubDate && (
            <>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>{formatDate(item.pubDate)}</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}

export default function ArticleList({ items, emptyMessage, category }) {
  const accent = ACCENT[category] || "bg-gray-400";

  if (!items || items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {emptyMessage || "No articles available right now."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <ArticleCard key={`${item.link}-${i}`} item={item} accent={accent} />
      ))}
    </div>
  );
}
