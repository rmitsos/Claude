import { getWireItems } from "@/lib/articles";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import DotsBlock from "@/components/DotsBlock";
import Subscribe from "@/components/Subscribe";
import LeadStories from "@/components/LeadStories";
import WireList from "@/components/WireList";

export default async function HomePage() {
  const lang = await getLang();
  const items = await getWireItems();

  return (
    <Shell lang={lang}>
      {/* Our own writing sits above the aggregation, because it is the only
          thing on this page that is ours. It is bounded rather than growing:
          see DotsBlock. Chronology is untouched — this is not part of the
          wire's ordering, it sits before it. */}
      <DotsBlock lang={lang} />

      {/* Compact: the block above has just given the reason, and the front
          page cannot afford a second paragraph before the news starts. */}
      <Subscribe lang={lang} compact />

      <LeadStories lang={lang} />
      <WireList lang={lang} items={items} emptyMessage={t(lang, "wire.empty")} />
    </Shell>
  );
}
