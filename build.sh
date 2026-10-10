#!/bin/sh
# Ghép src/ thành index.html (một tệp duy nhất, chạy được trên GitHub Pages)
set -e
cd "$(dirname "$0")"
JS=$(mktemp -t lab).js
{ echo '(()=>{'; cat src/2-core-toan.js src/3-ly.js src/4-hoa.js src/5-sinh.js src/6-build.js src/7-dia.js src/8-tin.js src/10-ly2.js src/11-more.js src/12-more2.js src/9-boot.js; echo '})();'; } > "$JS"
if command -v node >/dev/null 2>&1; then node --check "$JS"; fi
HEAD_END=$(grep -n '</style>' src/1-page.html | head -1 | cut -d: -f1)
{
  echo '<!doctype html>'
  echo '<html lang="vi">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  echo '<meta name="description" content="Phòng Lab Ảo: mô phỏng tương tác cho giáo viên Toán, Lí, Hoá, Sinh, Địa, Tin cấp 2 và cấp 3.">'
  head -n "$HEAD_END" src/1-page.html
  echo '</head>'
  echo '<body>'
  tail -n +"$((HEAD_END+1))" src/1-page.html
  echo '<script>'
  cat "$JS"
  echo '</script>'
  echo '</body>'
  echo '</html>'
} > index.html
rm -f "$JS" "${JS%.js}"
echo "Đã tạo index.html"
