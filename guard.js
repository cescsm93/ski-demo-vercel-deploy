/* 雪线 ALPINE · 容器兜底守护（经典脚本，ES2017）
   仅在渲染器本身没有覆盖的边界情况下做轻量提示，不改变任何玩法逻辑。 */
(function () {
  'use strict';
  function showFallback(text) {
    var loading = document.getElementById('loading');
    if (!loading) { return; }
    if (loading.innerHTML.indexOf('无法启动') >= 0 || loading.innerHTML.indexOf('初始化失败') >= 0) {
      return; // 游戏自身已给出更准确的提示，不覆盖
    }
    loading.style.display = 'grid';
    loading.innerHTML = text + '<small style="display:block;margin-top:6px;opacity:.75">请确认设备已启用图形加速</small>';
  }
  var canvas = document.getElementById('game');
  if (canvas) {
    canvas.addEventListener('webglcontextlost', function (ev) {
      ev.preventDefault();
      showFallback('3D 画面已暂停');
    }, false);
    canvas.addEventListener('webglcontextrestored', function () {
      var loading = document.getElementById('loading');
      if (loading) { loading.style.display = 'none'; }
    }, false);
  }
  window.addEventListener('error', function (ev) {
    var m = ev && ev.message ? String(ev.message) : '';
    if (/webgl|gpu|context|renderer/i.test(m)) { showFallback('画面初始化失败'); }
  });
})();
