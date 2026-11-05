'use strict';

// Ergänzende Übung zu den sechzehn hochgeladenen Übungsheftseiten (S. 3–18).
const sourceWorkbook={
 classifications:[
  ['Ein Kochrezept für Pfannkuchen.','Ja'],
  ['„Mach mal irgendwas Cooles!“','Nein'],
  ['Die Anleitung zum Aufbau eines LEGO-Sets.','Ja'],
  ['Eine Wegbeschreibung von der Schule nach Hause.','Ja'],
  ['Das Bild eines Sonnenuntergangs.','Nein']
 ],
 unclear:['Lauf nach Hause!','Mach es schöner!','Spiel mit dem Hund!'],
 jam:['Glas Marmelade wieder zuschrauben.','Brot auf einen Teller legen.','Mit dem Messer Marmelade aus dem Glas nehmen.','Marmelade auf das Brot streichen.','Glas Marmelade öffnen.'],
 symbols:[['Ist das Auto getankt?','Raute'],['Fertig!','Oval'],['Lege die Karten auf den Tisch.','Rechteck']]
};
tasks.push({id:'algo-source-practice',subject:'Informatik',grades:[6],topic:'Algorithmen',mode:'Übung',title:'Wissen anwenden',description:'Vierzehn Aufgaben mit Glossar: Anweisungen, Ablaufpläne, Verzweigungen, Schleifen, Sortieren und Suchen.',workbook:true});

