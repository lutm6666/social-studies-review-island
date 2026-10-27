import pathlib
src = pathlib.Path(__file__).parent / 'src'
ORDER = ['cnh', 'wdh', 'twg', 'asg', 'wdg', 'soc', 'law', 'eco']
isl_files = [f'data_{k}.js' for k in ORDER if (src / f'data_{k}.js').exists()]
isl_files += [f for f in ['data_notes.js', 'data_fig.js', 'data_ctx.js', 'data_overlap.js'] if (src / f).exists()]
data = '\n'.join((src / f).read_text(encoding='utf-8') for f in ['hand_twh_1.js', 'hand_twh_2.js', 'hand_twh_ctx.js', 'gen_twh.js', 'links_twh.js', 'links_cross.js', 'dsl.js'] + isl_files + ['preview.js', 'engine.js'])
app = (src / 'app.js').read_text(encoding='utf-8').replace('/*CHAPMODELS*/', (src / 'models_wip.js').read_text(encoding='utf-8')).replace('/*PEOPLE*/', (src / 'deco.js').read_text(encoding='utf-8') + '\n' + (src / 'people.js').read_text(encoding='utf-8'))
html = (src / 'app.html').read_text(encoding='utf-8').replace('/*DATA*/', data).replace('/*APP*/', app)
out = pathlib.Path(__file__).parent / 'artifact.html'
out.write_text(html, encoding='utf-8')
print(out, len(html.encode('utf-8')), 'bytes')

# 獨立版（GitHub Pages 等一般網站用）：補上完整的 HTML 文件外殼
standalone = ('<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">'
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  '<meta name="description" content="國中社會科（108 課綱）3D 島嶼複習網站：歷史、地理、公民九座島、近四千題。">'
  '<style>[hidden]{display:none!important}html,body{margin:0;padding:0}</style></head><body>' + html + '</body></html>')
site = pathlib.Path(__file__).parent
site.mkdir(exist_ok=True)
(site / 'index.html').write_text(standalone, encoding='utf-8')
print(site / 'index.html', len(standalone.encode('utf-8')), 'bytes')
