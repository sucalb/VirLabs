
/* ================= TIN: sắp xếp ================= */
{const CODE={
  bubble:['for i in range(n - 1):','    for j in range(n - 1 - i):','        if a[j] > a[j + 1]:','            a[j], a[j + 1] = a[j + 1], a[j]'],
  sel:['for i in range(n - 1):','    m = i','    for j in range(i + 1, n):','        if a[j] < a[m]:','            m = j','    a[i], a[m] = a[m], a[i]'],
  ins:['for i in range(1, n):','    x = a[i]','    j = i - 1','    while j >= 0 and a[j] > x:','        a[j + 1] = a[j]','        j -= 1','    a[j + 1] = x']};
function* bubble(a){const n=a.length;for(let i=0;i<n-1;i++)for(let j=0;j<n-1-i;j++){yield{l:2,c:[j,j+1],ok:[n-i,n]};if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];yield{l:3,s:[j,j+1],ok:[n-i,n]}}}}
function* selection(a){const n=a.length;for(let i=0;i<n-1;i++){let m=i;yield{l:1,m,ok:[0,i]};for(let j=i+1;j<n;j++){yield{l:3,c:[j,m],m,ok:[0,i]};if(a[j]<a[m]){m=j;yield{l:4,m,ok:[0,i]}}}[a[i],a[m]]=[a[m],a[i]];yield{l:5,s:[i,m],ok:[0,i+1]}}}
function* insertion(a){const n=a.length;for(let i=1;i<n;i++){const x=a[i];let j=i-1;yield{l:1,key:i,x};while(true){if(j>=0)yield{l:3,c:[j],key:j+1,x};if(!(j>=0&&a[j]>x))break;a[j+1]=a[j];yield{l:4,s:[j+1],key:j,x};j--}a[j+1]=x;yield{l:6,s:[j+1]}}}
const GEN={bubble,sel:selection,ins:insertion};
const S={a:[],gen:null,st:{},cmp:0,sw:0,play:false,acc:0,done:false};
function reset(shuffle){const n=+$('srN').value;if(shuffle||S.a.length!==n){S.a=Array.from({length:n},(_,i)=>Math.round(8+92*(i+1)/n));for(let i=n-1;i>0;i--){const j=Math.random()*(i+1)|0;[S.a[i],S.a[j]]=[S.a[j],S.a[i]]}}
  S.work=[...S.a];S.gen=GEN[$('srAlg').value](S.work);S.st={};S.cmp=0;S.sw=0;S.done=false;S.play=false;$('srPlay').textContent='Chạy';up()}
function step(){if(S.done)return;const r=S.gen.next();if(r.done){S.done=true;S.st={};S.play=false;$('srPlay').textContent='Chạy'}else{S.st=r.value;if(S.st.c)S.cmp++;if(S.st.s)S.sw++}up()}
function up(){const alg=$('srAlg').value,n=S.work.length;$('osrN').textContent=$('srN').value;$('osrSp').textContent=$('srSp').value+' bước/giây';
  $('srCode').innerHTML=CODE[alg].map((l,i)=>`<span class="${i===S.st.l?'hl':''}">${l.replace(/</g,'&lt;')}</span>`).join('');
  $('srInfo').innerHTML=kv([['Số phần tử n',n],['Số lần so sánh',S.cmp],[alg==='ins'?'Số lần dời, gán':'Số lần đổi chỗ',S.sw],['Trạng thái',S.done?'đã sắp xếp xong':S.cmp?'đang chạy':'chưa chạy'],['Số so sánh tối đa n(n − 1)/2',n*(n-1)/2]]);draw()}
