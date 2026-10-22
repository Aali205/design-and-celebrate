/* طقم العيدية بالاسم: Eidiya envelopes with each child's name, plus the "Eidiya bouquet" (folded notes arranged like flowers).
   D&S only. Fills any <section data-eidiya> on the Eid pages, in that page's colours; the names show on the envelopes as they're typed. */
(() => {
  const ENV = 1, BOUQUET = 9, MIN = 3, MAX = 12;   // dollars per envelope, the bouquet, fewest envelopes, most names (prices are guesses)
  const esc = t => t.replace(/[&<>"]/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'})[c]);

  function bouquet(on){
    const notes = [-48, -29, -10, 10, 29, 48].map(a => `<g transform="rotate(${a} 100 205)">
      <rect x="86" y="92" width="28" height="74" rx="5" fill="#DCEBD2" stroke="#8DB07F" stroke-width="1.5"/>
      <path d="M90 102h20M90 156h20" stroke="#8DB07F" stroke-width="1.2"/><ellipse cx="100" cy="129" rx="6.5" ry="10" fill="none" stroke="#8DB07F" stroke-width="1.4"/></g>`).join('');
    return `<g class="ei-bq${on ? '' : ' off'}">${notes}
      <path d="M50 176Q100 150 150 176L100 290z" style="fill:var(--tint)"/>
      <path d="M38 170h124l-62 124z" fill="#E6D0A9"/><path d="M38 170h124l-62 124z" fill="none" stroke="#C9AE80" stroke-width="1.5"/>
      <path d="M70 170l30 124M130 170l-30 124" stroke="#C9AE80" stroke-width="1.2" opacity=".7"/>
      <path d="M62 226h76l-4 9H66z" style="fill:var(--accent-2)"/>
      <path d="M100 230c-12-16-30-14-26-4s18 6 26 4c8 2 22 6 26-4s-14-12-26 4z" style="fill:var(--accent-2)"/><circle cx="100" cy="230" r="5" style="fill:var(--accent)"/>
      <path d="M100 235l-8 22M100 235l8 22" style="stroke:var(--accent-2)" stroke-width="4" stroke-linecap="round"/>
      <g transform="rotate(-10 140 258)"><path d="M108 236l20 14" stroke="#C9AE80" stroke-width="1"/><rect x="122" y="246" width="50" height="24" rx="5" fill="#FFFBF5" style="stroke:var(--accent)" stroke-width="1.5"/>
        <text x="147" y="263" text-anchor="middle" font-family="El Messiri, serif" font-weight="700" font-size="13" style="fill:var(--accent)">عيدية</text></g></g>`;
  }

  function envelopes(names){
    const show = names.length ? names : ['سارة', 'علي', 'ليان'], ghost = !names.length;
    const list = show.length > 4 ? [...show.slice(0, 3), `+${(show.length - 3).toLocaleString('ar-SY')}`] : show;
    // a fan: the first name sits in front, "+N" at the back
    const fan = [[[0, 0]], [[8, 14], [-8, -14]], [[12, 22], [0, 0], [-12, -22]], [[15, 30], [5, 10], [-5, -10], [-15, -30]]][list.length - 1];
    return `<g opacity="${ghost ? .5 : 1}" transform="translate(-26 0)">${list.map((n, i) => [n, i]).reverse().map(([n, i]) => {
      const filled = i % 2 === 0, fs = Math.min(17, 150 / (n.length + 1.5));
      return `<g transform="translate(${fan[i][1]} 0) rotate(${fan[i][0]} 268 296)">
        <rect x="222" y="150" width="92" height="124" rx="8" style="fill:${filled ? 'var(--accent)' : 'var(--surface)'};stroke:var(--accent)" stroke-width="1.5"/>
        <path d="M222 158l46 34 46-34" fill="none" style="stroke:${filled ? 'var(--on-accent)' : 'var(--accent)'}" stroke-width="1.5" opacity=".6"/>
        <path d="M268 196a11 11 0 1 0 7 19.4 9 9 0 1 1-7-19.4z" style="fill:${filled ? 'var(--on-accent)' : 'var(--accent-2)'}" opacity=".9"/>
        <text x="268" y="254" text-anchor="middle" font-family="El Messiri, serif" font-weight="700" font-size="${fs.toFixed(1)}" style="fill:${filled ? 'var(--on-accent)' : 'var(--accent)'}">${esc(n)}</text></g>`; }).join('')}</g>`;
  }

  function mount(el){
    const world = document.body.dataset.world;
    let names = [], withBouquet = true;
    el.innerHTML = `<div class="wrap ei-grid">
      <div class="ei-art" aria-hidden="true"><svg viewBox="0 0 360 300" width="360" height="300"></svg></div>
      <div class="ei-copy">
        <span class="eyebrow">جديد · حصري من D&amp;S</span>
        <h2 id="eiTitle">طقم العيدية بالاسم</h2>
        <p>ظرف لكل ولد عليه اسمو، منطبعو هون بالشام. ومعو «بوكيه العيدية»: باقة بتحط فيها المصاري مطويّة متل الورد. أحلى لحظة بصبحية العيد، وأحلى صورة.</p>
        <label class="ei-label" for="eiIn">أسماء الولاد</label>
        <div class="ei-add"><input id="eiIn" maxlength="14" autocomplete="off" enterkeyhint="done" placeholder="اكتب اسم واضغط «ضيف»"><button type="button" class="ei-plus">ضيف</button></div>
        <div class="ei-chips"></div>
        <div class="opts" role="group" aria-label="شو بدك بالطقم"></div>
        <div class="ei-buy"><span class="price num"></span><button class="btn solid" type="button">أضف للسلة</button></div>
        <p class="ei-msg" aria-live="polite"></p>
        <p class="note">سعر الظرف ${DC.ar(ENV)} $ (أقل شي ${DC.ar(MIN)} ظروف)، وسعر البوكيه ${DC.ar(BOUQUET)} $. الأسماء بتنطبع هون، فالطلب بيجهز خلال يومين.</p>
      </div></div>`;
    const $ = s => el.querySelector(s), input = $('#eiIn'), msg = $('.ei-msg');
    const price = () => Math.max(MIN, names.length) * ENV + (withBouquet ? BOUQUET : 0);
    function draw(){
      $('.ei-art svg').innerHTML = bouquet(withBouquet) + envelopes(names);
      $('.ei-chips').innerHTML = names.map((n, i) => `<button class="ei-chip" type="button" data-i="${i}" aria-label="شيل ${esc(n)}">${esc(n)}<i aria-hidden="true">×</i></button>`).join('');
      $('.opts').innerHTML = ['ظروف بس', 'ظروف + بوكيه العيدية'].map((t, i) => `<button class="opt" type="button" data-b="${i}" aria-pressed="${!!i === withBouquet}">${t}</button>`).join('');
      $('.price').innerHTML = `${DC.money(price())} <small>تقريباً</small>`;
    }
    function addNames(){
      const fresh = input.value.split(/[,،]/).map(n => n.trim().slice(0, 14)).filter(Boolean);
      if (!fresh.length) { input.focus(); return; }
      names = [...names, ...fresh].slice(0, MAX);
      msg.textContent = names.length === MAX ? `أكتر شي ${DC.ar(MAX)} اسم بالطلب الواحد.` : '';
      input.value = ''; draw(); input.focus();
    }
    $('.ei-plus').onclick = addNames;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addNames(); } });
    el.addEventListener('click', e => {
      const chip = e.target.closest('.ei-chip'); if (chip) { names.splice(+chip.dataset.i, 1); msg.textContent = ''; draw(); return; }
      const opt = e.target.closest('[data-b]'); if (opt) { withBouquet = opt.dataset.b === '1'; draw(); return; }
      const btn = e.target.closest('.ei-buy .btn'); if (!btn) return;
      if (input.value.trim()) addNames();
      if (!names.length) { msg.textContent = 'اكتب اسم ولد واحد عالأقل.'; input.focus(); return; }
      const n = Math.max(MIN, names.length), blank = n - names.length;
      DC.add({w:world, id:withBouquet ? 'eidiya-set' : 'eidiya-names', name:withBouquet ? 'بوكيه العيدية مع ظروف بالاسم' : 'ظروف عيدية بالاسم',
        opt:`${DC.ar(n)} ظروف: ${names.join('، ')}${blank ? ` و${DC.ar(blank)} بلا اسم` : ''}`, price:price()}, btn);
      btn.textContent = 'انضاف ✓'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'أضف للسلة'; btn.classList.remove('done'); }, 1400);
    });
    draw();
  }
  document.querySelectorAll('[data-eidiya]').forEach(mount);
})();
