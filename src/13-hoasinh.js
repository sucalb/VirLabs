
/* ================= HOÁ, SINH BỔ SUNG ================= */
const sciE=(v,d=2)=>{if(!v)return'0';const[a,b]=v.toExponential(d).split('e');return a.replace('.',',')+'·10'+sup(Math.abs(+b)).replace(/^/,+b<0?'⁻':'')};

/* ---------- Hoá: lắp ráp nguyên tử ---------- */
{const A={p:6,n:6,e:6,spin:0},LIM={p:20,n:30,e:22};
const EL=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],NM=['','Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium (natri)','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium (kali)','Calcium'];
const STABLE={1:[0,1],2:[1,2],3:[3,4],4:[5],5:[5,6],6:[6,7],7:[7,8],8:[8,9,10],9:[10],10:[10,11,12],11:[12],12:[12,13,14],13:[14],14:[14,15,16],15:[16],16:[16,17,18,20],17:[18,20],18:[18,20,22],19:[20,22],20:[20,22,23,24,26,28]};
const shells=e=>{const cap=[2,8,8,8],o=[];let r=e;for(const c of cap){if(r<=0)break;o.push(Math.min(c,r));r-=c}if(r>0)o[o.length-1]+=r;return o};
const chg=q=>q===0?'':(Math.abs(q)>1?sup(Math.abs(q)):'')+(q>0?'⁺':'⁻');
function up(){$('atP').textContent=A.p;$('atN').textContent=A.n;$('atE').textContent=A.e;const q=A.p-A.e,M=A.p+A.n;
  presetSync('#p-atom [data-at]','at',`${A.p},${A.n},${A.e}`);
  $('atSym').textContent=A.p?`${sup(M)}${sub(A.p)}${EL[A.p]}${chg(q)}`:'?';
  $('atInfo').innerHTML=kv([['Nguyên tố',A.p?NM[A.p]:'chưa xác định'],['Số hiệu nguyên tử Z = p',A.p],['Số khối A = p + n',M],['Điện tích',q===0?'0 (nguyên tử trung hoà)':(q>0?'+':'−')+Math.abs(q)+(q>0?' (ion dương)':' (ion âm)')],['Khối lượng ≈',M+' amu'],['Số e mỗi lớp',shells(A.e).join(', ')||'—']]);
  const V=$('atV'),ok=A.p&&(STABLE[A.p]||[]).includes(A.n);V.className='verdict'+(A.p?(ok?' ok':' bad'):'');
  V.textContent=!A.p?'Chưa có proton thì chưa tạo thành nguyên tố hoá học. Số proton quyết định tên nguyên tố.':ok?`Hạt nhân bền. Các nguyên tử cùng số proton nhưng khác số neutron là đồng vị của ${EL[A.p]}.`:`Hạt nhân không bền với ${A.n} neutron: đồng vị phóng xạ hoặc không tồn tại trong tự nhiên.`;draw()}
const draw=canvasOf($('cAtom'),(c,w,h)=>{const cx=w/2,cy=h/2,sh=shells(A.e),R0=Math.max(30,7*Math.sqrt(A.p+A.n)+10),gap=Math.min((Math.min(w,h)/2-R0-16)/Math.max(1,sh.length),46);
  sh.forEach((k,i)=>{const r=R0+gap*(i+1);c.strokeStyle=css('gridStrong');c.lineWidth=1.4;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();
    for(let j=0;j<k;j++){const a=A.spin*(.9/(i+1))+j*2*Math.PI/k;c.fillStyle=css('rain');c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),6,0,7);c.fill();c.strokeStyle='#10162f';c.lineWidth=1.2;c.stroke()}});
  const tot=A.p+A.n,parts=[];for(let i=0;i<tot;i++)parts.push(i%2===0&&parts.filter(x=>x).length<A.p||parts.filter(x=>!x).length>=A.n);
  parts.forEach((isP,i)=>{const r=5.6*Math.sqrt(i),a=i*2.39996;c.fillStyle=isP?css('red'):'#adb5bd';c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),7,0,7);c.fill();c.strokeStyle='#10162f';c.lineWidth=1.2;c.stroke()});
  if(!tot){c.fillStyle=css('muted');c.font=font(500,14);c.textAlign='center';c.textBaseline='middle';c.fillText('Thêm proton để bắt đầu',cx,cy)}});
document.querySelectorAll('#p-atom [data-ad]').forEach(b=>b.onclick=()=>{const[k,d]=b.dataset.ad.split(',');A[k]=Math.max(0,Math.min(LIM[k],A[k]+ +d));up()});
document.querySelectorAll('#p-atom [data-at]').forEach(b=>b.onclick=()=>{[A.p,A.n,A.e]=b.dataset.at.split(',').map(Number);up()});
TICK.atom=dt=>{if(reduced)return;A.spin+=dt;draw()};up()}

