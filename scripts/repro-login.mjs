// Repro von Marcos Szenario mit KONTROLLIERTEN Passwörtern:
// Registrieren (richtiges PW) -> Abmelden -> Anmelden FALSCH -> Anmelden RICHTIG.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const email = `repro-${Date.now()}@arduino-academy.test`;
const CORRECT = "Richtig12345";
const WRONG = "Falsch99999";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const loggedIn = () =>
  page.evaluate(() => document.body.innerText.includes("Abmelden"));
const errorText = () =>
  page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.innerText : null;
  });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

console.log("Repro-User:", email);
console.log("richtiges PW:", CORRECT, "| falsches PW:", WRONG);

await page.goto(`${BASE}/registrieren`, { waitUntil: "load" });
await page.type('input[name="email"]', email);
await page.type('input[name="password"]', CORRECT);
await page.click('button[type="submit"]');
await wait(2500);
console.log("\n[1] Registriert (richtiges PW) -> eingeloggt?", await loggedIn());

await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.click('form button[type="submit"]');
await wait(2000);
console.log("[2] Abgemeldet -> noch eingeloggt?", await loggedIn());

await page.goto(`${BASE}/anmelden`, { waitUntil: "load" });
await page.type('input[name="email"]', email);
await page.type('input[name="password"]', WRONG);
await page.click('button[type="submit"]');
await wait(2500);
console.log(
  "[3] Anmelden mit FALSCHEM PW -> eingeloggt?",
  await loggedIn(),
  "| Meldung:",
  JSON.stringify(await errorText()),
);
await page.screenshot({ path: "/tmp/repro-falsch.png" });

await page.goto(`${BASE}/anmelden`, { waitUntil: "load" });
await page.type('input[name="email"]', email);
await page.type('input[name="password"]', CORRECT);
await page.click('button[type="submit"]');
await wait(2500);
console.log(
  "[4] Anmelden mit RICHTIGEM PW (nach Abmelden) -> eingeloggt?",
  await loggedIn(),
);

await browser.close();
