---
layout: page
title: This site has moved
redirect_to: https://lybekk.tech/
canonical_url: https://lybekk.tech/
---

[lybekk.tech](https://lybekk.tech/) is hosted on Codeberg.

Redirecting in <span class="count" id="count">3</span>&hellip; or [go there now](https://lybekk.tech/).

<script>
  var target = "https://lybekk.tech/" + location.search + location.hash;
  var n = 3, el = document.getElementById("count");
  var timer = setInterval(function () {
    n -= 1;
    if (el) el.textContent = String(Math.max(n, 0));
    if (n <= 0) { clearInterval(timer); location.replace(target); }
  }, 1000);
</script>
