
/* ================= BỔ SUNG THEO CHƯƠNG TRÌNH GDPT 2018 ================= */
const EMOJI='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const neg=n=>String(n).replace('-','−');

/* ---------- Toán 6: số nguyên trên trục số ---------- */
{const I={t:2,op:1,play:false};
const val=()=>{const a=+$('inA').value,b=+$('inB').value;return{a,b,step:I.op*b,r:a+I.op*b}};
function up(reset){const v=val();if(reset){I.t=2;I.play=false}presetSync('#p-intline [data-op]','op',I.op);$('oinA').textContent=neg(v.a);$('oinB').textContent=neg(v.b);
  $('inEq').textContent=`${neg(v.a)} ${I.op>0?'+':'−'} ${v.b<0?'('+neg(v.b)+')':v.b} = ${neg(v.r)}`;
  const dir=n=>n>0?'sang phải':n<0?'sang trái':'đứng yên';
  const rows=[['Bước 1',`từ 0 đi ${dir(v.a)} ${Math.abs(v.a)} đơn vị, tới ${neg(v.a)}`]];
  if(I.op<0)rows.push(['Đổi phép trừ',`a − b = a + (−b), cộng với ${neg(-v.b)}`]);
  rows.push(['Bước 2',`đi tiếp ${dir(v.step)} ${Math.abs(v.step)} đơn vị`],['Kết quả',neg(v.r)]);$('inInfo').innerHTML=kv(rows);
  $('inV').textContent=I.op>0?(v.b<0?'Cộng với số nguyên âm: đi sang trái trên trục số.':'Cộng với số nguyên dương: đi sang phải trên trục số.'):'Trừ một số nguyên là cộng với số đối của nó.';draw()}
const draw=canvasOf($('cInt'),(c,w,h)=>{const v=val(),R=Math.max(12,Math.abs(v.a)+2,Math.abs(v.r)+2),s=(w-40)/(2*R),X=x=>w/2+x*s,y0=h*.68;
  c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();c.moveTo(10,y0);c.lineTo(w-10,y0);c.stroke();c.fillStyle=css('ink');arrowHead(c,w-8,y0,0,10);
  c.font=font(500,12,'f-mono');c.textAlign='center';c.textBaseline='top';const ev=s<22?5:1;
  for(let k=-R;k<=R;k++){const x=X(k);c.fillStyle=k===0?css('ink'):css('muted');c.fillRect(x-1,y0-(k%5?5:8),2,k%5?10:16);if(k%ev===0){c.font=font(k?500:700,12,'f-mono');c.fillText(neg(k),x,y0+12)}}
  c.fillStyle=css('red');c.font=font(600,12);c.textAlign='left';c.fillText('số âm ←',14,y0+34);c.fillStyle=css('green');c.textAlign='right';c.fillText('→ số dương',w-14,y0+34);
  const hop=(x1,x2,col,lab,p)=>{const H=Math.min(h*.35,Math.abs(x2-x1)*s*.45+24),mx=(X(x1)+X(x2))/2,pt=t=>{const u=1-t;return[u*u*X(x1)+2*u*t*mx+t*t*X(x2),u*u*y0+2*u*t*(y0-2*H)+t*t*y0]};
    c.setLineDash([5,5]);c.strokeStyle=col;c.globalAlpha=.35;c.lineWidth=2;c.beginPath();for(let i=0;i<=40;i++){const q=pt(i/40);i?c.lineTo(...q):c.moveTo(...q)}c.stroke();c.setLineDash([]);c.globalAlpha=1;
    if(p>0){c.lineWidth=3;c.beginPath();for(let i=0;i<=40;i++){const q=pt(i/40*p);i?c.lineTo(...q):c.moveTo(...q)}c.stroke();if(p>=1&&x1!==x2){c.fillStyle=col;arrowHead(c,X(x2),y0-2,Math.atan2(2*H,X(x2)-mx),10)}}
    c.fillStyle=col;c.font=font(700,14,'f-mono');c.textAlign='center';c.textBaseline='bottom';c.fillText(lab,mx,y0-H-8);return pt};
  const p1=hop(0,v.a,css('accent'),(v.a>0?'+':'')+neg(v.a),Math.min(1,I.t)),p2=hop(v.a,v.r,css('red'),(v.step>0?'+':'')+neg(v.step),Math.max(0,Math.min(1,I.t-1)));
  const fp=I.t<1?p1(I.t):p2(Math.min(1,I.t-1));drawArt(c,'frog',fp[0],fp[1]-14,44);
  if(I.t>=2){c.fillStyle=css('ink');c.beginPath();c.arc(X(v.r),y0,6,0,7);c.fill();c.font=font(700,13);c.textBaseline='top';c.fillText('kết quả '+neg(v.r),X(v.r),y0+50)}});
document.querySelectorAll('#p-intline [data-op]').forEach(b=>b.onclick=()=>{I.op=+b.dataset.op;up(true)});
$('inGo').onclick=()=>{I.t=0;I.play=true};['inA','inB'].forEach(id=>$(id).addEventListener('input',()=>up(true)));
TICK.intline=dt=>{if(!I.play)return;I.t=Math.min(2,I.t+dt*(reduced?2:.8));if(I.t>=2)I.play=false;draw()};up(true)}

