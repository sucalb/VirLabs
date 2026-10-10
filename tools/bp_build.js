// Đọc lưới OBJ của BodyParts3D, giảm đa giác bằng gom đỉnh theo lưới, đóng gói thành body.bin + body.json
const fs=require('fs'),path=require('path');
const [dl,boneList,outDir]=process.argv.slice(2);
const objDir=fs.readdirSync(path.join(dl,'obj')).map(d=>path.join(dl,'obj',d)).find(d=>fs.statSync(d).isDirectory());
const names={};fs.readFileSync(path.join(dl,'parts_list_e.txt'),'utf8').split('\n').forEach(l=>{const p=l.split('\t');if(p.length>1)names[p[0]]=p[1].trim()});
const G=(sys,grp,budget,ids)=>ids.map(id=>({id,sys,grp,budget}));
const SEL=[
 ...G('da','da',60000,['FMA7163']),
 ...G('tim','co_tim',30000,['FMA7274']),...G('tim','van_3la',2500,['FMA7234']),...G('tim','van_2la',2500,['FMA7235']),...G('tim','van_dmp',2000,['FMA7246']),
 ...G('tim','dm_chu',3000,['FMA3736','FMA3768','FMA3784']),...G('tim','tm_chu',2000,['FMA4720','FMA10951']),...G('tim','dm_phoi',5000,['FMA66326']),...G('tim','tm_phoi',4000,['FMA66643']),
 ...G('tim','dm_vanh',2000,['FMA3862nsn','FMA3895','FMA4685','FMA3802','FMA3818','FMA3840nsn','FMA76994','FMA71670','FMA71669']),
 ...G('nao','thuy_tran',2200,['FMA72654','FMA72653','FMA72656','FMA72655','FMA72662','FMA72661','BP51']),
 ...G('nao','thuy_dinh',2200,['FMA72666','FMA72665','FMA72668','FMA72667','FMA72670','FMA72669','BP49','BP50']),
 ...G('nao','thuy_thaiduong',1800,['FMA72801','FMA72800','FMA72805','FMA72804','FMA72686','FMA72685','FMA72688','FMA72687','FMA72690','FMA72689','FMA72706','FMA72705']),
 ...G('nao','thuy_cham',3000,['FMA72976','FMA72975']),...G('nao','thuy_dao',1500,['FMA72978','FMA72977','FMA72702','FMA72701']),...G('nao','hoi_dai',1500,['FMA72718','FMA72717']),
 ...G('nao','tieu_nao',14000,['FMA67944']),...G('nao','than_nao',4000,['FMA67943','FMA62004','FMA61993nsn','FMA62394']),...G('nao','the_chai',5000,['FMA86464']),
 ...G('nao','doi_thi',1500,['FMA258716','FMA258714','FMA62008nsn']),...G('nao','chat_trang',8000,['FMA61822']),
 ...G('hohap','khi_quan',3000,['FMA7394']),...G('hohap','phe_quan',10000,['FMA7409']),...G('hohap','phoi_phai',7000,['FMA7333','FMA7383','FMA7337']),...G('hohap','phoi_trai',7000,['FMA7370','FMA7371']),...G('hohap','co_hoanh',6000,['FMA13295']),
 ...G('tieuhoa','thuc_quan',1500,['FMA7131']),...G('tieuhoa','da_day',4000,['FMA7148']),...G('tieuhoa','gan',6000,['FMA7197']),...G('tieuhoa','tui_mat',2000,['FMA7202']),...G('tieuhoa','tuy',3000,['FMA7198nsn']),
 ...G('tieuhoa','ruot_non',6000,['FMA7206','FMA7207','FMA7208']),...G('tieuhoa','ruot_gia',8000,['FMA14543nsn','FMA14544']),...G('tieuhoa','ruot_thua',800,['FMA14542'])];
