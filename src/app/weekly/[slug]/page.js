import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITORIALS, getEditorial } from "@/content/editorials";
import Shell from "@/components/Shell";
import Editorial from "@/components/Editorial";

export function generateStaticParams() {
  return EDITORIALS.map((e) => ({ slug: e.meta.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getEditorial(slug);
  if (!entry) return {};
  return {
    title: `${entry.el.title} — GR Wire`,
    description: entry.el.standfirst,
  };
}

export default async function EditorialArchivePage({ params }) {
  const { slug } = await params;
  const entry = getEditorial(slug);
  if (!entry) notFound();

  return (
    <Shell active="weekly">
      <Editorial meta={entry.meta} el={entry.el} en={entry.en} />
      <p className="px-4 py-5 text-sm text-muted">
        <Link href="/weekly" className="underline hover:no-underline">
          Latest week and the numbers behind it
        </Link>
      </p>
    </Shell>
  );
}