/* ---------- Toán 6: phân số ---------- */
{const Fq={op:'add'};const lcm=(a,b)=>a/gcd(a,b)*b;
const simp=(n,m)=>{const g=gcd(Math.abs(n),m)||1;return[n/g,m/g]},ft=([n,m])=>m===1?neg(n):neg(n)+'/'+m;
function calc(){const a=+$('frA').value,b=+$('frB').value,c=+$('frC').value,d=+$('frD').value,L=lcm(b,d),A=a*L/b,C=c*L/d;
  const R=Fq.op==='add'?A+C:Fq.op==='sub'?A-C:null;return{a,b,c,d,L,A,C,R}}
function up(){const v=calc();presetSync('#p-fraction [data-fo]','fo',Fq.op);['A','B','C','D'].forEach(k=>$('ofr'+k).textContent=$('fr'+k).value);
  let eq,rows=[['Mẫu số chung nhỏ nhất',v.L],['Quy đồng',`${v.a}/${v.b} = ${v.A}/${v.L} ;  ${v.c}/${v.d} = ${v.C}/${v.L}`]];
  if(Fq.op==='cmp'){const s=v.A>v.C?'>':v.A<v.C?'<':'=';eq=`${v.a}/${v.b} ${s} ${v.c}/${v.d}`;rows.push(['So sánh tử số',`${v.A} ${s} ${v.C}`])}
  else{const r=simp(v.R,v.L);eq=`${v.a}/${v.b} ${Fq.op==='add'?'+':'−'} ${v.c}/${v.d} = ${neg(v.R)}/${v.L}${r[1]!==v.L?' = '+ft(r):''}`;
    rows.push(['Kết quả rút gọn',ft(r)]);if(Math.abs(r[0])>r[1]&&r[1]>1){const q=Math.trunc(r[0]/r[1]),rr=Math.abs(r[0]%r[1]);rows.push(['Hỗn số',`${neg(q)} ${rr}/${r[1]}`])}}
  $('frEq').textContent=eq;$('frInfo').innerHTML=kv(rows);draw()}
const draw=canvasOf($('cFrac'),(c,w,h)=>{const v=calc(),rowsD=[[v.a,v.b,css('accent'),`${v.a}/${v.b}`],[v.c,v.d,css('green'),`${v.c}/${v.d}`]];
  if(Fq.op==='cmp')rowsD.push([v.A,v.L,css('accent'),`= ${v.A}/${v.L}`],[v.C,v.L,css('green'),`= ${v.C}/${v.L}`]);else rowsD.push([v.R,v.L,css('red'),`${Fq.op==='add'?'tổng':'hiệu'} ${neg(v.R)}/${v.L}`]);
  const maxW=Math.max(1,...rowsD.map(r=>Math.ceil(Math.abs(r[0])/r[1])||1)),lx=150,U=(w-lx-24)/maxW,rh=Math.min(44,(h-40)/rowsD.length-14);
  rowsD.forEach(([n,m,col,lab],i)=>{const y=24+i*(rh+16),cx=34,cy=y+rh/2,pr=Math.min(20,rh/2),frac=m?((Math.abs(n)%m)/m||(n&&!(n%m)?1:0)):0;
    c.fillStyle=css('surface');c.beginPath();c.arc(cx,cy,pr,0,7);c.fill();if(frac){c.fillStyle=col;c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,pr,-Math.PI/2,-Math.PI/2+frac*2*Math.PI);c.closePath();c.fill()}
    c.strokeStyle=css('ink');c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,pr,0,7);c.stroke();
    c.fillStyle=css('ink');c.font=font(700,15,'f-mono');c.textAlign='left';c.textBaseline='middle';c.fillText(lab,62,cy);
    const wholes=Math.max(1,Math.ceil(Math.abs(n)/m));for(let k=0;k<wholes;k++)for(let j=0;j<m;j++){const idx=k*m+j,x=lx+k*U+j*U/m;c.fillStyle=idx<Math.abs(n)?(n<0?css('red'):col):css('surface');c.globalAlpha=idx<Math.abs(n)?.75:1;c.fillRect(x,y,U/m,rh);c.globalAlpha=1;c.strokeStyle=css('ink');c.lineWidth=1;c.strokeRect(x,y,U/m,rh)}
    c.lineWidth=2.4;for(let k=0;k<wholes;k++)c.strokeRect(lx+k*U,y,U,rh)});
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='left';c.textBaseline='bottom';c.fillText('Mỗi khung đậm là 1 đơn vị',lx,h-6)});
document.querySelectorAll('#p-fraction [data-fo]').forEach(b=>b.onclick=()=>{Fq.op=b.dataset.fo;up()});['frA','frB','frC','frD'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- Toán 7: tổng ba góc tam giác ---------- */
// Toạ độ đỉnh lưu trong một ô vuông đơn vị, rồi mới đổi ra điểm ảnh, để hình không bị kéo giãn theo khung vẽ
{const T={P:[[.12,.84],[.82,.84],[.38,.2]],drag:-1,box:{x:0,y:0,s:1}};const h3=Math.sqrt(3)/2;
const PRE={deu:[[.1,.86],[.9,.86],[.5,.86-.8*h3]],vc:[[.18,.86],[.84,.86],[.18,.2]],tu:[[.06,.78],[.56,.78],[.94,.24]]};
const pts=()=>T.P.map(([u,v])=>[T.box.x+u*T.box.s,T.box.y+v*T.box.s]);
function ang(P,i){const a=P[i],b=P[(i+1)%3],c=P[(i+2)%3],u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-a[0],c[1]-a[1]];return Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))*180/Math.PI}
function up(){const P=T.P,A=[0,1,2].map(i=>ang(P,i)),L=[0,1,2].map(i=>Math.hypot(P[(i+1)%3][0]-P[(i+2)%3][0],P[(i+1)%3][1]-P[(i+2)%3][1])*10);
  const byA=A.some(x=>Math.abs(x-90)<.6)?'vuông':A.some(x=>x>90)?'tù':'nhọn',eq=(x,y)=>Math.abs(x-y)/Math.max(x,y)<.02,byS=eq(L[0],L[1])&&eq(L[1],L[2])?'đều':eq(L[0],L[1])||eq(L[1],L[2])||eq(L[0],L[2])?'cân':'';
  const r=x=>Math.round(x*10)/10,sum=r(A[0])+r(A[1])+r(A[2]);
  $('triInfo').innerHTML=kv([['Â',fmt(A[0],1)+'°'],['B̂',fmt(A[1],1)+'°'],['Ĉ',fmt(A[2],1)+'°'],['Â + B̂ + Ĉ',fmt(Math.abs(sum-180)<.25?180:sum,1)+'°'],['Cạnh BC, CA, AB',L.map(x=>fmt(x,1)).join('; ')+' cm'],['Loại tam giác',byS==='đều'?'tam giác đều':`tam giác ${byA}${byS?' cân':''}`]]);
  presetSync('#p-triangle [data-tp]','tp',Object.keys(PRE).find(k=>PRE[k].every((p,i)=>Math.hypot(p[0]-T.P[i][0],p[1]-T.P[i][1])<1e-6))||'');
  $('triV').textContent='Tổng ba góc của một tam giác luôn bằng 180°, dù tam giác có hình dạng thế nào.';draw()}
