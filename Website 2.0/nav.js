/* ─── Mindbloom Global Nav + Footer + Cookie Banner ────────────────────────────
 *
 *  Single import:  <script src="nav.js"></script>  (place in <head>)
 *  No separate nav.css needed — styles are self-injected below.
 *
 *  Footer: replace existing <footer> with <div id="site-footer-placeholder"></div>
 *          or nav.js auto-appends to <body> if no placeholder exists.
 *
 * ─────────────────────────────────────────────────────────────────────────── */

// ─── 0. Theme (Dark / Light Mode) ─────────────────────────────────────────────
// Runs first so the correct theme is set before anything renders.
// Priority: saved user choice (localStorage) → system preference → light.

function mbGetSavedTheme() {
  try { return localStorage.getItem('mb-theme'); } catch (e) { return null; }
}

function mbApplyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

mbApplyTheme(
  mbGetSavedTheme() ||
  (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

// Follow system changes as long as the user hasn't picked a theme manually
if (window.matchMedia) {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!mbGetSavedTheme()) mbApplyTheme(e.matches ? 'dark' : 'light');
  });
}

window.mbToggleTheme = function () {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  // brief global transition so the switch fades instead of snapping
  document.documentElement.classList.add('mb-theme-anim');
  mbApplyTheme(next);
  try { localStorage.setItem('mb-theme', next); } catch (e) {}
  setTimeout(() => document.documentElement.classList.remove('mb-theme-anim'), 350);
};

function injectThemeCSS() {
  if (document.getElementById('mb-theme-css')) return;
  const style = document.createElement('style');
  style.id = 'mb-theme-css';
  style.textContent = `
/* ── Dark theme ──
   Every page defines its colors as :root variables; html[data-theme="dark"]
   has higher specificity than :root, so these overrides win on all pages. */
html[data-theme="dark"] {
  color-scheme: dark;

  --bg:        #2A3141;
  --white:     #333C4E;
  --dark:      #14161D;
  --border:    rgba(255,255,255,0.14);
  --border-m:  rgba(255,255,255,0.2);
  --text:      #E6E9EC;
  --muted:     #AEB4BB;
  --faint:     #8B929A;

  --sage:   #9FC2D8;
  --dusk:   #C4BCDD;
  --amber:  #DBCDB2;
  --blush:  #DCC2CC;
  --slate:  #A9C7DA;

  --sage-tint:  #313E48;
  --dusk-tint:  #333A4E;
  --amber-tint: #383D48;
  --blush-tint: #383844;
  --slate-tint: #303C4A;
  --t-sage:  #313E48;
  --t-dusk:  #333A4E;
  --t-amber: #383D48;
  --t-blush: #383844;
  --t-slate: #303C4A;

  --shadow:    0 1px 4px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.25);
  --shadow-md: 0 4px 8px rgba(0,0,0,.3), 0 16px 40px rgba(0,0,0,.4);
}

/* Deep blue gradient ground, like the design reference */
html[data-theme="dark"] body {
  background: linear-gradient(180deg, #2A3141 0%, #2D3648 46%, #2F3A4C 100%) fixed;
}

/* Pill buttons, chips & toasts use background:var(--text) with hardcoded
   white text — in dark mode --text is light, so the label must flip to dark. */
html[data-theme="dark"] .btn--primary,
html[data-theme="dark"] .btn--dark,
html[data-theme="dark"] .btn-primary,
html[data-theme="dark"] .btn-continue,
html[data-theme="dark"] .btn-next,
html[data-theme="dark"] .btn-add,
html[data-theme="dark"] .btn-sort,
html[data-theme="dark"] .btn-reflect,
html[data-theme="dark"] .btn-start,
html[data-theme="dark"] .btn-save,
html[data-theme="dark"] .btn-share,
html[data-theme="dark"] .btn-join,
html[data-theme="dark"] .btn-leave,
html[data-theme="dark"] .chip.selected,
html[data-theme="dark"] .alt-chip.selected,
html[data-theme="dark"] .sf-chip,
html[data-theme="dark"] .val-pill.selected,
html[data-theme="dark"] .filter-pill.active,
html[data-theme="dark"] .filter-btn.active,
html[data-theme="dark"] .friend-btn.selected,
html[data-theme="dark"] .need-btn.selected,
html[data-theme="dark"] .vt-btn.active,
html[data-theme="dark"] .cal-day.today,
html[data-theme="dark"] .att-remove,
html[data-theme="dark"] .em-save,
html[data-theme="dark"] .quick-submit,
html[data-theme="dark"] .chat-send-btn,
html[data-theme="dark"] .new-entry-btn,
html[data-theme="dark"] .new-msg-btn,
html[data-theme="dark"] .step-dot,
html[data-theme="dark"] .progress-step.active .ps-num,
html[data-theme="dark"] .msg-row.mine .msg-bubble,
html[data-theme="dark"] .toast {
  color: #1A1A1A;
}

/* Boxes & callouts with hardcoded light backgrounds → translucent dark surfaces */
html[data-theme="dark"] .journal-box,
html[data-theme="dark"] .exp-pill.yes,
html[data-theme="dark"] .tone-easy,
html[data-theme="dark"] .answer-btn.never { background: rgba(176,203,180,0.1); }
html[data-theme="dark"] .script-box { background: rgba(255,255,255,0.06); }
html[data-theme="dark"] .entry-card:hover,
html[data-theme="dark"] .entry-card.expanded { background: rgba(255,255,255,0.07); }
html[data-theme="dark"] .exp-pill.no,
html[data-theme="dark"] .tone-firm,
html[data-theme="dark"] .answer-btn.often { background: rgba(220,194,204,0.1); }
html[data-theme="dark"] .answer-btn.sometimes { background: rgba(219,205,178,0.1); }
html[data-theme="dark"] .callout--crisis { background: rgba(220,140,150,0.12); }
html[data-theme="dark"] .callout--warning { background: rgba(219,205,178,0.12); }
html[data-theme="dark"] .placeholder { background: rgba(219,205,178,0.28); }

/* Article & panel body text is hardcoded near-black → lighten */
html[data-theme="dark"] article p,
html[data-theme="dark"] article li,
html[data-theme="dark"] .panel-body p,
html[data-theme="dark"] .panel-body li { color: #CDD3D9; }
html[data-theme="dark"] .callout--info,
html[data-theme="dark"] .journal-box li { color: #B0CBB4; }

/* Smooth cross-fade while switching themes */
html.mb-theme-anim, html.mb-theme-anim *, html.mb-theme-anim *::before, html.mb-theme-anim *::after {
  transition: background-color .3s ease, color .3s ease, border-color .3s ease, box-shadow .3s ease !important;
}
`;
  document.head.appendChild(style);
}
injectThemeCSS();


