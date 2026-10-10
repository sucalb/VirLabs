
/* ================= HOÁ: chuẩn độ ================= */
{const IND={pp:{lo:8.2,hi:10,a:[215,228,236,.35],b:[224,57,154,.85]},mo:{lo:3.1,hi:4.4,a:[214,51,42,.85],b:[242,194,48,.85]},bb:{lo:6,hi:7.6,a:[233,207,47,.85],b:[47,111,214,.85]}};
const cP=()=>({Ka:$('cAcid').value==='s'?1e8:1.75e-5,Ca:+$('cca').value,Va:+$('cva').value,Cb:+$('ccb').value});
function pH(q,Vb){const V=q.Va+Vb,Na=q.Cb*Vb/V,CA=q.Ca*q.Va/V;let lo=0,hi=14;
  for(let i=0;i<60;i++){const ph=(lo+hi)/2,hh=10**-ph,F=hh+Na-1e-14/hh-CA*q.Ka/(q.Ka+hh);if(F>0)lo=ph;else hi=ph}return(lo+hi)/2}
function indColor(ph){const I=IND[$('cInd').value],t=Math.max(0,Math.min(1,(ph-I.lo)/(I.hi-I.lo))),m=I.a.map((v,i)=>v+(I.b[i]-v)*t);return`rgba(${m[0]|0},${m[1]|0},${m[2]|0},${m[3]})`}
function up(){const q=cP(),Veq=q.Ca*q.Va/q.Cb,Vmax=Math.max(10,Math.ceil(Veq*2));$('cvb').max=Vmax;if(+$('cvb').value>Vmax)$('cvb').value=Vmax;
  const Vb=+$('cvb').value,ph=pH(q,Vb);
  $('ovb').textContent=fmt(Vb,2)+' mL';$('oca').textContent=fmt(q.Ca,2)+' M';$('ova').textContent=q.Va+' mL';$('ocb').textContent=fmt(q.Cb,2)+' M';$('phVal').textContent='pH '+fmt(ph,2);
  $('phStage').textContent=Math.abs(Vb-Veq)<.05?'Tại điểm tương đương':Vb<Veq?`Còn thiếu ${fmt(Veq-Vb,2)} mL để trung hoà`:`Dư ${fmt(Vb-Veq,2)} mL NaOH`;
  $('liq').style.backgroundColor=indColor(ph);$('liq').style.height=(30+60*(q.Va+Vb)/(q.Va+Vmax))+'%';
  $('cEq').textContent=`V tương đương = C_A·V_A / C_B = ${fmt(Veq,2)} mL. pH tại điểm tương đương ≈ ${fmt(pH(q,Veq),2)}.`;draw()}
const draw=canvasOf($('cChem'),(c,w,h)=>{const q=cP(),Veq=q.Ca*q.Va/q.Cb,Vmax=+$('cvb').max,Vb=+$('cvb').value,ml=44,mb=36,mt=16,mr=18,X=v=>ml+v/Vmax*(w-ml-mr),Y=p=>mt+(14-p)/14*(h-mt-mb);
  const I=IND[$('cInd').value];c.fillStyle=indColor((I.lo+I.hi)/2);c.globalAlpha=.18;c.fillRect(ml,Y(I.hi),w-ml-mr,Y(I.lo)-Y(I.hi));c.globalAlpha=1;
  c.fillStyle=css('muted');c.font=font(400,11);c.textAlign='right';c.textBaseline='bottom';c.fillText('vùng đổi màu chỉ thị',w-mr-4,Y(I.hi)-2);
  c.strokeStyle=css('grid');c.lineWidth=1;c.font=font(400,11,'f-mono');const vs=niceStep(Vmax,8);
  for(let p=0;p<=14;p+=2){c.beginPath();c.moveTo(ml,Y(p)+.5);c.lineTo(w-mr,Y(p)+.5);c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(p,ml-6,Y(p))}
  for(let v=0;v<=Vmax+1e-9;v+=vs){c.beginPath();c.moveTo(X(v)+.5,mt);c.lineTo(X(v)+.5,h-mb);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(fmt(v,vs<1?1:0),X(v),h-mb+6)}
  c.strokeStyle=css('muted');c.lineWidth=1.5;c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,h-mb);c.lineTo(w-mr,h-mb);c.stroke();
  c.textAlign='left';c.textBaseline='top';c.fillText('pH',ml+6,mt+2);c.textAlign='right';c.textBaseline='bottom';c.fillText('V NaOH (mL)',w-mr,h-mb-4);
  c.setLineDash([4,5]);c.strokeStyle=css('amber');c.beginPath();c.moveTo(X(Veq),mt);c.lineTo(X(Veq),h-mb);c.stroke();c.setLineDash([]);
  c.fillStyle=css('amber');c.textAlign='left';c.textBaseline='top';c.font=font(600,12);c.fillText('Điểm tương đương',X(Veq)+6,mt+18);
  c.strokeStyle=css('gridStrong');c.lineWidth=2;c.beginPath();for(let i=0;i<=400;i++){const v=Vmax*i/400;i?c.lineTo(X(v),Y(pH(q,v))):c.moveTo(X(v),Y(pH(q,v)))}c.stroke();
  c.strokeStyle=css('accent');c.lineWidth=2.8;c.beginPath();for(let i=0;i<=300;i++){const v=Vb*i/300;i?c.lineTo(X(v),Y(pH(q,v))):c.moveTo(X(v),Y(pH(q,v)))}c.stroke();
  c.fillStyle=css('accent');c.beginPath();c.arc(X(Vb),Y(pH(q,Vb)),6,0,7);c.fill()});
