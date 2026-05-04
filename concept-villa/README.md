# concept-villa

A second wedding-website concept — vintage Old World Italian villa aesthetic.
Single scrolling page, dark espresso background, cream type, muted gold
accents. Independent of the `app/` notebook concept; nothing in here touches
those files.

## Run it

```bash
cd concept-villa
npm install
npm run dev
```

Then open the printed local URL.

## Where to edit

- **All wedding details** live in `src/data/wedding.ts`. Bride / groom names,
  date, venue, timeline, hotels, FAQs, RSVP email, dress-code swatches —
  everything is in one config object so you do not need to touch component
  files for copy changes.
- **Photos** are placeholder Unsplash URLs with a sepia/B&W CSS filter
  (`.bw-warm` in `src/index.css`). Each placeholder has a `TODO: swap`
  comment beside it. To use your own photos, drop them into
  `public/photos/` and replace the `src=` strings with `/photos/yourfile.jpg`.
- **Section order** is in `src/App.tsx`. Reorder, comment out, or add new
  sections from there.

## Sections

1. Hero — scalloped oval frame over a B&W background image
2. Countdown — live `DDD : HH : MM : SS` to the wedding date
3. Our Love Story — three alternating text/photo vignettes + monogram
4. Ceremony & Reception — two-column card with line-art icons
5. Our Timeline — vertical hairline timeline with line-art icons
6. Accommodations — two hotel cards with `Book Now` pill buttons
7. Transportation — short note + vintage car illustration
8. Dress Code — title, color swatches, styling note
9. Wedding FAQs — five Q&A pairs
10. RSVP — envelope illustration + mailto button
11. Footer — monogram, signature, contact email, back-to-top link

## Build & deploy

```bash
npm run build      # outputs static files to dist/
npm run preview    # serve dist/ locally for a final check
```

The `dist/` folder is a fully static site. Drop it into Netlify, Vercel, or
any static host.

## Design tokens

Defined in `tailwind.config.js`:

- Colors: `espresso-{300,500,700,900}`, `ivory-{100,200}`, `gold-{300,400,500}`
- Fonts: `font-display` (Italiana), `font-heading` (Cormorant Garamond
  italic), `font-body` (Lora)
- Letter-spacing helpers: `tracking-caps-sm`, `tracking-caps`,
  `tracking-caps-lg`

## Notes

- Smooth scrolling and fade-in-on-scroll reveals are wired up out of the box
  via `<html style="scroll-behavior: smooth">` and the `<Reveal>` component.
- The countdown updates every second and recalculates from the date in
  `wedding.date` (ISO string, with timezone offset for Toronto).
- The RSVP "RSVP Now" button is a pre-filled `mailto:` for now. To swap to a
  Google Form, replace the `<a href={mailto}>…</a>` in `src/sections/RSVP.tsx`
  with your form URL.
