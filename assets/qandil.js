/* قنديل: the D&S mascot. A small lantern (the shop's old name was Dar al-Qandil) who dresses up for every world:
   same store, different world, same Qandil, different outfit.
   DCQandil(world) returns his SVG. Every page with a hero gets him peeking from a corner; a tap makes him talk (Syrian dialect).
   No gradients or ids in the drawing, so any number of him can sit on one page. */
(() => {
  const GOLD = '#D9A84E', DEEP = '#A87526', INK = '#3A2633';
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="${GOLD}"/>`;
  const star = (x, y, r, f) => `<path d="${Array.from({length:10}, (_, i) => { const a = Math.PI / 5 * i - Math.PI / 2, d = i % 2 ? r * .45 : r;
    return (i ? 'L' : 'M') + (x + Math.cos(a) * d).toFixed(2) + ' ' + (y + Math.sin(a) * d).toFixed(2); }).join('')}z" fill="${f}"/>`;

  // head = on top of him, front = over his body, hold = in his raised hand (then he doesn't wave), line = what he says
  const WEAR = {
    home: {line:'أهلين، أنا قنديل! بغيّر لبستي مع كل عالم.'},
    ramadan: {line:'رمضان كريم! هاد شهري المفضّل، أنا فانوس بالآخر.',
      head:`<path d="M88 12a9 9 0 1 0 6 15 7 7 0 1 1-6-15z" fill="#F0B43C"/>${star(100, 9, 4, '#F6DFA0')}`},
    fitr: {line:'عيدكن مبارك! وين العيدية؟',
      front:`<path d="M60 44.5l-9-5v10zM60 44.5l9-5v10z" fill="#C4943A"/><circle cx="60" cy="44.5" r="2.6" fill="#F3DFA9"/>`,
      hold:`<path d="M98 63Q103 46 101 34" stroke="#7A8B7F" stroke-width="1.2" fill="none"/><ellipse cx="101" cy="20" rx="11" ry="13.5" fill="#2B7359"/><ellipse cx="97" cy="14.5" rx="3" ry="4.5" fill="#fff" opacity=".35"/><path d="M98 33h6l-3 3.4z" fill="#2B7359"/>`},
    adha: {line:'كل عام وإنتو بخير، لبست طربوش العيد!',
      head:`<path d="M47 31h26l-3-21H50z" fill="#B23A3A"/><path d="M50 10h20" stroke="#8E2C2C" stroke-width="2.4"/><path d="M60 10q8 1 9 10" stroke="#2A2233" stroke-width="1.6" fill="none"/><circle cx="69" cy="21" r="2" fill="#2A2233"/>`},
    mother: {line:'جبتلك وردة لست الحبايب.',
      hold:`<path d="M98 66V36" stroke="#5E8B5A" stroke-width="2.4"/><path d="M98 52q-9-1-11-10 8 0 11 8z" fill="#7FA37A"/><path d="M90 25q0 13 8 13t8-13l-4 4-4-6.5-4 6.5z" fill="#E07A93"/>`},
    valentine: {line:'قلبي مضوّي إلك.',
      hold:`<path d="M98 63Q104 50 102 37" stroke="#CDAEB8" stroke-width="1.2" fill="none"/><path d="M102 37s-14-8-14-18a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 10-14 18-14 18z" fill="#E9899F"/><path d="M93 17a4 4 0 0 1 4-3" stroke="#fff" stroke-width="1.6" fill="none" opacity=".55" stroke-linecap="round"/>`},
    halloween: {line:'بوو! لا تخاف، أنا قنديل.',
      head:`<ellipse cx="60" cy="30" rx="27" ry="5" fill="#2A2233"/><path d="M46 30 59 5q4-7 12-4-7 3-5 10l7 19z" fill="#2A2233"/><path d="M48.5 25.5h23" stroke="#F0893D" stroke-width="4"/>`,
      hold:`<path d="M100 58v-5" stroke="#6C7C47" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="94.5" cy="66" rx="6" ry="7.5" fill="#E5762F"/><ellipse cx="105.5" cy="66" rx="6" ry="7.5" fill="#E5762F"/><ellipse cx="100" cy="66" rx="7" ry="8.2" fill="#F08A3D"/><path d="M96 64l2-2.4 2 2.4zM100 64l2-2.4 2 2.4zM96 69q4 3 8 0" stroke="#5A2A0E" stroke-width="1" fill="#5A2A0E"/>`},
    christmas: {line:'ميلاد مجيد وسنة حلوة للكل!',
      head:`<path d="M40 31Q55 2 82 8q11 3 12 15" fill="#C8102E"/><rect x="37" y="26" width="47" height="8" rx="4" fill="#fff"/><circle cx="94" cy="24" r="5" fill="#fff"/>`,
      front:`<rect x="31" y="41" width="58" height="7" rx="3" fill="#C8102E"/><path d="M39 41v7M51 41v7M63 41v7M75 41v7" stroke="#fff" stroke-width="3"/><path d="M75 46l3 15 7-2-3-13z" fill="#C8102E"/><path d="M77 52l6-2" stroke="#fff" stroke-width="2.4"/>`},
    liberation: {line:'عيد التحرير مبارك، والفرحة إلنا كلنا.',
      // the flag stays accurate: green / white with three red stars / black, 2:3
      hold:`<path d="M98 72V7" stroke="#D8D2C4" stroke-width="2.4" stroke-linecap="round"/><g class="q-flag"><rect x="99" y="8" width="30" height="6.67" fill="#0B6E3A"/><rect x="99" y="14.67" width="30" height="6.67" fill="#fff"/><rect x="99" y="21.33" width="30" height="6.67" fill="#141414"/>${star(106.5, 18.2, 2.3, '#C8102E')}${star(114, 18.2, 2.3, '#C8102E')}${star(121.5, 18.2, 2.3, '#C8102E')}<rect x="99" y="8" width="30" height="20" fill="none" stroke="#000" stroke-opacity=".12" stroke-width=".6"/></g>`},
    father: {line:'لبست نضارات البابا، شو رأيك؟',
      front:`<g fill="none" stroke="${INK}" stroke-width="1.8"><circle cx="51" cy="70" r="7"/><circle cx="69" cy="70" r="7"/><path d="M58 69.5h4M44 69l-8-3M76 69l8-3"/></g>`,
      hold:`<path class="q-steam" d="M95 54q-3-4 0-8M101 54q3-4 0-8" stroke="#B9C4C7" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".8"/><path d="M92 57h13v9q0 6-6 6h-1q-6 0-6-6z" fill="#3C5A63"/><path d="M105 60h2a3.4 3.4 0 0 1 0 7h-2" stroke="#3C5A63" stroke-width="2.2" fill="none"/><path d="M92 61h13" stroke="#F4ECE0" stroke-width="2.4"/>`},
    graduation: {line:'مبروك التخرّج يا بطل!',
      head:`<path d="M46 25v6q14 7 28 0v-6l-14 6z" fill="#24345E"/><path d="M28 20 60 8l32 12-32 12z" fill="#151C30"/><path d="M60 20l23 5v12" stroke="#C99A3E" stroke-width="1.8" fill="none"/><path d="M81 37h4l1.4 6.5h-6.8z" fill="#C99A3E"/>`,
      hold:`<g transform="rotate(-32 98 63)"><rect x="85" y="59" width="27" height="8.5" rx="4.2" fill="#F4EBD5"/><ellipse cx="111" cy="63.2" rx="2" ry="4.2" fill="#E2D3B0"/><rect x="96" y="58" width="4.4" height="10.5" fill="#B23A3A"/></g>`},
    night: {line:'السهرة ما بتكمل بلا بوكس!',
      head:`<path d="M49 31 61 1l12 30z" fill="#B9A5F5"/><path d="M51.5 25l19-3.4M54.5 17l13-2.4M57.5 9l7-1.4" stroke="#F5B98D" stroke-width="2.4"/><circle cx="61" cy="1" r="3.8" fill="#F5B98D"/>${star(30, 22, 4, '#F5B98D')}${star(92, 12, 3.4, '#B9A5F5')}`}
  };

  function DCQandil(world){
    const w = WEAR[world] || WEAR.home;
    return `<svg class="qd" viewBox="-12 -8 146 132" width="146" height="132" aria-hidden="true"><g class="q-bob">
      <circle cx="60" cy="74" r="50" fill="#FFD27A" opacity=".2"/>
      <path d="M35 80q-10 3-12 13" fill="none" stroke="${DEEP}" stroke-width="4" stroke-linecap="round"/>${hand(23, 94)}
      <circle cx="60" cy="20" r="5.5" fill="none" stroke="${DEEP}" stroke-width="3"/>
      <path d="M34 42Q60 10 86 42z" fill="${GOLD}"/><path d="M45 36q7-10 15-12" stroke="#F6DFA0" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".8"/>
      <rect x="31" y="41" width="58" height="7" rx="3" fill="${DEEP}"/>
      <rect x="35" y="48" width="50" height="54" rx="12" fill="#F2BC4E"/><circle cx="60" cy="76" r="21" fill="#FFE7A8" opacity=".9"/>
      <path d="M47 50v50M73 50v50" stroke="#E0A93E" stroke-width="2" opacity=".5"/>
      <rect x="35" y="48" width="50" height="54" rx="12" fill="none" stroke="${DEEP}" stroke-width="3"/>
      <path d="M33 101h54l-7 10H40z" fill="${GOLD}"/>
      <ellipse cx="49" cy="114" rx="7" ry="4" fill="${DEEP}"/><ellipse cx="71" cy="114" rx="7" ry="4" fill="${DEEP}"/>
      <g class="q-eyes"><ellipse cx="51" cy="70" rx="3.6" ry="4.8" fill="${INK}"/><ellipse cx="69" cy="70" rx="3.6" ry="4.8" fill="${INK}"/><circle cx="52.3" cy="68.3" r="1.3" fill="#fff"/><circle cx="70.3" cy="68.3" r="1.3" fill="#fff"/></g>
      <circle cx="44" cy="81" r="4.2" fill="#F08FA8" opacity=".55"/><circle cx="76" cy="81" r="4.2" fill="#F08FA8" opacity=".55"/>
      <path d="M54 81q6 6 12 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      ${w.front || ''}${w.head || ''}
      <g class="q-arm${w.hold ? '' : ' wave'}">${w.hold || ''}<path d="M85 78q10-3 13-14" fill="none" stroke="${DEEP}" stroke-width="4" stroke-linecap="round"/>${hand(98, 63)}</g>
    </g></svg>`;
  }
  DCQandil.line = world => (WEAR[world] || WEAR.home).line;
  DCQandil.worlds = Object.keys(WEAR).filter(k => k !== 'home');
  window.DCQandil = DCQandil;

  // ---------- peeking from the corner of every page's hero ----------
  function peek(){
    const hero = document.querySelector('.w-hero, .hero, .bx-hero');
    if (!hero || hero.querySelector('.q-peek')) return;
    const world = document.body.dataset.world || 'home';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'q-peek';
    b.setAttribute('aria-label', 'قنديل، رفيق D&S: ' + DCQandil.line(world));
    b.innerHTML = DCQandil(world) + `<span class="q-say" aria-hidden="true">${DCQandil.line(world)}</span>`;
    hero.appendChild(b);
    let t;
    const talk = ms => { b.classList.add('talk'); clearTimeout(t); t = setTimeout(() => b.classList.remove('talk'), ms); };
    b.addEventListener('click', () => b.classList.contains('talk') ? b.classList.remove('talk') : talk(4200));
    // says hello by himself once per world per visit
    let seen = true;
    try { seen = sessionStorage.getItem('dc-q-' + world); sessionStorage.setItem('dc-q-' + world, '1'); } catch(e) {}
    if (!seen) setTimeout(() => talk(4200), 1400);
    new IntersectionObserver(([e]) => b.classList.toggle('off', !e.isIntersecting)).observe(b);
  }
  // box pages build their hero in a later script, so wait until every script has run
  document.readyState === 'loading' ? addEventListener('DOMContentLoaded', peek) : peek();
})();
