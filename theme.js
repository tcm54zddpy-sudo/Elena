/* Mindbloom – Dark Mode
   Lädt im <head> und läuft synchron VOR dem ersten Rendern, damit die Seite
   nicht kurz hell aufblitzt. Priorität: gespeicherte Wahl → System-Präferenz → hell.
   Farbschema: Dunkelblau (#2A3141 → #2F3A4C). */
(function () {
  function saved() { try { return localStorage.getItem('mb-theme'); } catch (e) { return null; } }
  function apply(t) { document.documentElement.dataset.theme = t; }

  apply(saved() || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (window.matchMedia) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!saved()) apply(e.matches ? 'dark' : 'light');
    });
  }

  window.mbToggleTheme = function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('mb-theme-anim');
    apply(next);
    try { localStorage.setItem('mb-theme', next); } catch (e) {}
    setTimeout(function () { document.documentElement.classList.remove('mb-theme-anim'); }, 350);
  };

  if (document.getElementById('mb-theme-css')) return;
  var style = document.createElement('style');
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

/* ── Umschalt-Button + Navigation im Dark Mode ── */
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

/* ── shared.css / "Liquid Glass" — Dark-Mode-Anpassungen ──
   shared.css setzt viele Flächen mit !important und fixen hellen Farben.
   Variablen-basierte umfärben wir zentral, fixe per !important-Override. */
html[data-theme="dark"] {
  --g-atm-hero: linear-gradient(160deg, #2C3648 0%, #2A3141 45%, #303A4C 100%);
  --g-dawn:     linear-gradient(160deg, #2A3141 0%, #2D3142 45%, #313848 100%);
  --glass-bg:        rgba(255,255,255,.07);
  --glass-bg-hover:  rgba(255,255,255,.11);
  --glass-bg-soft:   rgba(255,255,255,.05);
  --glass-border:    rgba(255,255,255,.14);
  --glass-border-hi: rgba(255,255,255,.22);
  --glass-shadow:       0 8px 30px rgba(0,0,0,.34), 0 2px 8px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.08);
  --glass-shadow-hover: 0 18px 48px rgba(0,0,0,.44), 0 4px 14px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.12);
  --shadow:    0 2px 8px rgba(0,0,0,.30), 0 1px 2px rgba(0,0,0,.20);
  --shadow-md: 0 8px 32px rgba(0,0,0,.40), 0 2px 8px rgba(0,0,0,.24);
}
html[data-theme="dark"] body {
  background-color: #2A3141 !important;
  background-image:
    radial-gradient(ellipse 60vw 50vh at 12% -8%, rgba(70,95,130,.40), transparent 60%),
    radial-gradient(ellipse 55vw 55vh at 105% 8%, rgba(95,80,110,.34), transparent 60%),
    radial-gradient(ellipse 50vw 45vh at 20% 105%, rgba(60,90,105,.32), transparent 60%) !important;
}
html[data-theme="dark"] .section--tint-sage  { background: rgba(159,194,216,.09) !important; }
html[data-theme="dark"] .section--tint-dusk  { background: rgba(196,188,221,.09) !important; }
html[data-theme="dark"] .section--tint-amber { background: rgba(219,205,178,.09) !important; }
html[data-theme="dark"] .section--tint-blush { background: rgba(220,194,204,.09) !important; }
`;
  (document.head || document.documentElement).appendChild(style);
})();
