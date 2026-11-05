# Frau Salliers Lernwelt – Version 0.41

Interaktive Lernwebseite für die Klassen 5–10. Vorhandene Inhalte: Informatik,
Klasse 5 (Hardware und Software), Klasse 6 (Binärsystem) sowie Klasse 6
(Algorithmen). Für weitere Fächer und Klassen zeigt die Navigation einen Hinweis,
solange keine Inhalte hinterlegt sind.

## Starten

Im Projektverzeichnis:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Die Anwendung benötigt keinen Build, Paketmanager, Backenddienst oder Schlüssel.
Alternativ `index.html` im Browser öffnen. Dabei den gesamten Ordner mit `assets/`
beibehalten. Die Oberfläche und Lerninhalte benötigen keine externen Downloads.
Druckausgaben für Tests, Ergebnisse und Merkteile lassen sich über die
Schaltflächen öffnen und als PDF speichern.

Testcodes nicht öffentlich weitergeben. Die vorhandene lokale Codeabfrage ist
für den Unterricht vorgesehen; sie stellt keinen serverseitigen Zugriffsschutz
dar. Codes und Lösungen sind Bestandteil der ausgelieferten Browserdateien.

## Struktur und Erweiterung

- `index.html`: gemeinsame Ansichten für Auswahl, Lernen, Aufgaben und Ergebnisse.
- `assets/content.js`: bestehende Lernseiten, Fragen, eingebettete Bilder,
  Merkteile und der vollständige Modulkatalog `tasks`.
- `assets/learning-images.js`: eingebettete Bildfolge zum Händewaschen und
  realistische Zahnbürste; auch in der Offline-Datei verfügbar.
- `assets/app.js`: Navigation, Darstellung, Auswertung und Ablaufsteuerung.
- `assets/algorithm-activities.js`: gemischte Übungen 1–3, Vorbereitung und
  20-Punkte-Test mit gemeinsamer Darstellung, Auswertung und Druckfunktion.
- `assets/book-workbook.js` und `assets/source-workbook.js`: frühere eigenständige
  Übungsbereiche; seit 0.39 nicht mehr geladen. Die Inhalte sind integriert.
- `assets/practice-maps.js`: integrierter Übungsplan und Traktor-Labyrinth.
- `assets/sources/`: archivierte Originalfotos; keine Laufzeitabhängigkeit.
- `assets/illustrations.js`: explizite Zuordnung und SVG-Darstellung der 35
  Algorithmusabbildungen mit Bildunterschriften und zugänglichen Beschreibungen.
- `assets/styles.css`: bestehende Gestaltung einschließlich Druck- und Mobilansicht.
- `tests/test_functional.py`: Browserregressionen mit eigenem temporären HTTP-Server.

Ein Katalogeintrag hat eine eindeutige `id`, `subject`, `grades`, `topic`, `mode`,
`title` und `description`. Die Modi heißen intern `Lernen`, `Übung` und `Test`;
die Auswahl gruppiert die Einträge als **Lernen**, **Üben** und **Testen**.

`activityModes` steuert Beschriftung und Einstieg. `activityEngines` kapselt die
Aufgabenmechaniken: normale Fragen mit Übungsseiten, Hardwareübungen und
Hardwaretests. `start()` prüft die Modul-ID und gegebenenfalls den Testcode,
setzt den gesamten Bearbeitungszustand zurück und startet den passenden Ablauf.
`finish()` delegiert an dieselbe Engine. Neustarts verwenden denselben Einstieg;
Tests fragen dabei erneut nach ihrem Code.

Neue Lernmodule in `initializeActivities()` mit ihren `slides` und einer
expliziten `practiceId` verbinden. Normale Übungen erhalten `pages`, ein Array
nicht leerer Fragenseiten. Seitenzahlen, Fortschritt und Punktesummen werden aus
diesen Seiten berechnet. Neue Tests benötigen Fragen in `TEST_QUESTIONS` und
einen Zugang in `TEST_CODES`. Spezielle Aufgabenmechaniken erhalten eine eigene
Engine mit `start` und `finish`, die in `initializeActivities()` zugeordnet wird.
Die Registrierung prüft doppelte IDs, Modi und notwendige Daten beim Laden.
Für neue Lernmodule passende Einträge in `notebookEntries` und
`notebookPositions` ergänzen, wenn Merkteile gewünscht sind.

Keine Themen beim Laden aus `tasks` herausfiltern. Fach, Klasse und Thema werden
ausschließlich bei der Navigation gefiltert. Eine Rücknavigation entfernt die
nachfolgenden Auswahlwerte; ein Modulwechsel übernimmt keine alten Antworten.

## Funktionstests

