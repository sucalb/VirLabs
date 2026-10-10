
/* ================= LÍ: tự lắp mạch điện ================= */
{const COLS=10,ROWS=6;
const NAME={sel:'Chọn, sửa',wire:'Dây nối',bat:'Nguồn điện',sw:'Khoá K',R:'Điện trở',bulb:'Bóng đèn',A:'Ampe kế',V:'Vôn kế',erase:'Tẩy'};
const ICON={sel:'<path d="M4 2l12 8-6 1-3 5z"/>',wire:'<path d="M2 8h20"/><circle cx="2.5" cy="8" r="1.8"/><circle cx="21.5" cy="8" r="1.8"/>',bat:'<path d="M2 8h7M15 8h7M9 2v12M14 5v6" stroke-width="2.2"/>',
  sw:'<path d="M2 12h5M17 12h5M7 12l9-7"/><circle cx="7" cy="12" r="1.6"/><circle cx="17" cy="12" r="1.6"/>',R:'<path d="M1 8h5M18 8h5"/><rect x="6" y="4" width="12" height="8"/>',
  bulb:'<path d="M1 8h5M18 8h5"/><circle cx="12" cy="8" r="6"/><path d="M8 4l8 8M16 4l-8 8"/>',A:'<path d="M1 8h5M18 8h5"/><circle cx="12" cy="8" r="6"/><path d="M9.5 11l2.5-6 2.5 6M10.3 9.2h3.4"/>',
  V:'<path d="M1 8h5M18 8h5"/><circle cx="12" cy="8" r="6"/><path d="M9.5 5l2.5 6 2.5-6"/>',erase:'<path d="M4 13h16M6 13l-3-3 7-7 7 7-3 3"/>'};
const B={els:new Map(),tool:'sel',selKey:null,ghost:null,dragType:null,cnt:{},res:{},short:false};
const key=(r,c,d)=>`${r},${c},${d}`;
const ends=k=>{const[r,c,d]=k.split(',');const R=+r,C=+c;return d==='h'?[[R,C],[R,C+1]]:[[R,C],[R+1,C]]};
let G={ox:0,oy:0,s:1};
const NP=(r,c)=>[G.ox+c*G.s,G.oy+r*G.s];
function nearestEdge(x,y){let best=null,bd=1e9;for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    if(c<COLS-1){const d=Math.hypot(x-(G.ox+(c+.5)*G.s),y-(G.oy+r*G.s));if(d<bd){bd=d;best=key(r,c,'h')}}
    if(r<ROWS-1){const d=Math.hypot(x-(G.ox+c*G.s),y-(G.oy+(r+.5)*G.s));if(d<bd){bd=d;best=key(r,c,'v')}}}
  return bd<G.s*.55?best:null}
function nearestNode(x,y){const c=Math.round((x-G.ox)/G.s),r=Math.round((y-G.oy)/G.s);if(r<0||c<0||r>=ROWS||c>=COLS)return null;const p=NP(r,c);return Math.hypot(x-p[0],y-p[1])<G.s*.42?[r,c]:null}
const PREF={R:'R',bulb:'Đ',bat:'E',sw:'K',A:'A',V:'V'};
function place(k,type,val,flip){if(!k)return;if(type==='erase'){B.els.delete(k);if(B.selKey===k)B.selKey=null;return}
  B.cnt[type]=(B.cnt[type]||0)+1;
  B.els.set(k,{type,val:val??{R:10,bulb:12,bat:6}[type]??0,on:true,flip:!!flip,burn:false,ph:0,lab:type==='wire'?'':PREF[type]+sub(B.cnt[type])});
  if(type!=='wire'&&B.tool!=='wire')B.selKey=k}
function gauss(A,b){const n=b.length;for(let i=0;i<n;i++){let m=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[m][i]))m=r;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];
    const d=A[i][i]||1e-30;for(let r=i+1;r<n;r++){const f=A[r][i]/d;if(!f)continue;for(let c=i;c<n;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i]}}
  const x=new Float64Array(n);for(let i=n-1;i>=0;i--){let s=b[i];for(let c=i+1;c<n;c++)s-=A[i][c]*x[c];x[i]=s/(A[i][i]||1e-30)}return x}
