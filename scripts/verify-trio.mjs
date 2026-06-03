// End-to-End-Test des didaktischen Trios (Lektion 1 "Was ist ein Arduino?"):
// Registrieren -> alle Übungen lösen -> Selbsteinschätzung -> gespeichert? ->
// Dashboard zeigt Fortschritt + Fälligkeit? Legt einen Test-User an.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const email = `trio-${Date.now()}@arduino-academy.test`;
const PW = "Richtig12345";

// Korrekte Zuordnung der matching-Übung (aus der DB).
const MATCH = {
  Mikrocontroller: "Das Gehirn des Arduino",
  Programm: "Die Anweisung, die der Arduino ausführt",
  Sensor: "Misst etwas (z.B. Licht, Temperatur)",
  LED: "Kleines Lämpchen, das leuchten kann",
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1600 });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = () => page.evaluate(() => document.body.innerText);

try {
  // 1. Registrieren
  await page.goto(`${BASE}/registrieren`, { waitUntil: "load" });
  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', PW);
  await page.click('button[type="submit"]');
  await wait(2500);
  console.log("[1] Registriert | eingeloggt?", (await txt()).includes("Abmelden"));

  // 2. Lektion öffnen
  await page.goto(`${BASE}/modul/grundlagen/was-ist-ein-arduino`, {
    waitUntil: "load",
  });
  await wait(1000);

  const blockCount = await page.evaluate(
    () => document.querySelectorAll("section .space-y-8 > div").length,
  );
  console.log("[2] Übungs-Blöcke:", blockCount);

  // 3. Jede Übung lösen
  for (let b = 1; b <= blockCount; b++) {
    const blk = `section .space-y-8 > div:nth-child(${b})`;
    const isMatching = await page.evaluate(
      (s) => !!document.querySelector(`${s} select`),
      blk,
    );

    if (isMatching) {
      // selects markieren + jeweils korrekte Option per Text wählen
      const count = await page.evaluate((s) => {
        const sels = document.querySelectorAll(`${s} select`);
        sels.forEach((el, i) => el.setAttribute("data-trio", String(i)));
        return sels.length;
      }, blk);
      for (let i = 0; i < count; i++) {
        const value = await page.evaluate(
          (i, MATCH) => {
            const sel = document.querySelector(`select[data-trio="${i}"]`);
            const left = sel.closest("div").querySelector("span").textContent.trim();
            const want = MATCH[left];
            const opt = [...sel.options].find(
              (o) => o.textContent.trim() === want,
            );
            return opt ? opt.value : null;
          },
          i,
          MATCH,
        );
        if (value) await page.select(`select[data-trio="${i}"]`, value);
      }
      await page.evaluate((s) => {
        const btn = [...document.querySelectorAll(`${s} button`)].find((x) =>
          x.textContent.includes("Prüfen"),
        );
        btn?.click();
      }, blk);
      await wait(700);
    } else {
      // MC: Optionen nacheinander klicken, bis richtig (border-primary erscheint)
      const optCount = await page.evaluate(
        (s) => document.querySelectorAll(`${s} button`).length,
        blk,
      );
      for (let o = 0; o < optCount; o++) {
        const solved = await page.evaluate(
          (s) => !!document.querySelector(`${s} .border-primary`),
          blk,
        );
        if (solved) break;
        await page.evaluate(
          (s, idx) => {
            const btns = document.querySelectorAll(`${s} button`);
            if (btns[idx] && !btns[idx].disabled) btns[idx].click();
          },
          blk,
          o,
        );
        await wait(400);
      }
    }
  }

  await wait(1000);
  const hasAssessment = (await txt()).includes("Wie sicher fühlst du dich");
  console.log("[3] Selbsteinschätzung erschienen?", hasAssessment);

  if (hasAssessment) {
    await page.evaluate(() => {
      const el = [...document.querySelectorAll("h2")].find((h) =>
        h.textContent.includes("Wie sicher"),
      );
      el?.scrollIntoView({ block: "center" });
    });
    await wait(400);
    await page.screenshot({ path: "/tmp/trio-assessment.png" });
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) =>
        x.textContent.includes("Sitzt sicher"),
      );
      b?.click();
    });
    await wait(2200);
    console.log("[4] Gespeichert?", (await txt()).includes("Gespeichert"));
  }

  // 4. Dashboard
  await page.goto(`${BASE}/dashboard`, { waitUntil: "load" });
  await wait(1000);
  const dash = await txt();
  console.log("[5] Dashboard:");
  console.log("   ", dash.split("\n").map((l) => l.trim()).filter(Boolean).join(" | "));
  await page.screenshot({ path: "/tmp/trio-dashboard-1280.png" });

  // Mobile-Check (375): Dashboard overflow-frei?
  await page.setViewport({
    width: 375,
    height: 1200,
    deviceScaleFactor: 2,
    isMobile: true,
  });
  await page.goto(`${BASE}/dashboard`, { waitUntil: "load" });
  await wait(700);
  const dashOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  await page.screenshot({ path: "/tmp/trio-dashboard-375.png" });
  console.log("[6] Dashboard @375 overflow:", dashOverflow);
} catch (e) {
  console.error("FEHLER:", e.message);
} finally {
  await browser.close();
}
