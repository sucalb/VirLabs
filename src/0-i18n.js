/* ================= NGÔN NGỮ (VI / EN) =================
   Mã nguồn viết bằng tiếng Việt. Khi chọn English, mọi chữ hiện ra (nút, nhãn, mô tả,
   chữ vẽ trên canvas) được dịch qua từ điển I18N_EN (src/i18n-en.json, ghép vào lúc build).
   Chuỗi có số chen giữa được dịch theo từng cụm từ có trong từ điển. */
const LANG=(()=>{try{const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='vi'){localStorage.setItem('lab-lang',q);return q}return localStorage.getItem('lab-lang')==='en'?'en':'vi'}catch(e){return 'vi'}})();
const VIC=/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const TR={map:null,re:null,tpl:[],cache:new Map()};
if(LANG==='en'){TR.map=I18N_EN;const esc=k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  /* mẫu câu có giá trị chen giữa, ví dụ "Đèn {}%" */
  TR.tpl=Object.keys(I18N_EN).filter(k=>k.includes('{}')).sort((a,b)=>b.length-a.length).map(k=>({re:new RegExp('^'+k.split('{}').map(esc).join('(.+?)')+'$','u'),en:I18N_EN[k]}));
  const keys=Object.keys(I18N_EN).filter(k=>k.length>1&&I18N_EN[k]!==k&&!k.includes('{}')).sort((a,b)=>b.length-a.length);
  TR.re=new RegExp('(?<![\\p{L}\\p{N}])(?:'+keys.map(esc).join('|')+')(?![\\p{L}\\p{N}])','gu')}
function i18n(s){if(!TR.map||typeof s!=='string'||!s)return s;let r=TR.cache.get(s);if(r!==undefined)return r;
  const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),core=m[2].replace(/\s+/g,' ');r=TR.map[core];
  if(r===undefined){r=core;if(VIC.test(core)){let hit=null;for(const t of TR.tpl){const g=core.match(t.re);if(g){let i=1;hit=t.en.replace(/\{\}/g,()=>i18n(g[i++]));break}}r=hit??core.replace(TR.re,k=>TR.map[k])}}
  r=m[1]+r+m[3];if(TR.cache.size>30000)TR.cache.clear();TR.cache.set(s,r);return r}
if(LANG==='en'){
  document.documentElement.lang='en';
  const ATTR=['placeholder','title','aria-label','alt'];
  const need=v=>VIC.test(v)||TR.map[v.trim()]!==undefined;
  const skip=n=>n.closest&&n.closest('[data-notr],script,style');
  const node=n=>{if(n.nodeType===3){const p=n.parentNode;if(!p||skip(p))return;const v=n.nodeValue;if(p.nodeName==='OPTION'&&!p.hasAttribute('value'))p.setAttribute('value',p.textContent);if(need(v)){const t=i18n(v);if(t!==v)n.nodeValue=t}return}
    if(n.nodeType!==1||skip(n))return;attrs(n);n.querySelectorAll('*').forEach(attrs);
    const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode()))node(t)};
  const attrs=e=>ATTR.forEach(a=>{const v=e.getAttribute(a);if(v&&need(v)){const t=i18n(v);if(t!==v)e.setAttribute(a,t)}});
  node(document.body);document.title=i18n(document.title);
  try{window.__trObs&&window.__trObs.disconnect()}catch(e){}
  window.__trObs=new MutationObserver(ms=>ms.forEach(m=>{if(m.type==='childList')m.addedNodes.forEach(node);else if(m.type==='characterData')node(m.target);else if(m.target.nodeType===1&&!skip(m.target))attrs(m.target)}));
  window.__trObs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR});
  /* chữ vẽ trên canvas */
  const P=CanvasRenderingContext2D.prototype;P.__orig=P.__orig||{fillText:P.fillText,strokeText:P.strokeText,measureText:P.measureText};
  ['fillText','strokeText','measureText'].forEach(f=>{const o=P.__orig[f];P[f]=function(t,...a){return o.call(this,i18n(t),...a)}})}
else{const P=CanvasRenderingContext2D.prototype;if(P.__orig)Object.assign(P,P.__orig)}
/* số thập phân: tiếng Việt dùng dấu phẩy, tiếng Anh dùng dấu chấm */
const DEC=LANG==='en'?'.':',';
{const b=document.getElementById('langBtn');if(b){b.textContent=LANG==='en'?'Tiếng Việt':'English';b.onclick=()=>{try{localStorage.setItem('lab-lang',LANG==='en'?'vi':'en')}catch(e){}
  const u=new URL(location.href);u.searchParams.delete('lang');location.replace(u.href)}}}
