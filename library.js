/* library.js — Mindbloom Personal Library
 * Data layer, save buttons, toast.
 * Types: article | card | tool | prompt | reflection
 * ('insight' is a legacy alias for 'card', kept for backward compat)
 *
 * Public API:
 *   MBLibrary.get()                 → all saved items (normalized)
 *   MBLibrary.save(item)            → save any item
 *   MBLibrary.remove(id)
 *   MBLibrary.isSaved(id)
 *   MBLibrary.createButton(data)    → save button (card / tool / prompt)
 *   MBLibrary.createArticleButton(data) → article save button
 *   MBLibrary.showToast(msg)
 *   MBLibrary.injectStyles()
 */
(function () {
  'use strict';

  var KEY = 'mb_library_v1';

  // ── Storage ───────────────────────────────────────────────────────────────────

  function normalizeType(t) {
    if (!t || t === 'insight') return 'card';
    return t;
  }

  function normalizeItem(item) {
    return item.type === 'insight'
      ? Object.assign({}, item, { type: 'card' })
      : item;
  }

  function getAll() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      return raw.map(normalizeItem);
    } catch (e) { return []; }
  }

  function saveItem(item) {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (raw.find(function(i) { return i.id === item.id; })) return;
      raw.unshift({
        id:        item.id,
        type:      normalizeType(item.type),
        cardType:  item.cardType  || null,
        title:     item.title     || '',
        text:      item.text      || '',
        source:    item.source    || '',
        sourceUrl: item.sourceUrl || '',
        savedAt:   new Date().toISOString()
      });
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch (e) {}
  }

  function removeItem(id) {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      localStorage.setItem(KEY, JSON.stringify(raw.filter(function(i) { return i.id !== id; })));
    } catch (e) {}
  }

  function isSaved(id) {
    return getAll().some(function(i) { return i.id === id; });
  }

  // ── Styles ────────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('mb-lib-css')) return;
    var s = document.createElement('style');
    s.id = 'mb-lib-css';
    s.textContent = [
      /* Inline save button (cards, blockquotes, prompts) */
      '.mb-save-wrap{display:flex;justify-content:flex-end;margin-top:.75rem;}',
      '.mb-save-btn{display:inline-flex;align-items:center;gap:5px;',
        'font-size:11.5px;font-weight:400;color:var(--faint,#ABABAB);',
        'background:none;border:none;cursor:pointer;padding:4px 2px;',
        'font-family:inherit;transition:color .18s;line-height:1;}',
      '.mb-save-btn:hover{color:var(--muted,#6B6B6B);}',
      '.mb-save-btn.mb-saved{color:var(--sage,#5A8050);}',
      '.mb-save-btn svg{flex-shrink:0;vertical-align:middle;}',

      /* Article save button — pill shape in article header */
      '.mb-article-save-wrap{margin-top:.75rem;margin-bottom:.25rem;}',
      '.mb-article-save{display:inline-flex;align-items:center;gap:6px;',
        'font-size:12px;font-weight:400;color:var(--faint,#ABABAB);',
        'background:none;border:1px solid rgba(0,0,0,.1);',
        'border-radius:100px;padding:5px 13px;cursor:pointer;',
        'font-family:inherit;transition:color .18s,border-color .18s,background .18s;}',
      '.mb-article-save:hover{color:var(--muted,#6B6B6B);border-color:rgba(0,0,0,.18);}',
      '.mb-article-save.mb-saved{color:var(--sage,#5A8050);',
        'border-color:rgba(90,128,80,.28);background:rgba(90,128,80,.05);}',
      '.mb-article-save svg{flex-shrink:0;}',

      /* Toast */
      '.mb-toast{position:fixed;bottom:1.6rem;right:1.6rem;',
        'background:#1A1A1A;color:#fff;border-radius:12px;',
        'padding:10px 16px;font-size:13px;font-weight:300;',
        'font-family:inherit;',
        'display:flex;align-items:center;gap:10px;z-index:9999;',
        'box-shadow:0 8px 32px rgba(0,0,0,.22);',
        'animation:mbTIn .26s cubic-bezier(.4,0,.2,1) forwards;}',
      '.mb-toast.mb-out{animation:mbTOut .26s cubic-bezier(.4,0,.2,1) forwards;}',
      '.mb-toast-icon{flex-shrink:0;}',
      '.mb-toast a{color:rgba(255,255,255,.55);text-decoration:none;font-size:12px;',
        'margin-left:2px;border-bottom:1px solid rgba(255,255,255,.2);transition:color .15s;}',
      '.mb-toast a:hover{color:#fff;}',
      '@keyframes mbTIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
      '@keyframes mbTOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(6px)}}'
    ].join('');
    document.head.appendChild(s);
  }

  // ── Toast ─────────────────────────────────────────────────────────────────────

  var _toastTimer = null;

  function showToast(msg) {
    var existing = document.getElementById('mb-toast-el');
    if (existing) { existing.remove(); clearTimeout(_toastTimer); }
    var t = document.createElement('div');
    t.id = 'mb-toast-el';
    t.className = 'mb-toast';
    t.innerHTML =
      '<svg class="mb-toast-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A8050" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      '<span>' + (msg || 'Saved') + '</span>' +
      '<a href="library.html">Library →</a>';
    document.body.appendChild(t);
    _toastTimer = setTimeout(function () {
      t.classList.add('mb-out');
      setTimeout(function () { if (t.parentNode) t.remove(); }, 270);
    }, 2800);
  }

  // ── SVGs ──────────────────────────────────────────────────────────────────────

  var SVG_BOOKMARK_EMPTY =
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
  var SVG_BOOKMARK_FILLED =
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';

  // ── Generic save button (cards / tools / prompts) ──────────────────────────

  function createButton(itemData) {
    var saved = isSaved(itemData.id);
    var btn = document.createElement('button');
    btn.className = 'mb-save-btn' + (saved ? ' mb-saved' : '');
    btn.setAttribute('type', 'button');
    btn.innerHTML = (saved ? SVG_BOOKMARK_FILLED : SVG_BOOKMARK_EMPTY) +
                    '<span>' + (saved ? 'Saved' : 'Save') + '</span>';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isSaved(itemData.id)) {
        removeItem(itemData.id);
        btn.classList.remove('mb-saved');
        btn.innerHTML = SVG_BOOKMARK_EMPTY + '<span>Save</span>';
      } else {
        saveItem(itemData);
        btn.classList.add('mb-saved');
        btn.innerHTML = SVG_BOOKMARK_FILLED + '<span>Saved</span>';
        var label = itemData.type === 'tool' ? 'Tool' :
                    itemData.type === 'prompt' ? 'Prompt' : 'Card';
        showToast(label + ' saved.');
      }
    });
    return btn;
  }

  // ── Article save button (pill style) ──────────────────────────────────────

  function createArticleButton(itemData) {
    var saved = isSaved(itemData.id);
    var btn = document.createElement('button');
    btn.className = 'mb-article-save' + (saved ? ' mb-saved' : '');
    btn.setAttribute('type', 'button');
    btn.innerHTML = (saved ? SVG_BOOKMARK_FILLED : SVG_BOOKMARK_EMPTY) +
                    '<span>' + (saved ? 'Saved to Library' : 'Save Article') + '</span>';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isSaved(itemData.id)) {
        removeItem(itemData.id);
        btn.classList.remove('mb-saved');
        btn.innerHTML = SVG_BOOKMARK_EMPTY + '<span>Save Article</span>';
      } else {
        saveItem(Object.assign({}, itemData, { type: 'article' }));
        btn.classList.add('mb-saved');
        btn.innerHTML = SVG_BOOKMARK_FILLED + '<span>Saved to Library</span>';
        showToast('Article saved to your Library.');
      }
    });
    return btn;
  }

  // ── Page helpers ──────────────────────────────────────────────────────────────

  function getPageSource() {
    return (document.title || '').replace(/^Mindbloom\s*[—–-]\s*/, '').trim();
  }

  function getPageUrl() {
    return window.location.pathname.split('/').pop() || '';
  }

  // ── Card type detection ────────────────────────────────────────────────────────

  function detectCardType(box) {
    if (!box) return 'reminder';
    var cls = box.className || '';
    if (cls.indexOf('journal-box') !== -1) return 'prompt';
    if (cls.indexOf('tip-box') !== -1) return 'reminder';
    if (cls.indexOf('script-box') !== -1) {
      var html = box.innerHTML || '';
      var text = box.textContent || '';
      var labelEl = box.querySelector('.box-label');
      var lt = labelEl ? labelEl.textContent.toLowerCase() : '';
      if (/statt\s*:|instead of|sag lieber/i.test(html)) return 'script';
      if (/skript|script/i.test(lt)) return 'script';
      if (/frag|question/i.test(lt)) return 'prompt';
      if (/routine|technik|übung|exercise|technique|try this/i.test(lt)) return 'technique';
      if (/^\s*\d+\./m.test(text)) return 'technique';
      return 'reminder';
    }
    return 'reminder';
  }

  // ── Auto-inject on article pages ──────────────────────────────────────────────

  function injectArticleButtons() {
    var source    = getPageSource();
    var sourceUrl = getPageUrl();
    var pageId    = sourceUrl.replace(/\.\w+$/, '');

    // Save Article button — after read-time span
    var readTimeEl = document.querySelector('.read-time');
    if (readTimeEl && !document.getElementById('mb-article-save')) {
      var h1El      = document.querySelector('article h1');
      var excerptEl = document.querySelector('article p');
      var wrap = document.createElement('div');
      wrap.className = 'mb-article-save-wrap';
      var artBtn = createArticleButton({
        id:        'article-' + pageId,
        type:      'article',
        title:     h1El      ? h1El.textContent.trim()              : source,
        text:      excerptEl ? excerptEl.textContent.trim().slice(0, 280) : '',
        source:    source,
        sourceUrl: sourceUrl
      });
      artBtn.id = 'mb-article-save';
      wrap.appendChild(artBtn);
      readTimeEl.parentNode.insertBefore(wrap, readTimeEl.nextSibling);
    }

    // .script-box, .journal-box, .tip-box → type: card
    var boxes = document.querySelectorAll('.script-box, .journal-box, .tip-box');
    for (var b = 0; b < boxes.length; b++) {
      var box     = boxes[b];
      if (box.querySelector('.mb-save-wrap')) continue;
      var labelEl = box.querySelector('.box-label');
      var textEl  = box.querySelector('p, ul, li');
      var title   = (labelEl ? labelEl.textContent.trim() : '') || source;
      var text    = textEl ? textEl.textContent.trim().slice(0, 320) : '';
      var cardType = detectCardType(box);
      var wrap = document.createElement('div');
      wrap.className = 'mb-save-wrap';
      wrap.appendChild(createButton({
        id:        'card-box-' + pageId + '-' + b,
        type:      'card',
        cardType:  cardType,
        title:     title,
        text:      text,
        source:    source,
        sourceUrl: sourceUrl
      }));
      box.appendChild(wrap);
    }

    // Blockquotes inside <article> → type: card
    var quotes = document.querySelectorAll('article blockquote');
    for (var q = 0; q < quotes.length; q++) {
      var bq   = quotes[q];
      if (bq.nextSibling && bq.nextSibling.classList && bq.nextSibling.classList.contains('mb-save-wrap')) continue;
      var bqText = bq.textContent.trim();
      if (!bqText || bqText.length < 20) continue;
      var wrap = document.createElement('div');
      wrap.className = 'mb-save-wrap';
      wrap.appendChild(createButton({
        id:        'card-quote-' + pageId + '-' + q,
        type:      'card',
        cardType:  'quote',
        title:     bqText.slice(0, 90),
        text:      bqText,
        source:    source,
        sourceUrl: sourceUrl
      }));
      bq.parentNode.insertBefore(wrap, bq.nextSibling);
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────────

  function autoInit() {
    injectStyles();
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
    get:                getAll,
    save:               saveItem,
    remove:             removeItem,
    isSaved:            isSaved,
    createButton:       createButton,
    createArticleButton: createArticleButton,
    showToast:          showToast,
    injectStyles:       injectStyles
  };

})();
