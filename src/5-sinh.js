
/* ================= SINH: Mendel ================= */
{const norm=s=>s[0]===s[0].toLowerCase()&&s[1]===s[1].toUpperCase()?s[1]+s[0]:s,uniq=a=>[...new Set(a)];
const gam=(gA,gB,di)=>{const A=uniq(gA.split(''));if(!di)return A;const B=uniq(gB.split(''));return A.flatMap(a=>B.map(b=>a+b))};
const child=(g1,g2,di)=>{const a=norm(g1[0]+g2[0]);return di?a+norm(g1[1]+g2[1]):a};
const pheno=(g,di)=>{const col=/A/.test(g)?'Vàng':'Xanh';return di?col+', '+(/B/.test(g)?'trơn':'nhăn'):col};
const pea=p=>`<span class="pea${/nhăn/.test(p)?' wr':''}" style="background:${p.startsWith('Vàng')?'#e6c23a':'#7aac3e'}" aria-hidden="true"></span>`;
const B={};
function up(){const di=$('bDi').checked;$('b1B').disabled=$('b2B').disabled=!di;const p1A=$('b1A').value,p2A=$('b2A').value,p1B=$('b1B').value,p2B=$('b2B').value;
  const G1=gam(p1A,p1B,di),G2=gam(p2A,p2B,di),g1t=di?p1A+p1B:p1A,g2t=di?p2A+p2B:p2A;
  $('bCross').textContent=`P: ${g1t} (${pheno(g1t,di)}) × ${g2t} (${pheno(g2t,di)})`;
  const geno={},ph={};let rows='<tr><th>♀ \\ ♂</th>'+G2.map(g=>`<th>${g}</th>`).join('')+'</tr>';
  G1.forEach(a=>{rows+=`<tr><th>${a}</th>`;G2.forEach(b=>{const c=child(a,b,di),p=pheno(c,di);geno[c]=(geno[c]||0)+1;ph[p]=(ph[p]||0)+1;rows+=`<td><div class="cell">${pea(p)}<span>${c}</span></div></td>`});rows+='</tr>'});
  $('bTable').innerHTML=`<table>${rows}</table>`;
  const ord=o=>Object.entries(o).sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])),ratio=o=>{const v=Object.values(o),g=v.reduce(gcd);return ord(o).map(e=>e[1]/g).join(' : ')};
  $('bRatio').innerHTML=kv([['Số tổ hợp',G1.length*G2.length],['Tỉ lệ kiểu gen',ratio(geno)],['Các kiểu gen',ord(geno).map(e=>e[0]).join(', ')],['Tỉ lệ kiểu hình',ratio(ph)]]);
  Object.assign(B,{G1,G2,di,ph,total:G1.length*G2.length,obs:null});bars()}
function bars(){$('bBars').innerHTML=Object.entries(B.ph).sort((x,y)=>y[1]-x[1]).map(([p,n])=>{const e=n/B.total,o=B.obs?(B.obs[p]||0)/B.obsN:null;
    return`<div class="bar"><span>${pea(p)} ${p}</span><div class="track"><div class="obs" style="width:${(o??0)*100}%"></div><div class="exp" style="width:${e*100}%"></div></div><span>${fmt((o??e)*100,1)}%</span></div>`}).join('');
  $('bSowNote').textContent=B.obs?`Đã gieo ${B.obsN.toLocaleString('vi-VN')} hạt. Vạch đứt là tỉ lệ lí thuyết.`:'Gieo càng nhiều hạt, tỉ lệ quan sát càng gần tỉ lệ lí thuyết.'}
function sow(N){const o={};for(let i=0;i<N;i++){const a=B.G1[Math.random()*B.G1.length|0],b=B.G2[Math.random()*B.G2.length|0],p=pheno(child(a,b,B.di),B.di);o[p]=(o[p]||0)+1}B.obs=o;B.obsN=N;bars()}
['bDi','b1A','b2A','b1B','b2B'].forEach(id=>$(id).addEventListener('change',up));$('bSow').onclick=()=>sow(400);$('bSow2').onclick=()=>sow(8000);up();sow(400)}

