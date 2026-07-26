import { getWireItems } from "@/lib/articles";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export const revalidate = 300;

export default async function HomePage() {
  const items = await getWireItems();

  return (
    <Shell>
      <WireList
        items={items}
        emptyMessage="No articles yet — the ingestion job may not have run."
      />
    </Shell>
  );
}
