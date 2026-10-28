import pathlib
src = pathlib.Path(__file__).parent / 'src'
ORDER = ['cnh', 'wdh', 'twg', 'asg', 'wdg', 'soc', 'law', 'eco']
isl_files = [f'data_{k}.js' for k in ORDER if (src / f'data_{k}.js').exists()]
isl_files += [f for f in ['data_notes.js', 'data_fig.js', 'data_ctx.js', 'data_overlap.js', 'data_foils.js', 'data_groups.js'] if (src / f).exists()]
data = '\n'.join((src / f).read_text(encoding='utf-8') for f in ['hand_twh_1.js', 'hand_twh_2.js', 'hand_twh_ctx.js', 'gen_twh.js', 'links_twh.js', 'links_cross.js', 'dsl.js'] + isl_files + ['preview.js', 'engine.js'])
app = (src / 'app.js').read_text(encoding='utf-8').replace('/*CHAPMODELS*/', (src / 'models_wip.js').read_text(encoding='utf-8')).replace('/*PEOPLE*/', (src / 'deco.js').read_text(encoding='utf-8') + '\n' + (src / 'people.js').read_text(encoding='utf-8'))
html = (src / 'app.html').read_text(encoding='utf-8').replace('/*DATA*/', data).replace('/*APP*/', app)
out = pathlib.Path(__file__).parent / 'artifact.html'
out.write_text(html, encoding='utf-8')
print(out, len(html.encode('utf-8')), 'bytes')

# 獨立版（GitHub Pages 等一般網站用）：補上完整的 HTML 文件外殼、分享預覽、網站圖示與離線功能
import hashlib, json
SITE = 'https://lutm6666.github.io/social-studies-review-island/'
TITLE = '社會科複習島'
DESC = '國中社會科（108 課綱）3D 島嶼複習網站：歷史、地理、公民九座島，近四千題，附解說、圖表題與錯題複習。'
head = ('<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">'
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  f'<meta name="description" content="{DESC}">'
  '<meta name="theme-color" content="#1f4a6e">'
  '<link rel="manifest" href="manifest.webmanifest">'
  '<link rel="icon" type="image/png" href="favicon.png">'
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">'
  '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
  f'<meta name="apple-mobile-web-app-title" content="{TITLE}">'
  f'<meta property="og:type" content="website"><meta property="og:title" content="{TITLE}">'
  f'<meta property="og:description" content="{DESC}"><meta property="og:url" content="{SITE}">'
  f'<meta property="og:image" content="{SITE}og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
  '<meta name="twitter:card" content="summary_large_image">'
  '<style>[hidden]{display:none!important}html,body{margin:0;padding:0}</style></head><body>')
reg = ('<script>if("serviceWorker" in navigator && location.protocol==="https:"){addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}</script>')
standalone = head + html + reg + '</body></html>'
site = pathlib.Path(__file__).parent
(site / 'index.html').write_text(standalone, encoding='utf-8')
print(site / 'index.html', len(standalone.encode('utf-8')), 'bytes')

manifest = {'name': TITLE, 'short_name': TITLE, 'description': DESC, 'lang': 'zh-Hant',
  'start_url': './', 'scope': './', 'display': 'standalone', 'background_color': '#1f4a6e', 'theme_color': '#1f4a6e',
  'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'}]}
(site / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')

ver = hashlib.sha1(standalone.encode('utf-8')).hexdigest()[:10]
sw = (src / 'sw.js').read_text(encoding='utf-8').replace('__VERSION__', ver)
(site / 'sw.js').write_text(sw, encoding='utf-8')
print('sw.js version', ver)