['cvb','cca','cva','ccb'].forEach(id=>$(id).addEventListener('input',up));['cAcid','cInd'].forEach(id=>$(id).addEventListener('change',up));
$('cDrop').onclick=()=>{$('cvb').value=Math.min(+$('cvb').max,+$('cvb').value+.05);up()};$('cReset').onclick=()=>{$('cvb').value=0;up()};up()}

/* ================= HOÁ: bảng tuần hoàn ================= */
{const RAW='H,Hydrogen,1.008,2.20|He,Helium,4.003,|Li,Lithium,6.94,0.98|Be,Beryllium,9.012,1.57|B,Boron,10.81,2.04|C,Carbon,12.011,2.55|N,Nitrogen,14.007,3.04|O,Oxygen,15.999,3.44|F,Fluorine,18.998,3.98|Ne,Neon,20.180,|Na,Sodium (natri),22.990,0.93|Mg,Magnesium,24.305,1.31|Al,Aluminium (nhôm),26.982,1.61|Si,Silicon,28.085,1.90|P,Phosphorus,30.974,2.19|S,Sulfur (lưu huỳnh),32.06,2.58|Cl,Chlorine,35.45,3.16|Ar,Argon,39.948,|K,Potassium (kali),39.098,0.82|Ca,Calcium,40.078,1.00|Sc,Scandium,44.956,1.36|Ti,Titanium,47.867,1.54|V,Vanadium,50.942,1.63|Cr,Chromium,51.996,1.66|Mn,Manganese,54.938,1.55|Fe,Iron (sắt),55.845,1.83|Co,Cobalt,58.933,1.88|Ni,Nickel,58.693,1.91|Cu,Copper (đồng),63.546,1.90|Zn,Zinc (kẽm),65.38,1.65|Ga,Gallium,69.723,1.81|Ge,Germanium,72.630,2.01|As,Arsenic,74.922,2.18|Se,Selenium,78.971,2.55|Br,Bromine,79.904,2.96|Kr,Krypton,83.798,3.00';
const EL=RAW.split('|').map((s,i)=>{const[sym,name,m,en]=s.split(',');return{Z:i+1,sym,name,m:+m,en:en?+en:null}});
const GL=['IA','IIA','IIIB','IVB','VB','VIB','VIIB','VIIIB','VIIIB','VIIIB','IB','IIB','IIIA','IVA','VA','VIA','VIIA','VIIIA'];
const pos=Z=>Z<=2?[1,Z===1?1:18]:Z<=10?[2,Z<=4?Z-2:Z+2]:Z<=18?[3,Z<=12?Z-10:Z-6]:[4,Z-18];
const ORB=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1]],CAP=[2,2,6,2,6,2,10,6];
function conf(Z){let e=Z;const o=ORB.map((x,i)=>{const n=Math.min(e,CAP[i]);e-=n;return n});let last=0;o.forEach((n,i)=>{if(n)last=i});
  if(Z===24||Z===29){o[5]=1;o[6]+=1}
  const items=ORB.map((x,i)=>({n:x[0],l:x[1],e:o[i]})).filter(x=>x.e>0).sort((a,b)=>a.n-b.n||a.l-b.l);
  const shells=[];items.forEach(x=>shells[x.n-1]=(shells[x.n-1]||0)+x.e);return{items,shells,block:'spd'[ORB[last][1]]}}
function kind(Z,outer){if([2,10,18,36].includes(Z))return'Khí hiếm';if(Z===1||Z===5||Z===6||Z===14)return'Phi kim';if(Z===32)return'Kim loại';return outer<=3?'Kim loại':'Phi kim'}
let sel=26,spin=0;
function bg(e){const m=$('ptMode').value,C=conf(e.Z),k=kind(e.Z,C.shells[C.shells.length-1]);
  if(m==='block')return`color-mix(in srgb, var(${C.block==='s'?'--accent':C.block==='p'?'--green':'--amber'}) 24%, var(--surface))`;
  if(m==='type')return k==='Khí hiếm'?'var(--paper)':`color-mix(in srgb, var(${k==='Kim loại'?'--accent':'--green'}) 24%, var(--surface))`;
  if(m==='en')return e.en==null?'var(--paper)':`color-mix(in srgb, var(--red) ${Math.round(6+60*(e.en-.7)/3.3)}%, var(--surface))`;
  return`color-mix(in srgb, var(--amber) ${Math.round(6+60*e.m/84)}%, var(--surface))`}
function grid(){let h=GL.map(g=>`<div class="gh">${g}</div>`).join('');
  const cells=[];EL.forEach(e=>{const[p,g]=pos(e.Z);cells[(p-1)*18+g-1]=e});
  for(let i=0;i<72;i++){const e=cells[i];h+=e?`<button class="el" data-z="${e.Z}" aria-pressed="${e.Z===sel}" style="background:${bg(e)}" title="${e.name}"><small>${e.Z}</small><b>${e.sym}</b></button>`:'<div></div>'}
  $('ptGrid').innerHTML=h;
  const m=$('ptMode').value,sw=(v,t)=>`<span><i style="height:10px;width:14px;background:color-mix(in srgb, var(${v}) 40%, var(--surface))"></i>${t}</span>`;
  $('ptLegend').innerHTML=m==='block'?sw('--accent','Nguyên tố s')+sw('--green','Nguyên tố p')+sw('--amber','Nguyên tố d'):m==='type'?sw('--accent','Kim loại')+sw('--green','Phi kim')+'<span>Ô nền nhạt: khí hiếm</span>':m==='en'?'<span>Màu càng đậm, độ âm điện (thang Pauling) càng lớn. Khí hiếm để trống.</span>':'<span>Màu càng đậm, nguyên tử khối càng lớn.</span>'}
