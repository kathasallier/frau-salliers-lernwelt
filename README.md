# Frau Salliers Lernwelt – Version 0.46

Interaktive Lernwebseite für die Klassen 5–10. Aktuelle Inhalte: Hardware und
Software (Klasse 5), Binärsystem und Algorithmen (Klasse 6). Weitere Bereiche
zeigen einen Hinweis, solange noch keine Inhalte hinterlegt sind.

Online: https://kathasallier.github.io/frau-salliers-lernwelt/
Veröffentlichung über GitHub Pages aus `main`, Projektwurzel.

## Lokal öffnen

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Dann http://127.0.0.1:8000 öffnen. Alternativ `index.html` zusammen mit dem
Ordner `assets/` aufbewahren und in einem aktuellen lokalen Browser öffnen.
Es sind kein Backend, Paketmanager oder externe Downloads zur Laufzeit nötig.
Testcodes und Lösungen werden im Browser ausgeliefert; die lokale Codeabfrage
ist für den Unterricht gedacht und stellt keinen serverseitigen Zugriffsschutz dar.
Eingaben bleiben nur während der aktuellen Bearbeitung erhalten.

## Einzeldatei für die Offline-Nutzung

```sh
python3 scripts/build_offline.py
```

Ergebnis: `dist/Frau-Salliers-Lernwelt-0.46.html`. Diese Datei enthält alle
Skripte, Stile und Bilddaten; weitere Ordner oder ein Server sind nicht nötig.
Drucken und PDF-Ausgabe funktionieren über die vorhandenen Schaltflächen.

## Struktur

- `index.html`: gemeinsame Ansichten und versionierte Ressourcen.
- `assets/content.js`: Unterrichtsinhalte, Modulregistrierung, Aufgaben, Merkteile.
- `assets/app.js`: Navigation, Lernseiten, gemeinsame Abläufe und Druckfunktionen.
- `assets/algorithm-activities.js`: Algorithmus-Übungen und automatisch bewerteter Test.
- `assets/illustrations.js`: Diagramme und Zuordnung zu den Lernseiten.
- `assets/learning-images.js`: eingebettete eigens erzeugte Bildvorlagen.
- `assets/practice-maps.js`: Wege, Labyrinth und Ablaufplan-Helfer.
- `assets/styles.css`: Oberfläche und Druckgestaltung.
- `scripts/build_offline.py`: Export als eigenständige HTML-Datei.
- `tests/test_functional.py`: Browserregressionen mit Playwright/Chromium.

Frühere separate Buch-/Arbeitsheft-Skripte bleiben als Archiv erhalten und werden
nicht geladen. Die Anwendung benötigt keine Unterrichtsunterlagen neben der
Webseite. Fachliche Quellen sind intern in `docs/unterrichtsunterlagen.md` dokumentiert.

## Funktionstests

```sh
CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
LERNWELT_OFFLINE_HTML="$PWD/dist/Frau-Salliers-Lernwelt-0.46.html" CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
```

Der zweite Lauf sperrt das Browsernetzwerk. Nur die initiale Dokumentanfrage
wird mit den unveränderten Bytes der Einzeldatei beantwortet; jede weitere
Ressourcenanfrage führt zum Fehlschlagen. Das direkte Öffnen mit `file://` ist
im verwalteten Testbrowser administrativ gesperrt und wird dort nicht als
getestet ausgegeben. Die Einzeldatei wird vollständig ohne Netzwerk geprüft.

## Aktueller Unterrichtsumfang seit 0.42

Die handschriftlichen Unterrichtsnotizen ersetzen frühere Festlegungen zu Suchen,
Sortieren und Testvorbereitung. Lernwelt 1 hat 17 Seiten: Die bisherigen Seiten
16 (Pfannkuchen-Sequenz) und 18 (Programm/EVA) entfallen. Rezept und Bauanleitung
auf Seite 1 besitzen Bilder. Die Gegenüberstellung auf Seite 3 besitzt getrennte
Überschriften; Seite 6 zeigt ein Ei mit und ohne Schale. Der Schulweg ist das
Thema der Sequenz und des Heftereintrags. Die Händewasch-Bilder beginnen mit
Wasser (A), dann Seife (B); die Aufgabe in der Lernwelt wird mündlich bearbeitet,
im Übungsteil weiterhin schriftlich.

Lineare Suche, Bubble Sort und Insertion Sort entfallen aus allen aktiven
Algorithmus-Lernseiten, Merkteilen, Übungen, Zusammenfassung und Testfragen.
Zusätzlich entfallen g12 (Übung 1, Teil 3, Aufgabe 4) und r09 (bisherige Übung 3,
Teil 3, Aufgabe 1). Die übrigen Aufgaben bleiben erhalten. Der dritte Übungsbereich
heißt Testvorbereitung. Alle drei Algorithmus-Übungsbereiche haben Rückmeldungen
ohne Punkte und einen deutlichen Hinweis zum selbstständigen Vergleich freier
Texte. Der Bereich Test startet nach dem Zugangscode direkt den Test ohne
vorgeschaltete Übungen. Er bleibt mit 20 geschlossenen Fragen automatisch
kontrollierbar. Sieben Testfragen wurden passend zum verbleibenden Lernstoff
ersetzt. Hardware und Binärsystem behalten ihre bisherigen Abläufe.