// chọn theo tên (cả bên trái và bên phải); budget:0 = chia theo tỉ lệ trong cùng hệ
const RX=[
 ['co','co_tran',/frontalis/],['co','co_thai_duong',/(left|right) temporalis$/],['co','co_can',/masseter/],['co','co_vong',/orbicularis (oris|oculi)/],['co','co_go_ma',/zygomaticus/],
 ['co','co_uc_don_chum',/sternocleidomastoid/],['co','co_thang',/trapezius/],['co','co_delta',/deltoid/],['co','co_nguc_lon',/pectoralis major/],['co','co_rang_truoc',/serratus anterior/],
 ['co','co_lung_rong',/latissimus dorsi/],['co','co_nhi_dau',/biceps brachii/],['co','co_tam_dau',/triceps brachii/],['co','co_cang_tay',/brachioradialis|flexor carpi|extensor carpi|(left|right) extensor digitorum$/],
 ['co','co_thang_bung',/rectus abdominis/],['co','co_cheo_bung',/external oblique/],['co','co_mong',/gluteus (maximus|medius)/],['co','co_may',/sartorius/],
 ['co','co_tu_dau',/rectus femoris|vastus (lateralis|medialis|intermedius)/],['co','co_khep',/adductor longus|gracilis/],['co','co_nhi_dau_dui',/biceps femoris|semitendinosus|semimembranosus/],
 ['co','co_bung_chan',/gastrocnemius/],['co','co_dep',/(left|right) soleus$/],['co','co_chay_truoc',/tibialis anterior|extensor digitorum longus/],
 ['baitiet','than',/(left|right) kidney$/,3000],['baitiet','nieu_quan',/(left|right) ureter$/,1200],['baitiet','bang_quang',/urinary bladder$/,1200],['baitiet','nieu_dao',/^urethra$/,600],
 ['noitiet','thuong_than',/adrenal gland/,1200],['noitiet','tuyen_uc',/lobe of thymus/,2000],['noitiet','lach',/^spleen$/,2500],
 ['nao','nhan_cau',/^eyeball$/,2500],['nao','tk_thi_giac',/optic nerve/,1000],
 ['tim','dm_co_tay',/common carotid artery|subclavian artery|brachiocephalic artery/,1000],['tim','dm_noi_tang',/celiac artery|mesenteric artery|hepatic artery|gastric artery|splenic artery|renal artery/,800],
 ['tim','dm_chau',/iliac artery/,800],['tim','tm_co_tay',/jugular vein|subclavian vein|brachiocephalic vein/,800],['tim','tm_noi_tang',/renal vein|splenic vein|mesenteric vein/,800],
 ['tim','tm_chau',/iliac vein/,800],['tim','tm_tim',/cardiac vein|posterior veins of left ventricle/,1500]];
