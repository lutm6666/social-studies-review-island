# 新增公民40道情境題審查

**日期：2026-10-28（臺灣）。限定範圍：`review/pending_civics_ctx.md`所列40道新精寫情境題（社會生活12、政治法律16、經濟全球12）。內容基準：`69d755dc998f2408d15d60f5097aa5e1e3aa4555`。**

本次依`REVIEW.md`核對每題情境、題幹、四選項、正解、解析及必要主來源。**40/40內容可通過，0項必修、0項已確認雙解；8項可選精確化不列為待修或阻擋條件。**

結構另依`source-audit.json`：正式引擎與匯出共3,840題、題號全唯一，題幹／解析非空且四選項互異，無結構或匯出差異。本輪新增40道精寫題，依去重規則取代15道同概念生成題（3,815＋40−15＝3,840）；保留的3,800道既有題內容未再逐題重審。

操作期間main另進`8f0fbdc34ba2644034efbd9c058c06134a606509`，只改`index.html`、`src/app.js`與`sw.js`，題庫及引擎未變；因此內容結論沿用69d基準，不能擴大為新增UI功能全面驗收。

**實際操作40/40成功**：逐題用情境搜尋，確認單筆結果、完整情境、題幹、四個選項與來源一致；每題選擇標示正解後，確認正確回饋、相同解析與1/1結算。這是40次獨立單題輪次，不是一次40題試卷；內容正確性另由前述審查判定。[逐題清單](coverage_civics_ctx.md)、[原始操作紀錄](evidence/civics_ctx_2026-10-28/browser-new40.json)。

## 驗證結果與界線

| 項目 | 成功 | 失敗 | 未測試 |
|---|---:|---:|---:|
| 新40題內容審查 | 40 | 0 | 0 |
| 新40題網站搜尋、作答、解析及結算 | 40 | 0 | 0 |
| 全3,840題結構／來源與匯出一致性 | 3,840 | 0 | 0 |
| 保留3,800題再次內容重審 | 0 | 0 | 3,800 |

在隔離暫存副本執行既有build.py，index.html、sw.js與manifest.webmanifest皆與69d來源一致，沒有修改儲存庫程式。公開站HTTP 200；抓取頁面與8f0fbdc版index.html一致，與69d的差異限導覽／程式整理及離線版本號，題庫與引擎相同。瀏覽器題目文字及選項逐題對照69d，而非僅以首頁總數推定新題可答。

本輪沒有全面重測既有互動、28道圖表、實體手機、離線與進度恢復；此前驗收文件保留為歷史，不把本次40題結案擴大為全部3,840題內容／所有網站功能已重新通過。

## 可選精確化（8項，均非必修）

