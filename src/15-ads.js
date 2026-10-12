/* ================= QUẢNG CÁO (GOOGLE ADSENSE) =================
   Điền mã nhà xuất bản (ca-pub-...) và mã khối quảng cáo từ tài khoản AdSense vào ADS.
   Khi ADS.client còn trống thì không tải gì cả và các ô quảng cáo được ẩn đi.
   Quảng cáo không hiện ở chế độ trình chiếu, trên máy cục bộ hay trong bản xem trước. */
const ADS={client:'',slots:{side:'',bottom:''}};
{const host=location.hostname,ok=ADS.client&&!/^(localhost|127\.|\[::1\])|claude|claudeusercontent/.test(host);
  document.querySelectorAll('.adbox').forEach(box=>{const slot=ADS.slots[box.dataset.ad];
    if(!ok||!slot){box.hidden=true;return}box.hidden=false;
    if(box.querySelector('ins'))return;
    const ins=document.createElement('ins');ins.className='adsbygoogle';ins.style.display='block';
    ins.dataset.adClient=ADS.client;ins.dataset.adSlot=slot;ins.dataset.adFormat='auto';ins.dataset.fullWidthResponsive='true';box.appendChild(ins)});
  if(ok&&!document.getElementById('adsjs')){const s=document.createElement('script');s.id='adsjs';s.async=true;s.crossOrigin='anonymous';
    s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(ADS.client);document.head.appendChild(s);
    /* người xem phần lớn là học sinh: chỉ xin quảng cáo không cá nhân hoá */
    window.adsbygoogle=window.adsbygoogle||[];window.adsbygoogle.requestNonPersonalizedAds=1;
    document.querySelectorAll('.adbox:not([hidden]) ins').forEach(()=>{try{window.adsbygoogle.push({})}catch(e){}})}}