const draw=canvasOf($('cSort'),(c,w,h)=>{const a=S.work||[],n=a.length;if(!n)return;const m=16,bw=(w-2*m)/n,mx=100,st=S.st;
  const ok=i=>S.done||(st.ok&&i>=st.ok[0]&&i<st.ok[1]);
  a.forEach((v0,i)=>{let v=v0,col=css('accent');if(ok(i))col=css('green');if(st.c&&st.c.includes(i))col=css('amber');if(st.s&&st.s.includes(i))col=css('rain');if(st.m===i)col=css('amber');
    if(st.key===i&&st.x!=null){v=st.x;col=css('amber')}
    const bh=(h-2*m-30)*v/mx,x=m+i*bw,y=h-m-bh;c.fillStyle=col;c.globalAlpha=ok(i)&&!(st.c&&st.c.includes(i))?.75:1;c.fillRect(x+bw*.1,y,bw*.8,bh);c.globalAlpha=1;
    if(bw>22){c.fillStyle=css('ink');c.font=font(600,Math.min(13,bw*.4),'f-mono');c.textAlign='center';c.textBaseline='bottom';c.fillText(v,x+bw/2,y-3)}
    if(bw>18){c.fillStyle=css('muted');c.font=font(400,10,'f-mono');c.textBaseline='top';c.fillText(i,x+bw/2,h-m+2)}});
  if(st.m!=null){const x=m+st.m*bw+bw/2;c.fillStyle=css('amber');c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='top';c.fillText('m',x,4)}
  if(st.key!=null&&st.x!=null){const x=m+st.key*bw+bw/2;c.fillStyle=css('amber');c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='top';c.fillText('x = '+st.x,x,4)}});
$('srStep').onclick=()=>{S.play=false;$('srPlay').textContent='Chạy';step()};
$('srPlay').onclick=()=>{if(S.done)reset(false);S.play=!S.play;$('srPlay').textContent=S.play?'Tạm dừng':'Chạy'};
$('srShuf').onclick=()=>reset(true);$('srAlg').onchange=()=>reset(false);$('srN').addEventListener('input',()=>reset(true));$('srSp').addEventListener('input',up);
TICK.sort=dt=>{if(!S.play)return;S.acc+=dt*+$('srSp').value;while(S.acc>=1&&!S.done){S.acc-=1;step()}};reset(true)}

/* ================= TIN: tìm kiếm ================= */
{const CODE={seq:['for i in range(n):','    if a[i] == x:','        return i','return -1'],
  bin:['lo, hi = 0, n - 1','while lo <= hi:','    mid = (lo + hi) // 2','    if a[mid] == x:','        return mid','    elif a[mid] < x:','        lo = mid + 1','    else:','        hi = mid - 1','return -1']};
function* seq(a,x){for(let i=0;i<a.length;i++){yield{l:1,i,seen:i};if(a[i]===x){yield{l:2,i,f:i,seen:i};return}}yield{l:3,f:-1,seen:a.length}}
function* bin(a,x){let lo=0,hi=a.length-1;yield{l:0,lo,hi};while(lo<=hi){const mid=(lo+hi)>>1;yield{l:3,lo,hi,mid,i:mid};if(a[mid]===x){yield{l:4,lo,hi,mid,f:mid};return}if(a[mid]<x){lo=mid+1;yield{l:6,lo,hi,mid}}else{hi=mid-1;yield{l:8,lo,hi,mid}}}yield{l:9,lo,hi,f:-1}}
const S={a:[],x:0,gen:null,st:{},cmp:0,play:false,acc:0,done:false};
function newArr(){const n=+$('scN').value,set=new Set();while(set.size<n)set.add(1+Math.floor(Math.random()*99));S.a=[...set].sort((p,q)=>p-q);
  S.x=Math.random()<.8?S.a[Math.random()*n|0]:1+Math.floor(Math.random()*99);$('scX').value=S.x;reset()}
function reset(){S.x=parseInt($('scX').value,10);if(isNaN(S.x)){S.x=S.a[0];$('scX').value=S.x}S.gen=($('scAlg').value==='seq'?seq:bin)(S.a,S.x);S.st={};S.cmp=0;S.done=false;S.play=false;$('scPlay').textContent='Chạy';up()}
function step(){if(S.done)return;const r=S.gen.next();if(r.done){S.done=true;S.play=false;$('scPlay').textContent='Chạy'}else{S.st=r.value;if(S.st.i!=null&&(S.st.l===1||S.st.l===3))S.cmp++;if(S.st.f!=null){S.done=true;S.play=false;$('scPlay').textContent='Chạy'}}up()}
function up(){const alg=$('scAlg').value,st=S.st,n=S.a.length;$('oscN').textContent=n;
  $('scCode').innerHTML=CODE[alg].map((l,i)=>`<span class="${i===st.l?'hl':''}">${l}</span>`).join('');
  $('scCells').innerHTML=S.a.map((v,i)=>{let cls='';if(alg==='bin'&&st.lo!=null&&(i<st.lo||i>st.hi))cls='out';if(alg==='seq'&&st.seen!=null&&i<st.seen)cls='out';if(st.i===i)cls='cur';if(st.f===i)cls='found';
    const tag=alg==='bin'?[i===st.lo?'lo':'',i===st.mid&&st.l!==0?'mid':'',i===st.hi?'hi':''].filter(Boolean).join(' '):(st.i===i?'i':'');
    return`<div class="cellx ${cls}"><small>${i}</small><b>${v}</b><i>${tag}</i></div>`}).join('');
  const V=$('scV');V.className='verdict'+(st.f>=0?' ok':st.f===-1?' bad':'');
  V.textContent=st.f>=0?`Tìm thấy x = ${S.x} tại vị trí ${st.f} sau ${S.cmp} lần so sánh.`:st.f===-1?`Không có x = ${S.x} trong mảng. Đã so sánh ${S.cmp} lần.`:`Tìm x = ${S.x} trong mảng đã sắp xếp tăng dần. Bấm "Bước tiếp" hoặc "Chạy".`;
  $('scInfo').innerHTML=kv([['Số phần tử n',n],['Số lần so sánh',S.cmp],['Tuần tự: tối đa n lần',n],['Nhị phân: tối đa ⌊log₂n⌋ + 1 lần',Math.floor(Math.log2(n))+1]])}
$('scStep').onclick=()=>{S.play=false;$('scPlay').textContent='Chạy';step()};
$('scPlay').onclick=()=>{if(S.done)reset();S.play=!S.play;$('scPlay').textContent=S.play?'Tạm dừng':'Chạy'};
$('scNew').onclick=newArr;$('scAlg').onchange=reset;$('scX').addEventListener('change',reset);$('scN').addEventListener('input',newArr);
TICK.search=dt=>{if(!S.play)return;S.acc+=dt*1.6;while(S.acc>=1&&!S.done){S.acc-=1;step()}};newArr()}

