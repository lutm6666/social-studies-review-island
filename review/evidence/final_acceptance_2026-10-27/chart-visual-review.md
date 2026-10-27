# 圖表題截圖最終視覺覆核

覆核日期：2026-10-27（臺灣）。本次最後覆核範圍：主代理指定最新 main 19ede1c 重跑後覆寫的20個 chart-{id}.jpg，以及另列6張補充證據。20張圖表的題號對應與完整度已重新逐張確認，本檔與5張聯絡表均以最新截圖覆寫。

本檔僅覆核證據，不修改網站、題庫或最終報告。

## 方法

先以 view_image 開啟 chart-twg5-h7.jpg 與 chart-twg4-h8.jpg 原圖，確認圖表位置與題目對應。再以 Pillow 裁切右側題目面板（原圖1228×516，取x約773至1228、全高），覆寫5張2×2聯絡表，以 view_image 逐張檢視20幅完整圖表。

聯絡表：outputs/acceptance-evidence/chart-contact-sheet-01.jpg 至 chart-contact-sheet-05.jpg。裁切僅用於檢視，沒有補畫或修復圖片。

## 結論

**成功：重新擷取的20張圖表題截圖，圖表本體皆完整、與檔名代表的題目相符，無空白或明顯裁切；15種正式題庫現存圖表全包含。**

- 氣候12種：基隆、高雄、臺北、熱帶雨林、熱帶季風、熱帶草原、沙漠、北半球地中海、南半球地中海、苔原、華北、高地。月份1–12、雨量mm、氣溫°C及折線／柱圖可讀。
- 負溫：華北、高地右軸含-10；苔原右軸含-10、-20、-30，折線冬季位於零下，清楚可見。
- 人口2種：年輕型與老化型；9年齡層0–9至80+、男女兩側及圖說可讀，形狀與來源一致。
- 產業1種：甲乙丙3期均見完整堆疊柱，第一／二／三級圖例與50/20/30、20/40/40、5/35/60數值可讀。

此結論只代表**正式題庫現存20題／15圖的桌機畫面驗收**。來源原定28題／18圖，另8題被engine按相同題幹去重，穩定型人口、溫帶海洋性、溫帶大陸性3種圖未進正式題庫；該完整性缺陷仍為失敗，不因現存圖表畫面成功而結案。

## 逐檔覆核

| 截圖檔名 | 圖形與題意 | 檔名對應 | 結果 |
|---|---|---|---|
| chart-asg1-h8.jpg | 華北，冬冷夏雨／季風氣候，負溫可見 | 相符 | 成功 |
| chart-asg1-h9.jpg | 高地，夏季不到15度，冬季負溫可見 | 相符 | 成功 |
| chart-asg4-h11.jpg | 熱帶季風，六至九月豐雨／西南季風原因 | 相符 | 成功 |
| chart-asg4-h9.jpg | 熱帶雨林，全年高溫多雨 | 相符 | 成功 |
| chart-asg5-h10.jpg | 沙漠，雨量低／綠洲農業題 | 相符 | 成功 |
| chart-twg3-h10.jpg | 高雄，冬乾夏雨辨識 | 相符 | 成功 |
| chart-twg3-h11.jpg | 高雄，冬雨少原因 | 相符 | 成功 |
| chart-twg3-h12.jpg | 臺北，五至九月多雨天氣現象 | 相符 | 成功 |
| chart-twg3-h9.jpg | 基隆，冬雨多辨識 | 相符 | 成功 |
| chart-twg4-h11.jpg | 老化人口，少子高齡問題 | 相符 | 成功 |
| chart-twg4-h12.jpg | 年輕人口，托育教育政策 | 相符 | 成功 |
| chart-twg4-h8.jpg | 年輕人口，類型辨識 | 相符 | 成功 |
| chart-twg5-h7.jpg | 產業結構甲至丙變化趨勢 | 相符 | 成功 |
| chart-twg5-h8.jpg | 產業結構，丙期第三級60%最高 | 相符 | 成功 |
| chart-twg5-h9.jpg | 產業結構變化的發展含意 | 相符 | 成功 |
| chart-wdg1-h10.jpg | 南半球地中海，澳洲西南部辨識 | 相符 | 成功 |
| chart-wdg1-h11.jpg | 苔原，北極海沿岸／冬季負溫 | 相符 | 成功 |
| chart-wdg1-h9.jpg | 南半球地中海，七月低／一月高 | 相符 | 成功 |
| chart-wdg2-h10.jpg | 熱帶草原，乾濕季與遷徙 | 相符 | 成功 |
| chart-wdg3-h12.jpg | 北半球地中海，耐旱作物 | 相符 | 成功 |

## 15種唯一圖表覆蓋核對

| 唯一圖表 | 至少一張對應截圖 |
|---|---|
| keelung | chart-twg3-h9.jpg |
| kaohsiung | chart-twg3-h10.jpg、chart-twg3-h11.jpg |
| taipei | chart-twg3-h12.jpg |
| rainforest | chart-asg4-h9.jpg |
| monsoonTrop | chart-asg4-h11.jpg |
| savanna | chart-wdg2-h10.jpg |
| desert | chart-asg5-h10.jpg |
| medN | chart-wdg3-h12.jpg |
| medS | chart-wdg1-h9.jpg、chart-wdg1-h10.jpg |
| tundra | chart-wdg1-h11.jpg |
| northChina | chart-asg1-h8.jpg |
| highland | chart-asg1-h9.jpg |
| young | chart-twg4-h8.jpg、chart-twg4-h12.jpg |
| aging | chart-twg4-h11.jpg |
| IND | chart-twg5-h7.jpg、chart-twg5-h8.jpg、chart-twg5-h9.jpg |

## 邊界

- 圖表本體完整；部分題幹較長，在此頂端圖表截圖中僅見起始文字，完整題幹與選項須向下捲動，不能單靠頂端圖表截圖證明全部選項完整可見。
- 本批是桌機1228×516截圖，未證明手機、Safari、實際觸控或行動GPU表現。
- 圖表為典型示意資料，不是特定測站實測資料。視覺成功不等於外部數據準確性已逐一重查。
- 8筆去重缺失是另行確定的來源到正式題庫完整性失敗；現存圖表渲染與完整性應分軸記錄。

## 其他已核對畫面

| 檔案 | 可支持的觀察 |
|---|---|
| 09-exam-result.jpg | a4cc版三科20/20、時間2:01、平均6秒 |
| 10-cross-route-result.jpg | a4cc版工業革命與勞工權益5/5 |
| 13-narrow-population-chart.jpg | CSS390×844，年輕人口9年齡層及男女圖可讀 |
| narrow-industry-chart.jpg | CSS390×844，甲乙丙堆疊柱及圖例可讀 |
| narrow-climate-chart.jpg | CSS390×844，高地氣候12月份、負溫刻度可讀 |
| 23-latest-chart-result.jpg | 19ede版20/20，亞洲5/5、臺灣地理10/10、世界5/5 |
| 24-final-wrong-island-empty.jpg | 19ede版沙灘上乾乾淨淨、三科錯題各0、練錯題0題停用 |

全部圖表頂端畫面只證明圖形與起始題幹；逐題作答及回饋另見JSON。三張窄視窗為桌機瀏覽器縮窄，實體手機未測試。