/* ================= SINH: nguyên phân, giảm phân ================= */
{const BP=[[-.28,-.18,.6],[.22,-.24,-.5],[-.18,.22,2.1],[.3,.18,1]],LEN=[.34,.34,.2,.2],MAT=[1,0,1,0],YS=[-.42,-.14,.14,.42],SIDE=[-1,1,1,-1],PAIR=[[-.22,-.1,1.3],[.25,.15,.4]],V=Math.PI/2;
const ch=fn=>{const o=[];for(let c=0;c<4;c++)for(let s=0;s<2;s++)o.push(fn(c,s,s?1:-1));return o};
const perp=(a,o)=>[-Math.sin(a)*o,Math.cos(a)*o];
const big={x:0,y:0,rx:1.05,ry:.78},long={x:0,y:0,rx:1.18,ry:.7},nb=a=>({x:0,y:0,r:.55,a}),rep=(o,n)=>Array(n).fill(o);
const inter=n=>({ch:ch(c=>({x:BP[c][0],y:BP[c][1],a:BP[c][2],th:.15})),cells:rep(big,n),nuc:rep(nb(1),n),poles:[],sp:0});
const PL2=[[-.95,0],[.95,0]];
const MI=[inter(2),
  {ch:ch((c,s,k)=>{const o=perp(BP[c][2],k*.035);return{x:BP[c][0]+o[0],y:BP[c][1]+o[1],a:BP[c][2],th:1}}),cells:rep(big,2),nuc:rep(nb(.35),2),poles:PL2,sp:.35},
  {ch:ch((c,s,k)=>({x:k*.035,y:YS[c],a:V,th:1})),cells:rep(big,2),nuc:rep(nb(0),2),poles:PL2,sp:1},
  {ch:ch((c,s,k)=>({x:k*.66,y:YS[c]*.75,a:V,th:1})),cells:rep(long,2),nuc:rep(nb(0),2),poles:PL2,sp:1},
  {ch:ch((c,s,k)=>({x:k*.56+BP[c][0]*.3,y:YS[c]*.5,a:BP[c][2],th:.3})),cells:[{x:-.56,y:0,rx:.52,ry:.62},{x:.56,y:0,rx:.52,ry:.62}],nuc:[{x:-.56,y:0,r:.32,a:1},{x:.56,y:0,r:.32,a:1}],poles:[],sp:0}];
const L={x:-.56,y:0,rx:.52,ry:.66},R={x:.56,y:0,rx:.52,ry:.66},Lt={...L,ry:.76},Rt={...R,ry:.76},cx=c=>SIDE[c]*.56;
const PL4=[[-.56,-.66],[-.56,.66],[.56,-.66],[.56,.66]];
const ME=[inter(4),
  {ch:ch((c,s,k)=>{const P=PAIR[c>>1],o=perp(P[2],(c%2?.075:-.075)+k*.028);return{x:P[0]+o[0],y:P[1]+o[1],a:P[2],th:1}}),cells:rep(big,4),nuc:rep(nb(.35),4),poles:PL2,sp:.3},
  {ch:ch((c,s,k)=>({x:SIDE[c]*.08+k*.028,y:c<2?-.25:.25,a:V,th:1})),cells:rep(big,4),nuc:rep(nb(0),4),poles:PL2,sp:1},
  {ch:ch((c,s,k)=>({x:SIDE[c]*.66+k*.028,y:(c<2?-.25:.25)*.8,a:V,th:1})),cells:rep(long,4),nuc:rep(nb(0),4),poles:PL2,sp:1},
  {ch:ch((c,s,k)=>({x:cx(c)+k*.028,y:c<2?-.18:.18,a:V,th:.75})),cells:[L,L,R,R],nuc:[{x:-.56,y:0,r:.3,a:.5},{x:-.56,y:0,r:.3,a:.5},{x:.56,y:0,r:.3,a:.5},{x:.56,y:0,r:.3,a:.5}],poles:[],sp:0},
  {ch:ch((c,s,k)=>({x:cx(c)+(c<2?-.13:.15),y:k*.028,a:0,th:1})),cells:[L,L,R,R],nuc:[{x:-.56,y:0,r:.3,a:0},{x:-.56,y:0,r:.3,a:0},{x:.56,y:0,r:.3,a:0},{x:.56,y:0,r:.3,a:0}],poles:PL4,sp:1},
  {ch:ch((c,s,k)=>({x:cx(c)+(c<2?-.13:.15),y:k*.46,a:0,th:1})),cells:[Lt,Lt,Rt,Rt],nuc:[{x:-.56,y:0,r:.3,a:0},{x:-.56,y:0,r:.3,a:0},{x:.56,y:0,r:.3,a:0},{x:.56,y:0,r:.3,a:0}],poles:PL4,sp:1},
  {ch:ch((c,s,k)=>({x:cx(c)+(c<2?-.09:.11),y:k*.42,a:0,th:.35})),cells:[{x:-.56,y:-.42,rx:.42,ry:.36},{x:-.56,y:.42,rx:.42,ry:.36},{x:.56,y:-.42,rx:.42,ry:.36},{x:.56,y:.42,rx:.42,ry:.36}],
    nuc:[{x:-.56,y:-.42,r:.22,a:1},{x:-.56,y:.42,r:.22,a:1},{x:.56,y:-.42,r:.22,a:1},{x:.56,y:.42,r:.22,a:1}],poles:[],sp:0}];
const TX={mi:[['Kì trung gian','NST ở dạng sợi mảnh, tự nhân đôi thành NST kép gồm 2 chromatid dính nhau ở tâm động.','2n = 4, nhân đôi thành 2n kép'],
  ['Kì đầu','NST kép co xoắn dần. Màng nhân và nhân con biến mất, thoi phân bào bắt đầu hình thành.','2n kép = 4'],
  ['Kì giữa','NST kép co xoắn cực đại, xếp thành một hàng trên mặt phẳng xích đạo của thoi phân bào.','2n kép = 4'],
  ['Kì sau','Hai chromatid trong mỗi NST kép tách nhau ở tâm động, di chuyển về hai cực của tế bào.','4n đơn = 8'],
  ['Kì cuối','NST dãn xoắn, màng nhân xuất hiện trở lại. Tế bào chất phân chia, tạo 2 tế bào con giống hệt tế bào mẹ.','Mỗi tế bào con: 2n đơn = 4']],
 me:[['Kì trung gian','NST ở dạng sợi mảnh, tự nhân đôi thành NST kép.','2n = 4, nhân đôi thành 2n kép'],
  ['Kì đầu I','Các NST kép bắt đôi theo từng cặp tương đồng (tiếp hợp) và có thể trao đổi chéo đoạn giữa hai chromatid không chị em.','2n kép = 4'],
  ['Kì giữa I','Các cặp NST kép tương đồng xếp thành hai hàng trên mặt phẳng xích đạo.','2n kép = 4'],
  ['Kì sau I','Mỗi NST kép trong cặp tương đồng di chuyển về một cực. Các cặp phân li độc lập với nhau.','Mỗi cực: n kép = 2'],
  ['Kì cuối I','Tạo 2 tế bào con, mỗi tế bào chứa bộ NST đơn bội ở trạng thái kép.','Mỗi tế bào: n kép = 2'],
  ['Kì giữa II','Trong mỗi tế bào, các NST kép xếp một hàng trên mặt phẳng xích đạo của thoi phân bào mới.','Mỗi tế bào: n kép = 2'],
  ['Kì sau II','Hai chromatid của mỗi NST kép tách nhau ở tâm động, di chuyển về hai cực.','Mỗi tế bào: 2n đơn = 4'],
  ['Kì cuối II','Tạo 4 tế bào con có bộ NST đơn bội n. Nhờ trao đổi chéo và phân li độc lập, các tế bào con khác nhau về tổ hợp NST.','Mỗi tế bào con: n đơn = 2']]};
const C={play:false};
const lerp=(a,b,f)=>a+(b-a)*f;
function state(){const mode=$('clMode').value,P=mode==='mi'?MI:ME,t=+$('clT').value,i=Math.min(P.length-2,Math.floor(t)),f0=t-i,f=f0*f0*(3-2*f0),A=P[i],B=P[i+1];
  return{mode,ph:Math.round(t),ch:A.ch.map((p,k)=>{const q=B.ch[k];return{x:lerp(p.x,q.x,f),y:lerp(p.y,q.y,f),a:lerp(p.a,q.a,f),th:lerp(p.th,q.th,f)}}),
    cells:A.cells.map((p,k)=>{const q=B.cells[k];return{x:lerp(p.x,q.x,f),y:lerp(p.y,q.y,f),rx:lerp(p.rx,q.rx,f),ry:lerp(p.ry,q.ry,f)}}),
    nuc:A.nuc.map((p,k)=>{const q=B.nuc[k];return{x:lerp(p.x,q.x,f),y:lerp(p.y,q.y,f),r:lerp(p.r,q.r,f),a:lerp(p.a,q.a,f)}}),
    poles:f<.5?A.poles:B.poles,sp:lerp(A.sp,B.sp,f)}}
function text(){const s=state(),T=TX[s.mode][s.ph];$('clName').textContent=T[0];$('clDesc').textContent=T[1];
  $('clInfo').innerHTML=kv([['Bộ NST',T[2]],['Kì',`${s.ph+1} / ${TX[s.mode].length}`]])}
const draw=canvasOf($('cCell'),(c,w,h)=>{const s=state(),sc=Math.min(w/2.7,h/1.95),X=x=>w/2+x*sc,Y=y=>h/2+y*sc;
  c.beginPath();s.cells.forEach(e=>{c.moveTo(X(e.x)+e.rx*sc,Y(e.y));c.ellipse(X(e.x),Y(e.y),e.rx*sc,e.ry*sc,0,0,7)});c.fillStyle=rgba('green',.08);c.fill();
  c.strokeStyle=css('gridStrong');c.lineWidth=2;s.cells.forEach(e=>{c.beginPath();c.ellipse(X(e.x),Y(e.y),e.rx*sc,e.ry*sc,0,0,7);c.stroke()});
  s.nuc.forEach(n=>{if(n.a<.02)return;c.globalAlpha=n.a;c.setLineDash([5,4]);c.strokeStyle=css('muted');c.lineWidth=1.5;c.beginPath();c.arc(X(n.x),Y(n.y),n.r*sc,0,7);c.stroke();c.setLineDash([]);c.globalAlpha=1});
  if(s.sp>.02&&s.poles.length){c.strokeStyle=rgba('muted',.4*s.sp);c.lineWidth=1;s.ch.forEach(p=>{let best=s.poles[0],bd=1e9;s.poles.forEach(q=>{const d=Math.hypot(q[0]-p.x,q[1]-p.y);if(d<bd){bd=d;best=q}});c.beginPath();c.moveTo(X(best[0]),Y(best[1]));c.lineTo(X(p.x),Y(p.y));c.stroke()});
    c.fillStyle=css('amber');s.poles.forEach(q=>{c.globalAlpha=s.sp;c.beginPath();c.arc(X(q[0]),Y(q[1]),5,0,7);c.fill();c.globalAlpha=1})}
  const colOf=k=>MAT[k]?css('red'):css('accent');
  s.ch.forEach((p,i)=>{const cI=i>>1,sI=i&1,len=LEN[cI]*sc,ux=Math.cos(p.a),uy=Math.sin(p.a),x=X(p.x),y=Y(p.y);c.lineWidth=(.018+.05*p.th)*sc;c.globalAlpha=.35+.65*Math.min(1,p.th);
    c.strokeStyle=colOf(cI);c.beginPath();c.moveTo(x-ux*len/2,y-uy*len/2);c.lineTo(x+ux*len/2,y+uy*len/2);c.stroke();
    if(s.mode==='me'&&p.th>.6&&((cI===0&&sI===1)||(cI===1&&sI===0))){c.strokeStyle=colOf(cI===0?1:0);c.beginPath();c.moveTo(x+ux*len*.18,y+uy*len*.18);c.lineTo(x+ux*len/2,y+uy*len/2);c.stroke()}
    c.globalAlpha=1});
  for(let k=0;k<4;k++){const a=s.ch[2*k],b=s.ch[2*k+1];if(Math.hypot(a.x-b.x,a.y-b.y)<.1&&a.th>.6){c.fillStyle=css('ink');c.beginPath();c.arc(X((a.x+b.x)/2),Y((a.y+b.y)/2),3.2,0,7);c.fill()}}
  c.fillStyle=css('ink');c.font=font(700,18,'f-display');c.textAlign='left';c.textBaseline='top';c.fillText(TX[s.mode][s.ph][0],14,12)});
function up(){text();draw()}
$('clMode').onchange=()=>{$('clT').max=$('clMode').value==='mi'?4:7;$('clT').value=0;up()};
$('clT').addEventListener('input',up);
$('clPrev').onclick=()=>{$('clT').value=Math.max(0,Math.ceil(+$('clT').value)-1);up()};
$('clNext').onclick=()=>{$('clT').value=Math.min(+$('clT').max,Math.floor(+$('clT').value)+1);up()};
$('clPlay').onclick=()=>{C.play=!C.play;if(C.play&&+$('clT').value>=+$('clT').max)$('clT').value=0;$('clPlay').textContent=C.play?'Dừng':'Chạy'};
TICK.cell=dt=>{if(!C.play)return;let t=+$('clT').value+dt*(reduced?1:.35);if(t>=+$('clT').max){t=+$('clT').max;C.play=false;$('clPlay').textContent='Chạy'}$('clT').value=t;up()};up()}

