'use strict';
/* ================= CORE ================= */
const $=id=>document.getElementById(id);
const css=n=>getComputedStyle(document.documentElement).getPropertyValue('--'+n).trim();
const fmt=(x,d=1)=>{if(!isFinite(x))return '—';let s=(+x).toFixed(d);if(s.startsWith('-')&&+s===0)s=s.slice(1);return s.replace('.',',').replace('-','−')};
const hexRgb=h=>{h=(h||'#000').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[(n>>16)&255,(n>>8)&255,n&255]};
const rgba=(tok,a)=>{const[r,g,b]=hexRgb(css(tok));return`rgba(${r},${g},${b},${a})`};
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const sub=s=>String(s).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
const sup=s=>String(s).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
const redraws=[];
function canvasOf(el,draw){const ctx=el.getContext('2d');
  const r=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const d=window.devicePixelRatio||1;
    if(el.width!==Math.round(w*d)||el.height!==Math.round(h*d)){el.width=Math.round(w*d);el.height=Math.round(h*d)}
    ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';draw(ctx,w,h)};
  new ResizeObserver(r).observe(el);redraws.push(r);return r}
const redrawAll=()=>redraws.forEach(f=>f());
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',redrawAll);
new MutationObserver(redrawAll).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
function niceStep(range,n=8){const raw=range/n,p=10**Math.floor(Math.log10(raw)),m=raw/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p}
function drag(el,fn){let on=false,lx=0,ly=0;
  el.addEventListener('pointerdown',e=>{on=true;try{el.setPointerCapture(e.pointerId)}catch(_){}const r=el.getBoundingClientRect();lx=e.clientX;ly=e.clientY;fn(e.clientX-r.left,e.clientY-r.top,0,0,'down')});
  el.addEventListener('pointermove',e=>{if(!on)return;const r=el.getBoundingClientRect();fn(e.clientX-r.left,e.clientY-r.top,e.clientX-lx,e.clientY-ly,'move');lx=e.clientX;ly=e.clientY});
  const up=()=>{if(on){on=false;fn(0,0,0,0,'up')}};el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)}
function arrowHead(c,x,y,ang,sz=9){c.beginPath();c.moveTo(x,y);c.lineTo(x-sz*Math.cos(ang-.4),y-sz*Math.sin(ang-.4));c.lineTo(x-sz*Math.cos(ang+.4),y-sz*Math.sin(ang+.4));c.closePath();c.fill()}
const kv=rows=>rows.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('');
const font=(w,px,f='f-body')=>`${w} ${px}px ${css(f)}`;
const TICK={};

