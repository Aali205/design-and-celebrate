/* Visit counts and the feedback button.
   Anonymous on purpose: a random visitor id, the page, where the visit came from, what was tapped, what went into the cart and what was
   ordered (items, total, city, code: never a name, phone or address). Events are batched and sent with sendBeacon to the Google Apps Script
   in tools/analytics (it writes them to Ali's Google Sheet and serves his private dashboard). With no DC.TRACK_URL nothing is sent
   and there is no feedback button. */
(() => {
  const END = DC.TRACK_URL;
  const world = document.body.dataset.world || 'home';
  const page = location.pathname.split('/').pop() || 'index.html';
  const keep = (s, k, make) => { try { let v = s.getItem(k); if (!v) { v = make(); s.setItem(k, v); } return v; } catch(e) { return make(); } };
  const rid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  const vid = keep(localStorage, 'dc-vid', rid), sid = keep(sessionStorage, 'dc-sid', rid);
  const clip = (t, n) => String(t || '').replace(/\s+/g, ' ').trim().slice(0, n);

  let q = [];
  function send(events){
    if (!END || !events.length) return;
    const body = JSON.stringify({v:vid, s:sid, p:page, e:events});
    try { if (!navigator.sendBeacon(END, new Blob([body], {type:'text/plain;charset=utf-8'}))) throw 0; }
    catch(e) { try { fetch(END, {method:'POST', body, mode:'no-cors', keepalive:true}); } catch(_) {} }
  }
  const flush = () => { send(q); q = []; };
  const ev = (t, d) => { if (!END) return; q.push([t, Date.now(), d || {}]); if (q.length >= 40) flush(); };
  setInterval(() => q.length && flush(), 20000);

  // ---------- where the visit came from (only on arrival from outside) ----------
  function source(){
    const p = new URLSearchParams(location.search), r = document.referrer;
    if (p.get('code')) return 'QR: ' + p.get('code').toUpperCase();
    if (p.get('utm_source')) return clip(p.get('utm_source'), 30).toLowerCase();
    if (p.has('fbclid')) return 'facebook';
    if (p.has('igsh') || p.has('igshid')) return 'instagram';
    if (!r) return 'direct';
    let h = ''; try { h = new URL(r).hostname; } catch(e) {}
    if (h === location.hostname) return '';
    for (const [k, re] of [['instagram', /instagram/], ['facebook', /facebook|fb\.|messenger/], ['whatsapp', /whatsapp|wa\.me/], ['google', /google\./], ['tiktok', /tiktok/]])
      if (re.test(h)) return k;
    return h || 'direct';
  }
  ev('view', {src:source(), dev:/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop', w:innerWidth});

  // ---------- what gets tapped (buttons and links only; nothing typed is ever read) ----------
  const titleOf = el => { const c = el.closest('.p-card, .card, .sz, .bxt, .tile, .q-card'); return c ? clip((c.querySelector('h3') || {}).textContent, 40) : ''; };
  document.addEventListener('click', e => {
    const el = e.target.closest('a, button, summary, [data-track]');
    if (!el || el.closest('.fb-dlg')) return;
    const h3 = el.matches('a') && el.querySelector('h3');
    const name = clip(el.dataset.track || el.getAttribute('aria-label') || (h3 && h3.textContent) || el.textContent, 50) || clip(el.getAttribute('href'), 50);
    const ctx = titleOf(el);
    ev('click', {l:ctx && !name.includes(ctx) ? `${name} · ${ctx}` : name});
  }, true);

  // ---------- cart, orders, codes (announced by shop.js) ----------
  document.addEventListener('dc:add', e => { const d = e.detail; ev('add', {w:d.w, id:d.id, name:clip(d.name, 60), opt:clip(d.opt, 40), price:d.price}); });
  document.addEventListener('dc:code', e => ev('code', {code:e.detail.code}));
  document.addEventListener('dc:order', e => {
    const d = e.detail;
    ev('order', {via:d.via, total:d.total, code:d.code || '', city:d.city, lines:d.lines.map(l => ({w:l.w, name:clip(l.name, 60), opt:clip(l.opt, 40), q:l.q, price:l.price}))});
    flush();   // WhatsApp is about to take over the screen
  });

  // ---------- how far down and how long (sent when the page is hidden) ----------
  let maxScroll = 0, shownAt = Date.now(), ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false;
      const h = document.documentElement.scrollHeight - innerHeight;
      maxScroll = Math.max(maxScroll, h > 0 ? Math.round(scrollY / h * 100) : 100); });
  }, {passive:true});
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      ev('leave', {s:Math.round((Date.now() - shownAt) / 1000), sc:Math.min(100, maxScroll)}); flush();
    } else shownAt = Date.now();
  });
  addEventListener('pagehide', flush);

  // ---------- where people try to copy or screenshot (copying itself is blocked by shop.js) ----------
  const where = el => {
    const t = el && el.closest ? titleOf(el) : ''; if (t) return t;
    const s = el && el.closest && el.closest('section, header, footer, dialog');
    const h = s && s.querySelector('h1, h2, h3');
    return clip(h ? (h.innerText || h.textContent) : (s && (s.id || s.getAttribute('aria-label'))) || 'الصفحة', 50);
  };
  const seen = new Set();
  const block = (k, el) => { const l = where(el); if (seen.has(k + l)) return; seen.add(k + l); ev('block', {k, l}); };
  const field = t => t && t.closest && t.closest('input, textarea, select, [contenteditable]');
  document.addEventListener('copy', e => field(e.target) || block('copy', document.getSelection().anchorNode?.parentElement || e.target), true);
  document.addEventListener('contextmenu', e => field(e.target) || block('menu', e.target), true);
  // a screenshot can only be noticed on a computer keyboard (Print Screen, Mac ⌘⇧3/4/5); phones never tell a website
  const middle = () => document.elementFromPoint(innerWidth / 2, innerHeight / 2);
  document.addEventListener('keyup', e => { if (e.key === 'PrintScreen') block('shot', middle()); });
  document.addEventListener('keydown', e => { if (e.metaKey && e.shiftKey && /^[345]$/.test(e.key)) block('shot', middle()); });

  // ---------- feedback: a small button in the corner and a dialog (only once the Sheet is connected) ----------
  if (!END) return;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'fb-btn';
  btn.innerHTML = (window.DCQandil ? `<span class="fb-q" aria-hidden="true">${DCQandil(world)}</span>` : '') + '<span>رأيك؟</span>';
  btn.setAttribute('aria-haspopup', 'dialog');
  const dlg = document.createElement('dialog');
  dlg.className = 'fb-dlg'; dlg.setAttribute('aria-labelledby', 'fbTitle');
  dlg.innerHTML = `<form class="fb-in" novalidate>
      <button class="x" type="button" data-fb-close aria-label="إغلاق">×</button>
      <h3 id="fbTitle">شو رأيك بـ <span class="latin">D&amp;S</span>؟</h3>
      <p class="fb-sub">رأيك بيوصلنا مباشرة، وبيساعدنا نحسّن.</p>
      <div class="fb-stars" role="radiogroup" aria-label="تقييمك من خمسة">${[1,2,3,4,5].map(n =>
        `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${DC.ar(n)} من ٥">★</button>`).join('')}</div>
      <label>شو عجبك؟ شو بدك نزيد أو نصلّح؟<textarea id="fbMsg" maxlength="600" rows="4"></textarea></label>
      <label>رقمك أو إنستغرامك <small>(إذا بدك نرد عليك، مو ضروري)</small><input id="fbWho" maxlength="60" autocomplete="tel"></label>
      <p class="err" id="fbErr" hidden></p>
      <button class="btn solid" type="submit">ابعت رأيك</button>
    </form>
    <div class="fb-done" hidden>${window.DCQandil ? `<span class="fb-q-big" aria-hidden="true">${DCQandil(world)}</span>` : ''}<b>شكراً كتير!</b><p>رأيك وصل، ومنقرا كل كلمة.</p><button class="btn ghost" type="button" data-fb-close>سكّر</button></div>`;
  document.body.append(btn, dlg);
  let stars = 0;
  const $ = s => dlg.querySelector(s);
  const paint = () => dlg.querySelectorAll('[data-n]').forEach(b => { const on = +b.dataset.n <= stars; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(+b.dataset.n === stars)); });
  btn.addEventListener('click', () => { $('.fb-in').hidden = false; $('.fb-done').hidden = true; $('#fbErr').hidden = true; dlg.showModal(); });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-fb-close]')) return dlg.close();
    const s = e.target.closest('[data-n]'); if (s) { stars = +s.dataset.n; paint(); }
  });
  $('.fb-in').addEventListener('submit', e => {
    e.preventDefault();
    const msg = clip($('#fbMsg').value, 600), who = clip($('#fbWho').value, 60);
    if (!stars && !msg) { $('#fbErr').textContent = 'اختار نجوم أو اكتبلنا كلمتين.'; $('#fbErr').hidden = false; return; }
    send([['feedback', Date.now(), {stars, msg, contact:who}]]);
    $('#fbMsg').value = ''; $('#fbWho').value = ''; stars = 0; paint();
    $('.fb-in').hidden = true; $('.fb-done').hidden = false;
  });
})();
