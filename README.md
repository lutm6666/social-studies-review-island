# 社會科複習島

國中社會科（108 課綱）的 3D 島嶼複習網站。歷史、地理、公民共 9 座島、50 個章節，約 3,800 題。

## 功能

- 9 座群島，每個章節是一座有代表模型的小島，島上有特色小人
- 題庫：精寫題、素養情境題、圖表判讀題（氣候圖、人口金字塔、產業結構），加上資料表生成的配對題與因果題
- 今日複習（間隔複習：答對後隔 1、3、7、14、30、60 天再出現）
- 錯題島：所有答錯的題目變成漂流瓶，可集中重練、依科目篩選
- 會考模擬（跨島混合計時）、題目搜尋
- 因果航線（臺灣史島）與跨科航線（小船往返各島）
- 小島隨答對題數成長、錯太多會起霧
- 領航員導覽、天空依實際時間變化、省電模式、大字模式

不出年份題與事件排序題。

## 使用

直接開啟 `index.html` 即可，不需要安裝。作答紀錄存在瀏覽器的 localStorage；在 claude.ai 的 Artifact 版本中則會同步到帳號。

## 部署

整個資料夾是靜態網站，可直接放到 GitHub Pages 或 Netlify：

- **Netlify Drop**：把這個資料夾（或 `site.zip`）拖到 https://app.netlify.com/drop
- **GitHub Pages**：Settings → Pages → Branch 選 `main`、資料夾選 `/ (root)`

## 開發

題庫與程式在 `src/`，修改後執行：

```bash
python3 build.py
```

會產生 `index.html`（一般網站用）與 `artifact.html`（claude.ai Artifact 用）。

| 檔案 | 內容 |
|---|---|
| `src/app.html`、`src/app.js` | 介面與 3D 場景 |
| `src/deco.js`、`src/people.js`、`src/models_wip.js` | 裝飾、小人、章節模型 |
| `src/engine.js`、`src/dsl.js` | 題庫引擎與題目速寫工具 |
| `src/hand_twh_*.js`、`src/gen_twh.js` | 臺灣史島題庫 |
| `src/data_*.js` | 其他各島題庫、情境題、圖表題、補充說明 |
| `src/links_*.js` | 因果航線與跨科航線 |

題目由 AI 協助撰寫，未逐題對照教科書；發現錯誤歡迎開 issue。
