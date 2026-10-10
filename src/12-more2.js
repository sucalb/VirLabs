
/* ---------- KHTN 7: gương phẳng ---------- */
{const M={S:[.3,.35],E:[.78,.3],drag:null,W:1,H:1};const my=()=>M.H*.72;
const px=p=>[p[0]*M.W,p[1]*M.H];
function geo(){const S=px(M.S),E=px(M.E),y=my(),S2=[S[0],2*y-S[1]],t=(y-S2[1])/(E[1]-S2[1]),I=[S2[0]+(E[0]-S2[0])*t,y],ok=I[0]>M.W*.08&&I[0]<M.W*.92;
  const i=Math.atan2(Math.abs(I[0]-S[0]),y-S[1])*180/Math.PI,i2=Math.atan2(Math.abs(E[0]-I[0]),y-E[1])*180/Math.PI;return{S,E,y,S2,I,ok,i,i2}}
function up(){const g=geo();$('mrInfo').innerHTML=kv([['Góc tới i',fmt(g.i,1)+'°'],['Góc phản xạ i′',fmt(g.i2,1)+'°'],['Khoảng cách S → gương',fmt((g.y-g.S[1])/(M.W/20),1)+' cm'],['Khoảng cách ảnh S′ → gương',fmt((g.S2[1]-g.y)/(M.W/20),1)+' cm']]);
  const V=$('mrV');V.className='verdict'+(g.ok?' ok':' bad');V.textContent=g.ok?'Mắt nhìn thấy ảnh S′ của ngọn nến. Ảnh ảo, đối xứng với vật qua gương, lớn bằng vật.':'Tia phản xạ không tới được mắt: hãy kéo mắt hoặc nến để đường từ S′ tới mắt cắt mặt gương.';draw()}
const draw=canvasOf($('cMir'),(c,w,h)=>{M.W=w;M.H=h;const g=geo(),x0=w*.08,x1=w*.92;
  c.fillStyle=rgba('rain',.08);c.fillRect(0,g.y,w,h-g.y);c.fillStyle=css('muted');c.font=font(600,11);c.textAlign='left';c.textBaseline='top';c.fillText('Vùng sau gương: chỉ có ảnh ảo',x0,g.y+10);
  c.strokeStyle=css('ink');c.lineWidth=4;c.beginPath();c.moveTo(x0,g.y);c.lineTo(x1,g.y);c.stroke();c.lineWidth=1.2;for(let x=x0;x<x1;x+=10){c.beginPath();c.moveTo(x,g.y+2);c.lineTo(x-7,g.y+10);c.stroke()}
  c.fillStyle=css('ink');c.font=font(700,12);c.textAlign='right';c.textBaseline='bottom';c.fillText('Gương phẳng',x1,g.y-6);
  if($('mrFan').checked){c.strokeStyle=rgba('amber',.4);c.lineWidth=1.2;for(let k=0;k<7;k++){const ix=x0+(x1-x0)*(k+.5)/7,dx=ix-g.S[0],dy=g.y-g.S[1];c.beginPath();c.moveTo(...g.S);c.lineTo(ix,g.y);c.lineTo(ix+dx*3,g.y-dy*3);c.stroke();c.setLineDash([3,4]);c.beginPath();c.moveTo(ix,g.y);c.lineTo(...g.S2);c.stroke();c.setLineDash([])}}
  if(g.ok){c.setLineDash([5,5]);c.strokeStyle=css('muted');c.lineWidth=1.2;c.beginPath();c.moveTo(g.I[0],g.y-90);c.lineTo(g.I[0],g.y);c.stroke();c.strokeStyle=css('red');c.beginPath();c.moveTo(...g.I);c.lineTo(...g.S2);c.stroke();c.setLineDash([]);
    c.strokeStyle=c.fillStyle=css('amber');c.lineWidth=3;c.beginPath();c.moveTo(...g.S);c.lineTo(...g.I);c.lineTo(...g.E);c.stroke();arrowHead(c,(g.S[0]+g.I[0])/2,(g.S[1]+g.I[1])/2,Math.atan2(g.I[1]-g.S[1],g.I[0]-g.S[0]),10);arrowHead(c,(g.I[0]+g.E[0])/2,(g.I[1]+g.E[1])/2,Math.atan2(g.E[1]-g.I[1],g.E[0]-g.I[0]),10);
    const up_=-Math.PI/2,aS=Math.atan2(g.S[1]-g.y,g.S[0]-g.I[0]),aE=Math.atan2(g.E[1]-g.y,g.E[0]-g.I[0]);c.lineWidth=1.6;c.strokeStyle=css('accent');c.beginPath();c.arc(g.I[0],g.y,34,Math.min(aS,up_),Math.max(aS,up_));c.stroke();c.beginPath();c.arc(g.I[0],g.y,40,Math.min(aE,up_),Math.max(aE,up_));c.stroke();
    c.fillStyle=css('accent');c.font=font(700,13);c.textAlign='center';c.textBaseline='middle';c.fillText('i',g.I[0]+50*Math.cos((aS+up_)/2),g.y+50*Math.sin((aS+up_)/2));c.fillText('i′',g.I[0]+56*Math.cos((aE+up_)/2),g.y+56*Math.sin((aE+up_)/2));c.fillStyle=css('ink');c.fillText('I',g.I[0],g.y+14)}
  c.globalAlpha=.35;c.font=`34px ${EMOJI}`;c.textAlign='center';c.textBaseline='middle';c.save();c.translate(g.S2[0],g.S2[1]);c.scale(1,-1);c.fillText('🕯️',0,0);c.restore();c.globalAlpha=1;
  c.font=`34px ${EMOJI}`;c.fillText('🕯️',...g.S);c.fillText('👁️',...g.E);c.fillStyle=css('ink');c.font=font(700,14);c.fillText('S',g.S[0]+24,g.S[1]-14);c.fillStyle=css('red');c.fillText('S′ (ảnh ảo)',g.S2[0]+44,g.S2[1]+14)});
drag($('cMir'),(x,y,dx,dy,t)=>{const g=geo();if(t==='down'){M.drag=Math.hypot(x-g.S[0],y-g.S[1])<30?'S':Math.hypot(x-g.E[0],y-g.E[1])<30?'E':null;return}if(t==='up'){M.drag=null;return}
  if(M.drag){M[M.drag]=[Math.max(.05,Math.min(.95,x/M.W)),Math.max(.06,Math.min((g.y-20)/M.H,y/M.H))];up()}});
$('mrFan').addEventListener('change',draw);up()}

