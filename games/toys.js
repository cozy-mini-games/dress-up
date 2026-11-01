// 🧸 解壓玩具盒：泡泡紙、史萊姆、按鈕板、指尖陀螺
(() => {
  let root, raf, slime, spin;

  function mount(el){
    root = el;
    el.innerHTML = `
      <div id="tBox" style="flex:1;min-height:0;overflow:auto;padding:4px 14px 24px">
        <div class="tp" style="background:#dff0f7">
          <h3>泡泡紙 <small>一顆一顆壓破，也可以用手指滑過去</small></h3>
          <div id="wrap"></div>
        </div>
        <div class="tp" style="background:#f6e1ef">
          <h3>史萊姆 <small>壓壓看、拉拉看</small><button id="slColor" class="mini">換顏色</button></h3>
          <canvas id="slime" style="width:100%;height:230px;display:block;touch-action:none"></canvas>
        </div>
        <div class="tp" style="background:#fdeccf">
          <h3>按鈕板 <small>按到停不下來</small></h3>
          <div id="keys"></div>
        </div>
        <div class="tp" style="background:#e6e9fb">
          <h3>指尖陀螺 <small>用手指撥它轉起來</small> <span id="rpm" class="mini" style="background:#fff8">0 圈</span></h3>
          <div id="spinBox" style="height:230px;display:flex;align-items:center;justify-content:center;touch-action:none">
            <svg id="spinner" viewBox="-110 -110 220 220" style="width:210px;height:210px;overflow:visible">
              <g id="spinG">
                ${[0, 120, 240].map(a => `<g transform="rotate(${a})"><path d="M-26 -14 Q -30 -64 0 -78 Q 30 -64 26 -14 Z" fill="#b9a3ef"/><circle cy="-72" r="30" fill="#b9a3ef"/><circle cy="-72" r="18" fill="#fff" stroke="#8f78d4" stroke-width="4"/><circle cy="-72" r="7" fill="#f5a3c0"/></g>`).join('')}
                <circle r="34" fill="#cbbaf3"/><circle r="22" fill="#fff" stroke="#8f78d4" stroke-width="4"/>
                <circle r="9" fill="#f7cf6b"/><path d="M-6 -30 Q 0 -36 6 -30" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <style>
        .tp{border-radius:22px;padding:12px 12px 14px;margin-bottom:14px;box-shadow:0 4px 0 #0000000d;}
        .tp h3{margin:0 0 10px;font-size:17px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
        .tp small{font-size:12px;font-weight:500;opacity:.65;flex:1;}
        .mini{border:0;border-radius:999px;padding:5px 10px;font-size:12px;font-weight:800;background:#fff;}
        #wrap{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;touch-action:none;background:#eaf6fb;border-radius:14px;padding:10px;}
        .bub{aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 14%,#d9f0fa 30%,#a9d8ee 100%);box-shadow:inset 0 -3px 0 #8cc4dd,0 2px 0 #0000000f;transition:transform .12s;}
        .bub.p{background:radial-gradient(circle at 50% 50%,#e3f2f8 0 40%,#cfe6f0 100%);box-shadow:inset 0 2px 3px #0000001a;transform:scale(.86);}
        .bub.p::after{content:"";display:block;width:100%;height:100%;background:linear-gradient(35deg,transparent 46%,#b5d6e4 48%,transparent 52%),linear-gradient(-50deg,transparent 46%,#b5d6e4 48%,transparent 52%);border-radius:50%;}
        #keys{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:4px;}
        .key{aspect-ratio:1;border:0;border-radius:50%;box-shadow:0 7px 0 var(--d),0 9px 6px #0000001a;transform:translateY(0);transition:transform .06s,box-shadow .06s,filter .2s;background:var(--c);}
        .key.dn{transform:translateY(6px);box-shadow:0 1px 0 var(--d),0 2px 3px #0000001a;}
        .key.on{filter:brightness(1.12) saturate(1.3);box-shadow:0 7px 0 var(--d),0 0 0 4px #fff,0 0 16px var(--c);}
        .key.on.dn{box-shadow:0 1px 0 var(--d),0 0 0 4px #fff,0 0 16px var(--c);}
      </style>`;
    bubbleWrap(); keys(); slimeInit(); spinnerInit();
    loop();
  }
  function unmount(){ cancelAnimationFrame(raf); }

  // ---------- 泡泡紙 ----------
  function bubbleWrap(){
    const w = root.querySelector('#wrap'); w.innerHTML = '';
    for (let i = 0; i < 36; i++){ const b = document.createElement('div'); b.className = 'bub'; w.appendChild(b); }
    let down = false;
    const hit = (x, y) => { const e = document.elementFromPoint(x, y); if (e && e.classList.contains('bub') && !e.classList.contains('p')) pop(e); };
    w.onpointerdown = e => { down = true; w.setPointerCapture(e.pointerId); hit(e.clientX, e.clientY); };
    w.onpointermove = e => { if (down) hit(e.clientX, e.clientY); };
    w.onpointerup = w.onpointercancel = () => down = false;
    function pop(b){
      b.classList.add('p'); App.SFX.pop(); App.buzz(10);
      if (Math.random() < .3){ const r = b.getBoundingClientRect(); App.burst(r.left + r.width / 2, r.top + r.height / 2, ['·', '✦'], 3, ['#8cc4dd', '#fff']); }
      if (!w.querySelector('.bub:not(.p)')){ App.toast('全部壓破了！換一張 ✨'); setTimeout(() => { App.SFX.whoosh(); bubbleWrap(); }, 700); }
    }
  }

  // ---------- 按鈕板 ----------
  function keys(){
    const k = root.querySelector('#keys');
    const C = [['#f5a3c0', '#d97fa1'], ['#8ccfe8', '#5ea9c7'], ['#f7cf6b', '#d9a93a'], ['#9ad8a6', '#68b47a'], ['#b9a3ef', '#8f78d4'], ['#f7a56b', '#d9823b'], ['#f08a8a', '#c9605e'], ['#8fd6c3', '#58a893']];
    k.innerHTML = C.map(([c, d]) => `<button class="key" style="--c:${c};--d:${d}"></button>`).join('');
    k.querySelectorAll('.key').forEach((b, i) => {
      b.onpointerdown = e => { e.preventDefault(); b.classList.add('dn'); App.SFX.click(); App.buzz(12); };
      b.onpointerup = b.onpointerleave = b.onpointercancel = () => { if (b.classList.contains('dn')){ b.classList.remove('dn'); b.classList.toggle('on'); try { App.SFX.click(); } catch(e){} } };
    });
  }

  // ---------- 史萊姆（彈簧點組成的軟軟一團）----------
  const SLC = [['#f5a3c0', '#f9c6d8', '#d97fa1'], ['#8fd6c3', '#bdeadb', '#58a893'], ['#b9a3ef', '#d8cdf8', '#8f78d4'], ['#8ccfe8', '#c4e6f4', '#5ea9c7'], ['#f7cf6b', '#fbe3a3', '#d9a93a']];
  function slimeInit(){
    const cv = root.querySelector('#slime'), dpr = Math.min(2, devicePixelRatio || 1);
    const r = cv.getBoundingClientRect(); cv.width = r.width * dpr; cv.height = r.height * dpr;
    const N = 36, R = Math.min(cv.width, cv.height) * .36;
    slime = { cv, g: cv.getContext('2d'), dpr, N, R, cx: cv.width / 2, cy: cv.height * .54, pts: Array.from({ length: N }, () => ({ o: 0, v: 0 })), col: App.store.get('slimeColor', 0), press: null, squint: 0 };
    root.querySelector('#slColor').onclick = () => { slime.col = (slime.col + 1) % SLC.length; App.store.set('slimeColor', slime.col); App.SFX.squish(); wobble(1); };
    const pos = e => { const b = cv.getBoundingClientRect(); return { x: (e.clientX - b.left) * dpr, y: (e.clientY - b.top) * dpr }; };
    cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); slime.press = pos(e); slime.start = slime.press; App.SFX.squish(); App.buzz(15); };
    cv.onpointermove = e => { if (slime.press){ const p = pos(e); if (Math.hypot(p.x - slime.press.x, p.y - slime.press.y) > 30 * dpr && Math.random() < .15) App.SFX.squish(); slime.press = p; } };
    cv.onpointerup = cv.onpointercancel = () => { if (slime.press){ wobble(.6); App.SFX.squish(); } slime.press = null; };
  }
  function wobble(k){ slime.pts.forEach((p, i) => p.v += Math.sin(i * 1.7) * slime.R * .04 * k); }
  function slimeStep(){
    const s = slime, g = s.g, W = s.cv.width, H = s.cv.height;
    let pull = null;
    if (s.press){
      const dx = s.press.x - s.cx, dy = s.press.y - s.cy, d = Math.hypot(dx, dy);
      pull = { a: Math.atan2(dy, dx), d };
      s.squint = Math.min(1, s.squint + .15);
    } else s.squint = Math.max(0, s.squint - .08);
    let sum = 0;
    s.pts.forEach((p, i) => {
      const a = i / s.N * Math.PI * 2;
      let target = 0;
      if (pull){
        const diff = Math.atan2(Math.sin(a - pull.a), Math.cos(a - pull.a)), w = Math.exp(-diff * diff * 3);
        // 手指在裡面＝壓扁凹進去；手指拉到外面＝被拉長
        target = pull.d < s.R ? -(s.R - pull.d) * .9 * w + (s.R - pull.d) * .25 * (1 - w) : Math.min(pull.d - s.R, s.R * 1.1) * w;
      }
      p.v += (target - p.o) * .08; p.v *= .86; sum += p.o;
    });
    // 維持體積：整體平均回到 0
    const avg = sum / s.N; s.pts.forEach(p => p.o += p.v - avg * .05);
    // 畫
    g.clearRect(0, 0, W, H);
    const pts = s.pts.map((p, i) => { const a = i / s.N * Math.PI * 2, rr = s.R + p.o; return [s.cx + Math.cos(a) * rr * 1.12, s.cy + Math.sin(a) * rr * .92]; });
    g.fillStyle = '#0000000f'; g.beginPath(); g.ellipse(s.cx, s.cy + s.R * .95, s.R * 1.1, s.R * .18, 0, 0, Math.PI * 2); g.fill();
    const [c1, c2, c3] = SLC[s.col];
    const gr = g.createRadialGradient(s.cx - s.R * .35, s.cy - s.R * .45, s.R * .1, s.cx, s.cy, s.R * 1.3);
    gr.addColorStop(0, c2); gr.addColorStop(1, c1);
    g.fillStyle = gr; g.strokeStyle = c3; g.lineWidth = 3 * s.dpr;
    g.beginPath();
    for (let i = 0; i <= s.N; i++){
      const p = pts[i % s.N], q = pts[(i + 1) % s.N], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      i ? g.quadraticCurveTo(p[0], p[1], mx, my) : g.moveTo(mx, my);
    }
    g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffffaa'; g.beginPath(); g.ellipse(s.cx - s.R * .45, s.cy - s.R * .45, s.R * .22, s.R * .12, -.6, 0, Math.PI * 2); g.fill();
    // 臉
    const ey = s.cy - s.R * .05, ex = s.R * .32, sq = s.squint;
    g.strokeStyle = g.fillStyle = '#4a3550'; g.lineWidth = 3.4 * s.dpr; g.lineCap = 'round';
    for (const sx of [-1, 1]){
      if (sq > .5){ g.beginPath(); g.moveTo(s.cx + sx * ex - 9 * s.dpr, ey - 4 * s.dpr); g.lineTo(s.cx + sx * ex + 3 * s.dpr * sx, ey); g.lineTo(s.cx + sx * ex - 9 * s.dpr, ey + 4 * s.dpr); g.stroke(); }
      else { g.beginPath(); g.ellipse(s.cx + sx * ex, ey, 6 * s.dpr, 8 * s.dpr * (1 - sq), 0, 0, Math.PI * 2); g.fill(); }
    }
    g.fillStyle = '#f08aa080'; g.beginPath(); g.ellipse(s.cx - ex * 1.5, ey + 16 * s.dpr, 11 * s.dpr, 6 * s.dpr, 0, 0, Math.PI * 2); g.ellipse(s.cx + ex * 1.5, ey + 16 * s.dpr, 11 * s.dpr, 6 * s.dpr, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); if (sq > .5){ g.arc(s.cx, ey + 14 * s.dpr, 7 * s.dpr, 0, Math.PI); g.fillStyle = '#4a3550'; g.fill(); } else { g.moveTo(s.cx - 6 * s.dpr, ey + 14 * s.dpr); g.quadraticCurveTo(s.cx, ey + 20 * s.dpr, s.cx + 6 * s.dpr, ey + 14 * s.dpr); g.stroke(); }
  }

  // ---------- 指尖陀螺 ----------
  function spinnerInit(){
    const box = root.querySelector('#spinBox');
    spin = { a: 0, v: 0, last: null, turns: App.store.get('spinTurns', 0), acc: 0, sndAcc: 0 };
    const ang = e => { const r = box.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)); };
    box.onpointerdown = e => { box.setPointerCapture(e.pointerId); spin.last = { a: ang(e), t: performance.now() }; spin.v *= .5; App.buzz(6); };
    box.onpointermove = e => {
      if (!spin.last) return;
      const a = ang(e), t = performance.now(); let d = a - spin.last.a; d = Math.atan2(Math.sin(d), Math.cos(d));
      spin.a += d; spin.v = spin.v * .5 + d / Math.max(8, t - spin.last.t) * 16 * .5 * 1.4; spin.last = { a, t };
    };
    box.onpointerup = box.onpointercancel = () => { spin.last = null; if (Math.abs(spin.v) > .2) App.SFX.whoosh(); };
  }
  function spinStep(){
    const s = spin;
    if (!s.last){ s.a += s.v; s.v *= .993; if (Math.abs(s.v) < .002) s.v = 0; }
    s.v = Math.max(-1.2, Math.min(1.2, s.v));
    s.acc += Math.abs(s.v); s.sndAcc += Math.abs(s.v);
    if (s.sndAcc > Math.PI * 2 / 3){ s.sndAcc = 0; if (Math.abs(s.v) > .05 && !s.last) App.SFX.scrub(Math.min(1, Math.abs(s.v))); }
    if (s.acc > Math.PI * 2){ s.acc -= Math.PI * 2; s.turns++; if (s.turns % 20 === 0) App.store.set('spinTurns', s.turns); root.querySelector('#rpm').textContent = s.turns + ' 圈'; }
    root.querySelector('#spinG').setAttribute('transform', `rotate(${s.a * 180 / Math.PI})`);
  }

  function loop(){ raf = requestAnimationFrame(loop); slimeStep(); spinStep(); }

  App.register({ id: 'toys', name: '解壓玩具盒', mount, unmount });
})();
