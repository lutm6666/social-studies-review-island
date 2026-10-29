# 歷史快照：7206fdb（2026-10-28）

下列4需修、3待釐清為當時結論，原證據連結固定至f37ed3c快照；請以[第三輪](findings_round3_2026-10-29.md)及[最新驗收](final_acceptance_2026-10-27.md)為準。

# 社會科複習島｜全題庫最終驗收報告

更新：2026-10-28（臺灣時間）。來源版本：`7206fdb147893cd63e699c1b933cd88f333c810b`。[儲存庫](https://github.com/lutm6666/social-studies-review-island)、[正式網站](https://lutm6666.github.io/social-studies-review-island/)。

## 結論

**整體內容驗收尚未通過：4題需修、3題待釐清。** 全3,840題結構與來源一致性成功。7206正式版已完成36個題號的實際操作，涵蓋九島因果、九島名詞、內容缺陷重現、人口圖、計分、錯題重練及刷新續答。測試機制成功與題目內容正確性分開列示。

此次只更新審查文件與證據，沒有修改題庫或網站程式。[目前4需修／3待釐清的原文與來源](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/findings_options_2026-10-28.md)、[全部3,840題逐題覆蓋](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/acceptance_coverage_2026-10-27.md)。

## 新版變動與內容覆核

| 項目 | 已完成範圍 |
|---|---|
| 最新來源 | 7206fdb147893cd63e699c1b933cd88f333c810b；報告發布前鎖定此快照 |
| d4之後更動 | 1,240題：706因果（365組）＋534名詞；全部只改選項／解析，題幹、正解、ID與數量未變 |
| 人工閱讀 | 全365組因果新選項逐方向核對；534個名詞題的題幹、正解、三誘答全讀；疑點另讀完整解析並查原始資料 |
| 累積內容覆核 | 1,752題＝因果708＋名詞1,035＋其餘9；另512個舊已審ID與d4逐欄相同後沿用，未假稱全部重新查史料 |
| 名詞解析獨立配對 | 1,035題、3,105組與原始TBL詞義完整對應，0錯配；配對相符不等於概念互斥或答案唯一 |
| 分組檔比較 | 72行→151行，實際新增79行；不直接採用回應文的85組作計數 |
| 結構／引擎／匯出 | 執行原有引擎：3,840題、3,840唯一ID，四選項互異、題幹及解析非空；與7206 questions.json十欄逐題0差異 |

[新版逐題判語、完整原文、閱讀區段、舊22題處置](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-content-review.json)、[結構及引擎](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-audit.json)、[1,035題解析配對](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-term-mapping.json)。本次沒有將534篇新解析全部再逐字人工精讀；完整解析的機械對應與人工語義判斷分開記錄。

| 範圍 | 成功 | 失敗／需修 | 待釐清 | 可選改善 | 未測試／未重審 |
|---|---:|---:|---:|---:|---:|
| 全3,840題結構／引擎與匯出 | 3840 | 0 | 0 | 0 | 0 |
| 最新更動1,240題內容 | 1214 | 4 | 3 | 19 | 0 |
| 累積全庫內容狀態 | 1726 | 4 | 3 | 19 | 2088 |
| 7206逐題UI機制 | 36 | 0 | 0 | 0 | 3804 |
| d4歷史逐題UI機制 | 56 | 0 | 0 | 0 | 3784 |
| d4圖表題UI（另一分母） | 28 | 0 | 0 | 0 | 0 |
| d4不同圖組視覺覆核（另一分母） | 18 | 0 | 0 | 0 | 0 |
| 7206人口圖補跑（36題子集） | 3 | 0 | 0 | 0 | 其餘25圖表題未重跑 |

目前需修題為**law1-g11、law1-g23、law1-g24、twg8-g28**。前三題同義概念互列成錯誤選項，實際選同義答案會被判錯；twg8-g28可保留主因答案，但解析把休耕政策與自給率說成無直接因果，需改誘答或解析，並不宣稱兩項一定都是同等主要原因。

待釐清為**voy-g46、cnh3-g56、wdh5-g48**，分別涉及拼音與語言學習、海禁下合法／私販交易、勞動困境與改革後工時的因果層次；不計成功，也不混入確證4題。19個精確度建議不作阻擋。舊版22需修有21題排除舊問題；twg8-g28替換選項後仍有上述問題。舊版22／10結論保留為[歷史紀錄](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/findings_options_d4a66e5_historical.md)，不再套用為目前狀態。

## 正式版本與部署

7206的[Pages run 40704877673](https://github.com/lutm6666/social-studies-review-island/actions/runs/40704877673)對應同一完整SHA，completed/success。正式頁重新載入後分段讀取五個script，與GitHub該版index文字SHA256全部相符，含變動後資料區（202,311字元；SHA256 739004ec8c1340e6e0a421f61485d15a3438e143475a6caf86d5da26fc151ae1）。因此本次操作確實使用新版。

a2→7206非審查檔案只變index、sw、data_foils及data_groups；引擎、app、圖表資料、繪圖、計分與儲存程式均未變。bank用隔離副本的未變模組＋兩個新資料檔重跑，不使用該副本的舊UI檔冒充7206建置驗證。本次未另重跑7206全套build／Markdown逐字比對。[固定樹差異與Actions](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-version-verification.json)、[正式頁程式相符](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-loaded-scripts.json)。

## 實際網站操作

環境：Windows桌面Brave，大字模式，1228×561畫面；使用正常搜尋、選項與結果控件，未注入作答／儲存狀態。

| 功能 | 7206實際觀察 | 結果 |
|---|---|---|
| 載入、搜尋、開題 | 九島及3,840題顯示正常；33個單題樣本均將畫面四選項與7206匯出逐一核對 | 成功 |
| 九島因果與名詞 | 因果18題每島正反向各一，名詞每島1題；另因果3補測與同義3題，共33個唯一單題樣本 | 成功，限抽測機制 |
| 解析、鎖定、計分 | 30樣本選既定正解得1/1；3個同義題刻意選合理誘答，得0/1並保存錯題 | 機制成功；同義3題內容失敗 |
| 刷新保存 | 人口圖1/3答完，進第2題刷新；累積166/3840及3道待訂正保留，提供中斷輪次續答 | 成功 |
| 同題續答 | 繼續後回到刷新前同ID twg4-h10，完成三張人口圖；3/3結算 | 成功 |
| 人口圖數據與畫面 | 三圖男女長條幾何與原資料一致；新截圖完整呈現老化型圖體、男女、年齡及單位 | 3/3數據成功，1張新畫面覆核 |
| 錯題島重練 | 刷新後仍有3支公民漂流瓶；選程式既定正解訂正，3/3，回首頁沒有錯題 | 成功；題目內容缺陷並未因訂正消失 |

證據：[33題完整操作與計分](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-browser-samples.json)、[人口圖與刷新續答](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-round-resume.json)、[錯題保存／重練／清空](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-wrong-retry.json)、[最終首頁](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-home.json)、[新版人口圖截圖](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-population-visible.png)。

## 圖表及舊缺圖F-01

**F-01已修復。** 原8題twg4-h9/h10、asg4-h10、asg5-h9、wdg2-h9、wdg3-h9/h10/h11均已回到引擎與匯出。d4已實際作答全部28圖表題、核28題DOM圖形數據，並逐張檢視18組不同圖形（14氣候、3人口、1產業），全部成功。7206圖表資料、引擎與渲染程式的Git blob未變，匯出圖形亦逐題相同；此版另補跑三張人口圖。不能把上述d4全部28題寫成7206重新操作過。

氣候每圖12月且雨量非負；人口男女合計100%；每產業時期三類合計100%。都是示意資料，不當作指定測站實測。[圖表來源檢查](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/figure-audit.json)、[d4的28題原始操作](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/chart-results.json)、[18組截圖及聯絡表](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/visual-review.md)。

## 未測試與限制

- 其餘2,088題未做本輪內容重審；全庫3,840題未逐題瀏覽器操作。既定正解未改不代表所有原始知識點已另取官方資料重新認證。
- 實體iOS Safari、Android、觸控及行動GPU、此版窄視窗：未測試。桌面畫面不能當作實體手機驗證。
- 3/7/14/30/60天真實等待、跨裝置同步、儲存限制／配額、強制關閉及多分頁競態、備份匯入匯出、離線與CDN故障備援：未測試。
- 全部節慶／跨年午夜／會考日期切換、音樂實際聽感、所有航線與篩選組合、外部回報送出：未測試。
- 診斷保留3筆舊時間戳記的非同步訊息通道關閉紀錄，來源未定位；已測流程未見因此失效，不宣告console零錯誤。[原始診斷](https://github.com/lutm6666/social-studies-review-island/blob/f37ed3c63db5628b57c6903912b913fed1f58cb2/review/evidence/options_review_2026-10-28/7206-browser-console.json)。

本次完成的是新版審查與驗收紀錄交付。題庫應先修4題並釐清3題，再依新版本重做相關回歸，才適合宣告整體最終通過。
