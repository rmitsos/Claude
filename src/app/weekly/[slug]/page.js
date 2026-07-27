import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITORIALS, getEditorial } from "@/content/editorials";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
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

  const lang = await getLang();

  return (
    <Shell lang={lang} active="weekly">
      <Editorial meta={entry.meta} el={entry.el} en={entry.en} />
      <p className="px-4 py-5 text-sm text-muted">
        <Link href="/weekly" className="underline hover:no-underline">
          {t(lang, "weekly.latestLink")}
        </Link>
      </p>
    </Shell>
  );
}