/* ---------- KHTN 7: âm thanh ---------- */
{const fOf=v=>10**(.7+3.8*v/100),vOf=f=>(Math.log10(f)-.7)/3.8*100;let ctx=null;
const ANI=[['🐘','Voi',14,12000],['🧑','Người',20,20000],['🐕','Chó',67,45000],['🐈','Mèo',45,64000],['🦇','Dơi',2000,110000]];
const cls=f=>f<20?'hạ âm':f>20000?'siêu âm':'âm nghe được';
function up(){const f=fOf(+$('snF').value),A=+$('snA').value;$('osnF').textContent=f>=1000?fmt(f/1000,2)+' kHz':fmt(f,0)+' Hz';$('osnA').textContent=A+' %';
  presetSync('#p-sound [data-sf]','sf',[...document.querySelectorAll('#p-sound [data-sf]')].map(b=>b.dataset.sf).find(x=>Math.abs(vOf(+x)-+$('snF').value)<.6)||'');
  $('snInfo').innerHTML=kv([['Tần số f',fmt(f,f<100?1:0)+' Hz'],['Chu kì T = 1/f',f>=1000?fmt(1000/f,3)+' ms':fmt(1000/f,1)+' ms'],['Loại âm',cls(f)],['Độ cao',f<20||f>20000?'—':f<250?'âm trầm':f<1000?'âm trung':'âm cao (bổng)'],['Độ to',A<30?'nhỏ':A<70?'vừa':'to']]);
  $('snV').textContent=f<20?'Hạ âm: tai người không nghe được, nhưng voi có thể nghe và dùng hạ âm để liên lạc.':f>20000?'Siêu âm: tai người không nghe được. Chó, mèo, dơi nghe được; dơi dùng siêu âm để định vị.':'Tần số càng lớn âm càng cao (bổng). Biên độ càng lớn âm càng to.';draw()}
const draw=canvasOf($('cSnd'),(c,w,h)=>{const f=fOf(+$('snF').value),A=+$('snA').value/100,gy=h*.08,gh=h*.4,ml=60,mr=16,win=f<60?.1:f<600?.02:f<6000?.005:.0005,X=t=>ml+t/win*(w-ml-mr),Y=v=>gy+gh/2-v*gh/2*.9;
  c.strokeStyle=css('grid');c.lineWidth=1;c.beginPath();c.moveTo(ml,Y(0));c.lineTo(w-mr,Y(0));c.stroke();c.fillStyle=css('muted');c.font=font(400,11,'f-mono');c.textAlign='right';c.textBaseline='middle';c.fillText('0',ml-6,Y(0));
  c.textAlign='left';c.textBaseline='top';c.fillText(`Dạng sóng trong ${win>=.01?fmt(win*1000,0):fmt(win*1000,1)} ms`,ml,gy+gh+4);
  c.strokeStyle=css('accent');c.lineWidth=2.2;c.beginPath();const N=Math.min(4000,Math.max(400,(w-ml)*2));for(let i=0;i<=N;i++){const t=win*i/N,y=A*Math.sin(2*Math.PI*f*t);i?c.lineTo(X(t),Y(y)):c.moveTo(X(t),Y(y))}c.stroke();
  c.font=`28px ${EMOJI}`;c.textAlign='center';c.textBaseline='middle';c.fillText('🔊',26,Y(0));
  const by=h*.6,bh=h-by-30,lx=ml+60,LX=fq=>lx+(Math.log10(fq)-Math.log10(5))/(Math.log10(150000)-Math.log10(5))*(w-lx-mr);
  c.fillStyle=rgba('rain',.12);c.fillRect(LX(5),by,LX(20)-LX(5),bh);c.fillStyle=rgba('green',.12);c.fillRect(LX(20),by,LX(20000)-LX(20),bh);c.fillStyle=rgba('red',.1);c.fillRect(LX(20000),by,LX(150000)-LX(20000),bh);
  c.fillStyle=css('ink');c.font=font(700,11);c.textAlign='center';c.textBaseline='bottom';c.fillText('Hạ âm',(LX(5)+LX(20))/2,by-3);c.fillText('Âm nghe được',(LX(20)+LX(20000))/2,by-3);c.fillText('Siêu âm',(LX(20000)+LX(150000))/2,by-3);
  const rh=bh/ANI.length;ANI.forEach(([e,n,a,b],i)=>{const y=by+i*rh+rh/2;c.font=`${Math.min(20,rh*.8)}px ${EMOJI}`;c.textAlign='right';c.textBaseline='middle';c.fillText(e,ml+22,y);c.fillStyle=css('ink');c.font=font(600,11);c.textAlign='left';c.fillText(n,ml+26,y);
    c.strokeStyle=css('accent');c.lineWidth=Math.max(4,rh*.35);c.lineCap='round';c.beginPath();c.moveTo(LX(a),y);c.lineTo(LX(Math.min(b,150000)),y);c.stroke()});
  c.fillStyle=css('muted');c.font=font(400,10,'f-mono');c.textAlign='center';c.textBaseline='top';[10,100,1000,10000,100000].forEach(q=>c.fillText(q>=1000?q/1000+' kHz':q+' Hz',LX(q),by+bh+4));
  c.strokeStyle=css('red');c.lineWidth=2.4;c.beginPath();c.moveTo(LX(f),by-2);c.lineTo(LX(f),by+bh+2);c.stroke();c.fillStyle=css('red');c.beginPath();c.arc(LX(f),by-2,4,0,7);c.fill()});
$('snPlay').onclick=()=>{const f=fOf(+$('snF').value);if(f<20||f>20000){$('snV').textContent='Âm này nằm ngoài vùng nghe được của tai người nên không phát ra loa.';return}
  try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.25*(+$('snA').value/100),t+.05);g.gain.linearRampToValueAtTime(0,t+1.2);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+1.25)}catch(e){$('snV').textContent='Trình duyệt này không cho phát âm thanh.'}};
