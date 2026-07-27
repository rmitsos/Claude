const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Athens",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Everything else on the site is someone else's headline under someone else's
// byline. This is the one place GR Wire writes in its own voice, so it sits on
// its own surface and carries an explicit byline — a reader should never be
// unsure whether they are reading us or a publisher we link to.
export default function Editorial({ meta, Body, headingLevel = "h1" }) {
  const Heading = headingLevel;

  return (
    <article className="border-b border-rule bg-tint px-4 py-7">
      <div className="mx-auto max-w-[68ch]">
        <div className="font-mono text-[11px] uppercase tracking-widest text-band">
          This week · {meta.weekOf}
        </div>

        <Heading className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
          {meta.title}
        </Heading>

        {meta.standfirst && (
          <p className="mt-2 font-serif text-lg leading-snug text-ink-2">
            {meta.standfirst}
          </p>
        )}

        <div className="mt-3 border-y border-rule py-1.5 font-mono text-[11px] text-muted">
          By {meta.author} · {dateFmt.format(new Date(meta.published))} ·{" "}
          <span className="text-ink-2">Written by us, not aggregated</span>
        </div>

        <div className="longform editorial mt-5 flex flex-col gap-4 text-[0.97rem] text-ink-2">
          <Body />
        </div>
      </div>
    </article>
  );
}
