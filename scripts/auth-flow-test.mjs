// Funktionaler Auth-Flow-Test: Registrieren -> Abmelden -> Anmelden.
// Nutzt das installierte Chrome via puppeteer-core. Legt einen Test-User an
// (eindeutige Email pro Lauf). Aufruf: node scripts/auth-flow-test.mjs
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const email = `test-${Date.now()}@arduino-academy.test`;
const password = "testpass123";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const loggedIn = () =>
  page.evaluate(() => document.body.innerText.includes("Abmelden"));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

console.log("Test-User:", email);

try {
  // 1) REGISTRIEREN
  await page.goto(`${BASE}/registrieren`, { waitUntil: "load" });
  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await wait(2500);
  console.log("\n[1] Nach Registrieren");
  console.log("    URL:", page.url());
  const signedUpLoggedIn = await loggedIn();
  console.log("    Eingeloggt?", signedUpLoggedIn);
  if (!signedUpLoggedIn) {
    const txt = await page.evaluate(() => document.body.innerText.slice(0, 300));
    console.log("    Seiteninhalt:", JSON.stringify(txt));
    console.log(
      "    => Vermutlich ist die E-Mail-Bestätigung aktiv (kein Auto-Login).",
    );
  }

  // 2) ABMELDEN (nur sinnvoll, wenn eingeloggt)
  if (await loggedIn()) {
    await page.goto(`${BASE}/`, { waitUntil: "load" });
    await page.click('form button[type="submit"]'); // Abmelden-Button im Header
    await wait(2000);
    console.log("\n[2] Nach Abmelden");
    console.log("    Noch eingeloggt?", await loggedIn());
  }

  // 3) ANMELDEN
  await page.goto(`${BASE}/anmelden`, { waitUntil: "load" });
  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await wait(2500);
  console.log("\n[3] Nach Anmelden");
  console.log("    URL:", page.url());
  console.log("    Eingeloggt?", await loggedIn());
} catch (e) {
  console.error("FEHLER im Flow:", e.message);
} finally {
  await browser.close();
}
