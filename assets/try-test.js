'use strict';

// Eigenständiger Probelauf auf der Startseite, ohne Fach-/Klassenzuordnung.
const TRY_TEST={id:'try-test',title:'Übungstest',topic:'Übungstest',subject:'Zum Ausprobieren',grades:[],mode:'Test',engine:'tryTest',isDemo:true,questions:[
 {q:'Was zieht ein Pinguin vermutlich lieber an?',a:'Einen warmen Schal',choices:['Eine Badehose aus Eis','Einen warmen Schal','Einen Hut aus Spaghetti']},
 {q:'Ein Drache niest dreimal Funken. Wie oft hat er geniest? Gib die Zahl ein.',a:'3'},
 {q:'Was passt am besten auf ein Käsebrot?',a:'Käse',choices:['Ein Fahrrad','Käse','Ein Sofakissen']},
 {q:'Bringe die Begrüßung eines höflichen Roboters in die richtige Reihenfolge.',a:'Aufwachen → Hallo sagen → Freundlich winken',order:['Freundlich winken','Aufwachen','Hallo sagen']},
 {q:'Welche Zahl ist größer: 2 Gummibärchen oder 5 Gummibärchen? Gib die größere Zahl ein.',a:'5'},
 {q:'Womit kann eine Katze ihre Menschen vermutlich am besten wecken?',a:'Mit lautem Miauen',choices:['Mit einem Steuerformular','Mit lautem Miauen','Mit einer Wolke aus Papier']},
 {q:'Ein Alien hat zwei linke und zwei rechte Socken. Wie viele Socken sind das zusammen?',a:'4'},
 {q:'Was würde ein Schneemann an einem heißen Tag am ehesten suchen?',a:'Einen kühlen Schattenplatz',choices:['Eine sehr heiße Sauna','Einen Ofen zum Kuscheln','Einen kühlen Schattenplatz']},
 {q:'Ordne den gemütlichen Start in einen Kuscheltierabend.',a:'Kissen holen → Gemütlich hinsetzen → Geschichte anhören',order:['Geschichte anhören','Kissen holen','Gemütlich hinsetzen']},
 {q:'Ein Keksmonster hat 6 Kekse und isst 2. Wie viele bleiben übrig?',a:'4'},
 {q:'Welches Tier kann wirklich fliegen?',a:'Ein Papagei',choices:['Ein Papagei','Ein Sofa-Panda','Ein Pantoffel-Elefant']},
 {q:'Was macht man mit einem Regenschirm, wenn es regnet?',a:'Aufspannen',choices:['Als Suppe servieren','In den Toaster stecken','Aufspannen']},
 {q:'Drei Frösche quaken, ein Frosch schläft. Wie viele Frösche sind insgesamt da?',a:'4'},
 {q:'Welche Uhrzeit klingt für ein Gespenst besonders passend?',a:'Mitternacht',choices:['Mitternacht','Nudelzeit','Bananenviertel nach Käse']},
 {q:'Welche Schaltfläche hilft dir nach der Auswertung beim Speichern deines Ergebnisses?',a:'Testergebnis als PDF herunterladen',choices:['Unsichtbar machen','Testergebnis als PDF herunterladen','Alle Kekse verstecken']}
]};
TEST_CODES[TRY_TEST.id]='1234';
function renderTryTest(){
 $('workHead').innerHTML='<h1>Übungstest – einfach ausprobieren</h1><p class="notice">15 witzige Fragen, keine Note. Übe das Auswählen, Eingeben und Ordnen. Danach kannst du deine Auswertung ansehen und als PDF herunterladen.</p><label for="student">Dein Name</label><input id="student" maxlength="80" autocomplete="off" placeholder="Vorname und Nachname">';
 algoOrderSelections={};
 $('questions').innerHTML=TRY_TEST.questions.map((q,i)=>`<section class="question"><label for="q${i}"><strong>Aufgabe ${i+1}: ${escapeHTML(q.q)}</strong></label>${q.order?algoOrderHTML(q,i):q.choices?`<select id="q${i}"><option value="">Bitte auswählen</option>${q.choices.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('')}</select>`:`<input id="q${i}" inputmode="numeric" autocomplete="off">`}</section>`).join('');
 document.querySelectorAll('[data-order-q]').forEach(button=>button.onclick=()=>{
  const i=Number(button.dataset.orderQ),j=Number(button.dataset.orderV),selected=algoOrderSelections[i]||=[];
  if(selected.includes(j))return;selected.push(j);button.disabled=true;
  $('q'+i).value=selected.map(n=>TRY_TEST.questions[i].order[n]).join(' → ');$('orderResult'+i).textContent=$('q'+i).value;
 });
 $('finish').textContent='Übungstest auswerten';$('reset').textContent='Noch einmal anfangen';show('work');
}
function finishTryTest(){
 const name=$('student').value.trim();if(!name){alert('Bitte gib zuerst deinen Namen ein.');$('student').focus();return}
 const answers=evaluate(TRY_TEST.questions);if(answers.some(a=>!a.given)&&!confirm('Einige Antworten fehlen. Trotzdem auswerten?'))return;
 const score=answers.filter(a=>a.correct).length;
 $('resultBody').innerHTML=`<div class="result"><h2>Dein Übungstest</h2><p><strong>${escapeHTML(name)}</strong></p><p>Thema: Übungstest · ${new Date().toLocaleDateString('de-DE',{timeZone:'Europe/Berlin'})}</p><div class="score">${score} von 15 richtig</div><p>Gut ausprobiert! Lade jetzt deine Ergebnis-PDF herunter und öffne sie zur Kontrolle.</p></div>`+renderAnswers(answers);
 captureTestResult(name,answers,score);$('pdfNotice').style.display='block';show('results');
}
document.getElementById('startTryTest').addEventListener('click',()=>start(TRY_TEST.id));