const COLS=['red','green','amber'];
const draw=canvasOf($('cTri'),(c,w,h)=>{const narrow=w<560,lw=narrow?w:w*.66,th=narrow?h*.66:h,S=Math.min(lw-40,th-48);T.box={x:(lw-S)/2,y:(th-S)/2,s:S};const P=pts(),A=[0,1,2].map(i=>ang(P,i));
  c.fillStyle=rgba('accent',.08);c.strokeStyle=css('ink');c.lineWidth=2.4;c.beginPath();P.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();c.stroke();
  const cx=(P[0][0]+P[1][0]+P[2][0])/3,cy=(P[0][1]+P[1][1]+P[2][1])/3;
  P.forEach((p,i)=>{const b=P[(i+1)%3],d=P[(i+2)%3],a1=Math.atan2(b[1]-p[1],b[0]-p[0]),a2=Math.atan2(d[1]-p[1],d[0]-p[0]);let df=a2-a1;while(df>Math.PI)df-=2*Math.PI;while(df<-Math.PI)df+=2*Math.PI;
    if(Math.abs(A[i]-90)<.6){const k=16,u1=[Math.cos(a1),Math.sin(a1)],u2=[Math.cos(a2),Math.sin(a2)];c.fillStyle=rgba(COLS[i],.35);c.strokeStyle=css(COLS[i]);c.lineWidth=2;c.beginPath();c.moveTo(...p);c.lineTo(p[0]+u1[0]*k,p[1]+u1[1]*k);c.lineTo(p[0]+(u1[0]+u2[0])*k,p[1]+(u1[1]+u2[1])*k);c.lineTo(p[0]+u2[0]*k,p[1]+u2[1]*k);c.closePath();c.fill();c.stroke()}
    else{c.fillStyle=rgba(COLS[i],.35);c.strokeStyle=css(COLS[i]);c.lineWidth=2;c.beginPath();c.moveTo(...p);c.arc(p[0],p[1],26,a1,a1+df,df<0);c.closePath();c.fill();c.stroke()}
    const m=a1+df/2;c.fillStyle=css(COLS[i]);c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='middle';c.fillText(fmt(A[i],0)+'°',p[0]+46*Math.cos(m),p[1]+46*Math.sin(m));
    const dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1;c.fillStyle=css('ink');c.font=font(700,16);c.fillText('ABC'[i],p[0]+dx/l*18,p[1]+dy/l*18);c.beginPath();c.arc(p[0],p[1],6,0,7);c.fill()});
  const ox=narrow?w/2:lw+(w-lw)/2,oy=narrow?h*.9:h*.6,r=narrow?Math.min(w*.3,h*.2):Math.min((w-lw)*.42,h*.3);let st=Math.PI;
  c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();c.moveTo(ox-r-14,oy);c.lineTo(ox+r+14,oy);c.stroke();
  A.forEach((a,i)=>{const e=i===2?2*Math.PI:st+a*Math.PI/180;c.fillStyle=rgba(COLS[i],.45);c.strokeStyle=css(COLS[i]);c.lineWidth=2;c.beginPath();c.moveTo(ox,oy);c.arc(ox,oy,r,st,e);c.closePath();c.fill();c.stroke();
    const mid=(st+e)/2;c.fillStyle=css('ink');c.font=font(700,13);c.textAlign='center';c.textBaseline='middle';c.fillText('ABC'[i],ox+r*.66*Math.cos(mid),oy+r*.66*Math.sin(mid));st=e});
  c.fillStyle=css('ink');c.font=font(600,12);c.textAlign='center';c.textBaseline='top';c.fillText('Ghép 3 góc: được góc bẹt 180°',ox,oy+10)});
