/* GUISE & AXIS project page: headerbar behaviour, scroll spy, and the angle
   charts built from static/js/data.js. No dependencies, so GitHub Pages serves
   it as-is. Single light theme: there is no colour-scheme toggle. */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var D = window.DATA || {};

  /* ---------------------------- headerbar ----------------------------- */
  var bar = $('headerbar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Highlight the nav entry for whichever section is currently in view.
  var navLinks = document.querySelectorAll('.headerbar-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    Array.prototype.forEach.call(navLinks, function (a) {
      byId[a.getAttribute('href').slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = byId[e.target.id];
        if (!a || !e.isIntersecting) { return; }
        Array.prototype.forEach.call(navLinks, function (x) { x.classList.remove('active'); });
        a.classList.add('active');
      });
    }, { rootMargin: '-64px 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { spy.observe(el); }
    });
  }

  /* ------------------------------ charts ------------------------------- */
  /* One shared scale (0-90 degrees) for all three models, so bar lengths can
     be compared across panels and 90 degrees reads as "orthogonal". */
  var charts = $('charts');
  if (charts && D.charts) {
    var max = D.angleMax || 90;
    D.charts.forEach(function (spec) {
      var box = document.createElement('div');
      box.className = 'chart';

      var h = document.createElement('h3');
      h.textContent = spec.title;
      box.appendChild(h);

      var u = document.createElement('p');
      u.className = 'unit';
      u.textContent = spec.unit;
      box.appendChild(u);

      var bars = document.createElement('div');
      bars.className = 'bars';
      spec.rows.forEach(function (r) {
        var row = document.createElement('div');
        row.className = 'bar-row' + (r.hot ? ' hot' : '');

        var name = document.createElement('div');
        name.className = 'name';
        name.textContent = r.name;

        var track = document.createElement('div');
        track.className = 'bar-track';
        var fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.dataset.width = Math.min(100, (r.value / max) * 100).toFixed(2) + '%';
        track.appendChild(fill);

        var val = document.createElement('div');
        val.className = 'val';
        val.textContent = r.value.toFixed(1) + '°';

        row.appendChild(name);
        row.appendChild(track);
        row.appendChild(val);
        bars.appendChild(row);
      });
      box.appendChild(bars);

      if (spec.foot) {
        var f = document.createElement('p');
        f.className = 'foot';
        f.textContent = spec.foot;
        box.appendChild(f);
      }
      charts.appendChild(box);
    });

    // Widths are applied on reveal so the bars animate in.
    var fills = charts.querySelectorAll('.bar-fill');
    var reveal = function (el) { el.style.width = el.dataset.width; };
    if ('IntersectionObserver' in window) {
      var bio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { reveal(e.target); bio.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      Array.prototype.forEach.call(fills, function (el) { bio.observe(el); });
    } else {
      Array.prototype.forEach.call(fills, reveal);
    }
  }
}());
