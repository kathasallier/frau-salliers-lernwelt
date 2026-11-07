'use strict';
function renderBinaryFigure(spec,scope='binary'){
 const e=figureEscape;
 const text=(x,y,value,size=22)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}">${e(value)}</text>`;
 const bulb=(x,y,on)=>`${on?`<circle cx="${x}" cy="${y}" r="31" fill="#fff1cc"/>`:''}<path d="M${x-12} ${y+22}C${x-12} ${y+10} ${x-25} ${y+5} ${x-23} ${y-10}A23 23 0 0 1 ${x+23} ${y-10}C${x+25} ${y+5} ${x+12} ${y+10} ${x+12} ${y+22}Z" fill="${on?'#ffd16d':'#e4ebf0'}" stroke="#244d72" stroke-width="2"/><path d="M${x-8} ${y+22}V${y+3}L${x-3} ${y-3}L${x+3} ${y+3}L${x+8} ${y-3}V${y+22}" fill="none" stroke="#7e6635" stroke-width="2"/><rect x="${x-12}" y="${y+23}" width="24" height="15" rx="3" fill="#b5c5d3" stroke="#244d72"/><path d="M${x-11} ${y+28}H${x+11}M${x-11} ${y+33}H${x+11}" stroke="#244d72"/>`;
 let body='',height=250,title='',desc='';
 const bits=spec.bits||'',weights=[...bits].map((_,i)=>2**(bits.length-i-1));
 const sum=[...bits].reduce((n,b,i)=>n+(b==='1'?weights[i]:0),0);
 if(spec.binaryKind==='states'){
  height=230;title='Zwei Zustände: aus und an';desc='Eine dunkle Lampe entspricht 0, eine leuchtende Lampe entspricht 1.';
  body=[false,true].map((on,i)=>`<rect x="${55+i*300}" y="25" width="230" height="180" rx="16" fill="#f2f7fc" stroke="#c4d9ec"/>`+bulb(170+i*300,85,on)+text(170+i*300,178,on?'1 = an':'0 = aus',26)).join('');
 }else if(spec.binaryKind==='decimal'){
  height=205;title='Dezimale Stellenwerttafel';desc=`Die Zahl ${spec.value} in Tausendern, Hundertern, Zehnern und Einern.`;
  const digits=String(spec.value).padStart(4,'0');
  body=['Tausender','Hunderter','Zehner','Einer'].map((label,i)=>`<rect x="${40+i*140}" y="30" width="140" height="75" fill="#dfeefa" stroke="#7194b5"/><rect x="${40+i*140}" y="105" width="140" height="60" fill="#fff" stroke="#7194b5"/>`+text(110+i*140,61,[1000,100,10,1][i],23)+text(110+i*140,89,label,17)+text(110+i*140,146,digits[i],28)).join('');
 }else if(spec.binaryKind==='lamps'||spec.binaryKind==='table'){
  const lamps=spec.binaryKind==='lamps';title=lamps?'Binäre Lampenreihe':'Binäre Stellenwerttafel';
  desc=weights.map((w,i)=>`${w}: ${bits[i]==='1'?'an (1)':'aus (0)'}`).join('; ');
  const cell=Math.min(74,580/bits.length),left=(640-cell*bits.length)/2;
  body=[...bits].map((b,i)=>{
   const x=left+i*cell,c=x+cell/2;
   if(lamps)return text(c,35,weights[i],22)+bulb(c,87,b==='1')+text(c,151,b==='1'?'an':'aus',16)+(spec.showBits?text(c,184,b,24):'');
   return `<rect x="${x}" y="35" width="${cell}" height="58" fill="#dfeefa" stroke="#7194b5"/><rect x="${x}" y="93" width="${cell}" height="65" fill="${b==='1'?'#fff0d8':'#fff'}" stroke="#7194b5"/>`+text(c,72,weights[i],22)+text(c,136,b,26);
  }).join('');
  if(spec.showSum)body+=text(320,225,weights.filter((_,i)=>bits[i]==='1').join(' + ')+' = '+sum,21);
  else height=lamps?205:185;
 }else if(spec.binaryKind==='counting'){
  title='Binäre Zähltafel';height=400;desc='Die Dezimalzahlen 1 bis 5 mit den Stellenwerten 8, 4, 2 und 1.';const count=spec.columns||4,cw=560/(count+1);const values=Array.from({length:count},(_,i)=>2**(count-i-1));
  body=['Zahl',...values].map((v,i)=>`<rect x="${40+i*cw}" y="25" width="${cw}" height="50" fill="#dfeefa" stroke="#7194b5"/>`+text(40+cw/2+i*cw,58,v,21)).join('');
  for(let n=1;n<=5;n++)body+=[n,...n.toString(2).padStart(count,'0')].map((v,i)=>`<rect x="${40+i*cw}" y="${75+(n-1)*50}" width="${cw}" height="50" fill="#fff" stroke="#7194b5"/>`+text(40+cw/2+i*cw,108+(n-1)*50,v,23)).join('');
  body+=text(320,370,'Ergänze die Zähltafel bis zur Zahl 15.',20);
 }else if(spec.binaryKind==='decomposition'){
  const weights=[64,32,16,8,4,2,1],shown=Math.min(7,spec.visibleSteps||0);let rest=spec.value;const digits=[];
  height=495;title='Dezimalzahl schrittweise zerlegen';desc=`Zerlege ${spec.value} in Stellenwerte. ${shown} von sieben Schritten sind aufgedeckt.`;
  body=['Stellenwert','Prüfung','Ziffer','Rest'].map((v,i)=>`<rect x="${20+i*150}" y="20" width="150" height="45" fill="#dfeefa" stroke="#7194b5"/>`+text(95+i*150,50,v,20)).join('');
  weights.forEach((w,j)=>{const before=rest,used=rest>=w;if(used)rest-=w;digits.push(used?'1':'0');const vals=[w,j<shown?`${before} ${used?'≥':'<'} ${w}`:'?',j<shown?digits[j]:'?',j<shown?rest:'?'];body+=vals.map((v,i)=>`<rect x="${20+i*150}" y="${65+j*48}" width="150" height="48" fill="${j<shown?'#fff':'#f2f5f8'}" stroke="#7194b5"/>`+text(95+i*150,96+j*48,v,21)).join('')});
  body+=text(320,450,shown===7?`${spec.value}₁₀ = ${digits.join('')}₂`:`${shown} von 7 Rechenschritten`,24);
 }else if(spec.binaryKind==='division'){
  title='Division durch 2 mit Rest';const rows=[];let n=spec.value;
  do{rows.push([n,Math.floor(n/2),n%2]);n=Math.floor(n/2)}while(n>0);
  height=110+rows.length*46;desc=`Umrechnung von ${spec.value}: ${rows.map(r=>`${r[0]} geteilt durch 2 ist ${r[1]}, Rest ${r[2]}`).join('; ')}. Die Reste werden von unten nach oben gelesen.`;
  body=['Rechnung','Quotient','Rest'].map((v,i)=>`<rect x="${40+i*170}" y="28" width="170" height="45" fill="#dfeefa" stroke="#7194b5"/>`+text(125+i*170,58,v,21)).join('');
  body+=rows.map((row,j)=>[row[0]+' : 2',row[1],row[2]].map((v,i)=>`<rect x="${40+i*170}" y="${73+j*46}" width="170" height="46" fill="${i===2?'#fff0d8':'#fff'}" stroke="#7194b5"/>`+text(125+i*170,104+j*46,v,22)).join('')).join('');
  body+=`<path d="M590 ${97+(rows.length-1)*46}V95" stroke="#be641b" stroke-width="4" marker-end="url(#${e(scope)}-arrow)"/>`+text(320,height-12,'Reste von unten nach oben lesen',20);
 }else throw new Error('Unbekannte Binärabbildung');
 return `<figure class="lesson-figure binary-figure" data-binary-kind="${e(spec.binaryKind)}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 ${height}" role="img" aria-labelledby="${e(scope)}-title ${e(scope)}-desc"><title id="${e(scope)}-title">${e(title)}</title><desc id="${e(scope)}-desc">${e(desc)}</desc><defs><marker id="${e(scope)}-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#be641b"/></marker></defs><g fill="#163b63" font-family="Trebuchet MS,Arial,sans-serif" font-weight="600">${body}</g></svg><figcaption>${lampsCaption(spec)}</figcaption>${spec.binaryKind==='decomposition'?`<button class="binary-reveal-step no-print secondary" type="button" ${(spec.visibleSteps||0)>=7?'disabled':''}>${(spec.visibleSteps||0)>=7?'Alle Schritte gezeigt':'Nächsten Rechenschritt zeigen'}</button>`:''}</figure>`;
}
function lampsCaption(spec){
 if(spec.binaryKind==='decimal')return 'Im Dezimalsystem ist jeder Stellenwert nach links zehnmal so groß.';
 if(spec.binaryKind==='states')return 'Im Binärsystem bedeutet 0 aus und 1 an.';
 if(spec.binaryKind==='lamps')return 'Leuchtende Lampe = 1; dunkle Lampe = 0. Die Stellenwerte stehen über den Lampen.';
 if(spec.binaryKind==='division')return 'Teile bis zum Quotienten 0. Lies die Reste von unten nach oben.';
 if(spec.binaryKind==='counting')return 'Stellenwerte: 8, 4, 2 und 1. Ergänze die Zähltafel im Heft bis 15.';
 if(spec.binaryKind==='decomposition')return 'Passt der Stellenwert in den Rest? Dann 1 und abziehen, sonst 0. Decke jeweils einen Schritt auf.';
 return 'Addiere nur die Stellenwerte der Einsen. Nullstellen werden nicht mitgerechnet.';
}