const LABS=[
  {id:'intline',subj:'toan',grade:'Toán 6',name:'Số nguyên trên trục số'},
  {id:'fraction',subj:'toan',grade:'Toán 6',name:'Phân số'},
  {id:'triangle',subj:'toan',grade:'Toán 7',name:'Tổng ba góc tam giác'},
  {id:'pythag',subj:'toan',grade:'Toán 8',name:'Định lí Pythagore'},
  {id:'inscribed',subj:'toan',grade:'Toán 9',name:'Góc nội tiếp'},
  {id:'cubic',subj:'toan',grade:'Toán 12',name:'Hàm số bậc ba'},
  {id:'quad',subj:'toan',grade:'Toán 9 · 10',name:'Parabol y = ax² + bx + c'},
  {id:'trig',subj:'toan',grade:'Toán 11',name:'Đường tròn lượng giác'},
  {id:'solid',subj:'toan',grade:'Toán 8 · 9 · 11',name:'Hình khối, thiết diện, góc'},
  {id:'prob',subj:'toan',grade:'Toán 9 · 10',name:'Xác suất thực nghiệm'},
  {id:'integral',subj:'toan',grade:'Toán 12',name:'Tích phân, diện tích'},
  {id:'mirror',subj:'ly',grade:'KHTN 7',name:'Gương phẳng'},
  {id:'sound',subj:'ly',grade:'KHTN 7',name:'Âm thanh'},
  {id:'archimedes',subj:'ly',grade:'KHTN 8',name:'Lực đẩy Archimedes'},
  {id:'lever',subj:'ly',grade:'KHTN 8',name:'Đòn bẩy'},
  {id:'circuit',subj:'ly',grade:'KHTN 9',name:'Mạch nối tiếp, song song'},
  {id:'build',subj:'ly',grade:'KHTN 9 · Lí 11',name:'Tự lắp mạch điện'},
  {id:'ohm',subj:'ly',grade:'Vật lí 11',name:'Định luật Ohm toàn mạch'},
  {id:'kin',subj:'ly',grade:'Vật lí 10',name:'Chuyển động thẳng biến đổi đều'},
  {id:'fall',subj:'ly',grade:'Vật lí 10',name:'Rơi tự do, ném ngang'},
  {id:'projectile',subj:'ly',grade:'Vật lí 10',name:'Ném xiên'},
  {id:'force',subj:'ly',grade:'Vật lí 10',name:'Tổng hợp lực'},
  {id:'collide',subj:'ly',grade:'Vật lí 10',name:'Va chạm, động lượng'},
  {id:'lens',subj:'ly',grade:'KHTN 9 · Lí 11',name:'Thấu kính'},
  {id:'refr',subj:'ly',grade:'KHTN 9 · Lí 11',name:'Khúc xạ ánh sáng'},
  {id:'shm',subj:'ly',grade:'Vật lí 11',name:'Dao động điều hoà'},
  {id:'pend',subj:'ly',grade:'Vật lí 11',name:'Con lắc đơn'},
  {id:'string',subj:'ly',grade:'Vật lí 11',name:'Sóng trên dây, sóng dừng'},
  {id:'wave',subj:'ly',grade:'Vật lí 11',name:'Giao thoa sóng'},
  {id:'efield',subj:'ly',grade:'Vật lí 11',name:'Điện trường'},
  {id:'drift',subj:'ly',grade:'Vật lí 11',name:'Electron trong dây dẫn'},
  {id:'ptable',subj:'hoa',grade:'Hoá 10',name:'Bảng tuần hoàn'},
  {id:'mol',subj:'hoa',grade:'Hoá 10',name:'Phân tử 3D, lai hoá'},
  {id:'balance',subj:'hoa',grade:'KHTN 8',name:'Cân bằng phương trình'},
  {id:'rate',subj:'hoa',grade:'Hoá 10',name:'Tốc độ phản ứng'},
  {id:'metal',subj:'hoa',grade:'KHTN 9 · Hoá 12',name:'Kim loại + nước, acid'},
  {id:'atom',subj:'hoa',grade:'KHTN 7 · Hoá 10',name:'Lắp ráp nguyên tử'},
  {id:'ph',subj:'hoa',grade:'KHTN 8 · Hoá 11',name:'Thang pH, chất chỉ thị'},
  {id:'mole',subj:'hoa',grade:'KHTN 8',name:'Mol, khối lượng mol'},
  {id:'equil',subj:'hoa',grade:'Hoá 11',name:'Cân bằng hoá học'},
  {id:'titration',subj:'hoa',grade:'Hoá 11',name:'Chuẩn độ acid – base'},
  {id:'galvanic',subj:'hoa',grade:'Hoá 12',name:'Pin điện hoá'},
  {id:'body3d',subj:'sinh',grade:'KHTN 8 · Sinh 11',name:'Cơ thể người 3D'},
  {id:'photo',subj:'sinh',grade:'KHTN 7 · Sinh 11',name:'Quang hợp'},
  {id:'cellstruct',subj:'sinh',grade:'KHTN 6 · Sinh 10',name:'Cấu tạo tế bào'},
  {id:'osmosis',subj:'sinh',grade:'Sinh 10',name:'Thẩm thấu'},
  {id:'heart',subj:'sinh',grade:'KHTN 8',name:'Tuần hoàn máu'},
  {id:'sexdet',subj:'sinh',grade:'Sinh 9 · 12',name:'Xác định giới tính'},
  {id:'cell',subj:'sinh',grade:'Sinh 10',name:'Nguyên phân, giảm phân'},
  {id:'mendel',subj:'sinh',grade:'Sinh 9 · 12',name:'Lai Mendel'},
  {id:'pedigree',subj:'sinh',grade:'Sinh 12',name:'Sơ đồ phả hệ'},
  {id:'gene',subj:'sinh',grade:'KHTN 9 · Sinh 12',name:'Phiên mã, dịch mã, đột biến'},
  {id:'foodweb',subj:'sinh',grade:'KHTN 8 · Sinh 12',name:'Lưới thức ăn'},
  {id:'eco',subj:'sinh',grade:'Sinh 12',name:'Quần thể thỏ – mèo rừng'},
  {id:'mapscale',subj:'dia',grade:'Địa lí 6',name:'Tỉ lệ bản đồ'},
  {id:'season',subj:'dia',grade:'Địa lí 6 · 10',name:'Mùa và độ dài ngày đêm'},
  {id:'daynight',subj:'dia',grade:'Địa lí 6',name:'Ngày đêm, múi giờ'},
  {id:'climate',subj:'dia',grade:'Địa lí 8 · 12',name:'Biểu đồ khí hậu'},
  {id:'sort',subj:'tin',grade:'Tin học 7 · 11',name:'Thuật toán sắp xếp'},
  {id:'search',subj:'tin',grade:'Tin học 7 · 11',name:'Tìm kiếm tuần tự, nhị phân'},
  {id:'binary',subj:'tin',grade:'Tin học 6 · 10',name:'Hệ nhị phân'},
  {id:'rgb',subj:'tin',grade:'Tin học 10',name:'Mã màu RGB'},
];
const IC=p=>`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const SUBJ={
  toan:{name:'Toán học',desc:'Đồ thị, hình học không gian và xác suất. Kéo thanh trượt là thấy ngay kết quả.',icon:IC('<path d="M6 42H44M8 44V4"/><path d="M10 38C18 38 18 10 26 10S33 32 43 20"/>')},
  ly:{name:'Vật lí',desc:'Mạch điện, quang học, dao động và sóng chạy như thí nghiệm thật.',icon:IC('<ellipse cx="24" cy="24" rx="20" ry="7.5"/><ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(-60 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor"/>')},
  hoa:{name:'Hoá học',desc:'Nguyên tử, phân tử và phản ứng, kể cả những thí nghiệm nguy hiểm khó làm ở trường.',icon:IC('<path d="M18 5h12M20 5v13L8 39a3 3 0 0 0 2.6 4.5h26.8A3 3 0 0 0 40 39L28 18V5"/><path d="M13 31h22"/><circle cx="21" cy="37" r="1.6" fill="currentColor"/><circle cx="28" cy="35" r="1.2" fill="currentColor"/>')},
  sinh:{name:'Sinh học',desc:'Tế bào, di truyền và hệ sinh thái, xem lần lượt từng bước.',icon:IC('<path d="M14 4c0 11 20 13 20 20S14 33 14 44"/><path d="M34 4c0 11-20 13-20 20s20 9 20 20"/><path d="M17 10h14M15.5 17h17M15.5 31h17M17 38h14"/>')},
  dia:{name:'Địa lí',desc:'Trái Đất trong hệ Mặt Trời, ngày đêm, mùa, múi giờ và khí hậu Việt Nam.',icon:IC('<circle cx="24" cy="24" r="19"/><ellipse cx="24" cy="24" rx="8" ry="19"/><path d="M5 24h38M8 14h32M8 34h32"/>')},
  tin:{name:'Tin học',desc:'Thuật toán và cách máy tính biểu diễn dữ liệu, chạy từng bước kèm mã Python.',icon:IC('<path d="M16 14 6 24l10 10M32 14l10 10-10 10M27 9 21 39"/>')}};
let cur=null;const lastBySubj={};
const tabs=[...document.querySelectorAll('.tab')];
const PROP={
  toan:'<g fill="none" stroke="#10162f" stroke-width="2.4"><circle cx="38" cy="40" r="13"/><circle cx="64" cy="40" r="13"/><path d="M51 40h0"/></g><g transform="translate(80 50) rotate(-10)"><path d="M0 0v32h26z" fill="#ffd300" stroke="#10162f" stroke-width="2" stroke-linejoin="round"/><text x="5" y="27" font-size="12" font-weight="700" fill="#10162f" font-family="serif">π</text></g>',
  ly:'<path d="M93 44 80 63h9l-6 18 15-23h-9l6-14z" fill="#ffd300" stroke="#10162f" stroke-width="2" stroke-linejoin="round"/>',
  hoa:'<g transform="translate(80 52)"><path d="M7 0h10M9 0v10L1 28a3 3 0 0 0 3 4h16a3 3 0 0 0 3-4L15 10V0" fill="#fff" stroke="#10162f" stroke-width="2" stroke-linejoin="round"/><path d="M3.5 22h17l2.4 5a3 3 0 0 1-3 4.6H4a3 3 0 0 1-3-4.6z" fill="#e64980"/><circle cx="11" cy="-6" r="2.6" fill="#e64980" opacity=".7"/><circle cx="16" cy="-13" r="1.8" fill="#e64980" opacity=".5"/></g>',
  sinh:'<path d="M80 84c0-19 10-30 25-32 0 17-9 29-25 32z" fill="#51cf66" stroke="#10162f" stroke-width="2" stroke-linejoin="round"/><path d="M82 82c6-9 13-16 21-28" stroke="#10162f" stroke-width="1.6" fill="none"/>',
  dia:'<g transform="translate(92 68)"><circle r="14" fill="#74c0fc" stroke="#10162f" stroke-width="2"/><path d="M-10-4q4-6 9-2t2 6q-6 3-11-4zM2 4q6-3 9 1t-4 7q-6-2-5-8z" fill="#51cf66"/><path d="M-14 0a14 5 0 0 0 28 0" fill="none" stroke="#10162f" stroke-width="1.2" opacity=".5"/></g>',
  tin:'<g transform="translate(70 66)"><rect x="5" y="0" width="30" height="19" rx="2" fill="#10162f"/><text x="10" y="13.5" font-size="9" fill="#69db7c" font-family="monospace" font-weight="700">&lt;/&gt;</text><path d="M0 21h40l-3 5H3z" fill="#ced4da" stroke="#10162f" stroke-width="1.6" stroke-linejoin="round"/></g>'};
const owl=k=>`<svg class="owl" viewBox="0 0 112 100" aria-hidden="true">
  <path d="M27 32 22 10l17 13zM75 32l5-22-17 13z" fill="var(--accent)"/>
  <path d="M51 17c-21 0-33 15-33 35 0 23 14 39 33 39s33-16 33-39c0-20-12-35-33-35z" fill="var(--accent)" stroke="#10162f" stroke-width="2.4"/>
  <ellipse cx="51" cy="66" rx="19" ry="21" fill="#fff8e6"/>
  <path d="M43 60l3 3 3-3M53 60l3 3 3-3M48 68l3 3 3-3M43 76l3 3 3-3M53 76l3 3 3-3" stroke="var(--accent)" fill="none" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="38" cy="40" r="11.5" fill="#fff" stroke="#10162f" stroke-width="2"/><circle cx="64" cy="40" r="11.5" fill="#fff" stroke="#10162f" stroke-width="2"/>
  <circle cx="39.5" cy="41" r="5.2" fill="#10162f"/><circle cx="62.5" cy="41" r="5.2" fill="#10162f"/><circle cx="41" cy="39" r="1.7" fill="#fff"/><circle cx="64" cy="39" r="1.7" fill="#fff"/>
  <circle class="lid" cx="38" cy="40" r="12" fill="var(--accent)"/><circle class="lid" cx="64" cy="40" r="12" fill="var(--accent)"/>
  <path d="M47 50h8l-4 7z" fill="#ffb000" stroke="#10162f" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M42 90v6M46 90v6M56 90v6M60 90v6" stroke="#ffb000" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M21 56c-4 11 0 22 8 27" stroke="rgba(0,0,0,.22)" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${PROP[k]}</svg>`;
