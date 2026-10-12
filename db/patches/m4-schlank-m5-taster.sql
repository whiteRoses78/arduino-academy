-- Modul 4 verschlankt und Taster-Bild in Modul 5 korrigiert (12.10.2026, Marco: "1 ja, 2 ja, 3 nein,
-- Taster-Bild korrigieren").
--   1. Servomotor ansteuern: Abschnitte "Piezo-Summer" und "Ultraschall-Sensor HC-SR04" entfallen
--      (nie praktisch aufgebaut, nicht in Test und Modularbeit), dazu die Übungen 8 bis 10.
--      Beides bleibt als Ausblick in der Lehrer-Lösung.
--   2. Transistor als Schalter: "Plus-Box: Drehzahl regeln mit PWM" entfällt (die Zusatzaufgabe
--      "Langsamer drehen" im Praxisteil deckt das ab). Verweis in der Prüfungsschaltung angepasst.
--   3. Steckbrett-Bilder Modul 5, Lektion 1 bis 3: Taster sitzt in Spalte 23 und 25 (vorher 23/24),
--      GND-Kabel in Spalte 25. Die Bild-Kopien im Praxisteil von Lektion 1 und 2 werden nachgezogen.
-- Wird in Teilen per MCP eingespielt (je Teil eine Transaktion), Endstand per Export verglichen.

-- ===== Teil 1 von 4 =====
begin;
do $do$
declare
  h text;
  n int;
begin
  -- 1. Servo
  select content->'explanation'->>'html' into h from public.lessons where id = '41029f8a-4065-4bbb-872a-aa700ccac344';
  if md5(h) <> '3e7cee921707435009b256ea26d6864f' then raise exception 'Servo: Alt-Stand passt nicht'; end if;
  h := left(h, position($q0$

        <hr class="section-divider">

        <div class="info-card">
          <h3>Der Piezo-Summer$q0$ in h) - 1) || E'\n      ';
  if md5(h) <> 'c2b705a369b46509ba8e26780d629b34' then raise exception 'Servo: neuer Text weicht ab'; end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(h)) where id = '41029f8a-4065-4bbb-872a-aa700ccac344';

  delete from public.exercises
  where lesson_id = '41029f8a-4065-4bbb-872a-aa700ccac344' and position in (8, 9, 10)
    and id in ('25ba5ea7-034e-401a-a535-3098da4fd567', 'd15f7534-fc62-4362-8a5c-83c0c8688197', '4e9754fc-d4d9-4b9e-9f37-66e368c94eec')
    and payload::text ~ 'Summer|Ultraschall|HC-SR04';
  get diagnostics n = row_count;
  if n <> 3 then raise exception 'Servo: % Übungen statt 3 getroffen', n; end if;

  update public.lesson_solutions set sketch = sketch || $q1$

// Ausblick (seit 12.10.2026 nicht mehr in der Lektion): Piezo-Summer und Ultraschall-Sensor HC-SR04.
// Beide wurden im Kurs nie praktisch aufgebaut, darum stehen sie nur noch hier.
// Aktiver Summer an Pin 8 (+ an den Pin, - an GND), Ansteuerung wie eine LED:
//   digitalWrite(8, HIGH); delay(500); digitalWrite(8, LOW); delay(500);
// Passiver Summer: tone(8, 440); erzeugt den Ton, noTone(8); schaltet ihn ab.
// HC-SR04 (VCC an 5V, Trig an Pin 7, Echo an Pin 6, GND an GND),
// im setup(): pinMode(7, OUTPUT); pinMode(6, INPUT); Serial.begin(9600);
// im loop():
//   digitalWrite(7, LOW);  delayMicroseconds(2);
//   digitalWrite(7, HIGH); delayMicroseconds(10);   // kurzer Ping
//   digitalWrite(7, LOW);
//   long dauer = pulseIn(6, HIGH);   // Laufzeit in Mikrosekunden
//   long cm = dauer / 58;            // Entfernung in Zentimetern
//   Serial.println(cm);$q1$, updated_at = now()
  where lesson_id = '41029f8a-4065-4bbb-872a-aa700ccac344' and md5(sketch) = '816bfcb2188a44a778475311b2bfcada';
  if not found then raise exception 'Servo: Lehrer-Lösung trifft nicht'; end if;

  -- 2. Transistor
  select content->'explanation'->>'html' into h from public.lessons where id = '0721f031-6fae-4ed6-96b3-b0d44f715434';
  if md5(h) <> 'af7bdbb218ca664fdb60e226b2daf709' then raise exception 'Transistor: Alt-Stand passt nicht'; end if;
  h := left(h, position($q2$

        <hr class="section-divider">

        <div class="info-card" style="border-left: 3px solid #2980B9;">
          <h3>Plus-Box: Drehzahl regeln mit PWM</h3>$q2$ in h) - 1) || E'\n      ';
  if md5(h) <> '3529ded304c1a150572522daa91e43b1' then raise exception 'Transistor: neuer Text weicht ab'; end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(h)) where id = '0721f031-6fae-4ed6-96b3-b0d44f715434';

  update public.lesson_solutions set didactics = replace(didactics, $q3$PWM hier nur als Plus-Box (analogWrite für Drehzahl).$q3$, $q4$PWM kommt hier nur als Zusatzaufgabe im Praxisteil vor (analogWrite für Drehzahl).$q4$), updated_at = now()
  where lesson_id = '0721f031-6fae-4ed6-96b3-b0d44f715434'
    and (length(didactics) - length(replace(didactics, $q5$PWM hier nur als Plus-Box (analogWrite für Drehzahl).$q5$, ''))) = 53;
  if not found then raise exception 'Transistor: Didaktik-Hinweis trifft nicht'; end if;
