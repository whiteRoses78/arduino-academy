-- Umzug der aus M2 Lektion 5 entfernten Inhalte dorthin, wo sie zuerst gebraucht werden
-- (11.10.2026). Gehört zu m2-l5-schlank.sql.
--   1. Merkkasten "Vergleichen und Verknüpfen" -> Modul 3, PWM (dort stand bisher nur ein Verweis)
--   2. bool in einem Halbsatz                   -> Modul 2, Ampel (Hilfsfunktion nutzt bool)
--   3. Umschalter (bool, !, &&, letzterDruck)   -> Modul 5, Prüfungsschaltung/Lüftung
begin;

do $do$
declare
  f text;
  t text;
begin
  -- 1. PWM: Verweis-Satz raus, Merkkasten direkt dahinter
  f := $f$ Alle Zeichen stehen im Merkkasten in <a href="/modul/digital/led-mit-taster-steuern">Modul 2, Lektion 5 &bdquo;LED mit Taster steuern&ldquo;</a>.
        </div>$f$;
  t := $t$ Alle Zeichen stehen im Merkkasten direkt darunter.
        </div>

        <div class="info-card" style="border-top: 3px solid #2176AE;">
          <h3>Merkkasten: Vergleichen und Verknüpfen</h3>
          <p>In einer Bedingung vergleichst du zwei Werte. Aus Mathe kennst du &le;, &ge; und &ne;. Die gibt es auf der Tastatur nicht, darum schreibt man sie im Code mit zwei Zeichen:</p>
          <table class="icon-table">
            <tr><th>Im Code</th><th>In Mathe</th><th>Bedeutung</th><th>Beispiel</th></tr>
            <tr><td><code>==</code></td><td>=</td><td>gleich</td><td><code>zustand == LOW</code></td></tr>
            <tr><td><code>!=</code></td><td>&ne;</td><td>ungleich</td><td><code>zustand != LOW</code> (Taster nicht gedrückt)</td></tr>
            <tr><td><code>&lt;</code></td><td>&lt;</td><td>kleiner als</td><td><code>wert &lt; 300</code></td></tr>
            <tr><td><code>&gt;</code></td><td>&gt;</td><td>größer als</td><td><code>wert &gt; 700</code></td></tr>
            <tr><td><code>&lt;=</code></td><td>&le;</td><td>kleiner oder gleich</td><td><code>helligkeit &lt;= 0</code></td></tr>
            <tr><td><code>&gt;=</code></td><td>&ge;</td><td>größer oder gleich</td><td><code>helligkeit &gt;= 255</code></td></tr>
          </table>
          <p style="margin-top:0.75rem;">Mehrere Bedingungen verknüpfst du so:</p>
          <ul>
            <li><code>&amp;&amp;</code> heißt <strong>UND</strong>: Die Bedingung ist nur wahr, wenn <strong>beide</strong> Teile wahr sind.</li>
            <li><code>||</code> heißt <strong>ODER</strong>: Die Bedingung ist wahr, wenn <strong>mindestens einer</strong> der Teile wahr ist. Den senkrechten Strich tippst du am Mac mit <code>⌥ + 7</code>, unter Windows mit <code>AltGr + &lt;</code>.</li>
          </ul>
          <div class="analogy-box">
            <strong>Alltagsanalogie:</strong> &bdquo;Ich gehe raus, wenn es trocken ist UND ich Zeit habe.&ldquo; Hier muss beides stimmen (<code>&amp;&amp;</code>). &bdquo;Ich nehme den Bus, wenn es regnet ODER ich spät dran bin.&ldquo; Hier reicht ein Grund (<code>||</code>).
          </div>
        </div>$t$;
  update public.lessons
  set content = jsonb_set(content, '{explanation,html}', to_jsonb(replace(content->'explanation'->>'html', f, t)))
  where id = '4bf4e7fc-3713-42b1-92f0-a6cd292f74b0'
    and md5(content->'explanation'->>'html') = '38cb80ed1b203e5d3c66bdc64e6eee3b'
    and (length(content->'explanation'->>'html') - length(replace(content->'explanation'->>'html', f, ''))) = length(f);
  if not found then raise exception 'PWM: Verweis-Satz trifft nicht genau einmal'; end if;

  -- 2. Ampel: bool kurz erklären (wurde bisher in Lektion 5 eingeführt)
  f := $f$Die Platzhalter in der Klammer der Funktion heißen <strong>Parameter</strong>. Und <code>digitalWrite()</code> versteht auch <code>true</code> (= HIGH) und <code>false</code> (= LOW).$f$;
  t := $t$Die Platzhalter in der Klammer der Funktion heißen <strong>Parameter</strong>. Neu ist das Wort <code>bool</code>: So heißt ein Datentyp, der nur zwei Werte kennt, nämlich <code>true</code> (wahr, an) und <code>false</code> (falsch, aus). Und <code>digitalWrite()</code> versteht auch <code>true</code> (= HIGH) und <code>false</code> (= LOW).$t$;
  update public.lessons
  set content = jsonb_set(content, '{explanation,html}', to_jsonb(replace(content->'explanation'->>'html', f, t)))
  where id = '797263ef-56c1-4a6d-9dff-ad745c330c1a'
    and md5(content->'explanation'->>'html') = '775fe3c6f12dcfee4b5c165d7858ee80'
    and (length(content->'explanation'->>'html') - length(replace(content->'explanation'->>'html', f, ''))) = length(f);
  if not found then raise exception 'Ampel: Parameter-Satz trifft nicht genau einmal'; end if;
