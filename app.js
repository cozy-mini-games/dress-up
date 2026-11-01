// 紓壓小盒：外殼（首頁、切換遊戲、音效、震動、特效、存檔、App 安裝與自動更新）
// 新增小遊戲：在 games/ 放一個檔案呼叫 App.register({ id, name, mount(el), unmount() })，
// 再到 index.html 加 <script> 和首頁卡片，sw.js 不用改。
const App = (() => {
  const $ = id => document.getElementById(id);
  const games = {};
  let current = null;

  // ---- 存檔 ----
  const store = {
    get(k, d){ try { const v = JSON.parse(localStorage.getItem('relax') || '{}')[k]; return v === undefined ? d : v; } catch(e){ return d; } },
    set(k, v){ try { const o = JSON.parse(localStorage.getItem('relax') || '{}'); o[k] = v; localStorage.setItem('relax', JSON.stringify(o)); } catch(e){} },
  };

  // ---- 音效（全部用 WebAudio 合成，沒有音檔）----
  let AC = null, muted = store.get('muted', false), noiseBuf = null;
  function ac(){
    if (!AC){ AC = new (window.AudioContext || window.webkitAudioContext)(); }
    if (AC.state === 'suspended') AC.resume();
    if (!noiseBuf){ noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    return AC;
  }
  function noise(dur, freq, q, vol, type = 'bandpass'){
    const a = ac(), t = a.currentTime, s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; f.Q.value = q;
    s.connect(f); f.connect(g); g.connect(a.destination);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.start(t, Math.random() * .5); s.stop(t + dur + .02);
  }
  function tone(freq, dur, vol, type = 'sine', delay = 0, slide = 0){
    const a = ac(), t = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    o.connect(g); g.connect(a.destination);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.start(t); o.stop(t + dur + .02);
  }
  const SFX = {
    pop(){ if (muted) return; try { noise(.07, 1800 + Math.random() * 900, 1.2, .5); tone(420 + Math.random() * 120, .06, .12, 'triangle', 0, 180); } catch(e){} },
    click(){ if (muted) return; try { noise(.03, 3200, 2, .35, 'highpass'); tone(900, .04, .08, 'square'); } catch(e){} },
    snap(){ if (muted) return; try { tone(660, .08, .14, 'triangle'); tone(990, .12, .1, 'sine', .05); noise(.03, 2500, 2, .25); } catch(e){} },
    squish(){ if (muted) return; try { noise(.18, 500 + Math.random() * 300, 3, .35, 'lowpass'); tone(160, .15, .06, 'sine', 0, 90); } catch(e){} },
    scrub(v){ if (muted) return; try { noise(.06, 2400 + Math.random() * 1200, .8, Math.min(.18, .05 + v * .12)); } catch(e){} },
    whoosh(){ if (muted) return; try { noise(.25, 900, .7, .18); } catch(e){} },
    ding(){ if (muted) return; try { [784, 988, 1175, 1568].forEach((f, k) => tone(f, .6, .09, 'sine', k * .09)); } catch(e){} },
    soft(){ if (muted) return; try { tone(520, .12, .07, 'sine'); } catch(e){} },
  };
  function buzz(ms){ try { navigator.vibrate && navigator.vibrate(ms); } catch(e){} }

  // ---- 特效 ----
  function burst(x, y, chars, n, colors){
    colors = colors || ['#7cc9b4', '#7cc4ea', '#f5a3c0', '#f7cf6b', '#b9a3ef'];
    for (let i = 0; i < n; i++){
      const e = document.createElement('div'); e.className = 'fx'; e.textContent = chars[i % chars.length];
      e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.color = colors[i % colors.length];
      const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 80;
      e.style.setProperty('--dx', Math.cos(a) * d + 'px'); e.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
      e.style.setProperty('--r', (Math.random() * 90 - 45) + 'deg');
      document.body.appendChild(e); setTimeout(() => e.remove(), 1100);
    }
  }
  function toast(t){ const e = $('toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), 2200); }

  // ---- 切換畫面 ----
  function go(id){
    if (current && current.unmount) current.unmount();
    current = null; $('game').innerHTML = '';
    if (id && games[id]){
      document.body.classList.add('in-game');
      $('title').textContent = games[id].name;
      current = games[id]; current.mount($('game'));
      if (location.hash !== '#' + id) history.pushState(null, '', '#' + id);
    } else {
      document.body.classList.remove('in-game');
      $('title').textContent = '紓壓小盒';
      refreshHome();
      if (location.hash) history.pushState(null, '', location.pathname);
    }
  }
  function refreshHome(){
    for (const id of ['wash', 'sort']){
      const g = games[id], el = $('p-' + id);
      if (g && el && g.progress) el.textContent = g.progress();
    }
  }

  function start(){
    document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { SFX.soft(); go(b.dataset.go); });
    $('back').onclick = () => { SFX.soft(); go(null); };
    $('sound').textContent = muted ? '🔇' : '🔊';
    $('sound').onclick = () => { muted = !muted; store.set('muted', muted); $('sound').textContent = muted ? '🔇' : '🔊'; if (!muted) SFX.soft(); };
    addEventListener('popstate', () => go(location.hash.slice(1) || null));
    // 防止 iOS 雙擊放大、拖曳時頁面捲動
    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });
    go(location.hash.slice(1) || null);
    setupPWA();
  }

  function setupPWA(){
    const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    let deferred = null;
    if (!standalone) $('install').style.display = 'inline-block';
    addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; });
    addEventListener('appinstalled', () => { $('install').style.display = 'none'; toast('裝好了！去主畫面找我 ♡'); });
    $('install').onclick = async () => {
      if (deferred){ deferred.prompt(); await deferred.userChoice; deferred = null; return; }
      alertSheet(isIOS ? '用 Safari 打開 → 按下方「分享」→「加入主畫面」→「新增」'
                       : '用 Chrome 打開 → 按右上角「⋮」→「加到主畫面」或「安裝應用程式」');
    };
    if ('serviceWorker' in navigator){
      const had = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register('sw.js').then(reg => {
        const check = () => reg.update().catch(() => {});
        document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
        setInterval(check, 60000);
      });
      let re = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (!had || re) return; re = true; sessionStorage.setItem('upd', '1'); location.reload(); });
      if (sessionStorage.getItem('upd')){ sessionStorage.removeItem('upd'); setTimeout(() => toast('已更新到最新版 ♡'), 400); }
    }
  }
  function alertSheet(text){
    const d = document.createElement('div'); d.className = 'done show';
    d.innerHTML = `<div style="max-width:300px"><h2>放到主畫面</h2><p>${text}</p><button class="btn">知道了</button></div>`;
    d.style.position = 'fixed'; d.querySelector('button').onclick = () => d.remove();
    document.body.appendChild(d);
  }

  return { register: g => games[g.id] = g, start, go, SFX, buzz, burst, toast, store };
})();
