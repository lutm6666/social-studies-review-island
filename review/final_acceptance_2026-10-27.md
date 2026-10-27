# 社會科複習島｜全題庫最終驗收報告

**報告日期：2026-10-27（臺灣時間）。儲存庫：[`lutm6666/social-studies-review-island`](https://github.com/lutm6666/social-studies-review-island)。正式網站：[GitHub Pages](https://lutm6666.github.io/social-studies-review-island/)。**

## 結論

**整體最終驗收：未通過。** 網站已能在實際桌面瀏覽器載入、導覽、作答、計分、搜尋、錯題重練與保存累積進度；3,807題結構與前輪10筆內容修正均通過。剩餘阻擋項是**圖表題完整性失敗**：原始28道附圖題中，8道被僅依題幹的去重規則排除，導致穩定型人口、溫帶海洋性、溫帶大陸性三組圖完全無法在正式題庫作答。現存20道圖表題／15組圖可呈現且可作答，不能據此宣告原始18組圖全部驗收成功。

這次實際補上了前輪欠缺的網頁操作證據。成功、失敗與未測試分開記錄；本輪驗收沒有修改題庫、正解、解說、網站程式或部署設定。測試期間他人提交的介面更新已獨立核對與補跑，並非本輪驗收代理修復。

完整逐題狀態見 [`acceptance_coverage_2026-10-27.md`](acceptance_coverage_2026-10-27.md)。[第二輪報告](final_acceptance_round2_2026-10-27.md)與[第二輪清單](acceptance_coverage_round2_2026-10-27.md)保留歷史結論；其「瀏覽器未完成」狀態由本報告補充，不能繼續當成當前狀態。

## 1. 測試版本、環境與部署一致性

| 項目 | 核對結果 |
|---|---|
| 主輪版本 | `a4cc8cd55748ad6e91aa5d13a3a6e6528c88afbb`；完成九島、十題對錯與保存、前輪10題、會考、跨科、20道圖表、窄視窗代表案例 |
| 測試期間新版 | `19ede1cf6ca8e52bddce73e29fadc39724c33c68`；主要完整補跑版本；提交前67a8235有限補驗另列 |
| 版本差異 | 僅`index.html`、`src/app.html`、`src/app.js`三檔介面／鏡頭／收合變更；32個題庫、引擎、DSL、圖表、航線、預覽與匯出題庫檔案Git blob全部不變 |
| 新版補跑 | 十題一錯九對→9/10、重新整理保留錯題→重練1/1→錯題清空；20道現存圖表題20/20；新增收合／隱藏介面與Esc恢復 |
| 實際環境 | Windows桌面Brave瀏覽器；以頁面控件點選、讀取作答回饋及截圖。窄視窗屬桌面瀏覽器縮窄，不等於實體手機 |
| 正式網站 | `https://lutm6666.github.io/social-studies-review-island/`，已實際載入；不再只有GitHub靜態原始碼檢查 |
| 主輪Pages內容 | 擷取頁面統一換行後SHA256 `6d7e941734ef797266e169861e0e989bb7e51bbe0099e7cd4e94acf0643ce041`，與a4cc版`index.html`一致 |
| 新版Pages內容 | 結束前擷取頁面統一換行後SHA256 `18908e9c3b9c42fdd1eae4ca63cd0e9f1eb9125b36b2e6a0b3d16e3d6674aff4`，與19ede版`index.html`一致 |
| 建置一致性 | 依`build.py`順序在記憶體重建新版完整頁面，統一LF/CRLF後與提交的`index.html`完全一致 |

部署內容比對證明本次頁面版本；Pages部署成功不等於功能測試成功。主輪[run 40528024330](https://github.com/lutm6666/social-studies-review-island/actions/runs/40528024330)對應a4cc；新版[run 40531392168](https://github.com/lutm6666/social-studies-review-island/actions/runs/40531392168)對應完整SHA `19ede1cf6ca8e52bddce73e29fadc39724c33c68`，兩者皆completed/success。[部署與內容證據](evidence/final_acceptance_2026-10-27/deployment-verification.json)。

來源與版本證據：[來源審核](evidence/final_acceptance_2026-10-27/bank-audit.json)、[版本blob對照](evidence/final_acceptance_2026-10-27/source-version-comparison.json)。

## 1.1 提交前補驗（2026-10-28臺灣時間）

提交前main另新增 `67a82350305eee58812cfc14b31c4ca64aa8b506`，只改 `index.html`、`src/app.html`、`src/app.js` 的寬螢幕卡片位置與鏡頭，題庫、引擎、圖表和匯出檔均未變。因此3,807題、10筆修正及F-01缺失結論仍適用；前述完整流程測試的版本歸屬不變。

對67a8235有限補驗：正式頁HTTP 200、內容與該SHA的index.html統一換行後一致（SHA256 `b62aebb55a372101f6e11c9434ae4b6bb323129dbab9fe85834008a12d6a8573`）；累積77題與熟練20保留；臺灣史卡片在橫式左側、按鈕可見；產業圖 `twg5-h7` 再次實際作答與結算1/1成功。這不是在67a8235重新執行全部77題／20圖表／會考與跨科流程。

本輪自然跨越午夜，畫面由27日沒有到期題，於28日出現「今日複習57題」，與已保存的正常首次答對題到期一致；只確認到期入口出現，未逐題完成全部57道到期複習。3／7／14／30／60天真實等待與跨裝置仍未測。[補驗原始紀錄](evidence/final_acceptance_2026-10-27/publication-smoke-67a8235.json)、[橫式卡片畫面](evidence/final_acceptance_2026-10-27/25-publication-wide-card.jpg)。

## 2. 已成功的實際操作

下表的「成功」限於列明版本與路徑。不同版本的主輪與補跑分開列出，沒有把舊版結果改標為新版全量回歸。

| 功能 | 實際步驟與觀察 | 版本 | 結果／證據 |
|---|---|---|---|
| 載入與九島導覽 | 正式頁顯示3D群島、九島名稱、開放9/9、3,807題；逐一開啟九島卡片與章節 | a4cc | **成功**；[九島紀錄](evidence/final_acceptance_2026-10-27/nine-island-navigation.json)、[UI原始紀錄](evidence/final_acceptance_2026-10-27/ui-observations.json) |
| 十題作答與計分 | 臺灣史隨機10題，故意1題錯、9題對；解析、下一題、看成績9/10、島上90%及分章統計均相符 | a4cc | **成功**；[十題題號與結果](evidence/final_acceptance_2026-10-27/manual-ten-question-results.json)、[原始UI回饋](evidence/final_acceptance_2026-10-27/ui-observations.json) |
| 同題作答後鎖定 | 回饋出現後四個選項皆disabled，保留正解與解析，下一題可繼續 | a4cc、19ede | **成功（控件鎖定觀察）**；[操作原始紀錄](evidence/final_acceptance_2026-10-27/ui-observations.json)。不擴大宣稱已做快速連點／鍵盤競態測試 |
| 累積進度保存與錯題島 | 完成10題後刷新，九題答對與1題錯題保留；錯題重練答對1/1後移除 | a4cc | **成功**；[原始UI回饋](evidence/final_acceptance_2026-10-27/ui-observations.json)的reload-preserves、wrong-island、retry-result各節 |
| 新版十題／保存回歸 | 新版再作答10題，一錯九對9/10；刷新後76題答對與1題錯題保留，訂正後77題答對、錯題0 | 19ede | **成功**；[原始UI回饋](evidence/final_acceptance_2026-10-27/ui-observations.json)的latest-ten-result、latest-reload、latest-wrong-island-cleared及final-wrong-island-empty；[最終空錯題島](evidence/final_acceptance_2026-10-27/24-final-wrong-island-empty.jpg) |
| 搜尋與已知修正題 | 用起訴例外、求償權、社會企業、新住民、芝山岩與比較利益關鍵字搜尋並作答前輪10筆修正題，均得到正確回饋 | a4cc；19ede題庫blob未變 | **成功**；[逐題紀錄](evidence/final_acceptance_2026-10-27/question-ui-results.json)、[UI原始紀錄](evidence/final_acceptance_2026-10-27/ui-observations.json) |
| 會考模擬 | 選三科混合20題，時計由0:00遞增，完成20/20；結果顯示總2:01、平均6秒，各島計數涵蓋九島且加總20題 | a4cc | **成功**；[會考結果](evidence/final_acceptance_2026-10-27/09-exam-result.jpg)、原始紀錄`exam-start`至`exam-result-20-of-20`。未宣稱19ede完整重跑此流程 |
| 跨科航線 | 開啟11條清單，選「工業革命與勞工權益」，完成5/5；包含3道專屬跨科題與2道章節因果題 | a4cc | **成功**；[跨科結果](evidence/final_acceptance_2026-10-27/10-cross-route-result.jpg)。只測該航線5題 |
| 初版窄視窗與模式 | 實測CSS 312×675首頁、390×844人口／產業／氣候代表圖及作答，省電可繼續練習、大字可切換；視窗覆寫已復原 | a4cc | **成功（桌機窄視窗）**；[人口](evidence/final_acceptance_2026-10-27/13-narrow-population-chart.jpg)、[產業](evidence/final_acceptance_2026-10-27/narrow-industry-chart.jpg)、[氣候](evidence/final_acceptance_2026-10-27/narrow-climate-chart.jpg)、[原始UI紀錄](evidence/final_acceptance_2026-10-27/ui-observations.json)。不代表實體手機 |
| 新版面板／隱藏 | 窄視窗可收合／展開；隱藏後僅保留顯示介面控制，Esc恢復；累積77題、熟練20仍可見 | 19ede | **成功**；[原始UI紀錄](evidence/final_acceptance_2026-10-27/ui-observations.json)的latest-reload-settings-persisted、latest-hide-ui與final-home-77-correct |

保存成功的範圍是這個瀏覽器的累積紀錄、錯題與已觀察設定。重新整理後回到首頁；沒有驗證或保證未完成一輪的題序、當前題或計時會恢復。畫面可見「下次複習：明天」以及重複作答後較長的間隔文字，較長間隔仍未全面驗證；自然首次跨日觀察見1.1節。

## 3. 題庫結構與前輪10筆修正

在最新19ede來源執行實際題庫引擎，加入因果與跨科航線，共3,807題、3,807個唯一題號。每題具非空題幹與解說，1個正解加3個干擾選項且四者互異，**3,807/3,807成功**。與`review/questions.json`全欄位比較為零差異；10份`questions_*.md`題數、標示答案／干擾、解說與題號集合均正常。

| 區域 | 題數 | 結構／來源一致性 |
|---|---:|---|
| 臺灣史 | 925 | 成功 |
| 中國與東亞史 | 450 | 成功 |
| 世界史 | 444 | 成功 |
| 臺灣地理 | 486 | 成功 |
| 亞洲 | 284 | 成功 |
| 世界地理 | 239 | 成功 |
| 社會生活 | 262 | 成功 |
| 政治與法律 | 396 | 成功 |
| 經濟與全球 | 288 | 成功 |
| 跨科航線 | 33 | 成功 |
| 合計 | **3,807** | **成功** |

| 前輪題號 | 本版內容核對 | 來源修正 | 主輪UI作答 |
|---|---|---|---|
| `pre-g9` | 芝山岩題排除兼有文化層重疊的圓山文化誘答，仍有四個不同選項 | 成功 | 成功 |
| `twg4-h5`、`twg4-g20` | 其他「國家或地區」用語與解說相容 | 成功 | 成功 |
| `soc5-g39`、`soc5-g40` | 社會企業改為持續追求社會／環境使命，非保證獲利或必然解決問題 | 成功 | 成功 |
| `law7-g40`、`law7-g41` | 起訴敘述包含證據條件與沒有不起訴／緩起訴情形的限制 | 成功 | 成功 |
| `law8-g30`、`law8-g31` | 依法「有求償權」，非必然完成求償 | 成功 | 成功 |
| `eco6-h8` | 甲10電腦／20香蕉、乙2電腦／16香蕉；電腦機會成本2箱／8箱，答案比較利益 | 成功 | 成功 |

「結構與已知修正通過」不代表本輪又把3,807題全部重新對照2026年的外部史料或法律來源。逐題清單分開標示來源結構與UI；未操作題目保持未測試，不沿用結構成功充作UI成功。

## 4. 圖表：現存畫面成功，完整性失敗

### 4.1 數據與現存20題

原始圖表為典型示意資料，非特定測站實測值。14組氣候各有12個溫度與12個雨量，數值有限、雨量無負數；3組人口金字塔各9個年齡層、男女合計100%；產業圖含甲乙丙三期，每期三級占比合計100%。這些**資料結構檢查成功**，不等於所有圖進入正式題庫。

以搜尋「下圖」取得正式題庫20道圖表題，主輪20/20完成；最新19ede再次完成20/20，每題取得SVG及非零圖表尺寸、正確作答與解說回饋，涵蓋臺灣地理10題、亞洲5題、世界地理5題。畫面覆核20張圖表題截圖，現存15組圖皆有完整圖體、可讀圖例與軸標；負溫、人口左右兩側與產業堆疊均可辨識。較長題幹／選項需向下捲動，頂端截圖不單獨證明整頁所有文字同時可見。

證據：[主輪圖表操作](evidence/final_acceptance_2026-10-27/chart-ui-results-initial.json)、[新版20題圖表操作](evidence/final_acceptance_2026-10-27/chart-ui-results.json)、[圖表視覺覆核](evidence/final_acceptance_2026-10-27/chart-visual-review.md)、[圖表成績](evidence/final_acceptance_2026-10-27/23-latest-chart-result.jpg)、[聯絡表1](evidence/final_acceptance_2026-10-27/chart-contact-sheet-01.jpg)、[聯絡表2](evidence/final_acceptance_2026-10-27/chart-contact-sheet-02.jpg)、[聯絡表3](evidence/final_acceptance_2026-10-27/chart-contact-sheet-03.jpg)、[聯絡表4](evidence/final_acceptance_2026-10-27/chart-contact-sheet-04.jpg)、[聯絡表5](evidence/final_acceptance_2026-10-27/chart-contact-sheet-05.jpg)。

### 4.2 阻擋項 F-01：不同附圖被同題幹去重

**狀態：失敗，尚未修復。** 原始`src/data_fig.js`有28道附圖題、18組圖；正式BANK只剩20道附圖題、15組圖。根因位於[`src/engine.js:65`](../src/engine.js#L65)：全站去重鍵僅為`q.q.replace(/\s/g,'')`，未納入附圖。`src/app.js:41`建立BANK，島池與ALL_READY使用去重後BANK，搜尋與抽題不會恢復被刪題。

| 被排除原始題號 | 正解／圖 | 來源引用 | 影響 |
|---|---|---|---|
| `twg4-h9` | 老化型 | `src/data_fig.js:35` | 該題消失，老化圖仍有別題 |
| `twg4-h10` | 穩定型 | `src/data_fig.js:36` | **穩定型人口圖完全不可到達** |
| `asg4-h10` | 熱帶季風氣候 | `src/data_fig.js:62` | 該題消失，同圖仍有別題 |
| `asg5-h9` | 沙漠氣候 | `src/data_fig.js:66` | 該題消失，同圖仍有別題 |
| `wdg2-h9` | 熱帶草原氣候 | `src/data_fig.js:57` | 該題消失，同圖仍有別題 |
| `wdg3-h9` | 地中海型氣候 | `src/data_fig.js:46` | 該題消失，同圖仍有別題 |
| `wdg3-h10` | 溫帶海洋性氣候 | `src/data_fig.js:47` | **溫帶海洋性圖完全不可到達** |
| `wdg3-h11` | 溫帶大陸性氣候 | `src/data_fig.js:48` | **溫帶大陸性圖完全不可到達** |

穩定型的原始題幹為「下圖的人口金字塔屬於哪一種類型？」；兩種溫帶氣候題幹均為「下圖的氣候類型最可能是？」。同題幹附不同圖即考不同問題，不能直接視為重複題。

重現方式：檢查上述原始定義→執行未修改的`buildBank`→查對正式BANK及`questions.json`，8個題號皆不存在→正式頁搜尋「下圖」只得20題。另在隔離Node VM中僅修改記憶體內的去重鍵，納入圖表JSON後，剛好恢復上述8題與原始18組圖；這是根因診斷，**未修改或提交網站程式**。[診斷原始結果](evidence/final_acceptance_2026-10-27/figure-dedup-diagnostic.json)。

這8題是「來源定義未入庫」的另一分母，不在現有3,807題內；不能把它們算作3,807題結構失敗，也不能因輸出3,807題結構正常而忽略缺圖。

## 5. 未測試與不能據此保證的範圍

| 項目 | 狀態 | 尚缺證據 |
|---|---|---|
| 實體iPhone／iPad Safari、Android、觸控、多指縮放與行動GPU | **未測試** | 窄桌面視窗不取代實體裝置；需各裝置作答、圖表、保存及模式切換 |
| 真實間隔複習 | **首次跨日入口成功／其餘未測試** | 28日自然出現57題到期入口；未逐題完成該57題，3／7／14／30／60天真實等待未測 |
| Claude Artifact帳號雲端同步、跨裝置合併 | **未測試** | 公開Pages本次只證明localStorage；未建立Artifact帳號同步環境 |
| CDN不可用／離線時的自動備援 | **未測試** | 手動省電成功不等於Three.js載入失敗時仍能自動轉入可作答模式 |
| 未完成輪次的刷新恢復 | **未測試／不保證** | 僅測累積紀錄與錯題保存；未證明當前輪題序、題號、計時恢復 |
| 全3,807題逐一UI作答、全部航線與所有篩選組合 | **未測試** | 只將有可追溯題號證據的題目標為UI成功，其餘逐題表仍未測試 |
| 全題庫外部內容再審 | **未測試** | 本輪重核已知10筆缺陷與來源一致性，沒有全面重查所有外部史料／法規 |
| 19ede的會考20題、11條跨科航線全量回歸 | **未測試** | 已有a4cc主輪成功；新版本僅對指定核心流程、20圖表與介面補跑 |
| 快速連點、鍵盤競態與瀏覽器儲存受限 | **未測試** | 已觀察選項鎖定與正常保存，未測競態、私人模式或配額耗盡 |

本輪去重後實際操作 **77個不同題號**，其中30題在最新19ede版本補跑（20圖表＋10題一般題／錯題重練）；其餘47題保留a4cc操作版本。完整3,807題清單中，**結構成功3,807，逐題UI成功77、失敗0、未測試3,730**。來源未入庫8題與缺少3組圖另列失敗，不能混入3,807題分母。[逐題UI證據](evidence/final_acceptance_2026-10-27/ui-question-coverage.json)包含版本與操作來源。

## 6. 證據與交付範圍

- [完整題號覆蓋清單](acceptance_coverage_2026-10-27.md)：逐題分開列結構、UI成功／失敗／未測試及內容限制，另列8道未入庫來源題。
- [UI原始觀察](evidence/final_acceptance_2026-10-27/ui-observations.json)、[逐題作答回饋](evidence/final_acceptance_2026-10-27/question-ui-results.json)、[新版圖表20題](evidence/final_acceptance_2026-10-27/chart-ui-results.json)、[九島導覽](evidence/final_acceptance_2026-10-27/nine-island-navigation.json)。
- [題庫審核JSON](evidence/final_acceptance_2026-10-27/bank-audit.json)、[版本blob對照](evidence/final_acceptance_2026-10-27/source-version-comparison.json)、[圖表去重診斷](evidence/final_acceptance_2026-10-27/figure-dedup-diagnostic.json)、[圖表視覺覆核](evidence/final_acceptance_2026-10-27/chart-visual-review.md)。
- 截圖為操作時的畫面；視覺覆核聯絡表僅裁切拼接供閱讀，未補畫或修復網站內容。

## 7. 修復與再次驗收出口

1. 由後續獲授權的修復工作處理F-01：去重判斷需辨識附圖／情境差異，保留原始不同圖表題；不能以刪除來源定義、縮減圖表要求或把缺圖標為未測試來結案。
2. 修復後重新產生正式頁與審查題庫，確認8題皆可追蹤、28道附圖題與18組圖皆進入正式BANK。正式題庫總數可能增加，應依實際輸出重算，不再硬套3,807。
3. 在部署的修復版本重新搜尋並作答全部圖表題，逐張檢查三張曾缺圖與軸標、圖說、選項、解說；保留對／錯、計分、保存、錯題重練與窄視窗的回歸證據。
4. 把修復來源SHA與正式Pages內容對齊，更新完整覆蓋清單，對未測裝置／長期間隔／雲端／斷網保留明確限制。F-01關閉且相應回歸成功後，再評估整體驗收結論。

**目前交付的是可追溯的驗收結果：題庫結構與10筆已知修正成功、核心網頁流程成功、圖表完整性失敗、其餘列明範圍未測試。整套網站尚未通過最終驗收。**
