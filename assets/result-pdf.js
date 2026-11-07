'use strict';

// Abgabe-Schnappschuss: spätere Änderungen an Formularen verändern ihn nicht.
let testResultSnapshot=null;
function clearTestResult(){
 testResultSnapshot=null;
 document.getElementById('downloadTestPdf').hidden=true;
 document.getElementById('pdfDownloadStatus').textContent='';
}
function captureTestResult(name,answers,score){
 const date=new Date();
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
 const get=type=>parts.find(p=>p.type===type).value;
 testResultSnapshot=JSON.parse(JSON.stringify({
  name,topic:current.topic,subject:current.subject,isDemo:!!current.isDemo,grade:current.isDemo?null:selectedGrade||current.grades[0],
  date:`${get('day')}.${get('month')}.${get('year')}`,fileDate:`${get('year')}-${get('month')}-${get('day')}`,
  score,maximum:answers.length,mark:current.isDemo?null:grade(score),
  answers:answers.map((answer,i)=>({...answer,code:current.questions[i]?.code||'',
   figure:current.topic==='Algorithmen'&&current.questions[i]?.figure?namespaceAlgoFigure(algoFigure(current.questions[i].figure),'pdf-'+i):''}))
 }));
 document.getElementById('pdfNotice').innerHTML=current.isDemo?'<strong>Probiere den Download aus:</strong> Speichere deine PDF und öffne sie zur Kontrolle.':'<strong>Ergebnis abgeben:</strong> Lade dein Testergebnis als PDF herunter, speichere die Datei und gib sie bei deiner Lehrkraft ab.';
 document.getElementById('downloadTestPdf').hidden=false;
 document.getElementById('pdfDownloadStatus').textContent='';
}
function resultPdfFilename(result){
 const safe=value=>String(value).normalize('NFKC').replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g,'').trim().replace(/\s+/g,'_').replace(/^[.]+|[.]+$/g,'').slice(0,80)||'Ergebnis';
 return `${safe(result.topic)}_${safe(result.name)}_${result.fileDate}.pdf`;
}
async function resultDiagramPng(html){
 const container=document.createElement('div');container.innerHTML=html;
 const svg=container.querySelector('svg');if(!svg)return null;
 svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 const box=svg.viewBox.baseVal;
 const width=box.width,height=box.height;
 const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
 try{
  const img=new Image();img.src=url;await img.decode();
  const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=Math.round(1200*height/width);
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
  return {data:canvas.toDataURL('image/png'),ratio:width/height};
 }finally{URL.revokeObjectURL(url)}
}
async function buildTestResultPdf(result){
 const pdf=new jspdf.jsPDF({unit:'mm',format:'a4',compress:true,putOnlyUsedFonts:true});
 for(const style of ['normal','bold']){
  const file=`DejaVuSans-${style}.ttf`;pdf.addFileToVFS(file,RESULT_PDF_FONTS[style]);pdf.addFont(file,'DejaVu',style);
 }
 pdf.setProperties({title:`Testergebnis – ${result.topic}`,subject:result.isDemo?'Übungstest':`${result.subject} · Klasse ${result.grade}`,author:'Frau Salliers Lernwelt'});
 const left=18,width=174,bottom=275;let y=34;
 function header(){
  pdf.setFont('DejaVu','bold');pdf.setFontSize(10);pdf.setTextColor(68,63,133);
  pdf.text('Frau Salliers Lernwelt · Testergebnis',left,12);
  pdf.setFont('DejaVu','normal');pdf.setFontSize(8);pdf.setTextColor(60,65,80);
  const label=`${result.topic} · ${result.name} · ${result.date}`;
  pdf.text(pdf.splitTextToSize(label,width).slice(0,2),left,18);
  pdf.setDrawColor(182,183,210);pdf.line(left,27,192,27);y=34;
 }
 function ensure(height){if(y+height>bottom){pdf.addPage();header()}}
 function write(text,{size=10,bold=false,color=[30,40,60],gap=3}={}){
  pdf.setFont('DejaVu',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(...color);
  const lines=pdf.splitTextToSize(String(text),width),lineHeight=size*.48;
  for(const line of lines){ensure(lineHeight);pdf.setFont('DejaVu',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(...color);pdf.text(line,left,y);y+=lineHeight}
  y+=gap;
 }
 // Seite 1 bleibt ausschließlich das persönliche Ergebnisblatt.
 pdf.setDrawColor(83,73,150);pdf.setLineWidth(.8);pdf.roundedRect(12,12,186,270,4,4);
 pdf.setDrawColor(193,163,88);pdf.setLineWidth(.4);pdf.roundedRect(16,16,178,262,3,3);
 function centered(text,y,size=12,bold=false){
  pdf.setFont('DejaVu',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(35,43,65);
  const lines=pdf.splitTextToSize(String(text),145);pdf.text(lines,105,y,{align:'center'});
 }
 centered('Frau Salliers Lernwelt',37,13,true);
 pdf.setDrawColor(193,163,88);pdf.setFillColor(253,246,225);pdf.circle(105,58,10,'FD');
 centered('★',61,18,true);
 centered('URKUNDE',87,30,true);
 centered(result.isDemo?'Du hast den Übungstest ausprobiert!':'Du hast den Test abgeschlossen.',101,11);
 centered(result.name,120,result.name.length>45?14:19,true);
 centered(`Thema: ${result.topic}`,150,15,true);
 centered(result.isDemo?'Eingabe · Auswertung · PDF-Download':`${result.subject} · Klasse ${result.grade}`,166,11);
 centered(`Datum: ${result.date}`,179,11);
 pdf.setFillColor(240,238,251);pdf.roundedRect(30,191,150,42,4,4,'F');
 centered(result.isDemo?`${result.score} von ${result.maximum} richtig`:`${result.score} / ${result.maximum} Punkte`,207,19,true);
 centered(result.isDemo?'Zum Ausprobieren und Üben':`Note ${result.mark}`,224,15,true);
 centered('Deine Antworten und Korrekturen findest du ab Seite 2.',249,10);
 pdf.addPage();header();
 write('Auswertung der Aufgaben',{size:13,bold:true,gap:5});
 for(let i=0;i<result.answers.length;i++){
  const answer=result.answers[i];ensure(25);
  write(`${i+1}. ${answer.q}`,{bold:true});
  if(answer.code)write(answer.code,{size:9});
  if(answer.figure){
   const image=await resultDiagramPng(answer.figure);
   if(image){const h=Math.min(95,width/image.ratio),w=h*image.ratio;ensure(h+6);pdf.addImage(image.data,'PNG',left+(width-w)/2,y,w,h);y+=h+6}
  }
  write(`Deine Antwort: ${answer.given||'Nicht beantwortet.'}`);
  write(answer.correct?'Richtig':'Nicht richtig',{bold:true,color:answer.correct?[35,100,65]:[150,45,40]});
  if(!answer.correct)write(`Korrektur: ${answer.a}`);
  y+=3;
 }
 const pages=pdf.getNumberOfPages();
 for(let page=1;page<=pages;page++){
  pdf.setPage(page);pdf.setFont('DejaVu','normal');pdf.setFontSize(8);pdf.setTextColor(80,85,100);
  pdf.text(`Seite ${page} / ${pages}`,192,286,{align:'right'});
 }
 return pdf.output('blob');
}
async function downloadTestResultPdf(){
 if(!testResultSnapshot)return;
 const result=testResultSnapshot,button=document.getElementById('downloadTestPdf'),status=document.getElementById('pdfDownloadStatus');
 button.disabled=true;button.textContent='PDF wird erstellt …';status.textContent='';
 try{
  const blob=await buildTestResultPdf(result),url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=resultPdfFilename(result);document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
  if(testResultSnapshot===result)status.textContent=result.isDemo?'PDF heruntergeladen. Öffne die Datei zur Kontrolle.':'PDF heruntergeladen. Speichere sie und gib sie bei deiner Lehrkraft ab.';
 }catch(error){
  if(testResultSnapshot===result)status.textContent='Die PDF konnte nicht erstellt werden. Bitte versuche den Download erneut.';
 }finally{button.disabled=false;button.textContent='Testergebnis als PDF herunterladen'}
}
document.getElementById('downloadTestPdf').addEventListener('click',downloadTestResultPdf);