drag($('cTri'),(x,y,dx,dy,t)=>{const P=pts();if(t==='down'){T.drag=P.findIndex(p=>Math.hypot(x-p[0],y-p[1])<24);return}if(t==='up'){T.drag=-1;return}
  if(T.drag>=0){T.P[T.drag]=[Math.max(0,Math.min(1,(x-T.box.x)/T.box.s)),Math.max(0,Math.min(1,(y-T.box.y)/T.box.s))];up()}});
document.querySelectorAll('#p-triangle [data-tp]').forEach(b=>b.onclick=()=>{T.P=PRE[b.dataset.tp].map(p=>[...p]);up()});up()}

/* ---------- Toán 8: Pythagore ---------- */
{function up(){const a=+$('pyA').value,b=+$('pyB').value,c2=a*a+b*b,cc=Math.sqrt(c2);$('opyA').textContent=a;$('opyB').textContent=b;presetSync('#p-pythag [data-py]','py',a+','+b);
  $('pyInfo').innerHTML=kv([['a²',a*a],['b²',b*b],['a² + b²',c2],['c = √(a² + b²)',Number.isInteger(cc)?String(cc):'≈ '+fmt(cc,3)],['c²',c2]]);draw()}
const draw=canvasOf($('cPy'),(c,w,h)=>{const a=+$('pyA').value,b=+$('pyB').value,cc=Math.hypot(a,b),O=[0,0],A=[a,0],B=[0,b],SA=[[0,0],[a,0],[a,-a],[0,-a]],SB=[[0,0],[0,b],[-b,b],[-b,0]],SC=[A,B,[b,b+a],[a+b,a]];
  const all=[...SA,...SB,...SC],xs=all.map(p=>p[0]),ys=all.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),s=Math.min((w-40)/(x1-x0),(h-40)/(y1-y0)),
    P=p=>[(w-(x1-x0)*s)/2+(p[0]-x0)*s,(h-(y1-y0)*s)/2+(y1-p[1])*s];
  const sq=(pts,col,n,lab)=>{c.fillStyle=rgba(col,.22);c.strokeStyle=css(col);c.lineWidth=2;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...P(p)):c.moveTo(...P(p)));c.closePath();c.fill();c.stroke();
    if(n&&s>8){c.strokeStyle=rgba(col,.45);c.lineWidth=1;const[p0,p1,,p3]=pts;for(let k=1;k<n;k++){const t=k/n;c.beginPath();c.moveTo(...P([p0[0]+(p1[0]-p0[0])*t,p0[1]+(p1[1]-p0[1])*t]));c.lineTo(...P([p3[0]+(pts[2][0]-p3[0])*t,p3[1]+(pts[2][1]-p3[1])*t]));c.stroke();
      c.beginPath();c.moveTo(...P([p0[0]+(p3[0]-p0[0])*t,p0[1]+(p3[1]-p0[1])*t]));c.lineTo(...P([p1[0]+(pts[2][0]-p1[0])*t,p1[1]+(pts[2][1]-p1[1])*t]));c.stroke()}}
    const m=pts.reduce((q,p)=>[q[0]+p[0]/4,q[1]+p[1]/4],[0,0]);c.fillStyle=css('ink');c.font=font(700,15);c.textAlign='center';c.textBaseline='middle';c.lineWidth=4;c.strokeStyle=css('surface');c.strokeText(lab,...P(m));c.fillText(lab,...P(m))};
  sq(SA,'accent',a,`a² = ${a*a}`);sq(SB,'green',b,`b² = ${b*b}`);sq(SC,'amber',Number.isInteger(cc)?cc:0,`c² = ${a*a+b*b}`);
  c.fillStyle=css('surface');c.strokeStyle=css('ink');c.lineWidth=2.6;c.beginPath();[O,A,B].forEach((p,i)=>i?c.lineTo(...P(p)):c.moveTo(...P(p)));c.closePath();c.fill();c.stroke();
  const o=P(O),k=Math.min(14,s*.5);c.lineWidth=1.5;c.strokeRect(o[0],o[1]-k,k,k);
  c.fillStyle=css('ink');c.font=font(700,14);c.textAlign='center';c.textBaseline='middle';c.fillText('a',...P([a/2,.08*a+.3]).map((v,i)=>i?v-4:v));c.fillText('b',...P([.3,b/2]).map((v,i)=>i?v:v+10));c.fillText('c',...P([a/2+.35,b/2+.35]))});