const GW=1e5,GB=1000; // dây, ampe kế gần lí tưởng (0,01 mΩ); nguồn có điện trở trong 1 mΩ
function solve(){const els=[...B.els.entries()],idx=new Map(),nid=(r,c)=>r*COLS+c;B.newBurn=[];
  els.forEach(([k])=>ends(k).forEach(([r,c])=>{const n=nid(r,c);if(!idx.has(n))idx.set(n,idx.size)}));const N=idx.size;let V=new Float64Array(N);
  for(let it=0;it<5;it++){const A=Array.from({length:N},()=>new Float64Array(N)),b=new Float64Array(N);
    els.forEach(([k,e])=>{const[p,q]=ends(k).map(([r,c])=>idx.get(nid(r,c)));let g=0;
      if(e.type==='wire'||e.type==='A'||(e.type==='sw'&&e.on))g=GW;else if(e.type==='R'||(e.type==='bulb'&&!e.burn))g=1/e.val;else if(e.type==='bat')g=GB;
      e._p=p;e._q=q;e._g=g;if(g){A[p][p]+=g;A[q][q]+=g;A[p][q]-=g;A[q][p]-=g}
      if(e.type==='bat'){const Is=e.val*GB,plus=e.flip?q:p,minus=e.flip?p:q;b[plus]+=Is;b[minus]-=Is;e._plus=plus}});
    const par=[...Array(N).keys()],find=x=>par[x]===x?x:(par[x]=find(par[x]));els.forEach(([,e])=>{if(e._g)par[find(e._p)]=find(e._q)});
    const seen=new Set();for(let i=0;i<N;i++){const r=find(i);if(!seen.has(r)){seen.add(r);A[i].fill(0);A[i][i]=1;b[i]=0}}
    V=N?gauss(A,b):V;let burned=false;
    els.forEach(([,e])=>{const dv=V[e._p]-V[e._q];e.I=e._g*dv;if(e.type==='bat')e.I+=(e._plus===e._q?1:-1)*e.val*GB;e.U=Math.abs(dv);e.P=e.type==='R'||e.type==='bulb'?e.U*Math.abs(e.I):0;
      if(e.type==='V')e.read=e.flip?-dv:dv;
      if(e.type==='bulb'&&!e.burn&&e.P>2.5*36/e.val){e.burn=true;burned=true;B.newBurn.push(e.lab)}});
    if(!burned)break}
  B.short=els.some(([,e])=>e.type==='bat'&&Math.abs(e.I)>20)}
function changed(rebuild=true){solve();info();if(rebuild)editor();draw()}
function info(){const list=[...B.els.values()].filter(e=>e.type!=='wire').sort((a,b)=>a.lab.localeCompare(b.lab,'vi'));const rows=[];
  list.forEach(e=>{if(e.type==='bat')rows.push([`${e.lab} (${fmt(e.val,1)} V)`,`I = ${fmt(Math.abs(e.I),3)} A`]);
    else if(e.type==='R'||e.type==='bulb')rows.push([`${e.lab} (${fmt(e.val,0)} Ω)`,e.burn?'đã cháy':`${fmt(e.U,2)} V · ${fmt(Math.abs(e.I),3)} A`]);
    else if(e.type==='A')rows.push([e.lab+' chỉ',fmt(Math.abs(e.I),3)+' A']);else if(e.type==='V')rows.push([e.lab+' chỉ',fmt(e.read,2)+' V']);else if(e.type==='sw')rows.push([e.lab,e.on?'đóng':'mở'])});
  $('bdInfo').innerHTML=kv(rows);
  const bats=list.filter(e=>e.type==='bat'),V_=$('bdV'),neg=list.filter(e=>e.type==='V'&&e.read<-.01),burnt=list.filter(e=>e.type==='bulb'&&e.burn);let cls='',t;
  if(!bats.length)t='Thêm nguồn điện để có dòng điện trong mạch.';
  else if(B.short){cls='bad';t='Đoản mạch: dòng điện qua nguồn rất lớn vì có đường dây nối thẳng hai cực, không qua điện trở hay bóng đèn nào. Ampe kế mắc song song cũng gây đoản mạch.'}
  else if(burnt.length){cls='bad';t=`${burnt.map(e=>e.lab).join(', ')} bị cháy vì hiệu điện thế vượt quá định mức 6 V. Chọn bóng rồi bấm "Thay bóng mới".`}
  else if(bats.every(e=>Math.abs(e.I)<1e-4)){t='Mạch hở: chưa có dòng điện chạy qua nguồn. Kiểm tra khoá K và các mối nối.'}
  else{cls='ok';t=`Mạch kín. Cường độ dòng điện qua nguồn: ${bats.map(e=>fmt(Math.abs(e.I),3)+' A').join(', ')}.`}
  if(neg.length&&!B.short)t+=` ${neg.map(e=>e.lab).join(', ')} đang mắc ngược cực.`;V_.className='verdict '+cls;V_.textContent=t}
