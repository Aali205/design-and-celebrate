/* Home intro, once per visit: a gift box drops in, its lid pops off, light pours out and the seven Night Vibe boxes fly out
   as glowing icons that open their pages. About 3.5 s; a tap, scroll or key skips to the end. After it the visitor taps a box
   or scrolls down to the shop. Loaded right after <body> on index.html, so it is in place before the page paints.
   ?intro=1 replays it. Box names, colours and pages mirror assets/boxes.js: keep them in step when a box is added. */
(function(){
  const qs = new URLSearchParams(location.search);
  try {
    if (!qs.has('intro') && (sessionStorage.getItem('dc-intro') || location.hash)) return;
    sessionStorage.setItem('dc-intro', '1');
  } catch (e) {}
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // glyphs on a 24 grid, white on the box's colour mix
  const G = {
    mystery: `<text x="12" y="19.5" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="21" fill="#fff">?</text>`,
    movie: `<circle cx="8" cy="9" r="2.6" fill="#FFF4D6"/><circle cx="12" cy="7.2" r="3" fill="#fff"/><circle cx="16" cy="9" r="2.6" fill="#FFF4D6"/><path d="M5.5 10.5h13l-1.7 10.5H7.2z" fill="#fff"/><path d="M9.4 10.5l.6 10.5M14.6 10.5l-.6 10.5" stroke="#E0574C" stroke-width="1.6"/>`,
    girls: `<path d="M12 12C9.5 8 4 6.5 4 10.4S9.5 15 12 12zM12 12c2.5-4 8-5.5 8-1.6S14.5 15 12 12z" fill="#fff"/><path d="M11 13l-2.4 6.5M13 13l2.4 6.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#F29BB8"/>`,
    boys: `<path d="M6 8.5h12a4 4 0 0 1 4 4v1.8a3.2 3.2 0 0 1-5.6 2.1L14.8 15H9.2l-1.6 1.4A3.2 3.2 0 0 1 2 14.3v-1.8a4 4 0 0 1 4-4z" fill="#fff"/><path d="M7.5 10.5v3.5M5.8 12.2h3.4" stroke="#3C8DD6" stroke-width="1.6" stroke-linecap="round"/><circle cx="16" cy="11.4" r="1.1" fill="#3CC6B0"/><circle cx="18" cy="13.2" r="1.1" fill="#3C8DD6"/>`,
    birthday: `<path d="M12 2.6c1.4 1.6 1.4 2.8 0 3.6-1.4-.8-1.4-2 0-3.6z" fill="#FFD27A"/><rect x="11.2" y="6.6" width="1.6" height="4.4" rx=".6" fill="#fff"/><rect x="4.5" y="11" width="15" height="9.5" rx="2" fill="#fff"/><path d="M4.5 14c1.6 1.4 3.4 1.4 5 0s3.4-1.4 5 0 3.4 1.4 5 0" fill="none" stroke="#F5B98D" stroke-width="1.6"/>`,
    baby: `<rect x="10.2" y="2.4" width="3.6" height="3" rx="1.6" fill="#fff"/><rect x="7.4" y="5.2" width="9.2" height="2.6" rx="1" fill="#F5B3C4"/><rect x="8" y="7.6" width="8" height="13.6" rx="2.6" fill="#fff"/><path d="M10 11.5h2.4M10 14.5h2.4M10 17.5h2.4" stroke="#9CC8EE" stroke-width="1.4" stroke-linecap="round"/>`,
    engage: `<circle cx="12" cy="15.2" r="5.4" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M8.8 6.6L12 3l3.2 3.6L12 10z" fill="#fff"/><path d="M8.8 6.6h6.4" stroke="#E6C27A" stroke-width="1"/>`
  };
  const BOXES = [
    ['mystery', 'المفاجأة', '#6E56CF', '#F2B544'],
    ['movie', 'سهرة أفلام', '#E0574C', '#F2B544'],
    ['girls', 'سهرة بنات', '#F29BB8', '#B9A5F5'],
    ['boys', 'سهرة شباب', '#3C8DD6', '#3CC6B0'],
    ['birthday', 'عيد ميلاد', '#8ED8C0', '#F5B98D'],
    ['baby', 'مولود جديد', '#9CC8EE', '#F5B3C4'],
    ['engage', 'خطوبة', '#E6C27A', '#E8B4BC']
  ];
  // where each lands, relative to the box's mouth (units of u). Phones: a bouquet of 2-3-2 rising out of the light.
  // Wider screens: one arc. The mystery box takes the middle.
  const NARROW = [[0, -200], [78, -92], [-78, -92], [138, -196], [-138, -196], [70, -305], [-70, -305]];
  const WIDE = [-90, -65, -115, -40, -140, -15, -165].map(a => [255 * Math.cos(a * Math.PI / 180), 255 * Math.sin(a * Math.PI / 180)]);
  const FILE = id => `box-${id === 'engage' ? 'engagement' : id}.html`;

  const css = `
html.in-lock,html.in-lock body{overflow:hidden}
.intro{position:relative;height:100vh;height:100svh;min-height:540px;overflow:hidden;color:#F4F0FF;isolation:isolate;
  background:radial-gradient(70% 55% at 50% 64%,#3A2A7A 0%,#1E1746 46%,#110D27 100%);font-family:"IBM Plex Sans Arabic",system-ui,sans-serif}
.intro *{box-sizing:border-box}
.intro::after{content:"";position:absolute;inset:auto 0 0;height:120px;background:linear-gradient(transparent,#171139);z-index:-1;pointer-events:none}   /* melts into the page below */
.in-brand{position:absolute;top:max(18px,env(safe-area-inset-top));inset-inline:0;text-align:center;font-family:Fraunces,serif;font-size:15px;letter-spacing:.06em;color:#CFC4F5;opacity:.9}
.in-brand i{color:#F2C94C}
.in-star{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;opacity:.25;animation:inTw 3.2s ease-in-out infinite}
@keyframes inTw{50%{opacity:.9;transform:scale(1.4)}}
.in-top{position:absolute;inset-inline:16px;text-align:center;opacity:0}
.in-top h2{margin:0;font-family:"El Messiri",serif;font-weight:700;font-size:clamp(28px,7.6vw,46px);line-height:1.2;color:#fff;text-shadow:0 0 22px rgba(242,201,76,.35)}
.in-top p{margin:6px 0 0;font-size:15px;color:#CFC4F5}
.in-shadow,.in-glow,.in-beam,.in-boxwrap,.in-ic,.in-spark{position:absolute;left:0;top:0}
.in-shadow{border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.45),transparent)}
.in-boxwrap{z-index:3}
.in-box{position:relative;width:100%;height:100%;transform-origin:50% 100%}
.in-box>svg,.in-lid>svg{display:block;position:absolute}
.in-lid{position:absolute;inset:0;z-index:2}
.in-glow{border-radius:50%;background:radial-gradient(closest-side,rgba(255,226,150,.9),rgba(255,190,90,.35) 55%,transparent);opacity:0;z-index:2;mix-blend-mode:screen}
.in-beam{transform-origin:50% 100%;opacity:0;z-index:1;pointer-events:none;
  background:linear-gradient(to top,rgba(255,224,150,.7),rgba(255,210,130,.22) 55%,transparent);clip-path:polygon(34% 100%,66% 100%,100% 0,0 0);filter:blur(5px)}
.in-beam.live{animation:inBeam 2.6s ease-in-out infinite}
@keyframes inBeam{50%{opacity:.72}}
.in-spark{z-index:4;pointer-events:none}
.in-ic{z-index:5;display:flex;flex-direction:column;align-items:center;gap:6px;text-decoration:none;color:#fff;-webkit-tap-highlight-color:transparent;opacity:0}
.in-ic .halo{position:absolute;top:50%;left:50%;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,var(--c2),transparent);opacity:.55;transform:translate(-50%,-50%)}
.in-ic .disc{position:relative;display:grid;place-items:center;border-radius:50%;
  background:radial-gradient(circle at 34% 28%,var(--c2),var(--c1) 70%);border:2px solid rgba(255,255,255,.55);
  box-shadow:0 0 18px var(--c1),0 0 36px color-mix(in srgb,var(--c2) 55%,transparent),inset 0 -6px 12px rgba(0,0,0,.18)}
.in-ic .disc svg{display:block}
.in-ic b{position:relative;font-weight:600;font-size:12.5px;white-space:nowrap;line-height:1.2;padding:2px 8px;border-radius:99px;background:rgba(17,13,39,.55)}
.in-ic.live .halo{animation:inHalo 2.4s ease-in-out infinite}
.in-ic.live .disc{animation:inBob 3.4s ease-in-out infinite}
.in-ic:nth-of-type(2n).live .halo{animation-delay:-1.2s}
.in-ic:nth-of-type(3n).live .disc{animation-delay:-1.7s}
.in-ic:nth-of-type(2n).live .disc{animation-duration:3s}
@keyframes inHalo{50%{opacity:.95;transform:translate(-50%,-50%) scale(1.18)}}
@keyframes inBob{50%{transform:translateY(-5px)}}
.in-ic:focus-visible{outline:none}
.in-ic:focus-visible .disc{outline:3px solid #F2C94C;outline-offset:4px}
.in-ic:active .disc{transform:scale(.92)}
@media (hover:hover){.in-ic:hover .disc{transform:scale(1.08);transition:transform .2s}}
.in-skip{position:absolute;top:max(12px,env(safe-area-inset-top));inset-inline-end:12px;z-index:6;font:inherit;font-size:13px;color:#CFC4F5;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:99px;padding:6px 14px;cursor:pointer}
.in-down{position:absolute;left:50%;bottom:max(18px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:2px;
  font:inherit;font-size:14px;color:#E9E2FF;background:none;border:0;cursor:pointer;opacity:0;pointer-events:none;padding:6px 14px}
.in-down svg{animation:inNudge 1.6s ease-in-out infinite}
@keyframes inNudge{50%{transform:translateY(5px)}}
.intro.done .in-down{pointer-events:auto}
.intro.done .in-skip{display:none}
.intro.off *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.intro *{animation:none!important}}`;

  // the box: front face, the open top (seen once the lid has gone) and a gold ribbon; 200×150 units, the mouth at y 22
  const BODY = `<svg viewBox="0 0 200 150" aria-hidden="true">
    <path d="M24 22h152l14 14H10z" fill="#1A1238"/><path d="M30 24h140l9 9H21z" fill="#FFD98A" opacity=".55"/>
    <rect x="10" y="34" width="180" height="114" rx="7" fill="#5B3FB8"/><rect x="10" y="34" width="180" height="20" fill="#4A3199"/>
    <rect x="152" y="34" width="38" height="114" rx="7" fill="#4C33A0" opacity=".55"/>
    <rect x="88" y="34" width="24" height="114" fill="#F2C94C"/><rect x="88" y="34" width="5" height="114" fill="#FFE39A"/>
  </svg>`;
  const LID = `<svg viewBox="0 0 220 80" aria-hidden="true">
    <path d="M110 26c-16-22-44-20-38-5 4 9 26 10 38 5zM110 26c16-22 44-20 38-5-4 9-26 10-38 5z" fill="#F2C94C"/>
    <path d="M110 26c-12-15-30-15-28-6 2 5 16 7 28 6z" fill="#FFE39A" opacity=".7"/>
    <path d="M18 30h184l12 14H6z" fill="#8C73E6"/>
    <rect x="4" y="44" width="212" height="32" rx="6" fill="#6E56CF"/><rect x="4" y="66" width="212" height="10" rx="5" fill="#5B43BC"/>
    <path d="M98 30h24l3 14h-30z" fill="#FFD666"/><rect x="95" y="44" width="30" height="32" fill="#F2C94C"/><rect x="95" y="44" width="6" height="32" fill="#FFE39A"/>
    <circle cx="110" cy="27" r="7" fill="#E0AE2E"/>
  </svg>`;
  const star4 = c => `<svg viewBox="-10 -10 20 20" width="16" height="16"><path d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10z" fill="${c}"/></svg>`;

  const sec = document.createElement('section');
  sec.className = 'intro';
  sec.setAttribute('aria-label', 'بوكسات D&S');
  sec.innerHTML = `<style>${css}</style>
    <div class="in-brand" lang="en">Design <i>&amp;</i> Celebrate</div>
    ${Array.from({length: 26}, (_, i) => `<span class="in-star" style="left:${(i * 37.3 + 7) % 100}%;top:${(i * 23.7 + 11) % 62}%;animation-delay:${-(i * .43) % 3.2}s;animation-duration:${2.4 + (i % 5) * .5}s"></span>`).join('')}
    <div class="in-top"><h2>اختار بوكسك</h2><p>كبسة على أي بوكس بتفتحلك عالمه</p></div>
    <div class="in-shadow"></div>
    <div class="in-beam"></div>
    <div class="in-boxwrap"><div class="in-box">${BODY}<div class="in-lid">${LID}</div></div></div>
    <div class="in-glow"></div>
    ${Array.from({length: 10}, (_, i) => `<span class="in-spark">${star4(i % 3 ? '#FFE39A' : '#fff')}</span>`).join('')}
    ${BOXES.map(([id, name, c1, c2]) => `<a class="in-ic" href="${FILE(id)}" style="--c1:${c1};--c2:${c2}" aria-label="بوكس ${name}"><span class="halo"></span><span class="disc"><svg viewBox="0 0 24 24" aria-hidden="true">${G[id]}</svg></span><b>${name}</b></a>`).join('')}
    <button class="in-skip" type="button">تخطّي</button>
    <button class="in-down" type="button"><span>أو انزل للمتجر</span><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
  document.body.prepend(sec);

  const $ = s => sec.querySelector(s), $$ = s => [...sec.querySelectorAll(s)];
  const wrap = $('.in-boxwrap'), box = $('.in-box'), lid = $('.in-lid'), shadow = $('.in-shadow'), beam = $('.in-beam'),
        glow = $('.in-glow'), top = $('.in-top'), down = $('.in-down'), icons = $$('.in-ic'), sparks = $$('.in-spark');
  const px = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w != null){ el.style.width = w + 'px'; el.style.height = h + 'px'; } };

  // geometry from the viewport: u scales everything, (mx, my) is the box's mouth
  let G0 = {};
  function layout(){
    const W = sec.clientWidth, H = sec.clientHeight;
    const narrow = W < 700, u = Math.max(.8, Math.min(1.45, W / 420, H / (narrow ? 760 : 680)));
    const bw = 190 * u, bh = bw * .75, mx = W / 2, my = H * (narrow ? .66 : .64);
    G0 = {W, H, u, mx, my};
    px(wrap, mx - bw / 2, my - bh * 22 / 150, bw, bh);
    const lw = bw * 1.1, lh = lw * 80 / 220;
    $('.in-box>svg').setAttribute('width', bw); $('.in-box>svg').setAttribute('height', bh);
    const ls = lid.querySelector('svg'); ls.setAttribute('width', lw); ls.setAttribute('height', lh);
    ls.style.left = (bw - lw) / 2 + 'px'; ls.style.top = (bh * 62 / 150 - lh) + 'px';
    px(shadow, mx - bw * .62, my - bh * 22 / 150 + bh - 10 * u, bw * 1.24, 26 * u);
    px(beam, mx - bw * .9, my - 330 * u, bw * 1.8, 330 * u);
    px(glow, mx - bw * .55, my - 34 * u, bw * 1.1, 68 * u);
    const s = Math.round((narrow ? 62 : 66) * u), hs = Math.round(s * 1.9);
    icons.forEach((a, i) => {
      const [x, y] = (narrow ? NARROW : WIDE)[i], cx = mx + x * u, cy = my + y * u - 8 * u;
      a.querySelector('.disc').style.cssText = `width:${s}px;height:${s}px`;
      a.querySelector('.disc svg').setAttribute('width', s * .58); a.querySelector('.disc svg').setAttribute('height', s * .58);
      a.querySelector('.halo').style.cssText = `width:${hs}px;height:${hs}px;top:${s / 2}px`;
      a.style.width = '0'; px(a, cx, cy - s / 2);
      a._d = [mx - cx, my - cy + s / 2];
    });
    const highest = Math.min(...icons.map(a => parseFloat(a.style.top)));
    top.style.top = Math.max(52, highest - 112) + 'px';
  }
  icons.forEach(a => { a.style.justifyContent = 'flex-start'; });   // the 0-width anchor is centred on its spot by its flex children
  layout();
  addEventListener('resize', layout);

  let anims = [], ended = false;
  const lock = on => document.documentElement.classList.toggle('in-lock', on);
  function end(){
    if (ended) return; ended = true;
    lock(false);
    sec.classList.add('done');
    beam.classList.add('live');
    icons.forEach(a => a.classList.add('live'));
    ['pointerdown', 'wheel', 'touchmove', 'keydown'].forEach(e => removeEventListener(e, skip, true));
  }
  function skip(e){
    if (ended) return;
    if (e && e.type === 'keydown' && e.key === 'Tab') return;
    anims.forEach(a => { try { a.finish(); } catch (_) {} });
    end();
  }
  function still(){   // the final frame, for reduced motion
    lid.style.display = 'none';
    [beam, glow].forEach(el => el.style.opacity = 1);
    [top, down, ...icons].forEach(el => el.style.opacity = 1);
    end();
  }

  $('.in-skip').addEventListener('click', skip);
  down.addEventListener('click', () => {
    let next = sec.nextElementSibling;
    while (next && next.tagName === 'SCRIPT') next = next.nextElementSibling;
    if (next) next.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
  });
  if ('IntersectionObserver' in window)
    new IntersectionObserver(([en]) => sec.classList.toggle('off', !en.isIntersecting)).observe(sec);

  if (reduce || !Element.prototype.animate){ still(); return; }

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  lock(true);
  ['pointerdown', 'wheel', 'touchmove', 'keydown'].forEach(e => addEventListener(e, skip, true));

  const {H, u} = G0;
  const go = (el, kf, o) => { const a = el.animate(kf, Object.assign({fill: 'both'}, o)); anims.push(a); return a; };
  // 0.15–0.8 s the box falls; then it squashes, bounces and wiggles
  go(wrap, [{transform: `translateY(${-H}px)`}, {transform: 'none'}], {delay: 150, duration: 650, easing: 'cubic-bezier(.55,0,1,.45)'});
  go(shadow, [{transform: 'scale(.25)', opacity: 0}, {transform: 'none', opacity: 1}], {delay: 150, duration: 650, easing: 'cubic-bezier(.55,0,1,.45)'});
  go(box, [
    {transform: 'none'}, {transform: 'scale(1.13,.8)', offset: .16}, {transform: 'scale(.94,1.07)', offset: .36}, {transform: 'scale(1.02,.98)', offset: .52},
    {transform: 'none', offset: .62}, {transform: 'rotate(-3deg)', offset: .72}, {transform: 'rotate(3deg)', offset: .82}, {transform: 'rotate(-2deg)', offset: .92}, {transform: 'none'}
  ], {delay: 800, duration: 720, easing: 'ease-out'});
  // 1.5 s the lid pops and spins away
  go(lid, [
    {transform: 'none', opacity: 1}, {transform: `translate(0,${-46 * u}px) rotate(-8deg)`, offset: .18},
    {transform: `translate(${-G0.W * .62}px,${-H * .62}px) rotate(-250deg)`, opacity: 1, offset: .86}, {transform: `translate(${-G0.W * .7}px,${-H * .7}px) rotate(-280deg)`, opacity: 0}
  ], {delay: 1500, duration: 950, easing: 'cubic-bezier(.25,.6,.35,1)'});
  // light pours out, sparks fly
  go(glow, [{opacity: 0, transform: 'scale(.4)'}, {opacity: 1, transform: 'scale(1.25)', offset: .4}, {opacity: 1, transform: 'none'}], {delay: 1560, duration: 700, easing: 'ease-out'});
  go(beam, [{opacity: 0, transform: 'scaleY(0)'}, {opacity: 1, transform: 'none'}], {delay: 1620, duration: 650, easing: 'cubic-bezier(.2,.8,.3,1)'});
  sparks.forEach((sp, i) => {
    const t = (-170 + i * 160 / 9) * Math.PI / 180, r = (130 + (i % 3) * 50) * u;
    px(sp, G0.mx - 8, G0.my - 8);
    go(sp, [{transform: 'scale(.2)', opacity: 0}, {opacity: 1, offset: .15}, {transform: `translate(${r * Math.cos(t)}px,${r * Math.sin(t)}px) scale(1) rotate(90deg)`, opacity: 0}],
      {delay: 1580 + i * 25, duration: 900, easing: 'cubic-bezier(.2,.7,.3,1)'});
  });
  // 1.7 s the boxes fly out to their spots, one after another
  icons.forEach((a, i) => {
    const [dx, dy] = a._d;
    go(a, [
      {transform: `translate(${dx}px,${dy}px) scale(.15)`, opacity: 0}, {opacity: 1, offset: .2},
      {transform: `translate(0,${-10 * u}px) scale(1.1)`, offset: .72}, {transform: 'none', opacity: 1}
    ], {delay: 1720 + i * 95, duration: 780, easing: 'cubic-bezier(.2,.75,.3,1)'});
  });
  // 2.9 s the words arrive
  go(top, [{opacity: 0, transform: 'translateY(12px)'}, {opacity: 1, transform: 'none'}], {delay: 2900, duration: 500, easing: 'ease-out'});
  const last = go(down, [{opacity: 0}, {opacity: 1}], {delay: 3150, duration: 450});
  last.onfinish = end;
})();
