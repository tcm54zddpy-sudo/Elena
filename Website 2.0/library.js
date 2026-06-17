/* library.js — Mindbloom Personal Library
 * Shared module: data layer, Save Insight button, toast.
 * Auto-injects save buttons on article pages (.script-box, .journal-box, blockquote).
 * For list pages: consumed by list-page.js via MBLibrary.createButton().
 * For profile: data exposed via MBLibrary.get() / .remove().
 */
(function () {
  'use strict';

  var KEY = 'mb_library_v1';

  // ── Styles ───────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('mb-lib-css')) return;
    var s = document.createElement('style');
    s.id = 'mb-lib-css';
    s.textContent = [
      /* Save Insight button */
      '.mb-save-wrap{display:flex;justify-content:flex-end;margin-top:.75rem;}',
      '.mb-save-btn{display:inline-flex;align-items:center;gap:5px;',
        'font-size:11.5px;font-weight:400;color:var(--faint,#ABABAB);',
        'background:none;border:none;cursor:pointer;padding:4px 2px;',
        'font-family:var(--sans,"Mulish",sans-serif);transition:color .18s;',
        'line-height:1;}',
      '.mb-save-btn:hover{color:var(--muted,#6B6B6B);}',
      '.mb-save-btn.mb-saved{color:var(--sage,#5A8050);}',
      '.mb-save-btn svg{flex-shrink:0;vertical-align:middle;}',

      /* Toast */
      '.mb-toast{position:fixed;bottom:1.6rem;right:1.6rem;',
        'background:#1A1A1A;color:#fff;border-radius:12px;',
        'padding:10px 16px;font-size:13px;font-weight:300;',
        'font-family:var(--sans,"Mulish",sans-serif);',
        'display:flex;align-items:center;gap:10px;z-index:9999;',
        'box-shadow:0 8px 32px rgba(0,0,0,.22);',
        'animation:mbTIn .26s cubic-bezier(.4,0,.2,1) forwards;}',
      '.mb-toast.mb-out{animation:mbTOut .26s cubic-bezier(.4,0,.2,1) forwards;}',
      '.mb-toast a{color:rgba(255,255,255,.6);text-decoration:none;',
        'font-size:12px;margin-left:4px;',
        'border-bottom:1px solid rgba(255,255,255,.25);transition:color .15s;}',
      '.mb-toast a:hover{color:#fff;}',
      '@keyframes mbTIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
      '@keyframes mbTOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(6px)}}'
    ].join('');
    document.head.appendChild(s);
  }

  // ── Storage ───────────────────────────────────────────────────────────────────

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveItem(item) {
    var items = getAll();
    if (items.find(function(i) { return i.id === item.id; })) return;
    items.unshift({
      id:        item.id,
      type:      item.type      || 'insight',
      title:     item.title     || '',
      text:      item.text      || '',
      source:    item.source    || '',
      sourceUrl: item.sourceUrl || '',
      savedAt:   new Date().toISOString()
    });
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function removeItem(id) {
    localStorage.setItem(KEY, JSON.stringify(getAll().filter(function(i) { return i.id !== id; })));
  }

  function isSaved(id) {
    return getAll().some(function(i) { return i.id === id; });
  }

  // ── Toast ─────────────────────────────────────────────────────────────────────

  var toastTimer = null;
  function showToast(msg) {
    var existing = document.getElementById('mb-toast-el');
    if (existing) { existing.remove(); clearTimeout(toastTimer); }
    var t = document.createElement('div');
    t.id = 'mb-toast-el';
    t.className = 'mb-toast';
    t.innerHTML =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A8050" stroke-width="2.2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      (msg || 'Saved') +
      '<a href="library.html">View Library →</a>';
    document.body.appendChild(t);
    toastTimer = setTimeout(function() {
      t.classList.add('mb-out');
      setTimeout(function() { if (t.parentNode) t.remove(); }, 270);
    }, 2800);
  }

  // ── Button ────────────────────────────────────────────────────────────────────

  var SVG_UNSAVED =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
  var SVG_SAVED =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';

  function createButton(itemData) {
    var saved = isSaved(itemData.id);
    var btn = document.createElement('button');
    btn.className = 'mb-save-btn' + (saved ? ' mb-saved' : '');
    btn.setAttribute('type', 'button');
    btn.innerHTML = (saved ? SVG_SAVED : SVG_UNSAVED) + '<span>' + (saved ? 'Saved' : 'Save Insight') + '</span>';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (isSaved(itemData.id)) {
        removeItem(itemData.id);
        btn.classList.remove('mb-saved');
        btn.innerHTML = SVG_UNSAVED + '<span>Save Insight</span>';
      } else {
        saveItem(itemData);
        btn.classList.add('mb-saved');
        btn.innerHTML = SVG_SAVED + '<span>Saved</span>';
        showToast('Insight saved to your Library.');
      }
    });
    return btn;
  }

  // ── Auto-inject on article pages ──────────────────────────────────────────────

  function getPageSource() {
    return (document.title || '').replace(/^Mindbloom\s*[—–-]\s*/, '').trim();
  }

  function getPageUrl() {
    return window.location.pathname.split('/').pop() || '';
  }

  function injectArticleButtons() {
    var source    = getPageSource();
    var sourceUrl = getPageUrl();

    // .script-box and .journal-box
    var boxes = document.querySelectorAll('.script-box, .journal-box');
    for (var b = 0; b < boxes.length; b++) {
      var box      = boxes[b];
      var labelEl  = box.querySelector('.box-label');
      var textEl   = box.querySelector('p, ul, li');
      var title    = (labelEl ? labelEl.textContent.trim() : '') || source;
      var text     = textEl ? textEl.textContent.trim().slice(0, 320) : '';
      var id       = 'art-box-' + sourceUrl.replace(/\.\w+$/, '') + '-' + b;

      var wrap = document.createElement('div');
      wrap.className = 'mb-save-wrap';
      wrap.appendChild(createButton({ id: id, type: 'insight', title: title, text: text, source: source, sourceUrl: sourceUrl }));
      box.appendChild(wrap);
    }

    // Blockquotes inside <article>
    var quotes = document.querySelectorAll('article blockquote');
    for (var q = 0; q < quotes.length; q++) {
      var bq   = quotes[q];
      var text = bq.textContent.trim();
      if (!text || text.length < 20) continue;
      var id   = 'art-quote-' + sourceUrl.replace(/\.\w+$/, '') + '-' + q;

      var wrap = document.createElement('div');
      wrap.className = 'mb-save-wrap';
      wrap.appendChild(createButton({ id: id, type: 'insight', title: text.slice(0, 90), text: text, source: source, sourceUrl: sourceUrl }));
      bq.parentNode.insertBefore(wrap, bq.nextSibling);
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────────

  function autoInit() {
    injectStyles();
    // Only auto-inject on article pages
    if (document.querySelector('.article-wrapper')) {
      injectArticleButtons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // ── Public API ────────────────────────────────────────────────────────────────

  window.MBLibrary = {
    get:          getAll,
    save:         saveItem,
    remove:       removeItem,
    isSaved:      isSaved,
    createButton: createButton,
    showToast:    showToast,
    injectStyles: injectStyles
  };

})();
