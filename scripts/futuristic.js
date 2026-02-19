// Smooth reveal on scroll and simple interactions
document.addEventListener('DOMContentLoaded',()=>{
  // reveal containers when in viewport
  const observers = document.querySelectorAll('.container');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.08});

  observers.forEach(c=>io.observe(c));

  // animate meters from CSS var
  document.querySelectorAll('.meter span').forEach(s=>{
    const pct = getComputedStyle(s).getPropertyValue('--pct') || '50%';
    requestAnimationFrame(()=>s.style.width = pct);
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  });
});

// Update GitHub project links
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.btn.sm').forEach(btn=>{
    if(btn.textContent.trim()==='GitHub' && btn.getAttribute('href')==='#'){
      btn.setAttribute('href','https://github.com/Saddalajayachandra123');
    }
  });
});
