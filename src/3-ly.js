
/* ================= LÍ: mạch nối tiếp / song song ================= */
{const CI={K:true,ph:[]};const SUBN=['','₁','₂','₃'];
function calc(){const m=$('ciMode').value,U=+$('ciU').value,R=[+$('ciR1').value,+$('ciR2').value,+$('ciR3').value];let Rt,comps;
  if(m==='nt'){Rt=R[0]+R[1];const I=U/Rt;comps=[{n:1,R:R[0],I},{n:2,R:R[1],I}]}
  else if(m==='ss'){Rt=R[0]*R[1]/(R[0]+R[1]);comps=[{n:1,R:R[0],I:U/R[0]},{n:2,R:R[1],I:U/R[1]}]}
  else{const R23=R[1]*R[2]/(R[1]+R[2]);Rt=R[0]+R23;const I=U/Rt,U23=I*R23;comps=[{n:1,R:R[0],I},{n:2,R:R[1],I:U23/R[1]},{n:3,R:R[2],I:U23/R[2]}]}
  const k=CI.K?1:0;comps.forEach(c=>{c.I*=k;c.U=c.I*c.R;c.P=c.U*c.I});return{m,U,Rt,I:k*U/Rt,comps}}
function layout(s){const I=s.I,c=s.comps;
  if(s.m==='nt')return{segs:[{p:[[.1,.45],[.1,.25],[.9,.25],[.9,.8],[.1,.8],[.1,.55]],I}],parts:[{n:1,x:.5,y:.25,hz:1},{n:2,x:.9,y:.52,hz:0}],nodes:[]};
  const b=s.m==='ss'?[0,1]:[1,2];
  return{segs:[{p:[[.1,.45],[.1,.25],[.3,.25]],I},{p:[[.3,.25],[.3,.1],[.7,.1],[.7,.25]],I:c[b[0]].I},{p:[[.3,.25],[.3,.4],[.7,.4],[.7,.25]],I:c[b[1]].I},{p:[[.7,.25],[.9,.25],[.9,.8],[.1,.8],[.1,.55]],I}],
    parts:[{n:b[0]+1,x:.5,y:.1,hz:1},{n:b[1]+1,x:.5,y:.4,hz:1},...(s.m==='hh'?[{n:1,x:.9,y:.6,hz:0}]:[])],nodes:[[.3,.25],[.7,.25]]}}
function up(){const m=$('ciMode').value;$('ciR3row').hidden=m!=='hh';
  ['U','R1','R2','R3'].forEach(k=>$('oci'+k).textContent=fmt(+$('ci'+k).value,k==='U'?1:0)+(k==='U'?' V':' Ω'));
  const s=calc();
  $('ciInfo').innerHTML=kv([['R tương đương',fmt(s.Rt,2)+' Ω'],['I mạch chính',fmt(s.I,3)+' A'],...s.comps.map(c=>[`R${SUBN[c.n]} = ${c.R} Ω`,`${fmt(c.U,2)} V · ${fmt(c.I,3)} A`]),['Công suất toàn mạch',fmt(s.U*s.I,2)+' W']]);
  $('ciF').textContent={nt:'R_tđ = R₁ + R₂\nI = I₁ = I₂ = U / R_tđ\nU = U₁ + U₂\nU₁ / U₂ = R₁ / R₂',ss:'1/R_tđ = 1/R₁ + 1/R₂\nU = U₁ = U₂\nI = I₁ + I₂\nI₁ / I₂ = R₂ / R₁',hh:'R₂₃ = R₂·R₃ / (R₂ + R₃)\nR_tđ = R₁ + R₂₃\nI = I₁ = U / R_tđ\nU₂₃ = I·R₂₃ = U₂ = U₃'}[m];
  $('ciK').textContent=CI.K?'Mở khoá K':'Đóng khoá K';CI.ph=[];draw()}
const draw=canvasOf($('cCirc'),(c,w,h)=>{const s=calc(),L=layout(s),mx=40,my=34,X=u=>mx+u*(w-2*mx),Y=v=>my+v*(h-2*my),bulb=$('ciBulb').checked;
  c.strokeStyle=css('ink');c.lineWidth=2.4;
  L.segs.forEach(g=>{c.beginPath();g.p.forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.stroke()});
  c.fillStyle=css('ink');L.nodes.forEach(q=>{c.beginPath();c.arc(X(q[0]),Y(q[1]),4.5,0,7);c.fill()});
  // dòng điện
  c.fillStyle=css('amber');L.segs.forEach((g,i)=>{if(g.I<=1e-9)return;const pts=g.p.map(q=>[X(q[0]),Y(q[1])]);const lens=[];let tot=0;
    for(let k=1;k<pts.length;k++){const l=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]);lens.push(l);tot+=l}
    for(let d=(CI.ph[i]||0)%22;d<tot;d+=22){let r=d,k=0;while(k<lens.length-1&&r>lens[k]){r-=lens[k];k++}const t=r/lens[k];
      c.beginPath();c.arc(pts[k][0]+(pts[k+1][0]-pts[k][0])*t,pts[k][1]+(pts[k+1][1]-pts[k][1])*t,3.2,0,7);c.fill()}});
  const surf=css('surface');
  // nguồn
  const bx=X(.1),b1=Y(.47),b2=Y(.53);c.fillStyle=surf;c.fillRect(bx-24,Y(.45)+1,48,Y(.55)-Y(.45)-2);
  c.strokeStyle=css('ink');c.lineWidth=2.4;c.beginPath();c.moveTo(bx-20,b1);c.lineTo(bx+20,b1);c.stroke();c.lineWidth=6;c.beginPath();c.moveTo(bx-10,b2);c.lineTo(bx+10,b2);c.stroke();
  c.fillStyle=css('ink');c.font=font(700,13);c.textAlign='right';c.textBaseline='middle';c.fillText('+',bx-24,b1);c.fillText('−',bx-24,b2);
  c.textAlign='left';c.fillStyle=css('accent');c.fillText('U = '+fmt(s.U)+' V',bx+26,(b1+b2)/2);
  // khoá K
  const k1=X(.22),k2=X(.3),ky=Y(.8);c.fillStyle=surf;c.fillRect(k1+4,ky-5,k2-k1-8,10);c.fillStyle=css('ink');[k1,k2].forEach(x=>{c.beginPath();c.arc(x,ky,4,0,7);c.fill()});
  c.lineWidth=2.4;c.beginPath();c.moveTo(k1,ky);CI.K?c.lineTo(k2,ky):c.lineTo(k1+(k2-k1)*.87,ky-(k2-k1)*.5);c.stroke();
  c.font=font(700,13);c.textAlign='center';c.textBaseline='bottom';c.fillText('K',(k1+k2)/2,ky-14);
  // ampe kế
  const ax=X(.55),ay=Y(.8);c.fillStyle=surf;c.beginPath();c.arc(ax,ay,16,0,7);c.fill();c.strokeStyle=css('ink');c.lineWidth=2;c.stroke();
  c.fillStyle=css('ink');c.font=font(700,14);c.textAlign='center';c.textBaseline='middle';c.fillText('A',ax,ay+1);
  c.fillStyle=css('accent');c.font=font(700,13,'f-mono');c.textBaseline='top';c.fillText('I = '+fmt(s.I,3)+' A',ax,ay+22);
  // linh kiện
  L.parts.forEach(p=>{const cp=s.comps[p.n-1],x=X(p.x),y=Y(p.y);
    if(bulb){const br=Math.min(1,Math.sqrt(cp.P/12));if(br>.02){const g=c.createRadialGradient(x,y,4,x,y,18+46*br);g.addColorStop(0,rgba('amber',.85*br));g.addColorStop(1,rgba('amber',0));c.fillStyle=g;c.beginPath();c.arc(x,y,18+46*br,0,7);c.fill()}
      c.fillStyle=br>.02?rgba('amber',.25+.6*br):surf;c.beginPath();c.arc(x,y,15,0,7);c.fill();c.strokeStyle=css('ink');c.lineWidth=2;c.stroke();
      c.beginPath();c.moveTo(x-10,y-10);c.lineTo(x+10,y+10);c.moveTo(x+10,y-10);c.lineTo(x-10,y+10);c.stroke()}
    else{const W=p.hz?50:18,H=p.hz?18:50;c.fillStyle=surf;c.fillRect(x-W/2,y-H/2,W,H);c.strokeStyle=css('ink');c.lineWidth=2;c.strokeRect(x-W/2,y-H/2,W,H)}
    c.fillStyle=css('ink');c.font=font(700,13);const t1=`${bulb?'Đ':'R'}${SUBN[p.n]} = ${cp.R} Ω`,t2=`${fmt(cp.U,2)} V · ${fmt(cp.I,3)} A`;
    if(p.hz){const above=p.y<.2||s.m==='nt';c.textAlign='center';c.textBaseline=above?'bottom':'top';const off=above?-1:1;
      c.fillText(t1,x,y+off*(bulb?22:14));c.font=font(500,12,'f-mono');c.fillStyle=css('muted');c.fillText(t2,x,y+off*(bulb?38:30))}
    else{c.textAlign='right';c.textBaseline='middle';c.fillText(t1,x-(bulb?24:16),y-9);c.font=font(500,12,'f-mono');c.fillStyle=css('muted');c.fillText(t2,x-(bulb?24:16),y+9)}});
  if(!CI.K){c.fillStyle=css('red');c.font=font(600,13);c.textAlign='left';c.textBaseline='bottom';c.fillText('Khoá K mở: mạch hở, không có dòng điện',mx,h-6)}
  else{c.fillStyle=css('muted');c.font=font(500,12);c.textAlign='left';c.textBaseline='bottom';c.fillText('Chấm vàng: chiều dòng điện quy ước, chạy càng nhanh khi I càng lớn',mx,h-6)}});