20 Browserregressionen prüfen alle Module, Übungsseiten, Tests und Druck/PDF,
zusätzlich denselben Stand als exportierte Einzeldatei ohne Netzwerk.

Seit 0.43 zeigt Lernwelt 1, Folie 6 nur das Eierbild; die zusätzliche Grafik
entfällt. Die Algorithmus-Übungen und ihre Auswertung enthalten keine Hinweise
auf fehlende Punkte mehr. Rückmeldungen und Textvergleich bleiben erhalten.

Seit 0.44 übt die Testvorbereitung mit 15 eigenständigen Aufgaben alle
Testkompetenzen in drei Teilen: Anweisungen/Eigenschaften, Diagramme/Wege und
Schleifen/Entscheidungen. Die vorhandenen offenen Anwendungen bleiben erhalten.
Testfrage 5 vergleicht nur Umordnungen derselben drei Schritte; Frage 19 prüft
eine verletzte Eigenschaft an einem konkreten Beispiel. Die Positionen richtiger
Auswahlantworten sind verteilt und bei Teilfragen unterschiedlich angeordnet;
Druck und Online-Test verwenden dieselbe Reihenfolge. Das Testergebnis nennt
Thema, Fach und Klasse.

Die neuen geschlossenen Vorbereitungsaufgaben erklären nach der Auswertung,
warum die Lösung passt (bei Schleifen einschließlich konkreter Zählerwerte).


## Testergebnisse als PDF abgeben (seit 0.45)

Nach jedem der drei Tests erscheint „Testergebnis als PDF herunterladen“.
Der Button lädt unmittelbar eine PDF herunter, ohne den Druckdialog zu öffnen.
Die Datei enthält Name, Thema, Fach, Klasse, Abgabedatum, Punkte, Note und alle
Fragen/Antworten einschließlich Korrekturen, Pseudocode und Testdiagrammen.
Jede Seite trägt eine Kopfzeile und eine Seitennummer. Name und Thema bilden
zusammen mit dem Datum den bereinigten Dateinamen. Der Screenshot-Hinweis entfällt.
Die Schüler speichern die Datei und geben sie bei ihrer Lehrkraft ab.

Die PDF verwendet einen Schnappschuss des abgegebenen Tests. Nachträgliche
Formularänderungen verändern diesen nicht. Beim Start eines anderen Moduls
werden die zugehörigen Download-Daten aus dem aktuellen Zustand entfernt.
Ein erneuter Download ist möglich, solange das Ergebnis geöffnet ist.
Übungen und die vorhandenen Druck-/PDF-Funktionen bleiben erhalten.

`assets/result-pdf.js` erzeugt die PDF lokal mit jsPDF 4.2.1; Bibliothek und
DejaVu-Schriften sind mit ihren Lizenzhinweisen im Projekt eingebettet.
Auch die exportierte Einzeldatei benötigt dafür kein Netzwerk. Details und
Lizenzen: `assets/vendor/`, `assets/pdf-fonts.js`.

Der zusätzliche Downloadtest prüft echte PDF-Dateien für alle drei Tests,
Umlaute, Metadaten, alle 20 Fragen, Korrekturen, Diagrammbilder, Seitenzahlen,
sichere Dateinamen, wiederholte Downloads, Fehler-/Wiederholungsfall sowie das
Zurücksetzen beim Modulwechsel. Er stellt sicher, dass kein Druckdialog öffnet.


## Urkunde und Übungstest seit 0.46

Der Ergebnis-Download steht oben auf der Auswertungsseite. Seite 1 der PDF ist
als Urkunde gestaltet: Name, Thema, Fach/Klasse, Datum, Punkte und Note. Die
Aufgabenauswertung beginnt immer erst auf Seite 2. Normale Testergebnisse
behalten ihre bisherige automatische Bewertung. Der sekundäre Druckknopf bleibt.

Direkt auf der Startseite steht ein eigenständiger Übungstest mit Startcode
`1234`. Er enthält 15 einfache witzige Fragen mit Auswahl, Zahleneingabe und
Reihenfolge-Aufgaben. Die Schüler üben Namen eingeben, auswerten, korrigierte
Antworten lesen, PDF herunterladen und die Datei öffnen. Es wird keine Note
berechnet oder in die PDF geschrieben; die Anzahl richtiger Antworten ist
sichtbar. Der Übungstest ist nicht an Fach oder Klasse gebunden und verändert
den bestehenden Modulkatalog nicht. Seine PDF ist ausdrücklich als Übungstest
gekennzeichnet. Danach führt die Navigation wieder auf die Startseite.

`assets/try-test.js` ergänzt dafür eine eigene Engine mit gemeinsamer Auswertung
und PDF-Erzeugung. Ein zusätzlicher Browsertest prüft Startseite/Code, Eingaben,
Namenspflicht, unvollständige Abgabe, Auswertung ohne Note, echten PDF-Download,
Urkunde auf Seite 1, Aufgaben ab Seite 2, mobile Ansicht, Druck und Neustart.
