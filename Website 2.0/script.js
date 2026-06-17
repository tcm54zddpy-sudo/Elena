// ── Breathing Exercise ──────────────────────────────────────────────
const breathCenter = document.getElementById('breathCenter');
const breathPhase  = document.getElementById('breathPhase');
const breathCount  = document.getElementById('breathCount');
const bRing1 = document.getElementById('bRing1');
const bRing2 = document.getElementById('bRing2');
const bRing3 = document.getElementById('bRing3');

if (breathCenter) {
  // phases: name, duration (s), target scale (1 = normal, 1.25 = fully inhaled)
  const PHASES = [
    { name: 'Inhale', dur: 4, scale: 1.25, cls: 'phase-inhale' },
    { name: 'Hold',   dur: 2, scale: 1.25, cls: 'phase-hold'   },
    { name: 'Exhale', dur: 4, scale: 1.0,  cls: 'phase-exhale' },
    { name: 'Rest',   dur: 2, scale: 1.0,  cls: 'phase-rest'   },
  ];

  let phaseIdx  = 0;
  let countdown = PHASES[0].dur;
  let elapsed   = 0;
  let lastTs    = null;

  function setScale(scale, dur) {
    const durStr = dur + 's';
    [bRing1, bRing2, bRing3, breathCenter].forEach(el => {
      el.style.setProperty('--breath-dur', durStr);
    });
    bRing1.style.transform     = `scale(${scale})`;
    bRing2.style.transform     = `scale(${scale * 0.96})`;
    bRing3.style.transform     = `scale(${scale * 0.91})`;
    breathCenter.style.transform = `scale(${0.82 + (scale - 1) * 0.5})`;
  }

  function applyPhase(ph) {
    breathPhase.textContent = ph.name;
    breathCenter.className  = 'breath-center ' + ph.cls;
    setScale(ph.scale, ph.dur);
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    const dt = ts - lastTs;
    lastTs = ts;
    elapsed += dt;

    const ph  = PHASES[phaseIdx];
    const remaining = Math.ceil((ph.dur * 1000 - elapsed) / 1000);
    if (remaining !== countdown && remaining > 0) {
      countdown = remaining;
      breathCount.textContent = countdown;
    }

    if (elapsed >= ph.dur * 1000) {
      elapsed   = 0;
      lastTs    = ts;
      phaseIdx  = (phaseIdx + 1) % PHASES.length;
      countdown = PHASES[phaseIdx].dur;
      applyPhase(PHASES[phaseIdx]);
    }

    requestAnimationFrame(tick);
  }

  // start immediately
  applyPhase(PHASES[0]);
  requestAnimationFrame(tick);
}

// ── Mood selector ───────────────────────────────────────────────────
function selectMood(btn) {
  document.querySelectorAll('.mood__pill').forEach(p => p.classList.remove('selected'));
  btn.classList.add('selected');
  const mood = btn.querySelector('.mood__name').textContent;
  const result = document.getElementById('moodResult');
  document.getElementById('moodResultText').textContent = `You're feeling ${mood.toLowerCase()}.`;
  result.style.display = 'block';
}

function clearMood() {
  document.querySelectorAll('.mood__pill').forEach(p => p.classList.remove('selected'));
  document.getElementById('moodResult').style.display = 'none';
}

// ── Nav shadow on scroll ────────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8
    ? '0 1px 16px rgba(0,0,0,.07)'
    : 'none';
}, { passive: true });

// ── Fade-in sections on scroll ──────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section').forEach(sec => {
  sec.style.opacity    = '0';
  sec.style.transform  = 'translateY(20px)';
  sec.style.transition = 'opacity .55s ease, transform .55s ease';
  observer.observe(sec);
});