function detail(){const e=EL[sel-1],C=conf(sel),[p,g]=pos(sel),outer=C.shells[C.shells.length-1];
  $('ptTitle').textContent=`${e.sym}: ${e.name}`;
  const cfg=C.items.map(x=>x.n+'spd'[x.l]+sup(x.e)).join('');
  $('ptInfo').innerHTML=kv([['Số hiệu Z',e.Z],['Nguyên tử khối',fmt(e.m,3)],['Cấu hình e',cfg],['Số e mỗi lớp',C.shells.join(', ')],['Chu kì / nhóm',p+' / '+GL[g-1]],['Khối',C.block],['Số e lớp ngoài cùng',outer],['Loại',kind(sel,outer)],['Độ âm điện',e.en==null?'—':fmt(e.en,2)]]);drawB()}
const drawB=canvasOf($('cBohr'),(c,w,h)=>{const C=conf(sel),cx=w/2,cy=h/2,n=C.shells.length,R0=22,dr=Math.min((Math.min(w,h)/2-R0-10)/n,26);
  C.shells.forEach((k,i)=>{const r=R0+dr*(i+1);c.strokeStyle=css('gridStrong');c.lineWidth=1;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();
    c.fillStyle=i===n-1?css('red'):css('accent');for(let j=0;j<k;j++){const a=spin*(.8/(i+1))+j*2*Math.PI/k;c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),3.6,0,7);c.fill()}});
  c.fillStyle=css('amber');c.beginPath();c.arc(cx,cy,R0-4,0,7);c.fill();c.fillStyle=css('surface');c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='middle';c.fillText('+'+sel,cx,cy)});
$('ptGrid').addEventListener('click',e=>{const b=e.target.closest('.el');if(!b)return;sel=+b.dataset.z;grid();detail();const nb=$('ptGrid').querySelector(`[data-z="${sel}"]`);if(nb)nb.focus()});
$('ptMode').onchange=grid;TICK.ptable=dt=>{if(reduced)return;spin+=dt;drawB()};grid();detail()}

/* ================= HOÁ: phân tử 3D ================= */
{const CPK={H:['#e9ecef',.28],C:['#3b4148',.42],O:['#e03131',.42],N:['#3b5bdb',.42],B:['#f59f00',.4],F:['#8ce99a',.38],S:['#fcc419',.48],Cl:['#2f9e44',.46]};
const r3=1/Math.sqrt(3);
const MOLS=[
  {f:'H2O',a:[['O',0,0,0],['H',.79,0,-.61],['H',-.79,0,-.61]],b:[[0,1,1],[0,2,1]],shape:'Gấp khúc (chữ V)',hyb:'sp³ (2 cặp e không liên kết)',ang:'104,5°',pol:'Phân cực',vsepr:'AX₂E₂'},
  {f:'CO2',a:[['C',0,0,0],['O',1.16,0,0],['O',-1.16,0,0]],b:[[0,1,2],[0,2,2]],shape:'Đường thẳng',hyb:'sp',ang:'180°',pol:'Không phân cực',vsepr:'AX₂'},
  {f:'NH3',a:[['N',0,0,.25],['H',.928,0,-.122],['H',-.464,.804,-.122],['H',-.464,-.804,-.122]],b:[[0,1,1],[0,2,1],[0,3,1]],shape:'Chóp tam giác',hyb:'sp³ (1 cặp e không liên kết)',ang:'107°',pol:'Phân cực',vsepr:'AX₃E'},
  {f:'CH4',a:[['C',0,0,0],['H',r3,r3,r3],['H',r3,-r3,-r3],['H',-r3,r3,-r3],['H',-r3,-r3,r3]].map(x=>[x[0],x[1]*1.09,x[2]*1.09,x[3]*1.09]),b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]],shape:'Tứ diện đều',hyb:'sp³',ang:'109,5°',pol:'Không phân cực',vsepr:'AX₄'},
  {f:'BF3',a:[['B',0,0,0],['F',1.3,0,0],['F',-.65,1.126,0],['F',-.65,-1.126,0]],b:[[0,1,1],[0,2,1],[0,3,1]],shape:'Tam giác phẳng',hyb:'sp²',ang:'120°',pol:'Không phân cực',vsepr:'AX₃'},
  {f:'C2H4',a:[['C',.67,0,0],['C',-.67,0,0],['H',1.21,.935,0],['H',1.21,-.935,0],['H',-1.21,.935,0],['H',-1.21,-.935,0]],b:[[0,1,2],[0,2,1],[0,3,1],[1,4,1],[1,5,1]],shape:'Phẳng',hyb:'sp² (mỗi C)',ang:'≈ 120°',pol:'Không phân cực',vsepr:'AX₃ (tại mỗi C)'},
  {f:'C2H2',a:[['C',.6,0,0],['C',-.6,0,0],['H',1.66,0,0],['H',-1.66,0,0]],b:[[0,1,3],[0,2,1],[1,3,1]],shape:'Đường thẳng',hyb:'sp (mỗi C)',ang:'180°',pol:'Không phân cực',vsepr:'AX₂ (tại mỗi C)'},
  {f:'SO2',a:[['S',0,0,0],['O',1.23,0,-.73],['O',-1.23,0,-.73]],b:[[0,1,2],[0,2,2]],shape:'Gấp khúc (chữ V)',hyb:'sp² (1 cặp e không liên kết)',ang:'≈ 119°',pol:'Phân cực',vsepr:'AX₂E'},
  {f:'HCl',a:[['Cl',-.35,0,0],['H',.95,0,0]],b:[[0,1,1]],shape:'Đường thẳng',hyb:'—',ang:'—',pol:'Phân cực',vsepr:'AX'}];