/* ---------- Hoá: thang pH ---------- */
{const SUBS=[['Dịch vị dạ dày',1.5],['Nước chanh',2.3],['Giấm ăn',2.9],['Nước cam',3.6],['Cà phê',5],['Sữa bò',6.6],['Nước cất',7],['Máu người',7.4],['Nước biển',8.1],['Dung dịch baking soda',8.4],['Nước xà phòng',10],['Nước vôi trong',12.4],['Dung dịch NaOH 0,1 M',13]];
const STOP=[[0,[215,38,61]],[3,[244,96,54]],[5,[249,200,14]],[7,[76,175,80]],[9,[30,136,229]],[11,[63,81,181]],[14,[106,27,154]]];
const uni=p=>{for(let i=1;i<STOP.length;i++)if(p<=STOP[i][0]){const[a,ca]=STOP[i-1],[b,cb]=STOP[i],t=(p-a)/(b-a);return`rgb(${ca.map((v,k)=>Math.round(v+(cb[k]-v)*t)).join(',')})`}return'rgb(106,27,154)'};
const IND={quy:p=>p<6?['#e03131','đỏ']:p<=8?['#9c36b5','tím']:['#1c7ed6','xanh'],pp:p=>p<8.2?['rgba(225,235,245,.6)','không màu']:p<10?['#f06595','hồng']:['#c2255c','hồng đậm'],un:p=>[uni(p),'màu theo thang pH']};
const S={ind:'quy'};$('phSub').innerHTML=SUBS.map((s,i)=>`<option value="${i}">${s[0]} (pH ≈ ${fmt(s[1],1)})</option>`).join('');$('phSub').value=1;
function up(){const[n,p]=SUBS[+$('phSub').value],[,cl]=IND[S.ind](p);presetSync('#p-ph [data-pi]','pi',S.ind);
  $('phInfo2').innerHTML=kv([['pH',fmt(p,1)],['Môi trường',p<6.95?'acid':p>7.05?'base':'trung tính'],['[H⁺] = 10⁻ᵖᴴ',sciE(10**-p,1)+' mol/L'],['Màu chất chỉ thị',cl]]);
  $('phV2').textContent=p<7?'pH < 7: môi trường acid, pH càng nhỏ tính acid càng mạnh. Quỳ tím hoá đỏ.':p>7?'pH > 7: môi trường base, pH càng lớn tính base càng mạnh. Quỳ tím hoá xanh, phenolphthalein hoá hồng khi pH > 8,2.':'pH = 7: môi trường trung tính, quỳ tím giữ màu tím.';draw()}
const draw=canvasOf($('cPh'),(c,w,h)=>{const sel=+$('phSub').value,ml=30,mr=30,by=h*.16,bh=34,X=p=>ml+p/14*(w-ml-mr);
  for(let i=0;i<=200;i++){const p=14*i/200;c.fillStyle=uni(p);c.fillRect(X(p),by,(w-ml-mr)/200+1,bh)}c.strokeStyle='#10162f';c.lineWidth=1.5;c.strokeRect(ml,by,w-ml-mr,bh);
  c.fillStyle=css('ink');c.font=font(700,12,'f-mono');c.textAlign='center';c.textBaseline='bottom';for(let p=0;p<=14;p++)c.fillText(p,X(p),by-4);
  c.font=font(600,12);c.textAlign='left';c.fillStyle=css('red');c.fillText('← acid mạnh dần',ml,by-20);c.textAlign='right';c.fillStyle=css('accent');c.fillText('base mạnh dần →',w-mr,by-20);c.textAlign='center';c.fillStyle=css('green');c.fillText('trung tính',X(7),by-20);
  SUBS.forEach(([n,p],i)=>{const y0=by+bh,lvl=y0+18+(i%4)*20,on=i===sel;c.strokeStyle=on?css('ink'):css('gridStrong');c.lineWidth=on?2:1;c.beginPath();c.moveTo(X(p),y0);c.lineTo(X(p),lvl-6);c.stroke();
    c.fillStyle=on?css('ink'):css('muted');c.font=font(on?700:500,11);c.textBaseline='top';c.textAlign=X(p)<90?'left':X(p)>w-90?'right':'center';c.fillText(n,X(p),lvl-4)});
  const p=SUBS[sel][1],tx=w/2,ty=by+bh+110,th=Math.min(h-ty-30,170),tw=46,[col]=IND[S.ind](p);
  c.fillStyle=col;c.beginPath();c.moveTo(tx-tw/2,ty+th*.3);c.lineTo(tx-tw/2,ty+th-tw/2);c.arc(tx,ty+th-tw/2,tw/2,Math.PI,0,true);c.lineTo(tx+tw/2,ty+th*.3);c.closePath();c.fill();
  c.strokeStyle='#10162f';c.lineWidth=2.4;c.beginPath();c.moveTo(tx-tw/2-4,ty);c.lineTo(tx-tw/2,ty);c.lineTo(tx-tw/2,ty+th-tw/2);c.arc(tx,ty+th-tw/2,tw/2,Math.PI,0,true);c.lineTo(tx+tw/2,ty);c.lineTo(tx+tw/2+4,ty);c.stroke();
  c.fillStyle=css('ink');c.font=font(700,14);c.textAlign='left';c.textBaseline='middle';c.fillText(SUBS[sel][0],tx+tw/2+16,ty+th*.45);c.font=font(500,12);c.fillStyle=css('muted');
  c.fillText('+ '+({quy:'giấy quỳ tím',pp:'phenolphthalein',un:'chỉ thị vạn năng'})[S.ind]+': '+IND[S.ind](p)[1],tx+tw/2+16,ty+th*.45+20)});
document.querySelectorAll('#p-ph [data-pi]').forEach(b=>b.onclick=()=>{S.ind=b.dataset.pi;up()});$('phSub').addEventListener('change',up);up()}

