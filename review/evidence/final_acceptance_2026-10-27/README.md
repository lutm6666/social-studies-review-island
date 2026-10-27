# 驗收證據｜2026-10-27

報告與完整題號清單位於review/的同日期主文件。主要來源19ede1cf6ca8e52bddce73e29fadc39724c33c68；a4cc主輪結果在JSON及報告中保留版本。

- bank-audit.json：3807題來源、匯出、資料結構與10筆修正。
- figure-dedup-diagnostic.json：8筆來源題被排除；僅記憶體診斷，沒有修改程式。
- ui-question-coverage.json：77個不同題號的實際UI操作結果，其他3730題未測。
- ui-observations.json：點選後的可讀頁面與計分、保存、錯題流程原始觀察。
- chart-ui-results.json：最新版本全部20道現存圖表的SVG、作答與回饋。
- chart-{id}.jpg、chart-contact-sheet-*.jpg：最新版本20張完整圖表及5張聯絡表。
- chart-visual-review.md：畫面逐張核對與限制。
- deployment-verification.json：頁面hash、兩次Pages部署SHA與狀態。
- manifest.json：本資料夾各檔案SHA256與大小（不含manifest自身）。

整體最終驗收未通過：來源28圖表題只進入20題，18種圖只剩15種。實體手機、長期複習與雲同步等未測範圍見報告。
