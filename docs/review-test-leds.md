# Testfragen-Review — „LEDs ansteuern" (Kompetenztest)

**Bitte fachlich prüfen.** 8 Multiple-Choice-Fragen. ✅ = richtige Antwort.
Mischung: 2 aus den bestehenden Übungen (bewährt) + 6 neue (nur im Test).
Sag mir, wenn etwas fachlich falsch ist, eine Antwort missverständlich ist oder
du Fragen tauschen/streichen/ergänzen willst.

---

### 1. Warum braucht eine LED einen Vorwiderstand? *(aus Übung)*
- Damit die LED heller leuchtet
- ✅ **Damit der Strom begrenzt wird und die LED nicht durchbrennt**
- Damit der Arduino schneller arbeitet
- Damit die LED blinkt

*Erklärung:* Ohne Vorwiderstand fließt zu viel Strom durch die LED und sie brennt durch. 220 Ω ist der Standardwert.

---

### 2. Welcher Code lässt eine LED an Pin 5 leuchten (nicht blinken)? *(aus Übung)*
- `pinMode(5, INPUT); digitalWrite(5, HIGH);`
- ✅ **`pinMode(5, OUTPUT); digitalWrite(5, HIGH);`**
- `pinMode(5, OUTPUT); digitalRead(5);`
- `analogWrite(5, HIGH);`

*Erklärung:* Erst den Pin als OUTPUT setzen, dann mit `digitalWrite(5, HIGH)` einschalten.

---

### 3. Was bewirkt der Befehl `digitalWrite(8, LOW)`? *(neu)*
- Der Pin 8 wird eingeschaltet (5 Volt)
- ✅ **Der Pin 8 wird ausgeschaltet (0 Volt) — die LED geht aus**
- Der Pin 8 wird als Ausgang festgelegt
- Der Zustand von Pin 8 wird ausgelesen

*Erklärung:* `LOW` setzt den Pin auf 0 Volt — die LED bekommt keinen Strom und geht aus. `HIGH` wäre 5 Volt (an).

---

### 4. Wohin gehört der Befehl `pinMode(8, OUTPUT)`? *(neu)*
- ✅ **In `setup()`, weil er nur einmal am Anfang nötig ist**
- In `loop()`, damit er ständig wiederholt wird
- Er ist gar nicht nötig
- Es ist egal, wo er steht

*Erklärung:* `pinMode` legt einmalig fest, dass der Pin ein Ausgang ist. Das gehört in `setup()`, das genau einmal beim Start läuft.

---

### 5. Das lange Beinchen einer LED ist… *(neu)*
- ✅ **der Pluspol (Anode) — es kommt Richtung Plus / Vorwiderstand**
- der Minuspol (Kathode) und kommt an GND
- egal — eine LED kann man beliebig herum einbauen
- der Anschluss für ein Datenkabel

*Erklärung:* Das lange Bein ist die Anode (Plus). Eine LED hat eine Richtung (Polung) — falsch herum leuchtet sie nicht. Kurzes Bein = Kathode (Minus) → GND.

---

### 6. Was passiert, wenn du `pinMode(8, OUTPUT)` vergisst? *(neu)*
- Die LED leuchtet trotzdem ganz normal
- ✅ **Der Pin kann keinen Strom liefern — die LED bleibt dunkel**
- Der Arduino startet gar nicht
- Die LED blinkt unkontrolliert

*Erklärung:* Ohne `OUTPUT` ist der Pin kein richtiger Ausgang und versorgt die LED nicht zuverlässig mit Strom — sie bleibt dunkel.

---

### 7. Welcher Widerstandswert ist der typische Standardwert für eine einfache LED am Arduino? *(neu)*
- ✅ **220 Ω**
- 10 Ω
- 10 000 Ω (10 kΩ)
- 0 Ω (kein Widerstand nötig)

*Erklärung:* 220 Ω begrenzt den Strom auf ein sicheres Maß, die LED leuchtet aber noch hell. 10 Ω lässt zu viel Strom durch, 10 kΩ macht sie sehr dunkel, ganz ohne Widerstand brennt sie durch.

---

### 8. `HIGH` bedeutet an einem digitalen Pin… *(neu)*
- ✅ **5 Volt (eingeschaltet)**
- 0 Volt (ausgeschaltet)
- 3 Volt (halbe Helligkeit)
- eine zufällige Spannung

*Erklärung:* `HIGH` = 5 Volt = „an", `LOW` = 0 Volt = „aus". Eine halbe Helligkeit ginge nur mit `analogWrite()` / PWM, nicht mit `digitalWrite()`.

---

**Themenabdeckung:** Vorwiderstand (1, 7) · Befehle/Spannung (2, 3, 8) · pinMode/Programmstruktur (4, 6) · Polung/Aufbau (5). Punkteskala: x/8.
