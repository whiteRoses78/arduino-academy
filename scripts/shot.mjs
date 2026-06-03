// Visual-Verification-Helfer: nutzt das installierte Chrome (kein Download)
// via puppeteer-core. Emuliert ein echtes Mobile-Device (Viewport + DPR),
// misst horizontalen Overflow und nennt die überlaufenden Elemente, dann
// Screenshot. Aufruf: node scripts/shot.mjs <url> <out.png> [width] [height]
import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const url = process.argv[2];
const out = process.argv[3] || "/tmp/shot.png";
const width = Number(process.argv[4] || 375);
const height = Number(process.argv[5] || 812);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({
  width,
  height,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(url, { waitUntil: "load" });
// kurz warten, damit Client-Komponenten hydrieren
await new Promise((r) => setTimeout(r, 600));

const metrics = await page.evaluate(() => {
  const docW = document.documentElement.scrollWidth;
  const cliW = document.documentElement.clientWidth;
  const offenders = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > cliW + 1 && r.width > 0) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className || "").slice(0, 70),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  offenders.sort((a, b) => b.right - a.right);
  return { docW, cliW, overflow: docW - cliW, offenders: offenders.slice(0, 6) };
});

console.log(`URL ${url} @ ${width}x${height}`);
console.log(JSON.stringify(metrics, null, 2));
await page.screenshot({ path: out });
await browser.close();