const S={yaw:.5,pitch:.35,drag:false};
$('molSel').innerHTML=MOLS.map((m,i)=>`<option value="${i}">${sub(m.f)}</option>`).join('');
function up(){const m=MOLS[+$('molSel').value];$('molInfo').innerHTML=kv([['Công thức',sub(m.f)],['Mô hình VSEPR',m.vsepr],['Hình dạng',m.shape],['Lai hoá',m.hyb],['Góc liên kết',m.ang],['Tính phân cực',m.pol]]);
  const els=[...new Set(m.a.map(x=>x[0]))];$('molLegend').innerHTML=els.map(e=>`<span><i style="height:12px;width:12px;border-radius:50%;background:${CPK[e][0]}"></i>${e}</span>`).join('');draw()}
const draw=canvasOf($('cMol'),(c,w,h)=>{const m=MOLS[+$('molSel').value],cy=Math.cos(S.yaw),sy=Math.sin(S.yaw),cp=Math.cos(S.pitch),sp=Math.sin(S.pitch);
  const R=m.a.map(a=>{const x=a[1],y=a[2],z=a[3],x1=x*cy-y*sy,y1=x*sy+y*cy;return[x1,y1*cp-z*sp,y1*sp+z*cp]});
  const sc=Math.min(w,h)*.36/Math.max(1.2,...R.map(p=>Math.hypot(...p))),P=R.map(p=>[w/2+p[0]*sc,h/2-p[2]*sc,p[1]]);
  c.strokeStyle=css('muted');c.lineCap='round';
  m.b.forEach(([i,j,o])=>{const a=P[i],b=P[j],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;c.lineWidth=o>1?5:8;
    for(let k=0;k<o;k++){const off=(k-(o-1)/2)*9;c.beginPath();c.moveTo(a[0]+nx*off,a[1]+ny*off);c.lineTo(b[0]+nx*off,b[1]+ny*off);c.stroke()}});
  m.a.map((a,i)=>i).sort((i,j)=>P[j][2]-P[i][2]).forEach(i=>{const[el]=m.a[i],[col,rad]=CPK[el],p=P[i],r=rad*sc*.75,g=c.createRadialGradient(p[0]-r*.35,p[1]-r*.35,r*.1,p[0],p[1],r);
    g.addColorStop(0,'rgba(255,255,255,.85)');g.addColorStop(.25,col);g.addColorStop(1,col);c.fillStyle=g;c.beginPath();c.arc(p[0],p[1],r,0,7);c.fill();c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=1;c.stroke();
    c.fillStyle=el==='C'?'#fff':'#111';c.font=font(700,Math.max(11,r*.6));c.textAlign='center';c.textBaseline='middle';c.fillText(el,p[0],p[1])});
  c.fillStyle=css('ink');c.font=font(700,22,'f-display');c.textAlign='left';c.textBaseline='top';c.fillText(sub(m.f),16,14);c.fillStyle=css('muted');c.font=font(500,13);c.fillText(m.shape+' · '+m.ang,16,44)});
drag($('cMol'),(x,y,dx,dy,t)=>{S.drag=t!=='up';if(t==='move'){S.yaw+=dx*.01;S.pitch=Math.max(-1.5,Math.min(1.5,S.pitch+dy*.01));draw()}});
if(reduced)$('molAuto').checked=false;$('molSel').onchange=up;TICK.mol=dt=>{if($('molAuto').checked&&!S.drag){S.yaw+=.5*dt;draw()}};up()}