function editor(){const e=B.selKey&&B.els.get(B.selKey),box=$('bdEdit');
  if(!e||e.type==='wire'){box.innerHTML='<p class="note">Chọn công cụ "Chọn, sửa" rồi bấm vào một linh kiện trên bảng.</p>';return}
  let h=`<div class="row" style="justify-content:space-between"><b>${e.lab}: ${NAME[e.type]}</b><button class="btn ghost sm" id="bdDel">Xoá</button></div>`;
  if(e.type==='R'||e.type==='bulb'||e.type==='bat'){const[mn,mx,st,u]=e.type==='bat'?[1.5,24,.5,'V']:e.type==='R'?[1,100,1,'Ω']:[2,60,1,'Ω'];
    h+=`<div class="ctl"><label for="bdVal">${e.type==='bat'?'U':'R'}</label><input type="range" id="bdVal" min="${mn}" max="${mx}" step="${st}" value="${e.val}"><output id="obdVal">${fmt(e.val,e.type==='bat'?1:0)} ${u}</output></div>`}
  if(e.type==='bulb')h+=`<p class="note">Bóng định mức 6 V, công suất định mức ${fmt(36/e.val,2)} W. Nếu P vượt quá 2,5 lần định mức thì bóng cháy.</p>`+(e.burn?'<button class="btn" id="bdFix">Thay bóng mới</button>':'');
  if(e.type==='sw')h+=`<button class="btn" id="bdTog">${e.on?'Mở khoá K':'Đóng khoá K'}</button>`;
  if(e.type==='bat'||e.type==='V')h+=`<button class="btn ghost" id="bdFlip">Đảo cực</button>`;
  if(e.type==='R'||e.type==='bulb')h+=`<dl class="kv">${kv([['U',fmt(e.U,2)+' V'],['I',fmt(Math.abs(e.I),3)+' A'],['P',fmt(e.P,2)+' W']])}</dl>`;
  box.innerHTML=h;
  $('bdDel').onclick=()=>{B.els.delete(B.selKey);B.selKey=null;changed()};
  if($('bdVal'))$('bdVal').oninput=ev=>{e.val=+ev.target.value;$('obdVal').textContent=fmt(e.val,e.type==='bat'?1:0)+(e.type==='bat'?' V':' Ω');changed(false)};
  if($('bdFix'))$('bdFix').onclick=()=>{e.burn=false;changed()};
  if($('bdTog'))$('bdTog').onclick=()=>{e.on=!e.on;changed()};
  if($('bdFlip'))$('bdFlip').onclick=()=>{e.flip=!e.flip;changed()}}
