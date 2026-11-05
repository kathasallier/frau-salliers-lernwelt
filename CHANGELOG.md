# Änderungen

## 0.39 – abwechslungsreiche integrierte Übungen und Testvorbereitung

- Die bisherigen monotonen Algorithmus-Fragefolgen ersetzt: Übung 1–3 enthalten
  jeweils drei Abschnitte mit vier gemischten Aufgaben, insgesamt 36 verschiedene
  Aufgaben. Themen aus „Wissen anwenden“ und „Alltagsabläufe anwenden“ sind
  integriert; die beiden separaten Katalogeinträge entfallen.
- Auswahl, Zuordnung, Reihenfolgen, Rechen-/Zählaufgaben, Such-/Sortierzustände,
  Diagramme und eigene Anweisungen werden kombiniert. Alle bekannten
  Anwendungsthemen bleiben vertreten: Tee, Marmeladenbrot, präzise Anweisungen,
  Geschichte, Händewaschen, Schulranzen, Ampel, Schleifen, beide Sortierverfahren,
  lineare Suche, Schuhe binden, Wegplan, Supermarkt, Labyrinth, Wetter und EVA.
- Der Abschlusstest beginnt mit sechs eigenständigen Vorbereitungsaufgaben.
  Nach Zugangscode folgen 20 neue geschlossene Aufgaben ausschließlich zum
  Auswählen, Zuordnen und Reihenfolgenlegen. Zahlen und Sortierzustände werden
  ebenfalls ausgewählt; keine Antwort muss selbst eingetippt werden. Die 20
  Aufgaben ergeben 20 automatisch kontrollierte Punkte, mit den
  bisherigen Notengrenzen. Vorbereitung und Test wiederholen keine Aufgaben aus
  den drei Übungsteilen. Insgesamt 62 eindeutige Aufgabenstellungen/IDs werden
  beim Laden auf Duplikate geprüft.
- Freie Texte und Pläne bleiben ausdrücklich Selbstkontrolle, mit Beispielen
  und Prüffragen ohne automatische Inhaltsbewertung. Geschlossene Punkte und
  freie Aufgaben werden in der Auswertung getrennt. Eine einzelne Reihenfolge
  kann zurückgesetzt werden; Zahleneingaben akzeptieren gleichwertige Formate.
- Alle Algorithmus-Merkteile neu gegliedert und an passende Lernseiten gebunden.
  Vollständiges Zähneputzen-Beispiel erhalten; ungültige verschachtelte Absätze
  in der Druckdarstellung bereinigt.
- Aufgabenabbildungen erhalten eigene SVG-IDs, damit Pfeile nach Lernseiten-
  Wechseln nicht auf ausgeblendete Marker verweisen. Tür-/Ausgangsöffnungen im
  schematischen Wegplan sichtbar gemacht. Neue Übungs- und Testdruckausgaben
  enthalten auch Diagramme und Teilfragen.
- Hardware, Binärsystem, ihre Übungen, Tests, Lösungen, Merkteile und Testcodes
  unverändert. Algorithmen bleibt in Klasse 6. Eigenständige Offline-Datei
  weiterhin verfügbar. Versionierte Skript-/Stil-URLs verhindern Mischstände
  mit älteren Browserdateien bei der Veröffentlichung.

### Prüfung

15 Browser-Funktionstests für alle 13 registrierten Module, jeweils gegen die
Projektversion und die exportierte Einzeldatei bei gesperrtem Netzwerk.
Prüfungen umfassen sämtliche Übungen, alle drei Tests, Vorbereitung und
Zugangscode, richtige/falsche Zuordnungen und Zahlenreihen, Reihenfolge-Neustart,
freie Texte/Diagramme, 62 eindeutige Aufgaben, Merkteilgliederung, SVG-Marker,
Mobilansicht sowie Aufgaben-, Ergebnis-, Merkteil- und Testdruck mit PDF-Erzeugung.
Die gemischte Aufgabenseite, Vorbereitung und Merkteile wurden visuell geprüft.
Unbeteiligte Daten und Merkteile wurden mit 0.38 verglichen.

## 0.38 – eigenständige Lernwelt und Offline-Einzeldatei

- Verweise und notwendige Bezüge auf Buch, Übungsheft, Seitenzahlen und externe
  Aufgabenabbildungen aus Lerntexten, Aufgaben, Merkteilen und Bildunterschriften
  entfernt. Fachliche Inhalte und funktionierende Abläufe bleiben erhalten.