TICK.circuit=dt=>{if(reduced)return;const s=calc(),L=layout(s);L.segs.forEach((g,i)=>CI.ph[i]=((CI.ph[i]||0)+Math.min(g.I,2.5)*70*dt)%2200);draw()};
['ciMode','ciU','ciR1','ciR2','ciR3','ciBulb'].forEach(id=>$(id).addEventListener('input',up));
$('ciK').onclick=()=>{CI.K=!CI.K;up()};up()}

/* ================= LÍ: định luật Ohm toàn mạch ================= */
{const O={ph:0};
const val=()=>{const E=+$('ohE').value,r=+$('ohr').value,R=+$('ohR').value,I=(R+r)>0?E/(R+r):Infinity;return{E,r,R,I,U:E-I*r,P:I*I*R}};
function up(){const v=val();$('oohE').textContent=fmt(v.E)+' V';$('oohr').textContent=fmt(v.r)+' Ω';$('oohR').textContent=fmt(v.R)+' Ω';
  const short=v.R<0.05;
  $('ohInfo').innerHTML=kv([['Cường độ I',isFinite(v.I)?fmt(v.I,2)+' A':'∞'],['Hiệu điện thế mạch ngoài U',fmt(v.U,2)+' V'],['Công suất mạch ngoài P',fmt(v.P,2)+' W'],['Công suất nguồn ℰ·I',isFinite(v.I)?fmt(v.E*v.I,2)+' W':'∞'],['Hiệu suất H = U/ℰ',isFinite(v.I)?fmt(v.U/v.E*100,1)+' %':'—'],['P cực đại khi R = r',v.r>0?fmt(v.E*v.E/(4*v.r),2)+' W':'—']]);
  const V=$('ohV');V.className='verdict'+(short?' bad':Math.abs(v.R-v.r)<0.15&&v.r>0?' ok':'');
  V.textContent=short?`Đoản mạch: I = ℰ / r ${v.r>0?'= '+fmt(v.E/v.r,1)+' A':'rất lớn'}, nguồn nóng lên và có thể hỏng.`:Math.abs(v.R-v.r)<0.15&&v.r>0?'R = r: công suất mạch ngoài đạt cực đại.':'Thay đổi R để tìm giá trị cho công suất mạch ngoài lớn nhất.';draw()}
const draw=canvasOf($('cOhm'),(c,w,h)=>{const v=val(),wide=w>=640;
  const cw=wide?w*.45:w,ch=wide?h:h*.5,mx=36,my=36,X=u=>mx+u*(cw-2*mx),Y=t=>my+t*(ch-2*my);
  c.strokeStyle=css('ink');c.lineWidth=2.4;c.beginPath();c.rect(X(.1),Y(.15),X(.9)-X(.1),Y(.85)-Y(.15));c.stroke();
  const surf=css('surface');
  // nguồn (ℰ, r) ở cạnh trên
  const sx=X(.5),sy=Y(.15);c.fillStyle=surf;c.fillRect(sx-30,sy-14,60,28);c.fillStyle=css('ink');
  c.lineWidth=2.4;c.beginPath();c.moveTo(sx-6,sy-14);c.lineTo(sx-6,sy+14);c.stroke();c.lineWidth=6;c.beginPath();c.moveTo(sx+6,sy-7);c.lineTo(sx+6,sy+7);c.stroke();
  c.font=font(600,13);c.textAlign='center';c.textBaseline='bottom';c.fillText(`ℰ = ${fmt(v.E)} V, r = ${fmt(v.r)} Ω`,sx,sy-18);
  // biến trở ở cạnh dưới
  const rx=X(.5),ry=Y(.85);c.fillStyle=surf;c.fillRect(rx-34,ry-10,68,20);c.strokeStyle=css('ink');c.lineWidth=2;c.strokeRect(rx-34,ry-10,68,20);
  const kx=rx-34+68*Math.min(1,v.R/30);c.strokeStyle=css('accent');c.lineWidth=2;c.beginPath();c.moveTo(kx,ry-22);c.lineTo(kx,ry-11);c.stroke();c.fillStyle=css('accent');arrowHead(c,kx,ry-10,Math.PI/2,7);
  c.fillStyle=css('ink');c.font=font(600,13);c.textBaseline='top';c.fillText(`R = ${fmt(v.R)} Ω`,rx,ry+14);
  // vôn kế đo U ở cạnh phải
  const vx=X(.9),vy=Y(.5);c.fillStyle=surf;c.beginPath();c.arc(vx,vy,15,0,7);c.fill();c.strokeStyle=css('ink');c.lineWidth=2;c.stroke();c.fillStyle=css('ink');c.font=font(700,13);c.textBaseline='middle';c.fillText('V',vx,vy+1);
  c.textAlign='right';c.fillStyle=css('accent');c.fillText('U = '+fmt(v.U,2)+' V',vx-22,vy);
  const ax=X(.1),ay=Y(.5);c.fillStyle=surf;c.beginPath();c.arc(ax,ay,15,0,7);c.fill();c.strokeStyle=css('ink');c.stroke();c.fillStyle=css('ink');c.textAlign='center';c.fillText('A',ax,ay+1);
  c.textAlign='left';c.fillStyle=css('accent');c.fillText('I = '+(isFinite(v.I)?fmt(v.I,2):'∞')+' A',ax+22,ay);
  // dòng điện chạy
  if(isFinite(v.I)&&v.I>0){const pts=[[X(.5)+30,Y(.15)],[X(.9),Y(.15)],[X(.9),Y(.85)],[X(.1),Y(.85)],[X(.1),Y(.15)],[X(.5)-30,Y(.15)]];const lens=[];let tot=0;
    for(let k=1;k<pts.length;k++){const l=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]);lens.push(l);tot+=l}
    c.fillStyle=css('amber');for(let d=O.ph%22;d<tot;d+=22){let r=d,k=0;while(k<lens.length-1&&r>lens[k]){r-=lens[k];k++}const t=r/lens[k];c.beginPath();c.arc(pts[k][0]+(pts[k+1][0]-pts[k][0])*t,pts[k][1]+(pts[k+1][1]-pts[k][1])*t,3,0,7);c.fill()}}
  // đồ thị P(R)
  const gx0=wide?cw+50:50,gx1=w-20,gy0=wide?30:ch+24,gy1=h-36,Rm=30,Pm=Math.max(1,v.r>0?v.E*v.E/(4*v.r)*1.15:v.E*v.E/1*1.1);
  const GX=R=>gx0+R/Rm*(gx1-gx0),GY=P=>gy1-Math.min(P,Pm)/Pm*(gy1-gy0);
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let R=0;R<=Rm;R+=5){c.beginPath();c.moveTo(GX(R),gy0);c.lineTo(GX(R),gy1);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(R,GX(R),gy1+5)}
  const ps=niceStep(Pm,5);for(let P=0;P<=Pm;P+=ps){c.beginPath();c.moveTo(gx0,GY(P));c.lineTo(gx1,GY(P));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(P,ps<1?1:0),gx0-5,GY(P))}
  c.textAlign='left';c.textBaseline='bottom';c.fillText('P (W)',gx0+4,gy0-4);c.textAlign='right';c.fillText('R (Ω)',gx1,gy1-4);
  c.strokeStyle=css('accent');c.lineWidth=2.4;c.beginPath();for(let i=0;i<=300;i++){const R=Rm*i/300,P=v.E*v.E*R/((R+v.r)**2||1e-9);i?c.lineTo(GX(R),GY(P)):c.moveTo(GX(R),GY(P))}c.stroke();
  if(v.r>0){c.setLineDash([4,4]);c.strokeStyle=css('amber');c.lineWidth=1.2;c.beginPath();c.moveTo(GX(v.r),gy0);c.lineTo(GX(v.r),gy1);c.stroke();c.setLineDash([]);c.fillStyle=css('amber');c.font=font(600,12);c.textAlign='left';c.textBaseline='top';c.fillText('R = r',GX(v.r)+4,gy0+2)}
  if(isFinite(v.P)){c.fillStyle=css('red');c.beginPath();c.arc(GX(v.R),GY(v.P),6,0,7);c.fill()}});
