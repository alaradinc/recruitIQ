(function () {
  function closeAllAddSport() {
    document.querySelectorAll('.add-sport-wrap.open').forEach(function (w) {
      w.classList.remove('open');
      var tr = w.querySelector('.add-sport-trigger');
      if (tr) tr.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', function () {
    closeAllAddSport();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeAllAddSport();
  });

  document.querySelectorAll('.add-sport-wrap').forEach(function (wrap) {
    var trigger = wrap.querySelector('.add-sport-trigger');
    var panel = wrap.querySelector('.add-sport-panel');
    var select = wrap.querySelector('.add-sport-select');
    var gbtns = wrap.querySelectorAll('.add-sport-gbtn');
    var addBtn = wrap.querySelector('.add-sport-add');
    var handlerName = (wrap.getAttribute('data-tab-handler') || '').trim();
    var gender = 'M';

    if (!trigger || !panel || !select || !addBtn || gbtns.length === 0) return;

    gbtns.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        gbtns.forEach(function (x) {
          x.classList.remove('active');
        });
        b.classList.add('active');
        gender = b.getAttribute('data-gender') || 'M';
      });
    });

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !wrap.classList.contains('open');
      closeAllAddSport();
      if (open) {
        wrap.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    addBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var sport = (select.value || '').trim();
      if (!sport) return;

      var tab = document.createElement('div');
      tab.className = 'team-tab';
      var slug = sport.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      tab.setAttribute('data-program', slug + '-' + (gender === 'W' ? 'w' : 'm'));
      tab.appendChild(document.createTextNode(sport + ' '));
      var badge = document.createElement('span');
      badge.className = 'gender-badge ' + (gender === 'W' ? 'gender-w' : 'gender-m');
      badge.textContent = gender === 'W' ? 'W' : 'M';
      tab.appendChild(badge);

      if (handlerName && typeof window[handlerName] === 'function') {
        tab.setAttribute('onclick', handlerName + '(this)');
      }

      wrap.parentNode.insertBefore(tab, wrap);
      closeAllAddSport();
      select.selectedIndex = 0;
      gender = 'M';
      gbtns.forEach(function (btn, i) {
        btn.classList.toggle('active', i === 0);
      });
      if (handlerName && typeof window[handlerName] === 'function') {
        window[handlerName](tab);
      }
    });
  });
})();
