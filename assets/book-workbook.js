'use strict';

// Buchseiten 38–41; die Übungsheft-Aufgaben bleiben ein eigener Bereich.
const bookStory=[
 'Irving will in die Hauptstadt reisen.',
 'In der Hauptstadt trifft er den Wesir.',
 'Er kauft sich ein Bahnticket.',
 'Irving fährt mit der Bahn los.'
];
tasks.push({id:'algo-book-practice',subject:'Informatik',grades:[6],topic:'Algorithmen',mode:'Übung',title:'Mit dem Buch üben',description:'Pfannkuchen, Händewaschen, Fluchtweg, Geschichten, genaue Anweisungen und Labyrinth; dazu EVA und Programmiersprache.',bookWorkbook:true});

function bookReference(page,description){
 return `<details class="book-reference"><summary>Buchseite ${page}: ${escapeHTML(description)}</summary><a href="assets/sources/book-${page}.jpg" target="_blank" rel="noopener">Originalfoto zum Vergrößern öffnen</a><img src="assets/sources/book-${page}.jpg" alt="Bereitgestellte Buchseite ${page}: ${escapeHTML(description)}" loading="lazy"></details>`;
}
function startBookWorkbook(){
 restoreBookPrint();
 $('workHead').innerHTML='<h1>Mit dem Buch üben</h1><p>Informatik · Klasse 6 · Buchseiten 38–41</p><p>Nutze die Buchabbildungen und formuliere eigene klare Anweisungen. Drei Zuordnungen und die Reihenfolge der Geschichte werden automatisch geprüft. Alle freien Texte bleiben zur Selbstkontrolle.</p><div class="actions no-print"><button type="button" id="bookPrint" class="secondary">Buchaufgaben und eigene Antworten drucken / als PDF</button></div><label class="book-print-option no-print"><input type="checkbox" id="bookPrintSources"> Originalfotos der Buchseiten mitdrucken</label>';
 $('questions').innerHTML=`<div class="source-workbook book-workbook">
 <section class="question"><h2>1. Pfannkuchen: Bedingungen eines Algorithmus</h2>${bookReference(38,'Pfannkuchen-Anleitung mit Bildfolge')}${renderFigure('algo-general-learn',{title:'Pfannkuchen: eine Sequenz'})}<p>Ordne die Beispiele aus den Buchseiten den Bedingungen zu.</p>${workbookSelect('bk-condition-0','Öl muss vor dem Teig in die Pfanne. Die Reihenfolge muss feststehen.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookSelect('bk-condition-1','Eier werden aufgeschlagen und nicht mit Schale in den Teig gegeben.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookSelect('bk-condition-2','Es ist klar beschrieben, wann der Pfannkuchen fertig ist.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookFeedback('bk-feedback-conditions')}</section>
 <section class="question"><h2>2. M1: Händewaschen</h2>${bookReference(39,'M1 Händewaschen mit Bildern A–E und M2 Fluchtweg')}<p>Bearbeite die vier Aufgaben zu M1. Die Buchaufgabe gibt für die Befehlsfolge den Anfang „Halte eine Hand unter den Seifenspender“ vor.</p>${workbookText('bk-hands-description','Beschreibe die Bilder zum Händewaschen.')}${workbookText('bk-hands-commands','Schreibe deine Beschreibung als Befehlsfolge (Imperativ).')}${workbookText('bk-hands-properties','Erkläre Eindeutigkeit, Ausführbarkeit und Endlichkeit an deinem Ablauf.')}${workbookText('bk-hands-swap','Welche Anweisungen könnten vertauscht werden? Begründe deine Vermutung.')}<details><summary>Selbstkontrolle</summary><p>Prüfe die Bilder A–E. Nenne die einzelnen Handlungen, ihre Reihenfolge und ein Ende. Schreibe Befehle wie „Halte“, „Reibe“, „Spüle“ und „Trockne“. Begründe Vertauschungen, statt jede beliebige Reihenfolge zu akzeptieren.</p></details></section>
 <section class="question"><h2>3. M2: Einen Fluchtweg beschreiben</h2><p>Betrachte M2 auf Buchseite 39 im Originalfoto oben. Beschreibe vom markierten Standort aus den eingezeichneten Weg bis zum Ausgang und zum Sammelplatz. Für den eigenen Klassenraum nutze den tatsächlichen Fluchtplan deiner Schule.</p>${workbookText('bk-escape','Deine eindeutige Ablaufbeschreibung')}<details><summary>Selbstkontrolle</summary><p>Sind Start, Bewegungsrichtung, Abzweigungen und Ziel erkennbar? Kann jemand den beschriebenen Weg anhand des passenden Plans nachvollziehen? Vergleiche deine Beschreibung mit dem zugehörigen Plan; der Weg wird nicht automatisch bewertet.</p></details></section>
 <section class="question"><h2>4. M1: Geschichten lesen</h2>${bookReference(41,'Ablaufplan, Geschichte, Supermarktanweisungen und Labyrinth')}<p>Bringe die vier Handlungsschritte der Irving-Geschichte in eine sinnvolle Reihenfolge. Vergib jeden Platz von 1 bis 4 genau einmal. Daraus entsteht dein Ablaufplan. Die Vorlage verwendet Start- und Ende-Ovale wie im Übungsheft; das Buch kennzeichnet Start und Stop als eigene Blöcke.</p>${bookStory.map((text,i)=>workbookSelect('bk-story-'+i,text,['1','2','3','4'])).join('')}<div id="bookStoryDiagram"></div>${workbookFeedback('bk-feedback-story')}<p>Partneraufgabe aus dem Buch: Zeichne einen Ablaufplan zum Zähneputzen und lasse ihn von einer zweiten Person prüfen.</p></section>
 <section class="question"><h2>5. M2: Genaue Anweisungen</h2><p>Prüfe die ursprünglichen Anweisungen: „Gehe zur Obst- und Gemüseabteilung“, „Biege ein paar Schritte nach rechts ab“, „Bei den Konserven oder dem Mehl stehen die Nudeln“.</p>${workbookText('bk-directions-review','Sind diese Anweisungen eindeutig, ausführbar und endlich? Begründe.')}
 <p>Formuliere drei genaue Befehle für eine von dir festgelegte Situation. Benenne Ort, Richtung und Ziel konkret. Die Webseite kennt keinen tatsächlichen Supermarktplan.</p><div class="no-print" id="bookCommandFields">${[0,1,2].map(i=>workbookText('bk-command-'+i,'Dein Befehl '+(i+1))).join('')}</div><div id="bookCommandsDiagram"></div></section>
 <section class="question"><h2>6. M3: Labyrinth</h2><p>Öffne das Originalfoto von Buchseite 41 oben und verfolge im Labyrinth den Weg des roten Traktors zum Bauernhof. Formuliere eine Anweisungssequenz oder zeichne einen Ablaufplan auf Papier. Nutze dafür die Originalabbildung; du kannst sie zum Vergrößern öffnen.</p>${workbookText('bk-maze','Deine Befehlsfolge für den Traktor')}<details><summary>Selbstkontrolle</summary><p>Folge deiner Beschreibung auf der Buchabbildung. Beginnt sie beim Traktor und endet sie beim Bauernhof? Sind alle nötigen Abzweigungen eindeutig? Freie Wege werden nicht automatisch als richtig bewertet.</p></details></section>
 <section class="question"><h2>7. Algorithmus, Programm und EVA</h2>${bookReference(40,'Algorithmen beschreiben, Probleme lösen und EVA-Prinzip')}${renderFigure('algo-general-learn',{title:'Vom Algorithmus zum Programm'})}${workbookText('bk-eva','Erkläre Eingabe, Verarbeitung und Ausgabe an einem Beispiel.')}${workbookText('bk-program','Was unterscheidet einen Algorithmus von einem Programm?')}<details><summary>Selbstkontrolle</summary><p>Ein Algorithmus beschreibt genaue Lösungsschritte. Ein Programm formuliert sie in einer Programmiersprache für einen Computer. Beispiel Sortieren: Zahlen eingeben → sortieren → sortierte Zahlen ausgeben.</p></details></section>
 <p id="bookSummary" class="notice" aria-live="polite">Noch nicht ausgewertet. Freie Aufgaben bleiben zur Selbstkontrolle.</p>
 </div>`;
 for(let i=0;i<4;i++)$('bk-story-'+i).addEventListener('change',updateBookStory);
 for(let i=0;i<3;i++){const field=$('bk-command-'+i);field.maxLength=42;field.rows=2;field.addEventListener('input',updateBookCommands)}
 updateBookStory();updateBookCommands();
 $('bookPrint').onclick=()=>{prepareBookPrint();window.print()};
 $('finish').textContent='Zuordnungen prüfen und freie Texte vergleichen';$('reset').textContent='Buchaufgaben neu beginnen';show('work');
}
function updateBookStory(){
 const ranks=bookStory.map((_,i)=>Number($('bk-story-'+i).value));
 const complete=new Set(ranks).size===4&&ranks.every(n=>n>=1&&n<=4);
 $('bookStoryDiagram').innerHTML=complete?renderActionDiagram(bookStory.map((text,i)=>({text,rank:ranks[i]})).sort((a,b)=>a.rank-b.rank).map(row=>row.text),'book-story'):'<p>Vergib vier unterschiedliche Plätze, um deinen Ablaufplan zu sehen.</p>';
}
function updateBookCommands(){
 $('bookCommandsDiagram').innerHTML=renderActionDiagram([0,1,2].map(i=>$('bk-command-'+i).value.trim()||'Dein Befehl '+(i+1)),'book-commands');
}
function updateBookPrint(){
 if(current?.id!=='algo-book-practice')return;
 document.querySelectorAll('.book-workbook [data-print-for]').forEach(el=>{el.textContent=$(el.dataset.printFor).value.trim()||'Noch nicht beantwortet.'});
}
let bookPrintRestore=null;
function prepareBookPrint(){
 if(current?.id!=='algo-book-practice')return;
 updateBookPrint();
 const include=$('bookPrintSources').checked;
 if(bookPrintRestore===null)bookPrintRestore=[...document.querySelectorAll('.book-reference')].map(el=>({el,open:el.open}));
 if(include)bookPrintRestore.forEach(({el})=>{el.open=true});
 document.body.classList.toggle('print-book-sources',include);
}
function restoreBookPrint(){
 bookPrintRestore?.forEach(({el,open})=>{el.open=open});bookPrintRestore=null;
 document.body.classList.remove('print-book-sources');
}
window.addEventListener('beforeprint',prepareBookPrint);
window.addEventListener('afterprint',restoreBookPrint);
function finishBookWorkbook(){
 const expected=['Eindeutigkeit','Ausführbarkeit','Endlichkeit'];let correct=0;
 const checks=expected.map((answer,i)=>{const good=$('bk-condition-'+i).value===answer;if(good)correct++;return `${i+1}. ${good?'Richtig':'Richtig ist: '+answer}`});
 $('bk-feedback-conditions').textContent=checks.join(' · ');
 const ranks=bookStory.map((_,i)=>Number($('bk-story-'+i).value));
 const ordered=JSON.stringify(ranks)===JSON.stringify([1,4,2,3]);if(ordered)correct++;
 $('bk-feedback-story').textContent=ordered?'Richtig: Reise planen → Ticket kaufen → mit der Bahn losfahren → den Wesir treffen.':'Sinnvolle Reihenfolge: Reise planen → Ticket kaufen → mit der Bahn losfahren → in der Hauptstadt den Wesir treffen.';
 $('bookSummary').textContent=`Automatisch geprüfte Antworten: ${correct} / 4 richtig. Die freien Beschreibungen, Begründungen und selbst formulierten Pläne werden nicht automatisch inhaltlich bewertet. Vergleiche sie mit den Buchabbildungen und Hinweisen.`;
 updateBookPrint();
}
