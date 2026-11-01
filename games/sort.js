// 🗂️ 整理小收納：把亂放的東西拖回剛剛好的位置，放對會「咔」地吸進去
(() => {
  // 每樣東西：w,h（邏輯尺寸）＋ svg 內容（viewBox 0 0 w h）
  const ITEMS = {
    pencil:  { w: 22, h: 150, s: `<rect x="3" y="18" width="16" height="112" rx="2" fill="#f7cf6b" stroke="#d9a93a" stroke-width="2"/><rect x="3" y="118" width="16" height="12" fill="#c9c9d6"/><rect x="3" y="130" width="16" height="16" rx="5" fill="#f5a3c0"/><path d="M3 18 L11 2 L19 18 Z" fill="#f3dcb4" stroke="#d9a93a" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 7 L11 2 L13.5 7 Z" fill="#555"/>` },
    eraser:  { w: 56, h: 34, s: `<rect x="2" y="2" width="52" height="30" rx="6" fill="#fff" stroke="#c9d3dd" stroke-width="2"/><rect x="2" y="2" width="22" height="30" rx="6" fill="#8ccfe8"/><rect x="18" y="2" width="6" height="30" fill="#8ccfe8"/><circle cx="34.2" cy="15" r="1.4400000000000002" fill="#4a3550"/><circle cx="43.8" cy="15" r="1.4400000000000002" fill="#4a3550"/><path d="M37.0 17.4 Q39 19.4 41.0 17.4" stroke="#4a3550" stroke-width="1.1199999999999999" fill="none" stroke-linecap="round"/><ellipse cx="30.2" cy="17.4" rx="2.4000000000000004" ry="1.4400000000000002" fill="#f7a8a8"/><ellipse cx="47.8" cy="17.4" rx="2.4000000000000004" ry="1.4400000000000002" fill="#f7a8a8"/>` },
    ruler:   { w: 32, h: 176, s: `<rect x="2" y="2" width="28" height="172" rx="4" fill="#bfe8d6" stroke="#7cc9b4" stroke-width="2"/>${Array.from({ length: 16 }, (_, i) => `<line x1="2" x2="${i % 4 ? 10 : 16}" y1="${12 + i * 10}" y2="${12 + i * 10}" stroke="#58a893" stroke-width="1.6"/>`).join('')}` },
    scissors:{ w: 64, h: 116, s: `<path d="M24 58 L44 4 M40 58 L20 4" stroke="#b9c3cf" stroke-width="7" stroke-linecap="round"/><path d="M24 58 L44 4 M40 58 L20 4" stroke="#dfe6ee" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="90" r="15" fill="none" stroke="#f08a8a" stroke-width="8"/><circle cx="46" cy="90" r="15" fill="none" stroke="#f08a8a" stroke-width="8"/><path d="M24 58 L20 76 M40 58 L44 76" stroke="#f08a8a" stroke-width="8" stroke-linecap="round"/><circle cx="32" cy="58" r="4" fill="#8a94a3"/>` },
    glue:    { w: 36, h: 96, s: `<rect x="4" y="26" width="28" height="66" rx="6" fill="#b9a3ef" stroke="#8f78d4" stroke-width="2"/><rect x="6" y="4" width="24" height="26" rx="5" fill="#fff" stroke="#8f78d4" stroke-width="2"/><rect x="9" y="46" width="18" height="24" rx="3" fill="#fff9"/><circle cx="13.8" cy="58" r="1.26" fill="#4a3550"/><circle cx="22.2" cy="58" r="1.26" fill="#4a3550"/><path d="M16.25 60.1 Q18 61.85 19.75 60.1" stroke="#4a3550" stroke-width="0.9799999999999999" fill="none" stroke-linecap="round"/><ellipse cx="10.3" cy="60.1" rx="2.0999999999999996" ry="1.26" fill="#f7a8a8"/><ellipse cx="25.7" cy="60.1" rx="2.0999999999999996" ry="1.26" fill="#f7a8a8"/>` },
    clip:    { w: 30, h: 56, s: `<path d="M10 40 V12 a6 6 0 0 1 12 0 V46 a9 9 0 0 1 -18 0 V18" fill="none" stroke="#8ccfe8" stroke-width="4" stroke-linecap="round"/>` },

    onigiri: { w: 86, h: 80, s: `<path d="M43 4 C 58 4 84 52 82 66 C 80 78 6 78 4 66 C 2 52 28 4 43 4 Z" fill="#fff" stroke="#d9d4c8" stroke-width="2.5"/><rect x="24" y="50" width="38" height="28" rx="3" fill="#3f5a4a"/><circle cx="34" cy="36" r="3" fill="#333"/><circle cx="52" cy="36" r="3" fill="#333"/><path d="M39 42 Q43 46 47 42" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="43" rx="5" ry="3" fill="#f7a8a8"/><ellipse cx="58" cy="43" rx="5" ry="3" fill="#f7a8a8"/>` },
    tamago:  { w: 74, h: 44, s: `<rect x="2" y="2" width="70" height="40" rx="10" fill="#ffd95a" stroke="#e8b52c" stroke-width="2.5"/><path d="M14 10 Q 30 22 14 34 M30 10 Q 46 22 30 34 M46 10 Q 62 22 46 34" stroke="#f0c23e" stroke-width="2.5" fill="none"/><circle cx="31" cy="20" r="1.8" fill="#4a3550"/><circle cx="43" cy="20" r="1.8" fill="#4a3550"/><path d="M34.5 23 Q37 25.5 39.5 23" stroke="#4a3550" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="26" cy="23" rx="3" ry="1.8" fill="#f7a8a8"/><ellipse cx="48" cy="23" rx="3" ry="1.8" fill="#f7a8a8"/>` },
    sausage: { w: 54, h: 58, s: `<path d="M8 28 Q8 4 27 4 Q46 4 46 28 Z" fill="#f08a8a" stroke="#d0605e" stroke-width="2.5"/><path d="M8 28 Q6 50 10 54 M18 28 Q16 50 20 54 M27 28 L27 56 M36 28 Q38 50 34 54 M46 28 Q48 50 44 54" stroke="#f08a8a" stroke-width="7" stroke-linecap="round"/><circle cx="20" cy="18" r="2.6" fill="#333"/><circle cx="34" cy="18" r="2.6" fill="#333"/>` },
    broccoli:{ w: 58, h: 62, s: `<rect x="22" y="34" width="14" height="26" rx="5" fill="#a9d68a"/><circle cx="16" cy="26" r="14" fill="#6fbf63"/><circle cx="42" cy="26" r="14" fill="#6fbf63"/><circle cx="29" cy="16" r="15" fill="#7fcc70"/><circle cx="24" cy="12" r="3" fill="#a9e19a"/>` },
    tomato:  { w: 42, h: 44, s: `<circle cx="21" cy="25" r="18" fill="#f06a5e" stroke="#c94a40" stroke-width="2"/><path d="M21 8 L16 2 M21 8 L26 2 M21 8 L12 9 M21 8 L30 9" stroke="#5aa55a" stroke-width="3" stroke-linecap="round"/><ellipse cx="14" cy="20" rx="4" ry="6" fill="#fff8" transform="rotate(30 14 20)"/><circle cx="17.2" cy="27" r="1.4400000000000002" fill="#4a3550"/><circle cx="26.8" cy="27" r="1.4400000000000002" fill="#4a3550"/><path d="M20.0 29.4 Q22 31.4 24.0 29.4" stroke="#4a3550" stroke-width="1.1199999999999999" fill="none" stroke-linecap="round"/><ellipse cx="13.2" cy="29.4" rx="2.4000000000000004" ry="1.4400000000000002" fill="#f7a8a8"/><ellipse cx="30.8" cy="29.4" rx="2.4000000000000004" ry="1.4400000000000002" fill="#f7a8a8"/>` },
    shrimp:  { w: 60, h: 50, s: `<path d="M50 14 C 30 0 4 14 10 34 C 14 46 34 48 42 38" stroke="#f7a56b" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M40 38 L56 46 L50 30 Z" fill="#f08a5e"/><circle cx="46" cy="14" r="2.6" fill="#333"/>` },

    lipstick:{ w: 30, h: 94, s: `<path d="M8 30 L8 8 Q15 0 22 6 L22 30 Z" fill="#e8607a"/><rect x="5" y="30" width="20" height="16" fill="#f7cf6b" stroke="#d9a93a" stroke-width="2"/><rect x="3" y="44" width="24" height="48" rx="4" fill="#3d3550"/><rect x="7" y="50" width="4" height="36" rx="2" fill="#fff3"/>` },
    comb:    { w: 40, h: 136, s: `<rect x="2" y="2" width="18" height="132" rx="8" fill="#f5a3c0" stroke="#d97fa1" stroke-width="2"/>${Array.from({ length: 13 }, (_, i) => `<rect x="18" y="${8 + i * 10}" width="20" height="5" rx="2.5" fill="#f5a3c0"/>`).join('')}` },
    mirror:  { w: 84, h: 84, s: `<circle cx="42" cy="42" r="39" fill="#f7cf6b" stroke="#d9a93a" stroke-width="2.5"/><circle cx="42" cy="42" r="30" fill="#dff3fb"/><path d="M26 36 Q30 24 42 22" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="34.2" cy="46" r="2.3400000000000003" fill="#4a3550"/><circle cx="49.8" cy="46" r="2.3400000000000003" fill="#4a3550"/><path d="M38.75 49.9 Q42 53.15 45.25 49.9" stroke="#4a3550" stroke-width="1.8199999999999998" fill="none" stroke-linecap="round"/><ellipse cx="27.7" cy="49.9" rx="3.9000000000000004" ry="2.3400000000000003" fill="#f7a8a8"/><ellipse cx="56.3" cy="49.9" rx="3.9000000000000004" ry="2.3400000000000003" fill="#f7a8a8"/>` },
    cream:   { w: 64, h: 52, s: `<rect x="4" y="18" width="56" height="32" rx="8" fill="#fff" stroke="#c9d3dd" stroke-width="2"/><rect x="2" y="4" width="60" height="18" rx="6" fill="#b9e3d3" stroke="#7cc9b4" stroke-width="2"/><circle cx="26" cy="32" r="1.8" fill="#4a3550"/><circle cx="38" cy="32" r="1.8" fill="#4a3550"/><path d="M29.5 35 Q32 37.5 34.5 35" stroke="#4a3550" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="21" cy="35" rx="3" ry="1.8" fill="#f7a8a8"/><ellipse cx="43" cy="35" rx="3" ry="1.8" fill="#f7a8a8"/>` },
    brush:   { w: 26, h: 126, s: `<path d="M5 30 Q4 4 13 2 Q22 4 21 30 Z" fill="#f2c9b0"/><rect x="5" y="30" width="16" height="14" fill="#c9c9d6"/><rect x="7" y="44" width="12" height="80" rx="6" fill="#9b6b4a"/>` },
    hairclip:{ w: 56, h: 34, s: `<path d="M28 17 L6 4 Q2 17 6 30 Z M28 17 L50 4 Q54 17 50 30 Z" fill="#f5a3c0" stroke="#d97fa1" stroke-width="2"/><circle cx="28" cy="17" r="7" fill="#fff" stroke="#d97fa1" stroke-width="2"/>` },
  };
  // 關卡：收納盒顏色、格子線、每個東西的正確位置（盒子內座標的中心點、角度 0）
  const LEVELS = [
    { name: '文具抽屜', tray: '#f3dcb8', edge: '#d9b07e', lines: 'M120 0 V290 M0 190 H120',
      slots: [['pencil', 30, 100], ['pencil', 62, 100], ['ruler', 96, 100], ['scissors', 180, 80], ['eraser', 260, 50], ['glue', 260, 140], ['clip', 40, 240], ['clip', 82, 240], ['eraser', 190, 240]] },
    { name: '可愛便當', tray: '#fde6c8', edge: '#e8b07a', lines: 'M160 0 V290 M160 150 H320',
      slots: [['onigiri', 80, 70], ['onigiri', 80, 200], ['tamago', 210, 50], ['tamago', 280, 50], ['sausage', 210, 110], ['shrimp', 280, 110], ['broccoli', 205, 220], ['tomato', 255, 200], ['tomato', 290, 245]] },
    { name: '化妝小包', tray: '#f6d9ea', edge: '#d8a2c2', lines: 'M110 0 V290 M110 150 H320',
      slots: [['comb', 32, 145], ['brush', 78, 145], ['mirror', 170, 75], ['lipstick', 240, 75], ['lipstick', 280, 75], ['cream', 170, 220], ['hairclip', 260, 195], ['hairclip', 260, 250]] },
  ];
  const LW = 360, LH = 580, TX = 20, TY = 268, TW = 320, TH = 290;

  let root, stage, scale = 1, level, pieces = [], drag = null, placed = 0;

  function mount(el){
    root = el; level = App.store.get('sortLevel', 0);
    el.innerHTML = `
      <div class="bar"><span id="sName"></span><div class="prog"><i id="sProg"></i></div><span id="sCnt"></span></div>
      <div id="sBox" style="flex:1;min-height:0;position:relative;margin:0 8px 8px;overflow:hidden">
        <div id="sStage" style="position:absolute;left:50%;top:0;width:${LW}px;height:${LH}px;transform-origin:50% 0"></div>
        <div class="done" id="sDone"><div><h2>整整齊齊！</h2><p id="sMsg"></p><button class="btn" id="sNext">下一個</button></div></div>
      </div>
      <style>
        .tray{position:absolute;border-radius:26px;box-shadow:inset 0 4px 0 #0000000d,0 6px 0 #0000001a;}
        .slot,.piece{position:absolute;}
        .slot svg,.piece svg{width:100%;height:100%;display:block;overflow:visible;}
        .slot{filter:brightness(0);opacity:.12;pointer-events:none;}
        .piece{touch-action:none;cursor:grab;transition:transform .25s cubic-bezier(.3,1.5,.5,1),left .25s,top .25s;filter:drop-shadow(0 3px 0 #0000001f);}
        .piece.lift{transition:none;z-index:50 !important;filter:drop-shadow(0 10px 8px #0000002e);}
        .piece.lock{pointer-events:none;filter:none;}
        .piece.lock.pop{animation:snap .35s ease;}
        @keyframes snap{40%{transform:scale(1.15);}100%{transform:scale(1);}}
      </style>`;
    stage = el.querySelector('#sStage');
    el.querySelector('#sNext').onclick = () => { level++; App.store.set('sortLevel', level); build(); };
    addEventListener('resize', fit);
    build();
  }
  function unmount(){ removeEventListener('resize', fit); }
  function fit(){
    const b = root.querySelector('#sBox').getBoundingClientRect();
    scale = Math.min(b.width / LW, b.height / LH);
    stage.style.transform = `translateX(-50%) scale(${scale})`;
  }
  function svg(k){ const it = ITEMS[k]; return `<svg viewBox="0 0 ${it.w} ${it.h}">${it.s}</svg>`; }

  function build(){
    root.querySelector('#sDone').classList.remove('show');
    const L = LEVELS[level % LEVELS.length];
    root.querySelector('#sName').textContent = `第 ${level + 1} 個・${L.name}`;
    stage.innerHTML = `<div class="tray" style="left:${TX}px;top:${TY}px;width:${TW}px;height:${TH}px;background:${L.tray};border:4px solid ${L.edge}">
      <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 ${TW} ${TH}"><path d="${L.lines}" stroke="${L.edge}" stroke-width="5" stroke-linecap="round" fill="none"/></svg></div>`;
    pieces = []; placed = 0;
    const rnd = Math.random;
    L.slots.forEach(([k, sx, sy], i) => {
      const it = ITEMS[k], tx = TX + 4 + sx, ty = TY + 4 + sy;
      const sl = document.createElement('div'); sl.className = 'slot';
      sl.style.cssText = `left:${tx - it.w / 2}px;top:${ty - it.h / 2}px;width:${it.w}px;height:${it.h}px`;
      sl.innerHTML = svg(k); stage.appendChild(sl);
      // 亂放在上面
      const p = document.createElement('div'); p.className = 'piece'; p.innerHTML = svg(k);
      const m = Math.max(it.w, it.h) / 2;
      const px = m + 6 + rnd() * (LW - 2 * m - 12), py = 14 + m * .6 + rnd() * Math.max(10, TY - 34 - m * 1.2);
      const rot = (rnd() * 80 - 40) | 0;
      Object.assign(p.style, { left: px - it.w / 2 + 'px', top: py - it.h / 2 + 'px', width: it.w + 'px', height: it.h + 'px', zIndex: 10 + i, transform: `rotate(${rot}deg)` });
      const piece = { el: p, k, w: it.w, h: it.h, tx, ty, x: px, y: py, done: false };
      p.addEventListener('pointerdown', e => grab(e, piece));
      stage.appendChild(p); pieces.push(piece);
    });
    fit(); count();
  }
  function grab(e, pc){
    if (pc.done) return;
    e.preventDefault(); pc.el.setPointerCapture(e.pointerId);
    drag = { pc, sx: e.clientX, sy: e.clientY, ox: pc.x, oy: pc.y };
    pc.el.classList.add('lift'); pc.el.style.transform = 'rotate(0deg) scale(1.08)';
    pc.el.style.zIndex = 60; App.SFX.soft(); App.buzz(8);
    pc.el.onpointermove = ev => {
      if (!drag) return;
      pc.x = drag.ox + (ev.clientX - drag.sx) / scale; pc.y = drag.oy + (ev.clientY - drag.sy) / scale;
      pc.x = Math.max(0, Math.min(LW, pc.x)); pc.y = Math.max(0, Math.min(LH, pc.y));
      pc.el.style.left = pc.x - pc.w / 2 + 'px'; pc.el.style.top = pc.y - pc.h / 2 + 'px';
    };
    pc.el.onpointerup = pc.el.onpointercancel = () => drop(pc);
  }
  function drop(pc){
    drag = null; pc.el.onpointermove = pc.el.onpointerup = pc.el.onpointercancel = null;
    pc.el.classList.remove('lift');
    // 同一種東西可以放進任何一個同形狀的空格
    const target = pieces.filter(q => q.k === pc.k && !q.taken).map(q => ({ q, d: Math.hypot(q.tx - pc.x, q.ty - pc.y) })).sort((a, b) => a.d - b.d)[0];
    if (target && target.d < 40){
      target.q.taken = true; pc.done = true; pc.x = target.q.tx; pc.y = target.q.ty;
      pc.el.style.left = pc.x - pc.w / 2 + 'px'; pc.el.style.top = pc.y - pc.h / 2 + 'px';
      pc.el.style.transform = 'none'; pc.el.style.zIndex = 5;
      pc.el.classList.add('lock', 'pop');
      App.SFX.snap(); App.buzz(18);
      const r = pc.el.getBoundingClientRect(); App.burst(r.left + r.width / 2, r.top + r.height / 2, ['✦', '✧'], 5);
      placed++; count();
      if (placed === pieces.length) finish();
    } else {
      pc.el.style.transform = `rotate(${(Math.random() * 16 - 8) | 0}deg)`; pc.el.style.zIndex = 30;
      App.SFX.soft();
    }
  }
  function count(){
    root.querySelector('#sCnt').textContent = `${placed}/${pieces.length}`;
    root.querySelector('#sProg').style.width = (placed / pieces.length * 100) + '%';
  }
  function finish(){
    App.SFX.ding(); App.buzz([20, 40, 20]);
    const r = root.querySelector('#sBox').getBoundingClientRect(); App.burst(r.left + r.width / 2, r.top + r.height * .7, ['✦', '★', '♡', '✧'], 16);
    const msgs = ['看了好舒服～', '每樣東西都回家了 ♡', '強迫症大滿足！'];
    root.querySelector('#sMsg').textContent = msgs[level % msgs.length];
    setTimeout(() => root.querySelector('#sDone').classList.add('show'), 900);
  }

  App.register({ id: 'sort', name: '整理小收納', mount, unmount, progress: () => `已整理 ${App.store.get('sortLevel', 0)} 個` });
})();