TICK.ohm=dt=>{if(reduced)return;const v=val();if(isFinite(v.I))O.ph=(O.ph+Math.min(v.I,6)*30*dt)%2200;draw()};
['ohE','ohr','ohR'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= LÍ: ném xiên ================= */
{const P={t:0,run:false,ghosts:[]};
function prm(){const v=+$('pv').value,a=+$('pa').value*Math.PI/180,g=+$('pg').value,vx=v*Math.cos(a),vy=v*Math.sin(a),T=2*vy/g;return{v,a,g,vx,vy,T,H:vy*vy/(2*g),L:vx*T,deg:+$('pa').value}}
const st=(p,t)=>({x:p.vx*t,y:p.vy*t-p.g*t*t/2,vy:p.vy-p.g*t});
function live(p){const s=st(p,P.t);$('pLive').innerHTML=kv([['t',fmt(P.t,2)+' s'],['x',fmt(s.x,2)+' m'],['y',fmt(Math.max(0,s.y),2)+' m'],['vₓ',fmt(p.vx,2)+' m/s'],['v_y',fmt(s.vy,2)+' m/s'],['v',fmt(Math.hypot(p.vx,s.vy),2)+' m/s']])}
function up(){const p=prm();$('ov').textContent=p.v+' m/s';$('oal').textContent=p.deg+'°';P.t=0;P.run=false;
  $('pInfo').innerHTML=kv([['H = v₀²sin²α / 2g',fmt(p.H,2)+' m'],['L = v₀²sin2α / g',fmt(p.L,2)+' m'],['t = 2v₀sinα / g',fmt(p.T,2)+' s']]);live(p);draw()}
const draw=canvasOf($('cPhys'),(c,w,h)=>{const p=prm(),all=[p,...P.ghosts],Lm=Math.max(10,...all.map(q=>q.L)),Hm=Math.max(5,...all.map(q=>q.H));
  const ml=46,mb=34,mt=24,mr=24,s=Math.min((w-ml-mr)/Lm,(h-mb-mt)/Hm)*.92,X=x=>ml+x*s,Y=y=>h-mb-y*s,stp=niceStep(Math.max((w-ml)/s,(h-mb)/s));
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let x=0;X(x)<w;x+=stp){c.beginPath();c.moveTo(X(x)+.5,0);c.lineTo(X(x)+.5,h-mb);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(fmt(x,stp<1?1:0),X(x),h-mb+6)}
  for(let y=0;Y(y)>0;y+=stp){c.beginPath();c.moveTo(ml,Y(y)+.5);c.lineTo(w,Y(y)+.5);c.stroke();if(y){c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(y,stp<1?1:0),ml-6,Y(y))}}
  c.strokeStyle=css('muted');c.lineWidth=1.5;c.beginPath();c.moveTo(ml,h-mb);c.lineTo(w,h-mb);c.moveTo(ml,0);c.lineTo(ml,h-mb);c.stroke();
  c.textAlign='left';c.textBaseline='bottom';c.fillText('x (m)',w-46,h-mb-4);c.fillText('y (m)',ml+6,14);
  const path=(q,t1)=>{c.beginPath();for(let i=0;i<=120;i++){const s2=st(q,t1*i/120);i?c.lineTo(X(s2.x),Y(s2.y)):c.moveTo(X(0),Y(0))}c.stroke()};
  P.ghosts.forEach(q=>{c.strokeStyle=css('gridStrong');c.lineWidth=1.6;path(q,q.T);c.fillStyle=css('muted');c.textAlign='center';c.fillText(q.deg+'°',X(q.L),h-mb-4)});
  c.setLineDash([5,6]);c.strokeStyle=css('accent');c.globalAlpha=.4;c.lineWidth=1.5;path(p,p.T);c.globalAlpha=1;c.setLineDash([]);c.lineWidth=2.6;path(p,P.t);
  if(p.H>.01){c.setLineDash([3,4]);c.strokeStyle=css('amber');c.lineWidth=1;c.beginPath();c.moveTo(X(p.L/2),Y(p.H));c.lineTo(X(p.L/2),Y(0));c.stroke();c.setLineDash([]);
    c.fillStyle=css('amber');c.font=font(600,12);c.textAlign='left';c.textBaseline='middle';c.fillText('H = '+fmt(p.H,1)+' m',X(p.L/2)+6,Y(p.H/2))}
  const b=st(p,P.t),bx=X(b.x),by=Y(Math.max(0,b.y));
  if($('pVec').checked){const k=Math.min(3.2,90/p.v);const ar=(dx,dy,col)=>{if(Math.hypot(dx,dy)<2)return;const ex=bx+dx,ey=by-dy;c.strokeStyle=c.fillStyle=col;c.lineWidth=2.2;c.beginPath();c.moveTo(bx,by);c.lineTo(ex,ey);c.stroke();arrowHead(c,ex,ey,Math.atan2(-dy,dx))};
    ar(p.vx*k,0,css('green'));ar(0,b.vy*k,css('red'));ar(p.vx*k,b.vy*k,css('accent'))}
  c.fillStyle=css('ink');c.beginPath();c.arc(bx,by,7,0,7);c.fill()});