function renderBinaryLampField(q,id){
 return `<div class="binary-lamp-input no-print" data-lamp-for="${id}" data-hide-sum="${!!q.hideSum}"><div class="binary-lamp-buttons">${[128,64,32,16,8,4,2,1].map((w,i)=>`<button class="secondary" type="button" data-lamp-index="${i}" aria-pressed="false" aria-label="Stellenwert ${w} umschalten"><strong>${w}</strong><svg viewBox="0 0 50 65" aria-hidden="true"><path d="M15 42C15 32 5 29 6 18A19 19 0 0 1 44 18C45 29 35 32 35 42Z"/><rect x="15" y="44" width="20" height="13" rx="3"/></svg><span class="lamp-state">aus</span></button>`).join('')}</div><p class="lamp-readout" aria-live="polite">Binärzahl: 00000000${q.hideSum?'':' · Summe: 0'}</p></div><div class="binary-lamp-print" data-lamp-print="${id}">${renderBinaryFigure({binaryKind:'lamps',bits:'00000000'},'lamp-print-'+id)}</div><input type="hidden" id="${id}" value="">${algoPrintValue(id)}`;
}
function bindBinaryLampInputs(){
 document.querySelectorAll('[data-lamp-for]').forEach(panel=>{
  const buttons=[...panel.querySelectorAll('[data-lamp-index]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
   const on=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(on));button.querySelector('.lamp-state').textContent=on?'an':'aus';
   const bits=buttons.map(b=>b.getAttribute('aria-pressed')==='true'?'1':'0').join('');
   document.getElementById(panel.dataset.lampFor).value=bits;
   document.querySelector(`[data-lamp-print="${panel.dataset.lampFor}"]`).innerHTML=renderBinaryFigure({binaryKind:'lamps',bits},'lamp-print-'+panel.dataset.lampFor);
   panel.querySelector('.lamp-readout').textContent=`Binärzahl: ${bits}${panel.dataset.hideSum==='true'?'':' · Summe: '+parseInt(bits,2)}`;
  }));
 });
}

function renderBinaryMatrix(q,id){
 let index=0;
 const rows=q.matrix.rows.map(row=>`<tr><th scope="row">${figureEscape(row.label)}</th>${row.cells.map(cell=>{
  if(typeof cell==='string')return `<td>${figureEscape(cell)}</td>`;
  const field=id+'-part'+index++;return `<td>${algoField(cell,field,cell.label)}</td>`;
 }).join('')}</tr>`).join('');
 const extra=(q.parts||[]).slice(index).map((part,j)=>`<label for="${id}-part${index+j}">${figureEscape(part.label)}</label>${algoField(part,id+'-part'+(index+j),part.label)}`).join('');
 return `<div class="binary-answer-table"><table><thead><tr><th scope="col">Zeile</th>${q.matrix.headers.map(h=>`<th scope="col">${figureEscape(h)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>${extra}`;
}