| id | type | 說明 | 建議 | 依據 |
|---|---|---|---|---|
| `soc3-h10` | 題目品質（可選） | 「教育功能以外的所有功能」把多種功能綑綁、非平行且容易靠絕對詞排除；情境不支持其中全部功能，故非雙解。 | 改成單一功能名；若採「教育功能」，可在情境補「傾聽心情、互相安慰」，凸顯情感功能。 | [主來源1](https://cdj.sfaa.gov.tw/Journal/Content?gno=9317) |
| `law1-h10` | 解說精確化（可選） | 比例原則正解成立；必要性比較須以同樣有效達目的為前提，現文未完整展開不代表反向錯誤。 | 可加「在同樣能達成防疫目的下」，解析補利益與損害不得顯失均衡。 | [主來源1](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030055&flno=7)；[主來源2](https://terms.judicial.gov.tw/TermContent.aspx?SYS=V&TRMTERM=%E6%AF%94%E4%BE%8B%E5%8E%9F%E5%89%87) |
| `law4-h9` | 解說精確化（可選） | 題設仰賴補助，正解成立。財政統計上自有財源含統籌款；自籌財源才再扣統籌款，勿把統籌款等同指定用途補助。 | 可改「自籌財源不足時，以統籌款與補助補充；過度依賴指定用途或須核定的補助，可能壓縮自主施政空間」。 | [主來源1](https://web02.mof.gov.tw/njswww/webMain.aspx?k=i5100)；[主來源2](https://www.nta.gov.tw/singlehtml/238?cntId=4d08d6a117544ca38ff53882ff3e5398)；[主來源3](https://www.ly.gov.tw/Pages/List.aspx?nodeid=56699) |
| `law7-h10` | 條件精確化（可選） | 按合法撤回的通常情境答案成立；未述第一審辯論終結後撤回，不能自行加入後判錯。 | 可加「第一審辯論終結前依法撤回」，解析可補偵查中不起訴、審判中不受理。 | [主來源1](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=287)；[主來源2](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0010001&flno=238)；[主來源3](https://terms.judicial.gov.tw/TermContent.aspx?SYS=M&TRMTERM=%E6%92%A4%E5%9B%9E%E5%91%8A%E8%A8%B4) |
| `law8-h8` | 題目精確化（可選） | 罰鍰為行政罰，答案唯一；舉發通知單與裁決書有程序差別，宜直接問制裁種類。 | 問句可改「違規停車所受罰鍰屬哪種處罰？」；不必藉此展開另一道救濟題。 | [主來源1](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030210&flno=1)；[主來源2](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=K0040012)；[主來源3](https://www.motc.gov.tw/ch/app/data/view?id=14&module=news&serno=77ac4361-6202-4cbf-9130-8b883ee9cf79) |
| `law8-h9` | 情境精確化（可選） | 已走完合法訴願後提行政訴訟正確；原題省略前置復查，未宣稱可直接跳過。 | 可補「依法申請復查仍不服，提起訴願又被駁回」，避免誤學補稅一律直接訴願。 | [主來源1](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=35)；[主來源2](https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=38)；[主來源3](https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/local/administrative-remedy/rJrGrzq)；[主來源4](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=A0030154) |
| `eco2-h10` | 解說精確化（可選） | 互補品答案成立；「需要一起使用」可能被讀成每種互補品都必須同時使用。 | 可改「常搭配使用，能提升使用效果」。 | [主來源1](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services) |
| `eco5-h10` | 情境精確化（可選） | 累進稅率答案成立，未要求稅額計算；不必因省略邊際稅率即判錯。 | 可寫「所得淨額跨越較高級距時，超過部分適用較高稅率」，避免誤解全額套最高率。 | [主來源1](https://www.etax.nat.gov.tw/etwmain/alien-tax-service/alien-individual-income-tax/Zv7zzqa) |

## 圖表與本輪界線

舊8道圖表題的來源完整性已另行恢復，實際引擎可達**28道附圖題／18組唯一圖表**；本次40道新題都沒有附圖。這是來源及引擎核對，**不宣稱本輪完成全部28道圖表的瀏覽器測試**。

其餘32題未見需另列的內容問題；40題都保留原正解。資料來源取得與完整逐題評語見三份獨立審查JSON；部分soc資料使用官方索引摘要，未假稱逾時頁面已全文核讀。

## 原始證據

- [內容審查與逐題來源](evidence/civics_ctx_2026-10-28/content-review.json)
- [全庫結構及新增40／移除15差異](evidence/civics_ctx_2026-10-28/source-audit.json)
- [隔離建置比對](evidence/civics_ctx_2026-10-28/build-verification.json)、[公開頁版本比對](evidence/civics_ctx_2026-10-28/deployment-check.json)
- [40題網站操作](evidence/civics_ctx_2026-10-28/browser-new40.json)、[最後一題作答結果](evidence/civics_ctx_2026-10-28/browser-result.jpg)

**本次新增40題可結案；8項為可選精確化，無須因此重改正解。僅新增審查文件及證據，未修改題庫、解析、答案、網站程式或部署設定。**
