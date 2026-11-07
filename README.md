# Frau Salliers Lernwelt – Version 0.49

Interaktive Lernwebseite für die Klassen 5–10. Aktuelle Inhalte: Das Binärsystem sowie Algorithmen in Klasse 6.
Das Klasse-5-Thema ist vorerst aus dem Angebot genommen. Weitere Bereiche
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

Ergebnis: `dist/Frau-Salliers-Lernwelt-0.49.html`. Diese Datei enthält alle
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
LERNWELT_OFFLINE_HTML="$PWD/dist/Frau-Salliers-Lernwelt-0.49.html" CHROMIUM_NO_SANDBOX=1 python3 -m unittest discover -s tests -v
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

24 Browserregressionen prüfen alle Module, Übungsseiten, Tests und Druck/PDF,
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


## Lernwelt-Einstieg und Gestaltung seit 0.47

Jedes Lernmodul beginnt mit einer Titelfolie und einer Anleitung: Folien lesen,
Zwischenfragen beantworten, danach die passende Übung bearbeiten. Diese beiden
Einstiegsseiten sind vom bisherigen Inhaltszähler getrennt; Lernseiten und
Merkteilpositionen behalten ihre Nummern. Zurück/Weiter funktioniert auch über
diese Einstiegsseiten. Ein neuer Modulstart setzt den Lernzustand zurück.

Zwischenfragen müssen beantwortet werden, bevor Weiter möglich ist. Schon die
Auswahl einer Antwort zeigt die Rückmeldung; es gibt keinen Bestätigungsknopf.
Auch eine falsche Antwort gilt als beantwortet; sie kann unmittelbar geändert
werden. Antworten und Rückmeldungen bleiben beim Zurückblättern sichtbar.

Die Oberfläche verwendet Blau als Grundlage, Dunkelblau für tragende Elemente
und Orange als Akzent. Die PDF-Urkunde greift diese Palette auf. Das vom Nutzer
verlinkte Schulportal https://www.sks-burgbreite.bildung-lsa.de/ war in der
Umgebung wegen der Netzwerkfreigabe nicht abrufbar. Deshalb wurden keine
exakten offiziellen Farbwerte behauptet und kein Schullogo nachgebildet oder
übernommen. Für das Original-Logo ist eine zugängliche Originaldatei nötig.

24 Browserregressionen prüfen zusätzlich Einstieg, Anleitung, erforderliche
Antworten, unmittelbare Rückmeldung und Zurücknavigation in allen Lernmodulen.


## Klasse 6: Binärsystem, Bits und Bytes (seit 0.48)

Das bisherige Thema Binärsystem heißt jetzt „Binärsystem, Bits und Bytes“.
Lernwelt 1 ist „Das Binärsystem“. Sie enthält 22 Lernseiten zu Dezimal- und
Dualsystem, zwei Zuständen/Bit, Stellenwerten, Lampen, Byte, führenden Nullen,
Wertebereich sowie Umrechnung mit Stellenwerten und wiederholter Division.
Titelfolie, Anleitung und sofortige verpflichtende Zwischenfragen verwenden die
vorhandene gemeinsame Lernmechanik. Die Inhalte sind ohne das Lehrbuch nutzbar.

Eigene SVG-Abbildungen orientieren sich fachlich an den bereitgestellten Fotos:
dezimale Stellenwerttafel (3417), binäre Tafel (110010001₂ = 401), Lampenreihen,
vollständige Division 28 : 2 mit Leserichtung und Zähltafel bis 63. Die
neunstellige Beispielzahl wird ausdrücklich vom acht Bit großen Byte unterschieden.
Ein Byte stellt hier die ganzen Zahlen von 0 bis 255 dar; es gibt 256 Bitfolgen.
Eine weiterführende Lernwelt zu Bits/Bytes wird ohne weitere Unterlagen nicht
vorweggenommen.

