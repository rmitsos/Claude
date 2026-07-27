import { cookies } from "next/headers";
import { DEFAULT_LANG, LANGS, LANG_COOKIE } from "./i18n";

// A cookie rather than localStorage, because the interface strings are
// rendered on the server. Reading it opts these pages into per-request
// rendering, which is an accepted cost here: the alternative is shipping both
// languages to every reader and swapping after hydration, which flashes the
// wrong language and complicates every component that shows text.
export async function getLang() {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return LANGS.includes(value) ? value : DEFAULT_LANG;
}