end $do$;

do $do$
declare
  lid uuid := '25cb4288-918b-4294-8c8d-8e07ba85bbe3';
  h  text;
  f1 text; t1 text; f2 text; t2 text;
begin
  -- 3. Prüfungsschaltung/Lüftung: Kommentar anpassen + Erklär-Kasten unter dem Code
  select content->'explanation'->>'html' into h from public.lessons where id = lid;
  if md5(h) <> 'c02be32ef920c59e13fb9dcd8a085e2b' then
    raise exception 'Prüfungsschaltung: Alt-Stand passt nicht';
  end if;
  f1 := $f$  <span class="comment">// wie in Modul 2 (LED mit Taster steuern)</span>$f$;
  t1 := $t$  <span class="comment">// (Erklärung im Kasten unter dem Code)</span>$t$;
  f2 := $f$  <span class="function">delay</span>(<span class="value">100</span>);
}</code></pre>
          </div>

          <p><strong>Wenn dich dieses Projekt erwartet, schaue in:</strong> <a href="/modul/aktoren/transistor-als-schalter-grundlagen">$f$;
  t2 := $t$  <span class="function">delay</span>(<span class="value">100</span>);
}</code></pre>
          </div>

          <div class="tip-box">
            <strong>So funktioniert der Umschalter (ein Druck = an, nächster Druck = aus):</strong>
            <ul style="margin-top:0.5rem; margin-left:1.25rem;">
              <li><code>bool</code> ist ein Datentyp mit nur zwei Werten: <code>true</code> (wahr, an) und <code>false</code> (falsch, aus). <code>lueftungAn</code> merkt sich, ob die Lüftung gerade an ist.</li>
              <li>Das Ausrufezeichen <code>!</code> heißt <strong>NICHT</strong> und dreht den Wert um: <code>lueftungAn = !lueftungAn;</code> macht aus <code>true</code> ein <code>false</code> und umgekehrt. Wie ein Lichtschalter.</li>
              <li><code>&amp;&amp;</code> heißt <strong>UND</strong>. <code>gedrueckt &amp;&amp; !letzterDruck</code> bedeutet: Der Taster ist jetzt gedrückt UND war beim letzten Durchlauf noch NICHT gedrückt. Das stimmt nur im ersten Moment eines neuen Drucks.</li>
              <li>Ohne <code>letzterDruck</code> würde der Arduino bei jedem Durchlauf umschalten, solange du den Taster hältst. Die Lüftung würde wild an- und ausgehen.</li>
              <li><code>gedrueckt</code> ist <code>true</code>, wenn der Vergleich <code>digitalRead(tasterPin) == LOW</code> stimmt, also wenn der Taster gedrückt ist. Eine <code>bool</code>-Variable kannst du direkt als Bedingung verwenden: <code>if (lueftungAn)</code> heißt &bdquo;wenn die Lüftung an ist&ldquo;.</li>
            </ul>
          </div>

          <p><strong>Wenn dich dieses Projekt erwartet, schaue in:</strong> <a href="/modul/aktoren/transistor-als-schalter-grundlagen">$t$;
  if (length(h) - length(replace(h, f1, ''))) <> length(f1)
     or (length(h) - length(replace(h, f2, ''))) <> length(f2) then
    raise exception 'Prüfungsschaltung: Fundstellen nicht genau einmal';
  end if;
  update public.lessons
  set content = jsonb_set(content, '{explanation,html}', to_jsonb(replace(replace(h, f1, t1), f2, t2)))
  where id = lid;
end $do$;

commit;
