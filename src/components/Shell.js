import Nav from "@/components/Nav";
import Rail from "@/components/Rail";

// The Option B layout: one time-ordered column with a single narrow rail.
// The rail carries the page's only image plus the coverage tallies, so the
// main column can stay dense and chronological.
export default function Shell({ active, activeSub, heading, children }) {
  return (
    <>
      <Nav active={active} activeSub={activeSub} />
      <div className="mx-auto grid w-full max-w-6xl flex-1 lg:grid-cols-[1fr_17.5rem]">
        <main className="min-w-0 border-gray-200 lg:border-r dark:border-gray-800">
          {heading && (
            <h1 className="px-4 pb-1 pt-5 font-serif text-2xl font-bold tracking-tight">
              {heading}
            </h1>
          )}
          {children}
        </main>
        <Rail />
      </div>
    </>
  );
}
