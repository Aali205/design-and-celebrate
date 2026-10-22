/* Design & Celebrate: a light particle layer for the celebration heroes.
   DCScene(canvas, {type, colors, count, dir}) where type is 'confetti' | 'petal' | 'heart' | 'spark'.
   dir 1 = falls, -1 = rises. ~30 fps, DPR capped at 1.5, pauses when the hero is off screen or the tab is hidden.
   Reduced motion: one still frame. */
window.DCScene = function(cv, {type = 'confetti', colors = ['#fff'], count = 40, dir = 1} = {}){
  const ctx = cv.getContext('2d'), TAU = Math.PI * 2;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, dpr, parts = [], visible = true, raf = 0, last = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);

  function make(fresh){
    return {x:rnd(0, W), y:fresh ? rnd(0, H) : dir > 0 ? -20 * dpr : H + 20 * dpr,
      s:rnd(.6, 1.3) * (type === 'confetti' ? 6 : type === 'spark' ? 5 : 9) * dpr,
      v:rnd(.35, 1) * dpr * (type === 'spark' ? .25 : .7), sw:rnd(.6, 1.6), ph:rnd(0, TAU), r:rnd(0, TAU), vr:rnd(-.03, .03),
      c:colors[Math.floor(Math.random() * colors.length)], a:rnd(.55, .95)};
  }
  function size(){
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.width = Math.round(cv.clientWidth * dpr); H = cv.height = Math.round(cv.clientHeight * dpr);
    const n = Math.round(count * Math.min(1, cv.clientWidth / 1100) + count * .25);   // fewer on phones
    parts = Array.from({length:n}, () => make(true));
  }
  function heart(s){
    ctx.beginPath(); ctx.moveTo(0, s * .35);
    ctx.bezierCurveTo(-s * 1.1, -s * .35, -s * .45, -s * 1.05, 0, -s * .45);
    ctx.bezierCurveTo(s * .45, -s * 1.05, s * 1.1, -s * .35, 0, s * .35); ctx.fill();
  }
  function draw(t){
    ctx.clearRect(0, 0, W, H);
    for (const p of parts){
      ctx.save(); ctx.translate(p.x + Math.sin(t * .001 * p.sw + p.ph) * 14 * dpr, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.globalAlpha = p.a;
      if (type === 'confetti'){ ctx.scale(1, Math.cos(t * .003 * p.sw + p.ph)); ctx.fillRect(-p.s / 2, -p.s * .3, p.s, p.s * .6); }
      else if (type === 'petal'){ ctx.scale(1, .55 + .45 * Math.cos(t * .002 * p.sw + p.ph)); ctx.beginPath(); ctx.ellipse(0, 0, p.s * .55, p.s, 0, 0, TAU); ctx.fill(); }
      else if (type === 'heart'){ ctx.rotate(-p.r * .85); heart(p.s); }
      else { ctx.globalAlpha = p.a * (.35 + .65 * Math.abs(Math.sin(t * .0015 * p.sw + p.ph)));   // spark: a twinkling 4-point star
        const s = p.s; ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill(); }
      ctx.restore();
    }
  }
  function step(t){
    raf = requestAnimationFrame(step);
    if (t - last < 32) return;                          // ~30 fps is plenty for drifting particles
    last = t;
    for (const p of parts){
      p.y += p.v * dir * 1.6; p.r += p.vr;
      if (dir > 0 ? p.y > H + 30 * dpr : p.y < -30 * dpr) Object.assign(p, make(false));
    }
    draw(t);
  }
  const run = () => { cancelAnimationFrame(raf); if (visible && !document.hidden && !reduce) raf = requestAnimationFrame(step); };
  size(); draw(0);
  addEventListener('resize', () => { size(); draw(0); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(cv);
  document.addEventListener('visibilitychange', run);
};
