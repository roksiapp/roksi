// Собирает приложение из прототипа: node build.js
// 04_Прототип/roksi.html → index.html (+ значок, установка на телефон, работа без интернета), sw.js получает новую версию.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', '04_Прототип', 'roksi.html');
const build = new Date().toISOString().replace(/\D/g, '').slice(0, 12);

const head = [
  '<!doctype html>',
  '<html lang="ru">',
  '<meta name="theme-color" content="#16181B">',
  '<link rel="manifest" href="manifest.webmanifest">',
  '<link rel="icon" type="image/png" href="icon-192.png">',
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-title" content="Roksi">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
  ''
].join('\n');
const tail = '\n<script>if (\'serviceWorker\' in navigator) navigator.serviceWorker.register(\'sw.js\');</script>\n';

const html = fs.readFileSync(src, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), head + html + tail);

const sw = path.join(__dirname, 'sw.js');
fs.writeFileSync(sw, fs.readFileSync(sw, 'utf8').replace(/const CACHE = 'roksi-[^']*';/, "const CACHE = 'roksi-" + build + "';"));

console.log('Собрано: index.html, версия ' + build);
