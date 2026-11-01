# 幸運籤餅 🥠

每天敲開籤餅，抽一張可愛的小籤詩（手機網頁 App / PWA，GitHub Pages）。

網址：https://b0966836079-afk.github.io/dress-up/
（倉庫名稱沿用之前的 `dress-up`，使用者決定不改名。以前的換裝遊戲已移除。）

## 給以後的 Claude：這個專案怎麼做的
- 跟「喵喵小窩」（repo `b0966836079-afk/meow`）是**完全分開**的專案。
- 純 HTML/CSS/JS，沒有打包工具。
  - `index.html`：畫面與全部邏輯。籤餅是內嵌 SVG（左右兩半用 clipPath 切，敲 3 下裂開往兩邊掉）。
  - `fortunes.js`：60 張原創籤詩（lv 1 大吉～5 末吉，全部都是好籤）＋幸運色／小物／小任務清單。加籤詩只要加一行。
  - 存檔在 localStorage `cookie`：{day, draws:[{i,c,n,it,tk,done}], got:{籤號:1}, streak, last}。每天 3 顆（`PER_DAY`），午夜重置；連續天數 streak。
  - 優先抽還沒收集過的籤。收藏冊顯示 N/60。「存成圖片」用 canvas 畫籤詩卡，手機走分享選單。
  - 音效用 WebAudio 合成，沒有音檔。
- PWA：`manifest.webmanifest`（id `/dress-up/`）、`icons/`（用 Playwright 把籤餅 SVG 截成圖）、`sw.js`（network-first，自動更新）。
- **每次改檔：`sw.js` 的 `VERSION` +1**，commit 後 `git push origin HEAD:main`。

## 給以後的 Claude：使用者與合作方式
- 使用者說繁體中文（台灣），用 Redmi（Android）手機。不會寫程式：**直接推到 GitHub**，每一步講清楚並附連結。
- 不要索取任何密碼或 secret key。
- **版權**：repo 是公開的，不放任何有版權的角色或別人的圖；內容都要原創。
- 改完用模擬手機（Playwright）測試，截圖給她看。
- 她有一份 32 種遊戲點子清單（魔藥調色屋、雲朵捏捏、扭蛋小店、星星收集簿…），這是第 27 號「幸運籤餅」。