// Definitionen nach dem bereitgestellten Glossar, für die Webseite kurz gefasst.
const sourceGlossary=[
 ['Algorithmus','Eine Liste von Anweisungen, die Schritt für Schritt zu einem Ziel führt.'],
 ['Anweisung','Ein einzelner Schritt in einem Algorithmus.'],
 ['Eindeutig','Klar und ohne Missverständnisse: Es ist genau erkennbar, was zu tun ist.'],
 ['Flussdiagramm','Ein Bild aus Symbolen für einen Algorithmus. Pfeile geben die Reihenfolge an.'],
 ['Oval','Symbol für Start oder Ende eines Flussdiagramms.'],
 ['Rechteck','Symbol für eine Aktion im Flussdiagramm.'],
 ['Raute','Symbol für eine Entscheidung mit Ja- und Nein-Weg.'],
 ['Verzweigung','Abhängig von einer Bedingung wird ein Weg gewählt: wenn–dann–sonst.'],
 ['Schleife','Wiederholung von Schritten, gesteuert durch eine feste Anzahl oder eine Bedingung.'],
 ['Tauschen','Zwei Karten oder Werte wechseln ihren Platz.'],
 ['Bubble Sort','Benachbarte Karten vergleichen und bei Bedarf tauschen; Durchgänge wiederholen.'],
 ['Insertion Sort','Jede nächste Karte an der passenden Stelle im bereits sortierten Teil einfügen.'],
 ['Lineare Suche','Karten der Reihe nach prüfen, bis der gesuchte Wert gefunden oder die letzte Karte geprüft ist.']
];
function workbookNumbers(text){
 const clean=text.replace(/[\[\]]/g,'').trim();
 return clean?clean.split(/[\s,;]+/).map(Number):[];
}
function workbookSelect(id,label,options){
 return `<label for="${id}">${escapeHTML(label)}</label><select id="${id}"><option value="">Bitte auswählen</option>${options.map(v=>`<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('')}</select><div class="workbook-print-value" data-print-for="${id}" aria-hidden="true"></div>`;
}
function workbookText(id,label){
 return `<label for="${id}">${escapeHTML(label)}</label><textarea id="${id}" rows="5" maxlength="2500" placeholder="Deine eigenen Anweisungen"></textarea><div class="workbook-print-value" data-print-for="${id}" aria-hidden="true"></div>`;
}
function workbookFeedback(id){return `<div id="${id}" class="workbook-feedback" aria-live="polite"></div>`}
function startSourceWorkbook(){
 $('workHead').innerHTML='<h1>Wissen anwenden</h1><p>Informatik · Klasse 6 · Anweisungen, Abläufe und Algorithmen selbst anwenden</p><p>Bearbeite zuerst selbst die Aufgaben. Einundzwanzig Antworten werden automatisch geprüft. Freie Anweisungen und deinen eigenen Ablaufplan vergleichst du selbst mit den Hinweisen; dafür gibt es keine automatische inhaltliche Bewertung.</p><div class="actions no-print"><button type="button" id="workbookPrint" class="secondary">Aufgaben und eigene Antworten drucken / als PDF</button></div>';
 $('questions').innerHTML=`<div class="source-workbook">
  <section class="question"><h2>1. Was ist ein Algorithmus?</h2><p>Entscheide jeweils: Beschreibt das Beispiel einen Algorithmus?</p>${sourceWorkbook.classifications.map(([text],i)=>workbookSelect('wb-class-'+i,text,['Ja','Nein'])).join('')}${workbookFeedback('wb-feedback-class')}</section>
  <section class="question"><h2>2. Einen Tee kochen</h2><p>Schreibe einen Algorithmus mit mindestens fünf Schritten. Schreibe jeden Schritt in eine neue Zeile.</p>${workbookText('wb-tea','Deine Anleitung zum Teekochen')}${workbookFeedback('wb-feedback-tea')}<details><summary>Beispiel zur Selbstkontrolle</summary><ol><li>Wasser in den Wasserkocher füllen.</li><li>Wasser erhitzen.</li><li>Einen Teebeutel in eine Tasse legen.</li><li>Heißes Wasser in die Tasse gießen.</li><li>3 Minuten ziehen lassen.</li><li>Teebeutel herausnehmen.</li><li>Tee abkühlen lassen und trinken.</li></ol><p>Auch andere eindeutige, sinnvolle Anleitungen sind möglich.</p></details></section>
  <section class="question"><h2>3. Anweisungen genauer machen</h2><p>Formuliere diese ungenauen Anweisungen so um, dass ein Roboter weiß, was er tun soll. Ergänze die nötigen Angaben selbst.</p>${sourceWorkbook.unclear.map((text,i)=>workbookText('wb-clear-'+i,text)).join('')}${workbookFeedback('wb-feedback-clear')}<details><summary>Hinweise zur Selbstkontrolle</summary><p>Benenne einen genauen Weg mit einzelnen Schritten, konkrete Änderungen statt „schöner“ und eine bestimmte Handlung beim Spielen. Mehrere sinnvolle Lösungen sind möglich.</p><p>Mögliche Formulierungen:</p><ul><li>Laufe von hier aus geradeaus 200 Meter, biege an der Ampel links ab und gehe bis zum roten Haus.</li><li>Räume die Bücher ins Regal und stelle den Stuhl an den Tisch.</li><li>Hole das rote Bällchen aus dem Korb, wirf es fünfmal in den Garten und sage jedes Mal „Apport!“ zum Hund.</li></ul></details></section>
  <section class="question"><h2>4. Brot mit Marmelade machen</h2><p>Die Schritte sind durcheinander. Wähle für jeden Schritt einen Platz von 1 bis 5. Vergib jede Zahl genau einmal.</p>${sourceWorkbook.jam.map((text,i)=>workbookSelect('wb-jam-'+i,text,['1','2','3','4','5'])).join('')}${workbookFeedback('wb-feedback-jam')}</section>
  <section class="question"><h2>5. Symbole zuordnen</h2><p>Ordne jeder Aussage das passende Symbol zu.</p>${sourceWorkbook.symbols.map(([text],i)=>workbookSelect('wb-symbol-'+i,text,['Oval','Rechteck','Raute'])).join('')}${workbookFeedback('wb-feedback-symbol')}</section>
  <section class="question"><h2>6. Aktionen zählen</h2><p>Wie viele Aktionen (Rechtecke) enthält das vollständige Zähneputzen-Diagramm? Zähle Start und Ende nicht mit.</p>${renderActionDiagram(sourceTeethSteps,'workbook-teeth')}<label for="wb-count">Anzahl der Aktionen</label><input id="wb-count" type="number" min="0" max="20" inputmode="numeric"><div class="workbook-print-value" data-print-for="wb-count" aria-hidden="true"></div>${workbookFeedback('wb-feedback-count')}</section>
  <section class="question"><h2>7. Einen Schulranzen für morgen packen</h2><p>Erstelle einen eigenen Ablaufplan mit mindestens vier Aktionen. Digital: Trage pro Rechteck eine konkrete Aktion ein. Die Vorlage setzt Start, Ende und Pfeile dazu. Auf Papier kannst du dein Diagramm selbst zeichnen.</p><div id="workbookActions" class="workbook-action-editor no-print"></div><div class="actions no-print"><button type="button" class="secondary" id="wb-add-action">Aktion ergänzen</button><button type="button" class="secondary" id="wb-remove-action">Letzte Aktion entfernen</button></div><div id="workbookDiagram" class="workbook-own-diagram"></div>${workbookFeedback('wb-feedback-diagram')}<details><summary>Checkliste zur Selbstkontrolle</summary><ul><li>Beginnt dein Ablauf mit dem Oval Start und endet er mit dem Oval Ende?</li><li>Hast du mindestens vier konkrete Aktionen in einer sinnvollen Reihenfolge eingetragen?</li><li>Steht jede Aktion in einem eigenen Rechteck?</li><li>Verbinden die Pfeile alle Schritte in der richtigen Richtung?</li></ul><p>Die Vorlage setzt Symbole und Pfeile. Prüfe selbst, ob deine Aktionen wirklich erklären, wie du deinen Schulranzen für morgen packst.</p><p>Ein mögliches Beispiel: Stundenplan ansehen → Bücher und Hefte einpacken → Mäppchen einpacken → Trinkflasche und Pausenbrot einpacken. Sinnvolle Reihenfolgen dürfen variieren.</p></details></section>
  <section class="question"><h2>8. Wenn – dann – sonst</h2><p>Was machst du, wenn das Wetter schön ist? Ergänze einen eigenen Wenn–dann–sonst-Algorithmus.</p>${workbookText('wb-weather-if','Wenn … (Bedingung)')}${workbookText('wb-weather-yes','Dann … (Aktion bei Ja)')}${workbookText('wb-weather-no','Sonst … (Aktion bei Nein)')}${workbookFeedback('wb-feedback-weather')}<details><summary>Selbstkontrolle</summary><p>Kann deine Bedingung mit Ja oder Nein beantwortet werden? Passen die beiden unterschiedlichen Aktionen zu den beiden Wegen?</p><p>Ein mögliches Beispiel: Wenn das Wetter schön ist, gehe ich in den Park spielen, sonst spiele ich drinnen ein Brettspiel.</p></details></section>
  <section class="question"><h2>9. Ein Ampel-Flussdiagramm</h2><p>Stelle dar: Wenn die Ampel grün ist, gehe los. Sonst warte. Trage eine Ja/Nein-Frage und die beiden Aktionen ein. Die digitale Vorlage setzt Start, Ende, Raute und Pfeile dazu. Nach dem Warten wird die Frage erneut geprüft; erst bei Ja geht es weiter zum Ende. Alternativ kannst du selbst auf Papier zeichnen.</p><div class="no-print" id="workbookTrafficFields">${workbookText('wb-traffic-question','Frage in der Raute')}${workbookText('wb-traffic-yes','Aktion auf dem Ja-Weg')}${workbookText('wb-traffic-no','Aktion auf dem Nein-Weg')}</div><div id="workbookTrafficDiagram"></div>${workbookFeedback('wb-feedback-traffic')}</section>
  <section class="question"><h2>10. Eine Schleife lesen</h2><p>Lies den folgenden Ablauf. Wie oft wird „Hallo!“ geschrieben?</p><pre class="workbook-code">zaehler = 0
