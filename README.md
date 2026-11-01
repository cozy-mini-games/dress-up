# 紓壓小盒 🫧

療癒小遊戲合集（手機網頁 App / PWA，GitHub Pages）：刷刷洗洗、整理小收納、解壓玩具盒。

網址：https://b0966836079-afk.github.io/dress-up/
（倉庫名稱沿用 `dress-up`，使用者決定不改名。之前的換裝遊戲、幸運籤餅都已移除。）

## 給以後的 Claude：這個專案怎麼做的
- 跟「喵喵小窩」（repo `b0966836079-afk/meow`）是**完全分開**的專案。
- 純 HTML/CSS/JS，沒有打包工具、沒有圖片素材（全部用 canvas / SVG 畫，音效用 WebAudio 合成）。
  - `index.html`：首頁卡片＋載入順序 app.js → games/*.js → `App.start()`。
  - `app.js`：外殼。`App.register({id,name,mount(el),unmount(),progress()})`、`App.go(id)`、`App.SFX.{pop,click,snap,squish,scrub,whoosh,ding,soft}`、`App.buzz(ms)`、`App.burst(x,y,chars,n)`、`App.toast()`、`App.store.get/set`（localStorage `relax`）。
  - `games/wash.js`：刷刷洗洗。20 樣物品畫在 300×300 座標（OBJ 陣列，加新物品就加一個 draw 函式，用 face() 加小臉），8 種髒污（DIRT）、6 種背景（BG）；每輪 20 樣洗牌不重複，髒污和背景每關隨機。`window.__clean=true` 可看乾淨版（測試用），髒污是隨機污漬疊在物品形狀上，手指用 destination-out 擦掉，刷到 96% 過關。
  - `games/sort.js`：整理小收納。ITEMS 是每樣東西的 SVG，LEVELS 是收納盒和每格位置（盒內座標中心點）。拖到同種類空格 40px 內就吸進去。
  - `games/toys.js`：泡泡紙（可滑過去連壓）、史萊姆（36 個彈簧點）、按鈕板、指尖陀螺（累計圈數存檔）。
- 畫風：**一定要可愛**（使用者強調）。粉嫩配色、圓角、東西上加小臉（豆豆眼＋腮紅＋w 嘴）。
- PWA：`manifest.webmanifest`（id `/dress-up/`）、`icons/`、`sw.js`（network-first，自動更新）。**每次改檔 `sw.js` 的 `VERSION` +1**，commit 後 `git push origin HEAD:main`。

## 給以後的 Claude：使用者與合作方式
- 使用者說繁體中文（台灣），用 Redmi（Android）手機。不會寫程式：**直接推到 GitHub**，每一步講清楚並附連結。
- 不要索取任何密碼或 secret key。repo 是公開的，內容都要原創，不放有版權的角色。
- 改完用模擬手機（Playwright）測試，截圖給她看。
- 她想要「很紓壓」的遊戲；之前的 32 種遊戲點子清單裡，她覺得一般收集／抽籤類不夠好玩。
