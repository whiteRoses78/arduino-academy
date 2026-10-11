-- M2 Lektion 6 "Einfache Ampelschaltung" verschlankt (11.10.2026, Marco: "setze diese Punkte um").
-- Der Abschnitt "Code-Verbesserung: Hilfsfunktion" (eigene Funktion, Parameter, bool) entfällt
-- ersatzlos aus dem Schülertext. Testfragen 4 und 8 fragten danach und werden ersetzt (IDs bleiben).
-- Die Lehrer-Lösung behält die Funktions-Variante als Ausblick, klar als "nicht Stoff" markiert.
begin;

do $do$
declare
  lid  uuid := '797263ef-56c1-4a6d-9dff-ad745c330c1a';
  h    text;
  newh text;
  f    text := ' (oder die verbesserte Version mit Hilfsfunktion)';
begin
  select content->'explanation'->>'html' into h from public.lessons where id = lid;
  if md5(h) <> 'f6469834baeba1bbe6d2f68125edf029' then
    raise exception 'Lektion 6: Alt-Stand der Erklärung passt nicht';
  end if;
  newh := regexp_replace(h,
    '<hr class="section-divider">\s*<div class="info-card">\s*<h3>Code-Verbesserung: Hilfsfunktion</h3>.*(<div class="warning-box">\s*<strong>Klappt nicht)',
    '\1');
  if length(h) - length(newh) <> 3769 or position('ampelSchalten' in newh) > 0 or position('bool' in newh) > 0 then
    raise exception 'Lektion 6: Abschnitt nicht sauber entfernt (Differenz %)', length(h) - length(newh);
  end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(newh)) where id = lid;

  update public.lessons set content = replace(content::text, f, '')::jsonb
  where id = lid and (length(content::text) - length(replace(content::text, f, ''))) = length(f);
  if not found then raise exception 'Lektion 6: Schritt-Text trifft nicht genau einmal'; end if;
end $do$;

do $do$
begin
  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Wie lange dauert ein kompletter Durchlauf der Ampel aus der Lektion (Rot 5 s, Rot-Gelb 1 s, Grün 5 s, Gelb 2 s)?",
 "options": [
  "11 Sekunden",
  "8 Sekunden",
  "13 Sekunden",
  "4 Sekunden"
 ],
 "correct": 2,
 "explanation": "Die vier Phasen laufen nacheinander ab, ihre Wartezeiten addieren sich: 5 s + 1 s + 5 s + 2 s = 13 Sekunden."
}$p$::jsonb
  where id = '62fdd7ab-64a3-4dc2-8b9a-d017af385d0a' and payload->>'question' like 'Welche Ampelphase schaltet der Aufruf ampelSchalten%';
  if not found then raise exception 'Testfrage 4 (L6) trifft nicht'; end if;

  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Die Ampel hat gerade die letzte Phase (Gelb) beendet. Was passiert als Nächstes?",
 "options": [
  "Das Programm ist zu Ende und alle LEDs gehen aus",
  "Die Ampel bleibt auf Gelb stehen, bis man den Arduino neu startet",
  "Das Programm läuft rückwärts: erst Grün, dann Rot-Gelb",
  "loop() beginnt von vorn und die Ampel zeigt wieder Rot"
 ],
 "correct": 3,
 "explanation": "Alle vier Phasen stehen in loop(). loop() wiederholt sich endlos, darum folgt auf Gelb wieder die erste Phase: Rot."
}$p$::jsonb
  where id = '4ff3dcae-926e-416a-bffa-083ca3270de7' and payload->>'question' like 'Warum lohnt es sich, eine eigene Funktion%';
  if not found then raise exception 'Testfrage 8 (L6) trifft nicht'; end if;
end $do$;

do $do$
declare
  lid uuid := '797263ef-56c1-4a6d-9dff-ad745c330c1a';
  a   text := '/* --- Elegantere Variante mit eigener Hilfsfunktion (weniger Wiederholung) ---';
  b   text := '• Die Hilfsfunktion ampelSchalten()';
begin
  update public.lesson_solutions set
    sketch = replace(sketch, a, '/* --- Nur als Ausblick für die Lehrkraft (nicht mehr Stoff der Lektion): Variante mit eigener Hilfsfunktion ---'),
    didactics = left(didactics, position(b in didactics) - 1) || $s$• Die Lektion ist bewusst schlank: Ampel mit digitalWrite und delay, dann sofort bauen. Eigene Funktionen (ampelSchalten) und bool sind nicht mehr Stoff der Lektion und werden weder im Kompetenztest noch in der Modularbeit gefragt. Wer mag, zeigt die Funktions-Variante aus dem Sketch als Ausblick. Schnelle Schüler:innen bekommen die zwei Zusatzaufgaben im Praxisteil (eilige Ampel, Nachtmodus).$s$,
    updated_at = now()
  where lesson_id = lid and position(a in sketch) > 0 and position(b in didactics) > 0;
  if not found then raise exception 'Lehrer-Lösung L6 trifft nicht'; end if;
end $do$;

commit;