const CHECK='<span class="seen" aria-label="đã xem"><svg viewBox="0 0 12 12" fill="none" stroke="#10162f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2 5 8.5l4.5-5"/></svg></span>';
let SEEN=new Set();try{SEEN=new Set(JSON.parse(localStorage.getItem('lab-seen')||'[]'))}catch(e){}
// lọc theo khối lớp: lấy các số lớp trong nhãn, ví dụ "KHTN 9 · Lí 11" → [9, 11]
LABS.forEach(l=>l.grades=(l.grade.match(/\d+/g)||[]).map(Number));
let GRADE=0;try{GRADE=+localStorage.getItem('lab-grade')||0}catch(e){}
const okG=l=>!GRADE||l.grades.includes(GRADE);
$('gradeNav').innerHTML=[0,6,7,8,9,10,11,12].map(g=>`<button class="gbtn" data-g="${g}" aria-label="${g?'Lớp '+g:'Tất cả các lớp'}">${g||'Tất cả'}</button>`).join('');
$('gradeNav').addEventListener('click',e=>{const b=e.target.closest('.gbtn');if(!b)return;GRADE=+b.dataset.g;try{localStorage.setItem('lab-grade',GRADE)}catch(e){}show(cur)});
tabs.forEach(b=>{b.querySelector('.ic').innerHTML=SUBJ[b.dataset.t].icon;
  b.onclick=()=>{const list=LABS.filter(l=>l.subj===b.dataset.t&&okG(l));if(!list.length)return;show(list.some(l=>l.id===lastBySubj[b.dataset.t])?lastBySubj[b.dataset.t]:list[0].id)}});
function show(id){let L=LABS.find(l=>l.id===id)||LABS[0];if(!okG(L))L=LABS.find(l=>l.subj===L.subj&&okG(l))||LABS.find(okG)||L;cur=L.id;lastBySubj[L.subj]=L.id;
  tabs.forEach(b=>{const n=LABS.filter(l=>l.subj===b.dataset.t&&okG(l)).length;b.querySelector('small').textContent=n;b.disabled=!n});
  document.querySelectorAll('#gradeNav .gbtn').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.g===GRADE));
  document.documentElement.dataset.subj=L.subj;const SJ=SUBJ[L.subj];
  SEEN.add(L.id);try{localStorage.setItem('lab-seen',JSON.stringify([...SEEN]))}catch(e){}
  const inSubj=LABS.filter(l=>l.subj===L.subj&&okG(l)),nSeen=inSubj.filter(l=>SEEN.has(l.id)).length;
  $('bandIcon').innerHTML=owl(L.subj);$('bandName').textContent=SJ.name;$('bandDesc').textContent=SJ.desc;
  $('progTxt').textContent=(GRADE?`Lớp ${GRADE} · `:'')+`Đã mở ${nSeen}/${inSubj.length} bài`;$('progBar').style.width=Math.round(nSeen/inSubj.length*100)+'%';
  tabs.forEach(b=>b.setAttribute('aria-selected',b.dataset.t===L.subj));
  $('labNav').innerHTML=inSubj.map(l=>`<button class="labbtn" data-id="${l.id}" aria-current="${l.id===L.id}">${SEEN.has(l.id)?CHECK:''}${l.name}</button>`).join('');
  document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!=='p-'+L.id);
  try{localStorage.setItem('lab-cur',L.id)}catch(e){}
  try{history.replaceState(null,'','#'+L.id)}catch(e){}
  setTimeout(redrawAll,0)}
$('labNav').addEventListener('click',e=>{const b=e.target.closest('.labbtn');if(b)show(b.dataset.id)});
$('present').onclick=()=>{const on=document.body.classList.toggle('present');$('present').textContent=on?'Thoát trình chiếu':'Chế độ trình chiếu';
  try{if(on&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});else if(!on&&document.fullscreenElement)document.exitFullscreen().catch(()=>{})}catch(e){}
  setTimeout(redrawAll,0)};
// Vòng lặp hoạt hình: chạy bằng bộ đếm giờ (~30 khung/giây), không phụ thuộc requestAnimationFrame của khung xem
let lastTs=0;
function tick(){const now=performance.now(),dt=lastTs?Math.min(.1,(now-lastTs)/1000):0;lastTs=now;const f=TICK[cur];if(f){try{f(dt)}catch(e){console.error(e)}}}
try{clearInterval(window.__labTimer)}catch(e){}
window.__labTimer=setInterval(tick,33);

/* shared coordinate plane */
function plane(c,w,h,s){const ox=w/2,oy=h/2,X=x=>ox+x*s,Y=y=>oy-y*s;
  const x0=Math.ceil(-ox/s),x1=Math.floor((w-ox)/s),y0=Math.ceil(-(h-oy)/s),y1=Math.floor(oy/s);
  c.lineWidth=1;c.strokeStyle=css('grid');
  for(let i=x0;i<=x1;i++){c.beginPath();c.moveTo(Math.round(X(i))+.5,0);c.lineTo(Math.round(X(i))+.5,h);c.stroke()}
  for(let j=y0;j<=y1;j++){c.beginPath();c.moveTo(0,Math.round(Y(j))+.5);c.lineTo(w,Math.round(Y(j))+.5);c.stroke()}
  c.strokeStyle=css('muted');c.lineWidth=1.3;c.beginPath();c.moveTo(0,oy);c.lineTo(w,oy);c.moveTo(ox,0);c.lineTo(ox,h);c.stroke();
  c.fillStyle=css('muted');c.font=font(400,11,'f-mono');const step=s<34?2:1;
  c.textAlign='center';c.textBaseline='top';for(let i=x0;i<=x1;i++)if(i&&i%step===0)c.fillText(i<0?'−'+(-i):i,X(i),oy+4);
  c.textAlign='right';c.textBaseline='middle';for(let j=y0;j<=y1;j++)if(j&&j%step===0)c.fillText(j<0?'−'+(-j):j,ox-5,Y(j));
  c.textAlign='left';c.font='italic 13px '+css('f-body');c.fillText('x',w-14,oy-10);c.fillText('y',ox+6,10);c.fillText('O',ox+4,oy+10);
  return{X,Y,ox,oy}}
function dotLabel(c,x,y,col,lab,below){c.fillStyle=col;c.beginPath();c.arc(x,y,5,0,7);c.fill();
  if(lab){c.font=font(600,12);c.textAlign='center';c.textBaseline=below?'top':'bottom';c.fillText(lab,x,y+(below?9:-9))}}
const signed=(v,first)=>(v<0?(first?'−':' − '):(first?'':' + '))+fmt(Math.abs(v),1);
const poly=terms=>{const t=terms.filter(t=>Math.abs(t[0])>1e-9);return t.length?t.map((t,i)=>signed(t[0],i===0)+t[1]).join(''):'0'};