Drei Merkteile mit Beispielen und Zeichenaufträgen sind im Heft und als PDF
nutzbar. Übung 1 hat drei Teile mit insgesamt 12 unterschiedlichen Aufgaben:
Auswahl, Zuordnung, Reihenfolge, Zahlen-/Binäreingaben, vollständige
Divisionsschritte, offene Erklärungen und selbst schaltbare Lampen. Der
Lampenzustand wird auch gedruckt. Die Zusammenfassung hat keinen eigenen
Merkteil. Die Testvorbereitung bietet weitere 12 Aufgaben mit Rückmeldungen.
Der Abschlusstest enthält 20 geschlossene automatisch kontrollierte Aufgaben.
Testzugangscode und bestehende IDs bleiben erhalten; die Ergebnis-PDF enthält
auch die neuen Abbildungen. Für das Thema sind zwei zusätzliche Module
(Zusammenfassung und Testvorbereitung) registriert.

`assets/binary-world.js` enthält die fachlichen Daten und Registrierung;
`assets/binary-figures.js` die Abbildungen und Lampenbedienung. Gemeinsame
Aufgaben-/Druckmechanik wird gezielt für diese Binärmodule wiederverwendet.
Die Daten der anderen Themen wurden mit dem vorherigen Stand verglichen und
sind unverändert. Funktionstests prüfen alle Themen einschließlich Navigation,
Zwischenfragen, Merkteilen, Übungen, Bewertung, Druck und Ergebnis-Downloads.
Zusätzliche Prüfungen kontrollieren Abbildungsgrenzen, Division und
Binäreingaben sowie die Lampenbedienung auf schmalen Bildschirmen.


## Aktueller Umfang nach Durchsicht (0.49)

Lernwelt 1 beginnt mit Dezimalsystem/Stellenwerten, erklärt dann das Binärsystem
und erst danach die Lampendarstellung. Dezimale und binäre Abbildungen haben
passende eigene Bildunterschriften. Die Addition verwendeter Stellenwerte wird
explizit erklärt. Vor der Beispiel-Lampenreihe steht ein Zeichenauftrag fürs Heft.

Die Zerlegung von 83 wird in sieben einzeln aufdeckbaren Schritten gezeigt,
einschließlich der Nullstellen. Die Division von 28 nennt ausdrücklich die
Lösung 11100₂. Die doppelte Rest-Erklärung entfällt. Die Zähltafel verwendet
8, 4, 2 und 1 und soll im Heft bis 15 ergänzt werden. Bit-/Byte-Definitionen und
die Byte-Reichweite sind für Lernwelt 2 zurückgestellt. Führende Nullen bleiben
als Darstellung von Binärzahlen erklärt. Lernwelt 1 hat jetzt 19 Inhaltsseiten.

Übung 1, Teil 1, Aufgabe 3 ist eine ausfüllbare Stellenwerttabelle. Teil 3 zeigt
bei der Lampenaufgabe die Summe deutlich an. Die Divisionsaufgabe enthält eine
ausfüllbare Tabelle für alle Quotienten und Reste sowie das Ergebnis; nach der
Auswertung erscheint die vollständige Lösungsfolge. Tabellen sind auch druckbar.

Testvorbereitung und Test des Binärthemas sowie das Klasse-5-Thema sind derzeit
nicht registriert und nicht im Angebot. Die bisherigen Daten/Codes bleiben
zur späteren Wiederverwendung aufbewahrt. Die Binär-Zusammenfassung führt zur
Übung 1. Aktive Angebote: Algorithmen und Lernwelt 1 des Binärthemas in Klasse 6,
sowie der unabhängige Startseiten-Übungstest. Die Algorithmen-Inhalte bleiben
unverändert. Neue Inhalte für Lernwelt 2 werden erst anhand weiterer Unterlagen
erstellt.

24 Funktionstests prüfen zusätzlich die zurückgestellten Bereiche, den neuen
Lernablauf, die Schrittfolge und ausfüllbare Tabellen. Alle aktiven Übungen,
Zwischenfragen und Druck-/PDF-Funktionen werden auch offline geprüft.
