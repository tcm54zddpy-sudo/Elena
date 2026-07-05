/* ──────────────────────────────────────────────────────────────────────────
 *  topic-category.js — shared renderer for all Mindbloom category pages
 *
 *  Each topic-*.html page sets window.CATEGORY_ID before including this.
 * ────────────────────────────────────────────────────────────────────────── */

(function () {

// ── 1. Inject CSS ─────────────────────────────────────────────────────────

function injectCSS() {
  if (document.getElementById('mb-catpage-css')) return;
  const s = document.createElement('style');
  s.id = 'mb-catpage-css';
  s.textContent = `
:root {
  --bg:        #F8F7F4;
  --white:     #FFFFFF;
  --border:    rgba(0,0,0,0.08);
  --border-m:  rgba(0,0,0,0.13);
  --text:      #1A1A1A;
  --muted:     #6B6B6B;
  --faint:     #ABABAB;
  --serif:     'EB Garamond', Georgia, serif;
  --serif-body:'EB Garamond', Georgia, serif;
  --sans:      'Inter', sans-serif;
  --r: 16px; --r-sm: 10px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-weight: 300;
  font-size: 15px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
a { text-decoration: none; color: inherit; }

/* ── Hero ── */
.cat-hero {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 52px 2.8rem 44px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cat-hero__orbs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.cat-hero__orb  { position: absolute; border-radius: 50%; opacity: .10; }
.cat-hero__orb--1 { width: 320px; height: 320px; top: -90px; right: -70px; }
.cat-hero__orb--2 { width: 200px; height: 200px; bottom: -70px; left: -50px; }
.cat-hero__back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 400;
  color: var(--faint); margin-bottom: 22px;
  transition: color .15s;
  position: relative; z-index: 1;
}
.cat-hero__back:hover { color: var(--muted); }
.cat-hero__badge {
  display: block;
  width: 48px; height: 48px; border-radius: 50%;
  margin: 0 auto 18px;
  position: relative; z-index: 1;
}
.cat-hero h1 {
  font-family: var(--serif);
  font-size: clamp(26px, 3.5vw, 42px);
  font-weight: 400;
  margin-bottom: 10px;
  position: relative; z-index: 1;
}
.cat-hero p {
  font-family: var(--serif-body);
  font-size: 15px; font-style: italic;
  color: var(--muted);
  max-width: 460px; margin: 0 auto;
  line-height: 1.7;
  position: relative; z-index: 1;
}

/* ── Breadcrumb ── */
.cat-breadcrumb {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 11px 2.8rem;
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: var(--faint); font-weight: 400;
}
.cat-breadcrumb a { color: var(--faint); transition: color .15s; }
.cat-breadcrumb a:hover { color: var(--muted); }
.cat-breadcrumb .bc-current { color: var(--muted); }

/* ── Page body ── */
.page-body {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2.8rem 6rem;
}

/* ── Section label ── */
.section-label {
  font-size: 10.5px; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 1.1rem;
}

/* ── Topic pills ── */
.topic-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 3rem; }
.topic-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px 8px 10px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 100px;
  cursor: default;
}
.tp-dot  { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.tp-name { font-size: 13px; font-weight: 400; }

/* ── Divider ── */
.section-divider { height: 1px; background: var(--border); margin: 0 0 3rem; }

/* ── Article cards ── */
.articles-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.article-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.2rem 1.4rem;
  cursor: pointer;
  transition: border-color .2s, box-shadow .2s, transform .18s;
  display: flex; flex-direction: column; gap: 8px;
  position: relative; overflow: hidden;
  text-decoration: none; color: var(--text);
}
.article-card:hover {
  border-color: var(--border-m);
  box-shadow: 0 4px 18px rgba(0,0,0,.08);
  transform: translateY(-2px);
}
.article-card__accent {
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px; opacity: 0; transition: opacity .2s;
}
.article-card:hover .article-card__accent { opacity: 1; }
.article-card__tag { font-size: 10px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--faint); }
.article-card__title { font-family: var(--serif); font-size: .98rem; font-weight: 400; line-height: 1.4; }
.article-card__excerpt { font-size: 12.5px; color: var(--muted); line-height: 1.6; }
.article-card__read {
  margin-top: auto; padding-top: 8px;
  font-size: 10.5px; font-weight: 500;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--faint);
  display: flex; align-items: center; gap: 5px;
  transition: color .18s;
}
.article-card:hover .article-card__read { color: var(--text); }

/* ── List cards (same shape as article cards, distinct cue) ── */
.list-card__read svg { transform: none; }
.article-card__type {
  position: absolute; top: 12px; right: 12px;
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 9px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--faint);
}
.article-card__type svg { width: 11px; height: 11px; }

/* ── Empty state ── */
.no-articles {
  font-family: var(--serif-body);
  font-style: italic; font-size: 14px;
  color: var(--faint); padding: 2rem 0;
}

/* ── Category footer ── */
.cat-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}
.cat-footer__link {
  font-size: 13px; font-weight: 400;
  color: var(--faint);
  display: inline-flex; align-items: center; gap: 6px;
  transition: color .15s;
}
.cat-footer__link:hover { color: var(--muted); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim { animation: fadeUp .35s ease forwards; }
`;
  document.head.appendChild(s);
}


// ── 2. Category data ───────────────────────────────────────────────────────

const TOPIC_PAGES = {
  'self-worth': {
    name: 'Self-Worth & Identity',
    desc: 'How you see yourself — and who you want to be',
    grad: 'linear-gradient(135deg, #C4C0DC 0%, #8A84B8 100%)',
    subtopics: ['Self-Worth', 'Confidence', 'Self-Compassion', 'Comparison', 'Perfectionism', 'Validation', 'Boundaries'],
    articles: [
      { accent: 'linear-gradient(90deg,#BCA870,#DDD0B0)', url: 'article-illusion-of-perfection.html', tag: 'Perfectionism', title: 'Die Illusion der Perfektion', excerpt: 'Je mehr wir nach Perfektion streben, desto unzufriedener werden wir. Warum das so ist – und was wirklich hilft.', readTime: '7 min' },
      { accent: 'linear-gradient(90deg,#BCA870,#DDD0B0)', url: 'article-inner-child-healing.html', tag: 'Self-Worth', title: 'Inner Child Healing', excerpt: 'Kindheitserfahrungen formen uns still – oft noch Jahrzehnte später. Was Inner Child Healing wirklich bedeutet.', readTime: '8 min' },
      { accent: 'linear-gradient(90deg,#BF9690,#DEC9C4)', url: 'article-peace-with-food.html', tag: 'Body Image', title: 'Frieden schließen mit dem Essen', excerpt: 'Es gibt einen Bereich zwischen gelegentlichem Überessen und einer klinischen Essstörung – und er verdient Aufmerksamkeit.', readTime: '6 min' },
      { accent: 'linear-gradient(90deg,#BF9690,#DEC9C4)', url: 'article-diet-cycle.html', tag: 'Body Image', title: 'Der Ausweg aus dem Diätwahn', excerpt: 'Je strenger die Regeln, desto lauter werden die Impulse dagegen. Was wirklich passiert – und wie du aufhörst zu kämpfen.', readTime: '6 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#8A84B8,#C4C0DC)', url: 'list-red-flags.html', tag: 'Self-Reflection', title: '7 Red Flags bei dir selbst', excerpt: 'Toxische Muster erkennen wir oft zuerst in anderen. Sieben Punkte, bei denen sich der Blick nach innen lohnt.', count: 7 },
      { accent: 'linear-gradient(90deg,#8A84B8,#C4C0DC)', url: 'list-keine-rechtfertigung.html', tag: 'Boundaries', title: 'Dinge, für die du dich nie rechtfertigen musst', excerpt: 'Grenzen brauchen keine Begründung. Sieben Dinge, für die du niemandem eine Erklärung schuldest.', count: 7 },
      { accent: 'linear-gradient(90deg,#BF9690,#DEC9C4)', url: 'list-essverhalten.html', tag: 'Body Image', title: '5 Warnsignale für gestörtes Essverhalten', excerpt: 'Nicht jede schwierige Beziehung zum Essen ist eine Essstörung. Fünf Muster, die Aufmerksamkeit verdienen.', count: 5 },
    ]
  },
  'anxiety': {
    name: 'Anxiety & Overthinking',
    desc: 'Understanding worry, racing thoughts, and how to find calm',
    grad: 'linear-gradient(135deg, #B8CCDA 0%, #7A9DB5 100%)',
    subtopics: ['Anxiety', 'Overthinking', 'Panic Attacks', 'Worry Loops', 'Sleep Issues', 'Racing Thoughts', 'Nervous System'],
    articles: [
      { accent: 'linear-gradient(90deg,#7A9DB5,#B8CCDA)', url: 'article-understanding-anxiety.html', tag: 'Anxiety', title: 'Understanding anxiety — what it is and why it happens', excerpt: 'A plain-language guide to anxiety, written for people who\'ve never looked into it before.', readTime: '6 min' },
      { accent: 'linear-gradient(90deg,#8A84B8,#C4C0DC)', url: 'article-helping-with-anxiety.html', tag: 'Anxiety', title: 'Wie man jemandem mit Angstzuständen wirklich hilft', excerpt: '„Beruhig dich einfach" hilft nicht. Was stattdessen funktioniert – für alle, die jemandem wirklich beistehen wollen.', readTime: '7 min' },
      { accent: 'linear-gradient(90deg,#8A84B8,#C4C0DC)', url: 'article-get-out-of-your-head.html', tag: 'Overthinking', title: 'Get out of your head', excerpt: 'Aufdringliche Gedanken sind normal – aber sie müssen dich nicht überwältigen. Fünf Strategien, die wirklich helfen.', readTime: '8 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#7A9DB5,#B8CCDA)', url: 'list-therapie-hacks.html', tag: 'Overthinking', title: '10 Therapie-Hacks gegen das Gedankenkarussell', excerpt: 'Zehn Techniken aus der kognitiven Verhaltenstherapie, um dem inneren Kritiker den Wind aus den Segeln zu nehmen.', count: 10 },
      { accent: 'linear-gradient(90deg,#7A9DB5,#B8CCDA)', url: 'list-achtsamkeit.html', tag: 'Mindfulness', title: 'Achtsamkeitsübungen, die keine Meditation sind', excerpt: 'Drei Übungen, die überall funktionieren – ohne Vorkenntnisse, ohne besondere Umgebung.', count: 3 },
    ]
  },
  'loneliness': {
    name: 'Loneliness & Connection',
    desc: 'Finding belonging — with others and with yourself',
    grad: 'linear-gradient(135deg, #C8CCD4 0%, #8A90A0 100%)',
    subtopics: ['Loneliness', 'Isolation', 'Feeling Left Out', 'Belonging', 'Making Friends', 'Reconnecting', 'Vulnerability'],
    articles: [
      { accent: 'linear-gradient(90deg,#8FAF88,#C8D8C0)', url: 'article-social-battery.html', tag: 'Connection', title: 'Deine soziale Batterie', excerpt: 'Du liebst Gesellschaft, bist danach aber völlig erschöpft? Was Introversion wirklich bedeutet – und was nicht.', readTime: '6 min' },
      { accent: 'linear-gradient(90deg,#8FAF88,#C8D8C0)', url: 'article-positive-solitude.html', tag: 'Loneliness', title: 'Die Kunst des positiven Alleinseins', excerpt: 'Einsamkeit und Alleinsein sind nicht dasselbe. Wie du Solitude bewusst als Kraftquelle nutzt.', readTime: '5 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#8A90A0,#C8CCD4)', url: 'list-einsamkeit-tipps.html', tag: 'Connection', title: '13 Therapeuten-Tipps gegen akute Einsamkeit', excerpt: 'Dreizehn konkrete Schritte, die dich aus der Isolation holen – vom Blick nach innen bis raus in die Welt.', count: 13 },
      { accent: 'linear-gradient(90deg,#8A90A0,#C8CCD4)', url: 'list-einsamkeit-anzeichen.html', tag: 'Loneliness', title: '7 Anzeichen für tiefe Einsamkeit', excerpt: 'Einsamkeit ist nicht immer laut. Sieben Verhaltensmuster, die man oft erst im Nachhinein erkennt.', count: 7 },
    ]
  },
  'relationships': {
    name: 'Relationships',
    desc: 'How we connect — and why it\'s hard',
    grad: 'linear-gradient(135deg, #D8BFCA 0%, #B890A5 100%)',
    subtopics: ['Breakups', 'Dating', 'Attachment Styles', 'Family Dynamics', 'Friendship Issues', 'Communication', 'Conflict'],
    articles: [
      { accent: 'linear-gradient(90deg,#B890A5,#D8BFCA)', url: 'article-setting-boundaries.html', tag: 'Boundaries', title: 'Grenzen ziehen ohne Schuldgefühle', excerpt: 'Warum fällt es uns so schwer, Nein zu sagen – und wie lernt man es, ohne sich danach schlecht zu fühlen?', readTime: '7 min' },
      { accent: 'linear-gradient(90deg,#B890A5,#D8BFCA)', url: 'article-conscious-partnership.html', tag: 'Partnership', title: 'Bewusste Partnerschaft', excerpt: 'Ungesunde Muster schleichen sich oft leise ein. Was bewusste Partnerschaft bedeutet – und wie du anders zu reagieren anfängst.', readTime: '8 min' },
      { accent: 'linear-gradient(90deg,#BF9690,#DEC9C4)', url: 'article-healing-breakup.html', tag: 'Breakups', title: 'Healing after a breakup — a guide for when it really hurts', excerpt: 'Why breakups can feel like grief, and what actually helps you move through it.', readTime: '8 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#B890A5,#D8BFCA)', url: 'list-schwierige-gespraeche.html', tag: 'Communication', title: '6 Wege, schwierige Gespräche sicher zu beginnen', excerpt: 'Die größte Hürde ist oft der Einstieg. Sechs Formulierungen, die einen sicheren Gesprächsrahmen schaffen.', count: 6 },
      { accent: 'linear-gradient(90deg,#B890A5,#D8BFCA)', url: 'list-komplimente.html', tag: 'Connection', title: 'Komplimente, die wirklich ankommen', excerpt: 'Wer jemandem den Tag verschönern will, lobt Charakter und Haltung – nicht das Äußere. Plus: wie man sie annimmt.', count: 7 },
    ]
  },
  'stress': {
    name: 'Stress & Burnout',
    desc: 'Performance, pressure and the path back to rest',
    grad: 'linear-gradient(135deg, #DDD0B0 0%, #BCA870 100%)',
    subtopics: ['Burnout', 'Stress', 'Exhaustion', 'Rest', 'Work-Life Balance', 'Overwhelm', 'Recovery'],
    articles: [
      { accent: 'linear-gradient(90deg,#BCA870,#DDD0B0)', url: 'article-burnout.html', tag: 'Burnout', title: 'What burnout actually feels like — and how to know if you have it', excerpt: 'Burnout isn\'t just being tired. Here\'s how to recognise it and what to do next.', readTime: '7 min' },
      { accent: 'linear-gradient(90deg,#7A9DB5,#B8CCDA)', url: 'article-power-of-sleep.html', tag: 'Rest', title: 'Die Macht des Schlafs', excerpt: 'Fast zwei Drittel aller Menschen schlafen schlecht wegen Sorgen. Was wirklich passiert – und wie eine gute Abendroutine aussieht.', readTime: '6 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#BCA870,#DDD0B0)', url: 'list-energy-takers-givers.html', tag: 'Energie', title: 'Energy Takers vs. Energy Givers', excerpt: 'Dein Geist ist wie eine Batterie. Was sie entlädt – und was sie wieder auflädt, übersichtlich gegenübergestellt.', count: 16 },
    ]
  },
  'habits': {
    name: 'Habits & Growth',
    desc: 'For when you want to build something new in yourself',
    grad: 'linear-gradient(135deg, #DDD0A8 0%, #B8A050 100%)',
    subtopics: ['Habits & Discipline', 'Purpose & Meaning', 'Life Direction', 'Motivation', 'Procrastination', 'Fresh Starts', 'Routine'],
    articles: [
      { accent: 'linear-gradient(90deg,#7A9DB5,#B8CCDA)', url: 'article-procrastination.html', tag: 'Habits', title: 'Warum wir prokrastinieren', excerpt: 'Prokrastination ist kein Zeichen von Faulheit. Dahinter steckt fast immer etwas anderes – und das lässt sich angehen.', readTime: '6 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#B8A050,#DDD0A8)', url: 'list-prokrastination.html', tag: 'Procrastination', title: '15 effektive Wege gegen Prokrastination', excerpt: 'Aufschieben ist selten ein Disziplinproblem. Fünfzehn Ansätze, die die eigentlichen Blockaden angehen.', count: 15 },
      { accent: 'linear-gradient(90deg,#B8A050,#DDD0A8)', url: 'list-gewohnheiten.html', tag: 'Growth', title: 'Die 10 Gewohnheiten positiver Menschen', excerpt: 'Positiv sein heißt nicht, dass alles gut ist. Zehn Gewohnheiten im Umgang mit dem, was nicht gut ist.', count: 10 },
    ]
  },
  'emotions': {
    name: 'Emotions & Resilience',
    desc: 'Understanding what you\'re actually feeling — and moving through it',
    grad: 'linear-gradient(135deg, #C8D8C0 0%, #8FAF88 100%)',
    subtopics: ['Emotional Overwhelm', 'Grief & Loss', 'Depression', 'Inner Critic', 'Anger', 'Shame', 'Self-Compassion'],
    articles: [
      { accent: 'linear-gradient(90deg,#8A84B8,#C4C0DC)', url: 'article-get-out-of-your-head.html', tag: 'Overthinking', title: 'Get out of your head', excerpt: 'Aufdringliche Gedanken sind normal – aber sie müssen dich nicht überwältigen. Fünf Strategien, die wirklich helfen.', readTime: '8 min' },
      { accent: 'linear-gradient(90deg,#9080C0,#D0C8E0)', url: 'article-mental-wellness-101.html', tag: 'Mental Health', title: 'Mental Wellness 101', excerpt: 'Psychische Gesundheit entsteht im Zusammenspiel von Körper, Geist und Umfeld. Was du selbst beeinflussen kannst.', readTime: '5 min' },
      { accent: 'linear-gradient(90deg,#9080C0,#D0C8E0)', url: 'article-therapy-101.html', tag: 'Mental Health', title: 'Therapie 101', excerpt: 'Du musst nicht erst in einer Krise sein, um Therapie zu beginnen. Was Therapie wirklich ist – und wie du den richtigen Therapeuten findest.', readTime: '6 min' },
    ],
    lists: [
      { accent: 'linear-gradient(90deg,#8FAF88,#C8D8C0)', url: 'list-therapie-aha.html', tag: 'Mental Health', title: 'Wertvolle AHA-Momente aus der Therapie', excerpt: 'Manchmal braucht es Jahre für eine Erkenntnis, die in einen Satz passt. Hier sind die wichtigsten.', count: 9 },
      { accent: 'linear-gradient(90deg,#8FAF88,#C8D8C0)', url: 'list-shadow-work.html', tag: 'Shadow Work', title: 'Tagebuch-Prompts zum Loslassen', excerpt: 'Fünf Prompts, die helfen, festgehaltene Muster, Überzeugungen und Beziehungen zu erkennen – und loszulassen.', count: 5 },
    ]
  },
  'transitions': {
    name: 'Life Transitions',
    desc: 'When life changes faster than you can keep up',
    grad: 'linear-gradient(135deg, #C0CEB8 0%, #7A9870 100%)',
    subtopics: ['Moving & Relocation', 'New Job & Study', 'Identity Crisis', 'Fresh Starts', 'Grief & Loss', 'Life Direction', 'Reinvention'],
    articles: [
      { accent: 'linear-gradient(90deg,#BF9690,#DEC9C4)', url: 'article-healing-breakup.html', tag: 'Loss & Grief', title: 'Healing after a breakup — a guide for when it really hurts', excerpt: 'Why breakups can feel like grief, and what actually helps you move through it.', readTime: '8 min' },
      { accent: 'linear-gradient(90deg,#BCA870,#DDD0B0)', url: 'article-inner-child-healing.html', tag: 'Identity', title: 'Inner Child Healing', excerpt: 'Kindheitserfahrungen formen uns still – oft noch Jahrzehnte später. Was Inner Child Healing wirklich bedeutet.', readTime: '8 min' },
    ]
  },
};


// ── 3. Render ──────────────────────────────────────────────────────────────

const ARROW_LEFT  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>`;
const ARROW_RIGHT = `<svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const LIST_ICON   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;

function render() {
  const catId = window.CATEGORY_ID;
  const data  = TOPIC_PAGES[catId];
  if (!data) return;

  document.title = 'Mindbloom — ' + data.name;

  // Hero
  const hero = document.getElementById('cat-hero');
  if (hero) {
    hero.innerHTML =
      '<div class="cat-hero__orbs">' +
        '<div class="cat-hero__orb cat-hero__orb--1" style="background:' + data.grad + ';"></div>' +
        '<div class="cat-hero__orb cat-hero__orb--2" style="background:' + data.grad + ';"></div>' +
      '</div>' +
      '<a href="topics.html" class="cat-hero__back">' + ARROW_LEFT + 'All Topics</a>' +
      '<div class="cat-hero__badge" style="background:' + data.grad + ';"></div>' +
      '<h1>' + data.name + '</h1>' +
      '<p>' + data.desc + '</p>';
  }

  // Breadcrumb
  const bcCat = document.getElementById('bc-cat-name');
  if (bcCat) bcCat.textContent = data.name;

  // Topic pills
  const grid = document.getElementById('topic-grid');
  if (grid) {
    grid.innerHTML = data.subtopics.map(function(t) {
      return '<span class="topic-pill">' +
        '<div class="tp-dot" style="background:' + data.grad + ';"></div>' +
        '<span class="tp-name">' + t + '</span>' +
        '</span>';
    }).join('');
  }

  // Articles
  const row = document.getElementById('articles-row');
  if (row) {
    if (data.articles.length === 0) {
      row.innerHTML = '<p class="no-articles">Neue Artikel erscheinen bald in dieser Kategorie.</p>';
    } else {
      row.innerHTML = data.articles.map(function(art) {
        return '<a class="article-card anim" href="' + art.url + '">' +
          '<div class="article-card__accent" style="background:' + art.accent + '"></div>' +
          '<div class="article-card__tag">' + art.tag + '</div>' +
          '<div class="article-card__title">' + art.title + '</div>' +
          '<div class="article-card__excerpt">' + art.excerpt + '</div>' +
          '<div class="article-card__read">' + art.readTime + ' read ' + ARROW_RIGHT + '</div>' +
          '</a>';
      }).join('');
    }
  }

  // Lists — own section, same card shape as articles
  renderLists(data, row);
}

function renderLists(data, articlesRow) {
  const lists = data.lists || [];
  if (lists.length === 0) return;

  // Build the Lists section once and insert it right after the articles section.
  let section = document.getElementById('lists-section');
  if (!section) {
    const articlesSection = articlesRow ? articlesRow.closest('section') : null;
    if (!articlesSection || !articlesSection.parentNode) return;

    const divider = document.createElement('div');
    divider.className = 'section-divider';

    section = document.createElement('section');
    section.id = 'lists-section';
    section.innerHTML =
      '<div class="section-label">Lists</div>' +
      '<div class="articles-row" id="lists-row"></div>';

    articlesSection.parentNode.insertBefore(divider, articlesSection.nextSibling);
    divider.parentNode.insertBefore(section, divider.nextSibling);
  }

  const listRow = section.querySelector('#lists-row');
  if (!listRow) return;

  listRow.innerHTML = lists.map(function(list) {
    return '<a class="article-card anim" href="' + list.url + '">' +
      '<div class="article-card__accent" style="background:' + list.accent + '"></div>' +
      '<div class="article-card__type">' + LIST_ICON + 'Liste</div>' +
      '<div class="article-card__tag">' + list.tag + '</div>' +
      '<div class="article-card__title">' + list.title + '</div>' +
      '<div class="article-card__excerpt">' + list.excerpt + '</div>' +
      '<div class="article-card__read">' + list.count + ' Punkte ' + ARROW_RIGHT + '</div>' +
      '</a>';
  }).join('');
}


// ── 4. Init ────────────────────────────────────────────────────────────────

injectCSS();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}

})();
