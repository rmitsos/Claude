import Nav from "@/components/Nav";
import Rail from "@/components/Rail";

// The Option B layout: one time-ordered column with a narrow rail. The rail
// carries the coverage tallies so the main column stays dense and chronological.
export default function Shell({ lang, active, activeSub, heading, children }) {
  return (
    <>
      <Nav lang={lang} active={active} activeSub={activeSub} />
      <div className="mx-auto grid w-full max-w-6xl flex-1 lg:grid-cols-[1fr_17.5rem]">
        <main className="min-w-0 border-rule lg:border-r">
          {heading && (
            <h1 className="px-4 pb-1 pt-5 font-serif text-2xl font-bold tracking-tight">
              {heading}
            </h1>
          )}
          {children}
        </main>
        <Rail lang={lang} />
      </div>
    </>
  );
}