end $do$;
commit;

-- ===== Teil 2 von 4 =====
begin;
do $do$
declare
  h text;
  b text;
begin
  select content->'explanation'->>'html' into h from public.lessons where id = '2a1bc144-f9b6-4e9c-a594-a128f72c6594';
  if md5(h) <> '09d8aab23abc5ea65d74a408fa7f8205' then raise exception 'ampel-mit-fussgaengerueberweg: Alt-Stand passt nicht'; end if;
  h := replace(h, '<rect x="488" y="334" width="44" height="60"', '<rect x="488" y="334" width="58" height="60"');
  h := replace(h, '<rect x="494" y="340" width="32" height="42"', '<rect x="494" y="340" width="52" height="42"');
  h := replace(h, '<circle cx="510" cy="361" r="10"', '<circle cx="520" cy="361" r="10"');
  h := replace(h, '<text x="510" y="364" text-anchor="middle" font-size="6"', '<text x="520" y="364" text-anchor="middle" font-size="6"');
  h := replace(h, '<circle cx="520" cy="372" r="2.5"', '<circle cx="540" cy="372" r="2.5"');
  h := replace(h, '<line x1="520" y1="372" x2="520" y2="455"', '<line x1="540" y1="372" x2="540" y2="455"');
  h := replace(h, '<text x="535" y="420" font-size="7"', '<text x="534" y="420" text-anchor="end" font-size="7"');
  h := replace(h, '<line x1="520" y1="382" x2="520" y2="372"', '<line x1="540" y1="382" x2="540" y2="372"');
  h := replace(h, '<text x="535" y="430" font-size="7"', '<text x="534" y="430" text-anchor="end" font-size="7"');
  h := replace(h, 'Sp.23-24', 'Sp.23/25');
  h := replace(h, 'GND (Sp.24)', 'GND (Sp.25)');
  h := replace(h, 'Sp.24 Reihe f (GND-Bruecke)', 'Sp.25 Reihe f (GND-Bruecke)');
  h := replace(h, 'Jumper Sp.24 Reihe f', 'Jumper Sp.25 Reihe f');
  if md5(h) <> '60722f74802329a8ccd963a3b30698fe' then raise exception 'ampel-mit-fussgaengerueberweg: neuer Text weicht ab'; end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(h)) where id = '2a1bc144-f9b6-4e9c-a594-a128f72c6594';

  -- Bild-Kopie im Praxisteil nachziehen
  b := substring(h from '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 700".*?</svg>');
  if b is null or md5(b) <> '3908c0cb4b0d17a04cba6b602be54fc4' then raise exception 'ampel-mit-fussgaengerueberweg: Steckbrett-Bild passt nicht'; end if;
  update public.lessons
  set content = jsonb_set(content, '{praxis,anschluss,svg}', to_jsonb($q6$<figure class="schaltbild-figur"><figcaption><strong>Aufbau am Steckbrett</strong> &mdash; so sieht der echte Aufbau aus:</figcaption>$q6$ || b || '</figure>'))
  where id = '2a1bc144-f9b6-4e9c-a594-a128f72c6594' and md5(content->'praxis'->'anschluss'->>'svg') = '4be9a690d4737c05e7d80e89bb706056';
  if not found then raise exception 'ampel-mit-fussgaengerueberweg: Praxis-Bild trifft nicht'; end if;

  update public.lessons
  set content = jsonb_set(content, '{praxis,anschluss,schritte,8}', to_jsonb(replace(content->'praxis'->'anschluss'->'schritte'->>8, $q7$ <em>Im Bild ist der Taster etwas schmaler gezeichnet.</em>$q7$, '')))
  where id = '2a1bc144-f9b6-4e9c-a594-a128f72c6594' and md5(content->'praxis'->'anschluss'->'schritte'->>8) = '9874820a8b241ba027d5136cfbfb4d84';
  if not found then raise exception 'ampel-mit-fussgaengerueberweg: Schritt 9 trifft nicht'; end if;
end $do$;
commit;

-- ===== Teil 3 von 4 =====
begin;
do $do$
declare
  h text;
  b text;
