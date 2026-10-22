/* Design & Celebrate: the shared shop layer every page loads.
   - one cart for all worlds (localStorage "dc-cart"), so it follows the visitor from page to page
   - discount codes (also from a QR link: page.html?code=CAFE-DEMO)
   - the WhatsApp order message, the footer and the worlds bar
   Pages call DC.renderGrid(...) for their products, or DC.add(...) directly. */
(() => {
  // ====== settings the shop owner edits ======
  const WA_NUMBER = '963900000000';          // WhatsApp number, digits only with country code
  const PHONE = '+963 900 000 000';
  const IG = 'design.celebrate';             // Instagram / Facebook handle
  // Discount codes. pct = percent off. w = only items from these worlds (leave it out for the whole cart).
  // venue = the café / clinic that handed out the QR code; the order message then says where the customer came from.
  // Codes are checked in the browser only, so confirm the discount when you answer on WhatsApp.
  const CODES = {
    'WELCOME10': {pct:10, label:'خصم أول طلب'},
    'RAMADAN15': {pct:15, w:['ramadan'], label:'خصم زينة رمضان'},
    'EID10':     {pct:10, w:['fitr','adha'], label:'خصم العيد'},
    'MAMA15':    {pct:15, w:['mother'], label:'خصم عيد الأم'},
    'LOVE10':    {pct:10, w:['valentine'], label:'خصم عيد الحب'},
    'NIGHT20':   {pct:20, w:['night'], label:'خصم Night Vibe Box'},
    'CAFE-DEMO': {pct:10, venue:'كافيه تجريبي', label:'خصم الشركاء'}   // one line per venue, e.g. 'ROOTS': {pct:10, venue:'كافيه روتس', label:'خصم الشركاء'}
  };

  // ====== the worlds (one page each). dates = upcoming days, used for the countdowns on the home page ======
  const I = {   // icons, 48×48, drawn with currentColor
    ramadan:'<path d="M28 6a18 18 0 1 0 13 30A14.5 14.5 0 1 1 28 6z" fill="currentColor"/><path d="m37 9 1.6 3.4 3.7.5-2.7 2.6.7 3.7-3.3-1.8-3.3 1.8.7-3.7-2.7-2.6 3.7-.5z" fill="currentColor"/>',
    fitr:'<ellipse cx="19" cy="17" rx="9.5" ry="11.5" fill="currentColor"/><ellipse cx="31.5" cy="21" rx="8.5" ry="10.5" fill="currentColor" opacity=".6"/><path d="M19 28.5q-3 7 1 15M31.5 31.5q3 6-2 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m17.5 28.5h3l-1.5 2.4zM30 31.5h3l-1.5 2.4z" fill="currentColor"/>',
    adha:'<g fill="currentColor"><circle cx="21" cy="21" r="7"/><circle cx="29" cy="20" r="7"/><circle cx="35" cy="26" r="6"/><circle cx="27" cy="29" r="7.5"/><circle cx="18" cy="28" r="6"/><rect x="18" y="32" width="3.4" height="9" rx="1.7"/><rect x="31" y="32" width="3.4" height="9" rx="1.7"/></g><ellipse cx="11" cy="22" rx="5.5" ry="7" fill="currentColor" opacity=".65"/><circle cx="9.6" cy="21" r="1.2" fill="#fff"/>',
    mother:'<path d="M24 7c-5 3-8.5 8-8.5 14 0 5.6 3.8 9.5 8.5 9.5s8.5-3.9 8.5-9.5C32.5 15 29 10 24 7z" fill="currentColor"/><path d="M15.5 14.5c3 1.5 5.5 4 6 8M32.5 14.5c-3 1.5-5.5 4-6 8" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/><path d="M24 30.5V44" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M24 39c-2-5-6-7-10-6.5 1 4.5 5 7 10 6.5zM24 36c2-4 5.5-5.5 9-5-1 3.8-4.5 5.8-9 5z" fill="currentColor" opacity=".6"/>',
    valentine:'<path d="M24 41.5S6.5 31 6.5 18.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 17.5 5.5C41.5 31 24 41.5 24 41.5z" fill="currentColor"/><path d="M13 17.5a5 5 0 0 1 5-4.5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>',
    night:'<rect x="9" y="23" width="30" height="18" rx="2.5" fill="currentColor"/><rect x="7" y="16.5" width="34" height="8" rx="2.5" fill="currentColor" opacity=".7"/><path d="M24 16.5V41" stroke="#fff" stroke-opacity=".6" stroke-width="2.4"/><path d="M24 16c-4-6-10-5-9-1.5S21 16.5 24 16c3 .5 10 2 9-1.5s-5-4.5-9 1.5z" fill="currentColor"/><path d="m37 4 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1zM10 6l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="currentColor"/>'
  };
  const WORLDS = {
    ramadan:  {name:'رمضان',       href:'ramadan.html',        c:'#C9963F', tagline:'فوانيس، قناديل وزينة الحارة',      dates:['2027-02-08','2028-01-28']},
    valentine:{name:'عيد الحب',     href:'valentine.html',      c:'#C8576F', tagline:'دباديب، ورد وضو بلون القلب',      dates:['02-14']},
    fitr:     {name:'عيد الفطر',    href:'eid-al-fitr.html',    c:'#2B7359', tagline:'بالونات، ضيافة وأكياس عيدية',     dates:['2027-03-10','2028-02-27']},
    mother:   {name:'عيد الأم',     href:'mothers-day.html',    c:'#A9526C', tagline:'ورد بيعيش، شموع وهدايا لست الحبايب', dates:['03-21']},
    adha:     {name:'عيد الأضحى',   href:'eid-al-adha.html',    c:'#A0532F', tagline:'زينة الأضحى، خواريف وعيديات',      dates:['2027-05-16','2028-05-05']},
    night:    {name:'Night Vibe Box', href:'night-vibe-box.html', c:'#7B66C9', tagline:'بوكس لسهرة الأفلام والبنات وعيد الميلاد', dates:[]}
  };
  for (const k in WORLDS) WORLDS[k].icon = `<svg viewBox="0 0 48 48" aria-hidden="true">${I[k]}</svg>`;

  // days until the next date of a world ('MM-DD' repeats every year); null for "every day"
  function daysLeft(w){
    const now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const next = WORLDS[w].dates.map(d => d.length === 5 ? [0,1].map(k => new Date(`${now.getFullYear()+k}-${d}T00:00:00`)) : [new Date(d + 'T00:00:00')])
      .flat().filter(d => d >= today).sort((a,b) => a - b)[0];
    return next ? Math.round((next - today) / 864e5) : null;
  }

  const ar = n => Number(n).toLocaleString('ar-SY');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch(e) { return d; } },
    set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} }
  };

  // ---------- cart: lines carry their own name and price, so any page can show them ----------
  let cart = store.get('dc-cart', []);
  let code = store.get('dc-code', '');
  const fromUrl = new URLSearchParams(location.search).get('code');
  if (fromUrl && CODES[fromUrl.toUpperCase()]) { code = fromUrl.toUpperCase(); store.set('dc-code', code); }
  const save = () => { store.set('dc-cart', cart); store.set('dc-code', code); render(); };

  function totals(){
    const sub = cart.reduce((s,l) => s + l.price * l.q, 0);
    const c = CODES[code];
    const base = c ? cart.filter(l => !c.w || c.w.includes(l.w)).reduce((s,l) => s + l.price * l.q, 0) : 0;
    const off = c ? Math.round(base * c.pct) / 100 : 0;
    return {sub, off, total: sub - off, n: cart.reduce((s,l) => s + l.q, 0)};
  }
  const money = v => ar(Math.round(v * 100) / 100) + ' $';

  // item = {w, id, name, opt (shown text, optional), price}; el = the button that was clicked (for the burst)
  function add(item, el){
    const key = [item.w, item.id, item.opt || ''].join('|');
    const line = cart.find(l => l.key === key);
    line ? line.q++ : cart.push({key, w:item.w, id:item.id, name:item.name, opt:item.opt || '', price:item.price, q:1});
    save();
    document.querySelectorAll('[data-cart]').forEach(b => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
    if (el) burst(el);
  }

  // a small confetti pop from the button, in the page's own colours (Web Animations API, no library)
  function burst(el){
    if (reduce) return;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(document.body);
    const cols = [cs.getPropertyValue('--accent'), cs.getPropertyValue('--accent-2'), cs.getPropertyValue('--tint')];
    for (let i = 0; i < 14; i++){
      const s = document.createElement('i'); s.className = 'burst';
      s.style.cssText = `left:${r.left + r.width/2}px;top:${r.top + r.height/2}px;background:${cols[i % 3]}`;
      document.body.appendChild(s);
      const a = Math.PI * 2 * i / 14 + Math.random() * .4, d = 40 + Math.random() * 46;
      s.animate([{transform:'translate(-50%,-50%) rotate(0)', opacity:1},
                 {transform:`translate(calc(-50% + ${Math.cos(a)*d}px), calc(-50% + ${Math.sin(a)*d + 30}px)) rotate(${200 + Math.random()*300}deg)`, opacity:0}],
                {duration:700 + Math.random()*300, easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish = () => s.remove();
    }
  }

  // ---------- drawer (built once, the same on every page) ----------
  const CITIES = ['دمشق','ريف دمشق','حلب','حمص','حماة','اللاذقية','طرطوس','إدلب','درعا','السويداء','القنيطرة','دير الزور','الرقة','الحسكة'];
  const dlg = document.createElement('dialog');
  dlg.className = 'dc-cart'; dlg.setAttribute('aria-labelledby', 'dcTitle');
  dlg.innerHTML = `<div class="dc-in">
    <header><h3 id="dcTitle">سلتك</h3><button class="x" type="button" data-close aria-label="إغلاق">×</button></header>
    <div class="dc-body">
      <div id="dcLines"></div>
      <div id="dcMoney">
        <div class="codebox"><input id="dcCode" placeholder="كود الخصم" aria-label="كود الخصم" autocomplete="off"><button type="button" id="dcApply">طبّق</button></div>
        <p class="code-msg" id="dcCodeMsg" aria-live="polite"></p>
        <div class="sums"><div><span>المجموع</span><span class="num" id="dcSub"></span></div>
          <div class="disc" id="dcOffRow"><span id="dcOffLbl">الخصم</span><span class="num" id="dcOff"></span></div>
          <div class="grand"><span>المجموع التقريبي</span><span class="num" id="dcTotal"></span></div></div>
      </div>
      <form class="form" id="dcForm" novalidate>
        <label>الاسم<input id="dcName" autocomplete="name" required></label>
        <label>المحافظة<select id="dcCity">${CITIES.map(c => `<option>${c}</option>`).join('')}</select></label>
        <label>الحي أو العنوان<input id="dcArea" autocomplete="street-address"></label>
        <label>ملاحظات<textarea id="dcNotes" placeholder="مثلاً: بدي ياها هدية مع كرت إهداء"></textarea></label>
        <p class="err" id="dcErr" hidden></p>
      </form>
    </div>
    <footer>
      <a class="btn solid" id="dcSend" href="#" target="_blank" rel="noopener">ابعت الطلب على واتساب</a>
      <button class="btn ghost" type="button" id="dcCopy">انسخ نص الطلب</button>
      <p class="hint">الدفع عند الاستلام. إذا ما فتح واتساب، ابعت النص على <span class="phone">${PHONE}</span></p>
    </footer></div>`;
  document.body.appendChild(dlg);
  const $ = id => document.getElementById(id);
  let lastFocus;
  function open(note){
    if (typeof note === 'string') $('dcNotes').value = note;
    lastFocus = document.activeElement; dlg.showModal(); render();
  }
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
  dlg.addEventListener('close', () => lastFocus && lastFocus.focus && lastFocus.focus());

  function message(){
    const v = id => $(id).value.trim(), t = totals(), c = CODES[code];
    const lines = cart.map(l => `• [${WORLDS[l.w].name}] ${l.name}${l.opt ? ` (${l.opt})` : ''} × ${ar(l.q)} = ${money(l.price * l.q)}`);
    return ['مرحبا Design & Celebrate، بدي اطلب:', ...(lines.length ? lines : ['(لسا ما اخترت شي، بدي استفسر)']),
      lines.length && c ? `كود الخصم: ${code} (−${money(t.off)})` : '',
      c && c.venue ? `وصلتلكن من: ${c.venue}` : '',
      lines.length ? `المجموع التقريبي: ${money(t.total)}` : '',
      `الاسم: ${v('dcName') || '—'}`, `المحافظة: ${v('dcCity')}`, v('dcArea') ? `العنوان: ${v('dcArea')}` : '', v('dcNotes') ? `ملاحظات: ${v('dcNotes')}` : ''
    ].filter(Boolean).join('\n');
  }
  const updateLink = () => { $('dcSend').href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message())}`; };

  function render(){
    const t = totals();
    document.querySelectorAll('[data-count]').forEach(e => { e.textContent = t.n ? ar(t.n) : ''; e.hidden = !t.n; });
    $('dcLines').innerHTML = cart.length ? cart.map((l,i) => `
      <div class="line" style="--c:${WORLDS[l.w].c}"><span class="ico">${WORLDS[l.w].icon}</span>
        <div><b>${l.name}</b><small>${WORLDS[l.w].name}${l.opt ? ' · ' + l.opt : ''} · ${money(l.price)}</small></div>
        <div class="qty"><button type="button" data-i="${i}" data-d="-1" aria-label="أنقص">−</button><span class="num">${ar(l.q)}</span><button type="button" data-i="${i}" data-d="1" aria-label="زيد">+</button></div>
      </div>`).join('') : '<p class="empty">سلتك فاضية. اختار شي من أي مناسبة، أو ابعتلنا سؤالك مباشرة.</p>';
    $('dcMoney').hidden = !cart.length;
    $('dcSub').textContent = money(t.sub);
    $('dcOff').textContent = '−' + money(t.off);
    $('dcOffRow').hidden = !t.off;
    if (code && document.activeElement !== $('dcCode')) $('dcCode').value = code;
    const c = CODES[code], msg = $('dcCodeMsg');
    msg.className = 'code-msg ok';
    msg.textContent = !c ? '' : t.off || !c.w ? `${c.label}: ${ar(c.pct)}٪ ✓` : `الكود ${code} بيشتغل على ${c.w.map(w => WORLDS[w].name).join(' و')} بس`;
    $('dcOffLbl').textContent = c ? `الخصم (${code})` : 'الخصم';
    $('dcTotal').textContent = money(t.total);
    updateLink();
  }
  $('dcLines').addEventListener('click', e => {
    const b = e.target.closest('[data-d]'); if (!b) return;
    const l = cart[+b.dataset.i]; l.q += +b.dataset.d;
    if (l.q <= 0) cart.splice(+b.dataset.i, 1);
    save();
  });
  function applyCode(){
    const v = $('dcCode').value.trim().toUpperCase();
    if (!v) { code = ''; save(); return; }
    if (CODES[v]) { code = v; save(); }
    else { const m = $('dcCodeMsg'); m.className = 'code-msg bad'; m.textContent = 'هالكود مو صحيح، جرّب مرة تانية.'; }
  }
  $('dcApply').onclick = applyCode;
  $('dcCode').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyCode(); } });
  $('dcForm').addEventListener('input', updateLink);
  $('dcForm').addEventListener('submit', e => e.preventDefault());
  $('dcSend').addEventListener('click', e => {
    if (!$('dcName').value.trim()) { e.preventDefault(); $('dcErr').textContent = 'اكتب اسمك لحتى نعرف مين صاحب الطلب.'; $('dcErr').hidden = false; $('dcName').focus(); }
    else $('dcErr').hidden = true;
  });

  function copy(text, btn, done = 'انتسخ ✓'){
    const ok = () => { const t = btn.textContent; btn.textContent = done; setTimeout(() => btn.textContent = t, 1600); };
    const fallback = () => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch(e) {} ta.remove(); };
    navigator.clipboard ? navigator.clipboard.writeText(text).then(ok, fallback) : fallback();
  }
  $('dcCopy').onclick = e => copy(message(), e.currentTarget);

  // ---------- product grid: products = [{id, name, desc, price, tag, opts:[{name, c?, price?}]}], art(p, opt) returns SVG inner (viewBox 0 0 200 200) ----------
  function renderGrid(el, world, products, art){
    el.innerHTML = products.map(p => {
      const o = p.opts ? p.opts[0] : null;
      return `<article class="p-card reveal" data-id="${p.id}" data-o="0" style="--glow:${(o && o.c) || 'var(--accent-2)'}">
        <div class="p-art">${p.tag ? `<span class="p-tag">${p.tag}</span>` : ''}<svg viewBox="0 0 200 200" role="img" aria-label="${p.name}">${art(p, o)}</svg></div>
        <div class="p-info"><h3>${p.name}</h3>${p.desc ? `<p class="p-desc">${p.desc}</p>` : ''}
          ${p.opts ? `<div class="opts" role="group" aria-label="${p.optLabel || 'اختار'}"><span>${p.optLabel || 'اللون'}:</span>${p.opts.map((o,i) => o.c
              ? `<button class="sw" type="button" data-i="${i}" aria-pressed="${!i}" aria-label="${o.name}" title="${o.name}" style="background:${o.c}"></button>`
              : `<button class="opt" type="button" data-i="${i}" aria-pressed="${!i}">${o.name}</button>`).join('')}</div>` : ''}
          <div class="p-buy"><span class="price num">${money((o && o.price) || p.price)} <small>تقريباً</small></span><button class="add" type="button">أضف للسلة</button></div>
        </div></article>`; }).join('');
    el.addEventListener('click', e => {
      const card = e.target.closest('.p-card'); if (!card) return;
      const p = products.find(x => x.id === card.dataset.id);
      const pick = e.target.closest('[data-i]');
      if (pick){
        const o = p.opts[+pick.dataset.i]; card.dataset.o = pick.dataset.i;
        card.querySelectorAll('[data-i]').forEach(b => b.setAttribute('aria-pressed', String(b === pick)));
        card.querySelector('.p-art svg').innerHTML = art(p, o);
        if (o.c) card.style.setProperty('--glow', o.c);
        card.querySelector('.price').innerHTML = `${money(o.price || p.price)} <small>تقريباً</small>`;
        return;
      }
      const btn = e.target.closest('.add'); if (!btn) return;
      const o = p.opts ? p.opts[+card.dataset.o] : null;
      add({w:world, id:p.id, name:p.name, opt:o ? o.name : '', price:(o && o.price) || p.price}, btn);
      btn.textContent = 'انضاف ✓'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'أضف للسلة'; btn.classList.remove('done'); }, 1400);
    });
  }

  // ---------- footer + worlds bar (filled in on every page) ----------
  const here = document.body.dataset.world || 'home';
  document.querySelectorAll('[data-worlds]').forEach(n => n.innerHTML = `<div class="wrap">${Object.entries(WORLDS).map(([k,w]) =>
    `<a class="wpill" href="${w.href}" style="--c:${w.c}" ${k === here ? 'aria-current="page"' : ''}>${w.icon}<span>${w.name}</span></a>`).join('')}</div>`);
  document.querySelectorAll('[data-footer]').forEach(f => {
    f.className = 'site-foot';
    f.innerHTML = `<div class="wrap"><div class="cols">
      <div><a class="brand" href="index.html"><span class="mono">D<i>&amp;</i>S</span><span class="word"><b>Design <i>&amp;</i> Celebrate</b><small>Same store, different world</small></span></a>
        <p style="margin-top:14px;max-width:30em">زينة وهدايا لكل مناسبة، منجيبها من برّا ومنوصلها لباب بيتك بكل سوريا. الدفع عند الاستلام.</p></div>
      <div><h4>واتساب للطلب</h4><p><span class="phone">${PHONE}</span> <button class="mini" type="button" data-copy-phone>انسخ الرقم</button></p>
        <p style="margin-top:6px">من ١٠ الصبح لـ ١٠ بالليل.</p><h4 style="margin-top:18px">تابعنا</h4><p class="latin">@${IG}</p></div>
      <div><h4>المناسبات</h4><ul>${Object.values(WORLDS).map(w => `<li><a href="${w.href}">${w.name}</a></li>`).join('')}</ul></div>
    </div><p class="legal">© Design & Celebrate ${new Date().getFullYear().toLocaleString('ar-SY', {useGrouping:false})} · الأسعار بالدولار للتقريب، وبتندفع بالليرة السورية حسب سعر الصرف يوم الطلب.</p></div>`;
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-cart]')) open();
    const cp = e.target.closest('[data-copy-phone]'); if (cp) copy(PHONE, cp);
    const cc = e.target.closest('[data-copy-code]'); if (cc) { copy(cc.dataset.copyCode, cc); code = cc.dataset.copyCode; save(); }
  });

  render();
  window.DC = {WORLDS, CODES, add, open, renderGrid, burst, daysLeft, ar, money, reduce};
})();
