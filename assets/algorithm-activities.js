'use strict';

// Gemeinsame Mechanik für die drei gemischten Übungen, Vorbereitung und Test.
let algoPhase=null;
const algoPageTitles={
 'algo-general-practice':['Anleitungen erkennen und ordnen','Präzise formulieren','Eigene Abläufe entwickeln'],
 'algo-display-practice':['Symbole und Diagramme','Verzweigungen und Schleifen','Wege anwenden'],
 'algo-review-practice':['Anweisungen und Eigenschaften','Diagramme und Wege','Schleifen und Entscheidungen']
};
const algoPreparationGoals=[
 'Für den Test: Eigenschaften an Beispielen erkennen, präzise Anweisungen wählen und abhängige Schritte ordnen.',
 'Für den Test: Symbole zuordnen, Aktionen zählen und Wege sowie Richtungswechsel lesen.',
 'Für den Test: Zähler Schritt für Schritt verfolgen, Rückpfeile und Abbruchbedingungen prüfen sowie Entscheidungen anwenden.'
];
function algoText(value){return String(value).normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/\s+/g,' ').replace(/[.!?]+$/,'')}
function algoNumbers(value){const text=String(value).replace(/[\[\]]/g,'').trim();return text?text.split(/[\s,;]+/).map(Number):[]}
function algoCorrect(q,value){
 if(q.kind==='list')return JSON.stringify(algoNumbers(value))===JSON.stringify(algoNumbers(q.a));
 if(q.kind==='number')return /^[+-]?\d+$/.test(value.trim())&&Number(value)===Number(q.a);
 if(q.order||q.choices)return value===q.a;
 return (q.accept||[q.a]).some(answer=>algoText(answer)===algoText(value));
}
function algoFigure(figure){
 if(!figure)return '';
 if(figure==='teeth')return renderActionDiagram(sourceTeethSteps,'algo-teeth');
 if(figure==='maze')return renderPracticeMaze();
 if(figure==='escape')return renderPracticePlan();
 if(figure==='handwash')return renderFigure('algo-general-learn',{title:'Händewaschen: klare Befehle'});
 if(figure==='loop')return renderFigure('algo-display-learn',{title:'Schleifen: etwas wiederholen'});
 if(figure.kind==='sequence')return renderActionDiagram(figure.steps,'algo-sequence');
 if(figure.kind==='branch')return renderBranchDiagram(figure.question,figure.yes,figure.no,'algo-branch',true);
 throw new Error('Unbekannte Aufgabenabbildung');
}
function algoPrintValue(id){return `<div class="algo-print-value" data-algo-print-for="${id}"></div>`}
function algoField(q,id,label){
 if(q.choices)return `<select id="${id}" aria-label="${escapeHTML(label)}"><option value="">Bitte auswählen</option>${q.choices.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('')}</select>${algoPrintValue(id)}`;
 if(q.free)return `<textarea id="${id}" rows="5" maxlength="2500" aria-label="${escapeHTML(label)}" placeholder="Deine eigene Lösung"></textarea>${algoPrintValue(id)}`;
 return `<input id="${id}" type="text" ${q.kind==='number'?'inputmode="numeric"':''} autocomplete="off" aria-label="${escapeHTML(label)}" placeholder="${q.kind==='list'?'Zum Beispiel: 2, 1, 3':'Deine Antwort'}">${algoPrintValue(id)}`;
}
// Marker und Beschriftungen bleiben auch neben einer ausgeblendeten Lernseite eindeutig.
function namespaceAlgoFigure(html,scope){
 const ids=[...html.matchAll(/ id="([^"]+)"/g)].map(match=>match[1]);
 for(const id of ids){html=html.replaceAll(` id="${id}"`,` id="${scope}-${id}"`).replaceAll(`url(#${id})`,`url(#${scope}-${id})`)}
 return html.replace(/aria-labelledby="([^"]+)"/g,(_,value)=>`aria-labelledby="${value.split(/\s+/).map(id=>ids.includes(id)?scope+'-'+id:id).join(' ')}"`);
}
function algoQuestionHTML(q,i){
 const id='q'+i;
 const figure=q.figure?`<div class="algo-figure">${namespaceAlgoFigure(algoFigure(q.figure),q.id)}</div>`:'';
 let fields='';
 if(q.order)fields=algoOrderHTML(q,i)+`<button class="secondary no-print" type="button" data-algo-order-reset="${i}">Diese Reihenfolge neu legen</button><ol class="algo-order-print">${q.order.map(v=>`<li>□ ${escapeHTML(v)}</li>`).join('')}</ol>`;
 else if(q.parts)fields=q.parts.map((part,j)=>`<label for="${id}-part${j}">${escapeHTML(part.label)}</label>${algoField(part,id+'-part'+j,part.label)}`).join('');
 else fields=algoField(q,id,q.q);
 return `<section class="question algo-task" data-question-id="${q.id}"><h3>Aufgabe ${i+1}${q.free?' · Selbstkontrolle':''}</h3><p><strong>${escapeHTML(q.q)}</strong></p>${figure}${q.code?`<pre class="workbook-code">${escapeHTML(q.code)}</pre>`:''}${fields}${q.preview?`<p class="small muted">Die Vorschau zeigt bis zu acht kurze Zeilen. Prüfe die Bedeutung und Reihenfolge deiner eigenen Anweisungen.</p><div id="algoPreview${i}"></div>`:''}</section>`;
}
function algoQuestions(){return algoPhase==='preparation'?algoPreparation:practiceState?current.pages[practiceState.page]:current.questions}
function renderAlgoWork(){
 if(algoPhase===null)algoPhase=practiceState?'practice':'test';
 const questions=algoQuestions();algoOrderSelections={};
 const stage=practiceState?practiceState.page:0;
 const heading=algoPhase==='preparation'?'Vorbereitung auf den Abschlusstest':current.title;
 $('workHead').innerHTML=`<h1>${escapeHTML(heading)}</h1><p>Informatik · Klasse ${selectedGrade||6} · ${algoPhase==='preparation'?'Vorbereitung':current.mode}</p>`+
 (practiceState?`<div class="levelbar">${algoPageTitles[current.id].map((title,i)=>`<span class="levelpill ${i===stage?'active':i<stage?'done':''}">${i+1}. ${escapeHTML(title)}</span>`).join('')}</div><h2>Teil ${stage+1} von ${current.pages.length}: ${escapeHTML(algoPageTitles[current.id][stage])}</h2>`:'')+
 (algoPhase==='test'?'<p class="notice">20 unterschiedliche Aufgaben · 20 Punkte. Wähle Antworten, ordne zu oder lege eine Reihenfolge; es gibt keine offenen Texteingaben. Bei einer Zuordnung müssen alle Teilantworten stimmen. Lösungen und Note erscheinen nach der Abgabe.</p><label for="student">Dein Name</label><input id="student" maxlength="80" autocomplete="off">':'<p>Ordne, untersuche, rechne und formuliere selbst. Geschlossene Aufgaben werden geprüft. Wichtig: Eigene Texte und Pläne werden nicht inhaltlich automatisch bewertet. Vergleiche sie nach der Abgabe selbst mit Beispiel und Prüffragen.</p>')+
 (current.id==='algo-review-practice'?`<p class="notice preparation-goal">${escapeHTML(algoPreparationGoals[stage])}</p>`:'')+
 `<div class="actions no-print"><button type="button" id="printAlgoWork" class="secondary">Aufgaben und eigene Antworten drucken / als PDF</button>${algoPhase==='preparation'?'<button type="button" id="beginAlgoTest">Zum Test · Zugangscode eingeben</button>':''}</div>`;
 $('questions').innerHTML=questions.map(algoQuestionHTML).join('');
 document.querySelectorAll('[data-order-q]').forEach(button=>button.addEventListener('click',()=>{
  const i=Number(button.dataset.orderQ),choice=Number(button.dataset.orderV);const selected=algoOrderSelections[i]||=[];
  if(selected.includes(choice))return;selected.push(choice);button.disabled=true;
  $('orderResult'+i).textContent=selected.map(n=>questions[i].order[n]).join(' → ');$('q'+i).value=$('orderResult'+i).textContent;
 }));
 document.querySelectorAll('[data-algo-order-reset]').forEach(button=>button.onclick=()=>{
  const i=Number(button.dataset.algoOrderReset);algoOrderSelections[i]=[];$('q'+i).value='';$('orderResult'+i).textContent='';
  document.querySelectorAll(`[data-order-q="${i}"]`).forEach(b=>b.disabled=false);
 });
 questions.forEach((q,i)=>{if(!q.preview)return;const draw=()=>{
  const lines=$('q'+i).value.split(/\n/).map(s=>s.trim()).filter(Boolean).slice(0,8).map(s=>s.length>42?s.slice(0,39)+'…':s);
  $('algoPreview'+i).innerHTML=q.preview==='branch'?renderBranchDiagram(lines[0]||'Deine Ja/Nein-Frage',lines[1]||'Deine Ja-Aktion',lines[2]||'Deine Nein-Aktion','algo-own-branch-'+q.id,true):renderActionDiagram(lines.length?lines:['Deine erste Aktion','Deine nächste Aktion'],'algo-own-sequence-'+q.id);
 };$('q'+i).addEventListener('input',draw);draw()});
 $('printAlgoWork').onclick=()=>{updateAlgoPrint();window.print()};
 if($('beginAlgoTest'))$('beginAlgoTest').onclick=beginAlgoTest;
 $('finish').textContent=algoPhase==='test'?'Test abgeben und auswerten':algoPhase==='preparation'?'Vorbereitung auswerten':'Teil auswerten';
 $('reset').textContent=algoPhase==='test'?'Test neu beginnen':'Neu beginnen';
}
function beginAlgoTest(){
 if(!checkTestCode('algo-test'))return;
 practiceState=null;algoPhase='test';$('nextLevel')?.remove();renderAlgoWork();show('work');
}
function startAlgoPreparation(){return start('algo-review-practice')}
function updateAlgoPrint(){
 if(current?.topic!=='Algorithmen')return;
 document.querySelectorAll('[data-algo-print-for]').forEach(el=>{el.textContent=$(el.dataset.algoPrintFor)?.value.trim()||'Noch nicht beantwortet.'});
}
window.addEventListener('beforeprint',updateAlgoPrint);
function collectAlgoAnswers(questions){
 return questions.map((q,i)=>{
  if(q.parts){const values=q.parts.map((_,j)=>$('q'+i+'-part'+j).value.trim());return {q:q.q,explanation:q.why,given:values.map((v,j)=>q.parts[j].label+': '+(v||'–')).join('\n'),missing:values.some(v=>!v),correct:q.parts.every((p,j)=>algoCorrect(p,values[j])),a:q.parts.map(p=>p.label+': '+p.a).join('\n')}}
  const value=$('q'+i).value.trim();return {q:q.q,explanation:q.why,given:value,missing:!value,correct:q.free?null:algoCorrect(q,value),a:q.free?q.sample:q.a,selfCheck:!!q.free,checks:q.checks||[],minSteps:q.minSteps};
 });
}
function algoAnswerFeedback(answers){
 return answers.map((answer,i)=>`<section class="question ${answer.selfCheck?'self-feedback':''}"><h3>${i+1}. ${escapeHTML(answer.q)}</h3><p class="answer-lines"><strong>Deine Antwort:</strong> ${escapeHTML(answer.given||'Noch nicht beantwortet.')}</p>${answer.selfCheck?`<p><strong>Selbstkontrolle – keine automatische Inhaltsbewertung</strong></p>${answer.minSteps?`<p>${answer.given.split(/\n/).filter(s=>s.trim()).length} Zeilen notiert; gefordert sind mindestens ${answer.minSteps} Schritte. Die Anzahl allein sagt nicht, ob die Lösung inhaltlich richtig ist.</p>`:''}<p class="answer-lines"><strong>Mögliches Beispiel:</strong> ${escapeHTML(answer.a)}</p><ul>${answer.checks.map(c=>`<li>${escapeHTML(c)}</li>`).join('')}</ul>`:`<p class="${answer.correct?'good':'bad'}">${answer.correct?'Richtig':'Noch nicht richtig'}</p>${answer.correct?'':`<p class="answer-lines"><strong>Richtige Antwort:</strong> ${escapeHTML(answer.a)}</p>`}${answer.explanation?`<p class="answer-explanation"><strong>Darauf kommt es an:</strong> ${escapeHTML(answer.explanation)}</p>`:''}`}</section>`).join('');
}
function finishAlgoActivity(){
 const questions=algoQuestions();
 if(algoPhase==='test'&&!$('student').value.trim()){alert('Bitte gib zuerst deinen Namen ein.');$('student').focus();return}
 const answers=collectAlgoAnswers(questions);
 if(answers.some(a=>a.missing)&&!confirm('Einige Antworten fehlen. Trotzdem auswerten?'))return;
 const scored=answers.filter(a=>!a.selfCheck),points=scored.filter(a=>a.correct).length;
 let extra='',next=null;
 if(practiceState){
  const stage=practiceState.page;practiceState.scores.push(points);practiceState.answers.push(answers);
  const complete=stage===current.pages.length-1;
  if(complete)extra='<h3>Alle Teile bearbeitet</h3><p>Vergleiche deine eigenen Texte selbst mit den Beispielen und Prüffragen.</p>';
  else next={label:'Weiter zu Teil '+(stage+2),run:()=>{practiceState.page++;renderAlgoWork();show('work')}};
 }else if(algoPhase==='preparation')next={label:'Zum Test · Zugangscode eingeben',run:beginAlgoTest};
 const isTest=algoPhase==='test';
 $('resultBody').innerHTML=`<div class="result"><h2>${isTest?'Testergebnis':algoPhase==='preparation'?'Deine Vorbereitung':'Deine Auswertung'}</h2>${isTest?`<p class="test-result-topic"><strong>Thema: ${escapeHTML(current.topic)}</strong> · ${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]}</p><p><strong>${escapeHTML($('student').value.trim())}</strong></p>`:''}${isTest?`<div class="score">${points} / ${scored.length} Punkte</div>`:'<p>Eigene Texte musst du selbst vergleichen; sie werden nicht automatisch inhaltlich bewertet.</p>'}<p>${answers.filter(a=>a.selfCheck).length?`${answers.filter(a=>a.selfCheck).length} freie Aufgaben zur Selbstkontrolle, ohne automatische Bewertung.`:'Die geschlossenen Antworten wurden automatisch geprüft.'}</p>${isTest?`<div class="score">Note ${grade(points)}</div><p>Notenschlüssel (20 Punkte): 19–20 = 1 · 15–18 = 2 · 12–14 = 3 · 8–11 = 4 · 4–7 = 5 · 0–3 = 6.</p>`:''}${extra}</div>`+algoAnswerFeedback(answers);
 $('nextLevel')?.remove();if(next){const button=document.createElement('button');button.id='nextLevel';button.textContent=next.label;button.onclick=next.run;$('results').querySelector('.actions').prepend(button)}
 $('screenshotNotice').style.display=isTest?'block':'none';show('results');
}
function renderAlgoPrintBody(q){
 const figure=q.figure?`<div class="algo-print-figure" style="max-width:125mm;margin:8mm auto">${namespaceAlgoFigure(algoFigure(q.figure),q.id)}</div>`:'';
 const code=q.code?`<pre style="white-space:pre-wrap">${escapeHTML(q.code)}</pre>`:'';
 const body=q.parts?q.parts.map(p=>`<p><strong>${escapeHTML(p.label)}</strong></p>${p.choices?`<p>${p.choices.map(c=>'□ '+escapeHTML(c)).join(' · ')}</p>`:'<div class="answer-space"></div>'}`).join(''):q.order?`<ol>${q.order.map(v=>`<li>□ ${escapeHTML(v)}</li>`).join('')}</ol>`:q.choices?`<div class="options">${q.choices.map(c=>`<span>□ ${escapeHTML(c)}</span>`).join('')}</div>`:'<div class="answer-space"></div>';
 return figure+code+body;
}
function validateAlgoQuestions(){
 const all=[...algoPracticeGeneral.flat(),...algoPracticeDisplay.flat(),...algoPracticeReview.flat(),...algoPreparation,...algoTestQuestions];
 const ids=new Set(),texts=new Set();
 for(const q of all){const text=algoText(q.q);if(!q.id||ids.has(q.id)||texts.has(text))throw new Error('Doppelte Algorithmus-Aufgabe: '+q.id);ids.add(q.id);texts.add(text);if(q.free&&(!q.sample||!q.checks?.length))throw new Error('Freie Aufgabe ohne Selbstkontrolle');if(!q.free&&!q.parts&&typeof q.a!=='string')throw new Error('Aufgabe ohne Lösung')}
 if(algoTestQuestions.length!==20||algoTestQuestions.some(q=>q.free||!(q.choices||q.order||(q.parts&&q.parts.every(p=>p.choices)))))throw new Error('Ungültiger Abschlusstest');
}
validateAlgoQuestions();
