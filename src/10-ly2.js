
/* ================= LÍ 10, 11: bổ sung ================= */
// đồ thị nhỏ theo thời gian: vẽ toàn bộ đường mờ, phần đã chạy đậm, chấm tại thời điểm hiện tại
function miniPlot(c,o){const{x,y,w,h,t0=0,t1,yMin,yMax,col,title,fn,tNow}=o,X=t=>x+(t-t0)/(t1-t0)*w,Y=v=>y+h-(v-yMin)/((yMax-yMin)||1)*h;
  c.strokeStyle=css('grid');c.lineWidth=1;const ts=niceStep(t1-t0,4);c.fillStyle=css('muted');c.font=font(400,10,'f-mono');
  for(let t=Math.ceil(t0/ts)*ts;t<=t1+1e-9;t+=ts){c.beginPath();c.moveTo(X(t),y);c.lineTo(X(t),y+h);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(fmt(t,ts<1?1:0),X(t),y+h+3)}
  const y0=Y(Math.min(Math.max(0,yMin),yMax));c.strokeStyle=css('muted');c.beginPath();c.moveTo(x,y);c.lineTo(x,y+h);c.moveTo(x,y0);c.lineTo(x+w,y0);c.stroke();
  c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(yMax,1),x-4,Y(yMax));if(yMin<0)c.fillText(fmt(yMin,1),x-4,Y(yMin));c.fillText('0',x-4,y0);
  c.fillStyle=col;c.font=font(700,12);c.textAlign='left';c.textBaseline='bottom';c.fillText(title,x+4,y-3);
  const N=160;c.setLineDash([4,4]);c.strokeStyle=col;c.globalAlpha=.35;c.lineWidth=1.5;c.beginPath();for(let i=0;i<=N;i++){const t=t0+(t1-t0)*i/N;i?c.lineTo(X(t),Y(fn(t))):c.moveTo(X(t),Y(fn(t)))}c.stroke();c.setLineDash([]);c.globalAlpha=1;
  if(tNow!=null&&tNow>t0){c.lineWidth=2.4;c.beginPath();for(let i=0;i<=N;i++){const t=t0+(Math.min(tNow,t1)-t0)*i/N;i?c.lineTo(X(t),Y(fn(t))):c.moveTo(X(t),Y(fn(t)))}c.stroke();
    c.fillStyle=col;c.beginPath();c.arc(X(Math.min(tNow,t1)),Y(fn(Math.min(tNow,t1))),4.5,0,7);c.fill()}}
function car(c,x,yb,col,w=48){c.fillStyle=col;c.fillRect(x-w/2,yb-22,w,13);c.fillRect(x-w/4,yb-32,w*.55,11);c.fillStyle='#d6ecff';c.fillRect(x-w/4+3,yb-30,w*.55-6,7);
  c.fillStyle='#10162f';[x-w/3,x+w/3].forEach(cx=>{c.beginPath();c.arc(cx,yb-7,6.5,0,7);c.fill()});c.fillStyle='#ced4da';[x-w/3,x+w/3].forEach(cx=>{c.beginPath();c.arc(cx,yb-7,2.5,0,7);c.fill()})}
const presetSync=(sel,attr,val)=>document.querySelectorAll(sel).forEach(b=>b.setAttribute('aria-pressed',b.dataset[attr]===String(val)));

