// Common JS loaded on every page

// Year & Back to top
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.getElementById('backToTop');
  if (backToTop) backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  });

  // Slideshow on Home
  const slides = document.querySelectorAll('.slide');
  if (slides.length){
    let i=0;
    setInterval(()=>{
      slides[i].classList.remove('active');
      i = (i+1) % slides.length;
      slides[i].classList.add('active');
    }, 3500);
  }

  // Product filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (filterBtns.length){
    const setActive = (btn)=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    };
    filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
      setActive(btn);
      const f = btn.dataset.filter;
      productCards.forEach(card=>{
        card.style.display = (f==='all' || card.dataset.cat===f) ? 'block' : 'none';
      });
    }));
    // start with All active
    setActive(filterBtns[0]);
  }

  // Contact form basic validation + fake submit
  const form = document.getElementById('contactForm');
  if (form){
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field=>{
        const small = field.parentElement.querySelector('.error-msg');
        if (!field.value.trim()){
          field.classList.add('error'); valid=false;
          if (small) small.textContent = 'This field is required.';
        }else{
          field.classList.remove('error');
          if (small) small.textContent = '';
        }
      });
      const email = document.getElementById('email');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        email.classList.add('error'); valid=false;
        const small = email.parentElement.querySelector('.error-msg');
        if (small) small.textContent = 'Enter a valid email.';
      }
      if (valid){
        status.textContent = 'Thank you! Your request has been received.';
        form.reset();
      }else{
        status.textContent = 'Please fix the errors above.';
      }
    });
  }

  // Events: countdown timers + next event notice
  const events = document.querySelectorAll('.event-card');
  if (events.length){
    const now = new Date();
    let soonest = null;
    events.forEach(card=>{
      const dt = new Date(card.dataset.date);
      if (!soonest || dt < soonest) soonest = dt;
      const c = card.querySelector('.countdown');
      if (!c) return;
      function tick(){
        const diff = new Date(card.dataset.date) - new Date();
        if (diff <= 0){ c.textContent = 'Started'; return; }
        const d = Math.floor(diff/86400000);
        const h = Math.floor((diff%86400000)/3600000);
        const m = Math.floor((diff%3600000)/60000);
        c.textContent = `Starts in ${d}d ${h}h ${m}m`;
      }
      tick(); setInterval(tick, 60000);
    });
    const notice = document.getElementById('nextEventNotice');
    if (notice && soonest){
      const f = soonest.toLocaleString([], {dateStyle:'medium', timeStyle:'short'});
      notice.textContent = `Next event is on ${f}. See details below ↓`;
    }
  }
});