document.querySelectorAll('#p-pythag [data-py]').forEach(btn=>btn.onclick=()=>{const[a,b]=btn.dataset.py.split(',');$('pyA').value=a;$('pyB').value=b;up()});['pyA','pyB'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ---------- Toán 9: góc nội tiếp ---------- */
{const G={A:210,B:330,M:100,N:40,drag:null,O:[0,0],R:1};const D2R=Math.PI/180;
const nrm=a=>((a%360)+360)%360,at=k=>[G.O[0]+G.R*Math.cos(G[k]*D2R),G.O[1]-G.R*Math.sin(G[k]*D2R)];
function arcAB(m){const ccw=nrm(G.B-G.A),inside=nrm(m-G.A)<ccw;return inside?{from:G.B,len:360-ccw}:{from:G.A,len:ccw}}
function inscr(k){const P=at(k),A=at('A'),B=at('B'),u=[A[0]-P[0],A[1]-P[1]],v=[B[0]-P[0],B[1]-P[1]];return Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))/D2R}
function up(){const arc=arcAB(G.M),im=inscr('M'),rows=[['Góc nội tiếp ∠AMB',fmt(im,1)+'°'],['Số đo cung AB bị chắn',fmt(arc.len,1)+'°'],['Góc ở tâm ∠AOB',fmt(Math.min(arc.len,360-arc.len),1)+'°']];
  if($('isN').checked)rows.splice(1,0,['Góc nội tiếp ∠ANB',fmt(inscr('N'),1)+'°']);$('isInfo').innerHTML=kv(rows);
  const V=$('isV');V.className='verdict'+(Math.abs(arc.len-180)<1?' ok':'');V.textContent=Math.abs(arc.len-180)<1?'AB là đường kính: góc nội tiếp chắn nửa đường tròn là góc vuông.':'Góc nội tiếp bằng nửa số đo của cung bị chắn.'+($('isN').checked&&Math.abs(inscr('N')-im)<.5?' Hai góc nội tiếp cùng chắn một cung thì bằng nhau.':'');draw()}
