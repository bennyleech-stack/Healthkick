/* ============================================================
   Health Kick shared bottom nav — hk-nav.js
   One script include per app instead of duplicating the nav
   markup in every file. Requires hk-design.css to be linked
   first (uses its .hk-nav/.hk-overlay/.hk-sheet classes).

   Usage: <script src="hk-nav.js"></script> right before </body>.
   ============================================================ */
(function(){
  var PAGE = (location.pathname.split('/').pop() || 'index.html');

  var TABS = [
    {id:'home', label:'Home', href:'index.html', match:['index.html',''],
      icon:'<path d="M3 12L5 10M21 12L19 10M5 10V20a1 1 0 001 1h3v-5a1 1 0 011-1h4a1 1 0 011 1v5h3a1 1 0 001-1V10M5 10L12 4l7 6"/>'},
    {id:'train', label:'Train', href:'blueprint.html', match:['blueprint.html'],
      icon:'<path d="M6 7v10M18 7v10M3 12h2M19 12h2M8 12h8"/>'},
    {id:'food', label:'Food', href:'aifood.html', match:['aifood.html'],
      icon:'<path d="M6 3v7a3 3 0 006 0V3M9 10v11M18 3c-2 2-2 5-2 8s0 6 2 8"/>'},
    {id:'more', label:'More', href:null, match:[],
      icon:'<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>'}
  ];

  var MORE_LINKS = [
    {label:'🧘 Mobility', href:'mobility.html'},
    {label:'🌙 Sleep', href:'sleep.html'},
    {label:'💧 Hydration', href:'water.html'},
    {label:'🍺 Drinks', href:'drinks.html'},
    {label:'🗓️ Weekly Round-up', href:'weekly.html'},
    {label:'🍽️ Fuel', href:'fuel.html'},
    {label:'🏃 Cardio Log', href:'cardio.html'},
    {label:'📊 Reports', href:'index.html#reports'},
    {label:'🏆 Body', href:'index.html#body'},
    {label:'🎯 Goals', href:'index.html#goals'}
  ];

  function svgIcon(inner){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+inner+'</svg>';
  }

  var navHtml = '<nav class="hk-nav" aria-label="Health Kick">' + TABS.map(function(t){
    var isOn = t.match.indexOf(PAGE) > -1;
    if(t.id === 'more'){
      return '<button type="button" class="hk-nav-item'+(isOn?' hk-on':'')+'" id="hk-nav-more-btn" aria-haspopup="true">'+svgIcon(t.icon)+t.label+'</button>';
    }
    return '<a class="hk-nav-item'+(isOn?' hk-on':'')+'" href="'+t.href+'">'+svgIcon(t.icon)+t.label+'</a>';
  }).join('') + '</nav>';

  var sheetHtml = '<div class="hk-overlay" id="hk-more-overlay">' +
    '<div class="hk-sheet">' +
      '<div class="hk-sheet-handle"></div>' +
      '<div style="font-family:var(--hk-font-display,\'Syne\',sans-serif);font-size:19px;font-weight:800;color:var(--hk-text);margin-bottom:14px">More</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">' +
        MORE_LINKS.map(function(l){
          return '<a href="'+l.href+'" style="text-decoration:none;display:block;background:var(--hk-surface-2);border:1px solid var(--hk-border);border-radius:var(--hk-r-sm);padding:14px 10px;color:var(--hk-text);font-size:12.5px;font-weight:700;min-height:44px;display:flex;align-items:center">'+l.label+'</a>';
        }).join('') +
      '</div>' +
    '</div>' +
  '</div>';

  document.body.insertAdjacentHTML('beforeend', navHtml + sheetHtml);

  var moreBtn = document.getElementById('hk-nav-more-btn');
  var overlay = document.getElementById('hk-more-overlay');
  if(moreBtn && overlay){
    moreBtn.addEventListener('click', function(){ overlay.classList.add('hk-show'); });
    overlay.addEventListener('click', function(e){
      if(e.target === overlay || e.target.closest('a')) overlay.classList.remove('hk-show');
    });
  }
})();