// ─── 1. Self-inject CSS (runs synchronously, before body renders) ─────────────

function injectNavCSS() {
  if (document.getElementById('mb-nav-css')) return;
  const style = document.createElement('style');
  style.id = 'mb-nav-css';
  style.textContent = `
/* ── Variables ── */
/* --nav-h stays in :root so body { padding-top } can reach it */
:root { --nav-h: 60px; }

/* All other nav variables are scoped to nav elements only —
   they must not override the page's own :root variables */
.site-nav, .mega-menu, .mini-menu, .mega-backdrop {
  --bg:     #F8F7F4;
  --white:  #FFFFFF;
  --border: rgba(0,0,0,0.07);
  --text:   #1A1A1A;
  --muted:  #6B6B6B;
  --faint:  #ABABAB;
  --sage:   #5A8050;
  --dusk:   #6A64A0;
  --serif:  'Playfair Display', Georgia, serif;
  --sans:   'Mulish', system-ui, sans-serif;
}

body { padding-top: var(--nav-h); }

/* ── Nav bar ── */
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  height: var(--nav-h);
  background: rgba(248,247,244,0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  font-family: var(--sans);
  gap: 24px;
  isolation: isolate;
}

/* Logo — always centred, out of flex flow */
.nav-logo {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 400;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.01em;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

/* Link list — left side */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  margin: 0; padding: 0;
  flex: 1;
  justify-content: flex-start;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 11px;
  font-size: 13.5px;
  font-weight: 400;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.01em;
  border-radius: 8px;
  transition: color 0.14s, background 0.14s;
  white-space: nowrap;
}
.nav-link:hover { color: var(--text); background: rgba(0,0,0,0.045); }
.nav-link.is-active { color: var(--text); }

.nav-item-with-menu { list-style: none; position: relative; }
.nav-item-with-menu.is-open .nav-link { color: var(--text); background: rgba(0,0,0,0.045); }

.nav-chevron {
  transition: transform 0.2s ease;
  flex-shrink: 0;
  opacity: 0.55;
}
.nav-item-with-menu.is-open .nav-chevron { transform: rotate(180deg); opacity: 0.8; }

/* Right side */
.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.nav-help {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--sage);
  border: 1px solid rgba(90,128,80,0.28);
  border-radius: 20px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.14s, border-color 0.14s;
}
.nav-help:hover { background: rgba(90,128,80,0.07); border-color: rgba(90,128,80,0.48); }

.nav-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--muted);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color 0.14s, color 0.14s;
}
.nav-avatar:hover { border-color: rgba(0,0,0,0.18); color: var(--text); }
.nav-library-btn {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--muted);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color 0.14s, color 0.14s;
}
.nav-library-btn:hover { border-color: rgba(0,0,0,0.18); color: var(--text); }

/* ── Theme toggle (Dark / Light) ── */
.nav-theme-toggle {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border);
  padding: 0;
  cursor: pointer;
  transition: border-color 0.14s, color 0.14s;
}
.nav-theme-toggle:hover { border-color: rgba(0,0,0,0.18); color: var(--text); }
.nav-theme-toggle .mb-icon-sun { display: none; }
html[data-theme="dark"] .nav-theme-toggle .mb-icon-sun  { display: block; }
html[data-theme="dark"] .nav-theme-toggle .mb-icon-moon { display: none; }

/* ── Dark theme: nav, menus, backdrop ── */
html[data-theme="dark"] .site-nav,
html[data-theme="dark"] .mega-menu,
html[data-theme="dark"] .mini-menu {
  --bg:     #2A3141;
  --white:  #2D3542;
  --border: rgba(255,255,255,0.14);
  --text:   #E6E9EC;
  --muted:  #AEB4BB;
  --faint:  #8B929A;
  --sage:   #9FC2D8;
  --dusk:   #C4BCDD;
}
html[data-theme="dark"] .site-nav { background: rgba(18,20,27,0.6); backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4); }
html[data-theme="dark"] .nav-link:hover,
html[data-theme="dark"] .nav-item-with-menu.is-open .nav-link { background: rgba(255,255,255,0.07); }
html[data-theme="dark"] .nav-help { border-color: rgba(159,194,216,0.4); }
html[data-theme="dark"] .nav-help:hover { background: rgba(159,194,216,0.12); border-color: rgba(159,194,216,0.6); }
html[data-theme="dark"] .nav-avatar:hover,
html[data-theme="dark"] .nav-library-btn:hover,
html[data-theme="dark"] .nav-theme-toggle:hover { border-color: rgba(255,255,255,0.28); }
html[data-theme="dark"] .mega-menu,
html[data-theme="dark"] .mini-menu {
  box-shadow: 0 18px 44px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.25);
}
html[data-theme="dark"] .mega-cat:hover,
html[data-theme="dark"] .mega-cat.is-active,
html[data-theme="dark"] .mega-sub-link:hover,
html[data-theme="dark"] .mini-item:hover,
html[data-theme="dark"] .mega-search-btn { background: rgba(255,255,255,0.06); }
html[data-theme="dark"] .mega-search-btn:hover { background: rgba(255,255,255,0.1); }
html[data-theme="dark"] .mega-cat__dot { background: rgba(255,255,255,0.15); }
html[data-theme="dark"] .mega-cat.is-active .mega-cat__dot { background: var(--sage); }

/* ── Shared panel base ── */
.mega-menu, .mini-menu {
  position: fixed;
  top: var(--nav-h); left: 0; right: 0;
  z-index: 800;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 18px 44px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.22s ease;
}
.mega-menu.is-visible, .mini-menu.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* ── Shared label ── */
.mega-label, .mini-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 14px;
}

/* ── Topics mega menu ── */
.mega-menu__inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 36px 40px 32px;
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 0 48px;
}
.mega-left { border-right: 1px solid var(--border); padding-right: 40px; }
.mega-cat-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.mega-cat {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 10px; cursor: pointer;
  transition: background 0.12s;
}
.mega-cat:hover, .mega-cat.is-active { background: rgba(0,0,0,0.04); }
.mega-cat__name { font-size: 13.5px; font-weight: 400; color: var(--text); letter-spacing: -0.01em; line-height: 1.3; text-decoration: none; flex: 1; }
.mega-cat.is-active .mega-cat__name { font-weight: 500; }
.mega-cat__dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(0,0,0,0.1); flex-shrink: 0; transition: background 0.15s; }
.mega-cat.is-active .mega-cat__dot { background: var(--sage); }
.mega-right { padding-top: 2px; }
.mega-sub-panel { display: none; }
.mega-sub-panel.is-active { display: block; animation: subFadeIn 0.18s ease both; }
@keyframes subFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.mega-sub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px 10px; }
.mega-sub-link {
  display: block; padding: 7px 10px;
  font-size: 13.5px; font-weight: 300;
  color: var(--muted); text-decoration: none;
  border-radius: 8px; transition: color 0.12s, background 0.12s;
}
.mega-sub-link:hover { color: var(--text); background: rgba(0,0,0,0.04); }
.mega-footer {
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid var(--border); margin-top: 22px; padding-top: 18px;
}
.mega-search-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 13px; background: rgba(0,0,0,0.04);
  border-radius: 8px; text-decoration: none;
  transition: background 0.14s; color: var(--faint);
  font-size: 13px; font-weight: 300;
}
.mega-search-btn:hover { background: rgba(0,0,0,0.07); }
.mega-all-link, .mini-all-link {
  font-size: 12.5px; font-weight: 400; color: var(--muted);
  text-decoration: none; display: inline-flex; align-items: center;
  gap: 5px; transition: color 0.14s;
}
.mega-all-link:hover, .mini-all-link:hover { color: var(--text); }
.mega-all-link svg, .mini-all-link svg { transition: transform 0.14s; }
.mega-all-link:hover svg, .mini-all-link:hover svg { transform: translateX(2px); }

/* ── Mini menus (Tools, Community) ── */
.mini-menu__inner { max-width: 960px; margin: 0 auto; padding: 28px 40px 24px; }
.mini-menu__inner--narrow {
  max-width: 520px; margin: 0;
  margin-left: calc((100vw - 960px) / 2 + 40px);
}
.mini-groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 32px; }
.mini-group { display: flex; flex-direction: column; gap: 2px; }
.mini-group__label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--faint);
  margin-bottom: 10px; display: block;
}
.mini-item {
  display: flex; flex-direction: column; gap: 2px;
  padding: 8px 10px; border-radius: 10px;
  text-decoration: none; transition: background 0.12s;
}
.mini-item:hover { background: rgba(0,0,0,0.04); }
.mini-item__name { font-size: 13.5px; font-weight: 400; color: var(--text); letter-spacing: -0.005em; }
.mini-item__desc { font-size: 12px; font-weight: 300; color: var(--faint); line-height: 1.4; }
.mini-single-list { display: flex; flex-direction: column; gap: 2px; }
.mini-item--row { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; }
.mini-item--row .mini-item__desc { text-align: right; }
.mini-footer { display: flex; justify-content: flex-end; border-top: 1px solid var(--border); margin-top: 18px; padding-top: 16px; }

/* ── Backdrop ── */
.mega-backdrop { position: fixed; inset: 0; z-index: 700; pointer-events: none; }
.mega-backdrop.is-visible { pointer-events: all; }

/* ── Global Footer ── */
.site-footer {
  background: #1A1A1A;
  padding: 48px 2.8rem 32px;
  font-family: 'Mulish', system-ui, sans-serif;
}
.site-footer__inner {
  max-width: 1060px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.site-footer__logo {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem; letter-spacing: .12em;
  color: rgba(255,255,255,.8); text-decoration: none;
}
.site-footer__links {
  display: flex; gap: 6px; flex-wrap: wrap;
  list-style: none; margin: 0; padding: 0;
}
.site-footer__links a {
  font-size: 11px; font-weight: 500; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(255,255,255,.35);
  padding: 4px 10px; text-decoration: none; transition: color .18s;
}
.site-footer__links a:hover { color: rgba(255,255,255,.7); }
.site-footer__links .site-footer__legal { color: rgba(255,255,255,.55); }
.site-footer__legal:hover { color: rgba(255,255,255,.9) !important; }
.site-footer__bottom {
  max-width: 1060px; margin: 24px auto 0;
  font-size: 11.5px; color: rgba(255,255,255,.2);
}

/* ── Cookie Banner ── */
.mb-cookie-banner {
  position: fixed; bottom: 24px;
  left: 50%; transform: translateX(-50%) translateY(12px);
  z-index: 850;
  background: #1A1A1A; color: rgba(255,255,255,.75);
  border-radius: 14px; padding: 14px 20px;
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  max-width: 680px; width: calc(100% - 48px);
  box-shadow: 0 8px 32px rgba(0,0,0,.28);
  font-family: 'Mulish', system-ui, sans-serif;
  font-size: 13px; line-height: 1.5;
  opacity: 0; pointer-events: none;
  transition: opacity .3s, transform .3s;
}
.mb-cookie-banner.is-visible {
  opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: all;
}
.mb-cookie-banner p { margin: 0; flex: 1; min-width: 180px; }
.mb-cookie-banner a { color: #8FBC85; text-decoration: none; }
.mb-cookie-banner a:hover { text-decoration: underline; }
.mb-cookie-banner button {
  background: rgba(255,255,255,.12); border: none;
  color: #fff; padding: 7px 18px; border-radius: 8px;
  font-size: 12.5px; font-weight: 500; cursor: pointer;
  white-space: nowrap; font-family: inherit; flex-shrink: 0;
  transition: background .15s;
}
.mb-cookie-banner button:hover { background: rgba(255,255,255,.2); }

@media (max-width: 600px) {
  .site-footer { padding: 40px 1.4rem 28px; }
}
`;
  document.head.appendChild(style);
}
injectNavCSS();


