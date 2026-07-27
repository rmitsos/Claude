import Nav from "@/components/Nav";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { el, en } from "@/content/legal/about";

export async function generateMetadata() {
  const lang = await getLang();
  const v = lang === "en" ? en : el;
  return { title: `${v.title} — GR Wire`, description: v.intro };
}

export default async function AboutPage() {
  const lang = await getLang();
  const v = lang === "en" ? en : el;

  return (
    <>
      <Nav lang={lang} />
      <Prose lang={lang} title={v.title} intro={v.intro}>
        <v.Body contact={SITE.contactEmail} />
      </Prose>
    </>
  );
}