TICK.projectile=dt=>{if(!P.run)return;const p=prm();P.t=Math.min(p.T,P.t+dt*Math.max(1,p.T/4));live(p);draw();
  if(P.t>=p.T){P.run=false;P.ghosts.unshift(p);P.ghosts=P.ghosts.slice(0,5)}};
$('pThrow').onclick=()=>{const p=prm();P.t=0;if(reduced){P.t=p.T;P.ghosts.unshift(p);P.ghosts=P.ghosts.slice(0,5);live(p);draw();return}P.run=true};
$('pClear').onclick=()=>{P.ghosts=[];draw()};['pv','pa','pg'].forEach(id=>$(id).addEventListener('input',up));$('pVec').onchange=draw;up()}

/* ================= LÍ: thấu kính ================= */
{const vals=()=>{const conv=$('lsType').value==='ht',F=+$('lsF').value,f=conv?F:-F,d=+$('lsD').value,hh=+$('lsH').value,inf=Math.abs(d-f)<1e-6,dp=inf?Infinity:d*f/(d-f),k=inf?Infinity:-dp/d;return{conv,F,f,d,hh,dp,k,inf,hp:k*hh}};
function up(){const v=vals();$('olsF').textContent=fmt(v.F)+' cm';$('olsD').textContent=fmt(v.d)+' cm';$('olsH').textContent=fmt(v.hh)+' cm';
  if(v.inf){$('lsNat').textContent='Vật đặt tại tiêu điểm: chùm tia ló song song, không cho ảnh.';$('lsInfo').innerHTML=kv([['d',fmt(v.d,1)+' cm'],['d′','∞']])}
  else{const real=v.dp>0,ak=Math.abs(v.k);$('lsNat').textContent=`Ảnh ${real?'thật':'ảo'}, ${v.k>0?'cùng chiều':'ngược chiều'} với vật, ${Math.abs(ak-1)<.01?'bằng vật':ak>1?'lớn hơn vật':'nhỏ hơn vật'}.`;
    $('lsInfo').innerHTML=kv([['d',fmt(v.d,1)+' cm'],['d′ = d·f / (d − f)',fmt(v.dp,2)+' cm'],['k = −d′/d',fmt(v.k,2)],['h′ = |k|·h',fmt(Math.abs(v.hp),2)+' cm']])}
  draw()}
let S0=1,X0=0;
const draw=canvasOf($('cLens'),(c,w,h)=>{const v=vals(),s=Math.min(w/130,(h/2-24)/7.5),X=x=>w/2+x*s,Y=y=>h/2-y*s;S0=s;X0=w/2;
  c.strokeStyle=css('muted');c.lineWidth=1.3;c.beginPath();c.moveTo(0,h/2);c.lineTo(w,h/2);c.stroke();
  c.fillStyle=css('muted');c.font=font(400,11,'f-mono');c.textAlign='center';c.textBaseline='top';for(let x=-60;x<=60;x+=10){c.fillRect(X(x)-.5,h/2-3,1,6);if(x)c.fillText(x,X(x),h/2+6)}
  const lh=h/2-14;c.strokeStyle=css('accent');c.fillStyle=css('accent');c.lineWidth=2.4;c.beginPath();c.moveTo(w/2,h/2-lh);c.lineTo(w/2,h/2+lh);c.stroke();
  if(v.conv){arrowHead(c,w/2,h/2-lh,-Math.PI/2);arrowHead(c,w/2,h/2+lh,Math.PI/2)}else{arrowHead(c,w/2,h/2-lh+8,Math.PI/2);arrowHead(c,w/2,h/2+lh-8,-Math.PI/2)}
  c.font=font(700,13);c.textAlign='left';c.fillText('O',w/2+5,h/2+5);
  const Fo=-v.f,Fi=v.f;[[Fo,'F'],[Fi,'F′']].forEach(([x,t])=>{c.fillStyle=css('amber');c.beginPath();c.arc(X(x),h/2,4,0,7);c.fill();c.font=font(700,13);c.textAlign='center';c.textBaseline='bottom';c.fillText(t,X(x),h/2-6)});
  const B=[-v.d,v.hh],ray=(col,p0,p1,dir)=>{c.strokeStyle=col;c.lineWidth=1.8;c.beginPath();c.moveTo(X(p0[0]),Y(p0[1]));c.lineTo(X(p1[0]),Y(p1[1]));const L=400,n=Math.hypot(...dir);c.lineTo(X(p1[0]+dir[0]/n*L),Y(p1[1]+dir[1]/n*L));c.stroke();
    const mxp=(X(p0[0])+X(p1[0]))/2,myp=(Y(p0[1])+Y(p1[1]))/2;c.fillStyle=col;arrowHead(c,mxp,myp,Math.atan2(Y(p1[1])-Y(p0[1]),X(p1[0])-X(p0[0])),8);
    if(!v.inf&&v.dp<0){c.setLineDash([4,4]);c.globalAlpha=.7;c.beginPath();c.moveTo(X(p1[0]),Y(p1[1]));c.lineTo(X(v.dp),Y(v.hp));c.stroke();c.setLineDash([]);c.globalAlpha=1}};
  ray(css('amber'),B,[0,v.hh],v.conv?[v.f,-v.hh]:[-v.f,v.hh]);
  ray(css('green'),B,[0,0],[v.d,-v.hh]);
  if(Math.abs(v.d-v.f)>.3){const y3=-v.hh*v.f/(v.d-v.f);if(Math.abs(y3)<20)ray(css('red'),B,[0,y3],[1,0])}
  const arrow=(x,y,col,dash,lab)=>{c.strokeStyle=c.fillStyle=col;c.lineWidth=3;c.setLineDash(dash?[6,4]:[]);c.beginPath();c.moveTo(X(x),Y(0));c.lineTo(X(x),Y(y));c.stroke();c.setLineDash([]);arrowHead(c,X(x),Y(y),y>0?-Math.PI/2:Math.PI/2,11);
    c.font=font(700,14);c.textAlign='center';c.textBaseline=y>0?'bottom':'top';c.fillText(lab[1],X(x),Y(y)+(y>0?-8:8));c.textBaseline=y>0?'top':'bottom';c.fillText(lab[0],X(x),Y(0)+(y>0?6:-6))};
  arrow(-v.d,v.hh,css('ink'),false,['A','B']);
  if(!v.inf&&Math.abs(v.dp)<200)arrow(v.dp,v.hp,css('accent'),v.dp<0,['A′','B′'])});
drag($('cLens'),(x,y,dx,dy,t)=>{if(t==='up')return;const d=Math.max(1,Math.min(60,Math.round(-(x-X0)/S0*2)/2));$('lsD').value=d;up()});
['lsType','lsF','lsD','lsH'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= LÍ: khúc xạ ================= */
{const NM={'1':'Không khí','1.33':'Nước','1.5':'Thuỷ tinh','2.42':'Kim cương'};
const val=()=>{const n1=+$('rfN1').value,n2=+$('rfN2').value,i=+$('rfI').value*Math.PI/180,sr=n1*Math.sin(i)/n2;return{n1,n2,i,tir:sr>1+1e-12,r:sr>1?null:Math.asin(Math.min(1,sr)),igh:n1>n2?Math.asin(n2/n1):null}};
const deg=x=>fmt(x*180/Math.PI,1)+'°';
function up(){const v=val();$('orfI').textContent=$('rfI').value+'°';
  $('rfInfo').innerHTML=kv([['n₁ · sin i',fmt(v.n1*Math.sin(v.i),3)],['Góc khúc xạ r',v.tir?'không có':deg(v.r)],['Góc giới hạn i_gh',v.igh?deg(v.igh):'không có (n₁ ≤ n₂)']]);
  const V=$('rfV');V.className='verdict'+(v.tir?' bad':'');
  V.textContent=v.tir?'Phản xạ toàn phần: i > i_gh, toàn bộ ánh sáng bị phản xạ trở lại.':v.n1<v.n2?'Ánh sáng đi vào môi trường chiết quang hơn: tia khúc xạ lệch gần pháp tuyến (r < i).':v.n1>v.n2?'Ánh sáng đi ra môi trường kém chiết quang hơn: tia khúc xạ lệch xa pháp tuyến (r > i).':'Hai môi trường như nhau: tia sáng truyền thẳng.';draw()}
const draw=canvasOf($('cRefr'),(c,w,h)=>{const v=val(),ox=w/2,oy=h/2,L=Math.min(w*.46,h*.46);
  c.fillStyle=rgba('accent',.03+(v.n1-1)*.12);c.fillRect(0,0,w,oy);c.fillStyle=rgba('accent',.03+(v.n2-1)*.12);c.fillRect(0,oy,w,h-oy);
  c.strokeStyle=css('muted');c.lineWidth=1.5;c.beginPath();c.moveTo(0,oy);c.lineTo(w,oy);c.stroke();
  c.setLineDash([6,5]);c.lineWidth=1;c.beginPath();c.moveTo(ox,8);c.lineTo(ox,h-8);c.stroke();c.setLineDash([]);
  c.fillStyle=css('ink');c.font=font(600,13);c.textAlign='left';c.textBaseline='top';c.fillText(`${NM[$('rfN1').value]} (n₁ = ${fmt(v.n1,2)})`,12,10);c.textBaseline='bottom';c.fillText(`${NM[$('rfN2').value]} (n₂ = ${fmt(v.n2,2)})`,12,h-10);
  c.fillStyle=css('muted');c.font=font(500,12);c.textAlign='left';c.textBaseline='top';c.fillText('pháp tuyến',ox+6,10);
  const P=[ox-L*Math.sin(v.i),oy-L*Math.cos(v.i)],Rf=[ox+L*Math.sin(v.i),oy-L*Math.cos(v.i)];
  const beam=(a,b,col,lw,alpha)=>{c.globalAlpha=alpha;c.strokeStyle=c.fillStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke();arrowHead(c,(a[0]+b[0])/2,(a[1]+b[1])/2,Math.atan2(b[1]-a[1],b[0]-a[0]),10);c.globalAlpha=1};
  beam(P,[ox,oy],css('amber'),3.2,1);beam([ox,oy],Rf,css('amber'),v.tir?3.2:1.8,v.tir?1:.4);
  if(!v.tir){const T=[ox+L*Math.sin(v.r),oy+L*Math.cos(v.r)];beam([ox,oy],T,css('red'),3.2,1);
    c.strokeStyle=css('red');c.lineWidth=1.5;c.beginPath();c.arc(ox,oy,46,Math.PI/2-v.r,Math.PI/2);c.stroke();c.fillStyle=css('red');c.font=font(700,14);c.textAlign='center';c.textBaseline='middle';c.fillText('r',ox+58*Math.sin(v.r/2),oy+58*Math.cos(v.r/2))}
  c.strokeStyle=css('amber');c.lineWidth=1.5;c.beginPath();c.arc(ox,oy,46,-Math.PI/2-v.i,-Math.PI/2);c.stroke();c.fillStyle=css('amber');c.font=font(700,14);c.textAlign='center';c.textBaseline='middle';c.fillText('i',ox-58*Math.sin(v.i/2),oy-58*Math.cos(v.i/2));
  if(v.igh){c.setLineDash([3,5]);c.strokeStyle=css('muted');c.lineWidth=1;c.beginPath();c.moveTo(ox,oy);c.lineTo(ox-L*.8*Math.sin(v.igh),oy-L*.8*Math.cos(v.igh));c.stroke();c.setLineDash([]);
    c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='right';c.fillText('i_gh',ox-L*.82*Math.sin(v.igh)-4,oy-L*.82*Math.cos(v.igh))}});
drag($('cRefr'),(x,y,dx,dy,t)=>{if(t==='up')return;const r=$('cRefr').getBoundingClientRect(),ox=r.width/2,oy=r.height/2;if(y>=oy-2)return;$('rfI').value=Math.round(Math.min(89,Math.atan2(Math.abs(x-ox),oy-y)*180/Math.PI));up()});
$('rfSwap').onclick=()=>{const a=$('rfN1').value;$('rfN1').value=$('rfN2').value;$('rfN2').value=a;up()};
['rfN1','rfN2','rfI'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= LÍ: con lắc đơn ================= */
{const P={t:0,play:!reduced,hist:[]};
const prm=()=>({l:+$('pdL').value,a0:+$('pdA').value*Math.PI/180,m:+$('pdM').value,g:+$('pdG').value,damp:$('pdDamp').checked});
const amp=(p,t)=>p.a0*(p.damp?Math.exp(-.12*t):1),ang=(p,t)=>amp(p,t)*Math.cos(Math.sqrt(p.g/p.l)*t);
function energy(p){const a=ang(p,P.t),A=amp(p,P.t),W=p.m*p.g*p.l*(1-Math.cos(A)),Wt=p.m*p.g*p.l*(1-Math.cos(a)),W0=p.m*p.g*p.l*(1-Math.cos(p.a0));
  $('pdE').innerHTML=[['Thế năng',Wt],['Động năng',Math.max(0,W-Wt)],['Cơ năng',W]].map(([n,v])=>`<div class="bar"><span>${n}</span><div class="track"><div class="obs" style="width:${v/W0*100}%;transition:none${n==='Thế năng'?';background:var(--amber)':n==='Động năng'?';background:var(--green)':''}"></div></div><span>${fmt(v*1000,1)} mJ</span></div>`).join('')}
function up(reset=true){const p=prm();$('opdL').textContent=fmt(p.l,2)+' m';$('opdA').textContent=$('pdA').value+'°';$('opdM').textContent=fmt(p.m,2)+' kg';
  if(reset){P.t=0;P.hist=[]}
  const w=Math.sqrt(p.g/p.l),s0=p.l*p.a0;
  $('pdInfo').innerHTML=kv([['T',fmt(2*Math.PI/w,3)+' s'],['f = 1/T',fmt(w/(2*Math.PI),3)+' Hz'],['ω = √(g/l)',fmt(w,3)+' rad/s'],['S₀ = l·α₀',fmt(s0*100,2)+' cm'],['v max = ω·S₀',fmt(w*s0,3)+' m/s']]);energy(p);draw()}
const draw=canvasOf($('cPend'),(c,w,h)=>{const p=prm(),wide=w>=640,pw=wide?w*.42:w,ph=wide?h:h*.56,cx=pw/2,py=24,Lpx=p.l/2*(ph-70),a=ang(p,P.t);
  c.fillStyle=css('gridStrong');c.fillRect(cx-50,py-8,100,8);
  c.setLineDash([4,5]);c.strokeStyle=css('gridStrong');c.lineWidth=1;c.beginPath();c.moveTo(cx,py);c.lineTo(cx,py+Lpx+20);c.stroke();
  c.beginPath();c.arc(cx,py,Lpx,Math.PI/2-p.a0,Math.PI/2+p.a0);c.stroke();c.setLineDash([]);
  const bx=cx+Lpx*Math.sin(a),by=py+Lpx*Math.cos(a);c.strokeStyle=css('ink');c.lineWidth=1.6;c.beginPath();c.moveTo(cx,py);c.lineTo(bx,by);c.stroke();
  c.fillStyle=css('accent');c.beginPath();c.arc(bx,by,8+p.m*10,0,7);c.fill();
  c.strokeStyle=css('amber');c.lineWidth=1.5;c.beginPath();c.arc(cx,py,36,Math.PI/2,Math.PI/2-a,a>0);c.stroke();
  c.fillStyle=css('amber');c.font=font(600,12);c.textAlign='left';c.textBaseline='top';c.fillText('α = '+fmt(a*180/Math.PI,1)+'°',cx+8,py+40);
  const gx0=wide?pw+40:46,gx1=w-16,gy0=wide?30:ph+14,gy1=h-30,gm=(gy0+gy1)/2,sMax=p.l*p.a0*100*1.15,Tw=6;
  const GX=t=>gx1-(P.t-t)/Tw*(gx1-gx0),GY=s=>gm-s/sMax*(gy1-gy0)/2;
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let k=Math.ceil(P.t-Tw);k<=P.t;k++){if(k<0)continue;c.beginPath();c.moveTo(GX(k),gy0);c.lineTo(GX(k),gy1);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(k+' s',GX(k),gy1+4)}
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(gx0,gm);c.lineTo(gx1,gm);c.moveTo(gx0,gy0);c.lineTo(gx0,gy1);c.stroke();
  c.textAlign='left';c.textBaseline='top';c.fillText('s (cm)',gx0+4,gy0);c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(sMax/1.15,1),gx0-4,GY(sMax/1.15));c.fillText(fmt(-sMax/1.15,1),gx0-4,GY(-sMax/1.15));
  if(P.hist.length>1){c.strokeStyle=css('accent');c.lineWidth=2.2;c.beginPath();P.hist.forEach(([t,s],i)=>i?c.lineTo(GX(t),GY(s)):c.moveTo(GX(t),GY(s)));c.stroke()}
  const sNow=p.l*a*100;c.fillStyle=css('accent');c.beginPath();c.arc(gx1,GY(sNow),5,0,7);c.fill();
  if(wide){c.setLineDash([3,4]);c.strokeStyle=rgba('accent',.35);c.lineWidth=1;c.beginPath();c.moveTo(bx,by);c.lineTo(gx1,GY(sNow));c.stroke();c.setLineDash([])}});
TICK.pend=dt=>{if(!P.play)return;const p=prm();P.t+=dt;P.hist.push([P.t,p.l*ang(p,P.t)*100]);while(P.hist.length&&P.hist[0][0]<P.t-6)P.hist.shift();energy(p);draw()};
$('pdPlay').textContent=P.play?'Tạm dừng':'Chạy';
$('pdPlay').onclick=()=>{P.play=!P.play;$('pdPlay').textContent=P.play?'Tạm dừng':'Chạy'};$('pdReset').onclick=()=>up(true);
['pdL','pdA','pdM','pdG','pdDamp'].forEach(id=>$(id).addEventListener('input',()=>up(true)));up()}

/* ================= LÍ: sóng trên dây ================= */
{const W={t:0,play:!reduced,hist:[]},LEN=1.2,A=.04;
const prm=()=>{const mode=$('stMode').value,f=+$('stF').value,n=+$('stN').value,lam=mode==='stand'?2*LEN/n:+$('stL').value;return{mode,f,n,lam,v:lam*f,xm:+$('stM').value}};
const u=(p,x,t)=>{const w=2*Math.PI*p.f,k=2*Math.PI/p.lam;if(p.mode==='stand')return 2*A*Math.sin(k*x)*Math.sin(w*t);return x>p.v*t?0:A*Math.cos(w*t-k*x)};
function up(reset){const p=prm();$('stLrow').hidden=p.mode==='stand';$('stNrow').hidden=p.mode!=='stand';
  $('ostF').textContent=fmt(p.f)+' Hz';$('ostL').textContent=fmt(p.lam,2)+' m';$('ostN').textContent=p.n;$('ostM').textContent=fmt(p.xm,2)+' m';
  if(reset){W.t=p.mode==='stand'?0:0;W.hist=[]}
  const rows=[['Tốc độ truyền v = λ·f',fmt(p.v,2)+' m/s'],['Bước sóng λ',fmt(p.lam,2)+' m'],['Chu kì T = 1/f',fmt(1/p.f,2)+' s']];
  if(p.mode==='run'){const dphi=2*Math.PI*p.xm/p.lam;rows.push(['Độ lệch pha M so với nguồn',`Δφ = 2πx/λ ≈ ${fmt(dphi/Math.PI,2)}π`],['Thời điểm sóng tới M',fmt(p.xm/p.v,2)+' s'])}
  else{const am=Math.abs(2*A*Math.sin(2*Math.PI*p.xm/p.lam))*100;rows.push(['Điều kiện: l = k·λ/2',`${fmt(LEN,1)} = ${p.n}·${fmt(p.lam/2,2)}`],['Số nút / số bụng',`${p.n+1} / ${p.n}`],['Biên độ tại M',fmt(am,2)+' cm'])}
  $('stInfo').innerHTML=kv(rows);draw()}
const draw=canvasOf($('cStr'),(c,w,h)=>{const p=prm(),mx=30,X=x=>mx+x/LEN*(w-2*mx),top=h*.5,y0=top*.55,sc=top*.38/(2*A),Y=v=>y0-v*sc;
  c.strokeStyle=css('grid');c.lineWidth=1;c.beginPath();c.moveTo(mx,y0);c.lineTo(w-mx,y0);c.stroke();
  c.fillStyle=css('muted');c.font=font(400,11,'f-mono');c.textAlign='center';c.textBaseline='top';for(let x=0;x<=LEN+1e-9;x+=.2){c.fillRect(X(x)-.5,y0+top*.38+6,1,5);c.fillText(fmt(x,1),X(x),y0+top*.38+13)}
  if(p.mode==='stand'){c.setLineDash([4,4]);c.strokeStyle=css('gridStrong');[1,-1].forEach(sg=>{c.beginPath();for(let i=0;i<=300;i++){const x=LEN*i/300,v=sg*2*A*Math.sin(2*Math.PI*x/p.lam);i?c.lineTo(X(x),Y(v)):c.moveTo(X(x),Y(v))}c.stroke()});c.setLineDash([]);
    c.fillStyle=css('red');for(let k=0;k<=p.n;k++){c.beginPath();c.arc(X(k*p.lam/2),y0,4,0,7);c.fill()}
    c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='center';c.textBaseline='bottom';c.fillText('nút',X(0)+12,y0-6);if(p.n>=1)c.fillText('bụng',X(p.lam/4),Y(2*A)-4)}
  c.strokeStyle=css('accent');c.lineWidth=3;c.beginPath();for(let i=0;i<=400;i++){const x=LEN*i/400,v=u(p,x,W.t);i?c.lineTo(X(x),Y(v)):c.moveTo(X(x),Y(v))}c.stroke();
  c.fillStyle=css('ink');c.fillRect(X(0)-4,y0-top*.4,4,top*.8);if(p.mode==='stand')c.fillRect(X(LEN),y0-top*.4,4,top*.8);
  const um=u(p,p.xm,W.t);c.fillStyle=css('red');c.beginPath();c.arc(X(p.xm),Y(um),7,0,7);c.fill();c.font=font(700,13);c.textAlign='center';c.textBaseline='bottom';c.fillText('M',X(p.xm),Y(um)-9);
  // đồ thị u_M(t)
  const gx0=50,gx1=w-20,gy0=top+30,gy1=h-26,gm=(gy0+gy1)/2,Tw=Math.max(3,3/p.f),GX=t=>gx1-(W.t-t)/Tw*(gx1-gx0),GY=v=>gm-v/(2.3*A)*(gy1-gy0)/2;
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let k=Math.ceil(W.t-Tw);k<=W.t;k++){if(k<0)continue;c.beginPath();c.moveTo(GX(k),gy0);c.lineTo(GX(k),gy1);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(k+' s',GX(k),gy1+4)}
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(gx0,gm);c.lineTo(gx1,gm);c.stroke();
  c.textAlign='left';c.textBaseline='bottom';c.fillStyle=css('red');c.font=font(600,12);c.fillText('Li độ của M theo thời gian, u_M (cm)',gx0,gy0-4);
  c.fillStyle=css('muted');c.font=font(400,11,'f-mono');c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(2*A*100,0),gx0-4,GY(2*A));c.fillText('−'+fmt(2*A*100,0),gx0-4,GY(-2*A));
  if(W.hist.length>1){c.strokeStyle=css('red');c.lineWidth=2;c.beginPath();W.hist.forEach(([t,v],i)=>i?c.lineTo(GX(t),GY(v)):c.moveTo(GX(t),GY(v)));c.stroke()}
  c.setLineDash([3,4]);c.strokeStyle=rgba('red',.35);c.lineWidth=1;c.beginPath();c.moveTo(X(p.xm),Y(um));c.lineTo(gx1,GY(um));c.stroke();c.setLineDash([])});
TICK.string=dt=>{if(!W.play)return;const p=prm();W.t+=dt;W.hist.push([W.t,u(p,p.xm,W.t)]);const Tw=Math.max(3,3/p.f);while(W.hist.length&&W.hist[0][0]<W.t-Tw)W.hist.shift();draw()};
$('stPlay').textContent=W.play?'Tạm dừng':'Chạy';$('stPlay').onclick=()=>{W.play=!W.play;$('stPlay').textContent=W.play?'Tạm dừng':'Chạy'};
['stMode','stF','stL','stN'].forEach(id=>$(id).addEventListener('input',()=>up(true)));$('stM').addEventListener('input',()=>{W.hist=[];up(false)});up(true)}