/* ---------- Hoá: cân bằng hoá học ---------- */
{const Q={mol:[],prevA:null,msg:'Thay đổi nhiệt độ hoặc áp suất để xem cân bằng chuyển dịch.',why:''},n0=18;
const Kp=T=>Math.exp(-(57200-175.8*T)/(8.314*T)),alpha=(T,P)=>Math.sqrt(Kp(T)/(Kp(T)+4*P));
function sync(){const T=+$('eqT').value,P=+$('eqP').value,a=alpha(T,P),nNO2=Math.round(2*a*n0),nN=n0-Math.round(nNO2/2);let cur2=Q.mol.filter(m=>m.t===2).length,cur1=Q.mol.length-cur2;
  while(cur1>nN&&Q.mol.some(m=>m.t===1)){const m=Q.mol.find(m=>m.t===1);m.t=2;Q.mol.push({t:2,x:m.x+.02,y:m.y,vx:-m.vx,vy:m.vy});cur1--;cur2+=2}
  while(cur1<nN&&Q.mol.filter(m=>m.t===2).length>=2){const i=Q.mol.findIndex(m=>m.t===2);Q.mol[i].t=1;const j=Q.mol.findIndex((m,k)=>m.t===2&&k!==i);Q.mol.splice(j,1);cur1++}
  while(Q.mol.length<1)Q.mol.push({t:1,x:Math.random(),y:Math.random(),vx:.3,vy:.2})}
for(let i=0;i<n0;i++)Q.mol.push({t:1,x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6});
function up(cause){const T=+$('eqT').value,P=+$('eqP').value,a=alpha(T,P),x=2*a/(1+a);$('oeqT').textContent=T+' K ('+(T-273)+' °C)';$('oeqP').textContent=fmt(P,1)+' bar';
  if(Q.prevA!=null&&Math.abs(a-Q.prevA)>1e-4){Q.msg=a>Q.prevA?'Cân bằng chuyển dịch theo chiều nghịch: tạo thêm NO₂, hỗn hợp đậm màu nâu hơn.':'Cân bằng chuyển dịch theo chiều thuận: tạo thêm N₂O₄, hỗn hợp nhạt màu đi.';
    Q.why=cause==='T'?(a>Q.prevA?' Lí do: tăng nhiệt độ, cân bằng chuyển dịch theo chiều thu nhiệt (chiều nghịch).':' Lí do: giảm nhiệt độ, cân bằng chuyển dịch theo chiều toả nhiệt (chiều thuận).'):(a<Q.prevA?' Lí do: tăng áp suất, cân bằng chuyển dịch về phía ít phân tử khí hơn (N₂O₄).':' Lí do: giảm áp suất, cân bằng chuyển dịch về phía nhiều phân tử khí hơn (NO₂).')}
  Q.prevA=a;sync();
  $('eqInfo').innerHTML=kv([['Hằng số cân bằng K_P (N₂O₄ ⇌ 2NO₂)',fmt(Kp(T),3)],['Phần trăm N₂O₄ bị phân li',fmt(a*100,1)+' %'],['Phần mol NO₂ trong hỗn hợp',fmt(x*100,1)+' %'],['Số phân tử trong hình',`${Q.mol.filter(m=>m.t===2).length} NO₂, ${Q.mol.filter(m=>m.t===1).length} N₂O₄`]]);
  $('eqV').textContent=Q.msg+Q.why;draw()}
const draw=canvasOf($('cEqb'),(c,w,h)=>{const T=+$('eqT').value,P=+$('eqP').value,a=alpha(T,P),x=2*a/(1+a),conc=x*P*298/T,x0=50,cy=h/2,ch=Math.min(h*.5,220),Lmax=w-150,L=Lmax*Math.min(1,1/P)*.95+30,y0=cy-ch/2;
  if(T>318||T<285){c.fillStyle=T>318?'rgba(255,135,135,.25)':'rgba(116,192,252,.3)';c.fillRect(x0-24,y0-24,L+48,ch+48);c.fillStyle=css('muted');c.font=font(600,12);c.textAlign='left';c.textBaseline='bottom';c.fillText(T>318?'Cốc nước nóng':'Cốc nước đá',x0-20,y0-28)}
  c.fillStyle=`rgba(150,60,20,${Math.min(.75,conc*1.4)})`;c.fillRect(x0,y0,L,ch);
  c.strokeStyle='#10162f';c.lineWidth=3;c.beginPath();c.moveTo(x0+L,y0);c.lineTo(x0,y0);c.lineTo(x0,y0+ch);c.lineTo(x0+L,y0+ch);c.stroke();
  c.fillStyle='#adb5bd';c.fillRect(x0+L,y0-6,14,ch+12);c.strokeRect(x0+L,y0-6,14,ch+12);c.fillRect(x0+L+14,cy-6,w-x0-L-30,12);c.strokeRect(x0+L+14,cy-6,w-x0-L-30,12);
  Q.mol.forEach(m=>{const px=x0+12+m.x*(L-24),py=y0+12+m.y*(ch-24);c.strokeStyle='#10162f';c.lineWidth=1.2;
    if(m.t===2){c.fillStyle='#c0582f';c.beginPath();c.arc(px,py,7,0,7);c.fill();c.stroke()}else{c.fillStyle='#f1f3f5';[-5,5].forEach(d=>{c.beginPath();c.arc(px+d,py,6,0,7);c.fill();c.stroke()})}});
  c.font=font(600,12);c.textAlign='left';c.textBaseline='top';c.fillStyle=css('ink');c.fillText('● NO₂ (nâu đỏ)   ●● N₂O₄ (không màu)',x0,y0+ch+12)});
TICK.equil=dt=>{const k=reduced?.2:1,T=+$('eqT').value,sp=Math.sqrt(T/298)*k;Q.mol.forEach(m=>{m.x+=m.vx*dt*sp;m.y+=m.vy*dt*sp;if(m.x<0){m.x=0;m.vx=Math.abs(m.vx)}if(m.x>1){m.x=1;m.vx=-Math.abs(m.vx)}if(m.y<0){m.y=0;m.vy=Math.abs(m.vy)}if(m.y>1){m.y=1;m.vy=-Math.abs(m.vy)}});draw()};
$('eqT').addEventListener('input',()=>up('T'));$('eqP').addEventListener('input',()=>up('P'));
$('eqHot').onclick=()=>{$('eqT').value=353;up('T')};$('eqCold').onclick=()=>{$('eqT').value=273;up('T')};$('eqPush').onclick=()=>{$('eqP').value=Math.min(4,+$('eqP').value*2);up('P')};
Q.prevA=null;up()}

