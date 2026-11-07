// Tests werden lokal durch Zugangscodes freigeschaltet (kein Server nötig).

'use strict';
let lessonPage=0,lessonResponses={},lessonStage='title';
let practiceState=null;
let current=null;const $=id=>document.getElementById(id);function show(id){$('downloadTestPdf').hidden=!(id==='results'&&testResultSnapshot&&current?.mode==='Test');document.body.classList.remove('mode-learn','mode-practice','mode-test');if(id==='lesson')document.body.classList.add('mode-learn');else if(id==='work'||id==='results')document.body.classList.add(current?.mode==='Test'?'mode-test':'mode-practice');for(const x of ['home','work','results','lesson'])$(x).classList.toggle('hidden',x!==id);window.scrollTo(0,0)}function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}let selectedSubject=null,selectedGrade=null,selectedTopic=null;
const subjectIcons={'Informatik':'💻','Mathematik':'🔢','Hauswirtschaft':'🍎'};
function navStep(step){
 if(step==='Subject'){selectedSubject=null;selectedGrade=null;selectedTopic=null}
 if(step==='Grade'){selectedGrade=null;selectedTopic=null}
 if(step==='Topic')selectedTopic=null;
 for(const n of ['Subject','Grade','Topic','Materials'])$('step'+n).classList.toggle('hidden',n!==step);
 const crumbs=[['Fächer',()=>{selectedSubject=null;navStep('Subject')}]];
 if(selectedSubject)crumbs.push([selectedSubject,()=>navStep('Grade')]);
 if(selectedGrade)crumbs.push(['Klasse '+selectedGrade,()=>navStep('Topic')]);
 if(selectedTopic)crumbs.push([selectedTopic,()=>navStep('Materials')]);
 $('breadcrumbs').innerHTML=crumbs.map((c,i)=>`<button class="crumb" data-crumb="${i}">${escapeHTML(c[0])}</button>`).join('<span>›</span>');
 document.querySelectorAll('[data-crumb]').forEach(b=>b.onclick=()=>crumbs[Number(b.dataset.crumb)][1]());
}
function chooseSubject(sub){selectedSubject=sub;selectedGrade=null;selectedTopic=null;renderGrades();navStep('Grade')}
function chooseGrade(g){selectedGrade=g;selectedTopic=null;renderTopics();navStep('Topic')}
function chooseTopic(t){selectedTopic=t;catalog();navStep('Materials')}
function renderSubjects(){
 $('subjectTiles').innerHTML=Object.keys(subjectIcons).map(sub=>`<button class="nav-tile subject-tile" data-sub="${sub}"><span class="tile-icon">${subjectIcons[sub]}</span><strong>${sub}</strong><span class="muted">Themen entdecken →</span></button>`).join('');
 document.querySelectorAll('[data-sub]').forEach(b=>b.onclick=()=>chooseSubject(b.dataset.sub));
}
function renderGrades(){
 $('gradeTiles').innerHTML=[5,6,7,8,9,10].map(g=>`<button class="nav-tile grade-tile" data-grade="${g}"><span class="tile-icon">🎒</span><strong>Klasse ${g}</strong></button>`).join('');
 document.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>chooseGrade(Number(b.dataset.grade)));
}
function renderTopics(){
 const topics=[...new Set(tasks.filter(t=>t.subject===selectedSubject&&t.grades.includes(selectedGrade)).map(t=>t.topic))].sort();
 $('topicTiles').innerHTML=topics.length?topics.map(t=>`<button class="nav-tile topic-tile" data-topic="${escapeHTML(t)}"><span class="tile-icon">${t==='Algorithmen'?'🔀':'📚'}</span><strong>${escapeHTML(t)}</strong><span class="muted">Grundlagen und Anwendungen →</span></button>`).join(''):'<div class="notice">Für diese Klasse gibt es noch keine Themen. Wähle eine andere Klassenstufe.</div>';
 document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>chooseTopic(b.dataset.topic));
}
function catalog(){
 $('topicTitle').textContent=selectedTopic;
 const found=tasks.filter(t=>t.subject===selectedSubject&&t.grades.includes(selectedGrade)&&t.topic===selectedTopic);
 $('catalog').innerHTML=Object.entries(activityModes).map(([mode,config])=>{
  const materials=found.filter(t=>t.mode===mode);
  if(!materials.length)return '';
  return `<section class="material-group" aria-label="${config.label}"><h3>${config.label}</h3>${materials.map(t=>`<div class="task"><div><span class="tag ${config.tag}">${config.label}</span><h4>${escapeHTML(t.title)}</h4><p class="muted">${escapeHTML(t.description)}</p></div><button data-task="${t.id}">${config.action} →</button>${mode==='Test'?`<button class="secondary" data-print-test="${t.id}">🖨️ Test als PDF</button>`:''}</div>`).join('')}</section>`;
 }).join('');
 document.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>start(b.dataset.task));
 document.querySelectorAll('[data-print-test]').forEach(b=>b.onclick=()=>printTest(b.dataset.printTest));
}
function checkTestCode(id){
 if(!TEST_CODES[id]){alert('Für diesen Test ist noch kein Zugang eingerichtet.');return false}
 const code=prompt('🔒 Bitte Zugangscode für diesen Test eingeben:');
 if(code===null)return false;
 if(code.trim().toUpperCase()!==TEST_CODES[id]){alert('Der Zugangscode ist nicht richtig.');return false}
 return true;
}
function printTest(id){
 if(!checkTestCode(id))return;
 const t=tasks.find(x=>x.id===id);
 const qs=t?.questions;
 if(!qs){alert('Für diesen Test sind keine Druckaufgaben vorhanden.');return}
 const esc=escapeHTML;
 const questions=qs.map((q,i)=>`<article class="item"><div class="question-title"><b>${i+1}.</b> ${esc(q.q)} <span class="pts"><span class="points-blank"></span> / 1 P</span></div>${t.id==='algo-test'?renderAlgoPrintBody(q):q.choices?`<div class="options">${q.choices.map((c,j)=>`<span>□ ${esc(c)}</span>`).join('')}</div>`:`<div class="answer-space"></div>`}</article>`).join('');
 const page=`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(t.title)} – Druckversion</title><style>
 .algo-print-figure svg{display:block;width:100%;height:auto;max-height:165mm}.algo-print-figure figcaption{font-size:9pt;line-height:1.5}.algo-print-figure details{display:none}
 @page{size:A4 portrait;margin:20mm 20mm 20mm 20mm}
 *{box-sizing:border-box}
 html,body{background:#fff;color:#000}
 body{font:10.5pt Arial,sans-serif;margin:0;line-height:1.45}
 .head{border-bottom:2px solid #000;padding-bottom:10px;margin-bottom:14px}
 .head small{display:block;font-size:8pt;letter-spacing:1px;color:#000;font-weight:bold;text-transform:uppercase}
 h1{font-size:20pt;color:#000;margin:6px 0 10px}
 .meta{display:flex;gap:14px;flex-wrap:wrap;margin:10px 0}
 .meta span{flex:1;min-width:110px;padding:5px 0;border-bottom:1px solid #000}
 .item{break-inside:avoid;page-break-inside:avoid;border:0;border-bottom:1px solid #bbb;padding:8px 0 11px;margin:5px 0 7px}
 .question-title{font-weight:600;line-height:1.5;padding-right:92px;position:relative;min-height:30px}
 .pts{position:absolute;right:0;top:0;border:1px solid #000;border-radius:3px;padding:5px 7px;font-size:9pt;color:#000;min-width:79px;text-align:center;white-space:nowrap}.points-blank{display:inline-block;width:26px;height:16px;vertical-align:middle}
 .options{display:grid;grid-template-columns:1fr 1fr;gap:7px 12px;margin-top:10px;font-size:9.5pt}
 .options span{padding:2px 0}
 .answer-space{margin-top:8px;height:23mm;border:0}
 .foot{margin-top:16px;padding:9px 12px;border:1px solid #000;text-align:right;font-weight:bold;break-inside:avoid}
 .toolbar{padding:12px;background:#eee;text-align:center}
 .toolbar button{background:#222;color:white;border:0;border-radius:6px;padding:11px 18px;cursor:pointer}
 @media print{.toolbar{display:none!important}html,body{color:#000!important;background:#fff!important}}
 .notebook-text{white-space:normal;line-height:1.7}.notebook-card{max-width:100%;}.notebook-card .notebook-text{margin-top:10px}@media print{body.print-notebook #notebookPrint .print-memory p{line-height:1.55!important}body.print-notebook #notebookPrint .print-task{break-inside:avoid;page-break-inside:avoid}}.note-line{margin:8px 0!important}.note-term{font-weight:850;text-decoration:underline;text-underline-offset:3px}.notebook-card h3{border-bottom:2px solid #c5a76e;padding-bottom:8px}.order-items{display:flex;gap:8px;flex-wrap:wrap}.order-choice:disabled{opacity:.4}@media print{.note-term{color:#000!important}.note-line{color:#000!important}} </style></head><body><div class="toolbar"><button onclick="window.print()">🖨️ Drucken / als PDF speichern</button></div><div class="head"><small>Frau Salliers Lernwelt · Informatik · Klasse ${t.grades[0]}</small><h1>${esc(t.topic)} – Test</h1><div class="meta"><span>Name: ________________________</span><span>Datum: ______________</span><span>Klasse: ________</span></div><div class="meta"><span>Punkte: ______ / ${qs.length}</span><span>Note: ______</span></div></div>${questions}<div class="foot">Gesamt: ______ / ${qs.length} Punkte</div></body></html>`;
 const win=window.open('','_blank');
 if(!win){alert('Bitte Pop-ups für diese Webseite erlauben, um die Druckversion zu öffnen.');return}
 win.document.open();win.document.write(page);win.document.close();
}
function start(id){
 const requested=id===TRY_TEST.id?TRY_TEST:tasks.find(t=>t.id===id);
 if(!requested){alert('Dieses Modul ist nicht verfügbar. Bitte wähle es erneut aus.');return false}
 if(requested.mode==='Test'){
  if(!checkTestCode(id))return;
 }
 resetActivityState();
 current=requested;
 if(current.id==='algo-test'){algoPhase='test';renderAlgoWork();show('work');return true}
 activityModes[current.mode].start();
 return true;
}
function illustrate(slide){
 const figure=current.id==='algo-general-learn'&&slide.title==='Ausführbarkeit: sinnvolle Schritte'?'':renderFigure(current.id,slide);
 const photos=current.id==='algo-general-learn'?{
  'Anweisungen in richtiger Reihenfolge':['tea','Tasse Tee und Wasserkocher als Beispiel für einen Alltagsablauf'],
  'Algorithmen selbst entwickeln':['schoolbag','Offener Schulranzen mit Heften, Federmappe und Trinkflasche'],
  'Ausführbarkeit: sinnvolle Schritte':['eggs','Links: Ei mit Schale in einer Schüssel. Rechts: aufgeschlagenes Ei ohne Schale in der Schüssel.']
 }:{};
 const photo=photos[slide.title];
 if(figure||photo)return (photo?`<img class="learning-photo" src="${LEARNING_IMAGES[photo[0]].src}" alt="${escapeHTML(photo[1])}">`:'')+figure;
 if(slide.images)return `<div class="teaching-gallery">${slide.images.map(id=>{
  const card=hardwareCards.find(c=>c.id===id);
  return `<figure><img src="${EMBEDDED_IMAGES[id]}" alt="${escapeHTML(card?.name||id)}"><figcaption>${escapeHTML(card?.name||id)}</figcaption></figure>`;
 }).join('')}</div>`;
 return `<div class="visual-caption">${escapeHTML(slide.visual||'')}</div>`;
}