// ─── 2. Data ──────────────────────────────────────────────────────────────────

// Single source of truth for the global nav — never changes per page.
const NAV_CONFIG = {
  logo:        { label: "Mindbloom",    href: "index.html" },
  helpLabel:   "Soforthilfe",
  helpHref:    "help.html",
  profileHref: "profile.html",
  links: [
    { label: "Home",      href: "index.html" },
    { label: "Learn",     href: "learn.html" },
    { label: "Topics",    href: "topics.html",    triggerId: "topicsTrigger",    menuId: "megaMenu" },
    { label: "Tools",     href: "tools.html",     triggerId: "toolsTrigger",     menuId: "toolsMenu" },
    { label: "Community", href: "community.html", triggerId: "communityTrigger", menuId: "communityMenu" },
    { label: "About",     href: "about.html" },
  ],
};

const TOPICS_CATEGORIES = [
  { id: "self-worth",   name: "Self-Worth & Identity",    href: "topic-self-worth.html",    subtopics: ["Self-Worth", "Confidence", "Self-Compassion", "Comparison", "Perfectionism", "Validation", "Boundaries"] },
  { id: "anxiety",      name: "Anxiety & Overthinking",   href: "topic-anxiety.html",       subtopics: ["Anxiety", "Overthinking", "Panic Attacks", "Worry Loops", "Sleep Issues", "Racing Thoughts", "Nervous System"] },
  { id: "loneliness",   name: "Loneliness & Connection",  href: "topic-loneliness.html",    subtopics: ["Loneliness", "Isolation", "Feeling Left Out", "Belonging", "Making Friends", "Reconnecting", "Vulnerability"] },
  { id: "relationships",name: "Relationships",            href: "topic-relationships.html", subtopics: ["Breakups", "Dating", "Attachment Styles", "Family Dynamics", "Friendship Issues", "Communication", "Conflict"] },
  { id: "stress",       name: "Stress & Burnout",         href: "topic-stress.html",        subtopics: ["Burnout", "Stress", "Exhaustion", "Rest", "Work-Life Balance", "Overwhelm", "Recovery"] },
  { id: "habits",       name: "Habits & Growth",          href: "topic-habits.html",        subtopics: ["Habits & Discipline", "Purpose & Meaning", "Life Direction", "Motivation", "Procrastination", "Fresh Starts", "Routine"] },
  { id: "emotions",     name: "Emotions & Resilience",    href: "topic-emotions.html",      subtopics: ["Emotional Overwhelm", "Grief & Loss", "Depression", "Inner Critic", "Anger", "Shame", "Self-Compassion"] },
  { id: "transitions",  name: "Life Transitions",         href: "topic-transitions.html",   subtopics: ["Moving & Relocation", "New Job & Study", "Identity Crisis", "Fresh Starts", "Grief & Loss", "Life Direction", "Reinvention"] },
];