Python 3 und Playwright mit Chromium werden benötigt. Für eine neue lokale
Testumgebung beispielsweise:

```sh
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r requirements-test.txt
python3 -m playwright install chromium
python3 -m unittest discover -s tests -v
```

Die Cloud-Umgebung enthält Python-Playwright und `/usr/bin/chromium` bereits.
Dort wurden die Tests so ausgeführt:

```sh
CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
node --check assets/content.js
node --check assets/illustrations.js
node --check assets/source-workbook.js
node --check assets/algorithm-activities.js
node --check assets/app.js
```

`CHROMIUM_PATH` kann einen anderen Chromium-Pfad wählen. `CHROMIUM_NO_SANDBOX=1`
ist eine optionale Einstellung für isolierte Container; sie ist nicht für den
normalen lokalen Browserbetrieb erforderlich. Die Tests starten und beenden ihren
eigenen Server und Browser und verändern keine Lerninhalte.

Die fünfzehn Testfälle prüfen alle 13 Module: Katalog und Rücknavigation, leere
Klassen/Fächer, sämtliche Lernseiten mit Wissenschecks und passendem Übungsübergang,
alle vier normalen Übungen mit je fünf Seiten und vollständiger Auswertung,
die fünf Hardwarestufen einschließlich Tastaturzuordnung, Neustart und
Modulwechsel, abgebrochene/falsche/richtige Testcodes, Namenspflicht und alle drei
Tests mit vollständiger Punktzahl. Hinzu kommen falsche/unvollständige Antworten,
mobile Breite, gewählte Klassenstufe und 35 unterschiedliche, zugänglich beschriebene
Abbildungen. Die Grafikprüfungen prüfen Beschriftungsgrenzen in Desktop- und
Mobilansicht und den getrennten Rück- und Endweg der Schleife. Klasse 5 wird
explizit auf Hardware und Software, Klasse 6 auf Algorithmen und Binärsystem geprüft.
Unbehandelte JavaScript-Fehler lassen jeden Test fehlschlagen.

Die automatischen Druckprüfungen betätigen die Druckschaltflächen, prüfen den
Druckzustand und erzeugen echte PDFs: alle fünf Merkteil-Sammlungen, alle
Übungsergebnisse, alle Testergebnisse, alle drei Test-Druckversionen sowie
die 35 neuen Abbildungen. Das physische Drucken bzw. der native PDF-Druckdialog
wurde nicht automatisiert. Freie Hardwareerklärungen bleiben wie bisher Selbstkontrollaufgaben.


## Eigenständig lernen und offline ansehen

Die Lernwelt erklärt alle Aufgaben und Beispiele direkt auf der Seite. Unter
**Informatik → Klasse 6 → Algorithmen → Üben** stehen die drei integrierten
Übungen bereit. Die vorherigen Zusatzbereiche „Wissen anwenden“ und
„Alltagsabläufe anwenden“ sind darin aufgegangen. Ihre Methoden und Themen sind
über die Übungen verteilt; es gibt keine zusätzlichen parallelen Einstiege.
Hardware, Binärsystem, ihre Aufgaben und ihre Merkteile bleiben unverändert.

Die drei Übungen enthalten jeweils drei kurze Abschnitte mit vier Aufgaben,
insgesamt 36 unterschiedliche Aufgaben. Gemischt werden Auswahl, Zuordnung,
Reihenfolge, Zählen/Rechnen, Such-/Sortierzustände und eigene Texte/Ablaufpläne.
Zwölf Übungsaufgaben sind freie Selbstkontrolle. Die Punkte zählen ausschließlich
geschlossene Aufgaben; eigene Texte werden weder als richtig noch als falsch
behauptet. Ihre Auswertung enthält Beispiele und konkrete Prüffragen.

**Testen → Abschlusstest: Algorithmen mit Vorbereitung** startet zunächst eine
Vorbereitung mit sechs eigenen Aufgaben. Sie enthält vier geschlossene und zwei
freie Aufgaben. Der eigentliche Test benötigt weiterhin den Zugangscode und
umfasst 20 andere geschlossene Aufgaben für 20 Punkte. Im fertigen Test werden
alle Antworten ausgewählt, zugeordnet oder als Reihenfolge gelegt. Es gibt keine
Aufgaben mit selbst einzutippenden Zahlen oder Texten. Bei einer Zuordnung müssen
alle Teilantworten stimmen. Die bisherigen Notengrenzen bleiben unverändert.
Alle 62 Aufgaben besitzen eindeutige IDs und verschiedene Aufgabenstellungen;
beim Laden wird ein doppelt registrierter oder gleichlautender Auftrag abgelehnt.
Die Verfahren werden an unterschiedlichen Situationen angewendet, ohne dieselben
Fragen seitenweise erneut zu stellen.

