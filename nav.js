/* ─── Mindbloom Global Nav + Footer + Cookie Banner ────────────────────────────
 *
 *  Single import:  <script src="nav.js"></script>  (place in <head>)
 *  No separate nav.css needed — styles are self-injected below.
 *
 *  Footer: replace existing <footer> with <div id="site-footer-placeholder"></div>
 *          or nav.js auto-appends to <body> if no placeholder exists.
 *
 * ─────────────────────────────────────────────────────────────────────────── */

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
  --serif:  'EB Garamond', Georgia, serif;
  --sans:   'Inter', sans-serif, system-ui, sans-serif;
}

body { padding-top: var(--nav-h); }

/* ── Global focus styles ── */
:focus-visible {
  outline: 2px solid #5A8050;
  outline-offset: 3px;
  border-radius: 4px;
}

/* ── Nav bar (Liquid Glass) ── */
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  height: var(--nav-h);
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 8px 32px rgba(31,38,80,.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  font-family: var(--sans);
  gap: 24px;
  isolation: isolate;
  transition: background .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.site-nav--scrolled {
  background: rgba(255,255,255,0.72);
  box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 12px 36px rgba(31,38,80,.09);
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
.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.55); box-shadow: 0 2px 10px rgba(31,38,80,.06); backdrop-filter: blur(8px); }
.nav-link.is-active { color: var(--text); }

.nav-item-with-menu { list-style: none; position: relative; }
.nav-item-with-menu.is-open .nav-link { color: var(--text); background: rgba(255,255,255,0.6); box-shadow: 0 2px 10px rgba(31,38,80,.06); }

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
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(90,128,80,0.28);
  border-radius: 20px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.nav-help:hover { background: rgba(90,128,80,0.12); border-color: rgba(90,128,80,0.48); transform: scale(1.04); box-shadow: 0 4px 16px rgba(90,128,80,.16); }

.nav-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--muted);
  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.55);
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.nav-avatar:hover { border-color: rgba(0,0,0,0.18); color: var(--text); transform: scale(1.08); }
.nav-library-btn {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--muted);
  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.55);
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.nav-library-btn:hover { border-color: rgba(0,0,0,0.18); color: var(--text); transform: scale(1.08); }

/* ── Shared panel base (Liquid Glass) ── */
.mega-menu, .mini-menu {
  position: fixed;
  top: var(--nav-h); left: 0; right: 0;
  z-index: 800;
  background: rgba(255,255,255,0.68);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.6);
  border-radius: 0 0 28px 28px;
  box-shadow: 0 24px 60px rgba(31,38,80,0.10), 0 4px 16px rgba(31,38,80,0.05), 0 1px 0 rgba(255,255,255,.6) inset;
  opacity: 0;
  transform: translateY(-8px) scale(.995);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(.2,.8,.2,1);
}
.mega-menu.is-visible, .mini-menu.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
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
.mega-cat:hover, .mega-cat.is-active { background: rgba(255,255,255,0.55); box-shadow: 0 2px 8px rgba(31,38,80,.05); }
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
.mega-sub-link:hover { color: var(--text); background: rgba(255,255,255,0.55); }
.mega-footer {
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid var(--border); margin-top: 22px; padding-top: 18px;
}
.mega-search-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 13px; background: rgba(255,255,255,0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 100px; text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease; color: var(--faint);
  font-size: 13px; font-weight: 300;
}
.mega-search-btn:hover { background: rgba(255,255,255,0.7); transform: scale(1.03); }
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
.mini-item:hover { background: rgba(255,255,255,0.55); box-shadow: 0 2px 8px rgba(31,38,80,.05); }
.mini-item__name { font-size: 13.5px; font-weight: 400; color: var(--text); letter-spacing: -0.005em; }
.mini-item__desc { font-size: 12px; font-weight: 300; color: var(--faint); line-height: 1.4; }
.mini-single-list { display: flex; flex-direction: column; gap: 2px; }
.mini-item--row { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; }
.mini-item--row .mini-item__desc { text-align: right; }
.mini-footer { display: flex; justify-content: flex-end; border-top: 1px solid var(--border); margin-top: 18px; padding-top: 16px; }

