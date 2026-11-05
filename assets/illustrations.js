'use strict';

// Explizite Zuordnung zu bestehenden Lernseiten; keine Stichwort-Heuristik.
// Diese Grafiken visualisieren vorhandene Beispiele, keine zusätzlichen Lerninhalte.
const lessonFigures = {
 'algo-general-learn': {
  'Algorithmen begegnen dir überall': {kind:'everyday',caption:'Rezept, Bauanleitung und Zähneputzen: Schritte führen zu einem Ziel.'},
  'Was ist ein Algorithmus?': {kind:'sequence',steps:[['Anweisung 1','ausführen'],['Anweisung 2','ausführen'],['Ziel erreicht']],caption:'Die Anweisungen werden in einer festgelegten Reihenfolge ausgeführt.'},
  'Was ist kein Algorithmus?': {kind:'comparison',left:['Unklar','„Mach irgendetwas','Schönes.“'],right:['Konkrete Schritte','Blatt nehmen','Kreis zeichnen','Kreis ausmalen'],caption:'Links bleibt das Vorgehen offen. Rechts ist jeder Schritt benannt.'},
  'Eindeutigkeit: klare Anweisungen': {kind:'clarity',caption:'Eine klare Anweisung lässt erkennen, was genau zu tun ist.'},
  'Ausführbarkeit: sinnvolle Schritte': {kind:'feasibility',caption:'Prüfe, ob eine Person die beschriebene Handlung tatsächlich ausführen kann.'},
  'Endlichkeit: ein erreichbares Ende': {kind:'finite',caption:'Der Ablauf erreicht nach endlich vielen Schritten ein Ende.'},
  'Anweisungen in richtiger Reihenfolge': {kind:'sequence',steps:[['Wasserkocher','füllen'],['Wasser','erhitzen'],['Teebeutel in eine','Tasse legen'],['Heißes Wasser','eingießen'],['Tee ziehen lassen']],icons:['kettle','switch','cup','kettle','cup'],caption:'Eine mögliche Anleitung zum Teekochen mit fünf klaren Schritten.'},
  'Die Sequenz': {kind:'sequence',steps:[['Anweisung A'],['Anweisung B'],['Anweisung C']],caption:'A, B und C werden nacheinander ausgeführt. Kein Schritt wird übersprungen.'},
  'Algorithmen prüfen': {kind:'checklist',items:['Eindeutig?','Ausführbar?','Ein Ende vorhanden?','Reihenfolge richtig?'],caption:'Prüfe eine Anleitung mit diesen vier Fragen.'},
  'Fehlerdetektiv': {kind:'shoes',caption:'Die Socke kommt vor dem Schuh. Vertauschte Schritte passen nicht zum Ziel.'},
  'Algorithmen selbst entwickeln': {kind:'planning',caption:'Zerlege die Aufgabe, formuliere Schritte und überprüfe ihre Reihenfolge.'},
  'Pfannkuchen: eine Sequenz': {kind:'pancakes',caption:'Pfannkuchen zubereiten: Erst den Teig vorbereiten, dann in der erhitzten Pfanne ausbacken.'},
  'Händewaschen: klare Befehle': {kind:'handwash',caption:'Beschreibe die dargestellten Schritte mit klaren Befehlen. Prüfe auch, ob Schritte vertauschbar sind.'},
  'Vom Algorithmus zum Programm': {kind:'program',caption:'Ein Programm formuliert einen Algorithmus in einer Programmiersprache. EVA beschreibt Eingabe, Verarbeitung und Ausgabe.'},
  'Du kannst Algorithmen erkennen!': {kind:'milestones',caption:'Du hast Definition, Eigenschaften und Reihenfolge kennengelernt.'}
 },
 'algo-display-learn': {
  'Warum Algorithmen darstellen?': {kind:'overview',caption:'Ein Ablaufplan macht die Verbindung zwischen Anweisungen sichtbar.'},
  'Ein einfacher Ablaufplan': {kind:'flowSequence',caption:'Das vollständige Beispiel hat sechs Aktionen. Start und Ende zählen nicht als Aktionen.'},
  'Das Oval': {kind:'terminals',caption:'Start und Ende stehen jeweils in einem Oval.'},
  'Das Rechteck': {kind:'action',caption:'Ein Rechteck enthält eine ausführbare Aktion.'},
  'Die Pfeile': {kind:'arrows',caption:'Folge den Pfeilspitzen vom Start über die Aktionen zum Ende.'},
  'Die Raute': {kind:'diamond',caption:'Die Frage in der Raute hat zwei beschriftete Ausgänge: Ja und Nein.'},
  'Wenn – dann – sonst': {kind:'decision',caption:'Ja: Regenschirm mitnehmen. Nein: Sonnenbrille mitnehmen. Danach führen beide Wege zu „Zur Schule gehen“ und zum Ende.'},
  'Flussdiagramme lesen': {kind:'readPath',caption:'Beginne beim Start und folge dem eingezeichneten Weg bis zum Ende.'},
  'Flussdiagramme zeichnen': {kind:'toolbox',caption:'Wähle das passende Symbol und verbinde die Schritte mit Pfeilen.'},
  'Schleifen: etwas wiederholen': {kind:'loop',caption:'Aufgaben fertig? Bei Nein eine Aufgabe lösen und erneut prüfen. Bei Ja spielen gehen und den Ablauf beenden.'},
  'Zählschleife und Bedingungsschleife': {kind:'loopTypes',caption:'Zehnmal Hampelmann: Die Anzahl steht fest. Wasser eingießen, solange das Glas nicht voll ist: Die Bedingung steuert die Wiederholung.'},
  'Lineare Suche': {kind:'search',caption:'Suche die 5: Prüfe 7, 3, 9, 1 und 5. Treffer auf Position 5; die Karten 8 und 2 werden nicht mehr geprüft.'},
  'Bubble Sort': {kind:'bubble',caption:'Erster Durchgang mit fünf Karten: Die 5 wandert nach rechts. [2, 4, 1, 3, 5] ist noch nicht vollständig sortiert.'},
  'Insertion Sort': {kind:'insertion',caption:'Der sortierte Teil wächst: Füge nacheinander 2, 4, 1 und 3 in den bereits sortierten Teil ein.'},
  'Darstellungen sicher verstehen': {kind:'skills',caption:'Ablaufpläne, Entscheidungen, Wiederholungen sowie Suchen und Sortieren gehören zusammen.'}
 },
 'algo-summary': {
  'Das Wichtigste zu Algorithmen': {kind:'principles',caption:'Die drei Bedingungen: eindeutig, ausführbar und endlich. Zur Eindeutigkeit gehört auch die richtige Reihenfolge.'},
  'Symbole und Pfeile': {kind:'symbolSummary',caption:'Die vier Bausteine eines Flussdiagramms auf einen Blick.'},
  'Drei Ablaufarten': {kind:'flowTypes',caption:'Sequenz führt weiter, Verzweigung wählt einen Weg, Schleife führt zurück.'},
  'Suchen und Sortieren': {kind:'sortSummary',caption:'Suchen findet eine Karte. Sortieren bringt Karten in eine Reihenfolge.'},
  'Bereit für den Test?': {kind:'ready',caption:'Wiederhole die Begriffe und prüfe dein Wissen in den Übungen.'}
 }
};