begin
  select content->'explanation'->>'html' into h from public.lessons where id = 'f90fcd75-5d30-4895-b575-4ccb6cc9b453';
  if md5(h) <> '6bedce8b343c27463b8e0767d25e8bba' then raise exception 'nachtabschaltung-mit-lichtsensor: Alt-Stand passt nicht'; end if;
  h := replace(h, '<rect x="488" y="334" width="44" height="60"', '<rect x="488" y="334" width="58" height="60"');
  h := replace(h, '<rect x="494" y="340" width="32" height="42"', '<rect x="494" y="340" width="52" height="42"');
  h := replace(h, '<circle cx="510" cy="361" r="10"', '<circle cx="520" cy="361" r="10"');
  h := replace(h, '<text x="510" y="364" text-anchor="middle" font-size="6"', '<text x="520" y="364" text-anchor="middle" font-size="6"');
  h := replace(h, '<circle cx="520" cy="372" r="2.5"', '<circle cx="540" cy="372" r="2.5"');
  h := replace(h, '<line x1="520" y1="372" x2="520" y2="455"', '<line x1="540" y1="372" x2="540" y2="455"');
  h := replace(h, '<text x="535" y="420" font-size="7"', '<text x="534" y="420" text-anchor="end" font-size="7"');
  h := replace(h, 'Sp.23-24', 'Sp.23/25');
  if md5(h) <> 'f34b92a8571ef1ccbb33b1aa89b88cf3' then raise exception 'nachtabschaltung-mit-lichtsensor: neuer Text weicht ab'; end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(h)) where id = 'f90fcd75-5d30-4895-b575-4ccb6cc9b453';

  -- Bild-Kopie im Praxisteil nachziehen
  b := substring(h from '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 760".*?</svg>');
  if b is null or md5(b) <> '28f3fa9bf6f3dc4ffccdc4b69f29e385' then raise exception 'nachtabschaltung-mit-lichtsensor: Steckbrett-Bild passt nicht'; end if;
  update public.lessons
  set content = jsonb_set(content, '{praxis,anschluss,svg}', to_jsonb($q8$<figure class="schaltbild-figur"><figcaption><strong>Aufbau am Steckbrett</strong> &mdash; so sieht der echte Aufbau aus:</figcaption>$q8$ || b || '</figure>'))
  where id = 'f90fcd75-5d30-4895-b575-4ccb6cc9b453' and md5(content->'praxis'->'anschluss'->>'svg') = '2ad8122891cca7b0330e9cd54e5169a1';
  if not found then raise exception 'nachtabschaltung-mit-lichtsensor: Praxis-Bild trifft nicht'; end if;
end $do$;
commit;

-- ===== Teil 4 von 4 =====
begin;
do $do$
declare
  h text;
  b text;
begin
  select content->'explanation'->>'html' into h from public.lessons where id = '25cb4288-918b-4294-8c8d-8e07ba85bbe3';
  if md5(h) <> '3b85d7ddf03855806059d8605a19dcaa' then raise exception 'pruefungsschaltung-komplett: Alt-Stand passt nicht'; end if;
  h := replace(h, '<rect x="488" y="334" width="44" height="60"', '<rect x="488" y="334" width="58" height="60"');
  h := replace(h, '<rect x="494" y="340" width="32" height="42"', '<rect x="494" y="340" width="52" height="42"');
  h := replace(h, '<circle cx="510" cy="361" r="10"', '<circle cx="520" cy="361" r="10"');
  h := replace(h, '<text x="510" y="364" text-anchor="middle" font-size="6"', '<text x="520" y="364" text-anchor="middle" font-size="6"');
  h := replace(h, '<circle cx="520" cy="372" r="2.5"', '<circle cx="540" cy="372" r="2.5"');
  h := replace(h, '<line x1="520" y1="372" x2="520" y2="455"', '<line x1="540" y1="372" x2="540" y2="455"');
  h := replace(h, '<text x="535" y="420" font-size="7"', '<text x="534" y="420" text-anchor="end" font-size="7"');
  h := replace(h, '<line x1="520" y1="382" x2="520" y2="372"', '<line x1="540" y1="382" x2="540" y2="372"');
  h := replace(h, '<text x="535" y="430" font-size="7"', '<text x="534" y="430" text-anchor="end" font-size="7"');
  h := replace(h, 'Sp.23-24', 'Sp.23/25');
  h := replace(h, 'Sp.24 Reihe f (zur GND-Schiene)', 'Sp.25 Reihe f (zur GND-Schiene)');
  h := replace(h, 'Jumper Sp.24 Reihe f', 'Jumper Sp.25 Reihe f');
  h := replace(h, '(siehe Modul 4, Lektion 2, Plus-Box PWM)', '(wie beim Dimmen in Modul 3, Lektion 3)');
  h := replace(h, '<td>Summer-Abschnitt in <a href="/modul/aktoren/servomotor-ansteuern">Servomotor ansteuern</a></td>', '<td>&ndash;</td>');
  if md5(h) <> 'bb61e96a9a04218277308647a0f4a4d8' then raise exception 'pruefungsschaltung-komplett: neuer Text weicht ab'; end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(h)) where id = '25cb4288-918b-4294-8c8d-8e07ba85bbe3';
end $do$;
commit;
