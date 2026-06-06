// HTML -> PDF via installiertes Chrome (puppeteer-core, kein Download).
// Rendert die Seite inkl. JavaScript und druckt sie mit den @media print /
// @page-Regeln des Dokuments als PDF. Aufruf:
//   node scripts/html-to-pdf.mjs <input.html-oder-file-url> <output.pdf>
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const inArg = process.argv[2];
const out = process.argv[3] || "/tmp/out.pdf";
if (!inArg) {
  console.error("Bitte Eingabe-HTML angeben.");
  process.exit(1);
}
// Lokalen Pfad in file://-URL wandeln (falls keine URL übergeben wurde).
const url = inArg.startsWith("http") || inArg.startsWith("file:")
  ? inArg
  : pathToFileURL(inArg).href;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "load" });
// kurz warten, damit das Inline-Script die Kärtchen gerendert hat
await new Promise((r) => setTimeout(r, 300));

await page.pdf({
  path: out,
  printBackground: true,      // Hintergrundfarben (Kärtchen, teal Kreise) mitdrucken
  preferCSSPageSize: true,    // @page { size: A4; margin: 12mm } aus dem CSS nutzen
});

await browser.close();
console.log("PDF erstellt:", out);