const TOOLS_GROUPS = [
  { label: "Calm & Ground",  items: [
    { name: "4-7-8 Breathing",  href: "tool-breathing.html",     desc: "Activate your calm response" },
    { name: "Thought Clouds",   href: "tool-clouds.html",         desc: "Let thoughts pass without holding on" },
    { name: "Difficult Days",   href: "tool-difficult-days.html", desc: "A guide for hard moments" },
  ]},
  { label: "Reflect & Know", items: [
    { name: "Thought Mirror",   href: "tool-thought-mirror.html", desc: "Reframe unhelpful thinking" },
    { name: "Emotion Wheel",    href: "tool-emotion-wheel.html",  desc: "Name what you're feeling" },
    { name: "Values Clarifier", href: "tool-values.html",         desc: "Find what matters to you" },
  ]},
  { label: "Act & Prepare",  items: [
    { name: "Boundary Builder", href: "tool-boundaries.html",     desc: "Script a hard conversation" },
    { name: "Circle of Control",href: "tool-control.html",        desc: "Focus on what's yours to change" },
    { name: "Prepare Flow",     href: "tool-prepare.html",        desc: "Get ready for what's coming" },
  ]},
];

const COMMUNITY_ITEMS = [
  { name: "All Posts",        href: "community.html",       desc: "Browse the community feed" },
  { name: "Prompt Room",      href: "prompt-room.html",     desc: "Daily reflection prompts" },
  { name: "Share Your Story", href: "community.html#share", desc: "Write and publish your experience" },
  { name: "Most Helpful",     href: "community.html#top",   desc: "Posts that resonated most" },
];