function notebookId(){return current.id}
function structuredNote(text){return escapeHTML(text).split('\n').map(line=>{const m=line.match(/^([^:]{3,52}):\s*(.+)$/);return m?`<p class="note-line"><strong class="note-term">${m[1]}:</strong> ${m[2]}</p>`:`<p class="note-line">${line}</p>`}).join('')}
function notebookDrawing(entry,scope){
 if(!entry.drawing)return '';
 return `<div class="notebook-drawing"><h4>Zeichne ins Heft</h4><p>${escapeHTML(entry.drawing)}</p>${(entry.diagrams||[]).map((title,i)=>namespaceAlgoFigure(renderFigure('algo-display-learn',{title}),scope+'-'+i)).join('')}<div class="notebook-draw-space" aria-hidden="true"></div></div>`;
}
function notebookCard(){const positions=notebookPositions[notebookId()]||[];const index=positions.indexOf(lessonPage);if(index<0)return '';const e=notebookEntries[notebookId()][index];return `<div class="notebook-card"><h3>📒 Heftereintrag ${index+1}: ${escapeHTML(e.title)}</h3><div class="notebook-text">${structuredNote(e.text)}</div>${notebookDrawing(e,'note-screen-'+current.id+'-'+index)}<p class="notebook-hint">Schreibe die Überschrift auf. Unterstreiche die fett markierten Fachbegriffe und übernimm die Erklärungen und Beispiele.</p></div>`}
function printNotebook(){const entries=notebookEntries[notebookId()]||[];if(!entries.length)return;$('notebookPrint').innerHTML=`<div class="print-kicker">FRAU SALLIERS LERNWELT · MERKBLATT</div><h1>${escapeHTML(current.topic)}</h1><div class="print-meta"><span>Name: _________________________</span><span>Klasse: ______</span><span>Datum: __________</span></div><p class="print-intro">Die wichtigsten Merkteile zum Lernen und Nachschlagen.</p>${entries.map((e,i)=>`<section class="print-task"><h2><span class="print-number">${i+1}</span> ${escapeHTML(e.title)}</h2><div class="print-memory"><strong>Wichtige Begriffe und Beispiele</strong><div>${structuredNote(e.text)}</div></div>${notebookDrawing(e,'note-print-'+current.id+'-'+i)}</section>`).join('')}`;document.body.classList.add('print-notebook');window.print()}
window.addEventListener('afterprint',()=>document.body.classList.remove('print-notebook'));
function renderLessonIntro(){
 const guide=lessonStage==='guide';
 $('lessonContent').innerHTML=`<p class="subheading">${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]}</p><div class="lesson-start-steps" aria-label="Lernablauf"><span class="${guide?'':'active'}">1. Titel</span><span class="${guide?'active':''}">2. Anleitung</span><span>3. Lernen</span></div><div class="lesson-card lesson-intro ${guide?'lesson-guide':'lesson-title'}">${guide?`<p class="eyebrow">So arbeitest du</p><h1>Dein Weg durch die Lernwelt</h1><ol class="lesson-guide-list"><li><strong>Lies die Folien.</strong><p>Schau dir die Erklärungen und Bilder in Ruhe an. Mit „Zurück“ kannst du sie erneut lesen.</p></li><li><strong>Beantworte zwischendurch die Fragen.</strong><p>Klicke eine Antwort an: Du siehst sofort die Rückmeldung. Danach kannst du weitergehen oder deine Antwort ändern.</p></li><li><strong>Mach anschließend die Übung.</strong><p>Am Ende führt dich „Jetzt üben“ zum passenden Übungsteil. Vergleiche eigene Texte und Zeichnungen selbst mit den Beispielen.</p></li></ol>`:`<p class="eyebrow">Willkommen in deiner Lernwelt</p><h1>${escapeHTML(current.title)}</h1><p class="lesson-intro-description">${escapeHTML(current.description)}</p><p class="lesson-intro-goal">Lesen · Mitdenken · Ausprobieren</p><p>Klicke auf „Weiter“, um die Anleitung zu lesen.</p>`}</div>`;
 $('lessonPrev').disabled=!guide;$('lessonNext').disabled=false;$('lessonNext').textContent=guide?'Mit dem Lernen beginnen →':'Weiter zur Anleitung →';
}
function renderLesson(){if(lessonStage!=='content'){renderLessonIntro();return}const slides=current.slides,slide=slides[lessonPage],response=lessonResponses[lessonPage];$('lessonContent').innerHTML=`<p class="subheading">${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]} · ${escapeHTML(current.topic)}</p><div class="progress-track"><div class="progress-fill" style="width:${(lessonPage+1)/slides.length*100}%"></div></div><p class="muted small">Lernseite ${lessonPage+1} von ${slides.length}</p>${notebookEntries[notebookId()]?.length?`<div class="notebook-tools"><button class="secondary" id="printNotebook" type="button">🖨️ Alle Merkteile für den Hefter drucken / als PDF</button></div>`:''}<div class="lesson-card"><h1>${escapeHTML(slide.title)}</h1>${slide.sub?`<h3>${escapeHTML(slide.sub)}</h3>`:''}${slide.body?`<p>${escapeHTML(slide.body)}</p>`:''}${(slide.visual||slide.images)?`<div class="lesson-visual"><div class="illustration">${illustrate(slide)}</div>${slide.caption&&slide.caption!==slide.visual?`<p class="visual-caption">${escapeHTML(slide.caption)}</p>`:''}</div>`:''}${notebookCard()}${slide.note?`<div class="lesson-note"><strong>💡 Merke:</strong> ${escapeHTML(slide.note)}</div>`:''}${slide.question?`<div class="check-card"><h3>🧠 Jetzt bist du dran!</h3><p><strong>${escapeHTML(slide.question)}</strong></p>${slide.choices.map((c,i)=>`<label class="choice"><input type="radio" name="lessonAnswer" value="${i}" ${response?.choice===i?'checked':''}> ${escapeHTML(c)}</label>`).join('')}<div id="lessonFeedback" aria-live="polite">${response?.checked?feedback(slide,response.choice):''}</div></div>`:''}</div>`;
$('printNotebook')?.addEventListener('click',printNotebook);$('lessonPrev').disabled=false;$('lessonNext').disabled=!!slide.question&&!response?.checked;$('lessonNext').textContent=lessonPage===slides.length-1?'Jetzt üben →':'Weiter →';if(slide.question){document.querySelectorAll('[name="lessonAnswer"]').forEach(input=>input.addEventListener('change',()=>{
 lessonResponses[lessonPage]={choice:Number(input.value),checked:true};
 $('lessonFeedback').innerHTML=feedback(slide,Number(input.value));$('lessonNext').disabled=false;
}))}}

