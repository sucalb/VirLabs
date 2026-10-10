
/* ================= SINH: CƠ THỂ NGƯỜI 3D =================
   Mô hình giải phẫu BodyParts3D (CC BY-SA 2.1 Japan), đã giảm đa giác, đóng gói trong models/.
   Nền tối, bật tắt từng lớp, phân rã, mặt cắt, nhãn trên mô hình, tìm kiếm. Three.js chỉ nạp khi mở bài. */
{const SYSN={toan:'Toàn thân',tim:'Tim và mạch máu',nao:'Não và giác quan',hohap:'Hệ hô hấp',tieuhoa:'Hệ tiêu hoá',xuong:'Bộ xương',da:'Da',co:'Hệ cơ',baitiet:'Hệ bài tiết',noitiet:'Nội tiết và miễn dịch'};
const SYSC={da:'#f1c8a6',xuong:'#e9dfc7',co:'#c0392b',tim:'#e03131',nao:'#f783ac',hohap:'#74c0fc',tieuhoa:'#ffa94d',baitiet:'#b5651d',noitiet:'#f2c14e'},ORDER=['da','xuong','co','tim','nao','hohap','tieuhoa','baitiet','noitiet'],FOC=['co','tim','nao','hohap','tieuhoa','baitiet','noitiet'];
const SYSD={co:'Hơn 600 cơ vân bám vào xương giúp cơ thể vận động. Cơ chỉ có thể co rút nên thường hoạt động theo cặp đối kháng, như cơ nhị đầu và cơ tam đầu ở cánh tay.',baitiet:'Thận lọc máu tạo nước tiểu, nước tiểu theo niệu quản xuống bàng quang rồi thải ra ngoài qua niệu đạo. Nhờ đó cơ thể loại bỏ chất thải và giữ ổn định môi trường bên trong.',noitiet:'Các tuyến nội tiết tiết hormone vào máu để điều hoà hoạt động cơ thể. Lách và tuyến ức thuộc hệ miễn dịch, giúp cơ thể chống lại mầm bệnh.',tim:'Tim là khối cơ rỗng có 4 ngăn, co bóp liên tục để đẩy máu đi qua hai vòng tuần hoàn. Các mạch lớn nối với tim gồm động mạch chủ, tĩnh mạch chủ, động mạch và tĩnh mạch phổi.',nao:'Não gồm đại não (hai bán cầu với các thuỳ), tiểu não và thân não. Đây là trung ương thần kinh điều khiển mọi hoạt động của cơ thể.',hohap:'Không khí đi qua khí quản, phế quản vào phổi. Tại các phế nang, O₂ đi vào máu và CO₂ đi ra ngoài. Cơ hoành giúp lồng ngực phồng lên, xẹp xuống khi thở.',tieuhoa:'Ống tiêu hoá đi từ thực quản, dạ dày, ruột non đến ruột già; gan, túi mật và tuỵ tiết dịch giúp tiêu hoá thức ăn.'};
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
 co_tran:["Cơ trán", "#c0504d", "Nâng lông mày và tạo nếp nhăn ở trán, giúp biểu lộ cảm xúc như ngạc nhiên."],
 co_thai_duong:["Cơ thái dương", "#b8433f", "Cơ hình quạt ở hai bên đầu, kéo xương hàm dưới lên khi nhai."],
 co_can:["Cơ cắn", "#a83a36", "Một trong những cơ khoẻ nhất cơ thể, nâng hàm dưới để cắn và nhai thức ăn."],
 co_vong:["Cơ vòng mắt, cơ vòng miệng", "#cd6155", "Các cơ hình vòng giúp nhắm mắt, mím môi, huýt sáo và tạo nét mặt."],
 co_go_ma:["Cơ gò má", "#d46a5c", "Kéo khoé miệng lên trên và ra ngoài khi cười."],
 co_uc_don_chum:["Cơ ức đòn chũm", "#b5473f", "Nằm hai bên cổ, giúp quay đầu và cúi đầu."],
 co_thang:["Cơ thang", "#a93b3b", "Cơ lớn ở gáy và lưng trên, giúp nâng vai, kéo vai về sau và giữ thẳng đầu."],
 co_delta:["Cơ delta", "#c2453c", "Bao quanh khớp vai, giúp dang tay sang ngang, đưa tay ra trước và ra sau."],
 co_nguc_lon:["Cơ ngực lớn", "#b13e3a", "Cơ lớn ở ngực, kéo cánh tay vào sát thân và về phía trước, như khi chống đẩy."],
 co_rang_truoc:["Cơ răng trước", "#c75a4e", "Bám vào các xương sườn, kéo xương bả vai ra trước, giúp đấm và đẩy."],
 co_lung_rong:["Cơ lưng rộng", "#a5403a", "Cơ rộng nhất của lưng, kéo cánh tay xuống và về sau như khi bơi, leo dây."],
 co_nhi_dau:["Cơ nhị đầu cánh tay", "#c84c3f", "Co lại làm gập cẳng tay vào cánh tay; khi gập tay, bắp cơ phình to ra."],
 co_tam_dau:["Cơ tam đầu cánh tay", "#b0453d", "Nằm ở mặt sau cánh tay, đối kháng với cơ nhị đầu, giúp duỗi thẳng cẳng tay."],
 co_cang_tay:["Các cơ cẳng tay", "#cf6a5a", "Điều khiển cử động gập, duỗi cổ tay và các ngón tay."],
 co_thang_bung:["Cơ thẳng bụng", "#c4513f", "Chạy dọc thành bụng, giúp gập thân và bảo vệ các cơ quan trong ổ bụng."],
 co_cheo_bung:["Cơ chéo bụng ngoài", "#b84a42", "Giúp xoay và nghiêng thân, tham gia ép bụng khi ho, rặn và thở ra mạnh."],
 co_mong:["Cơ mông", "#a63c38", "Cơ mông lớn là cơ to nhất cơ thể, giúp duỗi đùi khi đứng dậy, leo cầu thang, chạy."],
 co_may:["Cơ may", "#d06857", "Cơ dài nhất cơ thể, chạy chéo qua đùi, giúp gập và xoay đùi như khi ngồi xếp bằng."],
 co_tu_dau:["Cơ tứ đầu đùi", "#bd4a3f", "Bốn cơ ở mặt trước đùi, duỗi thẳng cẳng chân khi đứng, đi, đá bóng."],
 co_khep:["Cơ khép đùi", "#c95f50", "Ở mặt trong đùi, kéo hai đùi khép lại gần nhau."],
 co_nhi_dau_dui:["Nhóm cơ sau đùi", "#ad4239", "Ở mặt sau đùi, giúp gập cẳng chân và duỗi đùi."],
 co_bung_chan:["Cơ bụng chân", "#c0483d", "Tạo nên bắp chân, giúp nhón gót và đẩy cơ thể về phía trước khi đi, chạy, nhảy."],
 co_dep:["Cơ dép", "#a9423a", "Nằm dưới cơ bụng chân, giúp đứng vững và nhón chân."],
 co_chay_truoc:["Cơ chày trước", "#cc6152", "Ở mặt trước cẳng chân, nâng bàn chân lên khi bước đi."],
 than:["Thận", "#8e3b46", "Hai quả thận lọc máu, tạo nước tiểu để thải chất độc, đồng thời giữ cân bằng nước và muối khoáng."],
 nieu_quan:["Niệu quản", "#e9b38f", "Hai ống dẫn nước tiểu từ thận xuống bàng quang."],
 bang_quang:["Bàng quang", "#e8a87c", "Túi cơ chứa nước tiểu trước khi thải ra ngoài."],
 nieu_dao:["Niệu đạo", "#f0c8a0", "Ống dẫn nước tiểu từ bàng quang ra ngoài cơ thể."],
 thuong_than:["Tuyến thượng thận", "#f2c14e", "Nằm trên đỉnh hai quả thận, tiết hormone adrenaline (khi căng thẳng, sợ hãi) và cortisol."],
 tuyen_uc:["Tuyến ức", "#f4a7b9", "Nằm sau xương ức, nơi tế bào lympho T trưởng thành; phát triển mạnh ở trẻ em và nhỏ dần khi lớn."],
 lach:["Lách", "#7b2d4a", "Lọc máu, loại bỏ hồng cầu già và tham gia bảo vệ cơ thể chống nhiễm khuẩn."],
 nhan_cau:["Nhãn cầu (mắt)", "#e9ecef", "Cơ quan thị giác: ánh sáng đi qua giác mạc, thể thuỷ tinh rồi tạo ảnh trên màng lưới."],
 tk_thi_giac:["Dây thần kinh thị giác", "#f2e394", "Dẫn tín hiệu hình ảnh từ màng lưới của mắt về vùng thị giác ở thuỳ chẩm."],
 dm_co_tay:["Động mạch cảnh và dưới đòn", "#e03131", "Động mạch cảnh đưa máu lên đầu và não; động mạch dưới đòn đưa máu ra hai tay."],
 dm_noi_tang:["Động mạch nội tạng", "#f03e3e", "Các nhánh từ động mạch chủ bụng đưa máu đến dạ dày, gan, lách, ruột và thận."],
 dm_chau:["Động mạch chậu", "#c92a2a", "Động mạch chủ chia thành hai động mạch chậu, đưa máu xuống vùng chậu và hai chân."],
 tm_co_tay:["Tĩnh mạch cảnh và dưới đòn", "#4263eb", "Đưa máu từ đầu, cổ và hai tay về tĩnh mạch chủ trên."],
 tm_noi_tang:["Tĩnh mạch nội tạng", "#5c7cfa", "Đưa máu từ thận, lách và ruột về tim; máu từ ruột đi qua gan trước khi về tim."],
 tm_chau:["Tĩnh mạch chậu", "#3b5bdb", "Đưa máu từ hai chân và vùng chậu về tĩnh mạch chủ dưới."],
 tm_tim:["Tĩnh mạch tim", "#748ffc", "Thu máu đã nuôi cơ tim về xoang tĩnh mạch vành rồi đổ vào tâm nhĩ phải."],
 da:['Da','#f1c8a6','Lớp bao bọc ngoài cùng, bảo vệ cơ thể, điều hoà thân nhiệt và tiếp nhận kích thích từ môi trường.']};