/* ---------- Hoá: mol ---------- */
{const SUB=[['H₂O (nước)',18,'lỏng'],['NaCl (muối ăn)',58.5,'rắn'],['C₆H₁₂O₆ (glucose)',180,'rắn'],['Fe (sắt)',56,'rắn'],['CaCO₃ (đá vôi)',100,'rắn'],['O₂ (oxygen)',32,'khí'],['CO₂ (carbon dioxide)',44,'khí'],['H₂ (hydrogen)',2,'khí']];
$('moSub').innerHTML=SUB.map((s,i)=>`<option value="${i}">${s[0]}, M = ${fmt(s[1],s[1]%1?1:0)} g/mol</option>`).join('');
function up(){const[nm,M,st]=SUB[+$('moSub').value],n=+$('moN').value;$('omoN').textContent=fmt(n,1)+' mol';
  $('moInfo').innerHTML=kv([['Khối lượng mol M',fmt(M,M%1?1:0)+' g/mol'],['Khối lượng m',fmt(n*M,1)+' g'],['Số phân tử, nguyên tử N',sciE(n*6.022e23,3)],['Thể tích ở 25 °C, 1 bar',st==='khí'?fmt(n*24.79,2)+' L':'không áp dụng ('+st+')']]);draw()}
const draw=canvasOf($('cMole'),(c,w,h)=>{const[nm,M,st]=SUB[+$('moSub').value],n=+$('moN').value,pw=w/3,cy=h*.55;
  const title=(i,t)=>{c.fillStyle=css('ink');c.font=font(700,13);c.textAlign='center';c.textBaseline='top';c.fillText(t,pw*i+pw/2,16)};title(0,'Khối lượng');title(1,'Số hạt');title(2,'Thể tích khí');
  let x=pw/2;c.fillStyle='#dee2e6';c.strokeStyle='#10162f';c.lineWidth=2;c.fillRect(x-60,cy+30,120,40);c.strokeRect(x-60,cy+30,120,40);c.fillStyle='#10162f';c.fillRect(x-44,cy+40,88,22);c.fillStyle='#69db7c';c.font=font(700,15,'f-mono');c.textBaseline='middle';c.fillText(fmt(n*M,1)+' g',x,cy+51);
  c.fillStyle='#adb5bd';c.fillRect(x-56,cy+24,112,6);c.strokeRect(x-56,cy+24,112,6);const hp=Math.min(80,8+Math.sqrt(n*M)*3.2);c.fillStyle=st==='lỏng'?'rgba(116,192,252,.8)':st==='khí'?'rgba(206,212,218,.4)':'#f1e3c8';
  c.beginPath();c.moveTo(x-hp*.9,cy+24);c.quadraticCurveTo(x,cy+24-hp*1.2,x+hp*.9,cy+24);c.closePath();c.fill();c.stroke();
  x=pw*1.5;const bags=Math.ceil(n),cols=Math.min(5,bags),bw=Math.min(40,pw/6);for(let i=0;i<bags;i++){const bx=x-(cols*bw*1.2)/2+(i%cols)*bw*1.2+bw*.1,byy=cy-40+Math.floor(i/cols)*bw*1.4,f=Math.min(1,n-i);
    c.fillStyle=css('accentSoft');c.fillRect(bx,byy,bw,bw*1.2);c.fillStyle=css('accent');c.fillRect(bx,byy+bw*1.2*(1-f),bw,bw*1.2*f);c.strokeStyle='#10162f';c.lineWidth=1.5;c.strokeRect(bx,byy,bw,bw*1.2)}
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='center';c.textBaseline='top';c.fillText('Mỗi túi = 1 mol = 6,022·10²³ hạt',x,h-40);
  x=pw*2.5;if(st==='khí'){const V=n*24.79,r=Math.min(pw*.4,14*Math.cbrt(V));c.fillStyle=css('accentSoft');c.strokeStyle='#10162f';c.lineWidth=2;c.beginPath();c.ellipse(x,cy-10,r*.9,r,0,0,7);c.fill();c.stroke();c.beginPath();c.moveTo(x,cy-10+r);c.lineTo(x-5,cy+r);c.lineTo(x+5,cy+r);c.closePath();c.fill();c.stroke();
    c.beginPath();c.moveTo(x,cy+r);c.quadraticCurveTo(x+10,cy+r+20,x,cy+r+40);c.stroke();c.fillStyle=css('ink');c.font=font(700,15,'f-mono');c.textBaseline='middle';c.fillText(fmt(V,1)+' L',x,cy-10)}
  else{c.fillStyle=css('muted');c.font=font(500,12);c.textBaseline='middle';c.fillText('Chất '+st+': không dùng',x,cy-10);c.fillText('công thức V = n · 24,79',x,cy+8)}});
$('moSub').addEventListener('change',up);$('moN').addEventListener('input',up);up()}