function feedback(slide,choice){return choice===slide.answer?`<p class="good"><strong>✓ Richtig!</strong> ${escapeHTML(slide.why)}</p>`:`<p class="bad"><strong>Noch nicht ganz.</strong> ${escapeHTML(slide.hint)} Versuche es noch einmal.</p>`}
let algoOrderSelections={};
function renderWork(){
 if(current.topic==='Algorithmen')return renderAlgoWork();
 const isPractice=!!practiceState;
 // Reihenfolge-Auswahl wird je Aufgabenansicht neu aufgebaut.
 algoOrderSelections={};
 const page=isPractice?practiceState.page:0;
 const qs=isPractice?current.pages[page]:current.questions;
 $('workHead').innerHTML=`<h1>${escapeHTML(current.title)}</h1><p class="muted">${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]} · ${current.mode}</p>`+
 (isPractice?`<div class="levelbar">${current.pages.map((p,i)=>`<span class="levelpill ${i===page?'active':i<page?'done':''}">${i+1}. ${levels[i]||`Stufe ${i+1}`}</span>`).join('')}</div><h2>Seite ${page+1} von ${current.pages.length} · ${levels[page]}</h2><div class="progress-track" aria-label="Fortschritt"><div class="progress-fill" style="width:${page/current.pages.length*100}%"></div></div><p class="muted">${qs.length} Aufgaben · Die Lösungen und Punkte siehst du erst, wenn du diese Seite beendest.</p>`:'')+
 `${!isPractice?'<div class="progress-track"><div class="progress-fill" style="width:0%"></div></div><p class="notice">20 Aufgaben in drei Schwierigkeitsstufen. Die Bewertung erscheint erst nach dem vollständigen Abgeben des Tests.</p><label for="student">Dein Name</label><input id="student" maxlength="80" autocomplete="off" placeholder="Vorname und Nachname"><p class="small muted">Dein Name wird nur für die Ergebnisanzeige verwendet und nicht gespeichert.</p>':''}`;
 $('questions').innerHTML=qs.map((q,i)=>`${!isPractice&&!current.questions[0].choices&&(i===0||i===12||i===17)?`<h2 class="test-section">${i===0?'Anfänger · Aufgaben 1–12':i===12?'Fortgeschritten · Aufgaben 13–17':'Profi · Aufgaben 18–20'}</h2>`:''}<div class="question"><label for="q${i}">Aufgabe ${isPractice?current.pages.slice(0,page).reduce((n,p)=>n+p.length,0)+i+1:i+1}: ${escapeHTML(q.q)}</label>${q.order?algoOrderHTML(q,i):q.choices?`<select id="q${i}" aria-label="Antwort Aufgabe ${i+1}"><option value="">Bitte auswählen</option>${q.choices.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('')}</select>`:`<input id="q${i}" inputmode="numeric" autocomplete="off" aria-label="Antwort Aufgabe ${i+1}">`}</div>`).join('');
 document.querySelectorAll('[data-order-q]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.orderQ),q=qs[i];if(!algoOrderSelections[i])algoOrderSelections[i]=[];const v=Number(b.dataset.orderV);if(algoOrderSelections[i].includes(v))return;algoOrderSelections[i].push(v);b.disabled=true;$('orderResult'+i).textContent=algoOrderSelections[i].map(j=>q.order[j]).join(' → ');$('q'+i).value=algoOrderSelections[i].map(j=>q.order[j]).join(' → ')}));
 $('finish').textContent=isPractice?'Seite beenden und auswerten':'Test auswerten';
 $('reset').textContent='Neu beginnen';
}
function algoOrderHTML(q,i){const options=q.order||[];return `<div class="order-items" id="orderItems${i}">${options.map((x,j)=>`<button type="button" class="secondary order-choice" data-order-q="${i}" data-order-v="${j}">${escapeHTML(x)}</button>`).join('')}</div><p class="small muted">Klicke die Schritte in der richtigen Reihenfolge an.</p><div id="orderResult${i}" class="order-result"></div><input type="hidden" id="q${i}" value="">`}
function evaluate(qs){return qs.map((q,i)=>({q:q.q,a:q.a,given:$('q'+i).value.trim(),correct:(q.order?$('q'+i).value===q.a:q.choices?$('q'+i).value===q.a:normalize($('q'+i).value)===q.a)}))}
function renderAnswers(answers,offset=0){return `<h3>Auswertung der Aufgaben</h3>`+answers.map((a,i)=>`<p><strong>${offset+i+1}. ${escapeHTML(a.q)}</strong><br>Deine Antwort: ${escapeHTML(a.given||'–')} · <span class="${a.correct?'good':'bad'}">${a.correct?'Richtig':'Falsch'}</span>${a.correct?'':`<br>Richtige Antwort: ${escapeHTML(a.a)}`}</p>`).join('')}
function finishPractice(){
 const page=practiceState.page,answers=evaluate(current.pages[page]);
 if(answers.some(a=>!a.given)&&!confirm('Einige Antworten fehlen. Diese Seite trotzdem beenden?'))return;
 practiceState.answers.push(answers);
 const score=answers.filter(a=>a.correct).length;practiceState.scores.push(score);
 const total=practiceState.scores.reduce((a,b)=>a+b,0),maximum=current.pages.reduce((n,p)=>n+p.length,0),answered=current.pages.slice(0,page+1).reduce((n,p)=>n+p.length,0),completed=page===current.pages.length-1;
 const today=new Date().toLocaleDateString('de-DE');
 $('resultBody').innerHTML=`<div class="result"><p>${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]} · Übung ohne Namensangabe</p><p>${escapeHTML(current.title)} · ${today}</p><h2>${levels[page]} – Seite ${page+1} von ${current.pages.length}</h2><div class="score">${score} / ${answers.length} Punkte</div><p>${Math.round(score/answers.length*100)}% auf dieser Seite</p>${completed?`<h2>Gesamtergebnis</h2><div class="score">${total} / ${maximum} Punkte</div><p>${Math.round(total/maximum*100)}% insgesamt</p><p>${current.pages.map((p,i)=>`${levels[i]||`Stufe ${i+1}`}: ${practiceState.scores[i]}/${p.length}`).join(' · ')}</p>`:`<p>Bisher insgesamt: ${total} / ${answered} Punkte</p>`}</div>`+renderAnswers(answers,answered-answers.length);
 const actions=$('results').querySelector('.actions');
 let next=$('nextLevel');if(next)next.remove();
 if(!completed){next=document.createElement('button');next.id='nextLevel';next.textContent=`Weiter zu ${levels[page+1]} →`;next.addEventListener('click',()=>{practiceState.page++;renderWork();show('work')});actions.prepend(next)}
 $('pdfNotice').style.display='none';show('results');
}
function normalize(s){return String(s).trim().replace(/\s+/g,'').replace(/^0+(?=\d)/,'')}function grade(points){return points>=19?'1':points>=15?'2':points>=12?'3':points>=8?'4':points>=4?'5':'6'}function finish(){
 if(current)activityEngines[current.engine].finish();
}
function finishQuestions(){
 if(current.topic==='Algorithmen')return finishAlgoActivity();
 if(practiceState){finishPractice();return}
 const name=$('student').value.trim();if(!name){alert('Bitte gib zuerst deinen Namen ein.');$('student').focus();return}
 const answers=evaluate(current.questions);if(answers.some(a=>!a.given)&&!confirm('Einige Antworten fehlen. Trotzdem abgeben?'))return;
 const score=answers.filter(a=>a.correct).length,percent=Math.round(100*score/answers.length),today=new Date().toLocaleDateString('de-DE');
 $('resultBody').innerHTML=`<div class="result"><p><strong>${escapeHTML(name)}</strong> · ${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]}</p><p>${escapeHTML(current.title)} · ${today}</p><div class="score">${score} / ${answers.length} Punkte</div><p>${percent}% erreicht</p><div class="score">Note ${grade(score)}</div><p class="small">Notenschlüssel (20 Punkte): Note 1 ab 19, Note 2 ab 15, Note 3 ab 12, Note 4 ab 8, Note 5 ab 4 Punkten; sonst Note 6.</p></div>`+renderAnswers(answers);
 captureTestResult(name,answers,score);$('pdfNotice').style.display='block';show('results')}

let sortStage=0,sortAssignments={},selectedCard=null,sortOrder=[];function shuffleCards(){sortOrder=[...hardwareCards].sort(()=>Math.random()-.5)}
function sortingGroup(card){return sortStage===0?card.kind:(card.kind==='Software'?'Software':card.role==='Innen'?'Innen':'Außen')}
function practiceLevelHeader(stage,subtitle){
 const safe=Math.max(0,Math.min(4,stage));
 return `<p class="subheading">${escapeHTML(current.subject)} · Klasse ${selectedGrade||current.grades[0]} · Übung</p><div class="levelbar" aria-label="Schwierigkeitsstufen">${levels.map((level,i)=>`<span class="levelpill ${i===safe?'active':i<safe?'done':''}" ${i===safe?'aria-current="step"':''}>${i+1}. ${level}</span>`).join('')}</div><h2>Stufe ${safe+1} von 5 · ${levels[safe]}</h2><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${safe*20}" aria-label="Abgeschlossene Stufen"><div class="progress-fill" style="width:${safe*20}%"></div></div><p class="muted">${escapeHTML(subtitle)}</p>`;
}
function renderSorting(){
 const groups=sortStage===0?['Hardware','Software']:['Außen','Innen','Software'];
 const title=sortStage===0?'Stufe 1 · Neuling: Hardware oder Software?':'Stufe 2 · Anfänger: Innen, außen oder Software?';
 $('workHead').innerHTML=`<h1>🧩 Bilder zuordnen</h1>${practiceLevelHeader(sortStage,title+' · Ohne Namensangabe')}<p>Ziehe die Bildkarten in die passenden Felder. Auf dem Tablet kannst du zuerst eine Karte und dann das Zielfeld antippen.</p><p class="muted small">${Object.keys(sortAssignments).length} von ${hardwareCards.length} Karten zugeordnet</p>`;
 $('questions').innerHTML=`<div class="sort-pool" aria-label="Bildkarten">${sortOrder.filter(c=>!sortAssignments[c.id]).map(c=>sortCardHTML(c)).join('')||'<p>Alle Karten sind zugeordnet!</p>'}</div><div class="sort-zones">${groups.map(g=>`<div class="sort-zone" data-zone="${g}" tabindex="0" role="button" aria-label="Karten in ${g} ablegen"><h3>${g==='Innen'?'Bauteile im Computer':g}</h3><div class="sort-zone-cards">${hardwareCards.filter(c=>sortAssignments[c.id]===g).map(c=>sortCardHTML(c)).join('')}</div></div>`).join('')}</div><p id="sortTip" class="muted small" aria-live="polite">Tipp: Bereits zugeordnete Karten kannst du erneut antippen oder verschieben.</p>`;
 document.querySelectorAll('.sort-card').forEach(el=>{el.addEventListener('dragstart',e=>{selectedCard=el.dataset.card;e.dataTransfer.setData('text/plain',selectedCard)});el.addEventListener('click',e=>{e.stopPropagation();selectedCard=el.dataset.card;document.querySelectorAll('.sort-card').forEach(x=>x.classList.toggle('selected',x.dataset.card===selectedCard));$('sortTip').textContent='Karte ausgewählt: '+hardwareCards.find(c=>c.id===selectedCard).name+'. Tippe jetzt auf ein Zielfeld.'})});
 document.querySelectorAll('.sort-zone').forEach(z=>{z.addEventListener('dragover',e=>e.preventDefault());z.addEventListener('drop',e=>{e.preventDefault();assignSort(e.dataTransfer.getData('text/plain'),z.dataset.zone)});z.addEventListener('click',()=>{if(selectedCard)assignSort(selectedCard,z.dataset.zone)});z.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&selectedCard){e.preventDefault();assignSort(selectedCard,z.dataset.zone)}})});
 $('finish').textContent='Zuordnung überprüfen';$('reset').textContent='Neu beginnen';
}
function sortCardHTML(c){return `<button type="button" class="sort-card" draggable="true" data-card="${c.id}" aria-label="${escapeHTML(c.name)} auswählen"><img class="device-photo" src="${EMBEDDED_IMAGES[c.id]}" alt="" loading="lazy"><span>${escapeHTML(c.name)}</span></button>`}
function assignSort(id,group){if(!hardwareCards.some(c=>c.id===id))return;sortAssignments[id]=group;selectedCard=null;renderSorting()}
function finishSorting(){if(Object.keys(sortAssignments).length<hardwareCards.length){alert('Ordne bitte zuerst alle Bildkarten zu.');return}const correct=hardwareCards.filter(c=>sortAssignments[c.id]===sortingGroup(c));const score=correct.length;const full=score===hardwareCards.length;
 $('resultBody').innerHTML=`<div class="result"><p>Informatik · Klasse 5 · Übung ohne Namensangabe</p><h2>Stufe ${sortStage+1} von 5 · ${levels[sortStage]}</h2><h3>${sortStage===0?'Hardware oder Software':'Geräte und Programme zuordnen'}</h3><div class="score">${score} / 12 Punkte</div><p>${full?'Klasse! Alle Karten sind richtig zugeordnet.':'Schau dir die Korrekturen an und versuche es erneut.'}</p></div><h3>Deine Zuordnungen</h3>${hardwareCards.map(c=>`<p>${c.icon} <strong>${escapeHTML(c.name)}</strong>: ${escapeHTML(sortAssignments[c.id])} – <span class="${sortAssignments[c.id]===sortingGroup(c)?'good':'bad'}">${sortAssignments[c.id]===sortingGroup(c)?'Richtig':'Richtig wäre: '+sortingGroup(c)}</span></p>`).join('')}`;
 $('pdfNotice').style.display='none';const old=$('nextLevel');if(old)old.remove();if(sortStage===0||sortStage===1){const b=document.createElement('button');b.id='nextLevel';b.textContent=sortStage===0?'Weiter zu innen und außen →':'Weiter zu Stufe 3: Fortgeschritten →';b.addEventListener('click',()=>{if(sortStage===0){sortStage=1;hwStage=1;sortAssignments={};shuffleCards();renderSorting();show('work')}else{hwStage=2;hwShowStage()}});$('results').querySelector('.actions').prepend(b)}show('results')}