/* ================= SINH: phả hệ ================= */
{const P={people:[],mode:'AR'};const rnd=q=>Math.random()<q?1:0,pick=a=>a[Math.random()*a.length|0];
function make(mode){const q=mode==='AD'?.2:.3,mk=(sex,gen)=>({sex,gen,g:mode==='XR'&&sex==='M'?[rnd(q)]:[rnd(q),rnd(q)]});
  const aff=p=>mode==='AD'?p.g.includes(1):mode==='AR'?p.g[0]&&p.g[1]:p.sex==='M'?p.g[0]===1:p.g[0]&&p.g[1];
  const kid=(a,b,gen)=>{const f=a.sex==='M'?a:b,m=a.sex==='M'?b:a,sex=Math.random()<.5?'M':'F';
    const g=mode==='XR'?(sex==='M'?[pick(m.g)]:[f.g[0],pick(m.g)]):[pick(f.g),pick(m.g)];return{sex,gen,g,par:[f,m]}};
  const I1=mk('M',1),I2=mk('F',1),sib=[0,1,2,3].map(()=>kid(I1,I2,2)),sp2=mk(sib[1].sex==='M'?'F':'M',2),sp4=mk(sib[3].sex==='M'?'F':'M',2);
  const k2=[0,1,2].map(()=>kid(sib[1],sp2,3)),k4=[0,1,2].map(()=>kid(sib[3],sp4,3));
  const all=[I1,I2,...sib,sp2,sp4,...k2,...k4];all.forEach(p=>p.aff=!!aff(p));
  return{I1,I2,sib,sp2,sp4,k2,k4,all,couples:[[I1,I2,sib],[sib[1],sp2,k2],[sib[3],sp4,k4]]}}
function ok(F,mode){const na=F.all.filter(p=>p.aff).length;if(na<3||na>7)return false;
  const anyCouple=fn=>F.couples.some(([a,b,ks])=>ks.some(k=>fn(a,b,k)));
  if(mode==='AD')return anyCouple((a,b,k)=>a.aff&&b.aff&&!k.aff)&&[1,2,3].every(g=>F.all.some(p=>p.gen===g&&p.aff));
  if(mode==='AR')return anyCouple((a,b,k)=>!a.aff&&!b.aff&&k.aff)&&anyCouple((a,b,k)=>{const f=a.sex==='M'?a:b;return k.sex==='F'&&k.aff&&!f.aff});
  return F.all.filter(p=>p.aff).every(p=>p.sex==='M')&&na>=3&&anyCouple((a,b,k)=>{const m=a.sex==='F'?a:b;return k.sex==='M'&&k.aff&&!m.aff})}
function fresh(){const modes=['AD','AR','XR'],mode=pick(modes);let F;for(let i=0;i<20000;i++){F=make(mode);if(ok(F,mode))break}P.F=F;P.mode=mode;
  $('peV').className='verdict';$('peV').textContent='Quan sát phả hệ rồi chọn một đáp án.';draw()}
function geno(p){const m=P.mode;if(m==='XR'){const a=p.g.slice().sort();return p.sex==='M'?'X'+(a[0]?'ᵃ':'ᴬ')+'Y':'X'+(a[0]?'ᵃ':'ᴬ')+'X'+(a[1]?'ᵃ':'ᴬ')}
  const L=m==='AD'?['a','A']:['A','a'],s=p.g.map(x=>L[x]).sort((x,y)=>(x===x.toLowerCase())-(y===y.toLowerCase()));return s.join('')}
const draw=canvasOf($('cPed'),(c,w,h)=>{const F=P.F;if(!F)return;const sz=Math.min(28,w/16),gy=[0,h*.15,h*.48,h*.8],slot=w/7,showG=$('peGeno').checked;
  const II=[F.sib[0],F.sib[1],F.sp2,F.sib[2],F.sib[3],F.sp4];II.forEach((p,i)=>{p.x=slot*(i+.5)+slot*.5;p.y=gy[2]});
  const sibMid=(F.sib[0].x+F.sib[3].x)/2;F.I1.x=sibMid-slot*.6;F.I2.x=sibMid+slot*.6;F.I1.y=F.I2.y=gy[1];
  const sp=Math.min(slot*.95,sz*2.6);[[F.sib[1],F.sp2,F.k2],[F.sib[3],F.sp4,F.k4]].forEach(([a,b,ks])=>{const m=(a.x+b.x)/2;ks.forEach((k,i)=>{k.x=m+(i-1)*sp;k.y=gy[3]})});
  c.strokeStyle=css('ink');c.lineWidth=1.6;
  F.couples.forEach(([a,b,ks])=>{const my=a.y,mx=(a.x+b.x)/2,sy=(my+ks[0].y)/2;c.beginPath();c.moveTo(Math.min(a.x,b.x)+sz/2,my);c.lineTo(Math.max(a.x,b.x)-sz/2,my);c.moveTo(mx,my);c.lineTo(mx,sy);
    const xs=ks.map(k=>k.x);c.moveTo(Math.min(...xs),sy);c.lineTo(Math.max(...xs),sy);ks.forEach(k=>{c.moveTo(k.x,sy);c.lineTo(k.x,k.y-sz/2)});c.stroke()});
  const gens=[[F.I1,F.I2],II,[...F.k2,...F.k4]];
  gens.forEach((row,gi)=>{c.fillStyle=css('muted');c.font=font(700,14,'f-display');c.textAlign='left';c.textBaseline='middle';c.fillText(['I','II','III'][gi],8,row[0].y);
    row.slice().sort((a,b)=>a.x-b.x).forEach((p,i)=>{c.fillStyle=p.aff?css('red'):css('surface');c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();
      if(p.sex==='M')c.rect(p.x-sz/2,p.y-sz/2,sz,sz);else c.arc(p.x,p.y,sz/2,0,7);c.fill();c.stroke();
      c.fillStyle=css('muted');c.font=font(500,11,'f-mono');c.textAlign='center';c.textBaseline='top';c.fillText(i+1,p.x,p.y+sz/2+3);
      if(showG){c.fillStyle=css('accent');c.font=font(600,12,'f-mono');c.fillText(geno(p),p.x,p.y+sz/2+16)}})})});
const EXPL={AD:'Có cặp bố mẹ đều bị bệnh sinh ra con bình thường, nên bệnh do gen trội. Bệnh gặp ở cả nam và nữ, xuất hiện liên tục qua các thế hệ: gen trội trên NST thường.',
  AR:'Có cặp bố mẹ bình thường sinh con bị bệnh, nên bệnh do gen lặn. Có con gái bị bệnh mà bố bình thường, nên gen không nằm trên NST X: gen lặn trên NST thường.',
  XR:'Bố mẹ bình thường sinh con trai bị bệnh, nên bệnh do gen lặn. Bệnh chỉ gặp ở nam, mẹ bình thường mang gen truyền cho con trai: nhiều khả năng gen lặn nằm trên NST X.'};
document.querySelectorAll('#p-pedigree [data-g]').forEach(b=>b.onclick=()=>{const right=b.dataset.g===P.mode,V=$('peV');V.className='verdict '+(right?'ok':'bad');
  V.textContent=(right?'Đúng. ':'Chưa đúng. ')+(right?EXPL[P.mode]:'Gợi ý: tìm cặp bố mẹ cùng kiểu hình nhưng sinh con khác kiểu hình, rồi xem bệnh gặp ở giới nào.')});
$('peNew').onclick=fresh;$('peGeno').onchange=draw;fresh()}