/* ================= TOÁN: hàm bậc ba ================= */
{const M={};
const f=x=>((M.a*x+M.b)*x+M.c)*x+M.d;
function critPts(){const A=3*M.a,B=2*M.b,C=M.c;
  if(Math.abs(A)<1e-12)return Math.abs(B)>1e-12?[-C/B]:[];
  const D=B*B-4*A*C;if(D<=1e-12)return[];const s=Math.sqrt(D);return[(-B-s)/(2*A),(-B+s)/(2*A)].sort((p,q)=>p-q)}
function rootsOf(g,cps){const L=1e3,pts=[-L,...cps,L],out=[];
  if(Math.abs(M.a)<1e-12&&Math.abs(M.b)<1e-12&&Math.abs(M.c)<1e-12)return Math.abs(g(0))<1e-6?null:[];
  cps.forEach(c=>{if(Math.abs(g(c))<1e-6)out.push(c)});
  for(let i=0;i<pts.length-1;i++){let lo=pts[i],hi=pts[i+1],gl=g(lo),gh=g(hi);
    if(Math.abs(gl)<1e-6||Math.abs(gh)<1e-6||gl*gh>0)continue;
    for(let k=0;k<200;k++){const mid=(lo+hi)/2,gm=g(mid);if(gl*gm<=0){hi=mid}else{lo=mid;gl=gm}}out.push((lo+hi)/2)}
  return out.sort((p,q)=>p-q).filter((r,i,a)=>!i||Math.abs(r-a[i-1])>1e-4)}
function up(){['a','b','c','d','m'].forEach(k=>{M[k]=+$('m'+k).value;$('o'+k).textContent=fmt(M[k])});
  $('mFormula').textContent='y = '+poly([[M.a,'x³'],[M.b,'x²'],[M.c,'x'],[M.d,'']]);
  const cps=critPts(),info=[['y′',poly([[3*M.a,'x²'],[2*M.b,'x'],[M.c,'']])]];let note='';
  if(Math.abs(M.a)<1e-9)note='a = 0 nên hàm số không còn là hàm bậc ba.';
  else{info.push(['Δ′ = b² − 3ac',fmt(M.b*M.b-3*M.a*M.c,2)]);
    if(cps.length===2){const cd=cps.find(x=>6*M.a*x+2*M.b<0),ct=cps.find(x=>6*M.a*x+2*M.b>0);
      info.push(['Cực đại',`(${fmt(cd,2)}; ${fmt(f(cd),2)})`],['Cực tiểu',`(${fmt(ct,2)}; ${fmt(f(ct),2)})`]);note='Δ′ > 0: hàm số có hai điểm cực trị.'}
    else note=`Δ′ ≤ 0: hàm số không có cực trị, luôn ${M.a>0?'đồng biến':'nghịch biến'} trên ℝ.`;
    const x0=-M.b/(3*M.a);info.push(['Tâm đối xứng I',`(${fmt(x0,2)}; ${fmt(f(x0),2)})`])}
  $('mInfo').innerHTML=kv(info);$('mNote').textContent=note;
  const rs=rootsOf(x=>f(x)-M.m,cps);
  $('mRoots').textContent=!$('mLine').checked?'Bật đường thẳng y = m để biện luận.':rs===null?'Phương trình có vô số nghiệm.':
    `Phương trình f(x) = ${fmt(M.m)} có ${rs.length} nghiệm${rs.length?': x ≈ '+rs.map(r=>fmt(r,2)).join('; '):''}`;
  M.cps=cps;M.rs=rs;draw()}
const draw=canvasOf($('cMath'),(c,w,h)=>{const s=Math.max(26,Math.min(w,h*1.3)/12);const{X,Y,oy}=plane(c,w,h,s);if(!('a'in M))return;
  if($('mLine').checked){c.setLineDash([7,5]);c.strokeStyle=css('red');c.lineWidth=1.6;c.beginPath();c.moveTo(0,Y(M.m));c.lineTo(w,Y(M.m));c.stroke();c.setLineDash([]);
    c.fillStyle=css('red');c.font=font(600,12,'f-mono');c.textAlign='right';c.textBaseline='bottom';c.fillText('y = '+fmt(M.m),w-8,Y(M.m)-4)}
  c.strokeStyle=css('accent');c.lineWidth=2.6;c.beginPath();for(let px=0;px<=w;px++){const y=Math.max(-1e4,Math.min(1e4,f((px-w/2)/s)));px?c.lineTo(px,Y(y)):c.moveTo(px,Y(y))}c.stroke();
  M.cps.forEach(x=>{const mx=6*M.a*x+2*M.b<0;c.setLineDash([3,4]);c.strokeStyle=css('gridStrong');c.lineWidth=1;c.beginPath();c.moveTo(X(x),Y(f(x)));c.lineTo(X(x),oy);c.stroke();c.setLineDash([]);
    if(Math.abs(M.a)>1e-9)dotLabel(c,X(x),Y(f(x)),css('amber'),mx?'CĐ':'CT',!mx)});
  if(Math.abs(M.a)>1e-9){const x0=-M.b/(3*M.a);dotLabel(c,X(x0),Y(f(x0)),css('muted'),'I',true)}
  if($('mLine').checked&&M.rs)M.rs.forEach(r=>dotLabel(c,X(r),Y(M.m),css('red')))});
['ma','mb','mc','md','mm','mLine'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= TOÁN: parabol ================= */
{const Q={r:[]};const g=x=>(Q.a*x+Q.b)*x+Q.c;
function up(){['a','b','c'].forEach(k=>{Q[k]=+$('q'+k).value;$('oq'+k).textContent=fmt(Q[k])});
  $('qFormula').textContent='y = '+poly([[Q.a,'x²'],[Q.b,'x'],[Q.c,'']]);
  const info=[];let note='';Q.r=[];
  if(Math.abs(Q.a)<1e-9)note='a = 0: đồ thị là đường thẳng, không phải parabol.';
  else{const xv=-Q.b/(2*Q.a),yv=g(xv),D=Q.b*Q.b-4*Q.a*Q.c;
    info.push(['Đỉnh I',`(${fmt(xv,2)}; ${fmt(yv,2)})`],['Trục đối xứng',`x = ${fmt(xv,2)}`],['Δ = b² − 4ac',fmt(D,2)]);
    if(D>1e-9){const s=Math.sqrt(D);Q.r=[(-Q.b-s)/(2*Q.a),(-Q.b+s)/(2*Q.a)].sort((p,q)=>p-q);
      info.push(['Nghiệm',`x₁ ≈ ${fmt(Q.r[0],2)}; x₂ ≈ ${fmt(Q.r[1],2)}`],['x₁ + x₂ = −b/a',fmt(-Q.b/Q.a,2)],['x₁·x₂ = c/a',fmt(Q.c/Q.a,2)])}
    else if(D>-1e-9){Q.r=[xv];info.push(['Nghiệm kép',`x = ${fmt(xv,2)}`])}
    else info.push(['Nghiệm','vô nghiệm']);
    note=Q.a>0?`a > 0: bề lõm hướng lên. Hàm số nghịch biến trên (−∞; ${fmt(xv,2)}), đồng biến trên (${fmt(xv,2)}; +∞). Giá trị nhỏ nhất bằng ${fmt(yv,2)}.`
      :`a < 0: bề lõm hướng xuống. Hàm số đồng biến trên (−∞; ${fmt(xv,2)}), nghịch biến trên (${fmt(xv,2)}; +∞). Giá trị lớn nhất bằng ${fmt(yv,2)}.`}
  $('qInfo').innerHTML=kv(info);$('qNote').textContent=note;draw()}
const draw=canvasOf($('cQuad'),(c,w,h)=>{const s=Math.max(24,Math.min(w,h*1.3)/14);const{X,Y}=plane(c,w,h,s);if(!('a'in Q))return;
  const lin=Math.abs(Q.a)<1e-9;
  if(!lin){const xv=-Q.b/(2*Q.a);c.setLineDash([6,5]);c.strokeStyle=css('amber');c.lineWidth=1.4;c.beginPath();c.moveTo(X(xv),0);c.lineTo(X(xv),h);c.stroke();c.setLineDash([])}
  c.strokeStyle=css('accent');c.lineWidth=2.6;c.beginPath();for(let px=0;px<=w;px++){const y=Math.max(-1e4,Math.min(1e4,g((px-w/2)/s)));px?c.lineTo(px,Y(y)):c.moveTo(px,Y(y))}c.stroke();
  if(!lin){const xv=-Q.b/(2*Q.a);dotLabel(c,X(xv),Y(g(xv)),css('amber'),'I',Q.a>0)}
  Q.r.forEach((r,i)=>dotLabel(c,X(r),Y(0),css('red'),Q.r.length>1?'x'+'₁₂'[i]:'x₀',true));
  dotLabel(c,X(0),Y(Q.c),css('muted'))});
['qa','qb','qc'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= TOÁN: đường tròn lượng giác ================= */
{const T={a:30,play:false};
const SV={0:'0',30:'1/2',45:'√2/2',60:'√3/2',90:'1'},TV={0:'0',30:'√3/3',45:'1',60:'√3'};
function exact(deg){const a=((deg%360)+360)%360;if(a%30&&a%45)return null;
  const ref=a<=90?a:a<=180?180-a:a<=270?a-180:360-a,ss=(a>180&&a<360)?-1:1,cs=(a>90&&a<270)?-1:1;
  const sg=(v,s)=>v==='0'?'0':(s<0?'−':'')+v;
  return{sin:sg(SV[ref],ss),cos:sg(SV[90-ref],cs),tan:ref===90?'không xác định':sg(TV[ref],ss*cs)}}
function piFrac(deg){if(deg%15)return fmt(deg*Math.PI/180,3);const g=gcd(Math.abs(deg/15),12)||12,n=deg/15/g,d=12/g;
  return n===0?'0':(n===1?'':n===-1?'−':String(n).replace('-','−'))+'π'+(d===1?'':'/'+d)}
function up(){T.a=+$('trA').value;$('otrA').textContent=T.a+'°';document.querySelectorAll('#p-trig [data-deg]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.deg===Math.round(T.a)));const r=T.a*Math.PI/180,e=exact(T.a);
  const tanOk=Math.abs(Math.cos(r))>1e-9;
  $('trInfo').innerHTML=kv([['α (độ)',T.a+'°'],['α (radian)',piFrac(T.a)],
    ['sin α',e?e.sin+(e.sin.includes('√')?' ≈ '+fmt(Math.sin(r),4):''):fmt(Math.sin(r),4)],
    ['cos α',e?e.cos+(e.cos.includes('√')?' ≈ '+fmt(Math.cos(r),4):''):fmt(Math.cos(r),4)],
    ['tan α',e?e.tan:tanOk?fmt(Math.tan(r),4):'không xác định'],
    ['Góc phần tư',(()=>{const a=((T.a%360)+360)%360;return a%90===0?'nằm trên trục':['I','II','III','IV'][Math.floor(a/90)]})()]]);draw()}
const draw=canvasOf($('cTrig'),(c,w,h)=>{const wide=w>=640;let R,cx,cy,gx0,gx1,gy,gs;
  if(wide){R=Math.min(h*.34,w*.17);cx=R*1.35+20;cy=h/2;gx0=cx+R*1.35+30;gx1=w-20;gy=cy;gs=R}
  else{R=Math.min(h*.2,w*.3);cx=w/2;cy=R*1.3+10;gx0=24;gx1=w-12;gs=Math.min(R,(h-cy-R*1.3-20)/3.4);gy=cy+R*1.3+(h-cy-R*1.3)/2}
  const r=T.a*Math.PI/180,co=Math.cos(r),si=Math.sin(r),Mx=cx+R*co,My=cy-R*si;
  c.strokeStyle=css('grid');c.lineWidth=1;c.beginPath();c.moveTo(cx-R*1.3,cy);c.lineTo(cx+R*1.3,cy);c.moveTo(cx,cy-R*1.3);c.lineTo(cx,cy+R*1.3);c.stroke();
  c.strokeStyle=css('muted');c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();
  c.fillStyle=css('muted');c.font=font(400,11,'f-mono');c.textAlign='left';c.textBaseline='top';c.fillText('1',cx+R+3,cy+3);c.fillText('−1',cx-R-18,cy+3);c.fillText('1',cx+4,cy-R-14);
  c.strokeStyle=css('amber');c.lineWidth=2;c.beginPath();c.arc(cx,cy,R*.22,0,-r,r>0);c.stroke();
  if($('trTan').checked&&Math.abs(co)>.05){const t=si/co;c.strokeStyle=css('gridStrong');c.lineWidth=1;c.beginPath();c.moveTo(cx+R,cy-R*1.3);c.lineTo(cx+R,cy+R*1.3);c.stroke();
    if(Math.abs(t)<1.3){c.setLineDash([4,4]);c.strokeStyle=css('amber');c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R,cy-R*t);c.stroke();c.setLineDash([]);
      c.lineWidth=4;c.beginPath();c.moveTo(cx+R,cy);c.lineTo(cx+R,cy-R*t);c.stroke();c.fillStyle=css('amber');c.font=font(600,12);c.textAlign='left';c.textBaseline='middle';c.fillText('tan α',cx+R+6,cy-R*t/2)}}
  c.setLineDash([4,4]);c.strokeStyle=css('gridStrong');c.lineWidth=1.2;c.beginPath();c.moveTo(Mx,My);c.lineTo(Mx,cy);c.moveTo(Mx,My);c.lineTo(cx,My);c.stroke();c.setLineDash([]);
  if($('trCos').checked){c.strokeStyle=css('green');c.lineWidth=4;c.beginPath();c.moveTo(cx,cy);c.lineTo(Mx,cy);c.stroke();c.fillStyle=css('green');c.font=font(600,12);c.textAlign='center';c.textBaseline='top';c.fillText('cos α',(cx+Mx)/2,cy+(si>0?6:-20))}
  if($('trSin').checked){c.strokeStyle=css('red');c.lineWidth=4;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx,My);c.stroke();c.fillStyle=css('red');c.font=font(600,12);c.textAlign=co>0?'right':'left';c.textBaseline='middle';c.fillText('sin α',cx+(co>0?-6:6),(cy+My)/2)}
  c.strokeStyle=css('accent');c.lineWidth=2.4;c.beginPath();c.moveTo(cx,cy);c.lineTo(Mx,My);c.stroke();
  c.fillStyle=css('accent');c.beginPath();c.arc(Mx,My,6,0,7);c.fill();c.font=font(700,13);c.textAlign='left';c.textBaseline='bottom';c.fillText('M',Mx+7,My-4);
  // graph
  const span=6*Math.PI,xs=(gx1-gx0)/span,GX=t=>gx0+(t+2*Math.PI)*xs,GY=v=>gy-v*gs;
  c.strokeStyle=css('grid');c.lineWidth=1;c.font=font(400,11,'f-mono');c.fillStyle=css('muted');
  const lbl=['−2π','−3π/2','−π','−π/2','0','π/2','π','3π/2','2π','5π/2','3π','7π/2','4π'];
  for(let k=0;k<=12;k++){const x=GX(-2*Math.PI+k*Math.PI/2);c.beginPath();c.moveTo(x,GY(1.5));c.lineTo(x,GY(-1.5));c.stroke();if(k%2===0||xs*Math.PI/2>34){c.textAlign='center';c.textBaseline='top';c.fillText(lbl[k],x,GY(-1.5)+4)}}
  [-1,0,1].forEach(v=>{c.beginPath();c.moveTo(gx0,GY(v));c.lineTo(gx1,GY(v));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(v<0?'−1':v,gx0-4,GY(v))});
  c.strokeStyle=css('muted');c.beginPath();c.moveTo(gx0,gy);c.lineTo(gx1,gy);c.stroke();
  const curve=(fn,col,clip)=>{c.strokeStyle=col;c.lineWidth=2;c.beginPath();let pen=false,prev=0;
    for(let px=gx0;px<=gx1;px++){const t=(px-gx0)/xs-2*Math.PI,v=fn(t);if(Math.abs(v)>clip||Math.abs(v-prev)>3){pen=false;prev=v;continue}prev=v;pen?c.lineTo(px,GY(v)):c.moveTo(px,GY(v));pen=true}c.stroke()};
  if($('trSin').checked)curve(Math.sin,css('red'),2);if($('trCos').checked)curve(Math.cos,css('green'),2);if($('trTan').checked)curve(Math.tan,css('amber'),1.5);
  const X0=GX(r);c.setLineDash([4,4]);c.strokeStyle=css('accent');c.lineWidth=1;c.beginPath();c.moveTo(X0,GY(1.5));c.lineTo(X0,GY(-1.5));c.stroke();
  if(wide&&$('trSin').checked){c.strokeStyle=rgba('red',.5);c.beginPath();c.moveTo(Mx,My);c.lineTo(X0,GY(si));c.stroke()}c.setLineDash([]);
  if($('trSin').checked){c.fillStyle=css('red');c.beginPath();c.arc(X0,GY(si),5,0,7);c.fill()}
  if($('trCos').checked){c.fillStyle=css('green');c.beginPath();c.arc(X0,GY(co),5,0,7);c.fill()}});
['trA','trSin','trCos','trTan'].forEach(id=>$(id).addEventListener('input',up));
document.querySelectorAll('#p-trig [data-deg]').forEach(b=>b.onclick=()=>{$('trA').value=b.dataset.deg;up()});
$('trPlay').onclick=()=>{T.play=!T.play;$('trPlay').textContent=T.play?'Dừng':'Quay'};
TICK.trig=dt=>{if(!T.play)return;let a=+$('trA').value+50*dt;if(a>720)a=-360;$('trA').value=a;up()};up()}

/* ================= TOÁN: hình khối, thiết diện ================= */
{const S={yaw:-.6,pitch:.42,drag:false,shape:null,opts:[]};
const sub3=(p,q)=>[p[0]-q[0],p[1]-q[1],p[2]-q[2]],cross=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],dot=(u,v)=>u[0]*v[0]+u[1]*v[1]+u[2]*v[2],nrm=v=>{const l=Math.hypot(...v)||1;return v.map(x=>x/l)},lerp3=(p,q,t)=>[p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1]),p[2]+t*(q[2]-p[2])];
function build(){const k=$('soShape').value,a=+$('soA').value,h=k==='cube'?a:+$('soH').value;let V=[],F=[],names=[];
  const ring=(n,r,z,rot=0)=>Array.from({length:n},(_,i)=>{const t=rot+i*2*Math.PI/n;return[r*Math.cos(t),r*Math.sin(t),z]});
  if(k==='chop4'){V=[[-a/2,-a/2,0],[a/2,-a/2,0],[a/2,a/2,0],[-a/2,a/2,0],[0,0,h]];names=['A','B','C','D','S'];F=[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]].map(v=>({v}))}
  else if(k==='chop3'){V=[...ring(3,a/Math.sqrt(3),0,-Math.PI/2),[0,0,h]];names=['A','B','C','S'];F=[[0,1,2],[0,1,3],[1,2,3],[2,0,3]].map(v=>({v}))}
  else if(k==='cube'){const s=a/2;V=[[-s,-s,0],[s,-s,0],[s,s,0],[-s,s,0],[-s,-s,a],[s,-s,a],[s,s,a],[-s,s,a]];names=['A','B','C','D','A′','B′','C′','D′'];F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]].map(v=>({v}))}
  else if(k==='lt3'){const r=a/Math.sqrt(3);V=[...ring(3,r,0,-Math.PI/2),...ring(3,r,h,-Math.PI/2)];names=['A','B','C','A′','B′','C′'];F=[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]].map(v=>({v}))}
  else{const n=48;V=ring(n,a,0);const bot=[...Array(n).keys()];F.push({v:bot});
    if(k==='tru'){V.push(...ring(n,a,h));F.push({v:bot.map(i=>i+n)});for(let i=0;i<n;i++){const j=(i+1)%n;F.push({v:[i,j,j+n,i+n],smooth:1})}}
    else{V.push([0,0,h]);for(let i=0;i<n;i++)F.push({v:[i,(i+1)%n,n],smooth:1})}}
  return{V,F,names,k,a,h,round:k==='tru'||k==='non'}}