/* ---------- Sinh: cấu tạo tế bào ---------- */
{const ORG={mang:['Màng sinh chất','Bao bọc tế bào, kiểm soát các chất đi vào và đi ra khỏi tế bào.'],thanh:['Thành tế bào','Lớp cellulose cứng bên ngoài màng sinh chất, giúp tế bào thực vật có hình dạng ổn định. Tế bào động vật không có.'],
  nhan:['Nhân','Chứa vật chất di truyền (DNA), điều khiển mọi hoạt động sống của tế bào.'],tbc:['Tế bào chất','Chất keo lỏng trong tế bào, nơi diễn ra phần lớn các phản ứng hoá học.'],ti:['Ti thể','Nơi diễn ra hô hấp tế bào, tạo năng lượng (ATP) cho tế bào hoạt động.'],
  luc:['Lục lạp','Chứa diệp lục, thực hiện quang hợp tạo chất hữu cơ từ ánh sáng. Chỉ có ở tế bào thực vật.'],khong:['Không bào','Chứa nước, muối khoáng và chất dự trữ. Ở tế bào thực vật trưởng thành có không bào trung tâm rất lớn.'],
  luoi:['Lưới nội chất','Hệ thống màng thông nhau, tổng hợp và vận chuyển protein, lipid.'],golgi:['Bộ máy Golgi','Thu nhận, biến đổi, đóng gói và phân phối các sản phẩm của tế bào.'],ribo:['Ribosome','Hạt rất nhỏ, nơi tổng hợp protein.'],
  lyso:['Lysosome','Chứa enzyme phân giải các chất và bào quan già. Có chủ yếu ở tế bào động vật.'],trung:['Trung thể','Tham gia hình thành thoi phân bào khi tế bào động vật phân chia.']};
const C={type:'dv',sel:'nhan',G:{x:0,y:0,s:1}};
const LAY={dv:[['ti','e',.68,.33,.07,.035,.4],['ti','e',.3,.7,.07,.035,-.3],['ti','e',.72,.67,.07,.035,.2],['lyso','c',.28,.33,.03],['lyso','c',.6,.78,.025],['trung','c',.57,.3,.03],['golgi','c',.64,.52,.06],['khong','c',.8,.48,.035],['luoi','c',.36,.5,.05],['ribo','c',.5,.72,.03],['nhan','c',.46,.48,.12],['tbc','c',.5,.5,.32],['mang','c',.5,.5,.38]],
  tv:[['luc','e',.25,.25,.06,.03,.3],['luc','e',.78,.3,.06,.03,-.4],['luc','e',.3,.78,.06,.03,.1],['luc','e',.76,.78,.06,.03,-.2],['ti','e',.5,.2,.06,.03,0],['golgi','c',.22,.55,.05],['ribo','c',.82,.55,.03],['luoi','c',.38,.2,.04],['nhan','c',.24,.38,.09],['khong','r',.58,.54,.22,.22],['tbc','r',.5,.5,.34,.34],['mang','r',.5,.5,.37,.37],['thanh','r',.5,.5,.42,.42]]};
const hit=(o,u,v)=>o[1]==='c'?Math.hypot(u-o[2],v-o[3])<=o[4]:o[1]==='e'?((u-o[2])/o[4])**2+((v-o[3])/o[5])**2<=1.3:Math.abs(u-o[2])<=o[4]&&Math.abs(v-o[3])<=o[5];
function up(){presetSync('#p-cellstruct [data-ct2]','ct2',C.type);if(!LAY[C.type].some(o=>o[0]===C.sel))C.sel='nhan';const[nm,ds]=ORG[C.sel];$('csName').textContent=nm;$('csDesc').textContent=ds;
  $('csCmp').innerHTML=kv([['Bào quan','Động vật / Thực vật'],['Thành tế bào','không / có'],['Lục lạp','không / có'],['Không bào','nhỏ / rất lớn'],['Lysosome, trung thể','có / thường không'],['Nhân, ti thể, màng','có / có']]);draw()}
const draw=canvasOf($('cCs'),(c,w,h)=>{const S=Math.min(h-20,w-(w>600?260:20)),ox=(w-S)/2,oy=(h-S)/2;C.G={x:ox,y:oy,s:S};const P=(u,v)=>[ox+u*S,oy+v*S],N='#10162f';
  const lay=[...LAY[C.type]].reverse(),dv=C.type==='dv';
  lay.forEach(o=>{const[k,sh,u,v,a,b,rot]=o,[x,y]=P(u,v);c.lineWidth=2;c.strokeStyle=N;c.save();
    if(k==='thanh'){c.fillStyle='#b2f2bb';c.fillRect(x-a*S,y-b*S,2*a*S,2*b*S);c.lineWidth=3;c.strokeRect(x-a*S,y-b*S,2*a*S,2*b*S)}
    else if(k==='mang'){c.fillStyle=dv?'#ffe3e3':'#ebfbee';c.beginPath();dv?c.ellipse(x,y,a*S,a*S*.86,0,0,7):c.roundRect(x-a*S,y-b*S,2*a*S,2*b*S,12);c.fill();c.stroke()}
    else if(k==='tbc'){}
    else if(k==='nhan'){c.fillStyle='#d0bfff';c.beginPath();c.arc(x,y,a*S,0,7);c.fill();c.stroke();c.fillStyle='#7950f2';c.beginPath();c.arc(x+a*S*.25,y-a*S*.15,a*S*.32,0,7);c.fill()}
    else if(k==='khong'){c.fillStyle='rgba(165,216,255,.75)';c.beginPath();sh==='r'?c.roundRect(x-a*S,y-b*S,2*a*S,2*b*S,20):c.arc(x,y,a*S,0,7);c.fill();c.stroke()}
    else if(k==='ti'){c.translate(x,y);c.rotate(rot);c.fillStyle='#ffa94d';c.beginPath();c.ellipse(0,0,a*S,b*S,0,0,7);c.fill();c.stroke();c.lineWidth=1.4;c.beginPath();for(let i=-3;i<=3;i++){const xx=i*a*S/4;c.moveTo(xx,-b*S*.7);c.lineTo(xx+a*S/8,b*S*.7)}c.stroke()}
    else if(k==='luc'){c.translate(x,y);c.rotate(rot);c.fillStyle='#51cf66';c.beginPath();c.ellipse(0,0,a*S,b*S,0,0,7);c.fill();c.stroke();c.fillStyle='#2b8a3e';for(let i=-2;i<=2;i++){c.fillRect(i*a*S/3-2,-b*S*.5,4,b*S)}}
    else if(k==='golgi'){c.strokeStyle='#e64980';c.lineWidth=3.2;for(let i=0;i<4;i++){c.beginPath();c.arc(x,y+a*S*1.4,a*S*(.9+i*.28),Math.PI*1.2,Math.PI*1.8);c.stroke()}}
    else if(k==='luoi'){c.strokeStyle='#4c6ef5';c.lineWidth=2.4;for(let i=0;i<3;i++){c.beginPath();for(let t=0;t<=20;t++){const yy=y-a*S+i*a*S*.8+Math.sin(t*.9)*4,xx=x-a*S*1.2+t*a*S*2.4/20;t?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}}
    else if(k==='ribo'){c.fillStyle=N;for(let i=0;i<9;i++){c.beginPath();c.arc(x+Math.cos(i*2.4)*a*S*(.3+i%3*.3),y+Math.sin(i*2.4)*a*S*(.3+i%3*.3),2.2,0,7);c.fill()}}
    else if(k==='lyso'){c.fillStyle='#94d82d';c.beginPath();c.arc(x,y,a*S,0,7);c.fill();c.stroke()}
    else if(k==='trung'){c.fillStyle='#868e96';c.fillRect(x-a*S,y-a*S*.35,a*S*1.1,a*S*.7);c.strokeRect(x-a*S,y-a*S*.35,a*S*1.1,a*S*.7);c.fillRect(x+a*S*.1,y-a*S,a*S*.7,a*S*1.1);c.strokeRect(x+a*S*.1,y-a*S,a*S*.7,a*S*1.1)}
    c.restore();
    if(k===C.sel&&k!=='tbc'){c.save();c.strokeStyle='#ffd300';c.lineWidth=5;c.globalAlpha=.9;c.beginPath();if(sh==='r')c.rect(x-a*S-4,y-b*S-4,2*a*S+8,2*b*S+8);else if(sh==='e')c.ellipse(x,y,a*S+6,a*S*.7+6,rot||0,0,7);else c.arc(x,y,a*S+5,0,7);c.stroke();c.restore()}});
  if($('csLab').checked&&w>600){const seen=new Set(),items=LAY[C.type].filter(o=>{if(seen.has(o[0]))return false;seen.add(o[0]);return true});
    items.forEach((o,i)=>{const[k,sh,u,v,a]=o,[x,y]=P(u,v),left=u<.5,lx=left?ox-14:ox+S+14,ly=oy+20+i*(S-40)/(items.length-1||1),ax=k==='mang'||k==='thanh'||k==='tbc'?x+(left?-1:1)*(sh==='r'?a*S:a*S*.95)*(k==='tbc'?.6:1):x;
      c.strokeStyle=k===C.sel?'#10162f':'rgba(16,22,47,.4)';c.lineWidth=1;c.beginPath();c.moveTo(ax,y);c.lineTo(lx+(left?4:-4),ly);c.stroke();c.fillStyle=k===C.sel?css('accent'):css('ink');c.font=font(k===C.sel?700:500,12);c.textAlign=left?'right':'left';c.textBaseline='middle';c.fillText(ORG[k][0],lx,ly)})}});
$('cCs').addEventListener('click',e=>{const r=$('cCs').getBoundingClientRect(),u=(e.clientX-r.left-C.G.x)/C.G.s,v=(e.clientY-r.top-C.G.y)/C.G.s,o=LAY[C.type].find(o=>hit(o,u,v));if(o){C.sel=o[0];up()}});$('cCs').style.cursor='pointer';
document.querySelectorAll('#p-cellstruct [data-ct2]').forEach(b=>b.onclick=()=>{C.type=b.dataset.ct2;up()});$('csLab').addEventListener('change',draw);up()}

/* ---------- Sinh: thẩm thấu ---------- */
{const O={type:'hc',vol:1,t:0,dots:Array.from({length:240},()=>[Math.random(),Math.random()])};
function target(){const C=+$('osC').value,r=Math.sqrt((0.9+.15)/(C+.15));return O.type==='hc'?Math.max(.55,Math.min(1.75,r)):Math.min(1,Math.max(.45,r))}
function env(C){return C<.8?'nhược trương':C>1?'ưu trương':'đẳng trương'}
function up(){const C=+$('osC').value;presetSync('#p-osmosis [data-oc]','oc',O.type);presetSync('#p-osmosis [data-ov]','ov',String(C));$('oosC').textContent=fmt(C,1)+' %';const e=env(C);
  $('osInfo').innerHTML=kv([['Môi trường ngoài tế bào',e],['Nước di chuyển',e==='nhược trương'?'từ ngoài vào trong tế bào':e==='ưu trương'?'từ trong tế bào ra ngoài':'vào và ra cân bằng'],['Thể tích tế bào',fmt(O.vol*100,0)+' %']]);
  const V=$('osV'),lys=O.type==='hc'&&O.vol>1.6;V.className='verdict'+(lys||O.vol<.8?' bad':' ok');
  V.textContent=O.type==='hc'?(lys?'Hồng cầu hút nước, trương lên rồi vỡ (tan máu). Vì vậy không truyền nước cất vào máu.':e==='ưu trương'?'Hồng cầu mất nước, co lại và nhăn nheo.':e==='nhược trương'?'Hồng cầu hút nước và trương lên.':'Dung dịch NaCl 0,9 % đẳng trương với máu: hồng cầu giữ nguyên hình dạng.')
    :(e==='ưu trương'?'Tế bào mất nước, chất nguyên sinh co lại tách khỏi thành tế bào: hiện tượng co nguyên sinh.':e==='nhược trương'?'Tế bào hút nước, trương lên nhưng không vỡ nhờ thành tế bào cứng.':'Tế bào ở trạng thái bình thường.')}
const draw=canvasOf($('cOs'),(c,w,h)=>{const C=+$('osC').value,cx=w/2,cy=h/2,R=Math.min(w,h)*.22,N='#10162f';
  c.fillStyle='rgba(165,216,255,.25)';c.fillRect(0,0,w,h);c.fillStyle='rgba(16,22,47,.35)';const nd=Math.round(C/3*240);for(let i=0;i<nd;i++){const[x,y]=O.dots[i];if(Math.hypot(x*w-cx,y*h-cy)<R*1.6)continue;c.beginPath();c.arc(x*w,y*h,1.8,0,7);c.fill()}
  if(O.type==='hc'){const s=Math.sqrt(O.vol),r=R*s,lys=O.vol>1.6;
    if(lys){c.fillStyle='rgba(224,49,49,.18)';c.beginPath();c.arc(cx,cy,r*1.3,0,7);c.fill();c.strokeStyle='#c92a2a';c.lineWidth=3;for(let i=0;i<6;i++){const a=i*1.05+.3;c.beginPath();c.arc(cx,cy,r,a,a+.6);c.stroke()}}
    else{c.fillStyle='#e03131';c.strokeStyle=N;c.lineWidth=2;c.beginPath();for(let i=0;i<=120;i++){const a=i/120*2*Math.PI,k=O.vol<.85?1+.09*Math.sin(a*18):1,rr=r*k;i?c.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)*.82):c.moveTo(cx+rr,cy)}c.closePath();c.fill();c.stroke();
      if(O.vol>=.85){c.fillStyle='#ff8787';c.beginPath();c.ellipse(cx,cy,r*.45,r*.36,0,0,7);c.fill()}}}
  else{const W=R*2.6,H=R*1.9;c.fillStyle='#b2f2bb';c.strokeStyle=N;c.lineWidth=4;c.strokeRect(cx-W/2,cy-H/2,W,H);c.fillStyle='rgba(165,216,255,.25)';c.fillRect(cx-W/2+3,cy-H/2+3,W-6,H-6);
    const s=Math.sqrt(O.vol),pw=(W-14)*s,ph=(H-14)*s;c.fillStyle='#d3f9d8';c.lineWidth=2;c.beginPath();c.roundRect(cx-pw/2,cy-ph/2,pw,ph,Math.min(40,(1-s)*120+6));c.fill();c.stroke();
    c.fillStyle='rgba(116,192,252,.7)';c.beginPath();c.roundRect(cx-pw*.32,cy-ph*.3,pw*.64,ph*.6,10);c.fill();c.fillStyle='#51cf66';for(let i=0;i<8;i++){const a=i*.8;c.beginPath();c.ellipse(cx+pw*.42*Math.cos(a),cy+ph*.4*Math.sin(a),7,4,a,0,7);c.fill()}}
  const e=env(C),dir=e==='nhược trương'?-1:e==='ưu trương'?1:0;c.strokeStyle=c.fillStyle=css('accent');c.lineWidth=2.4;
  for(let i=0;i<8;i++){const a=i/8*2*Math.PI+.2,r0=R*1.35,r1=R*1.75,o=(O.t*.6%1)*14*(dir||1),d=dir||(i%2?1:-1),ra=d<0?r1:r0,rb=d<0?r0:r1;
    c.beginPath();c.moveTo(cx+(ra+o*d)*Math.cos(a),cy+(ra+o*d)*Math.sin(a));c.lineTo(cx+(rb+o*d)*Math.cos(a),cy+(rb+o*d)*Math.sin(a));c.stroke();arrowHead(c,cx+(rb+o*d)*Math.cos(a),cy+(rb+o*d)*Math.sin(a),d<0?a+Math.PI:a,8)}
  c.fillStyle=css('ink');c.font=font(600,12);c.textAlign='left';c.textBaseline='top';c.fillText('Mũi tên: hướng nước di chuyển · Chấm đen: phân tử muối',12,10)});
