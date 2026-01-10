// Back button JS

(async function loadBackButton() {
  const container = document.getElementById("back-button-container");
  if (!container) return;

  const path = "../../shared/components/back-button.html";
  const res = await fetch(path);
  const html = await res.text();
  container.innerHTML = html;

  // ✅ calculeaza inaltimea reala a navbar-ului si seteaza variabila CSS
  function setNavbarOffset() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const rect = navbar.getBoundingClientRect();
    document.documentElement.style.setProperty("--navbar-offset", `${rect.height}px`);
  }

  setNavbarOffset();
  window.addEventListener("resize", setNavbarOffset);
})();