const draw=canvasOf($('cIns'),(c,w,h)=>{G.O=[w/2,h/2];G.R=Math.min(w,h)*.38;const O=G.O,A=at('A'),B=at('B'),M=at('M'),arc=arcAB(G.M);
  c.strokeStyle=css('ink');c.lineWidth=2;c.beginPath();c.arc(O[0],O[1],G.R,0,7);c.stroke();
  c.strokeStyle=css('amber');c.lineWidth=7;c.globalAlpha=.6;c.beginPath();c.arc(O[0],O[1],G.R,-arc.from*D2R,-(arc.from+arc.len)*D2R,true);c.stroke();c.globalAlpha=1;
  c.setLineDash([6,5]);c.strokeStyle=css('accent');c.lineWidth=1.8;c.beginPath();c.moveTo(...A);c.lineTo(...O);c.lineTo(...B);c.stroke();c.setLineDash([]);
  const pts=[['M',css('red')]];if($('isN').checked)pts.push(['N',css('green')]);
  pts.forEach(([k,col])=>{const P=at(k);c.strokeStyle=col;c.lineWidth=2.4;c.beginPath();c.moveTo(...A);c.lineTo(...P);c.lineTo(...B);c.stroke();
    const a1=Math.atan2(A[1]-P[1],A[0]-P[0]),a2=Math.atan2(B[1]-P[1],B[0]-P[0]);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;c.lineWidth=2;c.beginPath();c.arc(P[0],P[1],26,a1,a1+d,d<0);c.stroke();
    c.fillStyle=col;c.font=font(700,13,'f-mono');c.textAlign='center';c.textBaseline='middle';c.fillText(fmt(inscr(k),0)+'°',P[0]+44*Math.cos(a1+d/2),P[1]+44*Math.sin(a1+d/2))});
  const mid=(arc.from+arc.len/2)*D2R;c.fillStyle=css('amber');c.font=font(700,13);c.textAlign='center';c.textBaseline='middle';c.fillText('sđ cung AB = '+fmt(arc.len,0)+'°',O[0]+(G.R+34)*Math.cos(mid),O[1]-(G.R+34)*Math.sin(mid));
  const dot=(P,lab,col)=>{c.fillStyle=col;c.beginPath();c.arc(P[0],P[1],7,0,7);c.fill();const dx=P[0]-O[0],dy=P[1]-O[1],l=Math.hypot(dx,dy)||1;c.fillStyle=css('ink');c.font=font(700,15);c.textAlign='center';c.textBaseline='middle';c.fillText(lab,P[0]+dx/l*20,P[1]+dy/l*20)};
  dot(O,'O',css('ink'));dot(A,'A',css('accent'));dot(B,'B',css('accent'));dot(M,'M',css('red'));if($('isN').checked)dot(at('N'),'N',css('green'))});