function sample(kind){B.els.clear();B.cnt={};B.selKey=null;const T=B.tool;B.tool='wire';
  const S=kind==='nt'?[[1,1,'v','wire'],[2,1,'v','bat',12],[3,1,'v','wire'],[1,1,'h','wire'],[1,2,'h','sw'],[1,3,'h','wire'],[1,4,'h','bulb'],[1,5,'h','wire'],[1,6,'h','wire'],[1,7,'h','wire'],
      [1,8,'v','wire'],[2,8,'v','bulb'],[3,8,'v','wire'],[4,1,'h','wire'],[4,2,'h','wire'],[4,3,'h','wire'],[4,4,'h','A'],[4,5,'h','wire'],[4,6,'h','wire'],[4,7,'h','wire'],
      [0,4,'v','wire'],[0,4,'h','V'],[0,5,'v','wire']]
    :[[1,1,'v','wire'],[2,1,'v','bat',6],[3,1,'v','wire'],[1,1,'h','wire'],[1,2,'h','sw'],[1,3,'h','wire'],[1,4,'h','wire'],[1,5,'h','A'],[1,6,'h','wire'],[1,7,'h','wire'],
      [1,4,'v','wire'],[2,4,'v','bulb'],[3,4,'v','wire'],[1,8,'v','wire'],[2,8,'v','bulb'],[3,8,'v','wire'],
      [4,1,'h','wire'],[4,2,'h','A'],[4,3,'h','wire'],[4,4,'h','wire'],[4,5,'h','wire'],[4,6,'h','wire'],[4,7,'h','wire'],
      [2,4,'h','wire'],[2,5,'v','V'],[3,4,'h','wire']];
  S.forEach(([r,c,d,t,v])=>place(key(r,c,d),t,v));B.tool=T;changed()}
