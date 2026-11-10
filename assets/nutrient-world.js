'use strict';
// Grundlage: Lösung_Nährstoffe.pdf; Seitenangaben beziehen sich auf die gedruckten Heftseiten.
const NUTRIENT_UNITS=[
  {
    "id": "nutrients-intro",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Start: So arbeitest du mit dem Merkheft",
    "description": "Lerne den Ablauf kennen: online verstehen, das Merkheft befüllen und auf einem Extrablatt reflektieren.",
    "slides": [
      {
        "title": "Dein Merkheft begleitet dich",
        "body": "Du brauchst dein leeres Merkheft „Nährstoffe verstehen“, einen Stift und ein Extrablatt. Trage auf dem Deckblatt deinen Namen und deine Klasse ein. Die Online-Lernwelten liefern dir die Erklärungen und Beispiele für die freien Felder im Heft.",
        "figure": "workflow"
      },
      {
        "title": "So findest du die richtige Seite",
        "body": "Jeder Heftauftrag nennt die gedruckte Seitenzahl und die Überschrift. Die gedruckten Seiten 1 bis 11 beginnen erst nach Deckblatt und Inhaltsverzeichnis. Orientiere dich zusätzlich an der Überschrift, falls dein Ausdruck anders sortiert ist.",
        "workbook": {
          "page": "Inhaltsverzeichnis",
          "heading": "Dein Nährstoff-Guide",
          "prompt": "Sieh dir die Themenliste an. Hake ein Thema erst ab, wenn du es bearbeitet und deine Einträge kontrolliert hast.",
          "entries": [
            "Die Lernwelten beginnen mit dem Überblick. Der Nährstoff-Check und seine Auswertung kommen zum Schluss."
          ]
        }
      },
      {
        "title": "Verstehen, eintragen, kontrollieren",
        "body": "Lies zuerst die Erklärung. Fülle danach die passenden Lücken, Tabellen und Ankreuzaufgaben im Merkheft aus. Nutze die Fachbegriffe aus der Lernwelt. Vergleiche anschließend deinen Eintrag mit den Beispielen und verbessere ihn bei Bedarf. Du musst die Online-Seiten nicht zusätzlich abschreiben."
      },
      {
        "title": "Reflexionen gehören auf ein Extrablatt",
        "body": "Schreibe alle Reflexions- und Denkaufgaben auf dein Extrablatt, auch wenn im Merkheft dafür Platz ist. Notiere Name, Datum, Station und Heftseite. Antworte in ganzen Sätzen und begründe deine Entscheidung mit Fachwissen. Auch die Denkaufgabe zu Proteinen bearbeitest du dort.",
        "reflection": {
          "question": "So sieht eine gute Begründung aus: „Ich wähle …, weil … . Das ist für meinen Körper wichtig, denn … .“",
          "tips": [
            "Lies die Aufgabe genau und nenne deine Entscheidung.",
            "Erkläre sie mit mindestens einem passenden Fachbegriff.",
            "Prüfe, ob deine Begründung wirklich zur Frage passt."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Dein Arbeitsort",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Wo bearbeitest du eine Reflexionsfrage?",
        "choices": [
          "Im Online-Test als einzelnes Stichwort.",
          "Auf einem Extrablatt mit einer fachlichen Begründung.",
          "Nur mündlich, ohne etwas aufzuschreiben."
        ],
        "answer": 1,
        "why": "Auf dem Extrablatt steht deine eigene begründete Antwort.",
        "hint": "Reflexions- und Denkaufgaben brauchen einen eigenen Schreibplatz."
      },
      {
        "title": "Wissens-Check-up: Dein Ablauf",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Wann hakst du ein Thema im Inhaltsverzeichnis ab?",
        "choices": [
          "Sobald du die Überschrift gelesen hast.",
          "Bevor du etwas ins Heft einträgst.",
          "Wenn du das Thema bearbeitet und deine Einträge kontrolliert hast."
        ],
        "answer": 2,
        "why": "So zeigt die Themenliste deinen tatsächlichen Arbeitsstand.",
        "hint": "Lesen allein bedeutet noch nicht, dass die Heftaufgaben erledigt sind."
      },
      {
        "title": "Bereit für Station 1",
        "body": "Beginne jetzt mit dem Überblick. Arbeite die Lernwelten in der angezeigten Reihenfolge durch. Die Wissens-Check-ups helfen dir beim Verstehen und werden direkt erklärt. Es gibt hier keinen benoteten Test. Deine Online-Antworten bleiben nur während der aktuellen Bearbeitung erhalten; nach einem Neuladen beginnst du erneut."
      }
    ]
  },
  {
    "id": "nutrients-overview",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 1: Was sind Nährstoffe?",
    "description": "Makro- und Mikronährstoffe unterscheiden und die Überblicksseite ausfüllen.",
    "slides": [
      {
        "title": "Warum dein Körper Nährstoffe braucht",
        "body": "Nährstoffe sind Stoffe in unserer Nahrung, die der Körper zum Leben braucht. Sie liefern Energie, dienen als Baustoffe und regeln wichtige Vorgänge. Dein Körper braucht verschiedene Nährstoffe – kein einzelnes Lebensmittel übernimmt alle Aufgaben.",
        "figure": "roles",
        "workbook": {
          "page": 1,
          "heading": "Überblick – Was sind Nährstoffe?",
          "prompt": "Ergänze die Erklärung mit den passenden Begriffen.",
          "entries": [
            "Der Körper braucht Nährstoffe zum Leben.",
            "Sie liefern Energie, bauen den Körper auf und sorgen dafür, dass wichtige Vorgänge richtig funktionieren."
          ]
        }
      },
      {
        "title": "Makronährstoffe: in größeren Mengen",
        "body": "Makro bedeutet „groß“. Kohlenhydrate, Fette und Proteine gehören zu den Makronährstoffen. Kohlenhydrate sind eine wichtige Energiequelle. Fette liefern Energie und schützen Organe. Proteine sind besonders wichtig als Baustoffe für Zellen und Muskeln.",
        "figure": "macro",
        "workbook": {
          "page": 1,
          "heading": "Makronährstoffe",
          "prompt": "Trage die drei Gruppen mit ihren Hauptaufgaben ein.",
          "entries": [
            "Kohlenhydrate: wichtige Energiequelle.",
            "Fette: Energielieferant und Schutzpolster.",
            "Proteine: Baustoffe für Muskeln und Zellen.",
            "Makronährstoffe braucht der Körper in größeren Mengen. Sie liefern Energie und dienen als Baustoffe."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Einordnen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Gruppe besteht nur aus Makronährstoffen?",
        "choices": [
          "Vitamine, Mineralstoffe und Proteine.",
          "Kohlenhydrate, Fette und Proteine.",
          "Wasser, Eisen und Vitamin C."
        ],
        "answer": 1,
        "why": "Diese drei Nährstoffgruppen benötigt der Körper in größeren Mengen.",
        "hint": "Suche die drei Gruppen, die Energie liefern oder als Baustoffe dienen."
      },
      {
        "title": "Mikronährstoffe: klein, aber lebenswichtig",
        "body": "Mikro bedeutet „klein“. Vitamine und Mineralstoffe werden nur in kleinen Mengen benötigt. Sie liefern keine Energie, helfen aber zum Beispiel dem Stoffwechsel, dem Immunsystem und dem Aufbau von Knochen.",
        "figure": "micro",
        "workbook": {
          "page": 1,
          "heading": "Mikronährstoffe",
          "prompt": "Ergänze Gruppen, Erklärung und Merksatz.",
          "entries": [
            "Vitamine: schützen und regulieren.",
            "Mineralstoffe: regeln Stoffwechsel und unterstützen den Aufbau von Knochen.",
            "Mikronährstoffe braucht der Körper nur in kleinen Mengen. Sie liefern keine Energie und sind trotzdem lebenswichtig.",
            "Merksatz im Heft: „Makro macht satt – Mikro hält fit.“ Er hilft bei der Einteilung; auch Makronährstoffe sind für die Gesundheit wichtig."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Energie",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Eine Mitschülerin sagt: „Vitamine geben mir Kalorien.“ Was stimmt?",
        "choices": [
          "Vitamine liefern keine Energie, unterstützen aber wichtige Körperfunktionen.",
          "Vitamine sind besonders energiereiche Fette.",
          "Alle Nährstoffe liefern gleich viel Energie."
        ],
        "answer": 0,
        "why": "Energie stammt vor allem aus Kohlenhydraten, Fetten und Proteinen.",
        "hint": "Unterscheide Energie liefern und Körperfunktionen unterstützen."
      },
      {
        "title": "Wissens-Check-up: Kleine Mengen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Warum brauchen wir Mineralstoffe trotz der kleinen benötigten Mengen?",
        "choices": [
          "Weil kleine Mengen automatisch unwichtig sind.",
          "Weil sie Kohlenhydrate vollständig ersetzen.",
          "Weil sie unter anderem an Knochenaufbau und Stoffwechsel beteiligt sind."
        ],
        "answer": 2,
        "why": "Die benötigte Menge sagt nichts darüber aus, wie lebenswichtig ein Stoff ist.",
        "hint": "Denke an die Aufgaben von Mikronährstoffen."
      }
    ]
  },
  {
    "id": "nutrients-carbs",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 2: Kohlenhydrate",
    "description": "Einfache und komplexe Kohlenhydrate vergleichen; Heftseiten 2 und 3 bearbeiten.",
    "slides": [
      {
        "title": "Energie für Gehirn und Muskeln",
        "body": "Kohlenhydrate versorgen den Körper vor allem mit Energie. Sie kommen hauptsächlich in pflanzlichen Lebensmitteln vor: Getreide, Kartoffeln, Obst und Gemüse. Damit unterstützen sie Muskeln, Gehirn, Konzentration und Leistungsfähigkeit.",
        "workbook": {
          "page": 2,
          "heading": "Kohlenhydrate – Energie für Gehirn und Muskeln",
          "prompt": "Ergänze die Erklärung, die Beispiele und die Bedeutung für den Körper.",
          "entries": [
            "Kohlenhydrate liefern Energie für Muskeln und Gehirn.",
            "Sie unterstützen Konzentration und Leistungsfähigkeit.",
            "Ballaststoffreiche Lebensmittel unterstützen die Verdauung. Vollkornprodukte sind dafür gute Beispiele.",
            "Kohlenhydrate sind eine wichtige Energiequelle für den Körper."
          ]
        }
      },
      {
        "title": "Einfach oder komplex?",
        "body": "Einfache Kohlenhydrate bestehen aus einem oder wenigen Zuckerbausteinen. Beispiele sind Traubenzucker, Haushaltszucker, Süßigkeiten und Limonade. Komplexe Kohlenhydrate wie Stärke bestehen aus vielen verbundenen Zuckerbausteinen. Du findest sie in Brot, Haferflocken, Kartoffeln, Reis und Nudeln.",
        "figure": "chains",
        "workbook": {
          "page": 2,
          "heading": "Einfache und komplexe Kohlenhydrate",
          "prompt": "Fülle beide Spalten mit Eigenschaften und Beispielen.",
          "entries": [
            "Einfach: wenige Zuckerbausteine; schnell verfügbar; können den Blutzucker rasch ansteigen lassen; sättigen oft nur kurz. Beispiele: Traubenzucker, Haushaltszucker, Süßigkeiten, Limonade.",
            "Komplex: viele Zuckerbausteine; werden erst zerlegt; sorgen zusammen mit Ballaststoffen häufig für länger anhaltende Sättigung. Beispiele: Vollkornbrot, Haferflocken, Kartoffeln, Reis, Nudeln.",
            "Ballaststoffe stecken vor allem in Vollkornprodukten, Hülsenfrüchten, Gemüse und Obst. Nicht jedes stärkehaltige Lebensmittel ist automatisch ballaststoffreich."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Bausteine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Was unterscheidet Stärke von Traubenzucker?",
        "choices": [
          "Stärke enthält gar keine Zuckerbausteine.",
          "Traubenzucker ist eine lange Kette aus Stärke.",
          "Stärke besteht aus vielen verbundenen Zuckerbausteinen."
        ],
        "answer": 2,
        "why": "Für die Verdauung muss die Stärkekette erst in kleinere Bausteine zerlegt werden.",
        "hint": "Vergleiche einzelne Bausteine mit einer langen Kette."
      },
      {
        "title": "Die Zuordnung im Heft",
        "body": "Entscheide bei jeder Aussage auf Seite 3, ob sie zu einfachen oder komplexen Kohlenhydraten passt. Die Aussagen beschreiben die typische Wirkung: Die genaue Blutzuckerreaktion hängt auch von Verarbeitung, Ballaststoffen und der gesamten Mahlzeit ab.",
        "workbook": {
          "page": 3,
          "heading": "Kohlenhydrate – einfach oder komplex?",
          "prompt": "Bearbeite die neun Ankreuzaussagen und vergleiche anschließend.",
          "entries": [
            "Einfach: schnell aufgenommen; rascher Blutzuckeranstieg; häufig in Süßigkeiten; zuckerreiche Süßigkeiten und Limonaden zählen in der Ernährungspyramide zu den Extras.",
            "Komplex: viele Zuckerbausteine; häufig länger satt und gleichmäßigere Energie. Vollkornprodukte liefern viele Ballaststoffe und lassen den Blutzucker oft langsamer steigen.",
            "Die Aussagen „viele Ballaststoffe“ und „Blutzucker stabil“ werden im Heft der komplexen Seite zugeordnet. Sie sind vereinfachte Beschreibungen ballaststoffreicher Lebensmittel."
          ]
        }
      },
      {
        "title": "Vor- und Nachteile sinnvoll erklären",
        "body": "Einfache Zucker liefern schnell Energie und schmecken häufig süß. Große Mengen stark zuckerhaltiger Lebensmittel können weniger lange sättigen. Komplexe, ballaststoffreiche Lebensmittel halten häufig länger satt und fördern die Verdauung. Zucker macht nicht zwangsläufig müde; überschüssige Energie kann unabhängig vom Nährstoff als Körperfett gespeichert werden.",
        "workbook": {
          "page": 3,
          "heading": "Vor- und Nachteile",
          "prompt": "Notiere Vorteile und mögliche Nachteile.",
          "entries": [
            "Einfach: schnelle Energie, häufig süßer Geschmack; oft kurze Sättigung und rascher Blutzuckeranstieg.",
            "Komplex und ballaststoffreich: länger satt, länger verfügbare Energie, Unterstützung der Verdauung."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Ballaststoffe",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Ergänzung macht ein Frühstück ballaststoffreicher?",
        "choices": [
          "Eine Portion Haferflocken.",
          "Ein Glas Limonade.",
          "Ein Löffel Haushaltszucker."
        ],
        "answer": 0,
        "why": "Haferflocken liefern komplexe Kohlenhydrate und Ballaststoffe.",
        "hint": "Ballaststoffe stecken nicht im Haushaltszucker."
      },
      {
        "title": "Wissens-Check-up: Genau hinschauen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Aussage ist fachlich sinnvoll?",
        "choices": [
          "Jede Nudel enthält besonders viele Ballaststoffe.",
          "Vollkornprodukte sind meist ballaststoffreicher als entsprechende Weißmehlprodukte.",
          "Süßigkeiten sind die beste Grundlage jeder Mahlzeit."
        ],
        "answer": 1,
        "why": "Der Vollkornanteil ist für den Ballaststoffgehalt wichtig.",
        "hint": "Komplexe Kohlenhydrate und Ballaststoffe sind nicht dasselbe."
      },
      {
        "title": "Reflexion: Dein Frühstück",
        "body": "Bearbeite die Reflexionsfrage von Heftseite 3 auf deinem Extrablatt.",
        "reflection": {
          "question": "Du planst dein Frühstück für einen langen Schultag: Weißbrot mit Nuss-Nougat-Creme oder Vollkornbrot mit Frischkäse und Gemüse? Welche Wahl ist sinnvoller – und warum?",
          "tips": [
            "Vergleiche Sättigung, Ballaststoffe und die Zusammensetzung der Mahlzeit.",
            "Begründe deine Wahl fachlich, statt Lebensmittel nur als „gut“ oder „schlecht“ zu bezeichnen."
          ]
        }
      }
    ]
  },
  {
    "id": "nutrients-fats",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 3: Fette",
    "description": "Aufgaben und Quellen von Fetten verstehen; Heftseiten 4 und 5 bearbeiten.",
    "slides": [
      {
        "title": "Fett hat wichtige Aufgaben",
        "body": "Fette gehören zu den Makronährstoffen. Sie liefern besonders viel Energie, dienen als Energiereserve, schützen innere Organe und sind am Zellaufbau beteiligt. Außerdem helfen sie bei der Aufnahme fettlöslicher Vitamine. Fett vollständig zu meiden wäre deshalb keine gute Idee.",
        "figure": "fat",
        "workbook": {
          "page": 4,
          "heading": "Fette – wichtig, aber nicht zu viel davon",
          "prompt": "Ergänze Erklärung und Aufgaben.",
          "entries": [
            "Fette gehören zu den Makronährstoffen. Sie liefern Energie und dienen als Schutzpolster und Vitaminträger.",
            "Aufgaben: Energie liefern und speichern; Organe schützen; Zellaufbau; Aufnahme fettlöslicher Vitamine."
          ]
        }
      },
      {
        "title": "Pflanzliche und tierische Fettquellen",
        "body": "Pflanzliche Fette stammen zum Beispiel aus Oliven, Raps, Sonnenblumenkernen, Nüssen und Avocados. Tierische Fettquellen sind Butter, Schmalz, Wurst, fettes Fleisch und Fisch. Viele Pflanzenöle und Nüsse liefern günstige ungesättigte Fettsäuren. Auch fettreicher Fisch liefert wertvolle ungesättigte Fettsäuren; die Herkunft allein entscheidet nicht über die Qualität.",
        "workbook": {
          "page": 4,
          "heading": "Wir unterscheiden",
          "prompt": "Fülle die beiden Beispielspalten.",
          "entries": [
            "Pflanzlich: Olivenöl, Rapsöl, Sonnenblumenöl, Nüsse, Avocado.",
            "Tierisch: Butter, Schmalz, Wurst, fettes Fleisch, Fisch.",
            "Merksatz: Nüsse sind kleine Kraftpakete mit wertvollen Fetten; eine kleine Handvoll ist eine passende Portion. Bei Allergien sind sie nicht geeignet."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Herkunft",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welches Lebensmittel ist eine pflanzliche Fettquelle?",
        "choices": [
          "Butter.",
          "Rapsöl.",
          "Schmalz."
        ],
        "answer": 1,
        "why": "Rapsöl wird aus den Samen der Rapspflanze gewonnen.",
        "hint": "Überlege, ob das Lebensmittel von einer Pflanze oder einem Tier stammt."
      },
      {
        "title": "Die Menge und die Auswahl zählen",
        "body": "Wer langfristig mehr Energie aufnimmt als verbraucht, kann zunehmen. Viele gesättigte Fettsäuren können den LDL-Cholesterinspiegel erhöhen und Herz und Gefäße belasten. Verwende bevorzugt passende Mengen pflanzlicher Öle und iss abwechslungsreich. Nicht jedes tierische Fett ist schädlich und kein Lebensmittel ist allein wegen seines Fettgehalts „giftig“.",
        "workbook": {
          "page": 4,
          "heading": "Zu viel oder das falsche Fett",
          "prompt": "Notiere mögliche Folgen bei langfristig ungünstiger Auswahl und zu hoher Energieaufnahme.",
          "entries": [
            "Eine Gewichtszunahme kann begünstigt werden.",
            "Der LDL-Cholesterinspiegel kann steigen.",
            "Herz und Gefäße können auf Dauer belastet werden."
          ]
        }
      },
      {
        "title": "Fett hilft bei der Vitaminaufnahme",
        "body": "Die Vitamine A, D, E und K sind fettlöslich. Eine kleine Menge Fett in der Mahlzeit unterstützt ihre Aufnahme. Beispiele: Salat mit etwas Öl im Dressing oder Karotten als Teil einer Mahlzeit mit etwas Fett. Bei Karotten wird insbesondere das Provitamin Beta-Carotin besser aufgenommen.",
        "workbook": {
          "page": 5,
          "heading": "Was stimmt über Fette?",
          "prompt": "Kreuze bei den acht Aussagen „richtig“ oder „falsch“ an. Der Arbeitsauftrag zu einfachen/komplexen Kohlenhydraten auf dieser Seite ist ein Druckfehler.",
          "entries": [
            "Richtig sind die Aussagen 1, 3, 4, 5, 6 und 8. Aussage 4 ist eine Faustregel mit Ausnahmen; Aussage 6 beschreibt das Risiko einer langfristig ungünstigen Ernährung.",
            "Falsch: „Der Körper braucht kein Fett“ und „Alle tierischen Fette sind grundsätzlich giftig“.",
            "Unter „Fett hilft Vitaminen ins Blut“: Diese Vitamine nennt man fettlösliche Vitamine. Beispiele: Salat mit Öl; Karotten mit einem Butterbrot oder etwas Öl."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Fett und Vitamine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Warum passt etwas Öl zu einem Salat?",
        "choices": [
          "Öl ersetzt alle Vitamine im Salat.",
          "Ohne Öl wird der Salat giftig.",
          "Fett unterstützt die Aufnahme bestimmter Vitamine."
        ],
        "answer": 2,
        "why": "Fettlösliche Vitamine können zusammen mit Fett besser aufgenommen werden.",
        "hint": "Denke an die Vitamine A, D, E und K."
      },
      {
        "title": "Wissens-Check-up: Eine Behauptung prüfen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Aussage berücksichtigt die Unterschiede zwischen Fettquellen?",
        "choices": [
          "Auch Fisch kann wertvolle ungesättigte Fettsäuren liefern.",
          "Alle tierischen Fette sind grundsätzlich giftig.",
          "Fett wird im Körper nie gebraucht."
        ],
        "answer": 0,
        "why": "Auch unter tierischen Fettquellen gibt es ernährungsphysiologisch günstige Beispiele.",
        "hint": "Eine pauschale Bewertung nur nach der Herkunft ist zu einfach."
      },
      {
        "title": "Reflexion: Fett ganz weglassen?",
        "body": "Bearbeite die Reflexionsfrage von Heftseite 5 auf deinem Extrablatt.",
        "reflection": {
          "question": "Du möchtest dich gesund ernähren und streichst Fett komplett aus deinem Speiseplan. Warum ist das keine gute Idee? Wie könntest du es besser machen?",
          "tips": [
            "Nenne mindestens zwei Aufgaben von Fett.",
            "Beschreibe eine passende Auswahl und Menge mit einem konkreten Lebensmittelbeispiel."
          ]
        }
      }
    ]
  },
  {
    "id": "nutrients-proteins",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 4: Proteine",
    "description": "Eiweiße als Baustoffe und ihre Quellen kennenlernen; Heftseite 6 ausfüllen.",
    "slides": [
      {
        "title": "Eiweiße bauen deinen Körper auf",
        "body": "Proteine heißen auch Eiweiße und gehören zu den Makronährstoffen. Sie sind wichtige Baustoffe: Der Körper braucht sie zum Aufbau, zur Erneuerung und zur Reparatur von Zellen. Dazu gehören auch Muskeln. Ausreichend Protein ist wichtig; mehr Protein allein lässt Muskeln nicht automatisch wachsen.",
        "workbook": {
          "page": 6,
          "heading": "Proteine – Baustoff für deinen Körper",
          "prompt": "Fülle den Lückentext mit den Wörtern aus dem Kasten.",
          "entries": [
            "Proteine werden auch Eiweiße genannt.",
            "Sie gehören zu den Makronährstoffen.",
            "Proteine sind wichtige Baustoffe für deinen Körper.",
            "Sie werden zum Aufbau, zur Erneuerung und zur Reparatur von Zellen benötigt.",
            "Auch deine Muskeln brauchen Proteine."
          ]
        }
      },
      {
        "title": "Aminosäuren: die kleinen Bausteine",
        "body": "Proteine bestehen aus Aminosäuren. Für den Aufbau körpereigener Proteine verwendet der Körper 20 verschiedene Aminosäuren. Einige kann er nicht selbst herstellen; sie heißen essenziell und müssen über die Nahrung aufgenommen werden. Unterschiedliche Lebensmittel liefern unterschiedliche Kombinationen.",
        "figure": "amino",
        "workbook": {
          "page": 6,
          "heading": "Woraus bestehen Proteine?",
          "prompt": "Ergänze den Namen der Proteinbausteine.",
          "entries": [
            "Proteine bestehen aus kleinen Bausteinen, den Aminosäuren.",
            "Essenziell bedeutet hier: Der Körper kann diese Aminosäuren nicht selbst herstellen und braucht sie aus der Nahrung."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Essenziell",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Was bedeutet „essenzielle Aminosäure“?",
        "choices": [
          "Sie kommt nur in Sportgetränken vor.",
          "Sie wird vom Körper nicht gebraucht.",
          "Sie muss über die Nahrung aufgenommen werden, weil der Körper sie nicht selbst herstellen kann."
        ],
        "answer": 2,
        "why": "Essenziell bedeutet in diesem Zusammenhang unentbehrlich aus der Nahrung.",
        "hint": "Die Frage ist, ob der Körper den Baustein selbst herstellen kann."
      },
      {
        "title": "Tierische und pflanzliche Proteinquellen",
        "body": "Fleisch, Fisch, Eier, Milch und Milchprodukte liefern tierische Proteine. Pflanzliche Quellen sind Linsen, Bohnen, Kichererbsen, Sojaprodukte, Nüsse und Getreide. Eine abwechslungsreiche Kombination ist sinnvoll, zum Beispiel Linsensuppe mit Vollkornbrot. Spezielle High-Protein-Produkte sind für eine ausgewogene Ernährung nicht automatisch nötig.",
        "workbook": {
          "page": 6,
          "heading": "Wir unterscheiden",
          "prompt": "Sammle passende Beispiele in beiden Spalten.",
          "entries": [
            "Tierisch: Fleisch, Fisch, Eier, Milch und Milchprodukte.",
            "Pflanzlich: Hülsenfrüchte wie Linsen, Bohnen und Kichererbsen; Sojaprodukte, Nüsse und Getreide."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Pflanzliches Eiweiß",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Mahlzeit enthält eine typische pflanzliche Proteinquelle?",
        "choices": [
          "Linsensuppe mit Vollkornbrot.",
          "Limonade mit Zucker.",
          "Wasser mit Eiswürfeln."
        ],
        "answer": 0,
        "why": "Linsen gehören zu den proteinreichen Hülsenfrüchten.",
        "hint": "Suche die Hülsenfrucht."
      },
      {
        "title": "Wissens-Check-up: Körperaufbau",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Wofür verwendet dein Körper Proteine vor allem?",
        "choices": [
          "Um alle Mineralstoffe zu ersetzen.",
          "Zum Aufbau und zur Reparatur von Zellen.",
          "Nur als Geschmacksstoff."
        ],
        "answer": 1,
        "why": "Proteine sind Baustoffe des Körpers.",
        "hint": "Denke an Wachstum und Erneuerung."
      },
      {
        "title": "Denkaufgabe: Warum gerade jetzt?",
        "body": "Die Denkaufgabe von Heftseite 6 gehört ebenfalls auf dein Extrablatt.",
        "reflection": {
          "question": "Warum ist es gerade für dich wichtig, ausreichend Proteine zu essen? Denke an Wachstum, Schule, Sport oder deine Gesundheit.",
          "tips": [
            "Verbinde deine Lebenssituation mit Aufbau, Erneuerung oder Reparatur von Zellen.",
            "Nenne eine passende Proteinquelle für deinen Alltag."
          ]
        }
      }
    ]
  },
  {
    "id": "nutrients-vitamins",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 5: Vitamine",
    "description": "Schutz- und Reglerstoffe sowie wasser- und fettlösliche Vitamine; Heftseite 7.",
    "slides": [
      {
        "title": "Kleine Mengen, große Aufgaben",
        "body": "Vitamine sind lebenswichtige Mikronährstoffe. Sie liefern keine Energie, unterstützen aber Stoffwechsel, Immunsystem und Leistungsfähigkeit. Die meisten musst du regelmäßig mit der Nahrung aufnehmen. Vitamine unterstützen die normale Abwehr; sie verhindern nicht jede Krankheit.",
        "workbook": {
          "page": 7,
          "heading": "Vitamine – Schutz- und Reglerstoffe",
          "prompt": "Fülle den Lückentext und ergänze die Bedeutung für den Körper.",
          "entries": [
            "Vitamine sind lebenswichtige Nährstoffe und gehören zu den Mikronährstoffen.",
            "Sie sind wichtig für Stoffwechsel, Immunsystem und Leistungsfähigkeit.",
            "Du musst die meisten regelmäßig über die Nahrung aufnehmen.",
            "Aufgaben: Immunsystem unterstützen, Stoffwechsel regulieren, normale Körperfunktionen und Wohlbefinden unterstützen. Die Formulierung „schützen vor Krankheiten“ im Heft ist keine Garantie, gesund zu bleiben."
          ]
        }
      },
      {
        "title": "Wasserlöslich oder fettlöslich?",
        "body": "Vitamin C und die B-Vitamine sind wasserlöslich. Für ihre Aufnahme ist kein Fett nötig; viele werden nur begrenzt gespeichert und sollten regelmäßig aufgenommen werden. Vitamin B12 ist eine wichtige Ausnahme: Es kann lange gespeichert werden. Die fettlöslichen Vitamine A, D, E und K werden mit Fett aufgenommen und können im Körper gespeichert werden.",
        "figure": "vitamins",
        "workbook": {
          "page": 7,
          "heading": "Wir unterscheiden",
          "prompt": "Beschrifte die beiden Gruppen und ergänze Eigenschaften und Beispiele.",
          "entries": [
            "Wasserlöslich: C und B-Vitamine, zum Beispiel B5, B6 und B12. Aufnahme ohne Fett; viele werden nur kurz gespeichert. Ausnahme: Vitamin B12.",
            "Fettlöslich: A, D, E, K. Fett unterstützt die Aufnahme; Speicherung im Körper ist möglich."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Gruppen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Reihe nennt die fettlöslichen Vitamine?",
        "choices": [
          "A, D, E und K.",
          "C, B5, B6 und B12.",
          "Nur Vitamin C."
        ],
        "answer": 0,
        "why": "Die vier fettlöslichen Vitamine kannst du dir als „EDeKA“ merken.",
        "hint": "Vitamin C gehört zur wasserlöslichen Gruppe."
      },
      {
        "title": "Abwechslung statt Wundermittel",
        "body": "Obst und Gemüse liefern viele Vitamine. Auch Vollkornprodukte, Nüsse, Milchprodukte, Eier und Fisch tragen je nach Lebensmittel zur Versorgung bei. Nahrungsergänzungsmittel ersetzen keine abwechslungsreiche Ernährung; insbesondere fettlösliche Vitamine können bei übermäßiger Einnahme problematisch sein.",
        "workbook": {
          "page": 7,
          "heading": "Merke",
          "prompt": "Übernimm einen passenden Merksatz.",
          "entries": [
            "Obst und Gemüse liefern viele Vitamine. Auch Nüsse, Vollkornprodukte und Fisch tragen zur Vitaminversorgung bei. Eine abwechslungsreiche Auswahl ist wichtig."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Speichern",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Warum ist „Alle wasserlöslichen Vitamine werden nie gespeichert“ ungenau?",
        "choices": [
          "Weil alle wasserlöslichen Vitamine Fette sind.",
          "Weil Vitamin C aus Knochen besteht.",
          "Weil Vitamin B12 als Ausnahme lange gespeichert werden kann."
        ],
        "answer": 2,
        "why": "Die Gruppe hat Gemeinsamkeiten, aber auch Ausnahmen.",
        "hint": "Denke an die ausdrücklich genannte Ausnahme."
      },
      {
        "title": "Wissens-Check-up: Versorgung",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Strategie passt zu einer guten Vitaminversorgung?",
        "choices": [
          "Nur ein einziges Lebensmittel essen.",
          "Verschiedene Lebensmittel abwechslungsreich kombinieren.",
          "Vorsorglich sehr große Mengen Vitaminpräparate einnehmen."
        ],
        "answer": 1,
        "why": "Verschiedene Lebensmittel liefern unterschiedliche Vitamine.",
        "hint": "Abwechslung ist sinnvoller als ein vermeintliches Wundermittel."
      }
    ]
  },
  {
    "id": "nutrients-minerals",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 6: Mineralstoffe",
    "description": "Aufgaben und Quellen wichtiger Mineralstoffe zuordnen; Heftseite 8.",
    "slides": [
      {
        "title": "Mineralstoffe regeln und bauen auf",
        "body": "Mineralstoffe gehören zu den Mikronährstoffen und liefern keine Energie. Sie sind am Aufbau von Knochen und Zähnen, am Wasserhaushalt, am Sauerstofftransport sowie an Muskel-, Nerven- und Stoffwechselvorgängen beteiligt. Der Körper kann sie nicht selbst herstellen.",
        "workbook": {
          "page": 8,
          "heading": "Mineralstoffe – kleine Stoffe, wichtige Aufgaben",
          "prompt": "Ergänze Erklärung und Bedeutung für den Körper.",
          "entries": [
            "Mineralstoffe sind lebenswichtige Mikronährstoffe.",
            "Sie werden im Vergleich zu Makronährstoffen in kleinen Mengen gebraucht und unterstützen Stoffwechsel, Knochenaufbau und Körperfunktionen.",
            "Sie sind Bausteine für Knochen und Zähne, regulieren den Wasserhaushalt und unterstützen den Sauerstofftransport sowie Muskel- und Nervenfunktionen."
          ]
        }
      },
      {
        "title": "Wer übernimmt welche Aufgabe?",
        "body": "Calcium ist wichtig für Knochen und Zähne. Eisen ist Bestandteil des roten Blutfarbstoffs und hilft beim Sauerstofftransport. Magnesium unterstützt Muskeln und Nerven. Zink ist unter anderem für das Immunsystem wichtig. Kalium und Natrium sind am Wasserhaushalt beteiligt.",
        "figure": "minerals",
        "workbook": {
          "page": 8,
          "heading": "Wichtige Mineralstoffe",
          "prompt": "Ordne die Namen und Aufgaben den Symbolen zu.",
          "entries": [
            "Ca: Calcium → Knochen und Zähne.",
            "Fe: Eisen → Sauerstofftransport.",
            "Mg: Magnesium → Muskeln und Nerven.",
            "Zn: Zink → Immunsystem.",
            "K: Kalium und Na: Natrium → Wasserhaushalt."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Sauerstoff",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welcher Mineralstoff wird für den Sauerstofftransport im Blut benötigt?",
        "choices": [
          "Calcium.",
          "Eisen.",
          "Natrium."
        ],
        "answer": 1,
        "why": "Eisen ist Bestandteil des roten Blutfarbstoffs Hämoglobin.",
        "hint": "Suche den Mineralstoff mit dem Symbol Fe."
      },
      {
        "title": "Mineralstoffe stecken in vielen Lebensmitteln",
        "body": "Milch und Käse liefern unter anderem Calcium. Hülsenfrüchte, Vollkornprodukte, Nüsse und Samen liefern verschiedene Mineralstoffe. Auch Fisch, Eier, Gemüse, Obst und je nach Zusammensetzung Mineralwasser tragen zur Versorgung bei. Natrium nehmen wir unter anderem als Bestandteil von Kochsalz auf; zusätzlich viel Salz ist nicht nötig.",
        "workbook": {
          "page": 8,
          "heading": "Enthalten in",
          "prompt": "Ergänze verschiedene Lebensmittelquellen.",
          "entries": [
            "Hülsenfrüchte, Fisch, Eier, Milch, Käse, Nüsse, Samen, Vollkornprodukte, Obst, grünes Gemüse und Mineralwasser.",
            "Passender Merksatz für diese Seite: Verschiedene Lebensmittel liefern verschiedene Mineralstoffe – abwechslungsreich essen hilft bei der Versorgung. Der Vitamin-Merksatz in der Vorlage passt hier nicht zur Überschrift."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Aufgaben zuordnen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Zuordnung stimmt?",
        "choices": [
          "Calcium – Knochen und Zähne.",
          "Zink – wichtigste Energiequelle.",
          "Magnesium – ersetzt alle Vitamine."
        ],
        "answer": 0,
        "why": "Calcium ist ein wichtiger Baustoff für Knochen und Zähne.",
        "hint": "Mineralstoffe liefern keine Energie und ersetzen keine anderen Nährstoffgruppen."
      },
      {
        "title": "Wissens-Check-up: Symbole",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche beiden Mineralstoffe sind besonders am Wasserhaushalt beteiligt?",
        "choices": [
          "Eisen und Calcium.",
          "Vitamin C und Vitamin D.",
          "Kalium und Natrium."
        ],
        "answer": 2,
        "why": "Im Heft erkennst du sie an K und Na.",
        "hint": "Gesucht sind zwei Mineralstoffe, keine Vitamine."
      }
    ]
  },
  {
    "id": "nutrients-cooking",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 7: Schonend zubereiten",
    "description": "Nährstoffe bei Einkauf, Lagerung und Zubereitung schützen; Heftseite 9.",
    "slides": [
      {
        "title": "Was kann verloren gehen?",
        "body": "Bei Lagerung und Zubereitung können Vitamine abgebaut und wasserlösliche Stoffe ausgewaschen werden. Hitze, Wasser, Licht und Luft spielen dabei eine Rolle. Wichtig ist die Unterscheidung: Mineralstoffe werden durch Hitze nicht zerstört, können aber ins Kochwasser übergehen.",
        "workbook": {
          "page": 9,
          "heading": "Vitamine und Mineralstoffe schonend zubereiten",
          "prompt": "Ergänze den Einleitungstext.",
          "entries": [
            "Beim Kochen und Zubereiten von Lebensmitteln können Vitamine und Mineralstoffe verloren gehen.",
            "Hitze, Wasser, Licht und Luft können empfindliche Vitamine abbauen oder Nährstoffe auswaschen.",
            "Lebensmittel deshalb möglichst schonend behandeln. Mineralstoffe bleiben hitzestabil, können aber ausgewaschen werden."
          ]
        }
      },
      {
        "title": "Frisch kaufen und passend lagern",
        "body": "Kaufe Obst und Gemüse möglichst frisch, lagere empfindliche Sorten passend, häufig kühl und dunkel, und schneide sie erst kurz vor der Zubereitung. Die Lagerung hängt vom Lebensmittel ab: Nicht alles gehört in den Kühlschrank. Geschnittene Flächen setzen den Inhalt stärker Luft und Licht aus.",
        "figure": "cooking",
        "workbook": {
          "page": 9,
          "heading": "Empfindlich gegenüber Licht und Luft",
          "prompt": "Notiere drei praktische Maßnahmen.",
          "entries": [
            "Frisch einkaufen.",
            "Passend, möglichst lichtgeschützt lagern; viele empfindliche Sorten kühl.",
            "Erst kurz vor der Zubereitung oder dem Essen schneiden."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Vorbereitung",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Wie bereitest du Gemüse möglichst nährstoffschonend vor?",
        "choices": [
          "Am Vortag klein schneiden und offen liegen lassen.",
          "Stundenlang klein geschnitten in Wasser legen.",
          "Kurz waschen und erst kurz vor der Zubereitung schneiden."
        ],
        "answer": 2,
        "why": "So verringerst du lange Kontakte mit Wasser, Licht und Luft.",
        "hint": "Halte Waschen und Lagerung der Schnittstücke möglichst kurz."
      },
      {
        "title": "Wenig Wasser, kurze Garzeit",
        "body": "Wasche Gemüse kurz, bevor du es zerkleinerst. Lasse geschnittenes Gemüse nicht lange im Wasser liegen. Verwende beim Garen möglichst wenig Wasser. Geeignetes Gemüse lässt sich dünsten oder dämpfen. Gare so kurz wie nötig und so lange wie aus Gründen der Lebensmittelsicherheit erforderlich.",
        "workbook": {
          "page": 9,
          "heading": "Empfindlich gegenüber Hitze und Wasser",
          "prompt": "Fülle beide Maßnahmenbereiche.",
          "entries": [
            "Hitze: Gemüse nur kurz garen; nicht unnötig lange kochen; geeignetes Gemüse dünsten oder dämpfen und möglichst knackig garen.",
            "Wasser: kurz waschen; nicht klein geschnitten im Wasser liegen lassen; wenig Garwasser verwenden.",
            "Geeignetes Gemüsekochwasser kann für Suppen oder Soßen weiterverwendet werden. Das gilt nicht für jedes Lebensmittel, zum Beispiel nicht für Kochwasser von rohen Bohnen.",
            "Merke: Schonende Zubereitung schützt Vitamine in Lebensmitteln."
          ]
        }
      },
      {
        "title": "Wissens-Check-up: Ursache",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Was kann mit Mineralstoffen beim Kochen passieren?",
        "choices": [
          "Sie werden durch Wärme vollständig vernichtet.",
          "Sie können aus dem Lebensmittel ins Wasser übergehen.",
          "Sie verwandeln sich in Vitamine."
        ],
        "answer": 1,
        "why": "Mineralstoffe sind hitzestabil; Verluste entstehen vor allem durch Auswaschen.",
        "hint": "Unterscheide Zerstören und Auswaschen."
      },
      {
        "title": "Wissens-Check-up: Garen",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Welche Methode schont bei geeignetem Gemüse häufig die Nährstoffe?",
        "choices": [
          "Dämpfen mit kurzer, ausreichender Garzeit.",
          "Sehr lange in viel Wasser kochen und alles wegschütten.",
          "Klein schneiden und einen Tag im Wasser lagern."
        ],
        "answer": 0,
        "why": "Dämpfen begrenzt den direkten Kontakt mit Kochwasser.",
        "hint": "Denke an wenig Wasser und eine passende Garzeit."
      }
    ]
  },
  {
    "id": "nutrients-check",
    "subject": "Hauswirtschaft",
    "grades": [
      7
    ],
    "topic": "Nährstoffe",
    "mode": "Lernen",
    "nutrientUnit": true,
    "title": "Lernwelt 8: Nährstoff-Check und Auswertung",
    "description": "Die 16 Heftaussagen prüfen, die Lernampel auswerten und einen nächsten Schritt planen.",
    "slides": [
      {
        "title": "Dein Nährstoff-Check",
        "body": "Bearbeite jetzt Heftseite 10 und die Auswertung auf Seite 11. Online entscheidest du bei allen 16 Aussagen „richtig“ oder „falsch“. Jede korrekt beurteilte Aussage zählt einen Punkt, also auch das richtige Erkennen einer falschen Aussage. So sind 16 Punkte möglich. Es gibt keine Note. Deine Auswahl bleibt beim Zurückblättern erhalten; du kannst sie nach der Rückmeldung verbessern.",
        "workbook": {
          "page": 10,
          "heading": "Nährstoff-Check – Bist du fit?",
          "prompt": "Kreuze im Merkheft nur die zutreffenden Aussagen an. Kontrolliere anschließend alle 16 Entscheidungen.",
          "entries": [
            "Bei einer falschen Aussage ist ein leeres Kästchen im Heft die richtige Entscheidung.",
            "Die Online-Rückmeldung hilft beim Lernen. Dein Ergebnis zeigt den aktuellen Bearbeitungsstand und ist kein benoteter Test."
          ]
        }
      },
      {
        "title": "Nährstoff-Check 1 von 16: Kohlenhydrate",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Komplexe Kohlenhydrate machen länger satt.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 0,
        "why": "Im Heft wird die typische Wirkung ballaststoffreicher, komplexer Kohlenhydratquellen beschrieben. Die gesamte Mahlzeit beeinflusst die Sättigung.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Kohlenhydrate"
      },
      {
        "title": "Nährstoff-Check 2 von 16: Kohlenhydrate",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Ballaststoffe fördern die Verdauung.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Sie unterstützen unter anderem die Darmtätigkeit.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Kohlenhydrate"
      },
      {
        "title": "Nährstoff-Check 3 von 16: Kohlenhydrate",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Süßigkeiten enthalten meist komplexe Kohlenhydrate.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 1,
        "why": "Süßigkeiten enthalten häufig viel einfachen Zucker.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Kohlenhydrate"
      },
      {
        "title": "Nährstoff-Check 4 von 16: Kohlenhydrate",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Komplexe Kohlenhydrate halten den Blutzucker stabil.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Als Faustregel des Hefts ist das richtig für viele ballaststoffreiche Lebensmittel: Sie lassen den Blutzucker oft langsamer steigen. Es gilt nicht unabhängig von Verarbeitung und Mahlzeit.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Kohlenhydrate"
      },
      {
        "title": "Nährstoff-Check 5 von 16: Fette",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Pflanzliche Fette sind meist günstiger für die Gesundheit.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 0,
        "why": "Viele pflanzliche Öle und Nüsse liefern günstige ungesättigte Fettsäuren. „Meist“ berücksichtigt Ausnahmen.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Fette"
      },
      {
        "title": "Nährstoff-Check 6 von 16: Fette",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Fett hilft bei der Aufnahme fettlöslicher Vitamine.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Die Vitamine A, D, E und K werden zusammen mit Fett besser aufgenommen.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Fette"
      },
      {
        "title": "Nährstoff-Check 7 von 16: Fette",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Fett hat im Körper keine wichtige Funktion.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 1,
        "why": "Fette liefern Energie, schützen Organe, sind Teil von Zellen und helfen bei der Vitaminaufnahme.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Fette"
      },
      {
        "title": "Nährstoff-Check 8 von 16: Proteine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Proteine sind Baustoffe für den Körper.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Sie werden für Aufbau, Erneuerung und Reparatur von Zellen gebraucht.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Proteine"
      },
      {
        "title": "Nährstoff-Check 9 von 16: Proteine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Aminosäuren sind die Bausteine der Proteine.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 0,
        "why": "Viele verbundene Aminosäuren bilden ein Protein.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Proteine"
      },
      {
        "title": "Nährstoff-Check 10 von 16: Proteine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "High-Protein-Produkte sind immer gesünder.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 0,
        "why": "Die gesamte Zusammensetzung zählt. Ein Werbehinweis macht ein Produkt nicht automatisch gesünder.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Proteine"
      },
      {
        "title": "Nährstoff-Check 11 von 16: Vitamine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Vitamine liefern Energie.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 1,
        "why": "Vitamine sind Mikronährstoffe und liefern keine Energie.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Vitamine"
      },
      {
        "title": "Nährstoff-Check 12 von 16: Vitamine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Obst und Gemüse sind wichtige Vitaminlieferanten.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Sie tragen zu einer abwechslungsreichen Vitaminversorgung bei.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Vitamine"
      },
      {
        "title": "Nährstoff-Check 13 von 16: Vitamine",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Fettlösliche Vitamine brauchen Fett zur Aufnahme.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 0,
        "why": "Etwas Fett in der Mahlzeit unterstützt die Aufnahme.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Vitamine"
      },
      {
        "title": "Nährstoff-Check 14 von 16: Mineralstoffe",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Eisen ist wichtig für den Sauerstofftransport.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 1,
        "why": "Eisen ist Bestandteil des roten Blutfarbstoffs.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Mineralstoffe"
      },
      {
        "title": "Nährstoff-Check 15 von 16: Mineralstoffe",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Calcium stärkt Knochen und Zähne.",
        "choices": [
          "Richtig",
          "Falsch"
        ],
        "answer": 0,
        "why": "Calcium ist ein wichtiger Bestandteil von Knochen und Zähnen.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Mineralstoffe"
      },
      {
        "title": "Nährstoff-Check 16 von 16: Mineralstoffe",
        "body": "Überprüfe dein Verständnis. Wähle eine Antwort aus; du erhältst sofort eine Rückmeldung.",
        "question": "Mineralstoffe gehören zu den Makronährstoffen.",
        "choices": [
          "Falsch",
          "Richtig"
        ],
        "answer": 0,
        "why": "Mineralstoffe gehören zu den Mikronährstoffen.",
        "hint": "Prüfe die Aussage mit dem Wissen aus der passenden Lernwelt.",
        "scoreGroup": "Mineralstoffe"
      },
      {
        "title": "Deine Auswertung und dein nächster Schritt",
        "body": "Die Auswertung zeigt dir die Punkte je Nährstoffgruppe und deine Lernampel. Übertrage die Werte auf Heftseite 11. Nutze besonders die Rückmeldungen zu unsicheren Aussagen zum Wiederholen.",
        "nutrientResult": true,
        "workbook": {
          "page": 11,
          "heading": "Nährstoff-Check – Auswertung",
          "prompt": "Trage die Gruppenpunkte, die Gesamtpunktzahl und die passende Ampelfarbe ein.",
          "entries": [
            "0–5 Punkte: Rot – wiederhole das Merkheft gründlich.",
            "6–11 Punkte: Gelb – festige einzelne Themen.",
            "12–16 Punkte: Grün – du kennst dich schon gut aus."
          ]
        },
        "reflection": {
          "question": "Was bedeutet dein Ampelergebnis für dich – und was möchtest du beim Thema Ernährung künftig besser beachten?",
          "tips": [
            "Bearbeite diese Reflexion auf deinem Extrablatt.",
            "Nenne ein Thema, das du wiederholen möchtest, und einen konkreten Schritt für deinen Alltag."
          ]
        }
      }
    ]
  }
];
tasks.push(...NUTRIENT_UNITS);

const nutrientCompleted=new Set();
function nutrientFigure(kind){
 const groups={
  workflow:[['📖','Online verstehen','Lies die Erklärungen und prüfe dein Wissen.'],['✏️','Merkheft befüllen','Trage Begriffe und Beispiele ein.'],['📝','Auf Extrablatt reflektieren','Begründe deine eigenen Entscheidungen.']],
  roles:[['⚡','Energie','Für Bewegung, Denken und Körperwärme.'],['🧱','Baustoffe','Für Wachstum und Erneuerung.'],['⚙️','Regelung','Für funktionierende Körpervorgänge.']],
  macro:[['🍞','Kohlenhydrate','Vor allem Energie'],['🫒','Fette','Energie, Zellaufbau und Schutz'],['🫘','Proteine','Vor allem Baustoffe']],
  micro:[['🍊','Vitamine','Unterstützen und regulieren Körperfunktionen.'],['🦴','Mineralstoffe','Unter anderem Aufbau und Regelung.']],
  fat:[['🫒','Etwas Fett in der Mahlzeit','Zum Beispiel Öl im Salat'],['➜','Unterstützt die Aufnahme','Fett wird für die Aufnahme genutzt.'],['🥕','Fettlösliche Vitamine','A · D · E · K']],
  vitamins:[['💧','Wasserlöslich','C und B-Vitamine; regelmäßige Zufuhr wichtig. B12 kann lange gespeichert werden.'],['🫒','Fettlöslich','A · D · E · K; Aufnahme mit Fett, Speicherung möglich.']],
  minerals:[['🦴','Calcium · Ca','Knochen und Zähne'],['🩸','Eisen · Fe','Sauerstofftransport'],['💪','Magnesium · Mg','Muskeln und Nerven'],['🛡️','Zink · Zn','Immunsystem'],['💧','Kalium · K / Natrium · Na','Wasserhaushalt']],
  cooking:[['🛒','Passend lagern','Frisch einkaufen und vor unnötigem Licht schützen.'],['🚿','Kurz waschen','Vor dem Zerkleinern, nicht lange wässern.'],['♨️','Schonend garen','Passend kurze Garzeit, wenig Wasser.']]
 };
 if(kind==='chains'||kind==='amino'){
  const amino=kind==='amino';
  const chain=n=>`<span class="nutrient-chain" aria-hidden="true">${Array.from({length:n},()=>'<i></i>').join('<b>–</b>')}</span>`;
  return `<figure class="nutrient-figure"><div class="nutrient-diagram">${amino?`<div>${chain(7)}<strong>Protein</strong><p>Viele verbundene Aminosäuren</p></div>`:`<div>${chain(1)}<strong>Ein Zuckerbaustein</strong><p>Zum Beispiel Traubenzucker</p></div><div>${chain(7)}<strong>Viele Zuckerbausteine</strong><p>Zum Beispiel Stärke</p></div>`}</div><figcaption>Vereinfachtes Bausteinmodell: ${amino?'Die Kreise stehen für Aminosäuren. Ihre Reihenfolge bestimmt das Protein.':'Die Kreise stehen für Zuckerbausteine; Stärke besteht aus langen Ketten.'}</figcaption></figure>`;
 }
 return `<figure class="nutrient-figure"><div class="nutrient-diagram">${(groups[kind]||[]).map(([icon,title,text])=>`<div><span class="nutrient-icon" aria-hidden="true">${icon}</span><strong>${escapeHTML(title)}</strong><p>${escapeHTML(text)}</p></div>`).join('')}</div><figcaption>${kind==='workflow'?'Dein Arbeitsweg durch jede Station.':'Die wichtigsten Zusammenhänge auf einen Blick.'}</figcaption></figure>`;
}
function nutrientWorkbook(slide){
 const b=slide.workbook;if(!b)return '';
 return `<section class="nutrient-workbook"><p class="eyebrow">✏️ Dein Merkheft · ${typeof b.page==='number'?'Seite '+b.page:escapeHTML(b.page)}</p><h2>${escapeHTML(b.heading)}</h2><p>${escapeHTML(b.prompt)}</p><h3>Damit kannst du die Felder befüllen</h3><ul>${b.entries.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul><p class="small">Trage die passenden Inhalte in dein Merkheft ein und kontrolliere sie anschließend.</p></section>`;
}
function nutrientReflection(slide){
 const r=slide.reflection;if(!r)return '';
 return `<section class="nutrient-reflection"><h2>📝 Reflexion / Denkaufgabe – auf dem Extrablatt</h2><p><strong>${escapeHTML(r.question)}</strong></p><p>Schreibe Name, Datum, Station und Heftseite dazu. Begründe deine Antwort in ganzen Sätzen.</p><ul>${r.tips.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul></section>`;
}
function nutrientResults(){
 const scored=current.slides.map((s,i)=>({...s,response:lessonResponses[i]})).filter(s=>s.scoreGroup);
 const total=scored.filter(s=>s.response?.checked&&s.response.choice===s.answer).length;
 const answered=scored.filter(s=>s.response?.checked).length;
 const groups=['Kohlenhydrate','Fette','Proteine','Vitamine','Mineralstoffe'];
 const color=total>=12?'Grün':total>=6?'Gelb':'Rot';
 return `<section class="nutrient-result" aria-label="Deine Lernampel"><h2>Nährstoffe – deine Lernampel</h2>${answered<16?`<p class="notice">Du hast erst ${answered} von 16 Aussagen beantwortet. Bearbeite zunächst alle Check-Seiten; dieses Ergebnis ist noch unvollständig.</p>`:''}<p class="nutrient-total"><strong>${total} / 16 Punkte · ${color}</strong></p><p>${total>=12?'Du kennst dich schon gut aus.':total>=6?'Festige einzelne Themen.':'Wiederhole die Lernwelten und das Merkheft noch einmal gründlich.'} Das ist eine Lernhilfe ohne Note. Gewertet wird deine aktuelle Auswahl einschließlich Verbesserungen.</p><table><caption>Punkte für Heftseite 11</caption><thead><tr><th scope="col">Nährstoffgruppe</th><th scope="col">Punkte</th></tr></thead><tbody>${groups.map(g=>{const rows=scored.filter(s=>s.scoreGroup===g);return `<tr><th scope="row">${g}</th><td>${rows.filter(s=>s.response?.checked&&s.response.choice===s.answer).length} / ${rows.length}</td></tr>`}).join('')}</tbody></table><h3>Was solltest du noch einmal ansehen?</h3><ul>${scored.filter(s=>!s.response?.checked||s.response.choice!==s.answer).map(s=>`<li><strong>${escapeHTML(s.question)}</strong> ${escapeHTML(s.why)}</li>`).join('')||'<li>Alle Aussagen sind aktuell richtig beurteilt. Erkläre die Zusammenhänge jetzt noch einmal mit eigenen Worten.</li>'}</ul></section>`;
}
function nutrientSlideExtra(slide){
 return (slide.figure?nutrientFigure(slide.figure):'')+nutrientWorkbook(slide)+nutrientReflection(slide)+(slide.nutrientResult?nutrientResults():'');
}
function nutrientStationProgress(){
 const i=NUTRIENT_UNITS.findIndex(t=>t.id===current.id);
 return `<nav class="nutrient-stations no-print" aria-label="Nährstoff-Lernwelten">${NUTRIENT_UNITS.map((t,j)=>`<button class="secondary ${i===j?'active':''}" type="button" data-nutrient-station="${t.id}" ${i===j?'aria-current="step"':''} aria-label="${escapeHTML(t.title)}${nutrientCompleted.has(t.id)?' – bearbeitet':''}">${j===0?'Start':j}${nutrientCompleted.has(t.id)?' ✓':''}</button>`).join('')}</nav><p class="small muted">${i===0?'Einführung':'Station '+i+' von 8'} · ${nutrientCompleted.size} von 9 Lernwelten bearbeitet. Der Online-Arbeitsstand gilt bis zum Neuladen.</p>`;
}
function bindNutrientLesson(){
 if(!current?.nutrientUnit)return;
 $('lessonContent').insertAdjacentHTML('afterbegin',nutrientStationProgress());
 document.querySelectorAll('[data-nutrient-station]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.nutrientStation)));
 if(lessonStage!=='content')return;
 document.querySelector('.lesson-card').insertAdjacentHTML('beforeend',nutrientSlideExtra(current.slides[lessonPage]));
 document.querySelector('#lessonContent .progress-track').insertAdjacentHTML('afterend','<div class="notebook-tools no-print"><button type="button" class="secondary" id="printNutrientStation">Station drucken / als PDF</button></div>');
 $('printNutrientStation').addEventListener('click',printNutrientStation);
 const h=document.querySelector('.check-card h3');if(h)h.textContent='🧠 Wissens-Check-up';
 if(lessonPage===current.slides.length-1)$('lessonNext').textContent=current.id===NUTRIENT_UNITS.at(-1).id?'Abschließen und zur Übersicht →':'Station abschließen →';
}
function completeNutrientStation(){
 nutrientCompleted.add(current.id);
 const i=NUTRIENT_UNITS.findIndex(t=>t.id===current.id);
 if(i<NUTRIENT_UNITS.length-1){start(NUTRIENT_UNITS[i+1].id);return}
 show('home');catalog();navStep('Materials');
}
function printNutrientStation(){
 $('notebookPrint').innerHTML=`<div class="print-kicker">FRAU SALLIERS LERNWELT · HAUSWIRTSCHAFT · KLASSE 7</div><h1>Nährstoffe – ${escapeHTML(current.title)}</h1><p>Name: ____________________ · Datum: __________</p><p>Arbeitsübersicht zum Merkheft. Reflexions- und Denkaufgaben auf einem Extrablatt bearbeiten.</p>${current.slides.map(s=>`<section class="print-task"><h2>${escapeHTML(s.title)}</h2><p>${escapeHTML(s.body)}</p>${s.question?`<p><strong>${escapeHTML(s.question)}</strong></p><ul>${s.choices.map(c=>`<li>□ ${escapeHTML(c)}</li>`).join('')}</ul>`:''}${nutrientSlideExtra(s)}</section>`).join('')}`;
 document.body.classList.add('print-notebook');window.print();
}
function validateNutrientContent(){
 const ids=new Set(),questions=new Set();
 for(const unit of NUTRIENT_UNITS){
  if(ids.has(unit.id)||unit.slides.filter(s=>s.question).length<2)throw new Error('Unvollständige Nährstoffstation');ids.add(unit.id);
  for(const s of unit.slides.filter(s=>s.question)){
   if(questions.has(s.question)||!s.choices[s.answer]||!s.why||!s.hint)throw new Error('Ungültiger Nährstoff-Check-up');questions.add(s.question);
  }
 }
}
validateNutrientContent();