function edgesOf(B){const E=new Map();B.F.forEach((f,fi)=>f.v.forEach((a,k)=>{const b=f.v[(k+1)%f.v.length],i=Math.min(a,b),j=Math.max(a,b),key=i+'-'+j;if(!E.has(key))E.set(key,{a:i,b:j,f:[]});E.get(key).f.push(fi)}));return E}
const DEF={chop4:[['SA',.5],['BC',.5],['CD',.5]],chop3:[['SA',.5],['AB',.5],['BC',.4]],cube:[['AB',.5],['BC',.5],['CC′',.5]],lt3:[['AB',.5],['BB′',.3],['CC′',.7]]};
function fillEdges(B){S.opts=[];edgesOf(B).forEach(e=>{const nb=B.names[e.b];const pair=nb==='S'?[e.b,e.a]:[e.a,e.b];S.opts.push({name:B.names[pair[0]]+B.names[pair[1]],pair})});
  const html=S.opts.map((o,i)=>`<option value="${i}">${o.name}</option>`).join('');
  [0,1,2].forEach(i=>{$('soE'+i).innerHTML=html;const d=(DEF[B.k]||[])[i];const j=d?S.opts.findIndex(o=>o.name===d[0]):i;$('soE'+i).value=Math.max(0,j);$('soT'+i).value=d?d[1]:.5})}