let hwStage=0,hwAnswers=[],hwName='';
function hwImage(id){return id?`<img class="question-image" src="${EMBEDDED_IMAGES[id]}" alt="Abgebildetes Gerät oder Programm">`:''}
function hwQuestionHTML(q,i,prefix='hwq'){
 return `<div class="question"><label for="${prefix}${i}"><strong>Aufgabe ${i+1}:</strong> ${escapeHTML(q.q)}</label>${hwImage(q.image)}${q.choices?`<select id="${prefix}${i}"><option value="">Bitte auswählen</option>${q.choices.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('')}</select>`:`<input id="${prefix}${i}" type="text" autocomplete="off" placeholder="Deine Antwort">`}</div>`;
}
function hwMatch(q,given){let g=String(given).trim().toLocaleLowerCase('de-DE').replace(/[.!?]/g,'').replace(/\s+/g,' ');return q.accept?q.accept.includes(g):g===q.a.toLocaleLowerCase('de-DE')}
function hwCollect(qs){return qs.map((q,i)=>({q:q.q,a:q.a,given:($('hwq'+i)?.value||'').trim(),correct:hwMatch(q,$('hwq'+i)?.value||''),why:q.why||''}))}
function hwStartPractice(){hwStage=0;hwAnswers=[];sortStage=0;sortAssignments={};shuffleCards();renderSorting();show('work')}
function hwShowStage(){
 const title=['Bilder zuordnen','Innen, außen oder Software zuordnen','Begriffe verstehen','Lücken und Anwendung','In eigenen Worten erklären'][hwStage];
 $('workHead').innerHTML=`<h1>✏️ ${title}</h1>${practiceLevelHeader(hwStage,'Keine Namenseingabe · Du darfst beliebig oft üben.')}`;
 if(hwStage===4){$('questions').innerHTML=HW_EXPLANATIONS.map(([q,a],i)=>`<div class="question"><label for="exp${i}">${i+1}. ${escapeHTML(q)}</label><textarea id="exp${i}" rows="3" placeholder="Schreibe deine Erklärung in eigenen Worten."></textarea><details><summary>Beispielantwort anzeigen (erst selbst überlegen!)</summary><p>${escapeHTML(a)}</p></details></div>`).join('');$('finish').textContent='Übung abschließen';}
 else {const stageQs=hwStage===3?[...HW_PRACTICE[1],...HW_PRACTICE[2]]:HW_PRACTICE[0];$('questions').innerHTML=stageQs.map((q,i)=>hwQuestionHTML(q,i)).join('');$('finish').textContent='Antworten überprüfen';}
 $('reset').textContent='Übung neu starten';show('work');
}
function hwFinishPractice(){
 if(hwStage===4){$('resultBody').innerHTML='<h2>Geschafft! 🎉</h2><p>Du hast Geräte erkannt, Fachbegriffe geübt und eigene Erklärungen formuliert.</p><p>Vergleiche deine Sätze mit den Beispielantworten und verbessere sie bei Bedarf.</p><p><strong>Deine automatisch bewerteten Aufgaben:</strong> '+hwAnswers.reduce((s,a)=>s+a.filter(x=>x.correct).length,0)+' von '+hwAnswers.reduce((s,a)=>s+a.length,0)+' richtig (ohne die freien Erklärungen).</p>';hwResult(false);return}
 const answers=hwCollect(hwStage===3?[...HW_PRACTICE[1],...HW_PRACTICE[2]]:HW_PRACTICE[0]);if(answers.some(x=>!x.given)&&!confirm('Einige Antworten fehlen. Trotzdem auswerten?'))return;
 hwAnswers.push(answers);$('resultBody').innerHTML=`<h2>Stufe ${hwStage+1} von 5 · ${levels[hwStage]}</h2><h3>Deine Auswertung</h3><div class="score">${answers.filter(x=>x.correct).length} / ${answers.length}</div>`+answers.map((a,i)=>`<div class="question"><strong>${i+1}. ${escapeHTML(a.q)}</strong><p>${escapeHTML(a.given||'–')} · <span class="${a.correct?'good':'bad'}">${a.correct?'Richtig':'Noch nicht richtig'}</span></p>${a.correct?'':`<p>Richtige Antwort: <strong>${escapeHTML(a.a)}</strong></p>`}<p class="muted">${escapeHTML(a.why)}</p></div>`).join('');hwResult(true)
}
function hwResult(next){$('pdfNotice').style.display='none';$('results').querySelector('#nextLevel')?.remove();if(next){const b=document.createElement('button');b.id='nextLevel';b.textContent='Weiter zu '+levels[hwStage+1]+' →';b.onclick=()=>{hwStage++;hwShowStage()};$('results').querySelector('.actions').prepend(b)}show('results')}
function hwStartTest(){practiceState=null;hwStage=-1;hwName='';hwRenderTest();show('work')}
function hwRenderTest(){
 $('workHead').innerHTML='<h1>📝 Test: Hardware und Software</h1><p>Informatik · Klasse 5 · 20 Aufgaben · 20 Punkte</p><p class="notice">Bitte beantworte alle Aufgaben. Deine Note erscheint erst nach der Abgabe.</p><label for="student">Vorname und Nachname</label><input id="student" maxlength="80" autocomplete="off" placeholder="Dein Name">';
 $('questions').innerHTML=HW_TEST.map((q,i)=>hwQuestionHTML(q,i)).join('');$('finish').textContent='Test abgeben und auswerten';$('reset').textContent='Test neu beginnen';
}
function hwFinishTest(){const name=$('student').value.trim();if(!name){alert('Bitte gib deinen Namen ein.');return}const answers=hwCollect(HW_TEST);if(answers.some(a=>!a.given)&&!confirm('Einige Antworten fehlen. Trotzdem abgeben?'))return;const score=answers.filter(a=>a.correct).length;
 $('resultBody').innerHTML=`<div class="result"><p><strong>${escapeHTML(name)}</strong> · Informatik · Klasse 5</p><p>Hardware und Software · ${new Date().toLocaleDateString('de-DE')}</p><div class="score">${score} / 20 Punkte</div><div class="score">Note ${grade(score)}</div><p class="small">Notenschlüssel: 19–20 = 1 · 15–18 = 2 · 12–14 = 3 · 8–11 = 4 · 4–7 = 5 · 0–3 = 6.</p></div>`+renderAnswers(answers);
 captureTestResult(name,answers,score);$('results').querySelector('#nextLevel')?.remove();$('pdfNotice').style.display='block';show('results');
}