const TOANLAB={than:'Thận',thuy_tran:'Não',co_tim:'Tim',phoi_phai:'Phổi',gan:'Gan',da_day:'Dạ dày',ruot_non:'Ruột non',ruot_gia:'Ruột già'};
const B={state:'idle',view:'toan',sel:null,meshes:[],mats:{},L:{da:true,xuong:true,co:false,tim:true,nao:true,hohap:true,tieuhoa:true,baitiet:true,noitiet:true},hover:null,iso:null,hid:new Set(),tm:0,fly:null,down:null,lab:{},exp:0,cut:0};
const norm=t=>t.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'d').toLowerCase();
const loadScript=src=>new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`)){const t=setInterval(()=>{if(window.THREE&&(!src.includes('Orbit')||THREE.OrbitControls)){clearInterval(t);res()}},50);return}const s=document.createElement('script');s.src=src;s.onload=()=>res();s.onerror=()=>rej(new Error(src));document.head.appendChild(s)});
async function init(){if(B.state!=='idle')return;B.state='loading';
  try{await loadScript('https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js');await loadScript('https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/controls/OrbitControls.js');try{await loadScript('https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/environments/RoomEnvironment.js')}catch(e){}}
  catch(e){B.state='idle';$('b3load').textContent='Không tải được thư viện 3D. Hãy kiểm tra kết nối mạng rồi mở lại bài này.';return}
  let meta,buf;try{[meta,buf]=await Promise.all([fetch('models/body.json').then(r=>{if(!r.ok)throw 0;return r.json()}),
    fetch('models/body.bin').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).catch(()=>fetch('models/body.b64.txt').then(r=>{if(!r.ok)throw 0;return r.text()}).then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}))])}
  catch(e){B.state='idle';$('b3load').textContent='Không tải được dữ liệu mô hình.';return}
  build(meta,buf);B.state='ready';$('b3load').hidden=true;layersUI();focus('toan',true)}
function build(meta,buf){const T=THREE,cv=$('cBody');
  B.renderer=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});B.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));B.renderer.localClippingEnabled=true;
  B.renderer.outputEncoding=T.sRGBEncoding;B.renderer.toneMapping=T.ACESFilmicToneMapping;B.renderer.toneMappingExposure=1.05;
  B.scene=new T.Scene();if(T.RoomEnvironment){const pm=new T.PMREMGenerator(B.renderer);B.scene.environment=pm.fromScene(new T.RoomEnvironment(),.04).texture}B.camera=new T.PerspectiveCamera(32,1,1,30000);
  B.scene.add(new T.HemisphereLight(0xdfe8ff,0x3a3f55,B.scene.environment?.3:1.05));const E=B.scene.environment?.7:1,d1=new T.DirectionalLight(0xffffff,1.1*E);d1.position.set(700,1000,1500);B.scene.add(d1);
  const d2=new T.DirectionalLight(0x9fc1ff,.55*E);d2.position.set(-900,400,-1300);B.scene.add(d2);const d3=new T.DirectionalLight(0xffffff,.35*E);d3.position.set(0,-900,400);B.scene.add(d3);
  B.controls=new T.OrbitControls(B.camera,cv);B.controls.enableDamping=true;B.controls.dampingFactor=.12;B.controls.minDistance=40;B.controls.maxDistance=7000;
  B.plane=new T.Plane(new T.Vector3(0,0,-1),0);
  const[x0,y0,z0,x1,y1,z1]=meta.bbox,cx=(x0+x1)/2,cy=(y0+y1)/2,cz=(z0+z1)/2,pos=new Int16Array(buf,0,meta.posBytes/2),ind=new Uint16Array(buf,meta.posBytes);
  const root=new T.Group();root.rotation.x=-Math.PI/2;/* trục z (chiều cao) → trục y; mặt trước cơ thể (−y) hướng về phía camera (+z) */B.scene.add(root);B.root=root;
  const G2S={};meta.parts.forEach(p=>G2S[p.grp]=p.sys);
  Object.keys(GRP).forEach(g=>{const sy=G2S[g],isSkin=g==='da',bone=sy==='xuong',musc=sy==='co';
    B.mats[g]=new T.MeshPhysicalMaterial({color:GRP[g][1],roughness:isSkin?.3:bone?.62:musc?.5:.36,metalness:0,clearcoat:isSkin||bone?0:musc?.1:.25,clearcoatRoughness:.35,envMapIntensity:B.scene.environment?.45:0,transparent:isSkin,opacity:1,depthWrite:!isSkin,side:T.DoubleSide,clippingPlanes:[]});B.mats[g].color.convertSRGBToLinear();B.mats[g].userData={op:1,target:1}});
  for(const p of meta.parts){const[vo,vc]=p.v,[io,ic]=p.i,f=new Float32Array(vc*3);
    for(let i=0;i<vc*3;i++){const k=i%3,q=pos[vo*3+i],mn=meta.bbox[k],mx=meta.bbox[k+3];f[i]=(q+32767)/65534*(mx-mn)+mn-(k===0?cx:k===1?cy:cz)}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(f,3));g.setIndex(new T.BufferAttribute(ind.slice(io,io+ic),1));g.computeVertexNormals();g.computeBoundingSphere();
    const m=new T.Mesh(g,B.mats[p.grp]);m.userData={grp:p.grp,sys:p.sys,en:p.en,c:g.boundingSphere.center.clone(),r:g.boundingSphere.radius};if(p.grp==='da')m.renderOrder=2;root.add(m);B.meshes.push(m)}
  B.sysC={};ORDER.forEach(s=>{const ms=B.meshes.filter(m=>m.userData.sys===s),c=new T.Vector3();ms.forEach(m=>c.add(m.userData.c));if(ms.length)c.divideScalar(ms.length);B.sysC[s]=c});{const bx=new T.Box3();B.meshes.forEach(m=>{m.geometry.computeBoundingBox();bx.union(m.geometry.boundingBox)});B.mid=(bx.min.x+bx.max.x)/2}
  root.updateMatrixWorld(true);B.ray=new T.Raycaster();
  B.tip=document.createElement('div');B.tip.className='b3tip';B.tip.hidden=true;$('b3Wrap').appendChild(B.tip);
  cv.addEventListener('pointerdown',e=>{B.down=[e.clientX,e.clientY]});
  cv.addEventListener('pointerup',e=>{if(!B.down||Math.hypot(e.clientX-B.down[0],e.clientY-B.down[1])>6){B.down=null;return}B.down=null;const m=pick(e);if(m)choose(m.userData.grp,true)});
  cv.addEventListener('pointermove',e=>{if(e.buttons)return;const m=pick(e),r=cv.getBoundingClientRect();B.hover=m?m.userData.grp:null;if(m){B.tip.textContent=GRP[m.userData.grp][0];B.tip.style.left=(e.clientX-r.left)+'px';B.tip.style.top=(e.clientY-r.top)+'px';B.tip.hidden=false;cv.style.cursor='pointer'}else{B.tip.hidden=true;cv.style.cursor='grab'}});
  cv.addEventListener('pointerleave',()=>{B.tip.hidden=true;B.hover=null})}
function pick(e){if(B.state!=='ready')return null;const cv=$('cBody'),r=cv.getBoundingClientRect(),v=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);B.ray.setFromCamera(v,B.camera);
  const cand=B.meshes.filter(m=>m.visible&&m.material.userData.op>.3);const hits=B.ray.intersectObjects(cand,false).filter(h=>!B.cut||h.point.z<=B.plane.constant+1);
  const h=hits.find(h=>h.object.userData.grp!=='da')||hits[0];return h?h.object:null}
const ctr=m=>m.userData.c.clone().add(m.position);
function boxOf(filter){const box=new THREE.Box3(),v=new THREE.Vector3();B.meshes.forEach(m=>{if(!filter(m))return;const s=m.userData.r;v.copy(ctr(m)).applyMatrix4(B.root.matrixWorld);box.expandByPoint(v.clone().addScalar(s*.7));box.expandByPoint(v.clone().addScalar(-s*.7))});return box}
function flyBox(box,dir,instant,pad=1){const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3()),R=Math.max(s.x,s.y,s.z)*.55,dist=Math.max(120,R/Math.sin(B.camera.fov*Math.PI/360))*pad,
  d=(dir||B.camera.position.clone().sub(B.controls.target)).clone();if(d.lengthSq()<1)d.set(0,0,1);d.normalize();const tp=c.clone().add(d.multiplyScalar(dist));
  if(instant){B.camera.position.copy(tp);B.controls.target.copy(c);B.controls.update();return}B.fly={t:0,fp:B.camera.position.clone(),ft:B.controls.target.clone(),tp,tt:c}}
function flyDir(dir){const o=B.controls.target.clone(),dist=B.camera.position.distanceTo(o),d=new THREE.Vector3(...dir).normalize();B.fly={t:0,fp:B.camera.position.clone(),ft:o.clone(),tp:o.clone().add(d.multiplyScalar(dist)),tt:o}}
function zoom(k){const o=B.controls.target.clone(),d=B.camera.position.clone().sub(o).multiplyScalar(k);B.fly={t:0,fp:B.camera.position.clone(),ft:o.clone(),tp:o.clone().add(d),tt:o}}
function targets(){const skin=+$('b3Skin').value;Object.entries(B.mats).forEach(([g,m])=>{const sys=g==='da'?'da':B.meshes.find(x=>x.userData.grp===g)?.userData.sys;
  m.userData.target=!B.L[sys]||B.hid.has(g)?0:B.iso&&g!==B.iso?(sys==='da'?0:.07):sys==='xuong'&&(B.view==='baitiet'||B.view==='noitiet')?.1:sys==='da'?skin:(B.view==='hohap'&&(g==='phoi_phai'||g==='phoi_trai')&&!B.iso?.42:1)});$('b3ShowAll').hidden=!B.hid.size&&!B.iso}
function layersUI(){$('b3Sys').innerHTML=ORDER.map(s=>{const n=new Set(B.meshes.filter(m=>m.userData.sys===s).map(m=>m.userData.en)).size;return`<label class="b3row"><input type="checkbox" data-ly="${s}" ${B.L[s]?'checked':''}><i style="background:${SYSC[s]}"></i>${SYSN[s]}<small>${n||''}</small></label>`}).join('')}
function focus(v,instant){B.view=v;presetSync('#p-body3d [data-b3]','b3',v);
  B.iso=null;if(v==='toan')ORDER.forEach(s=>B.L[s]=s!=='co');else ORDER.forEach(s=>B.L[s]=s===v||(s==='xuong'&&(v==='baitiet'||v==='noitiet')));
  if(B.state==='ready'){layersUI();targets();flyBox(boxOf(m=>v==='toan'?m.userData.sys!=='da':m.userData.sys===v),new THREE.Vector3(.14,.06,1),instant,v==='toan'?1:1.25)}
  const groups=[...new Set(B.meshes.filter(m=>v==='toan'?false:m.userData.sys===v).map(m=>m.userData.grp))];
  $('b3Parts').innerHTML=v==='toan'?FOC.map(s=>`<button class="btn ghost sm" data-b3s="${s}">${SYSN[s]}</button>`).join(''):groups.map(g=>`<button class="btn ghost sm" data-b3g="${g}" aria-pressed="${g===B.sel}">${GRP[g][0]}</button>`).join('');
  if(!B.sel){$('b3Name').textContent=SYSN[v];$('b3Desc').textContent=v==='toan'?'Bấm vào một cơ quan trên mô hình, máy sẽ phóng to vào hệ cơ quan đó.':SYSD[v];$('b3Info').innerHTML=''}}
function choose(grp,fromClick){const m0=B.meshes.find(x=>x.userData.grp===grp);if(!m0)return;const sys=m0.userData.sys;
  if(FOC.includes(sys)&&B.view!==sys&&B.view==='toan'){B.sel=grp;focus(sys)}else if(!fromClick){B.sel=grp;if(!B.L[sys]){B.L[sys]=true;layersUI();targets()}flyBox(boxOf(m=>m.userData.grp===grp),null,false,2.2)}else B.sel=grp;
  Object.entries(B.mats).forEach(([g,m])=>{if(g===grp)m.emissive.set(GRP[g][1]).multiplyScalar(.42);else m.emissive.setHex(0)});
  const[n,,d]=GRP[grp],parts=B.meshes.filter(m=>m.userData.grp===grp);$('b3Name').textContent=n;$('b3Desc').textContent=d;
  $('b3Info').innerHTML=kv([['Thuộc',SYSN[sys]||''],['Tên tiếng Anh',[...new Set(parts.map(m=>m.userData.en.replace(/, nsn$/,'')))].slice(0,3).join('; ')+(new Set(parts.map(m=>m.userData.en)).size>3?'…':'')]]);
  document.querySelectorAll('#b3Parts [data-b3g]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.b3g===grp));
  $('b3CName').textContent=n;$('b3CDesc').textContent=d;$('b3CSys').textContent=SYSN[sys]||'';$('b3Iso').setAttribute('aria-pressed',B.iso===grp);$('b3Card').hidden=false}
function clearSel(){B.sel=null;$('b3Card').hidden=true;Object.values(B.mats).forEach(m=>m.emissive.setHex(0))}
function labels(){const box=$('b3Labels');if(!$('b3Lab').checked||B.state!=='ready'){box.innerHTML='';B.lab={};return}
  const want=B.view==='toan'?Object.keys(TOANLAB).filter(g=>{const m=B.meshes.find(x=>x.userData.grp===g);return m&&B.L[m.userData.sys]}):[...new Set(B.meshes.filter(m=>m.userData.sys===B.view&&m.visible&&m.material.userData.target>.5).map(m=>m.userData.grp))].filter(g=>g!=='chat_trang'&&g!=='doi_thi'||g===B.sel);
  Object.keys(B.lab).forEach(g=>{if(!want.includes(g)){B.lab[g].remove();delete B.lab[g]}});
  const w=box.clientWidth,h=box.clientHeight,v=new THREE.Vector3();
  want.forEach(g=>{let el=B.lab[g];if(!el){el=document.createElement('div');el.className='b3lab';el.style.borderColor=GRP[g][1];el.textContent=B.view==='toan'?TOANLAB[g]:GRP[g][0];box.appendChild(el);B.lab[g]=el}
    let ms=B.meshes.filter(m=>m.userData.grp===g);const side=ms.filter(m=>ctr(m).x-B.mid>8);if(side.length&&side.length<ms.length&&ms.some(m=>ctr(m).x-B.mid<-8))ms=side;v.set(0,0,0);let wsum=0;ms.forEach(m=>{const r=m.userData.r;v.add(ctr(m).multiplyScalar(r));wsum+=r});v.divideScalar(wsum||1).applyMatrix4(B.root.matrixWorld);
    if(B.cut&&v.z>B.plane.constant+5){el.hidden=true;return}v.project(B.camera);if(v.z>1||Math.abs(v.x)>1.05||Math.abs(v.y)>1.05){el.hidden=true;return}el.hidden=false;el._x=(v.x+1)/2*w;el._y=(1-v.y)/2*h;el.classList.toggle('on',g===B.sel)});
  /* đẩy các nhãn chồng nhau ra xa theo chiều dọc */
  const shown=want.map(g=>B.lab[g]).filter(el=>el&&!el.hidden).sort((a,b)=>a._y-b._y),placed=[];
  shown.forEach(el=>{const W=el.offsetWidth||80,H=(el.offsetHeight||18)+3;let y=el._y;for(let k=0;k<8;k++){const hit=placed.find(p=>Math.abs(p.x-el._x)<(p.w+W)/2&&Math.abs(p.y-y)<H);if(!hit)break;y=hit.y+H}placed.push({x:el._x,y,w:W});el.style.left=el._x+'px';el.style.top=y+'px'})}
document.addEventListener('change',e=>{const s=e.target.dataset&&e.target.dataset.ly;if(!s)return;B.L[s]=e.target.checked;targets()});
$('b3Parts').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.b3s){clearSel();focus(b.dataset.b3s);return}choose(b.dataset.b3g,false)});
document.querySelectorAll('#p-body3d [data-b3]').forEach(b=>b.onclick=()=>{clearSel();focus(b.dataset.b3)});
document.querySelectorAll('#p-body3d [data-v]').forEach(b=>b.onclick=()=>{if(B.state!=='ready')return;flyDir({front:[0,0,1],back:[0,0,-1],left:[1,0,0],right:[-1,0,0],top:[0,1,.02],bottom:[0,-1,.02]}[b.dataset.v])});
$('b3In').onclick=()=>B.state==='ready'&&zoom(.75);$('b3Out').onclick=()=>B.state==='ready'&&zoom(1.33);
$('b3Home').onclick=()=>{clearSel();$('b3Exp').value=0;$('b3Cut').checked=false;$('b3CutRow').hidden=true;applyCut();focus('toan')};
$('b3Full').onclick=()=>{const w=$('b3Wrap');try{document.fullscreenElement?document.exitFullscreen():w.requestFullscreen&&w.requestFullscreen().catch(()=>{})}catch(e){}};
$('b3Skin').addEventListener('input',()=>{if(!B.L.da&&+$('b3Skin').value>0){B.L.da=true;layersUI()}targets()});
function applyCut(){B.cut=$('b3Cut').checked;$('b3CutRow').hidden=!B.cut;if(B.state!=='ready')return;Object.values(B.mats).forEach(m=>{m.clippingPlanes=B.cut?[B.plane]:[];m.needsUpdate=true})}
$('b3Cut').addEventListener('change',applyCut);
$('b3Q').addEventListener('input',()=>{const q=norm($('b3Q').value.trim());if(!q||B.state!=='ready'){$('b3Res').innerHTML='';return}
  const res=Object.keys(GRP).filter(g=>norm(GRP[g][0]).includes(q)||B.meshes.some(m=>m.userData.grp===g&&norm(m.userData.en).includes(q))).slice(0,8);
  $('b3Res').innerHTML=res.length?res.map(g=>{const s=B.meshes.find(m=>m.userData.grp===g)?.userData.sys;return`<button data-q="${g}">${GRP[g][0]}<small>${SYSN[s]||''}</small></button>`}).join(''):'<button disabled>Không tìm thấy</button>'});
$('b3Res').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;const g=b.dataset.q,s=B.meshes.find(m=>m.userData.grp===g).userData.sys;$('b3Res').innerHTML='';$('b3Q').value=GRP[g][0];
  if(FOC.includes(s)&&B.view!==s){B.sel=g;focus(s);choose(g,true);setTimeout(()=>flyBox(boxOf(m=>m.userData.grp===g),null,false,2.2),1150)}else choose(g,false)});
$('b3CardX').onclick=clearSel;
$('b3Iso').onclick=()=>{if(!B.sel)return;B.iso=B.iso===B.sel?null:B.sel;$('b3Iso').setAttribute('aria-pressed',B.iso===B.sel);targets();if(B.iso)flyBox(boxOf(m=>m.userData.grp===B.sel),null,false,1.8)};
$('b3Hide').onclick=()=>{if(!B.sel)return;B.hid.add(B.sel);if(B.iso===B.sel)B.iso=null;clearSel();targets()};
$('b3Go').onclick=()=>{if(B.sel)flyBox(boxOf(m=>m.userData.grp===B.sel),null,false,2.2)};
$('b3ShowAll').onclick=()=>{B.hid.clear();B.iso=null;$('b3Iso').setAttribute('aria-pressed','false');targets()};
TICK.body3d=dt=>{if(B.state==='idle'){init();return}if(B.state!=='ready')return;const cv=$('cBody'),w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
  if(window.innerWidth<700&&!B.mobDone){$('b3Layers').open=false;B.mobDone=true}
  if(cv.width!==Math.round(w*B.renderer.getPixelRatio())||cv.height!==Math.round(h*B.renderer.getPixelRatio())){B.renderer.setSize(w,h,false);B.camera.aspect=w/h;B.camera.updateProjectionMatrix()}
  Object.values(B.mats).forEach(m=>{const u=m.userData;u.op+=(u.target-u.op)*Math.min(1,dt*6);m.opacity=u.op;const tr=u.op<.985||m===B.mats.da;if(m.transparent!==tr){m.transparent=tr;m.needsUpdate=true}m.depthWrite=!tr||u.op>.9&&m!==B.mats.da});
  const ex=+$('b3Exp').value;B.exp+=(ex-B.exp)*Math.min(1,dt*6);
  B.meshes.forEach(m=>{m.visible=m.material.userData.op>.015;const sc=B.sysC[m.userData.sys];if(m.userData.sys==='da'){m.position.set(0,0,0);return}m.position.copy(m.userData.c).sub(sc).multiplyScalar(B.exp*(m.userData.sys==='xuong'?.35:1.1))});
  if(B.cut){const bx=boxOf(m=>m.visible&&m.userData.sys!=='da'),c=bx.getCenter(new THREE.Vector3()),sz=bx.getSize(new THREE.Vector3());B.plane.constant=c.z+(+$('b3CutP').value)*sz.z*.5}
  if(B.fly){B.fly.t=Math.min(1,B.fly.t+dt/(reduced?.01:1.1));const k=1-Math.pow(1-B.fly.t,3);B.camera.position.lerpVectors(B.fly.fp,B.fly.tp,k);B.controls.target.lerpVectors(B.fly.ft,B.fly.tt,k);if(B.fly.t>=1)B.fly=null}
  if($('b3Spin').checked&&!B.fly){const o=B.controls.target,p=B.camera.position.clone().sub(o);p.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.35);B.camera.position.copy(o.clone().add(p))}
  B.tm+=dt;Object.entries(B.mats).forEach(([g,m])=>{const k=g===B.sel?.3+.12*Math.sin(B.tm*4):g===B.hover?.16:0;if(k)m.emissive.set(GRP[g][1]).multiplyScalar(k);else m.emissive.setHex(0)});
  B.controls.update();B.renderer.render(B.scene,B.camera);labels()};
if(reduced)$('b3Spin').checked=false;focus('toan')}