// ─── 3. HTML builders ─────────────────────────────────────────────────────────

function toSlug(str) {
  return str.toLowerCase().replace(/[&]/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildTopicsMegaMenu() {
  return `
<div class="mega-menu" id="megaMenu" role="dialog" aria-label="Topics menu">
  <div class="mega-menu__inner">
    <div class="mega-left">
      <span class="mega-label">Browse by topic</span>
      <ul class="mega-cat-list" id="megaCatList">
        ${TOPICS_CATEGORIES.map((cat, i) => `
          <li class="mega-cat${i === 0 ? " is-active" : ""}" data-cat="${cat.id}">
            <a href="${cat.href}" class="mega-cat__name">${cat.name}</a>
            <span class="mega-cat__dot"></span>
          </li>`).join("")}
      </ul>
    </div>
    <div class="mega-right">
      <span class="mega-label" id="megaRightLabel">${TOPICS_CATEGORIES[0].name}</span>
      ${TOPICS_CATEGORIES.map((cat, i) => `
        <div class="mega-sub-panel${i === 0 ? " is-active" : ""}" id="panel-${cat.id}">
          <div class="mega-sub-grid">
            ${cat.subtopics.map(sub => `<a href="topics.html#${toSlug(sub)}" class="mega-sub-link">${sub}</a>`).join("")}
          </div>
        </div>`).join("")}
      <div class="mega-footer">
        <a href="topics.html" class="mega-search-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <span>Search topics…</span>
        </a>
        <a href="topics.html" class="mega-all-link">
          All topics
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</div>`;
}

function buildToolsDropdown() {
  return `
<div class="mini-menu" id="toolsMenu" data-for="tools">
  <div class="mini-menu__inner">
    <div class="mini-groups">
      ${TOOLS_GROUPS.map(group => `
        <div class="mini-group">
          <span class="mini-group__label">${group.label}</span>
          ${group.items.map(item => `
            <a href="${item.href}" class="mini-item">
              <span class="mini-item__name">${item.name}</span>
              <span class="mini-item__desc">${item.desc}</span>
            </a>`).join("")}
        </div>`).join("")}
    </div>
    <div class="mini-footer">
      <a href="tools.html" class="mini-all-link">
        All tools
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</div>`;
}

function buildCommunityDropdown() {
  return `
<div class="mini-menu" id="communityMenu" data-for="community">
  <div class="mini-menu__inner mini-menu__inner--narrow">
    <span class="mini-label">Community</span>
    <div class="mini-single-list">
      ${COMMUNITY_ITEMS.map(item => `
        <a href="${item.href}" class="mini-item mini-item--row">
          <span class="mini-item__name">${item.name}</span>
          <span class="mini-item__desc">${item.desc}</span>
        </a>`).join("")}
    </div>
  </div>
</div>`;
}


// ─── 4a. Footer + Cookie Banner ───────────────────────────────────────────────

function buildFooter() {
  return `
<footer class="site-footer">
  <div class="site-footer__inner">
    <a href="index.html" class="site-footer__logo">Mindbloom</a>
    <ul class="site-footer__links">
      <li><a href="topics.html">Topics</a></li>
      <li><a href="learn.html">Learn</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="community.html">Community</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="help.html">Soforthilfe</a></li>
      <li><a href="legal.html" class="site-footer__legal">Impressum &amp; Datenschutz</a></li>
    </ul>
  </div>
  <div class="site-footer__bottom">
    <p>&copy; 2026 Mindbloom &nbsp;&middot;&nbsp; A space for your mind &nbsp;&middot;&nbsp; Kein Ersatz f&uuml;r professionelle Hilfe &nbsp;&middot;&nbsp; Telefonseelsorge: <strong style="color:rgba(255,255,255,.4)">0800 111 0 111</strong></p>
  </div>
</footer>`;
}

function injectFooter() {
  const placeholder = document.getElementById('site-footer-placeholder');
  const html = buildFooter();
  if (placeholder) {
    placeholder.outerHTML = html;
  } else if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', html);
  }
}

function buildCookieBanner() {
  return `
<div class="mb-cookie-banner" id="mbCookieBanner" role="dialog" aria-label="Cookie-Hinweis">
  <p>Wir nutzen ausschlie&szlig;lich technisch notwendige Cookies (Session-Login, CSRF-Schutz) &ndash; kein Tracking. <a href="legal.html">Datenschutzerkl&auml;rung</a></p>
  <button onclick="mbDismissCookie()">Verstanden</button>
</div>`;
}

function injectCookieBanner() {
  if (localStorage.getItem('mb-cookie-ok')) return;
  document.body.insertAdjacentHTML('beforeend', buildCookieBanner());
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('mbCookieBanner')?.classList.add('is-visible');
  }));
}