/* ================= SINH: phiên mã, dịch mã ================= */
{const AA={A:'Ala',R:'Arg',N:'Asn',D:'Asp',C:'Cys',Q:'Gln',E:'Glu',G:'Gly',H:'His',I:'Ile',L:'Leu',K:'Lys',M:'Met',F:'Phe',P:'Pro',S:'Ser',T:'Thr',W:'Trp',Y:'Tyr',V:'Val','*':'KT'};
const TAB='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',BI='UCAG',COMP={A:'T',T:'A',G:'C',C:'G'},RC={A:'U',U:'A',G:'C',C:'G'};
const codonAA=c=>TAB[16*BI.indexOf(c[0])+4*BI.indexOf(c[1])+BI.indexOf(c[2])];
const G={orig:'',code:'',mut:null,step:Infinity,acc:0};
function tr(code){const m=code.replace(/T/g,'U'),st=m.indexOf('AUG');if(st<0)return{st,aa:[]};const aa=[];for(let i=st;i+3<=m.length;i+=3){const a=codonAA(m.slice(i,i+3));aa.push(a);if(a==='*')break}return{st,aa}}
const nt=(b,mut)=>`<span class="nt n${b}${mut?' mut':''}">${b}</span>`;
function render(){const code=G.code,m=code.replace(/T/g,'U'),T=tr(code),cols=[];
  if(T.st<0)cols.push({i:0,n:code.length,k:null});else{if(T.st>0)cols.push({i:0,n:T.st,k:null});T.aa.forEach((a,k)=>cols.push({i:T.st+3*k,n:3,k}));const end=T.st+3*T.aa.length;if(end<code.length)cols.push({i:end,n:code.length-end,k:null})}
  const mp=G.mut?G.mut.pos:-1,row=(f,i,n)=>`<div class="tri">${[...Array(n)].map((_,j)=>f(i+j)).join('')}</div>`;
  let h=`<div class="gcol glbl"><div>Mạch mã gốc 3′→5′</div><div>Mạch bổ sung 5′→3′</div><div>mRNA 5′→3′</div><div>Đối mã tRNA</div><div>Amino acid</div></div>`;
  cols.forEach(cl=>{const on=cl.k!=null&&cl.k<G.step,ribo=cl.k!=null&&cl.k===G.step;
    h+=`<div class="gcol${ribo?' ribo':''}">${row(i=>nt(COMP[code[i]],i===mp),cl.i,cl.n)}${row(i=>nt(code[i],i===mp),cl.i,cl.n)}${row(i=>nt(m[i],i===mp),cl.i,cl.n)}`+
      (cl.k!=null?row(i=>`<span class="nt n${RC[m[i]]}" style="opacity:${on||ribo?1:.25}">${RC[m[i]]}</span>`,cl.i,3):'<div></div>')+
      (cl.k!=null?`<div class="aa${T.aa[cl.k]==='*'?' stop':''}${on?'':' off'}">${AA[T.aa[cl.k]]}</div>`:'<div></div>')+'</div>'});
  $('gnView').innerHTML=h;
  const P0=tr(G.orig).aa,P1=T.aa,str=(a,ref)=>a.map((x,i)=>ref&&ref[i]!==x?`<mark>${AA[x]}</mark>`:AA[x]).join(' – ')||'(không có bộ ba mở đầu AUG)';
  $('gnProt').innerHTML=G.mut?`Gen ban đầu: ${str(P0)}<br>Gen đột biến: ${str(P1,P0)}`:str(P1);
  const V=$('gnMut');
  if(T.st<0){V.className='verdict bad';V.textContent='Không tìm thấy bộ ba mở đầu AUG trên mRNA nên không dịch mã được.'}
  else if(!G.mut){V.className='verdict';V.textContent='Chưa có đột biến. Bấm một nút đột biến để xem chuỗi polypeptide thay đổi ra sao.'}
  else{const t=G.mut.type,same=P0.join()===P1.join();V.className='verdict '+(same?'ok':'bad');
    V.textContent=`Vị trí ${G.mut.pos+1}: `+(t==='sub'?(same?'thay thế 1 cặp nucleotide nhưng bộ ba mới vẫn mã hoá cùng amino acid (đột biến đồng nghĩa), protein không đổi.':P1.length<P0.length?'thay thế 1 cặp làm xuất hiện bộ ba kết thúc sớm (đột biến vô nghĩa), chuỗi polypeptide ngắn lại.':P1.length>P0.length?'thay thế làm mất bộ ba kết thúc, chuỗi polypeptide dài ra.':'thay thế 1 cặp làm đổi 1 amino acid (đột biến sai nghĩa).')
      :(t==='del'?'mất 1 cặp nucleotide':'thêm 1 cặp nucleotide')+' gây dịch khung đọc: các bộ ba từ vị trí đột biến trở đi đều bị đọc sai.')}
  const A=[...code].filter(b=>b==='A'||b==='T').length,Gc=code.length-A,np=T.aa.filter(a=>a!=='*').length;
  $('gnInfo').innerHTML=kv([['Số cặp nucleotide',code.length],['Tổng số nucleotide N',2*code.length],['Chiều dài L = N/2 × 3,4 Å',fmt(code.length*3.4,1)+' Å'],['Số liên kết hydrogen H = 2A + 3G',2*A+3*Gc],['Số amino acid (kể cả Met mở đầu)',np]])}
function apply(){let s=$('gnIn').value.toUpperCase().replace(/U/g,'T').replace(/[^ATGC]/g,'');if(s.length<3){$('gnIn').value=G.orig;return}
  if($('gnSide').value==='tpl')s=[...s].map(b=>COMP[b]).join('');G.orig=G.code=s;G.mut=null;G.step=Infinity;render()}
function mutate(type){const T=tr(G.orig);if(T.st<0)return;const lo=T.st+3,hi=Math.max(lo+1,T.st+3*T.aa.length-(type==='sub'?0:3)),pos=lo+Math.floor(Math.random()*(hi-lo));let s=G.orig;
  if(type==='sub'){const nb=pick('ATGC'.replace(s[pos],''));s=s.slice(0,pos)+nb+s.slice(pos+1)}else if(type==='del')s=s.slice(0,pos)+s.slice(pos+1);else s=s.slice(0,pos)+pick('ATGC')+s.slice(pos);
  G.code=s;G.mut={type,pos};G.step=Infinity;render()}
const pick=s=>s[Math.random()*s.length|0];
$('gnApply').onclick=apply;$('gnIn').addEventListener('keydown',e=>{if(e.key==='Enter')apply()});$('gnSide').onchange=()=>{const s=G.orig;$('gnIn').value=$('gnSide').value==='tpl'?[...s].map(b=>COMP[b]).join(''):s};
$('gnSub').onclick=()=>mutate('sub');$('gnDel').onclick=()=>mutate('del');$('gnIns').onclick=()=>mutate('ins');
$('gnReset').onclick=()=>{G.code=G.orig;G.mut=null;G.step=Infinity;render()};
$('gnRun').onclick=()=>{G.step=0;G.acc=0;render()};
TICK.gene=dt=>{if(G.step===Infinity)return;G.acc+=dt;if(G.acc<.7)return;G.acc=0;G.step++;if(G.step>tr(G.code).aa.length)G.step=Infinity;render()};apply()}

