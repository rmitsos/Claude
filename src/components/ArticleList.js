function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function ArticleList({ items, emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-6">
        {emptyMessage || "No articles available right now."}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
      {items.map((item, i) => (
        <li key={`${item.link}-${i}`} className="py-3">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {item.title}
          </a>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.source}
            {item.pubDate ? ` · ${formatDate(item.pubDate)}` : ""}
          </div>
        </li>
      ))}
    </ul>
  );
}