/* ================= HOÁ: cân bằng phương trình ================= */
{const EQS=[['H2 + O2 → H2O',[2,1,2]],['Fe + O2 → Fe3O4',[3,2,1]],['Al + O2 → Al2O3',[4,3,2]],['P + O2 → P2O5',[4,5,2]],['CH4 + O2 → CO2 + H2O',[1,2,1,2]],['Na + H2O → NaOH + H2',[2,2,2,1]],
  ['Al + HCl → AlCl3 + H2',[2,6,2,3]],['Fe + Cl2 → FeCl3',[2,3,2]],['KClO3 → KCl + O2',[2,2,3]],['Fe2O3 + CO → Fe + CO2',[1,3,2,3]],['C2H5OH + O2 → CO2 + H2O',[1,3,2,3]],
  ['Al2(SO4)3 + NaOH → Al(OH)3 + Na2SO4',[1,6,2,3]],['FeS2 + O2 → Fe2O3 + SO2',[4,11,2,8]],['Cu + HNO3 → Cu(NO3)2 + NO + H2O',[3,8,3,2,4]]];
const COL={H:'#e9ecef',O:'#e03131',C:'#495057',N:'#4263eb',Fe:'#d9480f',Al:'#adb5bd',P:'#f08c00',Na:'#9c36b5',Cl:'#2f9e44',K:'#7048e8',Cu:'#b35a1f',S:'#fcc419'};
function parse(s){let i=0;const num=()=>{let d='';while(/\d/.test(s[i]||''))d+=s[i++];return d?+d:1};
  const group=()=>{const m={};while(i<s.length&&s[i]!==')'){if(s[i]==='('){i++;const g=group();i++;const k=num();for(const e in g)m[e]=(m[e]||0)+g[e]*k}
    else{let e=s[i++];if(/[a-z]/.test(s[i]||''))e+=s[i++];const k=num();m[e]=(m[e]||0)+k}}return m};return group()}
const B={};
$('blSel').innerHTML=EQS.map((e,i)=>`<option value="${i}">${sub(e[0])}</option>`).join('');
function load(){const[eq,ans]=EQS[+$('blSel').value],[L,R]=eq.split(' → ').map(s=>s.split(' + '));B.L=L;B.R=R;B.ans=ans;B.k=ans.map(()=>1);B.sp=[...L,...R].map(parse);
  B.els=[];B.sp.forEach(m=>Object.keys(m).forEach(e=>{if(!B.els.includes(e))B.els.push(e)}));up()}
function up(){const nL=B.L.length;let eq='';
  [...B.L,...B.R].forEach((f,i)=>{if(i===nL)eq+='<span aria-hidden="true">⟶</span>';else if(i)eq+='<span>+</span>';
    eq+=`<div class="sp"><div class="step"><button data-i="${i}" data-d="-1" aria-label="Giảm hệ số">−</button><span class="coef">${B.k[i]}</span><button data-i="${i}" data-d="1" aria-label="Tăng hệ số">+</button></div><div>${B.k[i]>1?'<span style="color:var(--accent)">'+B.k[i]+'</span>':''}${sub(f)}</div></div>`});
  $('blEq').innerHTML=eq;
  const cnt=side=>{const o={};B.els.forEach(e=>o[e]=0);B.sp.forEach((m,i)=>{if((i<nL)!==side)return;for(const e in m)o[e]+=m[e]*B.k[i]});return o},l=cnt(true),r=cnt(false);
  const balls=(e,n)=>n>24?`<span class="n">${n} nguyên tử</span>`:Array.from({length:n},()=>`<span class="ball" style="background:${COL[e]||'#999'}"></span>`).join('');
  let h='<span class="h">Ng.tố</span><span class="h" style="text-align:right">Vế trái</span><span class="h"></span><span class="h"></span><span class="h">Vế phải</span><span></span>';
  let ok=true;B.els.forEach(e=>{const good=l[e]===r[e];ok=ok&&good;
    h+=`<b>${e}</b><div class="balls l">${balls(e,l[e])}</div><span class="n">${l[e]}</span><span class="n">${r[e]}</span><div class="balls">${balls(e,r[e])}</div><span style="color:var(${good?'--green':'--red'});font-weight:700">${good?'✓':'✗'}</span>`});
  $('blAtoms').innerHTML=h;const g=B.k.reduce(gcd),V=$('blV');
  V.className='verdict'+(ok&&g===1?' ok':'');V.textContent=ok?(g===1?'Phương trình đã cân bằng.':`Đã cân bằng nhưng hệ số chưa tối giản: chia tất cả cho ${g}.`):`Chưa cân bằng: ${B.els.filter(e=>l[e]!==r[e]).join(', ')} lệch số nguyên tử giữa hai vế.`}
$('blEq').addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(!b)return;const i=+b.dataset.i;B.k[i]=Math.max(1,Math.min(20,B.k[i]+ +b.dataset.d));up()});
$('blSel').onchange=load;$('blReset').onclick=()=>{B.k=B.k.map(()=>1);up()};$('blAns').onclick=()=>{B.k=[...B.ans];up()};load()}

/* ================= HOÁ: tốc độ phản ứng ================= */
{const R={p:[],t:0,hist:[],pause:false,half:null},BW=1.6,BH=1,rad=.02,S300=.25;
const sig=()=>S300*Math.sqrt(+$('rtT').value/300);
const gauss=()=>Math.sqrt(-2*Math.log(Math.random()||1e-9))*Math.cos(2*Math.PI*Math.random());
function restart(){const n=+$('rtN').value,s=sig();R.p=[];R.t=0;R.hist=[];R.half=null;R.n0=n;R.T=+$('rtT').value;
  for(let k=0;k<2*n;k++)R.p.push({x:rad+Math.random()*(BW-2*rad),y:rad+Math.random()*(BH-2*rad),vx:gauss()*s,vy:gauss()*s,t:k<n?'A':'B'});info();draw()}
function info(){const nA=R.p.filter(p=>p.t==='A').length,nC=R.p.filter(p=>p.t==='C').length;$('ortT').textContent=$('rtT').value+' K';$('ortN').textContent=$('rtN').value+' hạt';
  $('rtInfo').innerHTML=kv([['Thời gian',fmt(R.t,1)+' s'],['Số hạt A còn lại',nA],['Số hạt C tạo thành',nC],['Thời gian A giảm một nửa',R.half==null?'đang đo…':fmt(R.half,1)+' s'],['Ngưỡng năng lượng',$('rtCat').checked?'thấp (có xúc tác)':'cao']])}
function step(dt){const thr=($('rtCat').checked?3.2:7)*S300*S300,ps=R.p;
  ps.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;const r=p.t==='C'?rad*1.3:rad;if(p.x<r){p.x=r;p.vx=Math.abs(p.vx)}if(p.x>BW-r){p.x=BW-r;p.vx=-Math.abs(p.vx)}if(p.y<r){p.y=r;p.vy=Math.abs(p.vy)}if(p.y>BH-r){p.y=BH-r;p.vy=-Math.abs(p.vy)}});
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j];if(a.dead||b.dead)continue;const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy,rr=2.2*rad;if(d2>rr*rr||d2===0)continue;
    const dvx=b.vx-a.vx,dvy=b.vy-a.vy;if(dvx*dx+dvy*dy>=0)continue;
    if(((a.t==='A'&&b.t==='B')||(a.t==='B'&&b.t==='A'))&&dvx*dvx+dvy*dvy>thr){a.t='C';a.x=(a.x+b.x)/2;a.y=(a.y+b.y)/2;a.vx=(a.vx+b.vx)/2;a.vy=(a.vy+b.vy)/2;b.dead=true;a.flash=.4;continue}
    const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,pn=dvx*nx+dvy*ny;a.vx+=pn*nx;a.vy+=pn*ny;b.vx-=pn*nx;b.vy-=pn*ny}
  R.p=ps.filter(p=>!p.dead);R.p.forEach(p=>{if(p.flash)p.flash=Math.max(0,p.flash-dt)})}
