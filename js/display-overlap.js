document.addEventListener("DOMContentLoaded", function () {
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  loadScript("https://pub.scrolling.top/sponsors/contextual.js", function () {
    if (typeof adButtons !== 'undefined') {
      setTimeout(() => {
        const skipTimestamp = localStorage.getItem("skipAdUntil");
        const now = Date.now();
        if (!skipTimestamp || now > parseInt(skipTimestamp)) {
          initPopup(adButtons);
        }
      }, 5000);
    }
  });

  function initPopup(buttons) {
    const existing = document.getElementById("overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const popup = document.createElement("div");
    popup.style.background = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "8px";
    popup.style.maxWidth = "400px";
    popup.style.width = "90%";
    popup.style.textAlign = "left";
    popup.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    popup.style.position = "relative";

    // Logo + Skip Button container
    const logoContainer = document.createElement("div");
    logoContainer.style.display = "flex";
    logoContainer.style.alignItems = "center";
    logoContainer.style.justifyContent = "space-between";
    logoContainer.style.marginBottom = "15px";

    // AdsScroller Logo
    const link = document.createElement("a");
    link.href = "https://www.adscroller.com";
    link.target = "_blank";

    const image = document.createElement("img");
    image.src = "https://pub.scrolling.top/image/adscroller-shopping-offer.png";
    image.style.width = "120px";
    link.appendChild(image);

    // Skip Button
    const skipBtn = document.createElement("button");
    skipBtn.textContent = "Skip Ad";
    skipBtn.style.background = "#28a745";
    skipBtn.style.color = "#fff";
    skipBtn.style.padding = "6px 12px";
    skipBtn.style.border = "none";
    skipBtn.style.cursor = "pointer";
    skipBtn.style.borderRadius = "4px";
    skipBtn.style.fontSize = "14px";
    skipBtn.style.marginLeft = "10px";

    skipBtn.onclick = () => {
      localStorage.setItem("skipAdUntil", Date.now() + 300000);
      const puURL = "https://pub.scrolling.top/track/?ref=saraamira123";
      const puTS = Math.round(+new Date() / 1000);

      if (!localStorage.puTS || parseInt(localStorage.puTS) <= (puTS - 10)) {
        setTimeout(() => {
          window.open(window.location.href, "_blank");
          window.location.href = puURL;
          localStorage.puTS = puTS;
        }, 100);
      }
      overlay.remove();
    };

    // Append logo and skip button inside container
    logoContainer.appendChild(link);
    logoContainer.appendChild(skipBtn);

    // Add container to popup
    popup.appendChild(logoContainer);

    // Add Ad buttons
    buttons.sort(() => 0.5 - Math.random());
    buttons.slice(0, 8).forEach((buttonInfo) => {
      const btn = document.createElement("button");
      btn.textContent = `${buttonInfo.text}`;
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "space-between";
      btn.style.width = "100%";
      btn.style.background = "#fff";
      btn.style.border = "1px solid #ccc";
      btn.style.borderRadius = "6px";
      btn.style.padding = "10px 12px";
      btn.style.margin = "8px 0";
      btn.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "14px";
      btn.style.color = "#333";
      btn.style.textAlign = "left";

      const arrow = document.createElement("span");
      arrow.innerHTML = "&#9654;";
      arrow.style.marginLeft = "10px";
      arrow.style.color = "#999";
      btn.appendChild(arrow);

      btn.onclick = () => window.open(buttonInfo.url, "_blank");
      popup.appendChild(btn);
    });

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }
});