/* ---------- chuyển động thẳng ---------- */
{const K={mode:'nhanh',t:0,play:false};
const prm=()=>{const v0=+$('knV').value,A=+$('knA').value,a=K.mode==='deu'?0:K.mode==='nhanh'?A:-A,ts=a<0?v0/A:Infinity,T=a<0?Math.max(2,Math.min(14,Math.ceil(ts)+2)):10;return{v0,a,A,ts,T}};
const xt=(p,t)=>{const u=Math.min(t,p.ts);return p.v0*u+.5*p.a*u*u},vt=(p,t)=>t>=p.ts?0:p.v0+p.a*t,at=(p,t)=>t>=p.ts?0:p.a;
function up(reset){const p=prm();presetSync('#p-kin [data-km]','km',K.mode);$('knArow').hidden=K.mode==='deu';$('oknV').textContent=fmt(p.v0)+' m/s';$('oknA').textContent=fmt(p.A)+' m/s²';
  if(reset){K.t=0;K.play=false;$('knPlay').textContent='Chạy'}
  $('knF').textContent=K.mode==='deu'?'v = v₀ (không đổi)\nx = v₀·t\na = 0':'v = v₀ + a·t\nx = v₀·t + ½·a·t²\nv² − v₀² = 2·a·s'+(K.mode==='cham'?'\nXe dừng khi t = v₀ / |a|':'');
  const rows=[['Thời gian t',fmt(K.t,2)+' s'],['Quãng đường s',fmt(xt(p,K.t),2)+' m'],['Vận tốc v',fmt(vt(p,K.t),2)+' m/s'],['Gia tốc a',fmt(at(p,K.t),2)+' m/s²']];
  if(K.mode==='cham')rows.push(['Thời gian đến khi dừng',p.v0>0?fmt(p.ts,2)+' s':'xe đang đứng yên'],['Quãng đường đến khi dừng',fmt(p.v0*p.v0/(2*p.A),2)+' m']);
  $('knInfo').innerHTML=kv(rows);draw()}
const draw=canvasOf($('cKin'),(c,w,h)=>{const p=prm(),Xm=Math.max(10,xt(p,p.T))*1.06,mx=30,X=x=>mx+x/Xm*(w-2*mx),top=h*.44,ry=top*.6;
  c.fillStyle=rgba('ink',.08);c.fillRect(mx-10,ry,w-2*mx+20,10);c.strokeStyle=css('muted');c.lineWidth=1;const st=niceStep(Xm,8);
  c.fillStyle=css('muted');c.font=font(400,10,'f-mono');c.textAlign='center';c.textBaseline='top';for(let x=0;x<=Xm;x+=st){c.fillRect(X(x),ry+10,1,5);c.fillText(fmt(x,st<1?1:0)+(x?'':' m'),X(x),ry+16)}
  const xn=xt(p,K.t),vn=vt(p,K.t);car(c,X(xn),ry,css('accent'));
  if(vn>.01){const L=Math.min(140,vn*8);c.strokeStyle=c.fillStyle=css('green');c.lineWidth=2.4;c.beginPath();c.moveTo(X(xn)+26,ry-40);c.lineTo(X(xn)+26+L,ry-40);c.stroke();arrowHead(c,X(xn)+26+L,ry-40,0,8);c.font=font(700,12);c.textAlign='left';c.textBaseline='bottom';c.fillText('v = '+fmt(vn,1)+' m/s',X(xn)+26,ry-44)}
  const ty=top*.9;c.fillStyle='#fff8d9';c.fillRect(mx-10,ty-9,w-2*mx+20,18);c.strokeStyle=css('gridStrong');c.strokeRect(mx-10,ty-9,w-2*mx+20,18);
  c.fillStyle=css('ink');for(let k=0;k<=Math.floor(Math.min(K.t,p.T)+1e-9);k++){const px=X(xt(p,k));c.beginPath();c.arc(px,ty,3.6,0,7);c.fill()}
  c.fillStyle=css('muted');c.font=font(500,10);c.textAlign='left';c.textBaseline='bottom';c.fillText('Băng giấy: 1 chấm mỗi giây',mx-10,ty-11);
  const gy=top+30,gh=h-gy-26,gw=(w-60-2*36)/3,vmax=Math.max(p.v0,vt(p,p.T))*1.15+.5,amax=Math.max(1,p.A*1.5);
  miniPlot(c,{x:40,y:gy,w:gw,h:gh,t1:p.T,yMin:0,yMax:xt(p,p.T)*1.1+1,col:css('accent'),title:'x (m) theo t (s)',fn:t=>xt(p,t),tNow:K.t});
  miniPlot(c,{x:40+gw+36,y:gy,w:gw,h:gh,t1:p.T,yMin:0,yMax:vmax,col:css('green'),title:'v (m/s) theo t (s)',fn:t=>vt(p,t),tNow:K.t});
  miniPlot(c,{x:40+2*(gw+36),y:gy,w:gw,h:gh,t1:p.T,yMin:-amax,yMax:amax,col:css('red'),title:'a (m/s²) theo t (s)',fn:t=>at(p,t),tNow:K.t})});
document.querySelectorAll('#p-kin [data-km]').forEach(b=>b.onclick=()=>{K.mode=b.dataset.km;if(K.mode==='cham'&&+$('knV').value<4)$('knV').value=12;up(true)});
$('knPlay').onclick=()=>{const p=prm();if(K.t>=p.T)K.t=0;K.play=!K.play;$('knPlay').textContent=K.play?'Tạm dừng':'Chạy'};$('knReset').onclick=()=>up(true);
['knV','knA'].forEach(id=>$(id).addEventListener('input',()=>up(true)));
TICK.kin=dt=>{if(!K.play)return;const p=prm();K.t=Math.min(p.T,K.t+dt);if(K.t>=p.T){K.play=false;$('knPlay').textContent='Chạy lại'}up(false)};up(true)}