- Die beiden Übungsbereiche heißen „Wissen anwenden“ und „Alltagsabläufe
  anwenden“. Interne Modul-IDs, Antwortfelder und Auswertungsmechanismen bleiben
  erhalten; bestehende Aufgaben, Lösungen, Testcodes, Hardware- und Binärinhalte
  wurden mit 0.37 verglichen und sind unverändert.
- Händewaschen ist direkt dargestellt. Wegbeschreibung und Traktor-Labyrinth
  nutzen eigene vollständige Übungspläne statt externer Buchfotos. Das Labyrinth
  besitzt Koordinaten und eine zugängliche Liste seiner Wege; der Hof ist
  erreichbar. Eigene Texte und Pläne sind weiter druckbar.
- Originalfoto-Links und die davon abhängige Druckoption entfernt. Archivierte
  Quelldateien bleiben im Repository erhalten, werden aber nicht geladen.
- `scripts/build_offline.py` erzeugt die einzelne Datei
  `dist/Frau-Salliers-Lernwelt-0.38.html` mit eingebetteten Skripten, Stilen und
  Bilddaten. Sie benötigt weder zusätzliche Dateien noch einen Server.

### Prüfung

14 Browser-Funktionstests bestanden gegen die Projektversion und zusätzlich
14 gegen die exportierte Einzeldatei bei gesperrtem Netzwerk. Dabei werden
Navigation aller 15 Module, sämtliche Übungen, Tests, eigene Texte/Diagramme,
Mobilansicht, Neustart und Druck-/PDF-Funktionen geprüft. Jede nachgeladene
Ressource lässt den Offline-Lauf fehlschlagen. Die neuen Übungspläne werden auf
Erreichbarkeit und in der Druckausgabe geprüft; sichtbare Materialverweise werden
zusätzlich gesucht. Der verwaltete Browser sperrt direkte `file://`-Navigationen;
dieser konkrete Öffnungsweg ist dort nicht als getestet angegeben.

Keine Veröffentlichung und kein Git-Push dieser Version.

## 0.37

- Die Lösungsseite 18 zu Aufgaben 7–11 und die vier Buchseiten 38–41 sind
  ausgewertet. Der Quellenumfang umfasst nun 20 Fotos.
- Wichtige Korrektur nach der nachgereichten Lösung: Im Ampel-Diagramm führt
  „Warten“ zurück zur Frage. Nur bei Ja folgt das Überqueren mit anschließendem
  Ende. Die bisherigen beiden Endwege wurden durch den korrekten Rückweg ersetzt.
- Die drei Buchbedingungen Eindeutigkeit, Ausführbarkeit und Endlichkeit sind in
  Lerntexten, Zusammenfassung und Merkteilen ausdrücklich erklärt. Schrittfolge
  bleibt Bestandteil der Eindeutigkeit und wird mit der Übungsheftformulierung
  „Schritt für Schritt“ verbunden. Ausführbarkeit ist keine bloße Zusatzbedingung.
- Drei neue Abbildungen und Lernseiten behandeln die Pfannkuchen-Sequenz,
  Händewaschen in Befehlsform und Algorithmus/Programmiersprache/Programm mit EVA.
  Das Ausführbarkeits-Beispiel illustriert jetzt passend zum Buch aufgeschlagene
  Eier statt eines allgemeinen Mondflug-Beispiels. Insgesamt 35 Lernabbildungen.
- „Mit dem Buch üben“ ergänzt sieben Bereiche: Buchbedingungen, Händewaschen,
  Fluchtweg, Geschichte, Supermarktanweisungen, Labyrinth und EVA/Programm.
  Die drei Bedingungen und die Geschichtenreihenfolge werden geprüft; eigene
  Wege, Texte und Pläne bleiben ausdrücklich Selbstkontrollaufgaben.
- Vier Originalfotos sind bytegetreu eingebunden und zum Vergrößern verfügbar.
  Ein optionaler Druckmodus gibt sie mit aus; standardmäßig werden Aufgaben,
  eigene Antworten und Diagramme gedruckt. Druckzustände werden wiederhergestellt.
- Musterantworten zu Schulranzen und Wetter sind aus der neuen Lösungsseite
  ergänzt; Zählerergebnis und Bubble-Sort-Fortsetzung stimmen damit überein.
- Alle bisherigen Übungs- und Testaufgaben, Lösungen, Testcodes und übrigen
  Lernbereiche bleiben unverändert. Algorithmen bleibt ausschließlich Klasse 6.

### Prüfung

