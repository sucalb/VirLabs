
/* ================= ĐỊA: chung ================= */
const decl=N=>23.44*Math.sin(2*Math.PI*(N-80)/365);
const dateOf=N=>{const d=new Date(Date.UTC(2025,0,N));return d.getUTCDate()+'/'+(d.getUTCMonth()+1)};
const hhmm=x=>{x=((x%24)+24)%24;let m=Math.round(x*60);if(m===1440)m=0;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
const latTxt=p=>Math.abs(p)<.01?'0° (Xích đạo)':fmt(Math.abs(p),1)+'°'+(p>0?'B':'N');

/* ================= ĐỊA: mùa, độ dài ngày ================= */
{const S={play:false};const R2=Math.PI/180;
function dayLen(phi,del){const x=-Math.tan(phi*R2)*Math.tan(del*R2);if(x<=-1)return 24;if(x>=1)return 0;return 24*Math.acos(x)/Math.PI}
const dur=x=>{const m=Math.round(x*60);return Math.floor(m/60)+' giờ '+String(m%60).padStart(2,'0')+' phút'};
const seasonN=N=>N>=80&&N<173?'Xuân':N>=173&&N<266?'Hạ':N>=266&&N<356?'Thu':'Đông',OPP={Xuân:'Thu',Hạ:'Đông',Thu:'Xuân',Đông:'Hạ'};
const SPECIAL=[[80,'Xuân phân'],[173,'Hạ chí'],[266,'Thu phân'],[356,'Đông chí']];
function up(){const N=+$('seDay').value,phi=+$('seLat').value,del=decl(N),L=dayLen(phi,del),noon=90-Math.abs(phi-del),sp=SPECIAL.find(x=>Math.abs(x[0]-N)<=1);
  document.querySelectorAll('#p-season [data-day]').forEach(b=>b.setAttribute('aria-pressed',Math.abs(+b.dataset.day-N)<1));document.querySelectorAll('#p-season [data-lat]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lat===phi));
  $('oseDay').textContent=dateOf(N);$('oseLat').textContent=latTxt(phi);const ss=seasonN(N);
  $('seInfo').innerHTML=kv([['Ngày',dateOf(N)+(sp?' ('+sp[1]+')':'')],['Mùa ở bán cầu Bắc / Nam',ss+' / '+OPP[ss]],['Mặt Trời lên thiên đỉnh ở',latTxt(del)],['Độ dài ngày tại '+latTxt(phi),dur(L)],['Độ dài đêm',dur(24-L)],['Góc nhập xạ lúc 12 giờ trưa',noon>0?fmt(noon,1)+'°':'Mặt Trời không mọc']]);
  const V=$('seV');V.className='verdict';
  V.textContent=L>=24?'Ngày địa cực: Mặt Trời không lặn suốt 24 giờ.':L<=0?'Đêm địa cực: Mặt Trời không mọc suốt 24 giờ.':Math.abs(phi-del)<.6?'Hôm nay Mặt Trời lên thiên đỉnh tại vĩ độ này lúc giữa trưa.':Math.abs(L-12)<.1?'Ngày dài bằng đêm.':L>12?'Ngày dài hơn đêm.':'Ngày ngắn hơn đêm.';draw()}
const draw=canvasOf($('cSeason'),(c,w,h)=>{const N=+$('seDay').value,del=decl(N),phi=+$('seLat').value,wide=w>=700;
  const ow=wide?w*.5:w,oh=wide?h:h*.46,cx=ow/2,cy=oh/2+8,rx=Math.min(ow*.36,oh*.85),ry=rx*.42;
  const earthCol='#3d84c6',nightCol='#1b2836';
  c.setLineDash([5,5]);c.strokeStyle=css('gridStrong');c.lineWidth=1.4;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,7);c.stroke();c.setLineDash([]);
  const g=c.createRadialGradient(cx,cy,4,cx,cy,34);g.addColorStop(0,'#fff3b0');g.addColorStop(.45,'#ffc533');g.addColorStop(1,'rgba(255,170,30,0)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,34,0,7);c.fill();
  c.fillStyle=css('ink');c.font=font(600,12);c.textAlign='center';c.textBaseline='top';c.fillText('Mặt Trời',cx,cy+22);
  SPECIAL.forEach(([n,t])=>{const th=2*Math.PI*(n-173)/365,x=cx+rx*Math.cos(th),y=cy-ry*Math.sin(th);c.fillStyle=css('muted');c.beginPath();c.arc(x,y,3,0,7);c.fill();
    c.font=font(600,11);c.textAlign=Math.cos(th)>.5?'left':Math.cos(th)<-.5?'right':'center';c.textBaseline=Math.sin(th)>.5?'bottom':Math.sin(th)<-.5?'top':'middle';
    c.fillText(dateOf(n)+' '+t,x+Math.cos(th)*14,y-Math.sin(th)*12)});
  const th=2*Math.PI*(N-173)/365,ex=cx+rx*Math.cos(th),ey=cy-ry*Math.sin(th),er=13,toSun=Math.atan2(cy-ey,cx-ex);
  c.fillStyle=nightCol;c.beginPath();c.arc(ex,ey,er,0,7);c.fill();c.fillStyle=earthCol;c.beginPath();c.arc(ex,ey,er,toSun-Math.PI/2,toSun+Math.PI/2);c.fill();
  c.strokeStyle=css('ink');c.lineWidth=1.6;c.beginPath();c.moveTo(ex+8,ey+17);c.lineTo(ex-8,ey-17);c.stroke();c.fillStyle=css('ink');c.font=font(700,10);c.textAlign='right';c.textBaseline='bottom';c.fillText('B',ex-9,ey-16);
  c.fillStyle=css('accent');const ta=th+.25,ax=cx+rx*Math.cos(ta),ay=cy-ry*Math.sin(ta);arrowHead(c,ax,ay,Math.atan2(-ry*Math.cos(ta),-rx*Math.sin(ta)),9);
  c.fillStyle=css('muted');c.font=font(500,11);c.textAlign='left';c.textBaseline='top';c.fillText('Nhìn từ phía trên cực Bắc · trục Trái Đất luôn nghiêng 66°33′ so với mặt phẳng quỹ đạo',10,8);
  // mặt cắt chiếu sáng
  const sx0=wide?ow:0,sy0=wide?0:oh,sw=wide?w-ow:w,sh=wide?h:h-oh,R=Math.min(sw,sh)*.32,ecx=sx0+sw*.56,ecy=sy0+sh/2+6;
  c.strokeStyle=rgba('amber',.8);c.fillStyle=rgba('amber',.8);c.lineWidth=1.6;for(let k=-2;k<=2;k++){const y=ecy+k*R*.42;c.beginPath();c.moveTo(sx0+12,y);c.lineTo(ecx-R-14,y);c.stroke();arrowHead(c,ecx-R-12,y,0,8)}
  c.fillStyle=css('muted');c.font=font(600,11);c.textAlign='left';c.textBaseline='bottom';c.fillText('Tia sáng Mặt Trời',sx0+12,ecy-R*.84-4);
  c.save();c.beginPath();c.arc(ecx,ecy,R,0,7);c.clip();c.fillStyle=nightCol;c.fillRect(ecx-R,ecy-R,2*R,2*R);c.fillStyle=earthCol;c.fillRect(ecx-R,ecy-R,R,2*R);c.restore();
  c.strokeStyle=css('ink');c.lineWidth=1.5;c.beginPath();c.arc(ecx,ecy,R,0,7);c.stroke();
  const d=del*R2,A=[-Math.sin(d),-Math.cos(d)],E=[-Math.cos(d),Math.sin(d)],pt=(lat,side)=>{const l=lat*R2;return[ecx+R*Math.sin(l)*A[0]+side*R*Math.cos(l)*E[0],ecy+R*Math.sin(l)*A[1]+side*R*Math.cos(l)*E[1]]};
  c.strokeStyle=css('ink');c.lineWidth=1.8;c.beginPath();c.moveTo(ecx-(R+18)*A[0],ecy-(R+18)*A[1]);c.lineTo(ecx+(R+18)*A[0],ecy+(R+18)*A[1]);c.stroke();
  c.fillStyle=css('ink');c.font=font(700,12);c.textAlign='center';c.textBaseline='middle';c.fillText('Cực Bắc',ecx+(R+30)*A[0],ecy+(R+30)*A[1]-6);
  [[66.56,'Vòng cực Bắc'],[23.44,'Chí tuyến Bắc'],[0,'Xích đạo'],[-23.44,'Chí tuyến Nam'],[-66.56,'Vòng cực Nam']].forEach(([lat,t])=>{const a=pt(lat,1),b=pt(lat,-1);
    c.setLineDash([3,4]);c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke();c.setLineDash([]);
    c.fillStyle=css('muted');c.font=font(500,10.5);c.textAlign='left';c.textBaseline='middle';c.fillText(t,b[0]+6,b[1])});
  const a=pt(phi,1),b=pt(phi,-1),tx=(ecx-a[0])/(b[0]-a[0]),mid=[a[0]+(b[0]-a[0])*Math.max(0,Math.min(1,tx)),a[1]+(b[1]-a[1])*Math.max(0,Math.min(1,tx))];
  c.lineWidth=4;c.strokeStyle='#ffd43b';c.beginPath();c.moveTo(...a);c.lineTo(...mid);c.stroke();c.strokeStyle='#5c6b7c';c.beginPath();c.moveTo(...mid);c.lineTo(...b);c.stroke();
  c.fillStyle=css('red');c.beginPath();c.arc(ecx-R,ecy,4.5,0,7);c.fill();c.font=font(600,11);c.textAlign='right';c.textBaseline='bottom';c.fillText('thiên đỉnh '+latTxt(del),ecx-R-6,ecy-6);
  c.fillStyle=css('ink');c.font=font(600,12);c.textAlign='center';c.textBaseline='top';c.fillText('Vàng: phần ban ngày · Xám: phần ban đêm trên vĩ tuyến '+latTxt(phi),ecx-10,sy0+sh-22)});
document.querySelectorAll('#p-season [data-day]').forEach(b=>b.onclick=()=>{$('seDay').value=b.dataset.day;up()});
document.querySelectorAll('#p-season [data-lat]').forEach(b=>b.onclick=()=>{$('seLat').value=b.dataset.lat;up()});
$('sePlay').onclick=()=>{S.play=!S.play;$('sePlay').textContent=S.play?'Dừng':'Chạy cả năm'};
TICK.season=dt=>{if(!S.play)return;let n=+$('seDay').value+(reduced?1:40*dt);if(n>365)n=1;$('seDay').value=n;up()};
['seDay','seLat'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= ĐỊA: ngày đêm, múi giờ ================= */
{const LAND=[
 [[-168,66],[-162,70],[-140,70],[-120,72],[-95,72],[-80,73],[-65,62],[-60,55],[-53,47],[-67,45],[-70,41],[-76,35],[-81,31],[-80,25],[-83,29],[-90,29],[-97,26],[-97,21],[-90,21],[-87,16],[-83,10],[-79,8],[-82,8],[-86,12],[-92,14],[-105,20],[-110,23],[-115,30],[-118,34],[-124,40],[-124,48],[-133,56],[-150,60],[-165,60]],
 [[-50,60],[-42,60],[-20,70],[-18,80],[-35,83],[-60,82],[-72,78],[-55,68]],
 [[-80,10],[-72,12],[-62,10],[-50,0],[-35,-6],[-39,-15],[-48,-26],[-58,-34],[-65,-42],[-68,-52],[-74,-52],[-73,-40],[-71,-30],[-70,-18],[-76,-12],[-81,-5],[-80,0],[-78,7]],
 [[-10,36],[-9,43],[-2,44],[-4,48],[2,51],[8,54],[10,58],[5,62],[15,69],[25,71],[40,67],[60,70],[70,73],[80,73],[100,77],[115,74],[140,72],[160,70],[180,68],[180,64],[170,60],[160,58],[155,50],[142,46],[140,40],[130,35],[126,38],[121,31],[122,25],[117,23],[109,21],[106,18],[109,12],[105,9],[103,13],[100,13],[99,8],[103,1],[98,8],[97,17],[92,21],[88,22],[80,15],[77,8],[73,17],[70,22],[66,25],[58,25],[56,27],[50,30],[48,29],[51,25],[56,24],[59,22],[52,16],[44,12],[43,15],[38,22],[35,28],[33,31],[35,36],[28,37],[26,40],[23,38],[20,40],[19,42],[16,41],[18,40],[16,38],[12,44],[13,46],[7,44],[3,43],[0,39],[-2,37],[-6,36]],
 [[-17,21],[-16,28],[-10,30],[-6,36],[10,37],[11,33],[20,31],[30,31],[32,30],[35,25],[38,18],[43,12],[51,12],[48,5],[40,-3],[40,-15],[35,-24],[33,-29],[27,-34],[20,-35],[18,-30],[12,-17],[13,-8],[9,-1],[9,4],[3,6],[-8,4],[-13,8],[-17,14]],
 [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-25],[151,-34],[146,-39],[140,-38],[135,-35],[129,-32],[115,-34],[113,-26]],
 [[-180,-72],[-120,-74],[-60,-64],[0,-70],[60,-67],[120,-66],[180,-72],[180,-90],[-180,-90]],
 [[109,1],[118,7],[119,1],[116,-4],[110,-3]],[[95,5],[106,-6],[104,-6],[96,2]],[[130,31],[135,34],[141,36],[142,43],[145,44],[141,45],[140,41],[136,37],[131,34]],
 [[-5,50],[1,51],[-1,55],[-3,58],[-6,58],[-5,54]],[[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],[[131,-1],[141,-3],[150,-10],[141,-9],[136,-4]],[[172,-34],[178,-38],[174,-41],[167,-46],[172,-41]],[[-24,64],[-13,65],[-15,66],[-22,66]]];
const CITIES=[['Hà Nội',105.85,21.03,7],['Tokyo',139.7,35.7,9],['Sydney',151.2,-33.9,10],['New Delhi',77.2,28.6,5.5],['Moskva',37.6,55.75,3],['Cairo',31.2,30.0,2],['Paris',2.35,48.85,1],['Luân Đôn',-.13,51.5,0],['Rio de Janeiro',-43.2,-22.9,-3],['New York',-74,40.7,-5],['Los Angeles',-118.2,34.05,-8]];
const D={play:false};const off=document.createElement('canvas');const R2=Math.PI/180;
const sunAlt=(lat,lon,utc,del)=>{const H=((utc-12)*15+lon)*R2;return Math.asin(Math.sin(lat*R2)*Math.sin(del*R2)+Math.cos(lat*R2)*Math.cos(del*R2)*Math.cos(H))/R2};
function up(){const u=+$('dnH').value,N=+$('dnDay').value,del=decl(N);$('odnH').textContent=hhmm(u);$('odnDay').textContent=dateOf(N);
  $('dnInfo').innerHTML=kv(CITIES.map(([n,lon,lat,o])=>{const t=u+o,day=t>=24?' (hôm sau)':t<0?' (hôm trước)':'',a=sunAlt(lat,lon,u,del);
    return[`${n} <small style="opacity:.7">múi ${o>=0?Math.floor(o):24+o}</small>`,`${hhmm(t)}${day} · ${a>0?'ngày':'đêm'}`]}));draw()}
const draw=canvasOf($('cDN'),(c,w,h)=>{const u=+$('dnH').value,del=decl(+$('dnDay').value),mw=Math.min(w-24,(h-56)*2),mh=mw/2,ox=(w-mw)/2,oy=34,X=l=>ox+(l+180)/360*mw,Y=l=>oy+(90-l)/180*mh;
  c.fillStyle=rgba('rain',.28);c.fillRect(ox,oy,mw,mh);c.fillStyle=rgba('accent',.55);
  LAND.forEach(poly=>{c.beginPath();poly.forEach(([lo,la],i)=>i?c.lineTo(X(lo),Y(la)):c.moveTo(X(lo),Y(la)));c.closePath();c.fill()});
  const gw=180,gh=90;off.width=gw;off.height=gh;const o=off.getContext('2d'),img=o.createImageData(gw,gh),Dd=img.data;
  for(let j=0;j<gh;j++){const lat=90-(j+.5)*2;for(let i=0;i<gw;i++){const lon=-180+(i+.5)*2,a=sunAlt(lat,lon,u,del),al=a>0?0:a<-6?.62:.62*(-a/6),k=(j*gw+i)*4;Dd[k]=8;Dd[k+1]=14;Dd[k+2]=32;Dd[k+3]=al*255}}
  o.putImageData(img,0,0);c.imageSmoothingEnabled=true;c.drawImage(off,ox,oy,mw,mh);
  c.strokeStyle=rgba('ink',.12);c.lineWidth=1;for(let lo=-180;lo<=180;lo+=15){c.beginPath();c.moveTo(X(lo),oy);c.lineTo(X(lo),oy+mh);c.stroke()}
  c.strokeStyle=rgba('ink',.2);[-66.56,-23.44,0,23.44,66.56].forEach(la=>{c.setLineDash(la?[3,4]:[]);c.beginPath();c.moveTo(ox,Y(la));c.lineTo(ox+mw,Y(la));c.stroke()});c.setLineDash([]);
  c.fillStyle=css('muted');c.font=font(600,10,'f-mono');c.textAlign='center';c.textBaseline='bottom';
  for(let z=-12;z<=12;z++){const lo=z*15;if(lo<-180||lo>180)continue;const lab=z>=0?z:24+z;if(mw/24>16||z%2===0)c.fillText(z===-12?'':lab,X(lo),oy-4)}
  c.textAlign='left';c.fillText('Số thứ tự múi giờ',ox,oy-18);
  c.setLineDash([5,4]);c.strokeStyle=css('red');c.lineWidth=1.5;[X(-180)+1,X(180)-1].forEach(x=>{c.beginPath();c.moveTo(x,oy);c.lineTo(x,oy+mh);c.stroke()});c.strokeStyle=css('ink');c.beginPath();c.moveTo(X(0),oy);c.lineTo(X(0),oy+mh);c.stroke();c.setLineDash([]);
  c.fillStyle=css('red');c.font=font(600,11);c.textAlign='right';c.textBaseline='top';c.fillText('Đường chuyển ngày quốc tế (180°)',ox+mw-4,oy+mh+4);c.fillStyle=css('ink');c.textAlign='left';c.fillText('Kinh tuyến gốc 0°',X(0)+4,oy+mh+4);
  const slon=-(u-12)*15,sl=((slon+540)%360)-180,sx=X(sl),sy=Y(del);const g=c.createRadialGradient(sx,sy,2,sx,sy,18);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,'#ffc533');g.addColorStop(1,'rgba(255,190,40,0)');c.fillStyle=g;c.beginPath();c.arc(sx,sy,18,0,7);c.fill();
  CITIES.forEach(([n,lon,lat,o])=>{const x=X(lon),y=Y(lat),day=sunAlt(lat,lon,u,del)>0;c.fillStyle=n==='Hà Nội'?css('red'):day?css('ink'):'#ffffff';c.beginPath();c.arc(x,y,n==='Hà Nội'?5:3.5,0,7);c.fill();
    c.font=font(n==='Hà Nội'?700:600,11);c.textAlign='left';c.textBaseline='middle';const t=n+' '+hhmm(u+o);c.lineWidth=3;c.strokeStyle=day?rgba('surface',.85):'rgba(8,14,32,.8)';c.strokeText(t,x+6,y);c.fillStyle=day?css('ink'):'#fff';c.fillText(t,x+6,y)});
  c.strokeStyle=css('gridStrong');c.lineWidth=1;c.strokeRect(ox,oy,mw,mh)});
$('dnPlay').onclick=()=>{D.play=!D.play;$('dnPlay').textContent=D.play?'Dừng':'Cho Trái Đất quay'};
TICK.daynight=dt=>{if(!D.play)return;let t=+$('dnH').value+(reduced?.25:2*dt);if(t>=24)t-=24;$('dnH').value=t;up()};
['dnH','dnDay'].forEach(id=>$(id).addEventListener('input',up));up()}

/* ================= ĐỊA: biểu đồ khí hậu ================= */
{const DATA={
  'Hà Nội':{alt:'≈ 10 m',t:[16.4,17.2,19.9,23.6,27.3,28.9,29.2,28.6,27.5,24.9,21.5,18.2],r:[18,26,44,90,188,240,288,318,265,130,43,23]},
  'Huế':{alt:'≈ 10 m',t:[19.7,20.9,23.2,26.0,28.3,29.3,29.4,28.9,27.1,25.1,23.1,20.8],r:[161,62,47,51,82,90,95,104,473,795,580,297]},
  'Đà Nẵng':{alt:'≈ 5 m',t:[21.3,22.3,24.1,26.2,28.3,29.2,29.1,28.9,27.6,26.0,24.2,22.0],r:[96,33,22,27,62,87,85,103,350,613,366,199]},
  'Đà Lạt':{alt:'≈ 1500 m',t:[16.4,17.4,18.3,19.2,19.7,19.5,19.1,19.0,18.9,18.5,17.8,16.7],r:[11,27,72,157,217,193,208,223,280,250,90,32]},
  'TP. Hồ Chí Minh':{alt:'≈ 10 m',t:[25.8,26.7,27.9,28.9,28.3,27.5,27.1,27.1,26.8,26.7,26.4,25.7],r:[14,4,12,42,220,331,313,268,334,268,115,56]}};
const names=Object.keys(DATA);$('clCity').innerHTML=names.map(n=>`<option>${n}</option>`).join('');$('clCmp').innerHTML='<option value="">Không so sánh</option>'+names.map(n=>`<option value="${n}">So sánh với ${n}</option>`).join('');
function rainSeason(r){const m=r.map(v=>v>=100);if(m.every(Boolean))return'quanh năm';if(!m.some(Boolean))return'không có tháng nào ≥ 100 mm';
  let s=m.findIndex((v,i)=>v&&!m[(i+11)%12]);const out=[];let i=s;do{if(m[i]){let j=i;while(m[(j+1)%12]&&(j+1)%12!==s)j=(j+1)%12;out.push(`tháng ${i+1}${j!==i?' – '+(j+1):''}`);i=j}i=(i+1)%12}while(i!==s);return out.join(', ')}
function up(){const n=$('clCity').value,d=DATA[n],mean=d.t.reduce((a,b)=>a+b)/12,mx=Math.max(...d.t),mn=Math.min(...d.t),tot=d.r.reduce((a,b)=>a+b),peak=d.r.indexOf(Math.max(...d.r));
  $('cmInfo').innerHTML=kv([['Độ cao',d.alt],['Nhiệt độ trung bình năm',fmt(mean,1)+' °C'],['Tháng nóng nhất',`tháng ${d.t.indexOf(mx)+1}: ${fmt(mx,1)} °C`],['Tháng lạnh nhất',`tháng ${d.t.indexOf(mn)+1}: ${fmt(mn,1)} °C`],['Biên độ nhiệt năm',fmt(mx-mn,1)+' °C'],['Tổng lượng mưa năm',tot.toLocaleString('vi-VN')+' mm'],['Mùa mưa',rainSeason(d.r)],['Tháng mưa nhiều nhất',`tháng ${peak+1}: ${d.r[peak]} mm`]]);
  const notes=[];if(mean<20)notes.push('Mát mẻ quanh năm do ảnh hưởng của độ cao địa hình.');else if(mx-mn>9)notes.push('Có mùa đông lạnh rõ rệt (biên độ nhiệt năm lớn) do ảnh hưởng của gió mùa Đông Bắc.');else notes.push('Nóng quanh năm, biên độ nhiệt năm nhỏ, mang tính chất cận xích đạo.');
  notes.push(peak>=8&&peak<=11?'Mưa nhiều vào thu đông, đặc trưng của vùng duyên hải miền Trung.':'Mưa tập trung vào mùa hạ (gió mùa Tây Nam).');$('clV').textContent=notes.join(' ');draw()}
const draw=canvasOf($('cClim'),(c,w,h)=>{const n=$('clCity').value,d=DATA[n],cmp=$('clCmp').value&&$('clCmp').value!==n?DATA[$('clCmp').value]:null;
  const ml=52,mr=56,mt=46,mb=40,rMax=Math.ceil(Math.max(...d.r,...(cmp?cmp.r:[0]))/100)*100+100,tMax=40,bw=(w-ml-mr)/12,X=i=>ml+bw*(i+.5),YR=v=>h-mb-v/rMax*(h-mt-mb),YT=v=>h-mb-v/tMax*(h-mt-mb);
  c.strokeStyle=css('grid');c.lineWidth=1;c.font=font(400,11,'f-mono');for(let v=0;v<=tMax;v+=5){c.beginPath();c.moveTo(ml,YT(v));c.lineTo(w-mr,YT(v));c.stroke();c.fillStyle=css('red');c.textAlign='right';c.textBaseline='middle';c.fillText(v,ml-6,YT(v));c.fillStyle=css('rain');c.textAlign='left';c.fillText(Math.round(v/tMax*rMax),w-mr+6,YT(v))}
  c.font=font(600,11);c.fillStyle=css('red');c.textAlign='left';c.textBaseline='bottom';c.fillText('Nhiệt độ (°C)',ml-40,mt-18);c.fillStyle=css('rain');c.textAlign='right';c.fillText('Lượng mưa (mm)',w-mr+46,mt-18);
  c.setLineDash([4,4]);c.strokeStyle=rgba('rain',.6);c.beginPath();c.moveTo(ml,YR(100));c.lineTo(w-mr,YR(100));c.stroke();c.setLineDash([]);c.fillStyle=css('rain');c.font=font(500,10);c.textAlign='left';c.textBaseline='bottom';c.fillText('100 mm',ml+4,YR(100)-2);
  d.r.forEach((v,i)=>{c.fillStyle=v>=100?rgba('rain',.8):rgba('rain',.45);const x=X(i)-bw*(cmp?.36:.3);c.fillRect(x,YR(v),bw*(cmp?.36:.6),YR(0)-YR(v))});
  if(cmp)cmp.r.forEach((v,i)=>{c.strokeStyle=css('rain');c.lineWidth=1.5;c.setLineDash([3,2]);c.strokeRect(X(i),YR(v),bw*.36,YR(0)-YR(v));c.setLineDash([])});
  const line=(t,dash)=>{c.strokeStyle=css('red');c.lineWidth=2.6;c.setLineDash(dash?[6,4]:[]);c.beginPath();t.forEach((v,i)=>i?c.lineTo(X(i),YT(v)):c.moveTo(X(i),YT(v)));c.stroke();c.setLineDash([]);if(!dash){c.fillStyle=css('red');t.forEach((v,i)=>{c.beginPath();c.arc(X(i),YT(v),3.5,0,7);c.fill()})}};
  if(cmp)line(cmp.t,true);line(d.t,false);
  c.fillStyle=css('ink');c.font=font(500,11,'f-mono');c.textAlign='center';c.textBaseline='top';for(let i=0;i<12;i++)c.fillText('T'+(i+1),X(i),h-mb+6);
  c.strokeStyle=css('muted');c.lineWidth=1.2;c.beginPath();c.moveTo(ml,mt-6);c.lineTo(ml,h-mb);c.lineTo(w-mr,h-mb);c.lineTo(w-mr,mt-6);c.stroke();
  c.fillStyle=css('ink');c.font=font(700,18,'f-display');c.textAlign='center';c.textBaseline='top';c.fillText(n+(cmp?' và '+$('clCmp').value+' (nét đứt)':''),w/2,8)});
['clCity','clCmp'].forEach(id=>$(id).addEventListener('change',up));up()}