const draw=canvasOf($('cRate'),(c,w,h)=>{const bh=h*.66,sc=Math.min((w-24)/BW,(bh-20)/BH),ox=(w-BW*sc)/2,oy=10;
  c.strokeStyle=css('gridStrong');c.lineWidth=2;c.strokeRect(ox,oy,BW*sc,BH*sc);
  const col={A:css('accent'),B:css('red'),C:css('green')};
  R.p.forEach(p=>{const r=(p.t==='C'?rad*1.3:rad)*sc;if(p.flash){c.fillStyle=rgba('amber',p.flash*1.5);c.beginPath();c.arc(ox+p.x*sc,oy+p.y*sc,r*3,0,7);c.fill()}c.fillStyle=col[p.t];c.beginPath();c.arc(ox+p.x*sc,oy+p.y*sc,r,0,7);c.fill()});
  const gx0=50,gx1=w-16,gy0=bh+22,gy1=h-24,tm=Math.max(20,R.t),n=R.n0||1,GX=t=>gx0+t/tm*(gx1-gx0),GY=v=>gy1-v/n*(gy1-gy0);
  c.strokeStyle=css('grid');c.lineWidth=1;c.fillStyle=css('muted');c.font=font(400,11,'f-mono');const ts=niceStep(tm,6);
  for(let t=0;t<=tm;t+=ts){c.beginPath();c.moveTo(GX(t),gy0);c.lineTo(GX(t),gy1);c.stroke();c.textAlign='center';c.textBaseline='top';c.fillText(t+' s',GX(t),gy1+4)}
  [0,n/2,n].forEach(v=>{c.beginPath();c.moveTo(gx0,GY(v));c.lineTo(gx1,GY(v));c.stroke();c.textAlign='right';c.textBaseline='middle';c.fillText(Math.round(v),gx0-4,GY(v))});
  c.textAlign='left';c.textBaseline='bottom';c.fillText('Số hạt',gx0+4,gy0-2);
  [['a',css('accent')],['c',css('green')]].forEach(([k,col])=>{if(R.hist.length<2)return;c.strokeStyle=col;c.lineWidth=2;c.beginPath();R.hist.forEach((q,i)=>i?c.lineTo(GX(q.t),GY(q[k])):c.moveTo(GX(q.t),GY(q[k])));c.stroke()});
  if(R.half!=null){c.setLineDash([3,4]);c.strokeStyle=css('amber');c.beginPath();c.moveTo(GX(R.half),gy0);c.lineTo(GX(R.half),gy1);c.stroke();c.setLineDash([])}});
let acc=0;
TICK.rate=dt=>{if(R.pause)return;const sub_=4;for(let k=0;k<sub_;k++)step(dt/sub_);R.t+=dt;acc+=dt;
  const nA=R.p.filter(p=>p.t==='A').length;if(R.half==null&&nA<=R.n0/2)R.half=R.t;
  if(acc>.1){acc=0;R.hist.push({t:R.t,a:nA,c:R.p.filter(p=>p.t==='C').length});info()}
  if(nA===0&&!R.pause){R.pause=true;$('rtPause').textContent='Tiếp tục';info()}draw()};
$('rtT').addEventListener('input',()=>{const T=+$('rtT').value,f=Math.sqrt(T/R.T);R.p.forEach(p=>{p.vx*=f;p.vy*=f});R.T=T;info()});
$('rtN').addEventListener('input',restart);$('rtCat').addEventListener('change',info);
$('rtRestart').onclick=()=>{R.pause=reduced;$('rtPause').textContent=R.pause?'Chạy':'Tạm dừng';restart()};
$('rtPause').onclick=()=>{R.pause=!R.pause;$('rtPause').textContent=R.pause?'Chạy':'Tạm dừng'};
R.pause=reduced;$('rtPause').textContent=R.pause?'Chạy':'Tạm dừng';restart()}