const allIds=fs.readdirSync(objDir).filter(f=>f.endsWith('.obj')).map(f=>f.slice(0,-4)),taken=new Set(SEL.map(s=>s.id));
RX.forEach(([sys,grp,rx,b])=>allIds.forEach(id=>{const n=names[id]||'';if(rx.test(n)&&!taken.has(id)&&!/artery|vein|nerve/.test(n)===!/artery|vein|nerve/.test(n)){taken.add(id);SEL.push({id,sys,grp,budget:b||0})}}));
const boneIds=fs.readFileSync(boneList,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
const boneGrp=n=>/hand|finger|thumb|carp|humer|radius|ulna|scapula|clavicle|metacarp/i.test(n)?'xuong_tay':/foot|toe|tars|calcan|talus|navicular|cuboid|cuneiform|femur|tibia|fibula|patella|hip bone|ilium|ischium|pubis/i.test(n)?'xuong_chan':/vertebra|sacrum|coccyx|atlas|axis/i.test(n)?'cot_song':/rib|stern|costal|manubrium|xiphoid/i.test(n)?'long_nguc':'hop_so';
boneIds.forEach(id=>SEL.push({id,sys:'xuong',grp:boneGrp(names[id]||''),budget:0}));
function readObj(id){const f=path.join(objDir,id+'.obj');if(!fs.existsSync(f))return null;const V=[],T=[];
 for(const l of fs.readFileSync(f,'utf8').split('\n')){if(l.startsWith('v ')){const p=l.split(/\s+/);V.push(+p[1],+p[2],+p[3])}else if(l.startsWith('f ')){const p=l.trim().split(/\s+/).slice(1).map(s=>parseInt(s)-1);for(let k=1;k<p.length-1;k++)T.push(p[0],p[k],p[k+1])}}
 return{V,T}}
function cluster(V,T,c){const map=new Map(),idx=new Int32Array(V.length/3),sum=[];
 for(let i=0;i<V.length/3;i++){const k=Math.floor(V[3*i]/c)+','+Math.floor(V[3*i+1]/c)+','+Math.floor(V[3*i+2]/c);let j=map.get(k);if(j===undefined){j=sum.length/4;map.set(k,j);sum.push(0,0,0,0)}idx[i]=j;sum[4*j]+=V[3*i];sum[4*j+1]+=V[3*i+1];sum[4*j+2]+=V[3*i+2];sum[4*j+3]++}
 const seen=new Set(),nt=[];for(let t=0;t<T.length;t+=3){const a=idx[T[t]],b=idx[T[t+1]],d=idx[T[t+2]];if(a===b||b===d||a===d)continue;const key=[a,b,d].sort((x,y)=>x-y).join(',');if(seen.has(key))continue;seen.add(key);nt.push(a,b,d)}
 const used=new Int32Array(sum.length/4).fill(-1),nv=[],tt=[];for(const i of nt){if(used[i]<0){used[i]=nv.length/3;nv.push(sum[4*i]/sum[4*i+3],sum[4*i+1]/sum[4*i+3],sum[4*i+2]/sum[4*i+3])}tt.push(used[i])}return{V:nv,T:tt}}
function decimate(m,target){if(m.T.length/3<=target&&m.V.length/3<65000)return m;let lo=.05,hi=60,best=null;
 for(let it=0;it<22;it++){const c=(lo+hi)/2,r=cluster(m.V,m.T,c);if(r.T.length/3>target||r.V.length/3>=65000)lo=c;else{best=r;hi=c}}return best||cluster(m.V,m.T,hi)}
// đọc tất cả, tính ngân sách cho xương
const meshes=[];let boneTris=0;
let muscTris=0;for(const s of SEL){const m=readObj(s.id);if(!m){console.log('thiếu',s.id);continue}s.m=m;if(s.sys==='xuong')boneTris+=m.T.length/3;if(s.sys==='co'&&!s.budget)muscTris+=m.T.length/3}
const boneRatio=110000/boneTris,muscRatio=110000/Math.max(1,muscTris);
let min=[1e9,1e9,1e9],max=[-1e9,-1e9,-1e9],total=0;
for(const s of SEL){if(!s.m)continue;const tgt=s.sys==='xuong'?Math.max(40,Math.round(s.m.T.length/3*boneRatio)):s.sys==='co'&&!s.budget?Math.max(200,Math.round(s.m.T.length/3*muscRatio)):s.budget;s.d=decimate(s.m,tgt);total+=s.d.T.length/3;
 for(let i=0;i<s.d.V.length;i+=3)for(let k=0;k<3;k++){min[k]=Math.min(min[k],s.d.V[i+k]);max[k]=Math.max(max[k],s.d.V[i+k])}}
// đóng gói
const parts=[];let vTot=0,iTot=0;for(const s of SEL){if(!s.d)continue;parts.push({id:s.id,en:names[s.id]||'',sys:s.sys,grp:s.grp,v:[vTot,s.d.V.length/3],i:[iTot,s.d.T.length]});vTot+=s.d.V.length/3;iTot+=s.d.T.length}
const pos=new Int16Array(vTot*3),ind=new Uint16Array(iTot+(iTot%2));let pv=0,pi=0;
for(const s of SEL){if(!s.d)continue;for(let i=0;i<s.d.V.length;i++){const k=i%3;pos[pv++]=Math.round((s.d.V[i]-min[k])/(max[k]-min[k])*65534)-32767}for(const t of s.d.T)ind[pi++]=t}
fs.mkdirSync(outDir,{recursive:true});fs.writeFileSync(path.join(outDir,'body.bin'),Buffer.concat([Buffer.from(pos.buffer),Buffer.from(ind.buffer)]));
fs.writeFileSync(path.join(outDir,'body.json'),JSON.stringify({src:'BodyParts3D, © The Database Center for Life Science, CC BY-SA 2.1 Japan',bbox:[...min,...max],posBytes:pos.byteLength,parts}));
console.log('parts',parts.length,'tris',total,'verts',vTot,'bin KB',Math.round((pos.byteLength+ind.byteLength)/1024));
const by={};parts.forEach(p=>{by[p.sys]=(by[p.sys]||0)+p.i[1]/3});console.log(by);
