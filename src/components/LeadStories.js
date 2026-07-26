import { getLeadStories } from "@/lib/articles";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Athens",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function Meta({ item }) {
  return (
    <span className="mt-1 block font-mono text-[11px] text-gray-400 dark:text-gray-500">
      {item.source}
      {item.pubDate && ` · ${timeFmt.format(item.pubDate)}`}
      {item.technology && <span className="ml-1.5 text-violet-600 dark:text-violet-400">Tech</span>}
    </span>
  );
}

export default async function LeadStories() {
  const stories = await getLeadStories(5);
  if (stories.length === 0) return null;

  const [hero, ...rest] = stories;

  return (
    <section className="border-b border-gray-200 px-4 pb-5 pt-5 dark:border-gray-800">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Leading stories
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <a href={hero.link} target="_blank" rel="noopener noreferrer" className="group block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.image}
            alt=""
            className="mb-2 aspect-[16/9] w-full rounded-sm object-cover"
          />
          <h3 className="font-serif text-lg leading-tight group-hover:underline">{hero.title}</h3>
          <Meta item={hero} />
        </a>

        <div className="flex flex-col gap-3">
          {rest.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[4.5rem_1fr] gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-serif text-[0.9rem] leading-snug group-hover:underline">
                  {item.title}
                </h3>
                <Meta item={item} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
