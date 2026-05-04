
// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => { burger.classList.toggle('open'); navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { burger.classList.remove('open'); navLinks.classList.remove('open'); }));
}

// ===== NAVBAR HIDE/SHOW =====
let lastScroll = 0;
const header = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  const cur = window.pageYOffset;
  if (header) header.style.transform = (cur > 80 && cur > lastScroll) ? 'translateY(-100%)' : 'translateY(0)';
  lastScroll = cur;
}, { passive: true });

// ===== BEFORE/AFTER SLIDER =====
document.querySelectorAll('.slider-wrap').forEach(wrap => {
  const afterDiv = wrap.querySelector('.slider-after');
  const afterImg = afterDiv ? afterDiv.querySelector('img') : null;
  const handle   = wrap.querySelector('.slider-handle');
  if (!afterDiv || !afterImg || !handle) return;

  let dragging = false;

  function setPos(pct) {
    pct = Math.max(2, Math.min(98, pct));
    // Clip the after container
    afterDiv.style.width = pct + '%';
    // Keep the image at full wrap width so it doesn't stretch
    afterImg.style.width = (wrap.offsetWidth) + 'px';
    handle.style.left = pct + '%';
  }

  // Recalculate image width on resize
  window.addEventListener('resize', () => {
    const pct = parseFloat(afterDiv.style.width) || 50;
    afterImg.style.width = wrap.offsetWidth + 'px';
  }, { passive: true });

  function pctFromClientX(clientX) {
    const rect = wrap.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  setPos(50);

  wrap.addEventListener('mousedown',   e => { dragging = true; e.preventDefault(); setPos(pctFromClientX(e.clientX)); });
  window.addEventListener('mouseup',   () => dragging = false);
  window.addEventListener('mousemove', e => { if (dragging) setPos(pctFromClientX(e.clientX)); });

  wrap.addEventListener('touchstart', e => { dragging = true; setPos(pctFromClientX(e.touches[0].clientX)); }, { passive: true });
  wrap.addEventListener('touchend',   () => dragging = false);
  wrap.addEventListener('touchmove',  e => { if (dragging) setPos(pctFromClientX(e.touches[0].clientX)); }, { passive: true });
});

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.card, .tehnica-item, .student-card, .project-desc, .stat');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
