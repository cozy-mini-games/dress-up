// 🫧 刷刷洗洗：用手指把髒污刷掉，刷到 96% 就過關
(() => {
  // ---- 可以刷的東西（都在 300×300 的座標裡畫）----
  const OBJ = [
    { name: '小盤子', dirt: 'sauce', draw(g){
      g.fillStyle = '#0000000f'; ell(g, 150, 262, 110, 16);
      g.fillStyle = '#ffffff'; g.strokeStyle = '#c9dbe6'; g.lineWidth = 4; circ(g, 150, 150, 118, true);
      g.strokeStyle = '#dbe8ef'; g.lineWidth = 3; circ(g, 150, 150, 82, false, true);
      for (let i = 0; i < 10; i++){ const a = i / 10 * Math.PI * 2; flower(g, 150 + Math.cos(a) * 100, 150 + Math.sin(a) * 100, 8, i % 2 ? '#f5a3c0' : '#8ccfe8'); }
      face(g, 150, 150, 1);
    }},
    { name: '小狗狗', dirt: 'mud', draw(g){
      g.fillStyle = '#0000000f'; ell(g, 150, 272, 96, 14);
      g.fillStyle = '#b07a52'; ell(g, 66, 120, 34, 62, -0.35); ell(g, 234, 120, 34, 62, 0.35);
      g.fillStyle = '#f2d2a9'; g.strokeStyle = '#c99a6b'; g.lineWidth = 4; ell(g, 150, 158, 104, 98, 0, true);
      g.fillStyle = '#fff3e2'; ell(g, 150, 196, 56, 42);
      g.fillStyle = '#3d2a20'; ell(g, 112, 146, 10, 13); ell(g, 188, 146, 10, 13); ell(g, 150, 180, 16, 11);
      g.fillStyle = '#fff'; circ(g, 115, 141, 4); circ(g, 191, 141, 4);
      g.fillStyle = '#f59fa2'; ell(g, 150, 214, 11, 14);
      g.strokeStyle = '#3d2a20'; g.lineWidth = 3.5; g.lineCap = 'round';
      g.beginPath(); g.moveTo(150, 190); g.lineTo(150, 200); g.quadraticCurveTo(140, 210, 132, 202); g.moveTo(150, 200); g.quadraticCurveTo(160, 210, 168, 202); g.stroke();
      g.fillStyle = '#f7a8a8aa'; ell(g, 92, 182, 14, 8); ell(g, 208, 182, 14, 8);
    }},
    { name: '小木屋', dirt: 'moss', draw(g){
      g.fillStyle = '#0000000f'; ell(g, 150, 276, 120, 12);
      g.fillStyle = '#c98d5a'; g.fillRect(196, 50, 26, 50);
      g.fillStyle = '#fbe7c6'; g.strokeStyle = '#d3a874'; g.lineWidth = 4; rr(g, 58, 132, 184, 140, 10, true);
      g.fillStyle = '#e88a7a'; g.strokeStyle = '#c56b5c'; g.beginPath(); g.moveTo(34, 142); g.lineTo(150, 46); g.lineTo(266, 142); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#9b6b4a'; rr(g, 128, 196, 44, 76, 20, false);
      g.fillStyle = '#f7d36b'; circ(g, 162, 236, 4);
      g.fillStyle = '#bfe4f5'; g.strokeStyle = '#d3a874'; g.lineWidth = 4; rr(g, 76, 166, 38, 38, 6, true); rr(g, 186, 166, 38, 38, 6, true);
      g.beginPath(); g.moveTo(95, 166); g.lineTo(95, 204); g.moveTo(76, 185); g.lineTo(114, 185); g.moveTo(205, 166); g.lineTo(205, 204); g.moveTo(186, 185); g.lineTo(224, 185); g.stroke();
      flower(g, 70, 268, 9, '#f5a3c0'); flower(g, 230, 268, 9, '#f7cf6b');
      face(g, 150, 108, .7);
    }},
    { name: '小黃鴨', dirt: 'ink', draw(g){
      g.fillStyle = '#7cc4ea55'; ell(g, 150, 262, 128, 22);
      g.fillStyle = '#ffd95a'; g.strokeStyle = '#e8b52c'; g.lineWidth = 4;
      ell(g, 160, 200, 104, 62, 0, true); circ(g, 112, 116, 56, true);
      g.fillStyle = '#ffd95a'; ell(g, 160, 200, 100, 58);
      g.fillStyle = '#f39a3a'; g.beginPath(); g.ellipse(58, 128, 26, 13, -0.15, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#3d2a20'; circ(g, 104, 104, 9); g.fillStyle = '#fff'; circ(g, 107, 100, 3.5);
      g.fillStyle = '#f7a8a8aa'; ell(g, 128, 132, 13, 8);
      g.strokeStyle = '#e8b52c'; g.lineWidth = 4; g.beginPath(); g.moveTo(170, 180); g.quadraticCurveTo(206, 168, 226, 196); g.stroke();
    }},
    { name: '小汽車', dirt: 'mud', draw(g){
      g.fillStyle = '#0000000f'; ell(g, 150, 250, 124, 12);
      g.fillStyle = '#8ccfe8'; g.strokeStyle = '#5ea9c7'; g.lineWidth = 4;
      rr(g, 40, 150, 220, 74, 26, true);
      g.beginPath(); g.moveTo(84, 152); g.quadraticCurveTo(100, 90, 150, 90); g.quadraticCurveTo(200, 90, 216, 152); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#e6f6fd'; g.beginPath(); g.moveTo(100, 148); g.quadraticCurveTo(112, 106, 146, 104); g.lineTo(146, 148); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(200, 148); g.quadraticCurveTo(188, 106, 154, 104); g.lineTo(154, 148); g.closePath(); g.fill();
      g.fillStyle = '#4a4a5a'; circ(g, 92, 226, 26); circ(g, 208, 226, 26); g.fillStyle = '#d7d7e0'; circ(g, 92, 226, 11); circ(g, 208, 226, 11);
      g.fillStyle = '#fff6b0'; ell(g, 252, 178, 8, 12); g.fillStyle = '#f5a3c0'; ell(g, 48, 178, 7, 11);
      face(g, 150, 190, .8);
    }},
  ];
  const DIRT = {
    mud:   { c: ['#8a5a36', '#9b6a42', '#6e4428', '#a77a4e'], foam: '#f3e8dc' },
    sauce: { c: ['#d9603a', '#c94f2e', '#e8814a', '#b8432a'], foam: '#fff1e8' },
    moss:  { c: ['#7d9a4a', '#6a8a3a', '#93ad5c', '#5c7a34'], foam: '#eef6e4' },
    ink:   { c: ['#6b6487', '#5a547a', '#7e7799', '#4d4769'], foam: '#f0eef8' },
  };

  function circ(g, x, y, r, stroke, onlyStroke){ g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); if (!onlyStroke) g.fill(); if (stroke || onlyStroke) g.stroke(); }
  function ell(g, x, y, rx, ry, rot = 0, stroke){ g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); if (stroke) g.stroke(); }
  function rr(g, x, y, w, h, r, stroke){ g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); if (stroke) g.stroke(); }
  function face(g, x, y, k){
    g.fillStyle = '#4a3550'; ell(g, x - 22 * k, y, 6 * k, 8 * k); ell(g, x + 22 * k, y, 6 * k, 8 * k);
    g.fillStyle = '#fff'; circ(g, x - 20 * k, y - 3 * k, 2.4 * k); circ(g, x + 24 * k, y - 3 * k, 2.4 * k);
    g.fillStyle = '#f7a8b0aa'; ell(g, x - 38 * k, y + 12 * k, 10 * k, 6 * k); ell(g, x + 38 * k, y + 12 * k, 10 * k, 6 * k);
    g.strokeStyle = '#4a3550'; g.lineWidth = 3 * k; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - 7 * k, y + 10 * k); g.quadraticCurveTo(x - 3.5 * k, y + 15 * k, x, y + 10 * k); g.quadraticCurveTo(x + 3.5 * k, y + 15 * k, x + 7 * k, y + 10 * k); g.stroke();
  }
  function flower(g, x, y, r, c){ g.fillStyle = c; for (let k = 0; k < 5; k++){ const a = k / 5 * Math.PI * 2; circ(g, x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7, r * .55); } g.fillStyle = '#fff6b0'; circ(g, x, y, r * .4); }

  let root, cv, ctx, obj, dirt, small, raf, foam = [], shine = [], level, W, H, S, OX, OY, dpr, initial = 1, last = null, moves = 0, finished = false, pct = 0;

  function mount(el){
    root = el; level = App.store.get('washLevel', 0);
    el.innerHTML = `
      <div class="bar"><span id="wName"></span><div class="prog"><i id="wProg"></i></div><span id="wPct">0%</span></div>
      <div id="wBox" style="flex:1;min-height:0;position:relative;margin:0 12px 12px;border-radius:24px;overflow:hidden;background:#dff0f7">
        <canvas id="wCv" style="position:absolute;inset:0;width:100%;height:100%;touch-action:none"></canvas>
        <div style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font-size:13px;color:#6f9bb0;pointer-events:none" id="wTip">用手指刷刷看 ✨</div>
        <div class="done" id="wDone"><div><h2>好乾淨！✨</h2><p id="wMsg"></p><button class="btn" id="wNext">下一個</button></div></div>
      </div>`;
    cv = el.querySelector('#wCv'); ctx = cv.getContext('2d');
    el.querySelector('#wNext').onclick = () => { level++; App.store.set('washLevel', level); setup(); };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('pointerleave', up);
    addEventListener('resize', setup);
    setup(); loop();
  }
  function unmount(){ cancelAnimationFrame(raf); removeEventListener('resize', setup); }

  function setup(){
    finished = false; foam = []; shine = []; moves = 0; pct = 0;
    root.querySelector('#wDone').classList.remove('show'); root.querySelector('#wTip').style.opacity = 1;
    const box = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1);
    W = cv.width = Math.round(box.width * dpr); H = cv.height = Math.round(box.height * dpr);
    S = Math.min(W, H) / 330; OX = (W - 300 * S) / 2; OY = (H - 300 * S) / 2;
    const o = OBJ[level % OBJ.length], d = DIRT[o.dirt];
    root.querySelector('#wName').textContent = `第 ${level + 1} 個・${o.name}`;
    obj = document.createElement('canvas'); obj.width = W; obj.height = H;
    const g = obj.getContext('2d'); g.setTransform(S, 0, 0, S, OX, OY); g.lineJoin = 'round'; o.draw(g);
    // 髒污：很多隨機的污漬塊，只留在物品上
    dirt = document.createElement('canvas'); dirt.width = W; dirt.height = H;
    const dg = dirt.getContext('2d'); dg.setTransform(S, 0, 0, S, OX, OY);
    const rnd = mulberry(level * 7919 + 13);
    for (let i = 0; i < 70; i++){
      const x = 20 + rnd() * 260, y = 20 + rnd() * 260, r = 14 + rnd() * 34;
      const gr = dg.createRadialGradient(x, y, 0, x, y, r);
      const col = d.c[i % d.c.length]; gr.addColorStop(0, col); gr.addColorStop(.7, col + 'dd'); gr.addColorStop(1, col + '00');
      dg.fillStyle = gr; dg.beginPath();
      for (let k = 0; k <= 10; k++){ const a = k / 10 * Math.PI * 2, rr2 = r * (.7 + rnd() * .4); k ? dg.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2) : dg.moveTo(x + rr2, y); }
      dg.fill();
    }
    for (let i = 0; i < 160; i++){ dg.fillStyle = d.c[i % 4] + 'cc'; circ(dg, 10 + rnd() * 280, 10 + rnd() * 280, 1.5 + rnd() * 4); }
    dg.setTransform(1, 0, 0, 1, 0, 0); dg.globalCompositeOperation = 'destination-in'; dg.drawImage(obj, 0, 0); dg.globalCompositeOperation = 'source-over';
    small = document.createElement('canvas'); small.width = 80; small.height = 80;
    initial = count() || 1; updateBar();
    obj.foam = d.foam;
  }
  function mulberry(a){ return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function count(){
    const s = small.getContext('2d'); s.clearRect(0, 0, 80, 80); s.drawImage(dirt, 0, 0, 80, 80);
    const a = s.getImageData(0, 0, 80, 80).data; let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 40) n++; return n;
  }
  function pos(e){ const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr }; }
  function down(e){ if (finished) return; cv.setPointerCapture(e.pointerId); last = pos(e); scrub(last, last); root.querySelector('#wTip').style.opacity = 0; }
  function up(){ last = null; }
  function move(e){
    if (!last || finished) return;
    const p = pos(e); scrub(last, p);
    const v = Math.hypot(p.x - last.x, p.y - last.y) / dpr;
    if (v > 6 && Math.random() < .5) App.SFX.scrub(Math.min(1, v / 40));
    if (Math.random() < .08) App.buzz(5);
    last = p;
    if (++moves % 8 === 0){ pct = 1 - count() / initial; updateBar(); if (pct >= .96) finish(); }
  }
  function scrub(a, b){
    const g = dirt.getContext('2d');
    g.globalCompositeOperation = 'destination-out'; g.lineCap = 'round'; g.lineJoin = 'round';
    g.globalAlpha = .55; g.lineWidth = 46 * S; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    const n = 1 + Math.floor(Math.hypot(b.x - a.x, b.y - a.y) / (14 * S));
    for (let i = 0; i < n && foam.length < 260; i++){
      foam.push({ x: b.x + (Math.random() - .5) * 40 * S, y: b.y + (Math.random() - .5) * 40 * S, r: (4 + Math.random() * 11) * S, life: 1, vy: -(.1 + Math.random() * .4) * S });
    }
  }
  function updateBar(){
    const p = Math.max(0, Math.min(1, pct));
    root.querySelector('#wProg').style.width = (p * 100) + '%';
    root.querySelector('#wPct').textContent = Math.floor(p * 100) + '%';
  }
  function finish(){
    finished = true; pct = 1; updateBar();
    dirt.getContext('2d').clearRect(0, 0, W, H);
    for (let i = 0; i < 18; i++) shine.push({ x: OX + (40 + Math.random() * 220) * S, y: OY + (40 + Math.random() * 220) * S, t: -Math.random() * 40, s: (8 + Math.random() * 10) * S });
    App.SFX.ding(); App.buzz([20, 40, 20]);
    const r = cv.getBoundingClientRect(); App.burst(r.left + r.width / 2, r.top + r.height / 2, ['✦', '✧', '★', '♡'], 16);
    const msgs = ['亮晶晶的，好舒服～', '像新的一樣！', '洗得香噴噴 ♡', '辛苦了，你好棒！'];
    root.querySelector('#wMsg').textContent = msgs[level % msgs.length];
    setTimeout(() => root.querySelector('#wDone').classList.add('show'), 1300);
  }
  function loop(){
    raf = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, W, H);
    // 背景磁磚
    ctx.fillStyle = '#e6f4fa'; const t = 34 * dpr;
    for (let y = 0; y < H; y += t) for (let x = (y / t) % 2 ? t : 0; x < W; x += t * 2) ctx.fillRect(x, y, t, t);
    ctx.drawImage(obj, 0, 0); ctx.drawImage(dirt, 0, 0);
    // 泡泡
    for (let i = foam.length - 1; i >= 0; i--){
      const f = foam[i]; f.life -= .006; f.y += f.vy;
      if (f.life <= 0){ foam.splice(i, 1); continue; }
      ctx.globalAlpha = Math.min(1, f.life * 1.6);
      ctx.fillStyle = obj.foam; ctx.strokeStyle = '#b9dcec'; ctx.lineWidth = 1.2 * dpr;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(f.x - f.r * .35, f.y - f.r * .35, f.r * .25, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // 亮晶晶
    for (const s of shine){
      s.t++; if (s.t < 0) continue; const k = Math.sin(Math.min(Math.PI, s.t / 30 * Math.PI)); if (s.t > 30) s.t = -20 - Math.random() * 40;
      ctx.fillStyle = '#ffffff'; ctx.globalAlpha = k; const z = s.s * k;
      ctx.beginPath(); ctx.moveTo(s.x, s.y - z); ctx.quadraticCurveTo(s.x, s.y, s.x + z, s.y); ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + z); ctx.quadraticCurveTo(s.x, s.y, s.x - z, s.y); ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - z); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  App.register({ id: 'wash', name: '刷刷洗洗', mount, unmount, progress: () => `已洗 ${App.store.get('washLevel', 0)} 個` });
})();