function mnpPts(B){return[0,1,2].map(i=>{const o=S.opts[+$('soE'+i).value];return o?lerp3(B.V[o.pair[0]],B.V[o.pair[1]],+$('soT'+i).value):[0,0,0]})}
function section(B,pts){const[M,N,P]=pts,n=cross(sub3(N,M),sub3(P,M)),nl=Math.hypot(...n);if(nl<1e-9)return null;
  const eps=1e-9*nl,raw=[];edgesOf(B).forEach(e=>{const p=B.V[e.a],q=B.V[e.b],sp=dot(n,sub3(p,M)),sq=dot(n,sub3(q,M));
    if(Math.abs(sp)<eps)raw.push(p);if(Math.abs(sq)<eps)raw.push(q);if(sp*sq<0&&Math.abs(sp)>eps&&Math.abs(sq)>eps)raw.push(lerp3(p,q,sp/(sp-sq)))});
  const pts2=[];raw.forEach(p=>{if(!pts2.some(q=>Math.hypot(...sub3(p,q))<1e-6))pts2.push(p)});if(pts2.length<3)return{poly:pts2,area:0};
  const u=nrm(sub3(N,M)),v=cross(nrm(n),u),c=pts2.reduce((m,p)=>[m[0]+p[0]/pts2.length,m[1]+p[1]/pts2.length,m[2]+p[2]/pts2.length],[0,0,0]);
  const uv=p=>{const d=sub3(p,c);return[dot(d,u),dot(d,v)]};pts2.sort((p,q)=>{const a=uv(p),b=uv(q);return Math.atan2(a[1],a[0])-Math.atan2(b[1],b[0])});
  let A=0;pts2.forEach((p,i)=>{const a=uv(p),b=uv(pts2[(i+1)%pts2.length]);A+=a[0]*b[1]-a[1]*b[0]});return{poly:pts2,area:Math.abs(A)/2}}
function cutInfo(B){const mode=$('soCutMode').value;if(mode==='none')return null;
  if(mode==='par'){const z=+$('soCut').value*B.h;return{mode,z,sec:section(B,[[0,0,z],[1,0,z],[0,1,z]])}}
  if(B.round)return{mode,bad:'Thiết diện qua 3 điểm chỉ áp dụng cho hình đa diện (chóp, lăng trụ, lập phương).'};
  const pts=mnpPts(B),sec=section(B,pts);return{mode,pts,sec,bad:sec?null:'Ba điểm M, N, P thẳng hàng nên không xác định một mặt phẳng.'}}