window.mbDismissCookie = function() {
  localStorage.setItem('mb-cookie-ok', '1');
  const el = document.getElementById('mbCookieBanner');
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateX(-50%) translateY(12px)';
  setTimeout(() => el.remove(), 320);
};


// ─── 4b. Build + inject nav HTML ──────────────────────────────────────────────

function buildNav() {
  const placeholder = document.getElementById("site-nav-placeholder");
  if (!placeholder) return;

  const chevron = `<svg class="nav-chevron" width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l4 4 4-4"/></svg>`;

  const linksHTML = NAV_CONFIG.links.map(link =>
    link.triggerId
      ? `<li class="nav-item-with-menu" id="${link.triggerId}">
        <a href="${link.href}" class="nav-link">${link.label}${chevron}</a>
      </li>`
      : `<li><a href="${link.href}" class="nav-link">${link.label}</a></li>`
  ).join('\n    ');

  placeholder.outerHTML = `
<nav class="site-nav" id="siteNav">
  <ul class="nav-links">
    ${linksHTML}
  </ul>
  <a href="${NAV_CONFIG.logo.href}" class="nav-logo">${NAV_CONFIG.logo.label}</a>
  <div class="nav-right">
    <a href="${NAV_CONFIG.helpHref}" class="nav-help">${NAV_CONFIG.helpLabel}</a>
    <button type="button" class="nav-theme-toggle" onclick="mbToggleTheme()" aria-label="Dark / Light Mode umschalten" title="Dark / Light Mode">
      <svg class="mb-icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>
      </svg>
      <svg class="mb-icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    </button>
    <a href="library.html" class="nav-library-btn" aria-label="My Library" title="My Library">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    </a>
    <a href="${NAV_CONFIG.profileHref}" class="nav-avatar" aria-label="Profil">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </a>
  </div>
</nav>
${buildTopicsMegaMenu()}
${buildToolsDropdown()}
${buildCommunityDropdown()}
<div class="mega-backdrop" id="megaBackdrop"></div>`;

  initNav();
  injectFooter();
  injectCookieBanner();
}


