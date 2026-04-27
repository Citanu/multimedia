
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
  const after = wrap.querySelector('.slider-after');
  const handle = wrap.querySelector('.slider-handle');
  if (!after || !handle) return;
  let dragging = false;

  function setPos(pct) {
    pct = Math.max(2, Math.min(98, pct));
    after.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  function pctFromClientX(clientX) {
    const rect = wrap.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }
  setPos(50);
  wrap.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); setPos(pctFromClientX(e.clientX)); });
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('mousemove', e => { if (dragging) setPos(pctFromClientX(e.clientX)); });
  wrap.addEventListener('touchstart', e => { dragging = true; setPos(pctFromClientX(e.touches[0].clientX)); }, { passive: true });
  wrap.addEventListener('touchend', () => dragging = false);
  wrap.addEventListener('touchmove', e => { if (dragging) setPos(pctFromClientX(e.touches[0].clientX)); }, { passive: true });
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