const POLY=['','','','Tam giác','Tứ giác','Ngũ giác','Lục giác'];
function info(B){const{k,a,h}=B,r3=Math.sqrt(3),u='cm';let rows=[];
  if(k==='chop4'){const d=Math.hypot(h,a/2);rows=[['S đáy = a²',fmt(a*a,2)+' '+u+'²'],['Trung đoạn d',fmt(d,2)+' '+u],['S xq = 2a·d',fmt(2*a*d,2)+' '+u+'²'],['V = ⅓·a²·h',fmt(a*a*h/3,2)+' '+u+'³']]}
  if(k==='chop3'){const Sd=r3/4*a*a,d=Math.hypot(h,a/(2*r3));rows=[['S đáy = a²√3/4',fmt(Sd,2)+' '+u+'²'],['Trung đoạn d',fmt(d,2)+' '+u],['S xq = 3·½·a·d',fmt(1.5*a*d,2)+' '+u+'²'],['V = ⅓·S đáy·h',fmt(Sd*h/3,2)+' '+u+'³']]}
  if(k==='cube')rows=[['Đường chéo = a√3',fmt(a*r3,2)+' '+u],['S tp = 6a²',fmt(6*a*a,2)+' '+u+'²'],['V = a³',fmt(a**3,2)+' '+u+'³']];
  if(k==='lt3'){const Sd=r3/4*a*a;rows=[['S đáy = a²√3/4',fmt(Sd,2)+' '+u+'²'],['S xq = 3a·h',fmt(3*a*h,2)+' '+u+'²'],['V = S đáy·h',fmt(Sd*h,2)+' '+u+'³']]}
  if(k==='tru')rows=[['S xq = 2πrh',fmt(2*Math.PI*a*h,2)+' '+u+'²'],['S tp = 2πr(r + h)',fmt(2*Math.PI*a*(a+h),2)+' '+u+'²'],['V = πr²h',fmt(Math.PI*a*a*h,2)+' '+u+'³']];
  if(k==='non'){const l=Math.hypot(a,h);rows=[['Đường sinh l',fmt(l,2)+' '+u],['S xq = πrl',fmt(Math.PI*a*l,2)+' '+u+'²'],['V = ⅓πr²h',fmt(Math.PI*a*a*h/3,2)+' '+u+'³']]}
  return rows}
function angleSpec(B){const{k,V,a,h}=B;
  if(k==='chop4'||k==='chop3'){const S_=V.length-1;return{P:V[S_],Q:V[0],H:[0,0,0],lab:'Góc (SA, đáy) = ∠SAH',val:Math.atan2(h,Math.hypot(V[0][0],V[0][1]))}}
  if(k==='cube')return{P:V[4],Q:V[2],H:V[0],lab:'Góc (A′C, đáy) = ∠A′CA',val:Math.atan2(a,a*Math.SQRT2)};
  if(k==='lt3')return{P:V[3],Q:V[1],H:V[0],lab:'Góc (A′B, đáy) = ∠A′BA',val:Math.atan2(h,a)};
  if(k==='non')return{P:V[V.length-1],Q:V[0],H:[0,0,0],lab:'Góc giữa đường sinh và đáy',val:Math.atan2(h,a)};
  return{P:V[48],Q:V[24],H:V[0],lab:'Góc (đường chéo thiết diện qua trục, đáy)',val:Math.atan2(h,2*a)}}
function up(){const k=$('soShape').value,round=k==='tru'||k==='non';$('soAl').textContent=round?'r':'a';$('soHrow').hidden=k==='cube';
  $('osoA').textContent=fmt(+$('soA').value)+' cm';$('osoH').textContent=fmt(+$('soH').value)+' cm';
  const B=build();if(S.shape!==k&&!round){fillEdges(B)}S.shape=k;
  $('soCutMode').querySelector('[value="mnp"]').disabled=round;if(round&&$('soCutMode').value==='mnp')$('soCutMode').value='none';
  const mode=$('soCutMode').value;$('soCutRow').hidden=mode!=='par';$('soMNP').hidden=mode!=='mnp';
  $('osoCut').textContent=Math.round(+$('soCut').value*100)+'% h';
  const rows=info(B);if($('soAng').checked){const A=angleSpec(B);rows.push([A.lab,fmt(A.val*180/Math.PI,1)+'°'])}
  const C=cutInfo(B);
  if(C){if(C.bad)rows.push(['Thiết diện',C.bad]);
    else if(C.mode==='par'){const ratio=(k==='chop4'||k==='chop3'||k==='non')?1-(+$('soCut').value):1;rows.push([`Thiết diện ở độ cao ${fmt(C.z,2)} cm`,fmt(C.sec.area,2)+' cm²']);if(ratio!==1)rows.push(['Tỉ số đồng dạng với đáy',fmt(ratio,2)])}
    else{const n=C.sec.poly.length;rows.push(['Thiết diện (MNP)',(POLY[n]||n+' cạnh')],['Diện tích thiết diện',fmt(C.sec.area,2)+' cm²']);
      [0,1,2].forEach(i=>{const o=S.opts[+$('soE'+i).value];if(o)rows.push([`${'MNP'[i]} ∈ ${o.name}`,`${o.name[0]}${'MNP'[i]} : ${o.name} = ${fmt(+$('soT'+i).value,2)}`])})}}
  $('soInfo').innerHTML=kv(rows);draw()}
const draw=canvasOf($('cSolid'),(c,w,h)=>{const B=build(),n=B.V.length;
  const cen=B.V.reduce((m,p)=>[m[0]+p[0]/n,m[1]+p[1]/n,m[2]+p[2]/n],[0,0,0]);
  const cy=Math.cos(S.yaw),sy=Math.sin(S.yaw),cp=Math.cos(S.pitch),sp=Math.sin(S.pitch);
  const rotV=v=>{const x1=v[0]*cy-v[1]*sy,y1=v[0]*sy+v[1]*cy;return[x1,y1*cp-v[2]*sp,y1*sp+v[2]*cp]};
  const ext=Math.max(...B.V.map(p=>Math.hypot(...sub3(p,cen))));const sc=Math.min(w,h)*.42/ext;
  const pr=p=>{const r=rotV(sub3(p,cen));return[w/2+r[0]*sc,h/2-r[2]*sc]};const P=B.V.map(pr);
  const front=B.F.map(f=>{const v=f.v;let nn=cross(sub3(B.V[v[1]],B.V[v[0]]),sub3(B.V[v[2]],B.V[v[0]]));
    const fc=v.reduce((m,i)=>[m[0]+B.V[i][0]/v.length,m[1]+B.V[i][1]/v.length,m[2]+B.V[i][2]/v.length],[0,0,0]);
    if(dot(nn,sub3(fc,cen))<0)nn=nn.map(x=>-x);return rotV(nn)[1]<0});
  c.fillStyle=rgba('accent',.07);B.F.forEach((f,i)=>{if(!front[i])return;c.beginPath();f.v.forEach((j,k)=>k?c.lineTo(...P[j]):c.moveTo(...P[j]));c.closePath();c.fill()});
  const E=edgesOf(B);
  const C=cutInfo(B);
  if(C&&C.sec&&C.sec.poly.length>2){c.fillStyle=rgba('amber',.3);c.strokeStyle=css('amber');c.lineWidth=2.2;c.beginPath();C.sec.poly.forEach((p,i)=>i?c.lineTo(...pr(p)):c.moveTo(...pr(p)));c.closePath();c.fill();c.stroke()}
  E.forEach(e=>{const feat=e.f.some(i=>!B.F[i].smooth),fr=e.f.map(i=>front[i]),sil=fr.includes(true)&&fr.includes(false);if(!feat&&!sil)return;
    const vis=fr.includes(true);c.setLineDash(vis?[]:[5,5]);c.strokeStyle=vis?css('ink'):css('muted');c.lineWidth=vis?2:1.3;c.beginPath();c.moveTo(...P[e.a]);c.lineTo(...P[e.b]);c.stroke()});
  c.setLineDash([]);
  const seg=(p,q,col,dash,lw=1.6)=>{c.setLineDash(dash?[5,4]:[]);c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(...pr(p));c.lineTo(...pr(q));c.stroke();c.setLineDash([])};
  const lab=(p,t,col)=>{const q=pr(p);c.fillStyle=col;c.font=font(600,13);c.textAlign='left';c.textBaseline='bottom';c.fillText(t,q[0]+6,q[1]-4)};
  if(B.k==='chop4'||B.k==='chop3'||B.k==='non'){seg([0,0,0],[0,0,B.h],css('accent'),true);lab([0,0,B.h/2],'h',css('accent'));const o=pr([0,0,0]);c.fillStyle=css('accent');c.beginPath();c.arc(o[0],o[1],3,0,7);c.fill();lab([0,0,0],B.k==='non'?'O':'H',css('accent'))}
  if(B.round){seg([0,0,0],B.V[0],css('accent'),false);lab([B.a/2,0,0],'r',css('accent'))}
  if(B.k==='tru'){seg([0,0,0],[0,0,B.h],css('accent'),true);lab([0,0,B.h/2],'h',css('accent'))}
  if(C&&C.pts){C.pts.forEach((p,i)=>{const q=pr(p);c.fillStyle=css('red');c.beginPath();c.arc(q[0],q[1],5,0,7);c.fill();c.font=font(700,14);c.textAlign='left';c.textBaseline='bottom';c.fillText('MNP'[i],q[0]+6,q[1]-4)})}
  if($('soAng').checked){const A=angleSpec(B);seg(A.P,A.Q,css('red'),false,2.6);seg(A.P,A.H,css('red'),true);seg(A.H,A.Q,css('red'),true);
    const q=pr(A.Q),p1=pr(A.P),h1=pr(A.H),a1=Math.atan2(p1[1]-q[1],p1[0]-q[0]),a2=Math.atan2(h1[1]-q[1],h1[0]-q[0]);
    let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;c.strokeStyle=css('red');c.lineWidth=2;c.beginPath();c.arc(q[0],q[1],22,a1,a1+d,d<0);c.stroke();
    c.fillStyle=css('red');c.font=font(700,13);c.textAlign='center';c.textBaseline='middle';const am=a1+d/2;c.fillText(fmt(A.val*180/Math.PI,1)+'°',q[0]+40*Math.cos(am),q[1]+40*Math.sin(am))}
  c.font=font(700,14,'f-display');c.fillStyle=css('ink');const cc=pr(cen);
  B.names.forEach((t,i)=>{const p=P[i],dx=p[0]-cc[0],dy=p[1]-cc[1],l=Math.hypot(dx,dy)||1;c.textAlign='center';c.textBaseline='middle';c.fillText(t,p[0]+dx/l*16,p[1]+dy/l*16)})});