document.querySelectorAll('#p-sound [data-sf]').forEach(b=>b.onclick=()=>{$('snF').value=vOf(+b.dataset.sf);up()});['snF','snA'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- KHTN 8: lực đẩy Archimedes ---------- */
{const MAT={sat:['sắt',7800,'#5c6672'],nhom:['nhôm',2700,'#b8c0c8'],nhua:['nhựa',950,'#4dabf7'],da:['nước đá',920,'#dbeefc'],go:['gỗ thông',600,'#c8955a']},LIQ={nuoc:['nước',1000,'rgba(116,192,252,.45)'],muoi:['nước muối',1200,'rgba(77,171,247,.55)'],dau:['dầu ăn',800,'rgba(250,200,60,.45)']};
function calc(){const m=MAT[$('arMat').value],l=LIQ[$('arLiq').value],V=+$('arV').value*1e-6,a=Math.cbrt(V),P=10*m[1]*V,low=+$('arD').value/100,dep=-a+low*(a+.12);
  let hs=Math.max(0,Math.min(a,dep)),FA=10*l[1]*a*a*hs,F=P-FA,float=false;if(F<0){hs=a*m[1]/l[1];FA=P;F=0;float=true}return{m,l,V,a,P,FA,F,hs,float,dep,low}}
function up(){const v=calc();$('oarV').textContent=$('arV').value+' cm³';$('oarD').textContent=$('arD').value+' %';
  $('arInfo').innerHTML=kv([['Trọng lượng P = d_vật · V',fmt(v.P,2)+' N'],['Thể tích phần chìm',fmt(v.a*v.a*v.hs*1e6,0)+' cm³'],['Lực đẩy Archimedes F_A',fmt(v.FA,2)+' N'],['Số chỉ lực kế = P − F_A',fmt(v.F,2)+' N']]);
  const V=$('arV2'),sinks=v.m[1]>v.l[1];V.className='verdict'+(v.float?' ok':'');
  V.textContent=v.float?`Vật ${v.m[0]} nổi trên ${v.l[0]}: F_A = P, dây treo chùng, lực kế chỉ 0. Phần chìm chiếm ${fmt(v.m[1]/v.l[1]*100,0)}% thể tích.`:v.hs<=0?'Vật chưa chạm chất lỏng: lực kế chỉ đúng trọng lượng P.':sinks?`D vật > D chất lỏng nên nếu thả tay, vật ${v.m[0]} sẽ chìm. Phần chìm càng nhiều, F_A càng lớn, lực kế chỉ càng nhỏ.`:'Hạ tiếp để thấy vật nổi lên.';draw()}
const draw=canvasOf($('cArc'),(c,w,h)=>{const v=calc(),bx=w*.5,bw=Math.min(w*.46,280),bh=h*.42,btop=h-bh-24,lvl0=btop+bh*.35,s=bh*.55/.12,A=v.a*s;
  const rise=(v.a*v.a*v.hs)/((bw/s)*(bw/s)*.25)*s,lvl=lvl0-Math.min(rise,bh*.3),bot=v.float?lvl+v.hs*s:lvl+v.dep*s;
  c.fillStyle=v.l[2];c.fillRect(bx-bw/2,lvl,bw,btop+bh-lvl);c.strokeStyle=css('ink');c.lineWidth=3;c.beginPath();c.moveTo(bx-bw/2,btop);c.lineTo(bx-bw/2,btop+bh);c.lineTo(bx+bw/2,btop+bh);c.lineTo(bx+bw/2,btop);c.stroke();
  c.fillStyle=css('muted');c.font=font(600,12);c.textAlign='left';c.textBaseline='top';c.fillText(v.l[0][0].toUpperCase()+v.l[0].slice(1),bx+bw/2+8,lvl);
  const sx=bx,stop=16,sh=Math.min(130,btop*.55),Pmax=Math.max(2,v.P*1.15),pr=v.F/Pmax;c.fillStyle=css('surface');c.strokeStyle=css('ink');c.lineWidth=2;c.fillRect(sx-22,stop,44,sh);c.strokeRect(sx-22,stop,44,sh);
  c.font=font(400,9,'f-mono');c.fillStyle=css('muted');c.textAlign='right';c.textBaseline='middle';for(let k=0;k<=4;k++){const y=stop+14+(sh-28)*k/4;c.fillRect(sx+8,y,10,1);c.fillText(fmt(Pmax*k/4,1),sx+6,y)}
  const py=stop+14+(sh-28)*pr;c.strokeStyle=css('muted');c.lineWidth=1.4;c.beginPath();c.moveTo(sx,stop+8);for(let k=1;k<=10;k++)c.lineTo(sx+(k%2?-8:8),stop+8+(py-stop-8)*k/10);c.stroke();c.fillStyle=css('red');c.fillRect(sx-4,py-2,30,4);
  c.fillStyle=css('ink');c.font=font(700,13,'f-mono');c.textAlign='left';c.fillText(fmt(v.F,2)+' N',sx+30,py);c.font=font(600,11);c.fillText('Lực kế',sx+30,stop+8);
  const top=bot-A,hookY=stop+sh;c.strokeStyle=css('ink');c.lineWidth=1.5;c.setLineDash(v.float?[3,3]:[]);c.beginPath();c.moveTo(sx,hookY);c.lineTo(sx,top);c.stroke();c.setLineDash([]);
  c.fillStyle=v.m[2];c.fillRect(bx-A/2,top,A,A);c.strokeStyle=css('ink');c.lineWidth=2;c.strokeRect(bx-A/2,top,A,A);
  const ar=(y,len,col,lab,dir)=>{if(len<2)return;c.strokeStyle=c.fillStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(bx+dir*(A/2+18),y);c.lineTo(bx+dir*(A/2+18),y+len);c.stroke();arrowHead(c,bx+dir*(A/2+18),y+len,len>0?Math.PI/2:-Math.PI/2,9);c.font=font(700,12);c.textAlign=dir<0?'right':'left';c.textBaseline='middle';c.fillText(lab,bx+dir*(A/2+26),y+len/2)};
  const k=60/Math.max(v.P,.5);ar(top+A/2,v.P*k,css('red'),'P',-1);ar(top+A/2,-v.FA*k,css('accent'),'F_A',1)});
['arMat','arLiq'].forEach(id=>$(id).addEventListener('change',up));['arV','arD'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- KHTN 8: đòn bẩy ---------- */
{const L={ang:0};
function vals(){const m1=+$('lvM1').value,d1=+$('lvD1').value,m2=+$('lvM2').value,d2=+$('lvD2').value;return{m1,d1,m2,d2,M1:10*m1*d1*.1,M2:10*m2*d2*.1}}
function up(){const v=vals();['M1','D1','M2','D2'].forEach(k=>$('olv'+k).textContent=$('lv'+k).value+(k[0]==='M'?' kg':' vạch'));
  $('lvInfo').innerHTML=kv([['F₁ = 10·m₁',fmt(10*v.m1,0)+' N'],['M₁ = F₁·d₁',fmt(v.M1,1)+' N·m'],['F₂ = 10·m₂',fmt(10*v.m2,0)+' N'],['M₂ = F₂·d₂',fmt(v.M2,1)+' N·m']]);
  const V=$('lvV'),eq=Math.abs(v.M1-v.M2)<1e-9;V.className='verdict'+(eq?' ok':'');V.textContent=eq?'Đòn bẩy cân bằng vì M₁ = M₂.':`Đòn bẩy nghiêng về bên ${v.M1>v.M2?'trái':'phải'} vì moment lực bên đó lớn hơn. Muốn cân bằng, đổi khối lượng hoặc cánh tay đòn.`;draw()}
const draw=canvasOf($('cLev'),(c,w,h)=>{const v=vals(),cx=w/2,cy=h*.42,Lb=Math.min(w*.42,360),u=Lb/5,a=L.ang;
  c.fillStyle=css('ink');c.beginPath();c.moveTo(cx,cy+6);c.lineTo(cx-26,cy+60);c.lineTo(cx+26,cy+60);c.closePath();c.fill();c.fillRect(cx-60,cy+60,120,6);
  c.save();c.translate(cx,cy);c.rotate(a);c.fillStyle='#c8955a';c.fillRect(-Lb-14,-7,2*Lb+28,14);c.strokeStyle=css('ink');c.lineWidth=1.5;c.strokeRect(-Lb-14,-7,2*Lb+28,14);
  c.fillStyle=css('ink');c.font=font(500,10,'f-mono');c.textAlign='center';c.textBaseline='bottom';for(let k=-5;k<=5;k++){c.fillRect(k*u-1,-7,2,6);if(k)c.fillText(Math.abs(k),k*u,-9)}c.restore();
  const hang=(d,m,col,side)=>{const px=cx+side*d*u*Math.cos(a),py=cy+side*d*u*Math.sin(a),S=18+m*4;c.strokeStyle=css('ink');c.lineWidth=1.4;c.beginPath();c.moveTo(px,py+7);c.lineTo(px,py+50);c.stroke();
    c.fillStyle=col;c.fillRect(px-S/2,py+50,S,S);c.strokeRect(px-S/2,py+50,S,S);c.fillStyle='#fff';c.font=font(700,12);c.textAlign='center';c.textBaseline='middle';c.fillText(m+' kg',px,py+50+S/2)};
  hang(v.d1,v.m1,css('accent'),-1);hang(v.d2,v.m2,css('amber'),1);
  c.fillStyle=css('muted');c.font=font(600,12);c.textAlign='center';c.textBaseline='top';c.fillText('Điểm tựa O',cx,cy+70)});
TICK.lever=dt=>{const v=vals(),tg=Math.max(-.26,Math.min(.26,(v.M2-v.M1)*.03));if(Math.abs(L.ang-tg)>1e-4){L.ang+=(tg-L.ang)*Math.min(1,dt*(reduced?20:4));draw()}};
['lvM1','lvD1','lvM2','lvD2'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- Hoá 12: pin điện hoá ---------- */
{const E0={Mg:-2.37,Zn:-.76,Fe:-.44,Ni:-.26,Pb:-.13,Cu:.34,Ag:.8},ZC={Ag:1},ION=m=>m+(m==='Ag'?'⁺':'²⁺'),COL={Cu:'rgba(51,154,240,.45)',Ni:'rgba(81,207,102,.4)',Fe:'rgba(140,200,140,.35)'},MC={Mg:'#ced4da',Zn:'#a5b4c3',Fe:'#7b8590',Ni:'#b8b8a8',Pb:'#6c757d',Cu:'#c8733e',Ag:'#e9ecef'};
const G={on:false,ph:0,wear:0};
function cell(){const L=$('gvL').value,R=$('gvR').value,an=E0[L]<=E0[R]?L:R,ca=an===L?R:L;return{L,R,an,ca,E:E0[ca]-E0[an],same:L===R}}
function eqn(an,ca){const za=ZC[an]||2,zc=ZC[ca]||2,l=za*zc/gcd(za,zc),a=l/za,c2=l/zc,co=n=>n>1?n:'';return`${co(a)}${an} + ${co(c2)}${ION(ca)} → ${co(a)}${ION(an)} + ${co(c2)}${ca}`}
function up(reset){const v=cell();if(reset){G.wear=0}$('gvK').textContent=G.on?'Ngắt mạch ngoài':'Nối mạch ngoài';
  $('gvInfo').innerHTML=v.same?kv([['Suất điện động','0 V']]):kv([['Cực âm (anode)',`${v.an}: ${v.an} → ${ION(v.an)} + ${ZC[v.an]?'1':'2'}e`],['Cực dương (cathode)',`${v.ca}: ${ION(v.ca)} + ${ZC[v.ca]?'1':'2'}e → ${v.ca}`],['Phản ứng trong pin',eqn(v.an,v.ca)],['E°pin = E°(+) − E°(−)',`${fmt(E0[v.ca],2)} − (${fmt(E0[v.an],2)}) = ${fmt(v.E,2)} V`]]);
  const V=$('gvV');V.className='verdict'+(v.same?' bad':G.on?' ok':'');V.textContent=v.same?'Hai điện cực giống nhau thì không tạo thành pin.':G.on?`Electron đi từ cực ${v.an} qua dây dẫn sang cực ${v.ca}. Thanh ${v.an} mòn dần, kim loại ${v.ca} bám thêm lên cực dương.`:'Bấm "Nối mạch ngoài" để pin phát điện.';draw()}
const draw=canvasOf($('cGal'),(c,w,h)=>{const v=cell(),bw=Math.min(w*.3,220),bh=h*.42,by=h-bh-24,lx=w*.27,rx=w*.73,lvl=by+bh*.18;
  [[lx,v.L],[rx,v.R]].forEach(([x,m])=>{c.fillStyle=COL[m]||'rgba(200,220,235,.45)';c.fillRect(x-bw/2,lvl,bw,by+bh-lvl);c.strokeStyle=css('ink');c.lineWidth=3;c.beginPath();c.moveTo(x-bw/2,by);c.lineTo(x-bw/2,by+bh);c.lineTo(x+bw/2,by+bh);c.lineTo(x+bw/2,by);c.stroke();
    const isAn=m===v.an&&!v.same,pw=26*(isAn?1-.45*G.wear:m===v.ca&&!v.same?1+.35*G.wear:1);c.fillStyle=MC[m];c.fillRect(x-pw/2-bw*.18,by-40,pw,bh*.78+40);c.strokeStyle=css('ink');c.lineWidth=1.5;c.strokeRect(x-pw/2-bw*.18,by-40,pw,bh*.78+40);
    c.fillStyle=css('ink');c.font=font(700,15);c.textAlign='center';c.textBaseline='bottom';c.fillText(m,x-bw*.18,by-44);c.font=font(600,11);c.textBaseline='top';c.fillText('dd '+ION(m),x+bw*.12,by+bh-24);
    if(!v.same){c.fillStyle=isAn?css('rain'):css('red');c.font=font(700,13);c.fillText(isAn?'(−) anode':'(+) cathode',x,by+bh+6)}});
  c.strokeStyle=css('muted');c.lineWidth=16;c.lineCap='butt';c.beginPath();c.moveTo(lx+bw*.25,lvl+bh*.35);c.lineTo(lx+bw*.25,by-30);c.lineTo(rx-bw*.25,by-30);c.lineTo(rx-bw*.25,lvl+bh*.35);c.stroke();
  c.strokeStyle='#fff';c.lineWidth=12;c.stroke();c.lineCap='round';c.fillStyle=css('muted');c.font=font(600,11);c.textAlign='center';c.textBaseline='bottom';c.fillText('Cầu muối KNO₃',w/2,by-40);
  const wy=Math.max(26,by-130),pts=[[lx-bw*.18,by-40],[lx-bw*.18,wy],[rx-bw*.18,wy],[rx-bw*.18,by-40]];c.strokeStyle=css('ink');c.lineWidth=2.4;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();
  c.fillStyle=css('surface');c.beginPath();c.arc(w/2-bw*.18,wy,22,0,7);c.fill();c.stroke();c.fillStyle=css('ink');c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='middle';c.fillText(G.on&&!v.same?fmt(v.E,2)+'V':'0V',w/2-bw*.18,wy);
  if(G.on&&!v.same){const fromL=v.an===v.L,path=fromL?pts:[...pts].reverse(),lens=[];let tot=0;for(let k=1;k<path.length;k++){const l=Math.hypot(path[k][0]-path[k-1][0],path[k][1]-path[k-1][1]);lens.push(l);tot+=l}
    c.fillStyle=css('rain');for(let d=G.ph%26;d<tot;d+=26){let r=d,k=0;while(k<lens.length-1&&r>lens[k]){r-=lens[k];k++}const t=r/lens[k],x=path[k][0]+(path[k+1][0]-path[k][0])*t,y=path[k][1]+(path[k+1][1]-path[k][1])*t;if(Math.hypot(x-(w/2-bw*.18),y-wy)<24)continue;c.beginPath();c.arc(x,y,4,0,7);c.fill()}
    c.fillStyle=css('rain');c.font=font(700,12);c.textAlign='center';c.textBaseline='bottom';c.fillText('electron →'.replace('→',fromL?'→':'←'),w/2+70,wy-6)}});
TICK.galvanic=dt=>{if(!G.on||cell().same)return;G.ph+=dt*45;G.wear=Math.min(1,G.wear+dt*.02);draw()};
$('gvK').onclick=()=>{G.on=!G.on;up(false)};['gvL','gvR'].forEach(id=>$(id).addEventListener('change',()=>up(true)));up(true)}

/* ---------- Sinh: quang hợp ---------- */
{const Q={bub:[],acc:0};
function rate(){const L=+$('phL').value,C=+$('phC').value,T=+$('phT').value,fL=L/(L+25),fC=C/(C+.03),fT=Math.exp(-(((T-30)/9)**2));return{L,C,T,fL,fC,fT,P:100*fL*fC*fT/(0.8*0.8)}}
function up(){const r=rate();$('ophL').textContent=r.L+' %';$('ophC').textContent=fmt(r.C,2)+' %';$('ophT').textContent=r.T+' °C';
  const lim=[['ánh sáng',r.fL/.8],['nồng độ CO₂',r.fC/.8],['nhiệt độ',r.fT]].sort((a,b)=>a[1]-b[1])[0];
  $('phInfo').innerHTML=kv([['Cường độ quang hợp (tương đối)',fmt(r.P,0)+' %'],['Số bọt khí O₂ mỗi phút',fmt(r.P*.6,0)],['Yếu tố đang hạn chế',lim[0]]]);
  $('phV').textContent=r.L===0?'Không có ánh sáng: cây không quang hợp, không có bọt khí oxygen.':r.T>40?'Nhiệt độ quá cao làm enzyme bị ảnh hưởng, quang hợp giảm mạnh.':`Tăng ${lim[0]} sẽ làm quang hợp tăng rõ nhất. Khi ánh sáng đủ mạnh, tăng thêm ánh sáng không làm quang hợp tăng nữa (điểm bão hoà ánh sáng).`;draw()}
const draw=canvasOf($('cPho'),(c,w,h)=>{const r=rate(),wide=w>=640,pw=wide?w*.55:w,ph=wide?h:h*.58,bx=pw*.58,bw=Math.min(pw*.5,240),bh=ph*.62,by=ph-bh-20;
  const lx=pw*.16,ly=by+bh*.35,g=c.createRadialGradient(lx,ly,4,lx,ly,40+r.L*1.4);g.addColorStop(0,`rgba(255,220,80,${.2+r.L/120})`);g.addColorStop(1,'rgba(255,220,80,0)');c.fillStyle=g;c.beginPath();c.arc(lx,ly,40+r.L*1.4,0,7);c.fill();
  c.font=`40px ${EMOJI}`;c.textAlign='center';c.textBaseline='middle';c.fillText('💡',lx,ly);c.fillStyle=css('ink');c.font=font(600,11);c.fillText('Đèn '+r.L+'%',lx,ly+34);
  c.fillStyle='rgba(116,192,252,.35)';c.fillRect(bx-bw/2,by+16,bw,bh-16);c.strokeStyle=css('ink');c.lineWidth=3;c.beginPath();c.moveTo(bx-bw/2,by);c.lineTo(bx-bw/2,by+bh);c.lineTo(bx+bw/2,by+bh);c.lineTo(bx+bw/2,by);c.stroke();
  const tx=bx,ttop=by+26,tw=34;c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();c.moveTo(tx-tw/2,by+bh*.55);c.lineTo(tx-tw/2,ttop+tw/2);c.arc(tx,ttop+tw/2,tw/2,Math.PI,0);c.lineTo(tx+tw/2,by+bh*.55);c.stroke();
  const gas=Math.min(1,Q.acc/400);c.fillStyle='rgba(255,255,255,.75)';c.fillRect(tx-tw/2+2,ttop+4,tw-4,gas*(bh*.55-ttop+by-6));c.fillStyle=css('muted');c.font=font(600,10);c.textAlign='left';c.fillText('khí O₂',tx+tw/2+4,ttop+12);
  c.strokeStyle='#2f9e44';c.lineWidth=3;for(let k=-2;k<=2;k++){const x0=tx+k*7,x1=tx+k*16;c.beginPath();c.moveTo(x0,by+bh-4);c.bezierCurveTo(x0+8,by+bh*.8,x1-8,by+bh*.7,x1,by+bh*.58);c.stroke();
    for(let j=0;j<5;j++){const t=.2+j*.16,yy=by+bh-4-(bh*.42)*t,xx=x0+(x1-x0)*t;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx-7,yy-5);c.moveTo(xx,yy);c.lineTo(xx+7,yy-5);c.stroke()}}
  c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=1.4;Q.bub.forEach(b=>{c.beginPath();c.arc(b.x*bw+bx-bw/2,b.y,b.r,0,7);c.stroke()});
  c.fillStyle=css('ink');c.font=font(600,11);c.textAlign='center';c.textBaseline='top';c.fillText('Cành rong trong nước',bx,by+bh+4);
  const gx=wide?pw+40:50,gw=w-gx-20,gy=wide?40:ph+24,gh=(wide?h:h-ph)-gy-(wide?40:30)+(wide?0:ph),X=L=>gx+L/100*gw,Y=P=>gy+gh-P/120*gh;
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,10,'f-mono');for(let L=0;L<=100;L+=25){c.beginPath();c.moveTo(X(L),gy);c.lineTo(X(L),gy+gh);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(L,X(L),gy+gh+3)}
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(gx,gy);c.lineTo(gx,gy+gh);c.lineTo(gx+gw,gy+gh);c.stroke();c.textAlign='left';c.textBaseline='bottom';c.font=font(600,11);c.fillText('Cường độ quang hợp theo ánh sáng (%)',gx,gy-4);
  c.strokeStyle=css('accent');c.lineWidth=2.4;c.beginPath();for(let L=0;L<=100;L++){const P=100*(L/(L+25))*r.fC*r.fT/.64;L?c.lineTo(X(L),Y(P)):c.moveTo(X(L),Y(P))}c.stroke();c.fillStyle=css('red');c.beginPath();c.arc(X(r.L),Y(r.P),6,0,7);c.fill()});
TICK.photo=dt=>{const r=rate(),n=r.P/100*dt*8;if(Math.random()<n%1||n>=1)for(let k=0;k<Math.max(1,Math.floor(n));k++)Q.bub.push({x:.5+(Math.random()-.5)*.25,y:0,r:2+Math.random()*2.5,v:30+Math.random()*25,init:true});
  const cv=$('cPho'),H=cv.clientHeight,W=cv.clientWidth,wide=W>=640,ph=wide?H:H*.58,bh=ph*.62,by=ph-bh-20;Q.bub.forEach(b=>{if(b.init){b.y=by+bh*.6;b.init=false}b.y-=b.v*dt});Q.acc+=r.P*dt*.15;Q.bub=Q.bub.filter(b=>b.y>by+40);draw()};
['phL','phC','phT'].forEach(id=>$(id).addEventListener('input',()=>{Q.acc=0;up()}));up()}

/* ---------- Tin: RGB ---------- */
{function up(){const R=+$('rgR').value,G=+$('rgG').value,B=+$('rgB').value,hex='#'+[R,G,B].map(x=>x.toString(16).padStart(2,'0').toUpperCase()).join('');['R','G','B'].forEach(k=>$('org'+k).textContent=$('rg'+k).value);
  presetSync('#p-rgb [data-rgb]','rgb',`${R},${G},${B}`);
  $('rgInfo').innerHTML=kv([['Mã thập lục phân',hex],['Thập phân','rgb('+R+', '+G+', '+B+')'],['Nhị phân R',R.toString(2).padStart(8,'0')],['Nhị phân G',G.toString(2).padStart(8,'0')],['Nhị phân B',B.toString(2).padStart(8,'0')]]);draw()}
const draw=canvasOf($('cRgb'),(c,w,h)=>{const R=+$('rgR').value,G=+$('rgG').value,B=+$('rgB').value,cw=Math.min(w*.55,h*1.1),r=cw*.22,cx=cw*.5+10,cy=h*.5;
  c.fillStyle='#0b0d14';c.fillRect(0,0,cw+20,h);c.globalCompositeOperation='lighter';[[R,0,0,-1,-.6],[0,G,0,1,-.6],[0,0,B,0,.55]].forEach(([r_,g_,b_,dx,dy])=>{c.fillStyle=`rgb(${r_},${g_},${b_})`;c.beginPath();c.arc(cx+dx*r*.62,cy+dy*r*.62,r,0,7);c.fill()});c.globalCompositeOperation='source-over';
  c.fillStyle='#e9ecf5';c.font=font(600,12);c.textAlign='center';c.textBaseline='bottom';c.fillText('Trộn ba màu ánh sáng',cx,h-10);
  const sx=cw+50,sw=w-sx-24,sh=Math.min(h*.45,sw*.7);c.fillStyle=`rgb(${R},${G},${B})`;c.fillRect(sx,24,sw,sh);c.strokeStyle=css('ink');c.lineWidth=2;c.strokeRect(sx,24,sw,sh);
  const lum=.299*R+.587*G+.114*B;c.fillStyle=lum>140?'#10162f':'#fff';c.font=font(700,22,'f-mono');c.textBaseline='middle';c.fillText('#'+[R,G,B].map(x=>x.toString(16).padStart(2,'0').toUpperCase()).join(''),sx+sw/2,24+sh/2);
  const rows=[['R',R,'#e03131'],['G',G,'#2f9e44'],['B',B,'#1971c2']],by=24+sh+24,cell=Math.min(22,sw/9);rows.forEach(([n,v,col],i)=>{const y=by+i*(cell+10);c.fillStyle=col;c.font=font(700,13);c.textAlign='left';c.textBaseline='middle';c.fillText(n,sx,y+cell/2);
    v.toString(2).padStart(8,'0').split('').forEach((bit,j)=>{const x=sx+22+j*cell;c.fillStyle=bit==='1'?col:css('surface');c.fillRect(x,y,cell-2,cell);c.strokeStyle=css('ink');c.lineWidth=1;c.strokeRect(x,y,cell-2,cell);c.fillStyle=bit==='1'?'#fff':css('muted');c.font=font(700,11,'f-mono');c.textAlign='center';c.fillText(bit,x+(cell-2)/2,y+cell/2)})})});
document.querySelectorAll('#p-rgb [data-rgb]').forEach(b=>b.onclick=()=>{const[r,g,bb]=b.dataset.rgb.split(',');$('rgR').value=r;$('rgG').value=g;$('rgB').value=bb;up()});['rgR','rgG','rgB'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- Địa 6: tỉ lệ bản đồ ---------- */
{const PL=[['🏠','Nhà em',.46,.5],['🏫','Trường học',.16,.26],['🏪','Chợ',.78,.2],['📮','Bưu điện',.3,.78],['🏥','Bệnh viện',.82,.74]];
const S={a:[.46,.5],b:[.16,.26],drag:null,W:1,H:1};const CM=()=>S.W/16;
function up(){const d=Math.hypot((S.a[0]-S.b[0])*S.W,(S.a[1]-S.b[1])*S.H)/CM(),k=+$('msScale').value,real=d*k/100;
  const nm=p=>{const q=PL.find(q=>Math.hypot(q[2]-p[0],q[3]-p[1])<.005);return q?q[1]:'điểm đã chọn'};
  $('msInfo').innerHTML=kv([['Tỉ lệ','1 : '+k.toLocaleString('vi-VN')],['1 cm trên bản đồ ứng với',k>=100000?k/100000+' km':(k/100).toLocaleString('vi-VN')+' m'],['Đo trên bản đồ',fmt(d,1)+' cm'],['Khoảng cách thực tế',real>=1000?fmt(real/1000,2)+' km':fmt(real,0)+' m']]);
  $('msV').textContent=`Từ ${nm(S.a)} đến ${nm(S.b)}: ${fmt(d,1)} cm × ${k.toLocaleString('vi-VN')} = ${(d*k).toLocaleString('vi-VN',{maximumFractionDigits:0})} cm ≈ ${real>=1000?fmt(real/1000,2)+' km':fmt(real,0)+' m'} ngoài thực tế.`;draw()}
const draw=canvasOf($('cMap'),(c,w,h)=>{S.W=w;S.H=h;const k=+$('msScale').value;c.fillStyle='#eef6e4';c.fillRect(0,0,w,h);
  c.strokeStyle='rgba(116,192,252,.9)';c.lineWidth=Math.max(14,w*.025);c.beginPath();c.moveTo(-10,h*.62);c.bezierCurveTo(w*.25,h*.5,w*.45,h*.95,w*.62,h*.62);c.bezierCurveTo(w*.75,h*.38,w*.9,h*.5,w+10,h*.4);c.stroke();
  c.fillStyle='#1971c2';c.font='italic 600 12px '+css('f-body');c.textAlign='left';c.fillText('Sông Xanh',w*.04,h*.55);
  c.strokeStyle='#ced4da';c.lineWidth=9;[[[.05,.36],[.95,.36]],[[.38,.05],[.38,.95]],[[.62,.1],[.7,.95]]].forEach(([a,b])=>{c.beginPath();c.moveTo(a[0]*w,a[1]*h);c.lineTo(b[0]*w,b[1]*h);c.stroke()});
  c.strokeStyle='#fff';c.lineWidth=1.5;c.setLineDash([8,8]);[[[.05,.36],[.95,.36]],[[.38,.05],[.38,.95]],[[.62,.1],[.7,.95]]].forEach(([a,b])=>{c.beginPath();c.moveTo(a[0]*w,a[1]*h);c.lineTo(b[0]*w,b[1]*h);c.stroke()});c.setLineDash([]);
  PL.forEach(([e,n,x,y])=>{c.font=`30px ${EMOJI}`;c.textAlign='center';c.textBaseline='middle';c.fillText(e,x*w,y*h);c.font=font(700,12);c.lineWidth=4;c.strokeStyle='#fff';c.strokeText(n,x*w,y*h+26);c.fillStyle='#10162f';c.fillText(n,x*w,y*h+26)});
  const nx=w-36,ny=40;c.fillStyle='#10162f';c.beginPath();c.moveTo(nx,ny-22);c.lineTo(nx-9,ny+6);c.lineTo(nx,ny);c.lineTo(nx+9,ny+6);c.closePath();c.fill();c.font=font(700,14);c.textAlign='center';c.fillText('B',nx,ny+20);
  const sx=18,sy=h-26,cm=CM();c.fillStyle='#fff';c.fillRect(sx-6,sy-30,cm*3+60,42);c.strokeStyle='#10162f';c.lineWidth=1;c.strokeRect(sx-6,sy-30,cm*3+60,42);
  for(let i=0;i<3;i++){c.fillStyle=i%2?'#fff':'#10162f';c.fillRect(sx+i*cm,sy-8,cm,7);c.strokeRect(sx+i*cm,sy-8,cm,7)}c.fillStyle='#10162f';c.font=font(600,10,'f-mono');c.textAlign='center';c.textBaseline='bottom';
  for(let i=0;i<=3;i++){const m=i*k/100;c.fillText(m>=1000?m/1000+'km':m+'m',sx+i*cm,sy-11)}c.textAlign='left';c.textBaseline='top';c.fillText('Thước tỉ lệ (mỗi đoạn 1 cm)',sx,sy+1);
  const A=[S.a[0]*w,S.a[1]*h],B=[S.b[0]*w,S.b[1]*h],ang=Math.atan2(B[1]-A[1],B[0]-A[0]),len=Math.hypot(B[0]-A[0],B[1]-A[1]);
  c.save();c.translate(...A);c.rotate(ang);c.fillStyle='rgba(255,236,153,.9)';c.fillRect(-4,-12,len+8,24);c.strokeStyle='#10162f';c.lineWidth=1;c.strokeRect(-4,-12,len+8,24);
  for(let i=0;i*cm/10<=len;i++){const x=i*cm/10;c.beginPath();c.moveTo(x,-12);c.lineTo(x,-12+(i%10?4:9));c.stroke();if(i%10===0){c.fillStyle='#10162f';c.font=font(600,9,'f-mono');c.textAlign='center';c.textBaseline='top';c.fillText(i/10,x,-1)}}c.restore();
  [A,B].forEach(p=>{c.fillStyle='#e03131';c.beginPath();c.arc(p[0],p[1],8,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.stroke()})});
drag($('cMap'),(x,y,dx,dy,t)=>{if(t==='down'){const A=[S.a[0]*S.W,S.a[1]*S.H],B=[S.b[0]*S.W,S.b[1]*S.H];S.drag=Math.hypot(x-A[0],y-A[1])<24?'a':Math.hypot(x-B[0],y-B[1])<24?'b':null;return}if(t==='up'){S.drag=null;return}
  if(S.drag){let p=[Math.max(0,Math.min(1,x/S.W)),Math.max(0,Math.min(1,y/S.H))];const q=PL.find(q=>Math.hypot((q[2]-p[0])*S.W,(q[3]-p[1])*S.H)<22);if(q)p=[q[2],q[3]];S[S.drag]=p;up()}});
document.querySelectorAll('#p-mapscale [data-ms]').forEach(b=>b.onclick=()=>{const[i,j]=b.dataset.ms.split(',').map(Number);S.a=[PL[i][2],PL[i][3]];S.b=[PL[j][2],PL[j][3]];up()});
$('msScale').addEventListener('change',up);up()}
