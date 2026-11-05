'use strict';

// Buchseiten 38–41; die Übungsheft-Aufgaben bleiben ein eigener Bereich.
const bookStory=[
 'Irving will in die Hauptstadt reisen.',
 'In der Hauptstadt trifft er den Wesir.',
 'Er kauft sich ein Bahnticket.',
 'Irving fährt mit der Bahn los.'
];
tasks.push({id:'algo-book-practice',subject:'Informatik',grades:[6],topic:'Algorithmen',mode:'Übung',title:'Alltagsabläufe anwenden',description:'Pfannkuchen, Händewaschen, Fluchtweg, Geschichten, genaue Anweisungen und Labyrinth; dazu EVA und Programmiersprache.',bookWorkbook:true});

function startBookWorkbook(){
 $('workHead').innerHTML='<h1>Alltagsabläufe anwenden</h1><p>Informatik · Klasse 6 · Anweisungen und Ablaufpläne</p><p>Nutze die Abbildungen direkt auf dieser Seite und formuliere eigene klare Anweisungen. Drei Zuordnungen und die Reihenfolge der Geschichte werden automatisch geprüft. Alle freien Texte bleiben zur Selbstkontrolle.</p><div class="actions no-print"><button type="button" id="bookPrint" class="secondary">Aufgaben und eigene Antworten drucken / als PDF</button></div>';
 $('questions').innerHTML=`<div class="source-workbook book-workbook">
 <section class="question"><h2>1. Pfannkuchen: Bedingungen eines Algorithmus</h2>${renderFigure('algo-general-learn',{title:'Pfannkuchen: eine Sequenz'})}<p>Ordne die folgenden Beispiele den drei Bedingungen zu.</p>${workbookSelect('bk-condition-0','Öl muss vor dem Teig in die Pfanne. Die Reihenfolge muss feststehen.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookSelect('bk-condition-1','Eier werden aufgeschlagen und nicht mit Schale in den Teig gegeben.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookSelect('bk-condition-2','Es ist klar beschrieben, wann der Pfannkuchen fertig ist.',['Eindeutigkeit','Ausführbarkeit','Endlichkeit'])}${workbookFeedback('bk-feedback-conditions')}</section>
 <section class="question"><h2>2. Händewaschen</h2>${renderFigure('algo-general-learn',{title:'Händewaschen: klare Befehle'})}<p>Die Abbildung zeigt fünf Schritte. Beschreibe die Reihenfolge und beginne deine Befehlsfolge mit „Halte eine Hand unter den Seifenspender“.</p>${workbookText('bk-hands-description','Beschreibe die dargestellten Schritte zum Händewaschen.')}${workbookText('bk-hands-commands','Schreibe deine Beschreibung als Befehlsfolge (Imperativ).')}${workbookText('bk-hands-properties','Erkläre Eindeutigkeit, Ausführbarkeit und Endlichkeit an deinem Ablauf.')}${workbookText('bk-hands-swap','Welche Anweisungen könnten vertauscht werden? Begründe deine Vermutung.')}<details><summary>Selbstkontrolle</summary><p>Prüfe die Bilder A–E. Nenne die einzelnen Handlungen, ihre Reihenfolge und ein Ende. Schreibe Befehle wie „Halte“, „Reibe“, „Spüle“ und „Trockne“. Begründe Vertauschungen, statt jede beliebige Reihenfolge zu akzeptieren.</p></details></section>
 <section class="question"><h2>3. Einen Fluchtweg beschreiben</h2>${renderPracticePlan()}<p>Beschreibe den Weg im dargestellten Übungsplan. Beginne im markierten Klassenraum, folge den grünen Pfeilen durch den Flur zum Ausgang und beschreibe den weiteren Weg bis zum Sammelplatz.</p>${workbookText('bk-escape','Deine eindeutige Ablaufbeschreibung')}<details><summary>Selbstkontrolle</summary><p>Sind Start, Bewegungsrichtung, Abzweigungen und Ziel erkennbar? Kann jemand den beschriebenen Weg anhand des passenden Plans nachvollziehen? Vergleiche deine Beschreibung mit dem zugehörigen Plan; der Weg wird nicht automatisch bewertet.</p></details></section>
 <section class="question"><h2>4. Geschichten lesen</h2><p>Bringe die vier Handlungsschritte der Irving-Geschichte in eine sinnvolle Reihenfolge. Vergib jeden Platz von 1 bis 4 genau einmal. Daraus entsteht dein Ablaufplan. Start und Ende stehen in Ovalen; jede Handlung steht in einem eigenen Rechteck.</p>${bookStory.map((text,i)=>workbookSelect('bk-story-'+i,text,['1','2','3','4'])).join('')}<div id="bookStoryDiagram"></div>${workbookFeedback('bk-feedback-story')}<p>Prüfe deinen Ablaufplan: Folgt jeder Schritt sinnvoll auf den vorherigen? Start und Ende rahmen die Handlung ein.</p></section>
 <section class="question"><h2>5. Genaue Anweisungen</h2><p>Prüfe die ursprünglichen Anweisungen: „Gehe zur Obst- und Gemüseabteilung“, „Biege ein paar Schritte nach rechts ab“, „Bei den Konserven oder dem Mehl stehen die Nudeln“.</p>${workbookText('bk-directions-review','Sind diese Anweisungen eindeutig, ausführbar und endlich? Begründe.')}
 <p>Formuliere drei genaue Befehle für eine von dir festgelegte Situation. Benenne Ort, Richtung und Ziel konkret. Die Webseite kennt keinen tatsächlichen Supermarktplan.</p><div class="no-print" id="bookCommandFields">${[0,1,2].map(i=>workbookText('bk-command-'+i,'Dein Befehl '+(i+1))).join('')}</div><div id="bookCommandsDiagram"></div></section>
 <section class="question"><h2>6. Labyrinth</h2>${renderPracticeMaze()}<p>Schreibe eine eindeutige Befehlsfolge vom roten Traktor zum Bauernhof. Nutze Richtungen wie rechts, links, oben und unten oder die Koordinaten A1 bis E5. Fahre nur auf den hellen Wegen.</p>${workbookText('bk-maze','Deine Befehlsfolge für den Traktor')}<details><summary>Selbstkontrolle</summary><p>Folge deiner Beschreibung in der dargestellten Wegeskizze. Beginnt sie beim Traktor und endet sie beim Bauernhof? Sind alle nötigen Abzweigungen eindeutig? Freie Wege werden nicht automatisch als richtig bewertet.</p></details></section>
 <section class="question"><h2>7. Algorithmus, Programm und EVA</h2>${renderFigure('algo-general-learn',{title:'Vom Algorithmus zum Programm'})}${workbookText('bk-eva','Erkläre Eingabe, Verarbeitung und Ausgabe an einem Beispiel.')}${workbookText('bk-program','Was unterscheidet einen Algorithmus von einem Programm?')}<details><summary>Selbstkontrolle</summary><p>Ein Algorithmus beschreibt genaue Lösungsschritte. Ein Programm formuliert sie in einer Programmiersprache für einen Computer. Beispiel Sortieren: Zahlen eingeben → sortieren → sortierte Zahlen ausgeben.</p></details></section>
 <p id="bookSummary" class="notice" aria-live="polite">Noch nicht ausgewertet. Freie Aufgaben bleiben zur Selbstkontrolle.</p>
 </div>`;
 for(let i=0;i<4;i++)$('bk-story-'+i).addEventListener('change',updateBookStory);
 for(let i=0;i<3;i++){const field=$('bk-command-'+i);field.maxLength=42;field.rows=2;field.addEventListener('input',updateBookCommands)}
 updateBookStory();updateBookCommands();
 $('bookPrint').onclick=()=>{prepareBookPrint();window.print()};
 $('finish').textContent='Zuordnungen prüfen und freie Texte vergleichen';$('reset').textContent='Alltagsaufgaben neu beginnen';show('work');
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
function prepareBookPrint(){updateBookPrint()}
window.addEventListener('beforeprint',prepareBookPrint);
function finishBookWorkbook(){
 const expected=['Eindeutigkeit','Ausführbarkeit','Endlichkeit'];let correct=0;
 const checks=expected.map((answer,i)=>{const good=$('bk-condition-'+i).value===answer;if(good)correct++;return `${i+1}. ${good?'Richtig':'Richtig ist: '+answer}`});
 $('bk-feedback-conditions').textContent=checks.join(' · ');
 const ranks=bookStory.map((_,i)=>Number($('bk-story-'+i).value));
 const ordered=JSON.stringify(ranks)===JSON.stringify([1,4,2,3]);if(ordered)correct++;
 $('bk-feedback-story').textContent=ordered?'Richtig: Reise planen → Ticket kaufen → mit der Bahn losfahren → den Wesir treffen.':'Sinnvolle Reihenfolge: Reise planen → Ticket kaufen → mit der Bahn losfahren → in der Hauptstadt den Wesir treffen.';
 $('bookSummary').textContent=`Automatisch geprüfte Antworten: ${correct} / 4 richtig. Die freien Beschreibungen, Begründungen und selbst formulierten Pläne werden nicht automatisch inhaltlich bewertet. Vergleiche sie mit den Abbildungen und Hinweisen auf dieser Seite.`;
 updateBookPrint();
}