TICK.osmosis=dt=>{O.t+=dt;const tg=target();O.vol+=(tg-O.vol)*Math.min(1,dt*(reduced?5:1.2));up();draw()};
document.querySelectorAll('#p-osmosis [data-oc]').forEach(b=>b.onclick=()=>{O.type=b.dataset.oc;O.vol=1;up()});document.querySelectorAll('#p-osmosis [data-ov]').forEach(b=>b.onclick=()=>{$('osC').value=b.dataset.ov;up()});
$('osC').addEventListener('input',up);up()}

/* ---------- Sinh: tuần hoàn máu ---------- */
{const H={t:0,ph:0,play:!reduced,cells:Array.from({length:46},(_,i)=>i/46)};
const PATH=[[.42,.43],[.42,.58],[.3,.58],[.3,.15],[.7,.15],[.7,.43],[.58,.43],[.58,.58],[.74,.58],[.74,.88],[.26,.88],[.26,.43],[.42,.43]];
let LEN=[],TOT=0;function lens(w,h){LEN=[];TOT=0;for(let i=1;i<PATH.length;i++){const l=Math.hypot((PATH[i][0]-PATH[i-1][0])*w,(PATH[i][1]-PATH[i-1][1])*h);LEN.push(l);TOT+=l}}
function at(f,w,h){let d=f*TOT,k=0;while(k<LEN.length-1&&d>LEN[k]){d-=LEN[k];k++}const t=d/LEN[k],a=PATH[k],b=PATH[k+1];return{x:(a[0]+(b[0]-a[0])*t)*w,y:(a[1]+(b[1]-a[1])*t)*h,seg:k,t}}
const oxy=p=>(p.seg>3&&p.seg<9)||(p.seg===3&&p.t>.5)||(p.seg===9&&p.t<.5);
const phase=f=>f<.125?['Tâm nhĩ co','Máu từ tâm nhĩ được đẩy xuống tâm thất.']:f<.5?['Tâm thất co','Máu từ tâm thất phải lên phổi, từ tâm thất trái vào động mạch chủ đi nuôi cơ thể.']:['Dãn chung','Tim nghỉ, máu từ tĩnh mạch chảy về tâm nhĩ.'];
function up(){const r=+$('htR').value;$('ohtR').textContent=r+' lần/phút';presetSync('#p-heart [data-hr]','hr',r);const Tc=60/r,[pn,pd]=phase(H.ph);
  $('htInfo').innerHTML=kv([['Thời gian một chu kì',fmt(Tc,2)+' s'],['Tâm nhĩ co',fmt(Tc*.125,2)+' s'],['Tâm thất co',fmt(Tc*.375,2)+' s'],['Dãn chung',fmt(Tc*.5,2)+' s'],['Pha hiện tại',pn]]);$('htV').textContent=pd}
const draw=canvasOf($('cHeart'),(c,w,h)=>{lens(w,h);const N='#10162f',P=(u,v)=>[u*w,v*h],f=H.ph,sa=f<.125?.9:1,sv=f>=.125&&f<.5?.88:1;
  c.fillStyle='#ffe3e3';c.strokeStyle=N;c.lineWidth=2;[[.38,.11],[.62,.11]].forEach(([u,v])=>{const[x,y]=P(u,v);c.beginPath();c.ellipse(x,y,w*.1,h*.07,0,0,7);c.fill();c.stroke()});
  c.fillStyle=N;c.font=font(700,13);c.textAlign='center';c.textBaseline='middle';c.fillText('Phổi',w/2,h*.05);
  c.fillStyle='#fff4e6';c.beginPath();c.roundRect(w*.2,h*.84,w*.6,h*.09,12);c.fill();c.stroke();c.fillStyle=N;c.fillText('Các cơ quan trong cơ thể',w/2,h*.885);
  c.strokeStyle='#ced4da';c.lineWidth=10;c.beginPath();PATH.forEach((p,i)=>i?c.lineTo(...P(...p)):c.moveTo(...P(...p)));c.stroke();
  const ch=(u,v,s,col,lab)=>{const[x,y]=P(u,v),W=w*.12*s,Hh=h*.12*s;c.fillStyle=col;c.strokeStyle=N;c.lineWidth=2;c.beginPath();c.roundRect(x-W/2,y-Hh/2,W,Hh,10);c.fill();c.stroke();c.fillStyle='#fff';c.font=font(700,11);c.fillText(lab,x,y)};
  ch(.42,.43,sa,'#4dabf7','Nhĩ phải');ch(.42,.58,sv,'#339af0','Thất phải');ch(.58,.43,sa,'#ff6b6b','Nhĩ trái');ch(.58,.58,sv,'#fa5252','Thất trái');
  H.cells.forEach(f=>{const p=at(f,w,h);c.fillStyle=oxy(p)?'#e03131':'#1c7ed6';c.beginPath();c.arc(p.x,p.y,4.5,0,7);c.fill()});
  c.fillStyle=css('muted');c.font=font(600,11);c.textAlign='right';c.fillText('Động mạch phổi',w*.29,h*.36);c.textAlign='left';c.fillText('Tĩnh mạch phổi',w*.71,h*.3);c.fillText('Động mạch chủ',w*.75,h*.72);c.textAlign='right';c.fillText('Tĩnh mạch chủ',w*.25,h*.66);
  c.fillStyle=css('accent');c.font=font(700,12);c.textAlign='center';c.fillText('Vòng tuần hoàn nhỏ',w/2,h*.21);c.fillText('Vòng tuần hoàn lớn',w/2,h*.8);
  c.fillStyle=N;c.font=font(700,14);c.textAlign='left';c.textBaseline='top';c.fillText(phase(f)[0],12,10)});
TICK.heart=dt=>{if(!H.play)return;const r=+$('htR').value,Tc=60/r;H.ph=(H.ph+dt/Tc)%1;const sp=(H.ph>=.125&&H.ph<.5?2:.6)*r/75*.035;H.cells=H.cells.map(f=>(f+sp*dt)%1);up();draw()};
$('htPlay').textContent=H.play?'Tạm dừng':'Chạy';$('htPlay').onclick=()=>{H.play=!H.play;$('htPlay').textContent=H.play?'Tạm dừng':'Chạy'};
document.querySelectorAll('#p-heart [data-hr]').forEach(b=>b.onclick=()=>{$('htR').value=b.dataset.hr;up()});$('htR').addEventListener('input',up);up()}