drag($('cSolid'),(x,y,dx,dy,t)=>{S.drag=t!=='up';if(t==='move'){S.yaw+=dx*.01;S.pitch=Math.max(-.2,Math.min(1.45,S.pitch+dy*.01));draw()}});
['soShape','soA','soH','soCut','soAng','soCutMode','soE0','soE1','soE2','soT0','soT1','soT2'].forEach(id=>$(id).addEventListener('input',up));
if(reduced)$('soAuto').checked=false;
TICK.solid=dt=>{if($('soAuto').checked&&!S.drag){S.yaw+=.35*dt;draw()}};up()}

/* ================= TOÁN: xác suất ================= */
{const EX={
  coin:{o:['Sấp','Ngửa'],p:[.5,.5],ev:1,evName:'Ra mặt ngửa',roll:()=>{const i=Math.random()<.5?0:1;return{i,t:['Sấp','Ngửa'][i]}}},
  die:{o:['1','2','3','4','5','6'],p:Array(6).fill(1/6),ev:5,evName:'Ra mặt 6 chấm',roll:()=>{const i=Math.random()*6|0;return{i,t:'⚀⚁⚂⚃⚄⚅'[i]}}},
  sum:{o:['2','3','4','5','6','7','8','9','10','11','12'],p:[1,2,3,4,5,6,5,4,3,2,1].map(x=>x/36),ev:5,evName:'Tổng bằng 7',roll:()=>{const a=Math.random()*6|0,b=Math.random()*6|0;return{i:a+b,t:'⚀⚁⚂⚃⚄⚅'[a]+' '+'⚀⚁⚂⚃⚄⚅'[b]+'  = '+(a+b+2)}}}};
const R={auto:false};
function reset(){const e=EX[$('prExp').value];R.e=e;R.n=0;R.hit=0;R.cnt=e.o.map(()=>0);R.hist=[];R.last='';up()}
function add(k){const e=R.e;for(let j=0;j<k;j++){const r=e.roll();R.cnt[r.i]++;R.n++;if(r.i===e.ev)R.hit++;R.last=r.t;
    if(R.n<=100||R.n%Math.ceil(R.n/120)===0)R.hist.push([R.n,R.hit/R.n])}up()}
function up(){const e=R.e,n=R.n;$('prLast').textContent=R.last||'—';
  $('prBars').innerHTML=e.o.map((o,i)=>{const obs=n?R.cnt[i]/n:0;return`<div class="bar"><span>${$('prExp').value==='coin'?o:($('prExp').value==='die'?'Mặt '+o:'Tổng '+o)}</span><div class="track"><div class="obs" style="width:${obs*100/Math.max(...e.p)/1.6}%"></div><div class="exp" style="width:${e.p[i]*100/Math.max(...e.p)/1.6}%"></div></div><span>${fmt(obs*100,1)}%</span></div>`}).join('');
  $('prInfo').innerHTML=kv([['Số lần thử',n.toLocaleString('vi-VN')],['Biến cố',e.evName],['Số lần xảy ra',R.hit.toLocaleString('vi-VN')],['Tần suất',n?fmt(R.hit/n,4):'—'],['Xác suất lí thuyết',fmt(e.p[e.ev],4)],['Chênh lệch',n?fmt(Math.abs(R.hit/n-e.p[e.ev]),4):'—']]);draw()}
const draw=canvasOf($('cProb'),(c,w,h)=>{if(!R.e)return;const e=R.e,p=e.p[e.ev],ml=50,mr=16,mt=26,mb=36;
  const maxL=Math.max(2,Math.ceil(Math.log10(Math.max(R.n,10)))),ymax=Math.min(1,Math.max(.4,p*3));
  const X=n=>ml+Math.log10(n)/maxL*(w-ml-mr),Y=v=>mt+(1-v/ymax)*(h-mt-mb);
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');
  for(let k=0;k<=maxL;k++){c.beginPath();c.moveTo(X(10**k),mt);c.lineTo(X(10**k),h-mb);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText((10**k).toLocaleString('vi-VN'),X(10**k),h-mb+6)}
  const ys=niceStep(ymax,5);for(let v=0;v<=ymax+1e-9;v+=ys){c.beginPath();c.moveTo(ml,Y(v));c.lineTo(w-mr,Y(v));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(fmt(v,2),ml-6,Y(v))}
  c.textAlign='left';c.textBaseline='top';c.fillText('Tần suất "'+e.evName.toLowerCase()+'"',ml+4,6);c.textAlign='right';c.textBaseline='bottom';c.fillText('Số lần thử (thang logarit)',w-mr,h-mb-4);
  c.setLineDash([6,5]);c.strokeStyle=css('amber');c.lineWidth=1.6;c.beginPath();c.moveTo(ml,Y(p));c.lineTo(w-mr,Y(p));c.stroke();c.setLineDash([]);
  c.fillStyle=css('amber');c.font=font(600,12);c.textAlign='left';c.textBaseline='bottom';c.fillText('P = '+fmt(p,3),ml+6,Y(p)-3);
  if(R.hist.length){c.strokeStyle=css('accent');c.lineWidth=2.2;c.beginPath();R.hist.forEach(([n,v],i)=>i?c.lineTo(X(n),Y(v)):c.moveTo(X(n),Y(v)));c.stroke();
    const[n,v]=R.hist[R.hist.length-1];c.fillStyle=css('accent');c.beginPath();c.arc(X(n),Y(v),5,0,7);c.fill()}});
document.querySelectorAll('#p-prob [data-k]').forEach(b=>b.onclick=()=>add(+b.dataset.k));
$('prReset').onclick=reset;$('prExp').onchange=reset;
$('prAuto').onclick=()=>{R.auto=!R.auto;$('prAuto').textContent=R.auto?'Dừng':'Tự động'};
TICK.prob=()=>{if(R.auto)add(R.n<200?1:R.n<5000?20:200)};reset()}
