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
  name,topic:current.topic,subject:current.subject,grade:selectedGrade||current.grades[0],
  date:`${get('day')}.${get('month')}.${get('year')}`,fileDate:`${get('year')}-${get('month')}-${get('day')}`,
  score,maximum:answers.length,mark:grade(score),
  answers:answers.map((answer,i)=>({...answer,code:current.questions[i]?.code||'',
   figure:current.topic==='Algorithmen'&&current.questions[i]?.figure?namespaceAlgoFigure(algoFigure(current.questions[i].figure),'pdf-'+i):''}))
 }));
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
 pdf.setProperties({title:`Testergebnis – ${result.topic}`,subject:`${result.subject} · Klasse ${result.grade}`,author:'Frau Salliers Lernwelt'});
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
 header();
 write(`Thema: ${result.topic}`,{size:17,bold:true});
 write(`Name: ${result.name}`);write(`Fach: ${result.subject} · Klasse: ${result.grade} · Datum: ${result.date}`);
 write(`${result.score} / ${result.maximum} Punkte · Note ${result.mark}`,{size:15,bold:true,color:[68,63,133],gap:5});
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
  if(testResultSnapshot===result)status.textContent='PDF heruntergeladen. Speichere sie und gib sie bei deiner Lehrkraft ab.';
 }catch(error){
  if(testResultSnapshot===result)status.textContent='Die PDF konnte nicht erstellt werden. Bitte versuche den Download erneut.';
 }finally{button.disabled=false;button.textContent='Testergebnis als PDF herunterladen'}
}
document.getElementById('downloadTestPdf').addEventListener('click',downloadTestResultPdf);