/* ---------- Sinh: xác định giới tính ---------- */
{const X={kids:[]};
function up(){const b=X.kids.filter(k=>k).length,g=X.kids.length-b,n=X.kids.length;
  $('sxInfo').innerHTML=kv([['Số em bé',n],['Con trai (XY)',b+(n?` (${fmt(b/n*100,1)} %)`:'')],['Con gái (XX)',g+(n?` (${fmt(g/n*100,1)} %)`:'')],['Tỉ lệ lí thuyết','1 trai : 1 gái']]);
  $('sxV').textContent='Mẹ chỉ cho một loại trứng mang X. Bố cho hai loại tinh trùng X và Y với tỉ lệ ngang nhau, nên giới tính của con do tinh trùng của bố quyết định.';draw()}
const draw=canvasOf($('cSex'),(c,w,h)=>{const N='#10162f',top=h*.36;c.fillStyle=css('ink');c.font=font(700,13);c.textAlign='center';c.textBaseline='top';
  drawArt(c,'person',w*.2,52,64);c.fillText('Bố (44A + XY)',w*.2,88);drawArt(c,'girl',w*.8,52,64);c.fillText('Mẹ (44A + XX)',w*.8,88);
  const gam=(x,y,t,col)=>{c.fillStyle=col;c.beginPath();c.arc(x,y,16,0,7);c.fill();c.strokeStyle=N;c.lineWidth=2;c.stroke();c.fillStyle='#fff';c.font=font(700,13);c.textBaseline='middle';c.fillText(t,x,y)};
  gam(w*.14,top-14,'X','#f783ac');gam(w*.26,top-14,'Y','#4c6ef5');gam(w*.8,top-14,'X','#f783ac');c.fillStyle=css('muted');c.font=font(500,11);c.textBaseline='top';c.fillText('Tinh trùng (50 % X, 50 % Y)',w*.2,top+6);c.fillText('Trứng (100 % X)',w*.8,top+6);
  const bx=w*.38,bw=w*.24,cy2=top-36;c.strokeStyle=N;c.lineWidth=1.5;c.strokeRect(bx,cy2,bw,44);c.beginPath();c.moveTo(bx+bw/2,cy2);c.lineTo(bx+bw/2,cy2+44);c.stroke();
  c.fillStyle='#fcc2d7';c.fillRect(bx+1,cy2+1,bw/2-2,42);c.fillStyle='#d0ebff';c.fillRect(bx+bw/2+1,cy2+1,bw/2-2,42);c.fillStyle=N;c.font=font(700,13);c.textBaseline='middle';c.fillText('XX: gái',bx+bw/4,cy2+22);c.fillText('XY: trai',bx+bw*.75,cy2+22);
  const gy=top+34,cell=Math.max(18,Math.min(34,Math.sqrt((w-40)*(h-gy-10)/100))),cols=Math.floor((w-24)/cell),shown=X.kids.slice(-cols*Math.floor((h-gy)/cell));
  shown.forEach((b,i)=>drawArt(c,b?'person':'girl',16+cell/2+(i%cols)*cell,gy+cell/2+Math.floor(i/cols)*cell,cell*.95));
  if(!X.kids.length){c.fillStyle=css('muted');c.font=font(500,13);c.textBaseline='top';c.fillText('Bấm "Sinh 1 bé" để bắt đầu',w/2,gy+20)}});
document.querySelectorAll('#p-sexdet [data-sb]').forEach(b=>b.onclick=()=>{for(let i=0;i<+b.dataset.sb;i++)X.kids.push(Math.random()<.5);if(X.kids.length>3000)X.kids=X.kids.slice(-3000);up()});
$('sxReset').onclick=()=>{X.kids=[];up()};up()}