/* ================= SINH: lưới thức ăn ================= */
{const SP={'Cỏ':[.5,.9],'Châu chấu':[.2,.66],'Chuột':[.5,.66],'Thỏ':[.8,.66],'Ếch':[.1,.42],'Chim sâu':[.34,.42],'Rắn':[.6,.36],'Cáo':[.88,.4],'Đại bàng':[.42,.1]};
const EAT={'Châu chấu':['Cỏ'],'Thỏ':['Cỏ'],'Chuột':['Cỏ'],'Ếch':['Châu chấu'],'Chim sâu':['Châu chấu'],'Cáo':['Thỏ','Chuột'],'Rắn':['Ếch','Chuột'],'Đại bàng':['Rắn','Thỏ','Chim sâu']};
const EMO={'Cỏ':'🌿','Châu chấu':'🦗','Chuột':'🐭','Thỏ':'🐇','Ếch':'🐸','Chim sâu':'🐦','Rắn':'🐍','Cáo':'🦊','Đại bàng':'🦅'};
const names=Object.keys(SP),preds=n=>names.filter(p=>(EAT[p]||[]).includes(n)),preyOf=n=>EAT[n]||[];
const W={removed:new Set(),eff:{},why:[]};
function compute(){const eff={},why=[],q=[];W.removed.forEach(n=>{eff[n]='x';why.push([n,'x','bị loại bỏ khỏi hệ sinh thái']);q.push([n,0])});
  while(q.length){const[n,d]=q.shift(),s=eff[n];if(d>3)continue;
    if(s==='x'){preds(n).forEach(p=>{if(eff[p]==='x')return;const left=preyOf(p).filter(y=>eff[y]!=='x');
        if(!left.length){eff[p]='x';why.push([p,'x',`mất toàn bộ nguồn thức ăn (${preyOf(p).join(', ').toLowerCase()})`]);q.push([p,d+1])}
        else if(!eff[p]){eff[p]='-';why.push([p,'-',`mất một nguồn thức ăn là ${n.toLowerCase()}`]);q.push([p,d+1])}});
      preyOf(n).forEach(y=>{if(!eff[y]){eff[y]='+';why.push([y,'+',`không còn bị ${n.toLowerCase()} ăn`]);q.push([y,d+1])}})}
    else{preyOf(n).forEach(y=>{if(!eff[y]){eff[y]=s==='+'?'-':'+';why.push([y,eff[y],s==='+'?`bị ${n.toLowerCase()} ăn nhiều hơn`:`ít bị ${n.toLowerCase()} ăn hơn`]);q.push([y,d+1])}});
      preds(n).forEach(p=>{if(!eff[p]){eff[p]=s;why.push([p,s,s==='+'?`có thêm thức ăn là ${n.toLowerCase()}`:`thiếu thức ăn do ${n.toLowerCase()} giảm`]);q.push([p,d+1])}})}}
  W.eff=eff;W.why=why}
function chains(){const alive=n=>W.eff[n]!=='x',out=[];const dfs=(n,path)=>{const up=preds(n).filter(alive);if(!up.length){if(path.length>1)out.push(path);return}up.forEach(p=>dfs(p,[...path,p]))};if(alive('Cỏ'))dfs('Cỏ',['Cỏ']);return out}
function up(){compute();const CL={'+':'var(--green)','-':'var(--amber)','x':'var(--muted)'},TX={'+':'tăng','-':'giảm','x':'biến mất'};
  $('fwOut').innerHTML=W.why.length?W.why.map(([n,s,r])=>`<div><b style="color:${CL[s]}">${n} ${TX[s]}</b>: ${r}.</div>`).join(''):'<div>Hệ sinh thái đang cân bằng. Bấm vào một loài trên hình để loại bỏ loài đó.</div>';
  const ch=chains();$('fwInfo').innerHTML=kv([['Số loài còn lại',names.filter(n=>W.eff[n]!=='x').length+' / '+names.length],['Số chuỗi thức ăn',ch.length],['Chuỗi dài nhất',ch.length?Math.max(...ch.map(c=>c.length))+' mắt xích':'—']]);
  $('fwChains').innerHTML=ch.map(c=>c.join(' → ')).join('<br>');draw()}
const draw=canvasOf($('cWeb'),(c,w,h)=>{const r=Math.max(22,Math.min(34,w/22)),X=u=>r+8+u*(w-2*r-16),Y=v=>r+8+v*(h-2*r-30);
  names.forEach(p=>preyOf(p).forEach(y=>{const dead=W.eff[p]==='x'||W.eff[y]==='x',a=[X(SP[y][0]),Y(SP[y][1])],b=[X(SP[p][0]),Y(SP[p][1])],l=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/l,uy=(b[1]-a[1])/l;
    c.strokeStyle=c.fillStyle=dead?rgba('muted',.25):css('muted');c.lineWidth=1.6;c.setLineDash(dead?[4,4]:[]);c.beginPath();c.moveTo(a[0]+ux*r,a[1]+uy*r);c.lineTo(b[0]-ux*(r+3),b[1]-uy*(r+3));c.stroke();c.setLineDash([]);arrowHead(c,b[0]-ux*(r+3),b[1]-uy*(r+3),Math.atan2(uy,ux),9)}));
  names.forEach(n=>{const x=X(SP[n][0]),y=Y(SP[n][1]),s=W.eff[n],col=s==='+'?css('green'):s==='-'?css('amber'):s==='x'?css('muted'):css('ink');
    c.fillStyle=s==='x'?css('paper'):css('surface');c.beginPath();c.arc(x,y,r,0,7);c.fill();c.strokeStyle=col;c.lineWidth=s?3.5:2;c.stroke();
    c.globalAlpha=s==='x'?.3:1;c.font=`${Math.round(r*1.05)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(EMO[n],x,y+2);c.globalAlpha=1;c.font=font(700,12);c.lineWidth=4;c.strokeStyle=css('surface');c.strokeText(n,x,y+r+11);c.fillStyle=s==='x'?css('muted'):css('ink');c.fillText(n,x,y+r+11);
    if(s){c.fillStyle=col;c.font=font(700,14);c.fillText(s==='+'?'▲':s==='-'?'▼':'✕',x+r*.75,y-r*.75)}
    if(W.removed.has(n)){c.strokeStyle=css('red');c.lineWidth=2.5;c.beginPath();c.moveTo(x-r*.6,y-r*.6);c.lineTo(x+r*.6,y+r*.6);c.stroke()}});
  c.fillStyle=css('muted');c.font=font(500,12);c.textAlign='left';c.textBaseline='bottom';c.fillText('Mũi tên chỉ từ thức ăn đến sinh vật ăn nó',10,h-6)});
$('cWeb').addEventListener('click',e=>{const cv=$('cWeb'),rc=cv.getBoundingClientRect(),w=rc.width,h=rc.height,r=Math.max(22,Math.min(34,w/22)),x=e.clientX-rc.left,y=e.clientY-rc.top;
  const hit=names.find(n=>Math.hypot(x-(r+8+SP[n][0]*(w-2*r-16)),y-(r+8+SP[n][1]*(h-2*r-30)))<=r+6);if(!hit)return;W.removed.has(hit)?W.removed.delete(hit):W.removed.add(hit);up()});
$('cWeb').style.cursor='pointer';$('fwReset').onclick=()=>{W.removed.clear();up()};up()}

/* ================= SINH: thỏ – mèo rừng ================= */
{let S=null;
function sim(){const r=+$('ecA').value,s=+$('ecB').value,e=+$('ecE').value,m=+$('ecM').value,N0=+$('ecN').value,P0=+$('ecP').value,K=$('ecK').checked?300:Infinity;
  const f=(N,P)=>[r*N*(1-N/K)-s*N*P,e*N*P-m*P];let N=N0,P=P0;const dt=.01,T=60,out=[[0,N,P]];
  for(let i=1;i<=T/dt;i++){const k1=f(N,P),k2=f(N+dt/2*k1[0],P+dt/2*k1[1]),k3=f(N+dt/2*k2[0],P+dt/2*k2[1]),k4=f(N+dt*k3[0],P+dt*k3[1]);
    N=Math.max(0,N+dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]));P=Math.max(0,P+dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]));if(i%5===0)out.push([i*dt,N,P])}
  const Ns=m/e,Ps=r*(1-Ns/K)/s;return{out,r,s,e,m,K,Ns,Ps}}
function up(){[['ecA',2],['ecB',3],['ecE',3],['ecM',2],['ecN',0],['ecP',0]].forEach(([id,d])=>$('o'+id).textContent=fmt(+$(id).value,d));S=sim();
  const peaks=[];for(let i=1;i<S.out.length-1;i++)if(S.out[i][1]>S.out[i-1][1]&&S.out[i][1]>=S.out[i+1][1]&&S.out[i][1]>S.Ns*1.02)peaks.push(S.out[i][0]);
  const per=peaks.length>1?(peaks[peaks.length-1]-peaks[0])/(peaks.length-1):null,last=S.out.slice(S.out.length/2),mx=k=>Math.max(...last.map(p=>p[k])),mn=k=>Math.min(...last.map(p=>p[k]));
  $('ecInfo').innerHTML=kv([['Điểm cân bằng thỏ N* = m/e',fmt(S.Ns,0)],['Điểm cân bằng mèo rừng P*',S.Ps>0?fmt(S.Ps,0):'không tồn tại'],['Chu kì dao động ước tính',per?fmt(per,1)+' năm':'—'],['Thỏ (nửa sau)',`${fmt(mn(1),0)} – ${fmt(mx(1),0)}`],['Mèo rừng (nửa sau)',`${fmt(mn(2),0)} – ${fmt(mx(2),0)}`]]);draw();drawP()}
const draw=canvasOf($('cEco'),(c,w,h)=>{if(!S)return;const ml=46,mr=16,mt=30,mb=32,T=60,Ym=Math.max(...S.out.map(p=>Math.max(p[1],p[2])))*1.08||1,X=t=>ml+t/T*(w-ml-mr),Y=v=>mt+(1-v/Ym)*(h-mt-mb);
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let t=0;t<=T;t+=10){c.beginPath();c.moveTo(X(t),mt);c.lineTo(X(t),h-mb);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(t,X(t),h-mb+5)}
  const ys=niceStep(Ym,5);for(let v=0;v<=Ym;v+=ys){c.beginPath();c.moveTo(ml,Y(v));c.lineTo(w-mr,Y(v));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(Math.round(v),ml-5,Y(v))}
  c.textAlign='right';c.textBaseline='bottom';c.fillText('Thời gian (năm)',w-mr,h-mb-3);c.textAlign='left';c.textBaseline='top';c.fillText('Số cá thể',ml+4,mt-18);
  [[1,'accent','🐇 Thỏ'],[2,'red','🐈 Mèo rừng']].forEach(([k,t,n],j)=>{c.strokeStyle=css(t);c.lineWidth=2.4;c.beginPath();S.out.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[k])):c.moveTo(X(p[0]),Y(p[k])));c.stroke();{const L=S.out[S.out.length-1];c.font='22px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';c.textAlign='right';c.textBaseline='middle';c.fillText(k===1?'🐇':'🐈',X(L[0])-2,Y(L[k])-14)}
    c.fillStyle=css(t);c.fillRect(w-mr-190+j*96,mt-20,14,4);c.font=font(600,12);c.textAlign='left';c.textBaseline='middle';c.fillText(n,w-mr-172+j*96,mt-18)})});
const drawP=canvasOf($('cPhase'),(c,w,h)=>{if(!S)return;const m=28,Nm=Math.max(...S.out.map(p=>p[1]))*1.08||1,Pm=Math.max(...S.out.map(p=>p[2]))*1.08||1,X=v=>m+v/Nm*(w-m-8),Y=v=>h-m+4-v/Pm*(h-m-8);
  c.strokeStyle=css('muted');c.lineWidth=1;c.beginPath();c.moveTo(m,8);c.lineTo(m,h-m+4);c.lineTo(w-8,h-m+4);c.stroke();
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='right';c.textBaseline='top';c.fillText('Thỏ →',w-8,h-m+8);c.save();c.translate(10,h/2);c.rotate(-Math.PI/2);c.textAlign='center';c.fillText('Mèo rừng →',0,0);c.restore();
  c.strokeStyle=css('accent');c.lineWidth=1.6;c.beginPath();S.out.forEach((p,i)=>i?c.lineTo(X(p[1]),Y(p[2])):c.moveTo(X(p[1]),Y(p[2])));c.stroke();
  c.fillStyle=css('red');c.beginPath();c.arc(X(S.out[0][1]),Y(S.out[0][2]),4,0,7);c.fill();
  if(S.Ps>0&&S.Ns<Nm){c.fillStyle=css('amber');c.beginPath();c.arc(X(S.Ns),Y(S.Ps),4,0,7);c.fill()}});
['ecA','ecB','ecE','ecM','ecN','ecP','ecK'].forEach(id=>$(id).addEventListener('input',up));up()}