Nach dem Buchabgleich und der Ampelkorrektur bestanden die zwölf bisherigen
Browser-Testfälle. Nach Ergänzung des Buchbereichs bestehen dreizehn Testfälle
für alle 15 Module, einschließlich korrekter/falscher Buchzuordnungen und
Geschichtenreihenfolgen, aller Originalfotos, eigener Texte und Diagramme,
Mobilansicht, Neustart und beider Druckvarianten mit PDF-Erzeugung. Die übrige
Navigation, sämtliche Übungen, Tests und Druckfunktionen bleiben geprüft.
Bestandsaufgaben wurden zusätzlich verglichen und die vier Fotokopien per
SHA-256-Abgleich als unverändert bestätigt. Neue Lernabbildungen und Ampel-
Rückweg wurden auch visuell im Browser kontrolliert.

## 0.36

- Fünf weitere Fotos der Seiten 13–17 sind abgeglichen. Der dokumentierte
  Quellenumfang umfasst jetzt fünfzehn Fotos der Seiten 3–17.
- Die lineare Suche zeigt das Quellenbeispiel mit sieben Karten: In
  [7, 3, 9, 1, 5, 8, 2] wird die 5 nach fünf Prüfungen gefunden. Die letzten
  beiden Karten sind sichtbar als nicht geprüft gekennzeichnet.
- Die Quellenübung enthält alle Aufgaben 1–14. Neu sind die vier Zustände von
  Insertion Sort für [4, 1, 5, 2, 3], Suchweg und Schrittzahl zur 6 in
  [4, 9, 2, 7, 6, 1, 5] sowie die freie Fehlerkorrektur zum Schuhebinden.
- 21 geschlossene Teilantworten werden automatisch geprüft. Bei Insertion Sort
  wird auch der unveränderte Zustand beim Einsortieren der 5 erwartet. Die
  freie Detektivaufgabe erhält Hinweise zur Selbstkontrolle statt einer
  automatischen Inhaltsbewertung.
- Das Glossar mit 13 Begriffen ist im Übungsbereich und im Druck enthalten.
  Die bereitgestellte Lösungsseite zu Aufgaben 1–6 ist abgeglichen; das
  siebenstufige Teebeispiel und die Präzisierungsbeispiele sind ergänzt und
  als mögliche Lösungen zur Selbstkontrolle gekennzeichnet.
- Bestehende Übungen, Tests, Lösungen, Hardware- und Binärinhalte bleiben
  unverändert. Algorithmen bleibt ausschließlich in Klasse 6.

### Prüfung

Nach Anpassung des Suchbeispiels bestanden die elf bisherigen Testfälle.
Nach den neuen Aufgaben bestehen zwölf Browser-Testfälle für alle 14 Module.
Die neuen Unterfälle prüfen korrekte und falsche Insertion-Sort-Zustände,
Abbruch der Suche beim Treffer, volle 21 Punkte, freie Fehlerkorrektur, Glossar,
Beispielantworten, Druckausgabe, Mobilansicht und Neustart. Alle bisherigen
Navigationen, Übungen, Tests und Druckfunktionen bleiben Teil jedes vollständigen
Laufs. Suchabbildung und Glossar wurden zusätzlich visuell kontrolliert.

## 0.35

- Fünf weitere bereitgestellte Seiten (8–12) wurden abgeglichen; der dokumentierte
  Quellenumfang umfasst nun zehn Fotos der Seiten 3–12.
- Die Wetter-Verzweigung enthält die gemeinsame Folgeaktion „Zur Schule gehen“.
  Die Schleife zeigt das vollständige Beispiel „Aufgaben fertig?“: Nein führt
  zu „Eine Aufgabe lösen“ und zurück zur Prüfung, Ja zu „Spielen gehen“ und Ende.
- Zähl- und Bedingungsschleife verwenden die Quellenbeispiele zehnmal Hampelmann
  und Wasser eingießen, solange das Glas nicht voll ist.
- Bubble Sort und Insertion Sort zeigen die fünf Karten [5, 2, 4, 1, 3] mit
  allen auf den Fotos dargestellten Zuständen. Der erste Bubble-Sort-Durchgang
  endet ausdrücklich noch nicht mit einer vollständig sortierten Liste.
- Die Quellenübung enthält zusätzlich Aufgaben 8–11: eigene Wetterbedingung,
  bearbeitbarer Ampel-Ablaufplan, Zählerschleife und Fortsetzung von Bubble Sort.
  Fünfzehn geschlossene Teilantworten werden geprüft; Aufgaben 2, 3, 7, 8 und 9
  bleiben Selbstkontrollaufgaben. Eigene Verzweigungen sind mit ausdruckbar.
- Alle bisherigen Übungs- und Testaufgaben, Lösungen und übrigen Lernbereiche
  bleiben erhalten. Algorithmen bleibt ausschließlich Klasse 6 zugeordnet.