/* ── Backdrop ── */
.mega-backdrop { position: fixed; inset: 0; z-index: 700; pointer-events: none; }
.mega-backdrop.is-visible { pointer-events: all; }

/* ── Mobile hamburger ── */
.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px; height: 36px;
  border-radius: 8px;
  cursor: pointer;
  background: none; border: none;
  padding: 0;
  transition: background .14s;
  flex-shrink: 0;
}
.nav-burger:hover { background: rgba(0,0,0,.05); }
.nav-burger span {
  display: block;
  width: 18px; height: 1.5px;
  background: #1A1A1A;
  border-radius: 2px;
  transition: transform .22s ease, opacity .18s;
}
.nav-burger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-burger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-burger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile drawer (Liquid Glass) ── */
.nav-drawer {
  position: fixed;
  top: var(--nav-h); left: 0; right: 0; bottom: 0;
  z-index: 850;
  background: rgba(255,255,255,0.62);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  overflow-y: auto;
  padding: 24px 24px 48px;
  display: flex; flex-direction: column; gap: 6px;
  transform: translateY(-8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity .28s ease, transform .3s cubic-bezier(.2,.8,.2,1);
}
.nav-drawer.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}
.nav-drawer__link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  font-family: 'Inter', sans-serif, system-ui, sans-serif;
  font-size: 16px; font-weight: 400;
  color: #1A1A1A;
  text-decoration: none;
  border-radius: 16px;
  transition: background .2s ease, transform .2s ease;
}
.nav-drawer__link:hover, .nav-drawer__link:active { background: rgba(255,255,255,.6); box-shadow: 0 4px 16px rgba(31,38,80,.06); }
.nav-drawer__link svg { color: #ABABAB; }
.nav-drawer__divider {
  height: 1px;
  background: rgba(0,0,0,.07);
  margin: 8px 0;
}
.nav-drawer__help {
  display: flex; align-items: center; justify-content: center;
  margin-top: 16px;
  padding: 14px 24px;
  background: rgba(90,128,80,.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(90,128,80,.25);
  border-radius: 100px;
  font-size: 14px; font-weight: 500;
  color: #5A8050;
  text-decoration: none;
  transition: transform .2s ease, background .2s ease;
}
.nav-drawer__help:hover { transform: scale(1.02); background: rgba(90,128,80,.18); }

@media (max-width: 768px) {
  .nav-links { display: none !important; }
  .nav-help { display: none !important; }
  .nav-burger { display: flex !important; }
  .site-nav { padding: 0 20px; }
  .nav-logo { position: static; transform: none; }
}

/* ── Global Footer ── */
.site-footer {
  background: linear-gradient(160deg, #1A2D40 0%, #0E1E2C 100%);
  position: relative;
  overflow: hidden;
  padding: 48px 2.8rem 32px;
  font-family: 'Inter', sans-serif, system-ui, sans-serif;
}
.site-footer::before {
  content: '';
  position: absolute;
  width: 520px; height: 520px; border-radius: 50%;
  background: radial-gradient(circle, rgba(100,150,200,.16) 0%, transparent 65%);
  top: -160px; right: -80px;
  pointer-events: none;
}
.site-footer__inner {
  position: relative; z-index: 1;
  max-width: 1060px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.site-footer__logo {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem; letter-spacing: .12em;
  color: rgba(255,255,255,.8); text-decoration: none;
}
.site-footer__links {
  display: flex; gap: 6px; flex-wrap: wrap;
  list-style: none; margin: 0; padding: 0;
}
.site-footer__links a {
  font-size: 12px; font-weight: 400; letter-spacing: .02em;
  color: rgba(255,255,255,.38);
  padding: 4px 10px; text-decoration: none; transition: color .18s;
}
.site-footer__links a:hover { color: rgba(255,255,255,.75); }
.site-footer__links .site-footer__legal { color: rgba(255,255,255,.55); }
.site-footer__legal:hover { color: rgba(255,255,255,.9) !important; }
.site-footer__bottom {
  position: relative; z-index: 1;
  max-width: 1060px; margin: 24px auto 0;
  font-size: 11.5px; color: rgba(255,255,255,.2);
}

/* ── Cookie Banner (dark glass) ── */
.mb-cookie-banner {
  position: fixed; bottom: 24px;
  left: 50%; transform: translateX(-50%) translateY(12px);
  z-index: 850;
  background: rgba(20,25,35,.62);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  color: rgba(255,255,255,.75);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px; padding: 14px 20px;
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  max-width: 680px; width: calc(100% - 48px);
  box-shadow: 0 12px 40px rgba(0,0,0,.24), 0 1px 0 rgba(255,255,255,.08) inset;
  font-family: 'Inter', sans-serif, system-ui, sans-serif;
  font-size: 13px; line-height: 1.5;
  opacity: 0; pointer-events: none;
  transition: opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1);
}
.mb-cookie-banner.is-visible {
  opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: all;
}
.mb-cookie-banner p { margin: 0; flex: 1; min-width: 180px; }
.mb-cookie-banner a { color: #8FBC85; text-decoration: none; }
.mb-cookie-banner a:hover { text-decoration: underline; }
.mb-cookie-banner button {
  background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.16);
  color: #fff; padding: 7px 18px; border-radius: 100px;
  font-size: 12.5px; font-weight: 500; cursor: pointer;
  white-space: nowrap; font-family: inherit; flex-shrink: 0;
  transition: background .2s ease, transform .2s ease;
}
.mb-cookie-banner button:hover { background: rgba(255,255,255,.24); transform: scale(1.04); }

@media (max-width: 600px) {
  .site-footer { padding: 40px 1.4rem 28px; }
}

/* ── Atmospheric nav mode (over gradient hero) ── */
.site-nav--atm {
  background: rgba(20,45,70,.30) !important;
  backdrop-filter: blur(22px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(22px) saturate(180%) !important;
  border-bottom-color: rgba(255,255,255,.14) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.10) !important;
}
.site-nav--atm .nav-logo { color: rgba(255,255,255,.92) !important; }
.site-nav--atm .nav-link { color: rgba(255,255,255,.76) !important; }
.site-nav--atm .nav-link:hover,
.site-nav--atm .nav-item-with-menu.is-open .nav-link {
  color: #fff !important;
  background: rgba(255,255,255,.12) !important;
}
.site-nav--atm .nav-help {
  color: rgba(255,255,255,.82) !important;
  border-color: rgba(255,255,255,.24) !important;
}
.site-nav--atm .nav-help:hover {
  background: rgba(255,255,255,.12) !important;
  border-color: rgba(255,255,255,.44) !important;
}
.site-nav--atm .nav-avatar,
.site-nav--atm .nav-library-btn {
  color: rgba(255,255,255,.68) !important;
  border-color: rgba(255,255,255,.20) !important;
}
.site-nav--atm .nav-avatar:hover,
.site-nav--atm .nav-library-btn:hover {
  color: #fff !important;
  border-color: rgba(255,255,255,.40) !important;
}
.site-nav--atm .nav-burger span { background: #fff !important; }

/* ── Reduced transparency / motion fallback ── */
@media (prefers-reduced-transparency: reduce) {
  .site-nav, .mega-menu, .mini-menu, .nav-drawer, .mb-cookie-banner {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: #F8F7F4 !important;
  }
  .mb-cookie-banner { background: #1A1A1A !important; }
}
@media (prefers-reduced-motion: reduce) {
  .site-nav, .nav-link, .nav-help, .nav-avatar, .nav-library-btn, .mega-menu, .mini-menu, .nav-drawer, .nav-drawer__link, .mega-search-btn { transition: none !important; }
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
    { label: "Start",     href: "index.html" },
    { label: "Lernen",    href: "learn.html" },
    { label: "Themen",    href: "topics.html",    triggerId: "topicsTrigger",    menuId: "megaMenu" },
    { label: "Tools",     href: "tools.html",     triggerId: "toolsTrigger",     menuId: "toolsMenu" },
    { label: "Community", href: "community.html", triggerId: "communityTrigger", menuId: "communityMenu" },
    { label: "Über uns",  href: "about.html" },
  ],
};

const TOPICS_CATEGORIES = [
  { id: "self-worth",   name: "Selbstwert & Identität",   href: "topic-self-worth.html",    subtopics: ["Selbstwert", "Selbstvertrauen", "Selbstmitgefühl", "Vergleiche", "Perfektionismus", "Anerkennung", "Grenzen"] },
  { id: "anxiety",      name: "Angst & Grübeln",          href: "topic-anxiety.html",       subtopics: ["Angst", "Grübeln", "Panikattacken", "Gedankenkarussell", "Schlafprobleme", "Gedankenrasen", "Nervensystem"] },
  { id: "loneliness",   name: "Einsamkeit & Verbindung",  href: "topic-loneliness.html",    subtopics: ["Einsamkeit", "Isolation", "Ausgeschlossen fühlen", "Zugehörigkeit", "Freundschaften knüpfen", "Wieder verbinden", "Verletzlichkeit"] },
  { id: "relationships",name: "Beziehungen",              href: "topic-relationships.html", subtopics: ["Trennungen", "Dating", "Bindungsstile", "Familiendynamiken", "Freundschaftsprobleme", "Kommunikation", "Konflikte"] },
  { id: "stress",       name: "Stress & Burnout",         href: "topic-stress.html",        subtopics: ["Burnout", "Stress", "Erschöpfung", "Erholung", "Work-Life-Balance", "Überwältigung", "Regeneration"] },
  { id: "habits",       name: "Gewohnheiten & Wachstum",  href: "topic-habits.html",        subtopics: ["Gewohnheiten & Disziplin", "Sinn & Bedeutung", "Lebensrichtung", "Motivation", "Prokrastination", "Neuanfänge", "Routine"] },
  { id: "emotions",     name: "Gefühle & Resilienz",      href: "topic-emotions.html",      subtopics: ["Emotionale Überwältigung", "Trauer & Verlust", "Depression", "Innerer Kritiker", "Wut", "Scham", "Selbstmitgefühl"] },
  { id: "transitions",  name: "Lebensveränderungen",      href: "topic-transitions.html",   subtopics: ["Umzug & Ortswechsel", "Neuer Job & Studium", "Identitätskrise", "Neuanfänge", "Trauer & Verlust", "Lebensrichtung", "Neuerfindung"] },
];

const TOOLS_GROUPS = [
  { label: "Beruhigen & Erden",       items: [
    { name: "4-7-8 Breathing",  href: "tool-breathing.html",     desc: "Deine Ruhe aktivieren" },
    { name: "Thought Clouds",   href: "tool-clouds.html",         desc: "Gedanken ziehen lassen" },
    { name: "Difficult Days",   href: "tool-difficult-days.html", desc: "Ein Begleiter für schwere Momente" },
  ]},
  { label: "Reflektieren & Erkennen", items: [
    { name: "Thought Mirror",   href: "tool-thought-mirror.html", desc: "Hilfloses Denken umstrukturieren" },
    { name: "Emotion Wheel",    href: "tool-emotion-wheel.html",  desc: "Benenne, was du fühlst" },
    { name: "Values Clarifier", href: "tool-values.html",         desc: "Finde, was dir wichtig ist" },
  ]},
  { label: "Handeln & Vorbereiten",   items: [
    { name: "Boundary Builder", href: "tool-boundaries.html",     desc: "Ein schwieriges Gespräch vorbereiten" },
    { name: "Circle of Control",href: "tool-control.html",        desc: "Fokus auf das, was du ändern kannst" },
    { name: "Prepare Flow",     href: "tool-prepare.html",        desc: "Vorbereiten, was kommt" },
  ]},
];

const COMMUNITY_ITEMS = [
  { name: "Alle Beiträge",       href: "community.html",       desc: "Den Community-Feed entdecken" },
  { name: "Prompt Room",         href: "prompt-room.html",     desc: "Tägliche Reflexionsfragen" },
  { name: "Deine Geschichte",    href: "community.html#share", desc: "Schreibe und teile deine Erfahrung" },
  { name: "Am hilfreichsten",    href: "community.html#top",   desc: "Beiträge, die am meisten bewegt haben" },
];


// ─── 3. HTML builders ─────────────────────────────────────────────────────────

function toSlug(str) {
  return str.toLowerCase().replace(/[&]/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildTopicsMegaMenu() {
  return `
<div class="mega-menu" id="megaMenu" role="dialog" aria-label="Themen-Menü">
  <div class="mega-menu__inner">
    <div class="mega-left">
      <span class="mega-label">Nach Thema stöbern</span>
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
          <span>Themen suchen …</span>
        </a>
        <a href="topics.html" class="mega-all-link">
          Alle Themen
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
        Alle Tools
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
      <li><a href="topics.html">Themen</a></li>
      <li><a href="learn.html">Lernen</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="community.html">Community</a></li>
      <li><a href="about.html">Über uns</a></li>
      <li><a href="help.html">Soforthilfe</a></li>
      <li><a href="legal.html" class="site-footer__legal">Impressum &amp; Datenschutz</a></li>
    </ul>
  </div>
  <div class="site-footer__bottom">
    <p>&copy; 2026 Mindbloom &nbsp;&middot;&nbsp; Ein Raum für deinen Kopf &nbsp;&middot;&nbsp; Kein Ersatz f&uuml;r professionelle Hilfe &nbsp;&middot;&nbsp; Telefonseelsorge: <strong style="color:rgba(255,255,255,.4)">0800 111 0 111</strong></p>
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

  const drawerLinksHTML = NAV_CONFIG.links.map(link =>
    `<a href="${link.href}" class="nav-drawer__link">
      <span>${link.label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </a>`
  ).join('');

  placeholder.outerHTML = `
<nav class="site-nav" id="siteNav">
  <ul class="nav-links">
    ${linksHTML}
  </ul>
  <a href="${NAV_CONFIG.logo.href}" class="nav-logo">${NAV_CONFIG.logo.label}</a>
  <div class="nav-right">
    <a href="${NAV_CONFIG.helpHref}" class="nav-help">${NAV_CONFIG.helpLabel}</a>
    <a href="library.html" class="nav-library-btn" aria-label="Meine Bibliothek" title="Meine Bibliothek">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    </a>
    <a href="${NAV_CONFIG.profileHref}" class="nav-avatar" aria-label="Profil">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </a>
    <button class="nav-burger" id="navBurger" aria-label="Menü" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-drawer" id="navDrawer" aria-hidden="true">
  ${drawerLinksHTML}
  <div class="nav-drawer__divider"></div>
  <a href="${NAV_CONFIG.helpHref}" class="nav-drawer__help">${NAV_CONFIG.helpLabel}</a>
</div>
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
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAll(); closeMobileDrawer(); } });

  // Mobile hamburger
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("navDrawer");

  function closeMobileDrawer() {
    if (!drawer) return;
    burger?.classList.remove("is-open");
    burger?.setAttribute("aria-expanded", "false");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  burger?.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) {
      closeMobileDrawer();
    } else {
      burger.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeAll();
    }
  });

  // Close drawer on link click
  drawer?.querySelectorAll(".nav-drawer__link, .nav-drawer__help").forEach(link => {
    link.addEventListener("click", closeMobileDrawer);
  });

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


// ─── 6. Atmospheric nav (transparent over gradient hero) ─────────────────────

function initAtmNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav || !document.body.classList.contains('atm-hero')) return;

  nav.classList.add('site-nav--atm');

  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      nav.classList.toggle('site-nav--atm', heroBottom > 0);
      ticking = false;
    });
  }, { passive: true });
}


// ─── 6b. Scroll reaction (glass nav deepens slightly once page scrolls) ──────

function initScrollNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  let ticking = false;
  function update() {
    nav.classList.toggle('site-nav--scrolled', window.scrollY > 8);
    ticking = false;
  }
  update();
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
}


// ─── 7. Init ──────────────────────────────────────────────────────────────────

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => { buildNav(); initAtmNav(); initScrollNav(); });
} else {
  buildNav();
  initAtmNav();
  initScrollNav();
}

// ─── 7. bfcache (Safari Back/Forward) ────────────────────────────────────────

window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  injectNavCSS();
  if (!document.querySelector('.site-nav')) {
    _navInitDone = false;
    buildNav();
  } else {
    closeAllMenus();
    const drawer = document.getElementById('navDrawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    const burger = document.getElementById('navBurger');
    if (burger) burger.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