/* ================= TIN: nhị phân ================= */
{const B={w:8,v:65};
function up(){const w=B.w,max=2**w-1;B.v=Math.max(0,Math.min(max,B.v));$('bnDec').value=B.v;
  $('bnBits').innerHTML=[...Array(w)].map((_,k)=>{const i=w-1-k,bit=(B.v>>i)&1;return`<button class="bit" data-i="${i}" aria-pressed="${!!bit}" aria-label="Bit ${i}, giá trị ${2**i}"><small>2${sup(i)} = ${2**i}</small><b>${bit}</b></button>`}).join('');
  const on=[...Array(w).keys()].reverse().filter(i=>(B.v>>i)&1);
  $('bnSum').textContent=on.length?`${B.v} = ${on.map(i=>'2'+sup(i)).join(' + ')} = ${on.map(i=>2**i).join(' + ')}`:'0 = tất cả các bit đều bằng 0';
  let v=B.v,rows='';if(!v)rows='<tr><td>0</td><td>: 2 = 0</td><td>dư 0</td></tr>';while(v>0){rows+=`<tr><td>${v}</td><td>: 2 = ${Math.floor(v/2)}</td><td>dư ${v%2}</td></tr>`;v=Math.floor(v/2)}$('bnDiv').innerHTML=rows;
  const bin=B.v.toString(2).padStart(w,'0').replace(/(\d{4})(?=\d)/g,'$1 '),signed=B.v>=2**(w-1)?B.v-2**w:B.v;
  $('bnInfo').innerHTML=kv([['Nhị phân',bin],['Thập phân',B.v],['Thập lục phân',B.v.toString(16).toUpperCase().padStart(Math.ceil(w/4),'0')],['Số nguyên có dấu (bù 2)',signed],['Kí tự ASCII',w>=8&&B.v>=32&&B.v<=126?`"${String.fromCharCode(B.v)}"`:'—'],[`Lớn nhất với ${w} bit`,`2${sup(w)} − 1 = ${max.toLocaleString('vi-VN')}`]])}
$('bnBits').addEventListener('click',e=>{const b=e.target.closest('.bit');if(!b)return;B.v^=1<<+b.dataset.i;up()});
$('bnW').onchange=()=>{B.w=+$('bnW').value;up()};$('bnDec').addEventListener('change',()=>{const v=parseInt($('bnDec').value,10);B.v=isNaN(v)?0:v;up()});
$('bnInc').onclick=()=>{B.v=(B.v+1)%(2**B.w);up()};$('bnNot').onclick=()=>{B.v=(~B.v)&(2**B.w-1);up()};$('bnZero').onclick=()=>{B.v=0;up()};up()}