// Ablaufsteuerung: Modi bestimmen die Ansicht, Engines die Aufgabenmechanik.
const activityModes={
 Lernen:{label:'📖 Lernen',tag:'learntag',action:'Lernkapitel öffnen',start(){renderLesson();show('lesson')}},
 'Übung':{label:'✏️ Üben',tag:'practicetag',action:'Übung starten',start(){activityEngines[current.engine].start()}},
 Test:{label:'📝 Testen',tag:'testtag',action:'Test öffnen',start(){activityEngines[current.engine].start()}}
};
const activityEngines={
 questions:{
  start(){practiceState=current.mode==='Übung'?{page:0,scores:[],answers:[]}:null;renderWork();show('work')},
  finish:finishQuestions
 },
 hardwarePractice:{start:hwStartPractice,finish(){hwStage<2?finishSorting():hwFinishPractice()}},
 hardwareTest:{start:hwStartTest,finish:hwFinishTest},
 tryTest:{start:renderTryTest,finish:finishTryTest}
};
function resetActivityState(){
 clearTestResult();
 algoPhase=null;practiceState=null;lessonPage=0;lessonResponses={};lessonStage='title';algoOrderSelections={};
 hwStage=0;hwAnswers=[];hwName='';sortStage=0;sortAssignments={};selectedCard=null;sortOrder=[];
 $('nextLevel')?.remove();$('pdfNotice').style.display='none';
 document.body.classList.remove('print-notebook','print-book-sources');
}
function initializeActivities(){
 const lessons={
  'binary-learn':{slides:binarySlides,practiceId:'binary-practice'},
  'hardware-learn':{slides:hardwareSlides,practiceId:'hardware-practice'},
  'algo-general-learn':{slides:algoGeneralSlides,practiceId:'algo-general-practice'},
  'algo-display-learn':{slides:algoDisplaySlides,practiceId:'algo-display-practice'},
  'algo-summary':{slides:algoSummarySlides,practiceId:'algo-review-practice'}
 };
 const ids=new Set();
 for(const task of tasks){
  if(ids.has(task.id)||!activityModes[task.mode])throw new Error('Ungültige Modulregistrierung: '+task.id);
  ids.add(task.id);
  Object.assign(task,lessons[task.id]||{});
  task.engine=task.id==='hardware-practice'?'hardwarePractice':task.id==='hardware-test'?'hardwareTest':'questions';
  if(task.mode==='Test')task.questions=task.id==='hardware-test'?HW_TEST:TEST_QUESTIONS[task.id];
  if(task.mode==='Lernen'&&(!task.slides?.length||!tasks.some(t=>t.id===task.practiceId&&t.mode==='Übung')))throw new Error('Lernmodul ohne Seiten oder Übung: '+task.id);
  if(task.mode==='Übung'&&task.engine==='questions'&&(!task.pages?.length||task.pages.some(p=>!p.length)))throw new Error('Übung ohne Aufgaben: '+task.id);
  if(task.mode==='Test'&&(!task.questions?.length||!TEST_CODES[task.id]))throw new Error('Test ohne Aufgaben oder Zugang: '+task.id);
 }
}

$('finish').addEventListener('click',finish);$('reset').addEventListener('click',()=>start(current.id));
$('back').addEventListener('click',()=>{show('home');navStep(current?.isDemo?'Subject':'Materials')});
$('again').addEventListener('click',()=>{show('home');navStep(current?.isDemo?'Subject':'Materials')});
$('lessonBack').addEventListener('click',()=>{show('home');navStep('Materials')});
$('lessonPrev').addEventListener('click',()=>{if(lessonStage==='guide')lessonStage='title';else if(lessonStage==='content'){if(lessonPage>0)lessonPage--;else lessonStage='guide'}renderLesson();window.scrollTo(0,0)});
$('lessonNext').addEventListener('click',()=>{if(lessonStage==='title')lessonStage='guide';else if(lessonStage==='guide')lessonStage='content';else{if(current.slides[lessonPage].question&&!lessonResponses[lessonPage]?.checked)return;if(lessonPage===current.slides.length-1){start(current.practiceId);return}lessonPage++}renderLesson();window.scrollTo(0,0)});
initializeActivities();
renderSubjects();navStep('Subject');