// ─── 5. Interactions ──────────────────────────────────────────────────────────

let _navInitDone = false;

function closeAllMenus() {
  ['megaMenu','toolsMenu','communityMenu'].forEach(id =>
    document.getElementById(id)?.classList.remove('is-visible'));
  ['topicsTrigger','toolsTrigger','communityTrigger'].forEach(id =>
    document.getElementById(id)?.classList.remove('is-open'));
  document.getElementById('megaBackdrop')?.classList.remove('is-visible');
}

function initNav() {
  if (_navInitDone) { closeAllMenus(); return; }
  _navInitDone = true;

  const backdrop = document.getElementById("megaBackdrop");
  let closeTimer = null;
  let currentMenu = null;

  const MENUS = [
    { triggerId: "topicsTrigger",    menuId: "megaMenu" },
    { triggerId: "toolsTrigger",     menuId: "toolsMenu" },
    { triggerId: "communityTrigger", menuId: "communityMenu" },
  ];

  function openMenu(triggerId) {
    clearTimeout(closeTimer);
    MENUS.forEach(({ triggerId: tid, menuId }) => {
      const t = document.getElementById(tid);
      const m = document.getElementById(menuId);
      if (!t || !m) return;
      const isTarget = tid === triggerId;
      m.classList.toggle("is-visible", isTarget);
      t.classList.toggle("is-open", isTarget);
      t.querySelector(".nav-link")?.setAttribute("aria-expanded", String(isTarget));
    });
    backdrop.classList.add("is-visible");
    currentMenu = triggerId;
  }

  function closeAll() {
    MENUS.forEach(({ triggerId, menuId }) => {
      document.getElementById(menuId)?.classList.remove("is-visible");
      document.getElementById(triggerId)?.classList.remove("is-open");
    });
    backdrop.classList.remove("is-visible");
    currentMenu = null;
  }

  function scheduleClose() { closeTimer = setTimeout(closeAll, 140); }

  MENUS.forEach(({ triggerId, menuId }) => {
    const trigger = document.getElementById(triggerId);
    const menu    = document.getElementById(menuId);
    if (!trigger || !menu) return;
    trigger.addEventListener("mouseenter", () => openMenu(triggerId));
    trigger.addEventListener("mouseleave", scheduleClose);
    menu.addEventListener("mouseenter",   () => { clearTimeout(closeTimer); openMenu(triggerId); });
    menu.addEventListener("mouseleave",   scheduleClose);
    trigger.addEventListener("click",     () => currentMenu === triggerId ? closeAll() : openMenu(triggerId));
  });

  backdrop.addEventListener("click", closeAll);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });

  // Topics mega menu — category switching
  const catList   = document.getElementById("megaCatList");
  const rightLabel = document.getElementById("megaRightLabel");
  catList?.querySelectorAll(".mega-cat").forEach(cat => {
    cat.addEventListener("mouseenter", () => {
      const id   = cat.dataset.cat;
      const data = TOPICS_CATEGORIES.find(c => c.id === id);
      catList.querySelectorAll(".mega-cat").forEach(c => c.classList.remove("is-active"));
      cat.classList.add("is-active");
      if (rightLabel && data) rightLabel.textContent = data.name;
      document.querySelectorAll(".mega-sub-panel").forEach(p => p.classList.remove("is-active"));
      document.getElementById("panel-" + id)?.classList.add("is-active");
    });
  });
}


// ─── 6. Init ──────────────────────────────────────────────────────────────────

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", buildNav);
} else {
  buildNav();
}

// ─── 7. bfcache (Safari Back/Forward) ────────────────────────────────────────

window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  injectThemeCSS();
  injectNavCSS();
  if (!document.querySelector('.site-nav')) {
    _navInitDone = false;
    buildNav();
  } else {
    closeAllMenus();
  }
});
