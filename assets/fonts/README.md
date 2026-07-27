# Fonts for Open Graph cards

These two files exist for one purpose: `next/og` renders share images with
Satori, which has no font fallback. A glyph the supplied font lacks comes out
as an empty box — there is no browser behind it to quietly substitute
something else.

That matters here more than on most sites, because **Geist has no Greek
subset**. Google Fonts ships it as `cyrillic, latin, latin-ext` only, and the
default font bundled with `@vercel/og` is Geist Regular with 729 glyphs, six
of which fall in the Greek block and all six are maths symbols (Λ Ω λ μ π ω).
A Greek headline rendered with it would be a row of boxes.

So the cards use Inter, which covers Greek in full.

## What these files are

`Inter-Regular.ttf` and `Inter-Bold.ttf`, from Google Fonts (Inter v20,
weights 400 and 700), subset with `pyftsubset` to the ranges the cards
actually use:

    U+0000-00FF   Basic Latin + Latin-1
    U+0100-017F   Latin Extended-A (accented names in source titles)
    U+0370-03FF   Greek and Coptic
    U+2000-206F   General punctuation — en/em dashes, the · separator
    U+20AC        €
    U+2022 U+2192 U+2212 U+FFFD

Full Inter is ~325 KB per weight. Subset, each is ~58 KB. This is not
housekeeping: `ImageResponse` enforces a **500 KB ceiling** on the whole
route bundle including fonts, so two full weights would not fit.

Regenerating, if a card ever needs a character outside those ranges:

    pip install fonttools
    curl -s "https://fonts.googleapis.com/css2?family=Inter:wght@400;700" \
      -H "User-Agent: Mozilla/4.0"          # legacy UA returns .ttf URLs
    pyftsubset Inter-400.ttf --output-file=Inter-Regular.ttf \
      --unicodes="U+0000-00FF,U+0100-017F,U+0370-03FF,U+2000-206F,U+20AC,U+2022,U+2192,U+2212,U+FFFD" \
      --layout-features="kern,liga,ccmp,mark,mkmk" --no-hinting --desubroutinize

Verify Greek survived before committing — subsetting failures are silent and
only show up as boxes in a card nobody looks at until it is on LinkedIn.

## Licence

Inter is licensed under the SIL Open Font License 1.1, which permits
redistribution including in modified (subset) form. https://rsms.me/inter/
