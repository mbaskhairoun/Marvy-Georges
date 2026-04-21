// One-shot image conversion to WebP. Run via `node scripts/convert-webp.mjs`.
// Produces a .webp next to every source PNG/JPEG under public/, at roughly
// 70-85% smaller file size with visually-lossless quality.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
let savedBytes = 0;

for (const src of files) {
  const dest = src.replace(/\.(png|jpe?g)$/i, ".webp");
  // Skip if the WebP is already newer than the source
  if (fs.existsSync(dest)) {
    const s = fs.statSync(src);
    const d = fs.statSync(dest);
    if (d.mtimeMs >= s.mtimeMs) continue;
  }
  const srcSize = fs.statSync(src).size;
  await sharp(src)
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);
  const outSize = fs.statSync(dest).size;
  savedBytes += srcSize - outSize;
  const pct = (((srcSize - outSize) / srcSize) * 100).toFixed(0);
  console.log(
    `${path.relative(ROOT, src)}  ${(srcSize / 1024).toFixed(0)}KB → ${(outSize / 1024).toFixed(0)}KB  (-${pct}%)`
  );
}

console.log(`\nTotal saved: ${(savedBytes / 1024).toFixed(0)} KB`);