wiederhole solange zaehler &lt; 4:
    schreibe "Hallo!"
    zaehler = zaehler + 1</pre><label for="wb-loop-count">Anzahl der Ausgaben</label><input id="wb-loop-count" type="number" min="0" inputmode="numeric"><div class="workbook-print-value" data-print-for="wb-loop-count" aria-hidden="true"></div>${workbookFeedback('wb-feedback-loop')}</section>
  <section class="question"><h2>11. Bubble Sort fortsetzen</h2><p>Starte mit [2, 4, 1, 3, 5]. Vergleiche weiter von links nach rechts und beginne am Rand wieder links. Notiere nach jedem Tausch die neue Reihenfolge. Schritte ohne Tausch werden nicht notiert.</p>${[1,2,3].map(n=>workbookText('wb-sort-'+n,'Reihenfolge nach Tausch '+n)).join('')}${workbookText('wb-sort-final','Endergebnis')}<p class="small muted">Schreibe die fünf Zahlen zum Beispiel als 2, 4, 1, 3, 5.</p>${workbookFeedback('wb-feedback-sort')}</section>
  <section class="question"><h2>12. Insertion Sort anwenden</h2><p>Sortiere [4, 1, 5, 2, 3] mit Insertion Sort. Notiere nach jedem Einfügen die gesamte neue Reihenfolge. Auch wenn eine Karte schon passend liegt, trägst du den Zustand ein.</p>${[1,5,2,3].map((n,i)=>workbookText('wb-insertion-'+i,'Nach dem Einsortieren der Karte '+n)).join('')}${workbookFeedback('wb-feedback-insertion')}</section>
  <section class="question"><h2>13. Eine Karte linear suchen</h2><p>Suche die 6 in [4, 9, 2, 7, 6, 1, 5]. Prüfe von links nach rechts und höre beim Treffer auf.</p>${workbookText('wb-search-cards','Welche Karten prüfst du der Reihe nach?')}<p class="small muted">Eine Zahl je Zeile oder die geprüften Zahlen durch Kommas trennen.</p><label for="wb-search-count">Wie viele Schritte brauchst du?</label><input id="wb-search-count" type="number" min="0" inputmode="numeric"><div class="workbook-print-value" data-print-for="wb-search-count" aria-hidden="true"></div>${workbookFeedback('wb-feedback-search')}</section>
  <section class="question"><h2>14. Algorithmus-Detektiv: Schuhe binden</h2><p>In diesem Ablauf ist die Reihenfolge falsch. Beschreibe den Fehler und schreibe einen verbesserten Algorithmus.</p><pre class="workbook-code">1. Schleife zubinden.
