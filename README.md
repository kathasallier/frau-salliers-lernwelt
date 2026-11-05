# Frau Salliers Lernwelt – Version 0.37

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
- `assets/app.js`: Navigation, Darstellung, Auswertung und Ablaufsteuerung.
- `assets/book-workbook.js`: eigener Übungsbereich zu Buchseiten 38–41, mit
  Originalfotos, freien Anweisungen, Geschichtenreihenfolge und Druckoptionen.
- `assets/sources/`: vier unveränderte Originalfotos der bereitgestellten Buchseiten.
- `assets/source-workbook.js`: ergänzende Quellenübung mit den vierzehn Aufgaben
  aus den bereitgestellten Seiten, freier Selbstkontrolle und eigener Druckfunktion.
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
node --check assets/book-workbook.js
node --check assets/app.js
```

`CHROMIUM_PATH` kann einen anderen Chromium-Pfad wählen. `CHROMIUM_NO_SANDBOX=1`
ist eine optionale Einstellung für isolierte Container; sie ist nicht für den
normalen lokalen Browserbetrieb erforderlich. Die Tests starten und beenden ihren
eigenen Server und Browser und verändern keine Lerninhalte.

Die dreizehn Testfälle prüfen alle 15 Module: Katalog und Rücknavigation, leere
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


## Abbildungen und Unterrichtsunterlagen

Jede illustrierte Algorithmus-Lernseite erhält in `lessonFigures` einen eigenen
Eintrag anhand von Modul-ID und Seitentitel. Keine Stichwortsuche ersetzt eine
Abbildung pauschal durch ein Standarddiagramm. Änderungen an Seitentiteln müssen
in dieser Zuordnung nachvollzogen werden. Wissenschecks erhalten keine
zusätzlichen Abbildungen, die Antworten vorwegnehmen. Wiederverwendete
Zeichenbausteine erzeugen jeweils eine seitenbezogene Grafik mit eigener
Beschreibung und eindeutigen SVG-IDs.

Alle zwanzig bereitgestellten Fotos sind mit der Lernwelt abgeglichen:
Übungsheftseiten 3–18 und Buchseiten 38–41. Das Buch nennt Eindeutigkeit,
Ausführbarkeit und Endlichkeit als die drei Bedingungen. Die feste Reihenfolge
gehört zur Eindeutigkeit; das Übungsheft betont sie mit „Schritt für Schritt“.
Das Ampel-Diagramm ist nach der nachgereichten Lösungsseite korrigiert: Nach
„Warten“ wird die Frage erneut geprüft. Nur der Ja-Weg führt zum Überqueren und
zum Ende. Die vollständigen Zähneputzen-, Schleifen-, Such- und Sortierbeispiele
bleiben erhalten.

Unter **Informatik → Klasse 6 → Algorithmen → Üben → Mit den Unterlagen üben**
stehen die vierzehn Quellenaufgaben und ein Glossar zur Verfügung. Einundzwanzig geschlossene Antworten
werden automatisch geprüft. Eigene Anleitungen, präzisierte Anweisungen, Wetterbedingungen und
Ablaufpläne bleiben ausdrücklich Selbstkontrollaufgaben. Für einen eigenen
Ablaufplan werden vier bis acht Aktionsfelder angeboten; die Vorlage ergänzt
Start, Ende und Pfeile. Die eigenen Texte und der Plan sind druckbar. Eingaben
bleiben nur während der aktuellen Bearbeitung erhalten; Neustart oder Neuladen
löscht sie. Die bisherigen 13 Module samt Übungs- und Testaufgaben bleiben
bestehen.

Die genaue Zuordnung der zwanzig Dateien, fachliche Anpassungen und Grenzen des
Abgleichs stehen in [docs/unterrichtsunterlagen.md](docs/unterrichtsunterlagen.md).

Die Aufgaben 8–11 ergänzen eine eigene Wenn–dann–sonst-Anweisung, einen
bearbeitbaren Ampel-Ablaufplan, das viermalige „Hallo!“ der Zählerschleife und
die drei weiteren Bubble-Sort-Tausche mit Endergebnis. Bei der Sortierung ist
klar getrennt zwischen erstem Durchgang und vollständig sortierter Folge.
Eigene Verzweigungen und neue Antworten werden von der bestehenden
Quellen-Druckfunktion mit ausgegeben.

Die Aufgaben 12–14 ergänzen vier Insertion-Sort-Zustände, den Suchweg zur 6 in
[4, 9, 2, 7, 6, 1, 5] mit fünf Prüfungen und eine freie Fehlerkorrektur zum
Schuhebinden. Der unveränderte Zustand beim Einsortieren der 5 wird ausdrücklich
mit abgefragt. Das Glossar umfasst die 13 Begriffe der Unterlagen und wird mit
ausgedruckt. Die übermittelten Beispielantworten zu Aufgaben 1–6 wurden
abgeglichen; Tee- und Präzisierungsbeispiele stehen hinter Selbstkontrollhinweisen.
Offene Aufgaben 2, 3, 7, 8, 9 und 14 werden nicht automatisch inhaltlich bewertet.


## Mit dem Buch üben

Unter **Informatik → Klasse 6 → Algorithmen → Üben → Mit dem Buch üben** gibt es
sieben ergänzende Aufgabenbereiche zu Buchseiten 38–41: Pfannkuchen und die drei
Bedingungen, Händewaschen in Befehlsform, Fluchtweg, Irving-Geschichte,
Supermarktanweisungen, Labyrinth und Algorithmus/Programm/EVA. Drei Zuordnungen
und die Reihenfolge der Geschichte werden automatisch geprüft (vier Antworten).
Alle eigenen Texte, Wege, Begründungen und Pläne bleiben zur Selbstkontrolle.
Die bestehenden Übungsheft-Aufgaben mit 21 geprüften Antworten bleiben separat.

Die vier Originalfotos sind zum Vergrößern verlinkt. Labyrinth und Fluchtplan
werden nicht aus unvollständigen Bildausschnitten rekonstruiert. Für den eigenen
Schulweg bzw. Fluchtweg wird der passende Plan benötigt; es wird kein tatsächlicher
Weg automatisch als richtig bewertet.

Die Druckschaltfläche druckt Aufgaben, eigene Antworten und selbst erstellte
Ablaufpläne. Mit **Originalfotos der Buchseiten mitdrucken** können die vier Fotos
zusätzlich ausgegeben werden. Diese Option ist standardmäßig aus. Druckzustände
werden nach dem Drucken zurückgesetzt; bearbeitete Eingaben bleiben erhalten.
Beide Druckvarianten werden mit PDF-Erzeugung getestet. Nach Neustart oder
Neuladen werden die Eingaben wie in den übrigen Übungen gelöscht.
