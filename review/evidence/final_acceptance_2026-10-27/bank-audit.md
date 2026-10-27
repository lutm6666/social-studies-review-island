# 題庫／圖表獨立來源核對（2026-10-27）

來源 commit：`19ede1cf6ca8e52bddce73e29fadc39724c33c68`。執行：`node work/audit-bank.cjs`；診斷：`node work/figure-dedup-diagnostic.cjs`。

這份文件是來源與引擎檢查，不代表瀏覽器操作。未更動儲存庫題庫、網站程式、部署或 review 文件；檢查與診斷均只讀取儲存庫，寫入外部 work/ 暫存證據。

## 成功

- 以本版 source data＋engine.js 在隔離 Node VM 實際執行，含因果／跨科航線共 3,807 題，唯一題號 3,807。
- 每題有非空題幹與解說、1個正解＋3個干擾選項，四個選項互異：3,807/3,807 通過。
- 與既存 review/questions.json 全欄位（含題號、章節、難度、情境、問題、答案、干擾、解說、來源、圖表）比較：0 差異。
- 10個 questions_*.md 共 3,807 題，唯一題號 3,807；每題四選項、一✅三❌、不同選項、非空解說全過；題號集合與引擎一致。
- acceptance_coverage_round2_2026-10-27.md 含同一組 3,807 題。分組順序將 cross 放在公民三島之前，questions.json 將 cross 放最後，順序差異屬格式差異，無缺題。
- 按 build.py 邏輯在記憶體重建完整 index.html，統一 LF/CRLF 後與正式 index.html 完全相同。正規化後 SHA256：`18908e9c3b9c42fdd1eae4ca63cd0e9f1eb9125b36b2e6a0b3d16e3d6674aff4`。
- 前輪10題修正文字仍在實際引擎輸出：pre-g9 無圓山文化誘答；twg4-h5/g20 使用「國家或地區」；soc5-g39/g40 使用持續追求社會／環境使命；law7-g40/g41 有證據條件及不起訴／緩起訴限制；law8-g30/g31 使用「有求償權」；eco6-h8 情境甲10電腦/20香蕉、乙2電腦/16香蕉，1電腦機會成本分別2/8香蕉，答案比較利益。
- 原始圖表數據：14氣候各12個溫度＋12雨量，皆有限值且無負雨量；3人口金字塔各9年齡組，男女總和100%；產業甲乙丙每期三級占比各100%。

## 失敗：圖表題被題幹去重刪除

`src/engine.js:63-65` 的全站去重鍵只有 `q.q.replace(/\s/g,'')`，未比較 `fig`。兩題題幹相同但附圖不同時，後一題也被刪掉。`src/app.js:41` 先建立 BANK；`:53` 的 islandPool 與 `:56` 的 ALL_READY 都來自該 BANK，因此抽題、搜尋與錯題等不會恢復被刪題。

原始 data_fig.js 定義 **28道圖表題、18組不同圖（14氣候＋3人口＋1產業）**；本版實際 BANK 只有 **20道圖表題、15組圖（12氣候＋2人口＋1產業）**。

完全無法到達的三組圖：

| 圖 | 原始題號 | 原始題幹 | 定義／引用行 |
|---|---|---|---|
| 穩定型人口 stable | twg4-h10 | 下圖的人口金字塔屬於哪一種類型？ | src/data_fig.js:23、36 |
| 溫帶海洋性 oceanic | wdg3-h10 | 下圖的氣候類型最可能是？ | src/data_fig.js:14、47 |
| 溫帶大陸性 continental | wdg3-h11 | 下圖的氣候類型最可能是？ | src/data_fig.js:15、48 |

另外5個被刪圖表題的圖仍在別題出現：twg4-h9（老化型）、asg4-h10（熱帶季風）、asg5-h9（沙漠）、wdg2-h9（熱帶草原）、wdg3-h9（地中海）。

獨立診斷只在 Node VM 記憶體把去重鍵附上圖表 JSON，結果恢復28題／18圖，恰好恢復上述8題，因果確認。**這不是已提交修復，儲存庫程式未修改。** 原始數據通過與網站全圖可作答應分開列項。

## 可到達圖與題號

- keelung：twg3-h9
- kaohsiung：twg3-h10、twg3-h11
- taipei：twg3-h12
- young：twg4-h8、twg4-h12
- aging：twg4-h11
- IND：twg5-h7、twg5-h8、twg5-h9
- northChina：asg1-h8
- highland：asg1-h9
- rainforest：asg4-h9
- monsoonTrop：asg4-h11
- desert：asg5-h10
- medS：wdg1-h9、wdg1-h10
- tundra：wdg1-h11
- savanna：wdg2-h10
- medN：wdg3-h12

## 限制

此處未宣稱實際瀏覽器渲染或互動成功；由主代理另行實機測試。此次未重新逐題對照所有外部歷史／法律來源，10筆文字修正是依前輪既定缺陷條件重核。完整原始結果在 bank-audit.json；診斷結果在 figure-dedup-diagnostic.json。

## 測試期間版本更新重核

來源已快進至 `19ede1cf6ca8e52bddce73e29fadc39724c33c68`。與前版 `a4cc8cd55748ad6e91aa5d13a3a6e6528c88afbb` 比較僅變更 index.html、src/app.html、src/app.js。原始題庫／引擎／DSL／圖表／航線／預覽及匯出題庫共 32 個檔案 Git blob 全部不變，10筆修正條件再次檢查10/10通過。來源引擎仍3,807題，JSON全欄位0差異，圖表仍20題／15圖；完整建置內容與新版index.html換行正規化後一致。證據：source-version-comparison.json。