Reihenfolgeaufgaben lassen sich einzeln neu legen. Zahlenreihen akzeptieren
Kommas, Leerzeichen oder Semikolons und optionale eckige Klammern. Eigene
Ablaufpläne werden aus den eingegebenen Zeilen als Vorschau dargestellt.
Für alle Übungsseiten, die Vorbereitung und den Test sind Druck-/PDF-Ausgaben
vorhanden. Gedruckte Tests enthalten die relevanten Abbildungen und Teilfragen.

Die Algorithmus-Merkteile folgen pro Lernkapitel drei klaren Themenblöcken:
Definition/Bedingungen, Sequenz/Befehlsform und eigene Anwendung/EVA;
Diagrammsymbole, Verzweigungen/Schleifen und Suchen/Sortieren. Sie erscheinen
jeweils nach den passenden Erklärungen. Die Zusammenfassung ordnet Prüffragen
und Testvorbereitung ein und enthält keine zusätzlichen Merkteile. Der vollständige Sechs-Aktionen-Ablauf bleibt enthalten.
SVG-IDs von Aufgabenabbildungen sind getrennt von den Lernabbildungen, damit
Pfeilspitzen auch neben ausgeblendeten Lernseiten korrekt bleiben. Der
schematische Wegplan besitzt sichtbare Tür-/Ausgangsöffnungen. Das Labyrinth
ist befahrbar und einschließlich der Wegeliste integriert.

Eine vollständig eigenständige HTML-Datei erzeugen:

```sh
python3 scripts/build_offline.py
```

Ergebnis: `dist/Frau-Salliers-Lernwelt-0.41.html`. Diese eine Datei auf den eigenen
Computer herunterladen und per Doppelklick in einem aktuellen Browser öffnen.
Es sind keine weiteren Ordner, keine Installation und kein Server erforderlich.
Skripte, Stile, SVG-Zeichnungen und Bilddaten sind eingebettet. Drucken und
PDF-Ausgaben bleiben über die Schaltflächen möglich. Eingaben werden wie bisher
nur während der aktuellen Bearbeitung gehalten und nicht dauerhaft gespeichert.

Die achtzehn Funktionstests werden sowohl gegen die Projektversion als auch
gegen die unveränderten Bytes der exportierten Einzeldatei ausgeführt:

```sh
CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
LERNWELT_OFFLINE_HTML="$PWD/dist/Frau-Salliers-Lernwelt-0.41.html" CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
```

Im zweiten Lauf ist das Browsernetzwerk gesperrt. Die initiale Dokumentanfrage
wird mit dem Inhalt der Einzeldatei beantwortet; jede weitere Ressourcenanfrage
führt zum Fehlschlagen des Tests. Das direkte `file://`-Öffnen ist im verwalteten
Testbrowser administrativ gesperrt und wurde dort nicht als bestanden gewertet.
Die vollständigen Abläufe der Datei wurden ohne Netzwerk geprüft. Auf einem
normalen lokalen Browser lässt sich die klassische HTML-Datei direkt öffnen.

Die Herkunft der fachlichen Beispiele bleibt intern in
[docs/unterrichtsunterlagen.md](docs/unterrichtsunterlagen.md) dokumentiert.
Veröffentlichung: GitHub Pages aus dem Branch `main`, Projektwurzel.
Online: https://kathasallier.github.io/frau-salliers-lernwelt/

Seit 0.40 zeigt die Händewasch-Aufgabe fünf Bilder A–E ohne vorgegebene
Beschreibung. Die eigenen Anweisungen werden erst nach der Abgabe mit einem
Beispiel zur Selbstkontrolle verglichen. Der Abschlusstest bleibt vollständig
automatisch kontrollierbar. Die Zahnbürsten-Abbildung zeigt einen normalen
Bürstenkopf mit Borsten. Beide neuen Bildvorlagen wurden eigens erzeugt; die
Datei `assets/learning-images.js` enthält die unveränderten PNG-Bilddaten.

Seit 0.41 ergänzen drei unterschiedliche realistische Bildmotive die Lernseiten
(Tee, Schulranzen, Pfannkuchen). Diagramme im Merkteil dienen als Vorlagen zum
Zeichnen ins Heft; die Druckausgabe enthält Zeichenfläche. Bubble-Sort-Aufgaben
fragen nach jedem Nachbarvergleich die gesamte Reihe ab, einschließlich
unveränderter Reihen und des abschließenden Durchgangs ohne Tausch. Übungsreihen
werden eingegeben und automatisch geprüft; im Test bleiben es Auswahlfelder.