/* ================= HOÁ: kim loại + nước / acid ================= */
{const MET={
  K:{n:'Kali',w:1,a:1,col:'#cfd4da',fl:'#b197fc',ew:'2K + 2H₂O → 2KOH + H₂↑',ea:'2K + 2HCl → 2KCl + H₂↑',nw:'Phản ứng rất mãnh liệt, mẩu K chạy trên mặt nước, khí H₂ bốc cháy với ngọn lửa màu tím nhạt.',na:'Phản ứng gây nổ. Tuyệt đối không làm thí nghiệm này ở trường.'},
  Na:{n:'Natri',w:.8,a:1,col:'#dee2e6',ew:'2Na + 2H₂O → 2NaOH + H₂↑',ea:'2Na + 2HCl → 2NaCl + H₂↑',nw:'Mẩu Na nóng chảy thành giọt tròn, chạy trên mặt nước, có khí thoát ra mạnh.',na:'Phản ứng rất mãnh liệt, có thể gây nổ. Không làm ở trường.'},
  Ca:{n:'Calcium',w:.45,a:.9,col:'#e9ecef',ew:'Ca + 2H₂O → Ca(OH)₂ + H₂↑',ea:'Ca + 2HCl → CaCl₂ + H₂↑',nw:'Ca tan dần, có bọt khí, dung dịch hơi đục do Ca(OH)₂ ít tan.',na:'Phản ứng mạnh, nhiều bọt khí.'},
  Mg:{n:'Magnesium',w:.04,a:.75,col:'#ced4da',ew:'Mg + 2H₂O → Mg(OH)₂ + H₂↑',ea:'Mg + 2HCl → MgCl₂ + H₂↑',nw:'Ở nhiệt độ thường phản ứng rất chậm, chỉ thấy vài bọt khí nhỏ. Đun nóng thì phản ứng nhanh hơn.',na:'Mg tan nhanh, sủi bọt mạnh, ống nghiệm nóng lên.'},
  Al:{n:'Aluminium',w:0,a:.55,col:'#d0d4d9',ew:'Không phản ứng (lớp Al₂O₃ bảo vệ)',ea:'2Al + 6HCl → 2AlCl₃ + 3H₂↑',nw:'Không thấy hiện tượng do lớp oxide Al₂O₃ bền bao bọc.',na:'Lúc đầu chậm (lớp oxide), sau đó sủi bọt khá mạnh.'},
  Zn:{n:'Zinc (kẽm)',w:0,a:.45,col:'#a5b4c3',ew:'Không phản ứng ở điều kiện thường',ea:'Zn + 2HCl → ZnCl₂ + H₂↑',nw:'Không có hiện tượng.',na:'Viên kẽm tan dần, có bọt khí thoát ra đều.'},
  Fe:{n:'Iron (sắt)',w:0,a:.28,col:'#868e96',sol:'rgba(140,200,140,.35)',ew:'Không phản ứng ở điều kiện thường',ea:'Fe + 2HCl → FeCl₂ + H₂↑',nw:'Không có hiện tượng (sắt chỉ gỉ dần trong thời gian dài).',na:'Bọt khí thoát ra chậm, dung dịch chuyển dần sang màu lục nhạt của FeCl₂.'},
  Pb:{n:'Lead (chì)',w:0,a:.05,col:'#6c757d',ew:'Không phản ứng',ea:'Pb + 2HCl → PbCl₂↓ + H₂↑',nw:'Không có hiện tượng.',na:'Gần như không thấy bọt khí: PbCl₂ ít tan bám lên bề mặt làm phản ứng dừng lại.'},
  Cu:{n:'Copper (đồng)',w:0,a:0,col:'#c8733e',ew:'Không phản ứng',ea:'Không phản ứng (Cu đứng sau H)',nw:'Không có hiện tượng.',na:'Không có hiện tượng: Cu đứng sau H trong dãy hoạt động hoá học.'},
  Ag:{n:'Silver (bạc)',w:0,a:0,col:'#dfe3e8',ew:'Không phản ứng',ea:'Không phản ứng (Ag đứng sau H)',nw:'Không có hiện tượng.',na:'Không có hiện tượng.'},
  Au:{n:'Gold (vàng)',w:0,a:0,col:'#f2c94c',ew:'Không phản ứng',ea:'Không phản ứng (Au đứng sau H)',nw:'Không có hiện tượng.',na:'Không có hiện tượng.'}};
const ORDER=['K','Na','Ca','Mg','Al','Zn','Fe','Pb','H','Cu','Ag','Au'];
$('mtMetal').innerHTML=Object.keys(MET).map(k=>`<option value="${k}">${k}: ${MET[k].n}</option>`).join('');$('mtMetal').value='Na';
const T={state:'idle',y:0,x:0,size:1,bub:[],fl:[],base:0,fe:0,t:0};
const cur_=()=>MET[$('mtMetal').value],rate=()=>{const m=cur_();return $('mtSol').value==='w'?m.w:m.a};
function series(){const k=$('mtMetal').value;$('mtSeries').innerHTML=ORDER.map(e=>`<span class="chip" style="${e===k?'background:var(--accent);color:var(--surface)':e==='H'?'background:var(--paper);color:var(--muted)':''}">${e==='H'?'(H)':e}</span>`).join('')}
function info(){const m=cur_(),acid=$('mtSol').value==='a';series();
  $('mtEq').textContent=acid?m.ea:m.ew;
  const V=$('mtV'),r=rate();V.className='verdict'+(r>=.8?' bad':r>0?' ok':'');
  V.textContent=T.state==='idle'?'Bấm "Thả mẩu kim loại" để bắt đầu.':r>0?(r>=.8?'Phản ứng rất mạnh':r>=.4?'Phản ứng rõ rệt':'Phản ứng chậm'):'Không phản ứng';
  $('mtNote').textContent=T.state==='idle'?(acid&&m.a>=1?'Cảnh báo: thí nghiệm nguy hiểm, chỉ xem bằng mô phỏng.':''):(acid?m.na:m.nw)+(!acid&&m.w>0&&$('mtPP').checked?' Dung dịch tạo thành có tính base nên phenolphthalein chuyển hồng.':'')}
function reset(){Object.assign(T,{state:'idle',y:0,size:1,bub:[],fl:[],base:0,fe:0,t:0});info();draw()}
const draw=canvasOf($('cMetal'),(c,w,h)=>{const bw=Math.min(w*.5,300),bh=Math.min(h*.62,320),bx=(w-bw)/2,by=h-bh-30,lv=by+bh*.28,m=cur_(),acid=$('mtSol').value==='a';
  // dung dịch
  let col=acid?'rgba(190,215,240,.45)':'rgba(190,215,240,.35)';
  if(!acid&&$('mtPP').checked&&T.base>0)col=`rgba(224,57,154,${Math.min(.75,.15+T.base*.6)})`;
  if(acid&&$('mtMetal').value==='Fe'&&T.fe>0)col=`rgba(120,190,120,${Math.min(.55,.2+T.fe*.4)})`;
  c.fillStyle=col;c.fillRect(bx,lv,bw,by+bh-lv);
  c.strokeStyle=css('gridStrong');c.lineWidth=3;c.beginPath();c.moveTo(bx-8,by);c.lineTo(bx,by);c.lineTo(bx,by+bh);c.lineTo(bx+bw,by+bh);c.lineTo(bx+bw,by);c.lineTo(bx+bw+8,by);c.stroke();
  c.strokeStyle=rgba('accent',.4);c.lineWidth=1.5;c.beginPath();c.moveTo(bx,lv);c.lineTo(bx+bw,lv);c.stroke();
  c.fillStyle=css('muted');c.font=font(500,12);c.textAlign='center';c.textBaseline='top';c.fillText(acid?'Dung dịch HCl loãng':'Nước cất'+($('mtPP').checked?' + phenolphthalein':''),w/2,by+bh+8);
  // bọt khí
  c.strokeStyle=rgba('ink',.5);c.lineWidth=1;T.bub.forEach(b=>{c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.stroke()});
  // mẩu kim loại
  if(T.state!=='idle'&&T.size>0.02){const s=22*T.size,floats=!acid&&($('mtMetal').value==='K'||$('mtMetal').value==='Na');
    const mx=w/2+(floats?Math.sin(T.t*2.3)*bw*.32:0),my=T.state==='fall'?T.y:(floats?lv-s*.3:by+bh-s*.7-4);T.mx=mx;T.my=my;
    T.fl.forEach(f=>{c.fillStyle=f.c;c.globalAlpha=f.a;c.beginPath();c.arc(f.x,f.y,f.r,0,7);c.fill();c.globalAlpha=1});
    c.fillStyle=m.col;c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=1;if(floats&&T.state!=='fall'){c.beginPath();c.arc(mx,my,s*.6,0,7);c.fill();c.stroke()}else{c.fillRect(mx-s/2,my-s*.35,s,s*.7);c.strokeRect(mx-s/2,my-s*.35,s,s*.7)}
    c.fillStyle='#111';c.font=font(700,11);c.textAlign='center';c.textBaseline='middle';c.fillText($('mtMetal').value,mx,my)}
  c.fillStyle=css('ink');c.font=font(700,20,'f-display');c.textAlign='left';c.textBaseline='top';c.fillText($('mtMetal').value+' + '+(acid?'HCl':'H₂O'),16,14)});
TICK.metal=dt=>{if(T.state==='idle')return;const r=rate(),cv=$('cMetal'),w=cv.clientWidth,h=cv.clientHeight,bw=Math.min(w*.5,300),bh=Math.min(h*.62,320),bx=(w-bw)/2,by=h-bh-30,lv=by+bh*.28;T.t+=dt;
  if(T.state==='fall'){T.y+=dt*500;const acid=$('mtSol').value==='a',floats=!acid&&['K','Na'].includes($('mtMetal').value),stop=floats?lv:by+bh-20;if(T.y>=stop){T.state='react';info()}draw();return}
  if(r>0&&T.size>0.02){const n=r*60*dt,cnt=Math.min(40,Math.floor(n)+(Math.random()<n%1?1:0));for(let k=0;k<cnt;k++){T.bub.push({x:(T.mx||w/2)+(Math.random()-.5)*22*T.size,y:(T.my||by+bh-20),r:1.5+Math.random()*3*(.5+r),v:40+Math.random()*60*(.5+r)})}
    T.size=Math.max(0,T.size-dt*r*r*.06);T.base=Math.min(1,T.base+dt*cur_().w*.25);T.fe=Math.min(1,T.fe+dt*.03);
    const m=cur_();if(m.fl&&$('mtSol').value==='w'&&Math.random()<r)T.fl.push({x:T.mx+(Math.random()-.5)*10,y:T.my-6,r:4+Math.random()*7,a:.8,c:m.fl,v:30+Math.random()*40})}
  T.bub.forEach(b=>{b.y-=b.v*dt;b.x+=(Math.random()-.5)*.8});T.bub=T.bub.filter(b=>b.y>lv);
  T.fl.forEach(f=>{f.y-=f.v*dt;f.a-=dt*1.6});T.fl=T.fl.filter(f=>f.a>0);draw()};
$('mtDrop').onclick=()=>{reset();T.state='fall';T.y=20;if(reduced){T.state='react';T.base=cur_().w;T.size=Math.max(.2,1-rate())}info();draw()};
$('mtReset').onclick=reset;['mtMetal','mtSol','mtPP'].forEach(id=>$(id).addEventListener('change',reset));reset()}
