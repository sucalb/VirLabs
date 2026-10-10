
/* ================= SINH: CƠ THỂ NGƯỜI 3D =================
   Mô hình giải phẫu BodyParts3D (CC BY-SA 2.1 Japan), đã giảm đa giác, đóng gói trong models/body.bin + body.json.
   Three.js chỉ được nạp khi mở bài này. */
{const SYSN={toan:'Toàn thân',tim:'Tim và mạch máu',nao:'Não',hohap:'Hệ hô hấp',tieuhoa:'Hệ tiêu hoá',xuong:'Bộ xương',da:'Da'};
const SYSD={tim:'Tim là khối cơ rỗng có 4 ngăn, co bóp liên tục để đẩy máu đi qua hai vòng tuần hoàn. Các mạch lớn nối với tim gồm động mạch chủ, tĩnh mạch chủ, động mạch và tĩnh mạch phổi.',nao:'Não gồm đại não (hai bán cầu với các thuỳ), tiểu não và thân não. Đây là trung ương thần kinh điều khiển mọi hoạt động của cơ thể.',hohap:'Không khí đi qua khí quản, phế quản vào phổi. Tại các phế nang, O₂ đi vào máu và CO₂ đi ra ngoài. Cơ hoành giúp lồng ngực phồng lên, xẹp xuống khi thở.',tieuhoa:'Ống tiêu hoá đi từ thực quản, dạ dày, ruột non đến ruột già; gan, túi mật và tuỵ tiết dịch giúp tiêu hoá thức ăn.'};
const GRP={
 co_tim:['Cơ tim (thành tim)','#c92a2a','Khối cơ dày tạo nên bốn ngăn tim. Cơ tim co bóp nhịp nhàng, đẩy máu đi khắp cơ thể; thành tâm thất trái dày nhất vì phải đẩy máu đi xa nhất.'],
 van_3la:['Van ba lá','#ffe066','Nằm giữa tâm nhĩ phải và tâm thất phải, giúp máu chỉ chảy một chiều từ tâm nhĩ xuống tâm thất.'],
 van_2la:['Van hai lá','#fcc419','Nằm giữa tâm nhĩ trái và tâm thất trái, ngăn máu chảy ngược lên tâm nhĩ khi tâm thất co.'],
 van_dmp:['Van động mạch phổi','#fab005','Nằm ở gốc động mạch phổi, ngăn máu chảy ngược về tâm thất phải.'],
 dm_chu:['Động mạch chủ','#e8590c','Động mạch lớn nhất, đưa máu giàu oxygen từ tâm thất trái đi nuôi toàn cơ thể (vòng tuần hoàn lớn).'],
 tm_chu:['Tĩnh mạch chủ','#4263eb','Gồm tĩnh mạch chủ trên và dưới, đưa máu nghèo oxygen từ khắp cơ thể về tâm nhĩ phải.'],
 dm_phoi:['Động mạch phổi','#748ffc','Đưa máu nghèo oxygen từ tâm thất phải lên phổi để trao đổi khí (vòng tuần hoàn nhỏ).'],
 tm_phoi:['Tĩnh mạch phổi','#ff8787','Đưa máu giàu oxygen từ phổi về tâm nhĩ trái.'],
 dm_vanh:['Động mạch vành','#ff6b6b','Hệ mạch bao quanh tim, cung cấp oxygen và chất dinh dưỡng cho chính cơ tim. Động mạch vành bị tắc gây nhồi máu cơ tim.'],
 thuy_tran:['Thuỳ trán','#f783ac','Điều khiển suy nghĩ, lập kế hoạch, ra quyết định, lời nói và các vận động có ý thức (hồi trước trung tâm).'],
 thuy_dinh:['Thuỳ đỉnh','#da77f2','Tiếp nhận và xử lí cảm giác từ da và cơ thể như nóng, lạnh, đau, xúc giác (hồi sau trung tâm).'],
 thuy_thaiduong:['Thuỳ thái dương','#9775fa','Trung khu thính giác, hiểu ngôn ngữ và tham gia ghi nhớ.'],
 thuy_cham:['Thuỳ chẩm','#748ffc','Trung khu thị giác, xử lí hình ảnh nhận được từ mắt.'],
 thuy_dao:['Thuỳ đảo','#e599f7','Nằm sâu trong rãnh bên, liên quan đến vị giác, cảm xúc và cảm nhận trạng thái bên trong cơ thể.'],
 hoi_dai:['Hồi đai','#faa2c1','Thuộc hệ viền, tham gia điều hoà cảm xúc, hành vi và trí nhớ.'],
 tieu_nao:['Tiểu não','#e64980','Điều hoà, phối hợp các cử động phức tạp và giữ thăng bằng cho cơ thể.'],
 than_nao:['Thân não','#ae3ec9','Gồm não giữa, cầu não và hành não; điều khiển các hoạt động sống cơ bản như hô hấp, nhịp tim, nuốt.'],
 the_chai:['Thể chai','#fcc2d7','Dải chất trắng nối hai bán cầu đại não, giúp hai nửa não trao đổi thông tin.'],
 doi_thi:['Đồi thị và vùng dưới đồi','#cc5de8','Đồi thị là trạm trung chuyển cảm giác lên vỏ não; vùng dưới đồi điều hoà thân nhiệt, cảm giác đói, khát và hoạt động nội tiết.'],
 chat_trang:['Chất trắng đại não','#f3d9fa','Gồm các sợi thần kinh nối các vùng vỏ não với nhau và với các phần khác của hệ thần kinh.'],
 khi_quan:['Khí quản','#a5d8ff','Ống dẫn khí có các vòng sụn hình chữ C, dẫn không khí xuống phế quản. Niêm mạc có lông rung giữ lại bụi.'],
 phe_quan:['Phế quản','#339af0','Khí quản chia thành hai phế quản chính rồi phân nhánh nhiều lần thành cây phế quản, dẫn khí tới các phế nang.'],
 phoi_phai:['Phổi phải','#ffc9c9','Có ba thuỳ. Trong phổi có hàng trăm triệu phế nang, nơi O₂ đi vào máu và CO₂ đi ra ngoài.'],
 phoi_trai:['Phổi trái','#ffa8a8','Có hai thuỳ, nhỏ hơn phổi phải vì nhường chỗ cho tim.'],
 co_hoanh:['Cơ hoành','#e0a47c','Cơ hình vòm ngăn khoang ngực và khoang bụng. Cơ hoành co làm lồng ngực mở rộng, giúp hít vào.'],
 thuc_quan:['Thực quản','#ffc078','Ống cơ dài khoảng 25 cm, đưa thức ăn từ hầu xuống dạ dày nhờ các cơn co bóp nhu động.'],
 da_day:['Dạ dày','#ff922b','Co bóp nhào trộn thức ăn với dịch vị chứa acid HCl và enzyme pepsin, bắt đầu tiêu hoá protein.'],
 gan:['Gan','#a0522d','Cơ quan nội tạng lớn nhất: tiết mật, dự trữ glycogen, khử độc và chuyển hoá nhiều chất.'],
 tui_mat:['Túi mật','#82c91e','Dự trữ và cô đặc dịch mật do gan tiết ra, đổ vào tá tràng giúp tiêu hoá lipid.'],
 tuy:['Tuỵ','#ffd43b','Tiết dịch tuỵ chứa nhiều enzyme tiêu hoá, đồng thời tiết hormone insulin và glucagon điều hoà đường huyết.'],
 ruot_non:['Ruột non','#ffa8a8','Gồm tá tràng, hỗng tràng và hồi tràng, dài 5–7 m. Nơi tiêu hoá và hấp thụ chất dinh dưỡng chủ yếu nhờ các lông ruột.'],
 ruot_gia:['Ruột già','#e599f7','Gồm manh tràng, kết tràng và trực tràng; hấp thụ lại nước và tạo phân.'],
 ruot_thua:['Ruột thừa','#f06595','Đoạn ruột nhỏ hình ngón tay gắn với manh tràng. Viêm ruột thừa cần được phẫu thuật kịp thời.'],
 hop_so:['Hộp sọ và xương mặt','#efe3c8','Bảo vệ não và các giác quan, tạo khung cho khuôn mặt.'],
 cot_song:['Cột sống','#e9dcc0','Gồm 33–34 đốt sống, nâng đỡ cơ thể và bảo vệ tuỷ sống. Có 4 chỗ cong giúp chịu lực và giữ thăng bằng.'],
 long_nguc:['Lồng ngực','#efe2c8','Gồm xương sườn, xương ức và sụn sườn, bảo vệ tim và phổi.'],
 xuong_tay:['Xương chi trên','#efe3c8','Gồm xương đòn, xương bả vai, xương cánh tay, xương cẳng tay và xương bàn tay, giúp tay cử động linh hoạt.'],
 xuong_chan:['Xương chi dưới','#efe2c8','Gồm xương chậu, xương đùi, xương bánh chè, xương cẳng chân và bàn chân; chịu sức nặng cơ thể và giúp di chuyển.'],
 da:['Da','#f1c8a6','Lớp bao bọc ngoài cùng, bảo vệ cơ thể, điều hoà thân nhiệt và tiếp nhận kích thích từ môi trường.']};
const B={state:'idle',view:'toan',sel:null,meshes:[],mats:{},fly:null,down:null,tip:null};
const loadScript=src=>new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`)){const t=setInterval(()=>{if(window.THREE&&(!src.includes('Orbit')||THREE.OrbitControls)){clearInterval(t);res()}},50);return}const s=document.createElement('script');s.src=src;s.onload=()=>res();s.onerror=()=>rej(new Error(src));document.head.appendChild(s)});
async function init(){if(B.state!=='idle')return;B.state='loading';
  try{await loadScript('https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js');await loadScript('https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/controls/OrbitControls.js')}
  catch(e){B.state='idle';$('b3load').textContent='Không tải được thư viện 3D. Hãy kiểm tra kết nối mạng rồi mở lại bài này.';return}
  let meta,buf;try{[meta,buf]=await Promise.all([fetch('models/body.json').then(r=>{if(!r.ok)throw 0;return r.json()}),fetch('models/body.bin').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()})])}
  catch(e){B.state='idle';$('b3load').textContent='Không tải được dữ liệu mô hình (models/body.bin).';return}
  build(meta,buf);B.state='ready';$('b3load').hidden=true;setView('toan',true)}
function build(meta,buf){const T=THREE,cv=$('cBody');
  B.renderer=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});B.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
  B.scene=new T.Scene();B.camera=new T.PerspectiveCamera(32,1,1,30000);
  B.scene.add(new T.HemisphereLight(0xffffff,0x9aa4b4,.95));const d1=new T.DirectionalLight(0xffffff,.75);d1.position.set(600,900,1400);B.scene.add(d1);const d2=new T.DirectionalLight(0xffffff,.35);d2.position.set(-800,300,-1200);B.scene.add(d2);
  B.controls=new T.OrbitControls(B.camera,cv);B.controls.enableDamping=true;B.controls.dampingFactor=.12;B.controls.minDistance=60;B.controls.maxDistance=6000;
  const[x0,y0,z0,x1,y1,z1]=meta.bbox,cx=(x0+x1)/2,cy=(y0+y1)/2,cz=(z0+z1)/2,pos=new Int16Array(buf,0,meta.posBytes/2),ind=new Uint16Array(buf,meta.posBytes);
  const root=new T.Group();root.rotation.x=-Math.PI/2;/* trục z (chiều cao) → trục y; mặt trước cơ thể (−y) hướng về phía camera (+z) */B.scene.add(root);
  Object.keys(GRP).forEach(g=>{const isSkin=g==='da';B.mats[g]=new T.MeshStandardMaterial({color:GRP[g][1],roughness:isSkin?.8:.55,metalness:0,transparent:true,opacity:1,depthWrite:!isSkin,side:isSkin?T.FrontSide:T.DoubleSide});B.mats[g].userData={op:1,target:1}});
  for(const p of meta.parts){const[vo,vc]=p.v,[io,ic]=p.i,f=new Float32Array(vc*3);
    for(let i=0;i<vc*3;i++){const k=i%3,q=pos[vo*3+i],mn=meta.bbox[k],mx=meta.bbox[k+3];f[i]=(q+32767)/65534*(mx-mn)+mn-(k===0?cx:k===1?cy:cz)}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(f,3));g.setIndex(new T.BufferAttribute(ind.slice(io,io+ic),1));g.computeVertexNormals();g.computeBoundingSphere();
    const m=new T.Mesh(g,B.mats[p.grp]);m.userData={grp:p.grp,sys:p.sys,en:p.en};if(p.grp==='da')m.renderOrder=2;root.add(m);B.meshes.push(m)}
  B.root=root;B.root.updateMatrixWorld(true);
  B.ray=new T.Raycaster();B.tip=document.createElement('div');B.tip.className='b3tip';B.tip.hidden=true;cv.parentNode.appendChild(B.tip);
  cv.addEventListener('pointerdown',e=>{B.down=[e.clientX,e.clientY]});
  cv.addEventListener('pointerup',e=>{if(!B.down||Math.hypot(e.clientX-B.down[0],e.clientY-B.down[1])>6)return;const m=pick(e);if(m)choose(m.userData.grp,m.userData.sys,true);B.down=null});
  cv.addEventListener('pointermove',e=>{if(e.buttons)return;const m=pick(e),r=cv.getBoundingClientRect();if(m){B.tip.textContent=GRP[m.userData.grp][0];B.tip.style.left=(e.clientX-r.left)+'px';B.tip.style.top=(e.clientY-r.top)+'px';B.tip.hidden=false;cv.style.cursor='pointer'}else{B.tip.hidden=true;cv.style.cursor='grab'}});
  cv.addEventListener('pointerleave',()=>{if(B.tip)B.tip.hidden=true})}
function pick(e){const cv=$('cBody'),r=cv.getBoundingClientRect(),v=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);B.ray.setFromCamera(v,B.camera);
  const cand=B.meshes.filter(m=>m.visible&&m.material.userData.op>.3&&(m.userData.grp!=='da'||B.view==='toan'&&!B.meshes.some(o=>o.userData.sys!=='da'&&o.visible)));
  const hit=B.ray.intersectObjects(cand,false).find(h=>h.object.userData.grp!=='da')||B.ray.intersectObjects(cand,false)[0];return hit?hit.object:null}
function sysBox(sys,grp){const box=new THREE.Box3();B.meshes.forEach(m=>{if(grp?m.userData.grp===grp:(sys==='toan'||m.userData.sys===sys))box.expandByObject(m)});return box}
function flyTo(box,instant){const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3()),R=Math.max(s.x,s.y,s.z)*.62,dist=R/Math.sin(B.camera.fov*Math.PI/360)*1.05,
  dir=B.camera.position.clone().sub(B.controls.target);if(dir.lengthSq()<1)dir.set(0,0,1);dir.normalize();if(instant||!B.view){dir.set(.18,.08,1).normalize()}
  const to={p:c.clone().add(dir.multiplyScalar(dist)),t:c};if(instant){B.camera.position.copy(to.p);B.controls.target.copy(to.t);B.controls.update();return}
  B.fly={t:0,fp:B.camera.position.clone(),ft:B.controls.target.clone(),tp:to.p,tt:to.t}}
function targets(){const skin=$('b3Skin').checked,bone=$('b3Bone').checked;Object.entries(B.mats).forEach(([g,m])=>{const sys=B.meshes.find(x=>x.userData.grp===g)?.userData.sys;let t;
  if(B.view==='toan')t=sys==='da'?(skin?.1:0):sys==='xuong'?(bone?1:0):1;else t=sys===B.view?({phoi_phai:.4,phoi_trai:.4,co_hoanh:.7}[g]||1):sys==='da'?(skin?.04:0):sys==='xuong'?(bone?.1:0):.05;m.userData.target=t})}
function setView(v,instant){B.view=v;presetSync('#p-body3d [data-b3]','b3',v);targets();if(B.state==='ready')flyTo(sysBox(v),instant);
  const groups=[...new Set(B.meshes.filter(m=>v==='toan'?m.userData.sys!=='da':m.userData.sys===v).map(m=>m.userData.grp))];
  $('b3Parts').innerHTML=(v==='toan'?['tim','nao','hohap','tieuhoa'].map(s=>`<button class="btn ghost sm" data-b3s="${s}">${SYSN[s]}</button>`):groups.map(g=>`<button class="btn ghost sm" data-b3g="${g}" aria-pressed="${g===B.sel}">${GRP[g][0]}</button>`)).join('')||'<span class="note">Đang tải…</span>';
  if(v!=='toan'&&!B.sel){$('b3Name').textContent=SYSN[v];$('b3Desc').textContent=SYSD[v];$('b3Info').innerHTML=''}
  if(v==='toan'&&!B.sel){$('b3Name').textContent='Toàn thân';$('b3Desc').textContent='Bấm vào một cơ quan trên mô hình, máy sẽ phóng to vào hệ cơ quan đó.';$('b3Info').innerHTML=''}}
function choose(grp,sys,fromClick){if(B.view==='toan'&&['tim','nao','hohap','tieuhoa'].includes(sys)){B.sel=grp;setView(sys)}else{B.sel=grp;if(!fromClick&&B.state==='ready')flyTo(sysBox(null,grp))}
  Object.entries(B.mats).forEach(([g,m])=>{m.emissive.setHex(g===grp?0x5c4a00:0x000000)});
  const[n,,d]=GRP[grp],parts=B.meshes.filter(m=>m.userData.grp===grp);$('b3Name').textContent=n;$('b3Desc').textContent=d;
  $('b3Info').innerHTML=kv([['Thuộc',SYSN[sys]||''],['Tên tiếng Anh',[...new Set(parts.map(m=>m.userData.en.replace(/, nsn$/,'')))].slice(0,3).join('; ')+(parts.length>3?'…':'')]]);
  document.querySelectorAll('#b3Parts [data-b3g]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.b3g===grp))}
$('b3Parts').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.b3s){B.sel=null;Object.values(B.mats).forEach(m=>m.emissive.setHex(0));setView(b.dataset.b3s);return}const g=b.dataset.b3g,m=B.meshes.find(x=>x.userData.grp===g);if(m)choose(g,m.userData.sys,false)});
document.querySelectorAll('#p-body3d [data-b3]').forEach(b=>b.onclick=()=>{B.sel=null;Object.values(B.mats).forEach(m=>m.emissive.setHex(0));setView(b.dataset.b3)});
['b3Skin','b3Bone'].forEach(id=>$(id).addEventListener('change',targets));
TICK.body3d=dt=>{if(B.state==='idle'){init();return}if(B.state!=='ready')return;const cv=$('cBody'),w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
  if(cv.width!==Math.round(w*B.renderer.getPixelRatio())||cv.height!==Math.round(h*B.renderer.getPixelRatio())){B.renderer.setSize(w,h,false);B.camera.aspect=w/h;B.camera.updateProjectionMatrix()}
  Object.values(B.mats).forEach(m=>{const u=m.userData;u.op+=(u.target-u.op)*Math.min(1,dt*6);m.opacity=u.op;m.depthWrite=u.op>.9&&m!==B.mats.da});
  B.meshes.forEach(m=>{m.visible=m.material.userData.op>.015});
  if(B.fly){B.fly.t=Math.min(1,B.fly.t+dt/(reduced?.01:1.1));const k=1-Math.pow(1-B.fly.t,3);B.camera.position.lerpVectors(B.fly.fp,B.fly.tp,k);B.controls.target.lerpVectors(B.fly.ft,B.fly.tt,k);if(B.fly.t>=1)B.fly=null}
  if($('b3Spin').checked&&!B.fly){const o=B.controls.target,p=B.camera.position.clone().sub(o);p.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.35);B.camera.position.copy(o.clone().add(p))}
  B.controls.update();B.renderer.render(B.scene,B.camera)};
if(reduced)$('b3Spin').checked=false;setView('toan')}