/* ---------- rơi tự do, ném ngang ---------- */
{const F={mode:'ngang',t:0,play:false};
const prm=()=>{const h=+$('flH').value,g=+$('flG').value,v0=F.mode==='ngang'?+$('flV').value:0,T=Math.sqrt(2*h/g);return{h,g,v0,T,L:v0*T,both:F.mode==='ngang'&&$('flBoth').checked}};
const pos=(p,t,v0)=>{const u=Math.min(t,p.T);return[v0*u,p.h-p.g*u*u/2]};
function up(reset){const p=prm();presetSync('#p-fall [data-fm]','fm',F.mode);$('flVrow').hidden=F.mode!=='ngang';$('flBothRow').hidden=F.mode!=='ngang';
  $('oflH').textContent=p.h+' m';$('oflV').textContent=fmt(p.v0||+$('flV').value)+' m/s';$('flGo').textContent=F.mode==='ngang'?'Ném':'Thả';
  if(reset){F.t=0;F.play=false}
  const[x,y]=pos(p,F.t,p.v0),vy=p.g*Math.min(F.t,p.T),done=F.t>=p.T-1e-9;
  const rows=[['Thời gian rơi t = √(2h/g)',fmt(p.T,2)+' s'],['Vận tốc chạm đất',fmt(Math.hypot(p.v0,p.g*p.T),2)+' m/s']];
  if(F.mode==='ngang')rows.push(['Tầm xa L = v₀·√(2h/g)',fmt(p.L,2)+' m']);
  rows.push(['t hiện tại',fmt(F.t,2)+' s'],['Độ cao còn lại',fmt(Math.max(0,y),2)+' m'],['Vận tốc hiện tại',fmt(Math.hypot(p.v0,vy),2)+' m/s']);$('flInfo').innerHTML=kv(rows);
  $('flV2').textContent=done&&p.both?'Hai vật chạm đất cùng lúc: theo phương thẳng đứng, vật ném ngang chuyển động giống hệt vật rơi tự do.':F.mode==='ngang'?'Ném ngang = chuyển động thẳng đều theo phương ngang + rơi tự do theo phương thẳng đứng.':'Rơi tự do: chuyển động thẳng nhanh dần đều với gia tốc g, quãng đường tăng theo t².';draw()}
const draw=canvasOf($('cFall'),(c,w,h)=>{const p=prm(),W=Math.max(p.L*1.2+4,p.h*.55,14),s=Math.min((w-110)/W,(h-50)/(p.h*1.06)),x0=74,y0=h-28,X=x=>x0+x*s,Y=y=>y0-y*s;
  c.fillStyle=rgba('ink',.1);c.fillRect(x0-44,Y(p.h),44,y0-Y(p.h));c.strokeStyle=css('muted');c.lineWidth=1.5;c.strokeRect(x0-44,Y(p.h),44,y0-Y(p.h));
  c.fillStyle=rgba('ink',.12);for(let y=Y(p.h)+8;y<y0-8;y+=16)for(let x=x0-38;x<x0-8;x+=14)c.fillRect(x,y,8,9);
  c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();c.moveTo(0,y0);c.lineTo(w,y0);c.stroke();
  c.fillStyle=css('muted');c.font=font(400,10,'f-mono');const hs=niceStep(p.h,6);c.textAlign='right';c.textBaseline='middle';for(let y=0;y<=p.h+1e-9;y+=hs)c.fillText(y+' m',x0-48,Y(y));
  if(p.v0){c.textAlign='center';c.textBaseline='top';const xs=niceStep(W,6);for(let x=xs;x<=W;x+=xs)c.fillText(x+' m',X(x),y0+4)}
  const balls=[[p.v0,css('accent')]];if(p.both)balls.push([0,css('amber')]);
  balls.forEach(([v0,col])=>{c.setLineDash([4,5]);c.strokeStyle=col;c.globalAlpha=.35;c.lineWidth=1.5;c.beginPath();for(let i=0;i<=80;i++){const[a,b]=pos(p,p.T*i/80,v0);i?c.lineTo(X(a),Y(b)):c.moveTo(X(a),Y(b))}c.stroke();c.setLineDash([]);c.globalAlpha=1});
  if($('flStrobe').checked)for(let k=0;k*.2<=Math.min(F.t,p.T)+1e-9;k++){const t=k*.2,pts=balls.map(([v0])=>pos(p,t,v0));
    if(pts.length>1){c.setLineDash([2,3]);c.strokeStyle=rgba('muted',.6);c.lineWidth=1;c.beginPath();c.moveTo(X(pts[1][0]),Y(pts[1][1]));c.lineTo(X(pts[0][0]),Y(pts[0][1]));c.stroke();c.setLineDash([])}
    balls.forEach(([,col],i)=>{c.fillStyle=col;c.globalAlpha=.45;c.beginPath();c.arc(X(pts[i][0]),Y(pts[i][1]),5,0,7);c.fill();c.globalAlpha=1})}
  balls.forEach(([v0,col])=>{const[a,b]=pos(p,F.t,v0);c.fillStyle=col;c.beginPath();c.arc(X(a),Y(b),9,0,7);c.fill();c.strokeStyle=css('ink');c.lineWidth=1.5;c.stroke()});
  if(F.t>=p.T-1e-9&&p.v0){c.fillStyle=css('red');c.font=font(700,12);c.textAlign='center';c.textBaseline='bottom';c.fillText('L = '+fmt(p.L,1)+' m',X(p.L),y0-12)}});
document.querySelectorAll('#p-fall [data-fm]').forEach(b=>b.onclick=()=>{F.mode=b.dataset.fm;up(true)});
$('flGo').onclick=()=>{F.t=0;F.play=true;up(false)};$('flReset').onclick=()=>up(true);
['flH','flV','flG','flBoth','flStrobe'].forEach(id=>$(id).addEventListener('input',()=>up(true)));
TICK.fall=dt=>{if(!F.play)return;const p=prm();F.t=Math.min(p.T,F.t+dt*(p.T>3?1.4:.8));if(F.t>=p.T)F.play=false;up(false)};up(true)}