2. Schnürsenkel in die Hand nehmen.
3. Eine Schlaufe machen.
4. Zweite Schlaufe durchziehen.
5. Festziehen.</pre>${workbookText('wb-detective','Dein verbesserter Algorithmus')}${workbookFeedback('wb-feedback-detective')}<details><summary>Hinweis zur Selbstkontrolle</summary><p>Der erste Schritt steht zu früh: Bevor du die Schleife zubindest, musst du die Schnürsenkel aufnehmen und die Schlaufen bilden. Prüfe, ob deine Anleitung vollständig, eindeutig und in sinnvoller Reihenfolge ist. Verschiedene Bindetechniken sind möglich; dein Text wird nicht automatisch inhaltlich bewertet.</p></details></section>
  <section class="workbook-glossary"><h2>Glossar</h2><p>Die wichtigsten Begriffe zum Nachschlagen.</p><dl>${sourceGlossary.map(([term,definition])=>`<div><dt>${escapeHTML(term)}</dt><dd>${escapeHTML(definition)}</dd></div>`).join('')}</dl></section>
  <p id="workbookSummary" class="notice" aria-live="polite">Noch nicht ausgewertet. Deine Eingaben bleiben während dieser Bearbeitung erhalten.</p>
 </div>`;
 for(let i=0;i<4;i++)addWorkbookAction();
 $('wb-add-action').onclick=()=>addWorkbookAction();
 $('wb-remove-action').onclick=()=>{if($('workbookActions').children.length>4)$('workbookActions').lastElementChild.remove();updateWorkbookDiagram()};
 $('workbookActions').addEventListener('input',updateWorkbookDiagram);
 ['wb-traffic-question','wb-traffic-yes','wb-traffic-no'].forEach(id=>{$(id).maxLength=36;$(id).rows=2;$(id).addEventListener('input',updateWorkbookTraffic)});
 updateWorkbookTraffic();
 $('workbookPrint').onclick=()=>{updateWorkbookPrint();window.print()};
 $('finish').textContent='Antworten prüfen und vergleichen';$('reset').textContent='Alle Aufgaben neu beginnen';show('work');
}
function addWorkbookAction(){
 const n=$('workbookActions').children.length;
 if(n>=8)return;
 const row=document.createElement('div');row.innerHTML=`<label for="wb-action-${n}">Aktion ${n+1}</label><input id="wb-action-${n}" maxlength="42" placeholder="Eine klare Anweisung">`;
 $('workbookActions').append(row);updateWorkbookDiagram();
}
function workbookActions(){return [...document.querySelectorAll('#workbookActions input')].map(el=>el.value.trim())}
function updateWorkbookDiagram(){
 const actions=workbookActions();
 $('workbookDiagram').innerHTML=renderActionDiagram(actions.map((text,i)=>text||`Deine Aktion ${i+1}`),'workbook-own');
 // Bei den ersten vier Eingabefeldern sind die Schaltflächen noch nicht vorhanden.
 if($('wb-add-action'))$('wb-add-action').disabled=actions.length>=8;
 if($('wb-remove-action'))$('wb-remove-action').disabled=actions.length<=4;
}
function updateWorkbookTraffic(){
 $('workbookTrafficDiagram').innerHTML=renderBranchDiagram($('wb-traffic-question').value.trim()||'Deine Ja/Nein-Frage',$('wb-traffic-yes').value.trim()||'Deine Ja-Aktion',$('wb-traffic-no').value.trim()||'Deine Nein-Aktion','workbook-traffic',true);
}
function updateWorkbookPrint(){
 if(current?.id!=='algo-source-practice')return;
 document.querySelectorAll('[data-print-for]').forEach(el=>{el.textContent=$(el.dataset.printFor)?.value.trim()||'Noch nicht beantwortet.'});
}
window.addEventListener('beforeprint',updateWorkbookPrint);
function finishSourceWorkbook(){
 const value=id=>$(id).value.trim();let correct=0;
 const check=(id,answer)=>{const good=value(id)===answer;if(good)correct++;return good};
 const feedback=(id,text,good)=>{const el=$(id);el.className='workbook-feedback '+(good?'good':'bad');el.textContent=text};
 const classes=sourceWorkbook.classifications.map(([label,answer],i)=>({label,answer,good:check('wb-class-'+i,answer)}));
 feedback('wb-feedback-class',classes.map((q,i)=>`${i+1}. ${q.good?'Richtig':`Richtig ist: ${q.answer}`}`).join(' · '),classes.every(q=>q.good));
 const tea=value('wb-tea').split(/\n/).filter(line=>line.trim());
 $('wb-feedback-tea').textContent=`Du hast ${tea.length} Schritte notiert. ${tea.length>=5?'Die Mindestanzahl ist erreicht.':'Gefordert sind mindestens fünf Schritte.'} Prüfe selbst, ob jeder Schritt klar ist und die Reihenfolge zum Ziel führt. Die Anzahl ist keine inhaltliche Bewertung.`;
 $('wb-feedback-clear').textContent=`${sourceWorkbook.unclear.filter((_,i)=>value('wb-clear-'+i)).length} von 3 Anweisungen bearbeitet. Prüfe mit den Hinweisen, ob ein Roboter ohne Raten handeln könnte. Freie Formulierungen werden nicht automatisch als richtig oder falsch bewertet.`;
 const positions=sourceWorkbook.jam.map((_,i)=>Number(value('wb-jam-'+i)));
 const [close,plate,take,spread,open]=positions;
 const ordered=new Set(positions).size===5&&positions.every(n=>n>=1&&n<=5)&&plate<spread&&open<take&&take<spread&&take<close;
 if(ordered)correct++;
 feedback('wb-feedback-jam',ordered?'Die Reihenfolge ist sinnvoll. Jede Position ist einmal vergeben.':'Eine mögliche Reihenfolge: Brot auf einen Teller legen → Glas öffnen → Marmelade mit dem Messer entnehmen → auf das Brot streichen → Glas wieder zuschrauben. Jede Position muss genau einmal vorkommen.',ordered);
 const symbols=sourceWorkbook.symbols.map(([label,answer],i)=>({answer,good:check('wb-symbol-'+i,answer)}));
 feedback('wb-feedback-symbol',symbols.map((q,i)=>`${i+1}. ${q.good?'Richtig':`Richtig ist: ${q.answer}`}`).join(' · '),symbols.every(q=>q.good));
 const count=check('wb-count','6');feedback('wb-feedback-count',count?'Richtig: sechs Aktionen. Start und Ende sind keine Aktionen.':'Das Diagramm enthält sechs Aktionsrechtecke. Die beiden Ovale zählen nicht mit.',count);
 const filled=workbookActions().filter(Boolean).length;
 $('wb-feedback-diagram').textContent=`${filled} eigene Aktionen eingetragen. ${filled>=4?'Die Mindestanzahl ist erreicht.':'Trage mindestens vier konkrete Aktionen ein.'} Prüfe selbst die Inhalte und ihre Reihenfolge. Die Vorlage zeichnet die Symbole; die Bedeutung deiner Anweisungen wird nicht automatisch bewertet.`;
 const weather=['wb-weather-if','wb-weather-yes','wb-weather-no'].filter(id=>value(id)).length;
 $('wb-feedback-weather').textContent=`${weather} von 3 Teilen bearbeitet. Prüfe selbst Bedingung und passende Aktionen. Freie Formulierungen werden nicht automatisch inhaltlich bewertet.`;
 $('wb-feedback-traffic').textContent='Prüfe selbst: Ist die Ampel grün? Ja führt zum Losgehen, Nein zum Warten und danach zurück zur Frage. Erst der Ja-Weg führt über das Losgehen zum Ende. Die Vorlage zeichnet die Symbole; deine Formulierungen werden nicht automatisch inhaltlich bewertet.';
 const loop=check('wb-loop-count','4');feedback('wb-feedback-loop',loop?'Richtig: viermal Hallo! Vor den Durchläufen ist der Zähler 0, 1, 2 und 3. Bei 4 ist 4 < 4 falsch.':'Hallo! wird viermal geschrieben: bei Zähler 0, 1, 2 und 3. Danach ist der Zähler 4 und die Schleife endet.',loop);
 const expected=[[2,1,4,3,5],[2,1,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
 const ids=['wb-sort-1','wb-sort-2','wb-sort-3','wb-sort-final'];
 const sorted=ids.map((id,i)=>{const good=JSON.stringify(workbookNumbers(value(id)))===JSON.stringify(expected[i]);if(good)correct++;return good});
 feedback('wb-feedback-sort',sorted.map((good,i)=>`${i<3?'Tausch '+(i+1):'Endergebnis'}: ${good?'Richtig':'Richtig ist ['+expected[i].join(', ')+']'}`).join(' · ')+' Beendet wird Bubble Sort erst nach einem vollständigen Durchgang ohne Tausch.',sorted.every(Boolean));
 const insertExpected=[[1,4,5,2,3],[1,4,5,2,3],[1,2,4,5,3],[1,2,3,4,5]];
 const insert=insertExpected.map((row,i)=>{const good=JSON.stringify(workbookNumbers(value('wb-insertion-'+i)))===JSON.stringify(row);if(good)correct++;return good});
 feedback('wb-feedback-insertion',insert.map((good,i)=>`Karte ${[1,5,2,3][i]}: ${good?'Richtig':'Richtig ist ['+insertExpected[i].join(', ')+']'}`).join(' · ')+' Beim Einsortieren der 5 bleibt die Reihenfolge unverändert, weil die 5 schon hinter 1 und 4 liegt.',insert.every(Boolean));
 const searchCards=JSON.stringify(workbookNumbers(value('wb-search-cards')))===JSON.stringify([4,9,2,7,6]);
 if(searchCards)correct++;
 const searchCount=check('wb-search-count','5');
 feedback('wb-feedback-search',searchCards&&searchCount?'Richtig: 4 → 9 → 2 → 7 → 6. Fünf Prüfungen; beim Treffer auf Position 5 endet die Suche.':'Geprüft werden 4, 9, 2, 7 und 6. Das sind fünf Schritte. Die Karten 1 und 5 werden nicht mehr geprüft.',searchCards&&searchCount);
 $('wb-feedback-detective').textContent=value('wb-detective')?'Dein verbesserter Algorithmus ist notiert. Vergleiche ihn mit dem Hinweis und prüfe die Reihenfolge. Freie Anleitungen werden nicht automatisch inhaltlich bewertet.':'Beschreibe den Fehler und notiere deinen verbesserten Algorithmus. Die freie Lösung bleibt zur Selbstkontrolle.';
 $('workbookSummary').textContent=`Automatisch geprüfte Antworten: ${correct} / 21 richtig. Die freien Aufgaben 2, 3, 7, 8, 9 und 14 bleiben Aufgaben zur Selbstkontrolle und sind nicht in dieser Zahl enthalten.`;
 updateWorkbookPrint();
}