### Prüfung

Nach dem Diagrammabgleich bestanden die zehn bisherigen Browser-Testfälle.
Nach den neuen Aufgaben bestehen elf Testfälle mit zusätzlichen Prüfungen für
beide vollständigen Sortierfolgen, Schleifenanzahl 4, richtige/falsche Tausche,
Wetter-/Ampel-Eingaben, Mobilansicht, Neustart und PDF-Ausgabe. Navigation aller
14 Module, sämtliche bestehenden Übungen, Tests und Druckfunktionen werden in
jedem vollständigen Lauf weiterhin geprüft. Die vier Quellenabbildungen wurden
zusätzlich visuell kontrolliert.

## 0.34

- Die fünf nachgereichten Fotos der Übungsheftseiten 3–7 wurden ausgewertet und
  mit den Lernseiten abgeglichen. Die zuvor offene Quellenprüfung ist für diese
  fünf Seiten erledigt; siehe `docs/unterrichtsunterlagen.md`.
- Die Quellenmerkmale „eindeutig“, „Schritt für Schritt“ und „endlich“ werden in
  Lerntexten, Zusammenfassung und Merkteilen ausdrücklich erklärt. Die bisherige
  Ausführbarkeit bleibt als zusätzliche Prüfung erhalten.
- Das Zähneputzen-Diagramm ist vollständig: sechs Aktionen zwischen Start und
  Ende, einschließlich „3 Minuten putzen“, Mund ausspülen, Zahnbürste ausspülen
  und Zahnbürste wegstellen. Der gedruckte Merkteil enthält denselben Ablauf.
- Die Teeanleitung zeigt fünf Schritte statt einer verkürzten Dreierfolge.
- Die zusätzliche Übung „Mit den Unterlagen üben“ enthält alle sieben Aufgaben:
  Beispiele einordnen, Teealgorithmus, ungenaue Anweisungen, Marmeladenbrot,
  Symbolzuordnung, Aktionen zählen und einen eigenen Schulranzen-Ablaufplan.
- Geschlossene Antworten werden automatisch geprüft (zehn Teilantworten).
  Freie Formulierungen und eigene Pläne erhalten Strukturhinweise und
  Selbstkontrollhilfen, keine automatische inhaltliche Bewertung. Eine sinnvolle
  alternative Reihenfolge beim Schließen des Marmeladenglases wird akzeptiert.
- Der eigene Ablaufplan ist mit vier bis acht Aktionen bearbeitbar und gemeinsam
  mit den eigenen Antworten als PDF druckbar. Eingaben werden sicher als Text
  dargestellt und nicht gespeichert oder übertragen.
- Alle bisherigen Übungs-/Testaufgaben, Lösungen, Testcodes, Hardware- und
  Binärinhalte sind unverändert. Algorithmen bleibt ausschließlich in Klasse 6.
  Die vorhandenen Schleifen- und Sortierthemen bleiben erhalten.

### Prüfung

Nach dem Quellenabgleich bestanden alle acht bisherigen Browser-Testfälle.
Nach Ergänzung der Quellenübung bestehen zehn Testfälle für alle 14 Module:
zusätzlich werden die sechs Aktionen, gedruckte Quellenmerkmale, sämtliche sieben
Quellenaufgaben, Auswertung, eigene Texte/Diagramme, Mobilansicht, Neustart und
PDF-Ausgabe geprüft. Die vollständige bisherige Navigation, alle normalen und
Hardwareübungen sowie die drei Tests mit ihren Druckfunktionen werden weiterhin
in jedem vollständigen Testlauf geprüft. Quellen- und eigener Ablaufplan wurden
auch visuell im Browser kontrolliert.

## 0.33

- Algorithmen ist in allen sieben zugehörigen Modulen ausschließlich Klasse 6
  zugeordnet. Klasse 5 bietet weiterhin Hardware und Software; Binärsystem und
  sämtliche übrigen funktionierenden Bereiche bleiben erhalten.
- Die bisherige Stichwort-Heuristik für Abbildungen wurde entfernt. Sie zeigte
  auf vielen unterschiedlichen Lernseiten dieselben Standarddiagramme und
  verwechselte teilweise die Art der Darstellung.
- 32 seitenbezogene SVG-Abbildungen ersetzen die wiederholten Diagramme und
  reinen Symbolzeilen: Alltagsanleitungen, Eigenschaften, Ablaufsymbole,
  Entscheidungen, Wiederholungen, lineare Suche, Bubble Sort und Insertion Sort.
  Jede Grafik besitzt eine eigene Bildunterschrift, zugängliche Beschreibung
  und eindeutige SVG-IDs. Vorhandene Hardware- und Binärabbildungen bleiben erhalten.