/* ================= LÍ: giao thoa ================= */
{const W={t:0,play:!reduced};const off=document.createElement('canvas');
function up(){const d=+$('wvD').value,l=+$('wvL').value;$('owvD').textContent=fmt(d)+' cm';$('owvL').textContent=fmt(l)+' cm';
  let cd=0,ct=0;for(let k=-50;k<=50;k++){if(Math.abs(k)*l<d-1e-9)cd++;if(Math.abs(k+.5)*l<d-1e-9)ct++}
  $('wvInfo').innerHTML=kv([['Số cực đại trên S₁S₂',cd],['Số cực tiểu trên S₁S₂',ct],['Khoảng cách hai cực đại liên tiếp trên S₁S₂','λ/2 = '+fmt(l/2,2)+' cm']]);draw()}
const draw=canvasOf($('cWave'),(c,w,h)=>{const d=+$('wvD').value,lam=+$('wvL').value,s=w/26,k=2*Math.PI/lam,wt=2*Math.PI*.8*W.t,q=3,gw=Math.ceil(w/q),gh=Math.ceil(h/q);
  off.width=gw;off.height=gh;const o=off.getContext('2d'),img=o.createImageData(gw,gh),D=img.data,c0=hexRgb(css('surface')),c1=hexRgb(css('accent'));
  for(let py=0;py<gh;py++){const y=(py*q-h/2)/s;for(let px=0;px<gw;px++){const x=(px*q-w/2)/s,r1=Math.hypot(x+d/2,y),r2=Math.hypot(x-d/2,y),v=Math.cos(wt-k*r1)+Math.cos(wt-k*r2),t=(v+2)/4,i=(py*gw+px)*4;
    D[i]=c0[0]+(c1[0]-c0[0])*t;D[i+1]=c0[1]+(c1[1]-c0[1])*t;D[i+2]=c0[2]+(c1[2]-c0[2])*t;D[i+3]=255}}
  o.putImageData(img,0,0);c.imageSmoothingEnabled=true;c.drawImage(off,0,0,gw*q,gh*q);
  if($('wvLines').checked){c.strokeStyle=rgba('red',.75);c.lineWidth=1.3;const ym=h/2/s;
    for(let m=-30;m<=30;m++){const a=m*lam/2,cc=d/2;if(Math.abs(a)>=cc-1e-9)continue;const b2=cc*cc-a*a;c.beginPath();
      for(let i=0;i<=80;i++){const y=-ym+2*ym*i/80,x=a===0?0:Math.sign(a)*Math.abs(a)*Math.sqrt(1+y*y/b2);i?c.lineTo(w/2+x*s,h/2+y*s):c.moveTo(w/2+x*s,h/2+y*s)}c.stroke();
      c.fillStyle=css('red');c.font=font(600,11,'f-mono');c.textAlign='center';c.textBaseline='top';const xt=a===0?0:Math.sign(a)*Math.abs(a)*Math.sqrt(1+ym*ym/b2);if(Math.abs(xt*s)<w/2-8)c.fillText('k='+String(m).replace('-','−'),w/2+xt*s,4)}}
  [[-d/2,'S₁'],[d/2,'S₂']].forEach(([x,t])=>{c.fillStyle=css('ink');c.beginPath();c.arc(w/2+x*s,h/2,6,0,7);c.fill();c.font=font(700,13);c.textAlign='center';c.textBaseline='top';c.fillText(t,w/2+x*s,h/2+9)})});
TICK.wave=dt=>{if(!W.play)return;W.t+=dt;draw()};
$('wvPlay').textContent=W.play?'Tạm dừng':'Chạy';$('wvPlay').onclick=()=>{W.play=!W.play;$('wvPlay').textContent=W.play?'Tạm dừng':'Chạy'};
['wvD','wvL','wvLines'].forEach(id=>$(id).addEventListener('input',up));up()}