function figureEscape(value){
 return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function figureText(x,y,lines,size=20,anchor='middle',color='#243451'){
 const list=Array.isArray(lines)?lines:[lines];
 return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}">${list.map((line,i)=>`<tspan x="${x}" dy="${i?25:0}">${figureEscape(line)+(i<list.length-1?' ':'')}</tspan>`).join('')}</text>`;
}
function figurePanel(x,y,w,h,lines,fill='#eaf5f1',size=20){
 const count=Array.isArray(lines)?lines.length:1;
 return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#63758a" stroke-width="2"/>`+figureText(x+w/2,y+h/2+7-(count-1)*12.5,lines,size);
}
function figureOval(x,y,w,label){
 return `<ellipse cx="${x+w/2}" cy="${y+25}" rx="${w/2}" ry="25" fill="#fff0cf" stroke="#8b6a31" stroke-width="2"/>`+figureText(x+w/2,y+32,label);
}
function figureIcon(name,x,y,scale=1){
 if(name==='brush')return `<g transform="translate(${x} ${y}) scale(${scale})"><image data-learning-image="toothbrush" href="${LEARNING_IMAGES.toothbrush.src}" x="-45" y="-45" width="90" height="90" preserveAspectRatio="xMidYMid meet"/></g>`;
 const shapes={
  cup:'<path d="M-24-15H18V13Q18 29-3 29T-24 13Z"/><path d="M18-10H26Q42-10 37 5Q34 13 18 13M-30 35H32M-13-29V-39M1-29V-42M14-29V-37"/>',
  kettle:'<path d="M-24 22Q-30-10-15-23H15Q29-10 24 22ZM-15-23V-31H15V-23M24-8H38V9H26M-24-7L-39-15L-29 9M-30 29H30"/>',
  switch:'<rect x="-30" y="-36" width="60" height="72" rx="12"/><path d="M0-24V1M-13-11A23 23 0 1 0 13-11"/>',
  recipe:'<rect x="-29" y="-36" width="58" height="72" rx="7"/><path d="M-16-18H16M-16-2H16M-16 14H7"/>',
  blocks:'<path d="M-35 0H0V35H-35ZM0 0H35V35H0ZM-17-35H17V0H-17Z"/>',
  sock:'<path d="M-18-35H17V7L-9 29Q-35 43-42 23Q-44 16-31 7L-18-2ZM-18-23H17"/>',
  shoe:'<path d="M-35-8L-13 0L-1-16L12 8L33 17Q44 24 36 33H-35ZM-35 22H38M-6-1L9 4M0 8L15 12"/>',
  pencil:'<path d="M-31 23L16-30L31-16L-15 37L-35 41ZM12-25L26-12M-31 23L-15 37"/>',
  flag:'<path d="M-20 39V-38M-20-35Q0-47 20-33V0Q0-14-20-2"/>',
  search:'<circle cx="-5" cy="-6" r="25"/><path d="M13 13L37 37"/>',
  check:'<circle r="35"/><path d="M-19 0L-4 16L23-18"/>',
  question:'<circle r="35"/><path d="M-12-14Q-10-29 7-23Q25-15 8-2L0 6V12M0 23V25"/>',
  person:'<circle cy="-23" r="13"/><path d="M-25 31V15Q-25-4 0-4T25 15V31M-12 11V35M12 11V35"/>',
  moon:'<path d="M11-34A37 37 0 1 0 34 17A32 32 0 0 1 11-34Z"/>'
 };
 return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="#5063a6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${shapes[name]||shapes.check}</g>`;
}
// Gemeinsamer Zeichenbaustein für das Quellenbeispiel und eigene Ablaufpläne.
function actionSequenceBody(actions,arrow){
 const endY=92+actions.length*94;
 const body=figureOval(175,8,170,'Start')+arrow('M260 58V88')+actions.map((action,i)=>{
  const y=92+i*94;
  const words=String(action).match(/\S{1,26}/g)||[];const lines=[''];
  for(const word of words){const last=lines.length-1;if((lines[last]+' '+word).trim().length>27&&lines[last])lines.push(word);else lines[last]=(lines[last]+' '+word).trim()}
  return `<rect data-flow-node="action" x="65" y="${y}" width="390" height="64" fill="#eaf5f1" stroke="#63758a" stroke-width="2"/>`+figureText(260,y+38-(lines.length-1)*12.5,lines,20)+arrow(`M260 ${y+64}V${i===actions.length-1?endY-4:y+90}`);
 }).join('')+figureOval(175,endY,170,'Ende');
 return {body,height:endY+65};
}
function renderActionDiagram(actions,key='own-sequence'){
 const marker=key+'-arrow';
 const arrow=path=>`<path d="${path}" fill="none" stroke="#43546b" stroke-width="3" marker-end="url(#${marker})"/>`;
 const diagram=actionSequenceBody(actions,arrow);
 return `<svg class="lesson-diagram action-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 ${diagram.height}" role="img" aria-label="Ablaufplan mit Start, ${actions.length} Aktionen und Ende"><defs><marker id="${marker}" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="9" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#43546b"/></marker></defs><g font-family="Trebuchet MS,Arial,sans-serif" font-weight="600">${diagram.body}</g></svg>`;
}
function branchDiagramBody(question,yes,no,next,arrow){
 const wrap=text=>{const words=String(text).match(/\S{1,20}/g)||[];const lines=[''];for(const word of words){const i=lines.length-1;if((lines[i]+' '+word).trim().length>20&&lines[i])lines.push(word);else lines[i]=(lines[i]+' '+word).trim()}return lines};
 const diamond='<polygon data-flow-node="decision" points="260,95 365,165 260,235 155,165" fill="#eeeafa" stroke="#7f639f" stroke-width="2"/>';
 let body=figureOval(185,8,150,'Start')+arrow('M260 58V91')+diamond+figureText(260,159,wrap(question),19)+arrow('M155 165H110V280')+arrow('M365 165H410V280')+figureText(110,145,'Ja',20)+figureText(410,145,'Nein',20)+figurePanel(10,285,200,85,wrap(yes),'#eaf5f1',18)+figurePanel(310,285,200,85,wrap(no),'#eaf5f1',18)+'<path d="M110 370V405H410V370" fill="none" stroke="#43546b" stroke-width="3"/>';
 if(next)body+=arrow('M260 405V435')+figurePanel(130,440,260,65,next)+arrow('M260 505V540')+figureOval(185,545,150,'Ende');
 else body+=arrow('M260 405V440')+figureOval(185,445,150,'Ende');
 return {body,height:next?610:510};
}
function trafficLoopBody(question,yes,no,arrow){
 const wrap=text=>{const words=String(text).match(/\S{1,18}/g)||[];const lines=[''];for(const w of words){const i=lines.length-1;if((lines[i]+' '+w).trim().length>18&&lines[i])lines.push(w);else lines[i]=(lines[i]+' '+w).trim()}return lines};
 const body=figureOval(85,8,150,'Start')+arrow('M160 58V100')+'<polygon data-flow-node="decision" points="160,105 260,175 160,245 60,175" fill="#eeeafa" stroke="#7f639f" stroke-width="2"/>'+figureText(160,167,wrap(question),18)+arrow('M260 175H340')+figureText(300,155,'Nein',20)+figurePanel(345,140,165,85,wrap(no),'#eaf5f1',18)+arrow('M427 140V80H160V100').replace('<path ','<path data-flow-edge="retry" ')+arrow('M160 245V295')+figureText(192,275,'Ja',20)+figurePanel(55,300,210,85,wrap(yes),'#eaf5f1',18)+arrow('M160 385V430')+figureOval(85,435,150,'Ende');
 return {body,height:505};
}
function renderBranchDiagram(question,yes,no,key='own-branch',retryNo=false){
 const arrow=path=>`<path d="${path}" fill="none" stroke="#43546b" stroke-width="3" marker-end="url(#${key}-arrow)"/>`;
 const diagram=retryNo?trafficLoopBody(question,yes,no,arrow):branchDiagramBody(question,yes,no,null,arrow);
 return `<svg class="lesson-diagram action-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 ${diagram.height}" role="img" aria-label="Eigener Ablaufplan mit Ja- und Nein-Verzweigung"><defs><marker id="${key}-arrow" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="9" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#43546b"/></marker></defs><g font-family="Trebuchet MS,Arial,sans-serif" font-weight="600">${diagram.body}</g></svg>`;
}
function renderFigure(taskId,slide){
 const spec=lessonFigures[taskId]?.[slide.title];
 if(!spec)return '';
 const pageKey=slide.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const key=`${taskId}-${pageKey}`;
 const arrow=(path,color='#43546b')=>`<path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" marker-end="url(#${key}-arrow)"/>`;
 const diamond=(x,y)=>`<polygon points="${x},${y-60} ${x+100},${y} ${x},${y+60} ${x-100},${y}" fill="#f0eaff" stroke="#7f639f" stroke-width="2"/>`;
 let body='',height=330;
 switch(spec.kind){
  case 'sequence':
   height=spec.steps.length*100+20;
   body=spec.steps.map((label,i)=>{
    const y=10+i*100;
    return figurePanel(115,y,350,72,spec.icons?['','']:label)+`<circle cx="65" cy="${y+36}" r="23" fill="#e9e5fa"/>`+figureText(65,y+43,i+1)+(spec.icons?figureIcon(spec.icons[i],163,y+36,.6)+figureText(310,y+31-(label.length-1)*5,label):'')+(i<spec.steps.length-1?arrow(`M290 ${y+72}V${y+98}`):'');
   }).join('');
   break;
  case 'pancakes': {
   height=520;
   const steps=[['2 Eier aufschlagen','in die Schüssel geben'],['200 ml Milch','Prise Salz und Zucker'],['200 g Mehl und','60 ml Mineralwasser'],['Alles zu einem','Teig vermengen'],['Öl erhitzen, Teig','zugeben und verteilen'],['Nach 1–2 Min. wenden','beidseitig ausbacken']];
   body=steps.map((lines,i)=>{const x=10+(i%2)*260,y=10+Math.floor(i/2)*170;return figurePanel(x,y,240,140,lines,i<4?'#fff1d6':'#eaf5f1',17)+figureText(x+20,y+25,i+1,18,'start')}).join('');break;
  }
  case 'handwash': {
   const picture=LEARNING_IMAGES.handwash;
   height=450*picture.height/picture.width;
   body=`<image data-learning-image="handwash" href="${picture.src}" x="65" y="0" width="450" height="${height}" preserveAspectRatio="xMidYMid meet"/>`+Array.from({length:5},(_,i)=>figureText(30,height*(i+.5)/5+7,String.fromCharCode(65+i),22)).join('');
   break;
  }
  case 'program':
   height=400;
   body=figurePanel(90,10,340,65,'Algorithmus')+arrow('M260 75V107')+figurePanel(90,112,340,65,'Programmiersprache')+arrow('M260 177V209')+figurePanel(90,214,340,65,'Programm')+figureText(260,335,'Eingabe → Verarbeitung → Ausgabe',21);break;
  case 'everyday':
   body=[['recipe','Rezept'],['blocks','Bauanleitung'],['brush','Zähneputzen']].map(([icon,label],i)=>`<rect x="${15+i*170}" y="35" width="150" height="190" rx="20" fill="${['#fff1d6','#eaf5f1','#eeeafa'][i]}"/>`+figureIcon(icon,90+i*170,109)+figureText(90+i*170,194,label,17)).join('')+figureText(260,285,'Schritte → Ziel',24);
   break;
  case 'comparison':
   height=300;
   body=figurePanel(10,20,240,240,spec.left,'#fff0e8',20)+figurePanel(270,20,240,240,spec.right,'#eaf5f1',20);
   break;
  case 'clarity':
   body=figureIcon('question',115,75)+figureText(115,150,['„Mach etwas','Leckeres.“'],20)+figureIcon('recipe',390,75)+figureText(390,150,['„Lege zwei Scheiben','Brot auf einen Teller.“'],18)+arrow('M222 90H280')+figureText(260,258,'Ungenau → eindeutig',23);
   break;
  case 'feasibility':
   height=330;
   body=figureText(125,35,'Mit Schale?',22)+figureText(390,35,'Erst aufschlagen',22)+'<ellipse cx="125" cy="102" rx="28" ry="39" fill="#fff0cf" stroke="#8b6a31" stroke-width="2"/><path d="M60 175Q125 265 190 175ZM325 175Q390 265 455 175Z" fill="#eaf0fa" stroke="#63758a" stroke-width="3"/><path d="M345 85L364 62L374 83L394 67L383 113ZM400 67L414 86L437 82L420 112L395 110Z" fill="#fff0cf" stroke="#8b6a31" stroke-width="2"/><path d="M390 115V160" stroke="#d7ab45" stroke-width="4"/><circle cx="390" cy="175" r="15" fill="#f2cb58"/><path d="M94 142L154 202M154 142L94 202" stroke="#a44e4e" stroke-width="4"/>'+figureText(125,295,['Nicht mit Schale','in den Teig'],19)+figureText(390,295,['Sinnvolle Anweisung:','Ei aufschlagen'],19);
   break;
  case 'finite':
   height=260;
   body=`<path d="M65 120H450" stroke="#92a3b9" stroke-width="5"/>`+[['Start',65],['Schritte',260],['Ende',450]].map(([label,x],i)=>`<circle cx="${x}" cy="120" r="${i===1?17:26}" fill="${i===2?'#d7eddf':'#e9e5fa'}"/>`+figureText(x,190,label,22)).join('')+figureIcon('flag',450,53,.65)+figureText(260,45,'Ein erreichbarer Endpunkt',23);
   break;
  case 'checklist':
   height=320;
   body=spec.items.map((label,i)=>`<rect x="85" y="${15+i*74}" width="350" height="58" rx="12" fill="${i%2?'#eaf5f1':'#f1edfc'}"/>`+figureIcon('check',119,44+i*74,.45)+figureText(155,51+i*74,label,20,'start')).join('');
   break;
  case 'shoes':
   height=260;
   body=figureIcon('sock',130,100,1.2)+figureIcon('shoe',390,100,1.2)+arrow('M210 105H300')+figureText(130,195,'1. Socke anziehen',20)+figureText(390,195,'2. Schuh anziehen',20);
   break;
  case 'planning':
   height=300;
   body=figureIcon('pencil',88,80)+figurePanel(160,20,330,75,['Aufgabe in Schritte','zerlegen'])+arrow('M325 95V137')+figurePanel(160,140,330,75,['Anweisungen klar','formulieren'])+arrow('M325 215V257')+figureText(325,282,'Reihenfolge prüfen',22);
   break;
  case 'milestones':
  case 'principles':
  case 'ready': {
   const labels=spec.kind==='milestones'?['Definition','Eigenschaften','Reihenfolge']:spec.kind==='principles'?['Eindeutig','Ausführbar','Endlich']:['Begriffe wiederholen','Schritte zuordnen','Anwendung üben'];
   height=300;
   body=labels.map((label,i)=>figureIcon(spec.kind==='ready'?'pencil':'check',72,55+i*88,.6)+figurePanel(125,20+i*88,350,70,label,['#fff1d6','#eaf5f1','#eeeafa'][i])).join('');
   break;
  }
  case 'flowSequence': {
   const diagram=actionSequenceBody(sourceTeethSteps,arrow);
   height=diagram.height;body=diagram.body;
   break;
  }
  case 'terminals':
   height=260;
   body=figureOval(30,90,190,'Start')+figureOval(300,90,190,'Ende')+figureText(260,220,'Anfang und Abschluss',23);
   break;
  case 'action':
   height=270;
   body=figureIcon('brush',95,105)+figurePanel(185,65,305,80,['Zahnbürste nehmen'])+figureText(260,220,'Eine Aktion im Rechteck',23);
   break;
  case 'arrows':
   height=430;
   body=figureOval(20,15,140,'Start')+arrow('M90 65V126')+figurePanel(20,130,230,70,'Aktion 1')+arrow('M250 165H380V266')+figurePanel(265,270,230,70,'Aktion 2')+arrow('M380 340V366')+figureOval(310,370,140,'Ende')+figureText(370,95,['Die Pfeilspitze','zeigt die Richtung.'],19);
   break;
  case 'diamond':
   height=300;
   body=diamond(260,105)+figureText(260,112,'Regnet es?',20)+arrow('M160 105H70V208')+arrow('M360 105H450V208')+figureText(102,88,'Ja',20)+figureText(415,88,'Nein',20)+figurePanel(10,215,180,55,'Ja-Weg')+figurePanel(330,215,180,55,'Nein-Weg');
   break;
  case 'decision': {
   const diagram=branchDiagramBody('Regnet es?','Regenschirm mitnehmen','Sonnenbrille mitnehmen','Zur Schule gehen',arrow);
   body=diagram.body;height=diagram.height;break;
  }
  case 'loop':
   height=505;
   body=figureOval(85,8,150,'Start')+arrow('M160 58V103')+diamond(160,165)+figureText(160,158,['Aufgaben','fertig?'],20)+arrow('M260 165H340')+figureText(300,145,'Nein',20)+figurePanel(345,130,165,70,['Eine Aufgabe','lösen'], '#eaf5f1',18)+arrow('M427 130V80H160V103')+arrow('M160 225V285')+figureText(192,260,'Ja',20)+figurePanel(70,290,180,70,['Spielen','gehen'])+arrow('M160 360V430')+figureOval(85,435,150,'Ende');
   break;
  case 'loopTypes':
   height=350;
   body=figureText(260,30,'Zählschleife',23)+figurePanel(60,55,400,75,['10-mal','Hampelmann machen'])+figureText(260,180,'Bedingungsschleife',23)+figurePanel(60,205,400,90,['Solange das Glas nicht voll ist:','weiter Wasser eingießen'], '#eeeafa',19);
   break;
  case 'search':
   height=300;
   body=figureText(260,35,'Gesucht: 5',25)+[7,3,9,1,5,8,2].map((n,i)=>`<g data-search-card="${n}" data-search-checked="${i<5}">${figurePanel(10+i*72,85,60,80,n,i===4?'#d7eddf':i<4?'#fff1d6':'#f1f3f7',28)}${figureText(40+i*72,205,i<5?i+1:'–',19)}</g>`).join('')+figureText(260,260,'Treffer auf Position 5',23);
   break;
  case 'bubble':
  case 'insertion': {
   height=660;
   const rows=spec.kind==='bubble'?[[5,2,4,1,3],[2,5,4,1,3],[2,4,5,1,3],[2,4,1,5,3],[2,4,1,3,5]]:[[5,2,4,1,3],[2,5,4,1,3],[2,4,5,1,3],[1,2,4,5,3],[1,2,3,4,5]];
   body=rows.map((row,r)=>{
    const y=35+r*125;
    const active=spec.kind==='bubble'?(r?[r-1,r]:[]):r?[row.indexOf([0,2,4,1,3][r])]:[];
    const cards=row.map((n,c)=>figurePanel(25+c*100,y,78,66,n,active.includes(c)?(spec.kind==='bubble'?'#dceaff':'#d7eddf'):'#f4f5f8',28)).join('');
    const label=spec.kind==='bubble'?['Start: fünf Karten','5 > 2: tauschen','5 > 4: tauschen','5 > 1: tauschen','5 > 3: tauschen'][r]:['Start: erste Karte schon sortiert','2 vor 5 einfügen','4 zwischen 2 und 5 einfügen','1 ganz nach vorne einfügen','3 einfügen: fertig sortiert'][r];
    return figureText(260,y-12,label,19)+`<g data-sort-row="${r}">${cards}</g>`;
   }).join('');
   break;
  }
  case 'toolbox':
  case 'symbolSummary':
   height=390;
   body=figureOval(25,20,180,'Start / Ende')+figureText(115,110,'Oval',20)+figurePanel(290,20,200,60,'Aktion')+figureText(390,110,'Rechteck',20)+diamond(125,235)+figureText(125,242,'Frage?',20)+figureText(125,340,'Raute',20)+arrow('M300 235H475')+figureText(390,285,['Pfeil: Richtung','des Ablaufs'],20);
   break;
  case 'readPath':
   height=340;
   body=figureOval(15,15,150,'Start')+arrow('M90 65V130')+figurePanel(15,135,150,60,'Aktion')+arrow('M165 165H290')+figurePanel(295,135,200,60,'Nächster Schritt')+arrow('M395 195V259')+figureOval(320,264,150,'Ende')+figureText(300,65,['1. Beginnen','2. Pfeilen folgen'],21)+figureText(105,285,'3. Ankommen',21);
   break;
  case 'flowTypes':
   height=375;
   body=figureText(20,45,'Sequenz',21,'start')+arrow('M235 40H475')+figureText(20,150,'Verzweigung',21,'start')+`<path d="M300 110L340 145L300 180L260 145Z" fill="#eeeafa" stroke="#7565a5" stroke-width="2"/>`+arrow('M340 145H475')+arrow('M300 180V215H475')+figureText(20,310,'Schleife',21,'start')+figurePanel(260,260,160,65,'Schritt')+arrow('M420 292H485V350H235V292H258');
   break;
  case 'sortSummary':
   height=380;
   body=figureIcon('search',65,70,.6)+figureText(145,45,'Lineare Suche',23,'start')+figureText(145,85,'7 → 3 → 9 gefunden',21,'start')+figureText(145,175,'Bubble Sort',23,'start')+figureText(145,215,'Nachbarn vergleichen ⇄',20,'start')+figureText(145,305,'Insertion Sort',23,'start')+figureText(145,345,'In sortierten Teil einfügen',20,'start')+figureIcon('blocks',65,205,.6)+figureIcon('pencil',65,330,.6);
   break;
  case 'overview':
   height=310;
   body=figureIcon('recipe',85,110)+arrow('M150 110H228')+figurePanel(260,10,230,62,'Start','#fff1d6')+arrow('M375 72V108')+figurePanel(260,112,230,62,'Anweisung')+arrow('M375 174V210')+figurePanel(260,214,230,62,'Ende','#fff1d6')+figureText(85,210,['Anleitung'],20);
   break;
  case 'skills':
   height=340;
   body=[['Ablaufplan','lesen'],['Entscheidungen','verstehen'],['Schleifen','erkennen'],['Suchen und','Sortieren']].map((label,i)=>figurePanel(20+(i%2)*260,20+Math.floor(i/2)*155,240,125,label,['#fff1d6','#eeeafa','#eaf5f1','#eaf0fa'][i])).join('');
   break;
 }
 if(!body)return '';
 return `<figure class="lesson-figure" data-figure-kind="${spec.kind}"><svg class="lesson-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 ${height}" role="img" aria-labelledby="${key}-title ${key}-desc" data-figure-id="${key}"><title id="${key}-title">${figureEscape(slide.title)}</title><desc id="${key}-desc">${figureEscape(spec.caption)}</desc><defs><marker id="${key}-arrow" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="9" refY="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#43546b"/></marker></defs><g font-family="Trebuchet MS,Arial,sans-serif" font-weight="600">${body}</g></svg><figcaption>${figureEscape(spec.caption)}</figcaption></figure>`;
}
