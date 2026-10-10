/* ================= Ô CHỌN (DROPDOWN) ĐỒNG BỘ GIAO DIỆN =================
   Thay giao diện menu mặc định của hệ điều hành bằng danh sách riêng.
   Thẻ <select> gốc vẫn nằm trong trang (ẩn) nên mọi đoạn mã đọc .value vẫn chạy như cũ. */
const CHEV='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6"/></svg>';
function closeAllDD(except){document.querySelectorAll('.dd').forEach(w=>{if(w===except)return;const l=w.querySelector('.ddlist');if(!l.hidden){l.hidden=true;w.querySelector('.ddbtn').setAttribute('aria-expanded','false')}})}
function enhanceSelects(){document.querySelectorAll('select:not([data-dd])').forEach((sel,n)=>{sel.dataset.dd='1';
  const wrap=document.createElement('div');wrap.className='dd';sel.parentNode.insertBefore(wrap,sel);wrap.appendChild(sel);sel.classList.add('ddnative');sel.tabIndex=-1;sel.setAttribute('aria-hidden','true');
  const btn=document.createElement('button');btn.type='button';btn.className='ddbtn';btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');
  const lid='ddl'+(sel.id||n);btn.id=(sel.id||'dd'+n)+'__btn';btn.setAttribute('aria-controls',lid);
  const lab=sel.id&&document.querySelector(`label[for="${sel.id}"]`);if(lab)lab.htmlFor=btn.id;else if(sel.getAttribute('aria-label'))btn.setAttribute('aria-label',sel.getAttribute('aria-label'));
  const list=document.createElement('div');list.className='ddlist';list.id=lid;list.setAttribute('role','listbox');list.hidden=true;wrap.append(btn,list);
  let act=0;
  const paint=()=>{const o=sel.options[sel.selectedIndex];btn.innerHTML=`<span>${o?o.textContent:''}</span>${CHEV}`};
  sel._ddSync=()=>{const k=sel.selectedIndex+'|'+[...sel.options].map(o=>o.textContent+(o.disabled?'!':'')).join('|');if(k!==sel._ddKey){sel._ddKey=k;paint()}};
  const mark=()=>list.querySelectorAll('.ddopt').forEach((o,i)=>o.classList.toggle('act',i===act));
  const open=()=>{closeAllDD(wrap);list.innerHTML=[...sel.options].map((o,i)=>`<div class="ddopt" role="option" data-i="${i}" aria-selected="${i===sel.selectedIndex}" aria-disabled="${o.disabled}">${o.textContent}</div>`).join('');
    act=Math.max(0,sel.selectedIndex);list.hidden=false;btn.setAttribute('aria-expanded','true');mark();const a=list.children[act];if(a)a.scrollIntoView({block:'nearest'})};
  const close=()=>{list.hidden=true;btn.setAttribute('aria-expanded','false')};
  const pick=i=>{const o=sel.options[i];if(!o||o.disabled)return;sel.selectedIndex=i;sel.dispatchEvent(new Event('input',{bubbles:true}));sel.dispatchEvent(new Event('change',{bubbles:true}));sel._ddSync();close();btn.focus()};
  btn.addEventListener('click',()=>list.hidden?open():close());
  list.addEventListener('click',e=>{const o=e.target.closest('.ddopt');if(o)pick(+o.dataset.i)});
  btn.addEventListener('keydown',e=>{const k=e.key,N=sel.options.length;
    if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();if(list.hidden){open();return}let i=act;do{i=(i+(k==='ArrowDown'?1:-1)+N)%N}while(sel.options[i].disabled&&i!==act);act=i;mark();const a=list.children[act];if(a)a.scrollIntoView({block:'nearest'})}
    else if((k==='Enter'||k===' ')&&!list.hidden){e.preventDefault();pick(act)}
    else if(k==='Escape'||k==='Tab'){close()}});
  sel._ddSync()})}
document.addEventListener('pointerdown',e=>{const w=e.target.closest&&e.target.closest('.dd');closeAllDD(w)});
try{clearInterval(window.__ddTimer)}catch(e){}
window.__ddTimer=setInterval(()=>document.querySelectorAll('select[data-dd]').forEach(s=>s._ddSync&&s._ddSync()),150);

/* ================= BOOT ================= */
{const OLD={toan:'cubic',ly:'projectile',hoa:'titration',sinh:'mendel'};let id=location.hash.slice(1);id=OLD[id]||id;
  if(!LABS.some(l=>l.id===id)){try{id=localStorage.getItem('lab-cur')}catch(e){}}
  enhanceSelects();
  show(LABS.some(l=>l.id===id)?id:'cubic');}