/* ---------- tổng hợp lực ---------- */
{const S={th1:0,sg:1,drag:0,O:[0,0],sc:1};const R2=Math.PI/180;
function vec(){const F1=+$('foF1').value,F2=+$('foF2').value,al=+$('foA').value,t1=S.th1*R2,t2=(S.th1+S.sg*al)*R2,f1=[F1*Math.cos(t1),F1*Math.sin(t1)],f2=[F2*Math.cos(t2),F2*Math.sin(t2)],R=[f1[0]+f2[0],f1[1]+f2[1]];return{F1,F2,al,f1,f2,R,F:Math.hypot(...R)}}
function up(){const v=vec();$('ofoF1').textContent=fmt(v.F1)+' N';$('ofoF2').textContent=fmt(v.F2)+' N';$('ofoA').textContent=v.al+'°';presetSync('#p-force [data-fa]','fa',v.al);
  const beta=v.F>1e-9?Math.acos(Math.max(-1,Math.min(1,(v.R[0]*v.f1[0]+v.R[1]*v.f1[1])/(v.F*(v.F1||1)))))/R2:0;
  $('foInfo').innerHTML=kv([['Độ lớn hợp lực F',fmt(v.F,2)+' N'],['Góc giữa F và F₁',v.F1&&v.F>1e-9?fmt(beta,1)+'°':'—'],['Giới hạn |F₁ − F₂| ≤ F ≤ F₁ + F₂',`${fmt(Math.abs(v.F1-v.F2),1)} ≤ ${fmt(v.F,1)} ≤ ${fmt(v.F1+v.F2,1)}`]]);
  $('foV').textContent=v.al===0?'α = 0°: hai lực cùng chiều, F = F₁ + F₂ (lớn nhất).':v.al===180?'α = 180°: hai lực ngược chiều, F = |F₁ − F₂| (nhỏ nhất).':v.al===90?'α = 90°: F = √(F₁² + F₂²).':'Góc α càng lớn thì hợp lực càng nhỏ.';draw()}
const draw=canvasOf($('cForce'),(c,w,h)=>{const v=vec(),m=Math.max(10,v.F,v.F1,v.F2),s=Math.min(w,h)*.4/m,O=[w/2,h/2+10];S.O=O;S.sc=s;const P=u=>[O[0]+u[0]*s,O[1]-u[1]*s];
  c.strokeStyle=css('grid');c.lineWidth=1;const gs=s>=14?s:2*s;for(let x=O[0]%gs;x<w;x+=gs){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke()}for(let y=O[1]%gs;y<h;y+=gs){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='left';c.textBaseline='top';c.fillText('Mỗi ô: '+(gs===s?'1 N':'2 N'),10,8);
  const a=P(v.f1),b=P(v.f2),r=P(v.R);c.setLineDash([5,5]);c.strokeStyle=css('muted');c.lineWidth=1.3;c.beginPath();c.moveTo(...a);c.lineTo(...r);c.moveTo(...b);c.lineTo(...r);c.stroke();c.setLineDash([]);
  const arrow=(to,col,lw,lab,dash)=>{if(Math.hypot(to[0]-O[0],to[1]-O[1])<3)return;c.strokeStyle=c.fillStyle=col;c.lineWidth=lw;c.setLineDash(dash?[6,4]:[]);c.beginPath();c.moveTo(...O);c.lineTo(...to);c.stroke();c.setLineDash([]);const an=Math.atan2(to[1]-O[1],to[0]-O[0]);arrowHead(c,to[0],to[1],an,12);
    c.font=font(700,14);c.textAlign='center';c.textBaseline='middle';c.fillText(lab,to[0]+18*Math.cos(an),to[1]+18*Math.sin(an))};
  if($('foBal').checked)arrow(P([-v.R[0],-v.R[1]]),css('amber'),2.4,'F₃',true);
  arrow(a,css('accent'),3,'F₁');arrow(b,css('green'),3,'F₂');arrow(r,css('red'),4.2,'F');
  const t1=Math.atan2(-v.f1[1],v.f1[0]),t2=Math.atan2(-v.f2[1],v.f2[0]);if(v.F1&&v.F2&&v.al>0){let d=t2-t1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;c.strokeStyle=css('ink');c.lineWidth=1.5;c.beginPath();c.arc(O[0],O[1],30,t1,t1+d,d<0);c.stroke();
    c.fillStyle=css('ink');c.font=font(700,12);c.textAlign='center';c.textBaseline='middle';c.fillText('α',O[0]+44*Math.cos(t1+d/2),O[1]+44*Math.sin(t1+d/2))}
  c.fillStyle=css('ink');c.fillRect(O[0]-9,O[1]-9,18,18);[[a,'accent'],[b,'green']].forEach(([p,t])=>{c.strokeStyle=css(t);c.lineWidth=2;c.beginPath();c.arc(p[0],p[1],9,0,7);c.stroke()})});
drag($('cForce'),(x,y,dx,dy,t)=>{const v=vec(),s=S.sc,O=S.O,P=u=>[O[0]+u[0]*s,O[1]-u[1]*s];
  if(t==='down'){const a=P(v.f1),b=P(v.f2),da=Math.hypot(x-a[0],y-a[1]),db=Math.hypot(x-b[0],y-b[1]);S.drag=Math.min(da,db)<30?(da<=db?1:2):0;return}
  if(t!=='move'||!S.drag)return;const mag=Math.min(10,Math.round(Math.hypot(x-O[0],y-O[1])/s*2)/2),ang=Math.atan2(O[1]-y,x-O[0])/R2,th2=S.th1+S.sg*v.al;
  if(S.drag===1){$('foF1').value=mag;S.th1=ang}else{$('foF2').value=mag}
  let d=(S.drag===1?th2:ang)-S.th1;while(d>180)d-=360;while(d<-180)d+=360;S.sg=d<0?-1:1;$('foA').value=Math.round(Math.abs(d));up()});
document.querySelectorAll('#p-force [data-fa]').forEach(b=>b.onclick=()=>{$('foA').value=b.dataset.fa;up()});
['foF1','foF2','foA','foBal'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- va chạm ---------- */
{const C={type:'mem',run:false,x1:2,x2:7,u1:0,u2:0,hit:false,after:0,stuck:false};
const prm=()=>({m1:+$('coM1').value,v1:+$('coV1').value,m2:+$('coM2').value,v2:+$('coV2').value});
const wid=m=>.5+.22*m;
function outV(p){if(C.type==='mem'){const V=(p.m1*p.v1+p.m2*p.v2)/(p.m1+p.m2);return[V,V]}return[((p.m1-p.m2)*p.v1+2*p.m2*p.v2)/(p.m1+p.m2),((p.m2-p.m1)*p.v2+2*p.m1*p.v1)/(p.m1+p.m2)]}
function reset(){const p=prm();Object.assign(C,{run:false,x1:2,x2:7,u1:p.v1,u2:p.v2,hit:false,after:0,stuck:false});up()}
function up(){const p=prm();presetSync('#p-collide [data-ct]','ct',C.type);['M1','V1','M2','V2'].forEach(k=>$('oco'+k).textContent=fmt(+$('co'+k).value)+(k[0]==='M'?' kg':' m/s'));
  const[w1,w2]=outV(p),meet=p.v1>p.v2,pB=p.m1*p.v1+p.m2*p.v2,pA=p.m1*w1+p.m2*w2,KB=.5*p.m1*p.v1**2+.5*p.m2*p.v2**2,KA=.5*p.m1*w1**2+.5*p.m2*w2**2;
  $('coInfo').innerHTML=kv([['Vận tốc sau: v₁′, v₂′',meet?`${fmt(w1,2)}; ${fmt(w2,2)} m/s`:'—'],['Động lượng trước p = m₁v₁ + m₂v₂',fmt(pB,2)+' kg·m/s'],['Động lượng sau p′',meet?fmt(pA,2)+' kg·m/s':'—'],['Động năng trước',fmt(KB,2)+' J'],['Động năng sau',meet?fmt(KA,2)+' J':'—']]);
  const V=$('coV');V.className='verdict'+(meet?' ok':' bad');
  V.textContent=!meet?'Với các vận tốc này hai xe không gặp nhau (xe 1 phải chạy nhanh hơn xe 2 theo chiều dương).':C.type==='mem'?`Động lượng được bảo toàn. Động năng giảm ${fmt(KB-KA,2)} J, chuyển thành nhiệt và làm biến dạng hai xe.`:(p.m1===p.m2?'Động lượng và động năng đều bảo toàn. Hai xe cùng khối lượng nên trao đổi vận tốc cho nhau.':'Va chạm đàn hồi: cả động lượng và động năng đều được bảo toàn.');draw()}
const draw=canvasOf($('cCol'),(c,w,h)=>{const p=prm(),sx=(w-40)/10,X=x=>20+x*sx,ty=h*.42;
  c.fillStyle=rgba('ink',.1);c.fillRect(10,ty,w-20,8);c.fillStyle=css('muted');c.font=font(400,10,'f-mono');c.textAlign='center';c.textBaseline='top';for(let x=0;x<=10;x++){c.fillRect(X(x),ty+8,1,5);c.fillText(x+' m',X(x),ty+15)}
  const cart=(x,m,col,lab,u)=>{const W=wid(m)*sx,H=24+6*m;c.fillStyle=col;c.fillRect(X(x)-W/2,ty-H-10,W,H);c.strokeStyle=css('ink');c.lineWidth=1.5;c.strokeRect(X(x)-W/2,ty-H-10,W,H);
    c.fillStyle='#10162f';[-W/3,W/3].forEach(d=>{c.beginPath();c.arc(X(x)+d,ty-5,6,0,7);c.fill()});c.fillStyle='#fff';c.font=font(700,12);c.textAlign='center';c.textBaseline='middle';c.fillText(lab,X(x),ty-H/2-10);
    if(Math.abs(u)>.05){const L=u*18,yA=ty-H-24;c.strokeStyle=c.fillStyle=css('ink');c.lineWidth=2;c.beginPath();c.moveTo(X(x),yA);c.lineTo(X(x)+L,yA);c.stroke();arrowHead(c,X(x)+L,yA,u>0?0:Math.PI,8);c.font=font(600,11,'f-mono');c.textBaseline='bottom';c.fillText(fmt(u,1)+' m/s',X(x)+L/2,yA-4)}};
  cart(C.x1,p.m1,css('accent'),'1',C.u1);cart(C.x2,p.m2,css('amber'),'2',C.u2);
  const[w1,w2]=outV(p),meet=p.v1>p.v2,rows=[['p trước',[p.m1*p.v1,p.m2*p.v2]],['p sau',meet?[p.m1*w1,p.m2*w2]:null],['Wđ trước',[.5*p.m1*p.v1**2,.5*p.m2*p.v2**2]],['Wđ sau',meet?[.5*p.m1*w1**2,.5*p.m2*w2**2]:null]];
  const by=h*.6,bh=Math.min(26,(h-by-20)/4-6),mx=Math.max(1,...rows.flatMap(r=>r[1]?[Math.abs(r[1][0])+Math.abs(r[1][1])]:[])),cx=w/2+30,sc=(w/2-60)/mx;
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(cx,by-6);c.lineTo(cx,by+4*(bh+8));c.stroke();
  rows.forEach(([lab,v],i)=>{const y=by+i*(bh+8);c.fillStyle=css('ink');c.font=font(600,12);c.textAlign='left';c.textBaseline='middle';c.fillText(lab,14,y+bh/2);
    if(!v){c.fillStyle=css('muted');c.textAlign='left';c.fillText('—',cx+6,y+bh/2);return}
    let pos=cx,neg=cx;v.forEach((q,j)=>{const L=Math.abs(q)*sc;c.fillStyle=j?css('amber'):css('accent');if(q>=0){c.fillRect(pos,y,L,bh);pos+=L}else{neg-=L;c.fillRect(neg,y,L,bh)}});
    c.fillStyle=css('ink');c.font=font(700,11,'f-mono');c.textAlign='left';c.fillText(fmt(v[0]+v[1],2),Math.max(pos,cx)+6,y+bh/2)});
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='left';c.textBaseline='top';c.fillText('Xanh: xe 1 · Vàng: xe 2 · Tổng ghi bên phải',14,10)});
TICK.collide=dt=>{if(!C.run)return;const p=prm();C.x1+=C.u1*dt;C.x2+=C.u2*dt;
  if(!C.hit&&C.x2-C.x1<=(wid(p.m1)+wid(p.m2))/2&&C.u1>C.u2){const[w1,w2]=outV(p);C.u1=w1;C.u2=w2;C.hit=true;C.stuck=C.type==='mem'}
  if(C.stuck)C.x2=C.x1+(wid(p.m1)+wid(p.m2))/2;if(C.hit)C.after+=dt;
  if(C.after>3||C.x1<-1||C.x2>11||(!C.hit&&(C.x1>11||C.x2<-1)))C.run=false;draw()};
document.querySelectorAll('#p-collide [data-ct]').forEach(b=>b.onclick=()=>{C.type=b.dataset.ct;reset()});
$('coGo').onclick=()=>{reset();C.run=true};$('coReset').onclick=reset;['coM1','coV1','coM2','coV2'].forEach(id=>$(id).addEventListener('input',reset));reset()}

/* ---------- dao động điều hoà ---------- */
{const H={t:0,play:!reduced,ph:0};
const prm=()=>{const A=+$('shA').value,k=+$('shK').value,m=+$('shM').value,w=Math.sqrt(k/m);return{A,k,m,w,T:2*Math.PI/w,phi:H.ph*Math.PI}};
const X_=(p,t)=>p.A*Math.cos(p.w*t+p.phi),V_=(p,t)=>-p.w*p.A*Math.sin(p.w*t+p.phi),A_=(p,t)=>-p.w*p.w*X_(p,t);
const phiTxt=ph=>ph===0?'':ph===1?' + π':ph===.5?' + π/2':' − π/2';
function up(reset){const p=prm();if(reset)H.t=0;$('oshA').textContent=fmt(p.A)+' cm';$('oshK').textContent=p.k+' N/m';$('oshM').textContent=fmt(p.m,2)+' kg';presetSync('#p-shm [data-ph]','ph',H.ph);
  $('shEq').textContent=`x = ${fmt(p.A)}·cos(${fmt(p.w,2)}t${phiTxt(H.ph)}) (cm)`;
  $('shInfo').innerHTML=kv([['ω = √(k/m)',fmt(p.w,2)+' rad/s'],['T = 2π/ω',fmt(p.T,3)+' s'],['v max = ωA',fmt(p.w*p.A,1)+' cm/s'],['a max = ω²A',fmt(p.w*p.w*p.A/100,2)+' m/s²'],['x lúc này',fmt(X_(p,H.t),2)+' cm'],['v lúc này',fmt(V_(p,H.t),1)+' cm/s']]);draw()}
const draw=canvasOf($('cShm'),(c,w,h)=>{const p=prm(),wide=w>=700,lw=wide?w*.42:w,lh=wide?h:h*.52,R=Math.min(lw*.3,lh*.26),cx=lw/2+10,cy=lh*.32,sy=lh*.8,Xp=x=>cx+x/p.A*R,ang=p.w*H.t+p.phi;
  c.strokeStyle=css('gridStrong');c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();c.strokeStyle=css('grid');c.beginPath();c.moveTo(cx-R-10,cy);c.lineTo(cx+R+10,cy);c.stroke();
  const mx=cx+R*Math.cos(ang),my=cy-R*Math.sin(ang);c.strokeStyle=css('accent');c.lineWidth=2;c.beginPath();c.moveTo(cx,cy);c.lineTo(mx,my);c.stroke();c.fillStyle=css('accent');c.beginPath();c.arc(mx,my,6,0,7);c.fill();
  c.font=font(600,11);c.fillStyle=css('muted');c.textAlign='left';c.textBaseline='top';c.fillText('Chuyển động tròn đều, tốc độ góc ω',8,8);
  const xb=Xp(X_(p,H.t));c.setLineDash([4,4]);c.strokeStyle=rgba('accent',.6);c.lineWidth=1.2;c.beginPath();c.moveTo(mx,my);c.lineTo(xb,sy-14);c.stroke();
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(cx,cy+R+6);c.lineTo(cx,sy+24);c.stroke();c.setLineDash([]);
  c.fillStyle=css('ink');c.fillRect(cx-R-46,sy-34,8,48);c.strokeStyle=css('ink');c.lineWidth=1.6;const s0=cx-R-38,s1=xb-16,n=14;c.beginPath();c.moveTo(s0,sy-10);
  for(let i=1;i<n;i++)c.lineTo(s0+(s1-s0)*i/n,sy-10+(i%2?-8:8));c.lineTo(s1,sy-10);c.stroke();
  c.fillStyle=css('accent');c.fillRect(xb-16,sy-26,32,32);c.strokeStyle=css('ink');c.strokeRect(xb-16,sy-26,32,32);c.fillStyle='#fff';c.font=font(700,12);c.textAlign='center';c.textBaseline='middle';c.fillText('m',xb,sy-10);
  c.fillStyle=css('ink');c.fillRect(cx-R-46,sy+6,2*R+80,2);c.fillStyle=css('muted');c.font=font(600,11,'f-mono');c.textBaseline='top';[[-p.A,'−A'],[0,'O'],[p.A,'A']].forEach(([x,t])=>c.fillText(t,Xp(x),sy+12));
  const v=V_(p,H.t),a=A_(p,H.t);[[v/(p.w*p.A),css('green'),'v',-38],[a/(p.w*p.w*p.A),css('red'),'a',-48]].forEach(([r,col,t,dy])=>{if(Math.abs(r)<.03)return;const L=r*R*.8;c.strokeStyle=c.fillStyle=col;c.lineWidth=2.4;c.beginPath();c.moveTo(xb,sy+dy+2);c.lineTo(xb+L,sy+dy+2);c.stroke();arrowHead(c,xb+L,sy+dy+2,L>0?0:Math.PI,8);c.font=font(700,11);c.textAlign='center';c.textBaseline='bottom';c.fillText(t,xb+L,sy+dy-2)});
  const gx=wide?lw+40:44,gw=w-gx-16,gy=wide?28:lh+18,gh=((wide?h:h-lh)-(wide?40:30))/3-22,Tw=Math.min(8,Math.max(2,2*p.T)),t0=Math.max(0,H.t-Tw),t1=Math.max(Tw,H.t);
  miniPlot(c,{x:gx,y:gy,w:gw,h:gh,t0,t1,yMin:-p.A,yMax:p.A,col:css('accent'),title:'x (cm)',fn:t=>X_(p,t),tNow:H.t});
  miniPlot(c,{x:gx,y:gy+gh+30,w:gw,h:gh,t0,t1,yMin:-p.w*p.A,yMax:p.w*p.A,col:css('green'),title:'v (cm/s)',fn:t=>V_(p,t),tNow:H.t});
  miniPlot(c,{x:gx,y:gy+2*(gh+30),w:gw,h:gh,t0,t1,yMin:-p.w*p.w*p.A,yMax:p.w*p.w*p.A,col:css('red'),title:'a (cm/s²)',fn:t=>A_(p,t),tNow:H.t})});
document.querySelectorAll('#p-shm [data-ph]').forEach(b=>b.onclick=()=>{H.ph=+b.dataset.ph;up(true)});
$('shPlay').textContent=H.play?'Tạm dừng':'Chạy';$('shPlay').onclick=()=>{H.play=!H.play;$('shPlay').textContent=H.play?'Tạm dừng':'Chạy'};$('shReset').onclick=()=>up(true);
['shA','shK','shM'].forEach(id=>$(id).addEventListener('input',()=>up(true)));
TICK.shm=dt=>{if(!H.play)return;const p=prm();H.t+=dt*(p.T<.4?.25:p.T<1?.5:1);up(false)};up(true)}

/* ---------- điện trường ---------- */
{const E={q:[],sign:1,drag:-1,hover:null,lines:null,preset:'dip'},kC=9e9,Q=2e-6,WM=.4;
const PRE={one:[[.5,.5,1]],dip:[[.36,.5,1],[.64,.5,-1]],same:[[.36,.5,1],[.64,.5,1]],plate:[...Array(9)].flatMap((_,i)=>[[.26+i*.06,.32,1],[.26+i*.06,.68,-1]])};
function load(k){E.preset=k;E.q=PRE[k].map(([x,y,s])=>({x,y,s,qv:(k==='plate'?.3:1)*Q*s}));up()}
let W=1,Hh=1;
function field(px,py){let ex=0,ey=0;for(const q of E.q){const dx=(px-q.x*W)/W*WM,dy=(py-q.y*Hh)/W*WM,r2=dx*dx+dy*dy+1e-6,r=Math.sqrt(r2),f=kC*q.qv/(r2*r);ex+=f*dx;ey+=f*dy}return[ex,ey]}
function up(){presetSync('#p-efield [data-ep]','ep',E.preset);presetSync('#p-efield [data-es]','es',E.sign);E.lines=null;info();draw()}
function info(){const rows=[['Số điện tích',E.q.length],['Mỗi điện tích',E.preset==='plate'?'± 0,6 μC':'± 2 μC']];
  if(E.hover){const[ex,ey]=field(...E.hover),m=Math.hypot(ex,ey),[a,b]=m.toExponential(2).split('e');rows.push(['E tại con trỏ',`${a.replace('.',DEC)}·10${sup(+b).replace('-','⁻')} V/m`])}else rows.push(['E tại con trỏ','rê chuột lên hình']);
  $('efInfo').innerHTML=kv(rows)}
function trace(){const lines=[],pos=E.q.filter(q=>q.s>0),src=pos.length?pos:E.q,dir=pos.length?1:-1,n=E.q.length>6?6:16;
  src.forEach(q=>{for(let i=0;i<n;i++){const a=i/n*2*Math.PI+.2;let x=q.x*W+14*Math.cos(a),y=q.y*Hh+14*Math.sin(a);const pts=[[x,y]];
    for(let k=0;k<700;k++){const[ex,ey]=field(x,y),m=Math.hypot(ex,ey)||1;x+=dir*4*ex/m;y+=dir*4*ey/m;pts.push([x,y]);if(x<-20||y<-20||x>W+20||y>Hh+20)break;if(E.q.some(o=>o.s===-dir&&Math.hypot(x-o.x*W,y-o.y*Hh)<10))break}
    lines.push({pts,dir})}});return lines}
const draw=canvasOf($('cEf'),(c,w,h)=>{if(W!==w||Hh!==h){W=w;Hh=h;E.lines=null}if(!E.lines)E.lines=trace();
  if($('efVec').checked){for(let y=24;y<h;y+=36)for(let x=24;x<w;x+=36){const[ex,ey]=field(x,y),m=Math.hypot(ex,ey);if(!m)continue;const L=13,a=Math.min(1,Math.log10(m)/8);c.strokeStyle=c.fillStyle=rgba('muted',.25+.6*a);c.lineWidth=1.3;c.beginPath();c.moveTo(x-L/2*ex/m,y-L/2*ey/m);c.lineTo(x+L/2*ex/m,y+L/2*ey/m);c.stroke();arrowHead(c,x+L/2*ex/m,y+L/2*ey/m,Math.atan2(ey,ex),5)}}
  c.strokeStyle=css('accent');c.fillStyle=css('accent');c.lineWidth=1.6;E.lines.forEach(l=>{c.beginPath();l.pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();
    const k=Math.min(l.pts.length-2,Math.floor(l.pts.length*.35));if(k>1){const p=l.pts[k],q=l.pts[k+1],an=Math.atan2(q[1]-p[1],q[0]-p[0])+(l.dir<0?Math.PI:0);arrowHead(c,q[0],q[1],an,8)}});
  E.q.forEach(q=>{const x=q.x*w,y=q.y*h;c.fillStyle=q.s>0?css('red'):css('rain');c.beginPath();c.arc(x,y,13,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2.4;c.beginPath();c.moveTo(x-6,y);c.lineTo(x+6,y);if(q.s>0){c.moveTo(x,y-6);c.lineTo(x,y+6)}c.stroke()});
  if(E.hover){const[x,y]=E.hover,[ex,ey]=field(x,y),m=Math.hypot(ex,ey);if(m){c.strokeStyle=c.fillStyle=css('amber');c.lineWidth=2.4;c.beginPath();c.moveTo(x,y);c.lineTo(x+30*ex/m,y+30*ey/m);c.stroke();arrowHead(c,x+30*ex/m,y+30*ey/m,Math.atan2(ey,ex),9);c.beginPath();c.arc(x,y,3.5,0,7);c.fill()}}
  if(!E.q.length){c.fillStyle=css('muted');c.font=font(500,14);c.textAlign='center';c.textBaseline='middle';c.fillText('Bấm vào hình để đặt điện tích, hoặc chọn một hệ điện tích có sẵn.',w/2,h/2)}});
drag($('cEf'),(x,y,dx,dy,t)=>{if(t==='down'){E.drag=E.q.findIndex(q=>Math.hypot(x-q.x*W,y-q.y*Hh)<18);if(E.drag<0){E.q.push({x:x/W,y:y/Hh,s:E.sign,qv:E.sign*Q});E.preset='';up()}return}
  if(t==='move'&&E.drag>=0){const q=E.q[E.drag];q.x=Math.max(.03,Math.min(.97,x/W));q.y=Math.max(.04,Math.min(.96,y/Hh));E.lines=null;E.hover=null;draw()}if(t==='up'){E.drag=-1;up()}});
$('cEf').addEventListener('pointermove',e=>{if(E.drag>=0)return;const r=$('cEf').getBoundingClientRect();E.hover=[e.clientX-r.left,e.clientY-r.top];info();draw()});
$('cEf').addEventListener('pointerleave',()=>{E.hover=null;info();draw()});
document.querySelectorAll('#p-efield [data-ep]').forEach(b=>b.onclick=()=>load(b.dataset.ep));
document.querySelectorAll('#p-efield [data-es]').forEach(b=>b.onclick=()=>{E.sign=+b.dataset.es;up()});
$('efVec').addEventListener('change',draw);$('efClear').onclick=()=>{E.q=[];E.preset='';up()};load('dip')}

/* ---------- electron trong dây dẫn ---------- */
{const BW=800,BH=230,D={on:false,el:[],cross:[],time:0,acc:0};
const vth=()=>95*Math.sqrt((+$('drT').value+273)/298),tau=()=>.3*298/(+$('drT').value+273);
function rv(){const a=Math.random()*2*Math.PI,s=vth()*(.6+.8*Math.random());return[s*Math.cos(a),s*Math.sin(a)]}
for(let i=0;i<70;i++){const[vx,vy]=rv();D.el.push({x:Math.random()*BW,y:10+Math.random()*(BH-20),vx,vy})}
function up(){$('odrU').textContent=fmt(+$('drU').value)+' V';$('odrT').textContent=$('drT').value+' °C';$('drK').textContent=D.on?'Mở khoá K':'Đóng khoá K';info();draw()}
function info(){const win=4,n=D.cross.filter(c=>c[0]>D.time-win).reduce((s,c)=>s+c[1],0),drift=D.el.reduce((s,e)=>s+e.vx,0)/D.el.length;
  $('drInfo').innerHTML=kv([['Khoá K',D.on?'đóng':'mở'],['Số electron qua tiết diện mỗi giây',fmt(n/win,1)],['Vận tốc trôi trung bình',fmt(-drift,1)+' (đơn vị mô phỏng)']]);
  $('drV').textContent=D.on?'Electron vẫn chuyển động hỗn loạn nhưng trôi dần ngược chiều điện trường, tạo thành dòng điện. Chiều dòng điện quy ước ngược chiều chuyển động của electron.':'Chưa có điện trường: electron chuyển động nhiệt hỗn loạn theo mọi hướng, số electron đi qua tiết diện theo hai chiều bằng nhau nên không có dòng điện.'}
function step(dt){const a=D.on?42*(+$('drU').value):0,ta=tau(),mid=BW/2;D.time+=dt;
  D.el.forEach(e=>{const x0=e.x;e.vx-=a*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.y<8){e.y=8;e.vy=Math.abs(e.vy)}if(e.y>BH-8){e.y=BH-8;e.vy=-Math.abs(e.vy)}
    if(x0>=mid&&e.x<mid)D.cross.push([D.time,1]);else if(x0<mid&&e.x>=mid)D.cross.push([D.time,-1]);
    if(e.x<0)e.x+=BW;if(e.x>BW)e.x-=BW;if(Math.random()<dt/ta){const[vx,vy]=rv();e.vx=vx;e.vy=vy}});
  D.cross=D.cross.filter(c=>c[0]>D.time-5)}
const draw=canvasOf($('cDrift'),(c,w,h)=>{const s=Math.min((w-60)/BW,(h-130)/BH),ox=(w-BW*s)/2,oy=70,X=x=>ox+x*s,Y=y=>oy+y*s,jit=+$('drT').value/300*2+.4;
  c.fillStyle=rgba('amber',.12);c.fillRect(X(0),Y(0),BW*s,BH*s);c.strokeStyle=css('ink');c.lineWidth=2;c.strokeRect(X(0),Y(0),BW*s,BH*s);
  c.fillStyle=css('red');for(let i=0;i<16;i++)for(let j=0;j<5;j++){const x=X(25+50*i)+(Math.random()-.5)*jit*2,y=Y(23+46*j)+(Math.random()-.5)*jit*2;c.globalAlpha=.85;c.beginPath();c.arc(x,y,7*s+2,0,7);c.fill();c.globalAlpha=1;
    c.strokeStyle='#fff';c.lineWidth=1.4;c.beginPath();c.moveTo(x-3,y);c.lineTo(x+3,y);c.moveTo(x,y-3);c.lineTo(x,y+3);c.stroke()}
  c.fillStyle=css('accent');D.el.forEach(e=>{c.beginPath();c.arc(X(e.x),Y(e.y),3.6*s+1.5,0,7);c.fill()});
  c.setLineDash([5,4]);c.strokeStyle=css('ink');c.lineWidth=1.4;c.beginPath();c.moveTo(X(BW/2),Y(0)-10);c.lineTo(X(BW/2),Y(BH)+10);c.stroke();c.setLineDash([]);
  c.fillStyle=css('ink');c.font=font(600,11);c.textAlign='center';c.textBaseline='top';c.fillText('Tiết diện S',X(BW/2),Y(BH)+12);
  c.font=font(700,16);c.textBaseline='middle';c.fillStyle=css('red');c.fillText('+',X(0)-14,Y(BH/2));c.fillStyle=css('rain');c.fillText('−',X(BW)+14,Y(BH/2));
  if(D.on){const ar=(y,x1,x2,col,t)=>{c.strokeStyle=c.fillStyle=col;c.lineWidth=2.6;c.beginPath();c.moveTo(x1,y);c.lineTo(x2,y);c.stroke();arrowHead(c,x2,y,x2>x1?0:Math.PI,10);c.font=font(700,12);c.textAlign='center';c.textBaseline='bottom';c.fillText(t,(x1+x2)/2,y-5)};
    ar(oy-38,X(BW*.08),X(BW*.38),css('amber'),'Điện trường E');ar(oy-38,X(BW*.62),X(BW*.92),css('red'),'Chiều dòng điện I');ar(Y(BH)+48,X(BW*.7),X(BW*.3),css('accent'),'Electron trôi ngược chiều E')}
  else{c.fillStyle=css('muted');c.font=font(600,12);c.textAlign='center';c.textBaseline='bottom';c.fillText('Khoá K đang mở: chưa có điện trường trong dây',w/2,oy-24)}});
TICK.drift=dt=>{step(dt*(reduced?.3:1));D.acc+=dt;if(D.acc>.3){D.acc=0;info()}draw()};
$('drK').onclick=()=>{D.on=!D.on;D.cross=[];up()};['drU','drT'].forEach(id=>$(id).addEventListener('input',up));up()}