drag($('cIns'),(x,y,dx,dy,t)=>{if(t==='down'){G.drag=['M','N','A','B'].find(k=>(k!=='N'||$('isN').checked)&&Math.hypot(x-at(k)[0],y-at(k)[1])<24)||null;return}if(t==='up'){G.drag=null;return}
  if(G.drag){G[G.drag]=nrm(Math.atan2(G.O[1]-y,x-G.O[0])/D2R);up()}});
$('isDia').onclick=()=>{G.B=nrm(G.A+180);up()};$('isN').addEventListener('change',up);up()}

/* ---------- Toán 12: tích phân ---------- */
{const FN={sq:{f:x=>x*x,F:x=>x**3/3,d:[0,3],v:[0,2]},lin:{f:x=>x/2+1,F:x=>x*x/4+x,d:[0,4],v:[0,4]},sin:{f:Math.sin,F:x=>-Math.cos(x),d:[0,3.14],v:[0,3.14]},exp:{f:Math.exp,F:Math.exp,d:[0,2],v:[0,1]},inv:{f:x=>1/x,F:Math.log,d:[1,5],v:[1,3]}};
const S={m:.5};
function setDom(){const F=FN[$('itF').value];['itA','itB'].forEach((id,i)=>{$(id).min=F.d[0];$(id).max=F.d[1];$(id).value=F.v[i]})}
function calc(){const F=FN[$('itF').value];let a=+$('itA').value,b=+$('itB').value;if(a>b)[a,b]=[b,a];const n=+$('itN').value,dx=(b-a)/n;let s=0;for(let i=0;i<n;i++)s+=F.f(a+(i+S.m)*dx)*dx;return{F,a,b,n,dx,S:s,E:F.F(b)-F.F(a)}}
function up(){const v=calc();presetSync('#p-integral [data-im]','im',S.m);$('oitA').textContent=fmt(+$('itA').value,2);$('oitB').textContent=fmt(+$('itB').value,2);$('oitN').textContent=v.n;
  $('itInfo').innerHTML=kv([['Tổng diện tích n hình chữ nhật',fmt(v.S,4)],['Tích phân chính xác',fmt(v.E,4)],['Sai số',fmt(Math.abs(v.S-v.E),4)],['Bề rộng mỗi hình Δx',fmt(v.dx,3)]]);draw()}
const draw=canvasOf($('cItg'),(c,w,h)=>{const v=calc(),F=v.F,d0=F.d[0]-.3,d1=F.d[1]+.3;let ym=0;for(let i=0;i<=200;i++)ym=Math.max(ym,F.f(F.d[0]+(F.d[1]-F.d[0])*i/200));ym=ym*1.12+.2;
  const ml=44,mb=34,X=x=>ml+(x-d0)/(d1-d0)*(w-ml-16),Y=y=>h-mb-y/ym*(h-mb-20);
  c.strokeStyle=css('grid');c.lineWidth=1;const xs=niceStep(d1-d0,8),ys=niceStep(ym,6);c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let x=Math.ceil(d0/xs)*xs;x<=d1;x+=xs){c.beginPath();c.moveTo(X(x),20);c.lineTo(X(x),h-mb);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(fmt(x,xs<1?1:0),X(x),h-mb+5)}
  for(let y=0;y<=ym;y+=ys){c.beginPath();c.moveTo(ml,Y(y));c.lineTo(w-16,Y(y));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(y,ys<1?1:0),ml-5,Y(y))}
  c.strokeStyle=css('ink');c.lineWidth=1.4;c.beginPath();c.moveTo(ml,Y(0));c.lineTo(w-16,Y(0));c.moveTo(X(Math.max(d0,0)),20);c.lineTo(X(Math.max(d0,0)),h-mb);c.stroke();
  for(let i=0;i<v.n;i++){const x=v.a+i*v.dx,y=F.f(x+S.m*v.dx);c.fillStyle=rgba('accent',.22);c.strokeStyle=css('accent');c.lineWidth=1.2;c.fillRect(X(x),Y(y),X(x+v.dx)-X(x),Y(0)-Y(y));c.strokeRect(X(x),Y(y),X(x+v.dx)-X(x),Y(0)-Y(y))}
  c.strokeStyle=css('red');c.lineWidth=2.6;c.beginPath();for(let i=0;i<=300;i++){const x=F.d[0]+(F.d[1]-F.d[0])*i/300;i?c.lineTo(X(x),Y(F.f(x))):c.moveTo(X(x),Y(F.f(x)))}c.stroke();
  [[v.a,'a'],[v.b,'b']].forEach(([x,t])=>{c.setLineDash([4,4]);c.strokeStyle=css('ink');c.lineWidth=1.2;c.beginPath();c.moveTo(X(x),Y(0));c.lineTo(X(x),Y(F.f(x))-10);c.stroke();c.setLineDash([]);c.fillStyle=css('ink');c.font=font(700,13);c.textAlign='center';c.textBaseline='top';c.fillText(t,X(x),Y(0)+18)});
  c.fillStyle=css('red');c.font=font(700,14);c.textAlign='left';c.textBaseline='top';c.fillText($('itF').selectedOptions[0].textContent,ml+8,22)});
$('itF').addEventListener('change',()=>{setDom();up()});document.querySelectorAll('#p-integral [data-im]').forEach(b=>b.onclick=()=>{S.m=+b.dataset.im;up()});
['itA','itB','itN'].forEach(id=>$(id).addEventListener('input',up));setDom();up()}