- Die Schleife zeigt eine klare Frage in der Raute, einen Nein-Weg zur Aktion,
  einen kreuzungsfreien Rückweg links und einen separaten Ja-Weg zum Ende rechts.
  Zähl- und Bedingungsschleife erhalten eine eigene Vergleichsdarstellung.
- Lerntexte, Beispiele, Fragen, Lösungen, Merkteile, eingebettete Bestandsbilder
  und Testcodes stimmen unverändert mit 0.32 überein. Geändert wurden nur die
  Klassen-Zuordnung und die visuelle Darstellung.

### Prüfung

Nach der Klassenänderung wurde die vollständige Funktionsprüfung ausgeführt;
nach den Grafikänderungen einschließlich Korrekturen erneut. Abschließend
bestehen alle acht Chromium-Testfälle: Navigation aller 13 Module, sämtliche
Lernseiten und Wissenschecks, alle normalen Übungsseiten, alle Hardwarestufen,
Neustart/Modulwechsel und die drei vollständigen Tests. Die Druckschaltflächen
für Merkteile, Übungs- und Testergebnisse und Test-Druckversionen werden geprüft;
aus allen Ausgabetypen werden PDFs erzeugt. Die 32 neuen Grafiken werden auf
Beschriftungsgrenzen, eindeutige IDs und Mobilansicht geprüft und ebenfalls in
PDFs ausgegeben. SVG-Montagen wurden zusätzlich visuell kontrolliert.

### Noch offen: Buchseiten

Die genannten Unterrichtsunterlagen und insbesondere die Buchseiten liegen in
dieser Arbeitsumgebung nicht vor. Der Abgleich mit ihnen ist daher noch offen;
es wurden keine zusätzlichen fachlichen Inhalte als daraus abgeleitet ausgegeben.
Die Bereitstellung der Unterlagen ist für diesen Abgleich erforderlich.

## 0.32

### Befunde und Korrekturen

- Ein `tasks.splice(...)` reduzierte beim Laden den gesamten Katalog auf das
  Thema Algorithmen. Dadurch waren die vollständig vorhandenen Binär- und
  Hardwaremodule einschließlich ihrer Übungen nicht erreichbar. Diese
  Einschränkung wurde entfernt; alle 13 Module bleiben registriert.
- Die drei zuvor sichtbaren Algorithmusübungen ließen sich im untersuchten
  Ausgangsstand starten. Ein genereller Startfehler dieser sichtbaren Übungen
  war nicht reproduzierbar. Die neuen Tests prüfen zusätzlich komplette
  Durchläufe statt nur den Einstieg.
- Die Illustrationsfunktion lieferte für alle Nicht-Algorithmusmodule einen
  leeren Inhalt. Vorhandene Hardwarebilder und Binärdarstellungen werden jetzt
  wieder angezeigt.
- Verschachtelte Sonderfälle für den Start, die Auswertung und den Übergang vom
  Lernen zum Üben wurden durch gemeinsame Modi, Aufgaben-Engines und explizite
  Modulverbindungen ersetzt. Bearbeitungszustände werden zentral zurückgesetzt.
- Ungültige Modul-IDs werden abgefangen; die Registrierung prüft fehlende
  Aufgabendaten und doppelte IDs. Tests ohne konfigurierten Zugang starten nicht.
- Rücknavigation entfernt veraltete nachfolgende Auswahlwerte. Gemeinsam für
  mehrere Klassen angebotene Module zeigen die tatsächlich gewählte Klasse.
- Übungsseiten und Punktesummen richten sich nach den registrierten Fragen;
  feste Annahmen von fünf Seiten mit zehn Aufgaben wurden im allgemeinen
  Übungsablauf entfernt.
- Lernen, Üben und Testen werden im Themenregal als eigene Bereiche dargestellt.
- HTML, Gestaltung, Lerninhalte und Ablaufsteuerung liegen in getrennten Dateien.
  Lerntexte, Aufgaben, Antworten, Testcodes und eingebettete Bilder wurden
  beibehalten. Die Versionsnummer wurde von 0.31 auf 0.32 angehoben.

### Prüfung

Sieben automatisierte Chromium-Funktionstests mit Unterfällen für sämtliche
Module; JavaScript-Syntaxprüfung für beide Skripte. Details und ausführbare
Befehle stehen in `README.md`. Keine neuen Inhalte für bislang leere Fächer oder
Klassen wurden erfunden.