// vẽ
const draw=canvasOf($('cBuild'),(c,w,h)=>{const m=30,s=Math.min((w-2*m)/(COLS-1),(h-2*m-6)/(ROWS-1));G={s,ox:(w-s*(COLS-1))/2,oy:(h-s*(ROWS-1))/2};
  c.fillStyle=css('gridStrong');for(let r=0;r<ROWS;r++)for(let k=0;k<COLS;k++){const p=NP(r,k);c.beginPath();c.arc(p[0],p[1],2.6,0,7);c.fill()}
  const items=[...B.els.entries()].map(([k,e])=>{const[[r1,c1],[r2,c2]]=ends(k),P1=NP(r1,c1),P2=NP(r2,c2);return{k,e,P1,P2,mx:(P1[0]+P2[0])/2,my:(P1[1]+P2[1])/2,ang:Math.atan2(P2[1]-P1[1],P2[0]-P1[0])}});
  const half={wire:0,R:.26,bulb:.2,bat:.07,sw:.24,A:.19,V:.19};
  if(B.ghost){const[[r1,c1],[r2,c2]]=ends(B.ghost),P1=NP(r1,c1),P2=NP(r2,c2);c.strokeStyle=rgba('accent',.55);c.lineWidth=10;c.beginPath();c.moveTo(...P1);c.lineTo(...P2);c.stroke()}
  c.strokeStyle=css('ink');c.lineWidth=2.6;
  items.forEach(o=>{const L=half[o.e.type]*s;c.save();c.translate(o.mx,o.my);c.rotate(o.ang);c.beginPath();c.moveTo(-s/2,0);c.lineTo(-L,0);c.moveTo(L,0);c.lineTo(s/2,0);c.stroke();c.restore()});
  c.fillStyle=css('amber');
  items.forEach(o=>{const e=o.e;if(e.type==='V'||!e.I||Math.abs(e.I)<1e-3)return;for(let k=0;k<3;k++){let t=((e.ph||0)+k/3)%1;if(t<0)t+=1;c.beginPath();c.arc(o.P1[0]+(o.P2[0]-o.P1[0])*t,o.P1[1]+(o.P2[1]-o.P1[1])*t,3,0,7);c.fill()}});
  const surf=css('surface');
  items.forEach(o=>{const e=o.e,L=half[e.type]*s;if(e.type==='wire')return;c.save();c.translate(o.mx,o.my);c.rotate(o.ang);c.strokeStyle=css('ink');c.lineWidth=2.2;
    if(e.type==='R'){c.fillStyle=surf;c.fillRect(-L,-s*.09,2*L,s*.18);c.strokeRect(-L,-s*.09,2*L,s*.18)}
    else if(e.type==='bulb'){const r=s*.18,br=e.burn?0:Math.min(1,Math.sqrt(e.P/(36/e.val)));
      if(br>.03){const g=c.createRadialGradient(0,0,r*.3,0,0,r+s*.5*br);g.addColorStop(0,rgba('amber',.9*br));g.addColorStop(1,rgba('amber',0));c.fillStyle=g;c.beginPath();c.arc(0,0,r+s*.5*br,0,7);c.fill()}
      c.fillStyle=br>.03?rgba('amber',.3+.6*br):surf;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.stroke();c.strokeStyle=e.burn?css('red'):css('ink');c.beginPath();c.moveTo(-r*.7,-r*.7);c.lineTo(r*.7,r*.7);c.moveTo(r*.7,-r*.7);c.lineTo(-r*.7,r*.7);c.stroke()}
    else if(e.type==='bat'){const plusLeft=!e.flip,xl=-L,xr=L,big=s*.17,sm=s*.09;c.lineWidth=2.6;c.beginPath();c.moveTo(plusLeft?xl:xr,-big);c.lineTo(plusLeft?xl:xr,big);c.stroke();c.lineWidth=6;c.beginPath();c.moveTo(plusLeft?xr:xl,-sm);c.lineTo(plusLeft?xr:xl,sm);c.stroke()}
    else if(e.type==='sw'){c.fillStyle=css('ink');[-L,L].forEach(x=>{c.beginPath();c.arc(x,0,3.5,0,7);c.fill()});c.lineWidth=2.6;c.beginPath();c.moveTo(-L,0);e.on?c.lineTo(L,0):c.lineTo(-L+2*L*Math.cos(.5),-2*L*Math.sin(.5));c.stroke()}
    else{c.fillStyle=surf;c.beginPath();c.arc(0,0,L,0,7);c.fill();c.stroke()}
    c.restore();
    if(e.type==='A'||e.type==='V'){c.fillStyle=css('ink');c.font=font(700,Math.max(11,s*.17),'f-display');c.textAlign='center';c.textBaseline='middle';c.fillText(e.type,o.mx,o.my+1)}
    const vert=Math.abs(Math.sin(o.ang))>.5,lx=o.mx+(vert?s*.24:0),ly=o.my-(vert?0:s*.2);
    c.textAlign=vert?'left':'center';c.textBaseline=vert?'middle':'bottom';c.fillStyle=css('ink');c.font=font(700,12);
    const sub_=e.type==='R'||e.type==='bulb'?`${fmt(e.val,0)} Ω`:e.type==='bat'?`${fmt(e.val,1)} V`:e.type==='A'?`${fmt(Math.abs(e.I||0),2)} A`:e.type==='V'?`${fmt(e.read||0,2)} V`:'';
    c.fillText(e.lab,lx,vert?ly-8:ly-14);c.font=font(600,11,'f-mono');c.fillStyle=e.type==='A'||e.type==='V'?css('accent'):css('muted');c.fillText(sub_,lx,vert?ly+8:ly);
    if(e.type==='bat'){c.fillStyle=css('red');c.font=font(700,13);const sgn=e.flip?1:-1,px=o.mx+Math.cos(o.ang)*sgn*s*.2,py=o.my+Math.sin(o.ang)*sgn*s*.2;c.textAlign='center';c.textBaseline='middle';c.fillText('+',px+(vert?-12:0),py+(vert?0:12))}
    if(o.k===B.selKey){c.strokeStyle=css('accent');c.lineWidth=2;c.setLineDash([4,3]);c.strokeRect(o.mx-s*.33,o.my-s*.33,s*.66,s*.66);c.setLineDash([])}});
  if(B.short){c.fillStyle=css('red');c.font=font(700,14);c.textAlign='left';c.textBaseline='top';c.fillText('Đoản mạch!',10,8)}
  if(!B.els.size){c.fillStyle=css('muted');c.font=font(500,14);c.textAlign='center';c.textBaseline='middle';c.fillText('Bảng trống. Chọn "Dây nối" và kéo để nối, hoặc nạp một mạch mẫu.',w/2,h/2)}});
