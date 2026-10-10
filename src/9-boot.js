/* ================= BOOT ================= */
{const OLD={toan:'cubic',ly:'projectile',hoa:'titration',sinh:'mendel'};let id=location.hash.slice(1);id=OLD[id]||id;
  if(!LABS.some(l=>l.id===id)){try{id=localStorage.getItem('lab-cur')}catch(e){}}
  show(LABS.some(l=>l.id===id)?id:'cubic');}