// hộp linh kiện
$('bdPal').innerHTML=['sel','wire','bat','sw','R','bulb','A','V','erase'].map(t=>`<button class="pal" data-tool="${t}" aria-pressed="${t===B.tool}"><svg viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">${ICON[t]}</svg>${NAME[t]}</button>`).join('');
function setTool(t){B.tool=t;document.querySelectorAll('#bdPal .pal').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tool===t));$('cBuild').style.cursor=t==='sel'?'pointer':'crosshair'}
$('bdPal').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-tool]');if(!b)return;setTool(b.dataset.tool);if(!['sel','erase','wire'].includes(b.dataset.tool))B.dragType=b.dataset.tool});
$('bdPal').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(b)setTool(b.dataset.tool)});
const cv=$('cBuild');
document.addEventListener('pointermove',e=>{if(!B.dragType)return;const r=cv.getBoundingClientRect(),inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;const g=inside?nearestEdge(e.clientX-r.left,e.clientY-r.top):null;if(g!==B.ghost){B.ghost=g;draw()}});
document.addEventListener('pointerup',()=>{if(!B.dragType)return;if(B.ghost){place(B.ghost,B.dragType);changed()}B.dragType=null;B.ghost=null;draw()});
cv.addEventListener('pointermove',e=>{if(B.dragType||['sel','wire'].includes(B.tool))return;const r=cv.getBoundingClientRect(),g=nearestEdge(e.clientX-r.left,e.clientY-r.top);if(g!==B.ghost){B.ghost=g;draw()}});
cv.addEventListener('pointerleave',()=>{if(!B.dragType&&B.ghost){B.ghost=null;draw()}});
let wireAt=null,erasing=false;
drag(cv,(x,y,dx,dy,t)=>{if(B.dragType)return;
  if(t==='down'){if(B.tool==='wire')wireAt=nearestNode(x,y);
    else if(B.tool==='erase'){erasing=true;place(nearestEdge(x,y),'erase');changed()}
    else if(B.tool==='sel'){const k=nearestEdge(x,y),e=k&&B.els.get(k);B.selKey=e&&e.type!=='wire'?k:null;if(e&&e.type==='sw'){e.on=!e.on;changed()}else{editor();draw()}}
    else{place(nearestEdge(x,y),B.tool);changed()}}
  else if(t==='move'){if(wireAt){const n=nearestNode(x,y);if(n&&(n[0]!==wireAt[0]||n[1]!==wireAt[1])){let[r,c]=wireAt;
      while(r!==n[0]||c!==n[1]){let nr=r,nc=c;if(c!==n[1])nc+=Math.sign(n[1]-c);else nr+=Math.sign(n[0]-r);const k=nr===r?key(r,Math.min(c,nc),'h'):key(Math.min(r,nr),c,'v');if(!B.els.has(k))place(k,'wire');r=nr;c=nc}
      wireAt=n;changed()}}
    else if(erasing){const k=nearestEdge(x,y);if(k&&B.els.has(k)){place(k,'erase');changed()}}}
  else{wireAt=null;erasing=false}});
TICK.build=dt=>{if(reduced)return;let any=false;B.els.forEach(e=>{if(e.type!=='V'&&e.I&&Math.abs(e.I)>1e-3){e.ph=((e.ph||0)+Math.max(-3,Math.min(3,e.I))*.55*dt)%1;any=true}});if(any)draw()};
$('bdS1').onclick=()=>sample('nt');$('bdS2').onclick=()=>sample('ss');$('bdClear').onclick=()=>{B.els.clear();B.cnt={};B.selKey=null;changed()};
setTool('sel');sample('nt')}
