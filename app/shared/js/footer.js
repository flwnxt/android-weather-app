// shared/js/footer.js
(async function loadFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;

  const footerPath = "../../shared/components/footer.html";

  try {
    const res = await fetch(footerPath, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const html = await res.text();
    container.innerHTML = html;

    initFooterInteractions(container);
  } catch (err) {
    console.error("[footer] Eroare la încărcarea footer-ului:", err);
  }
})();

// JavaScript pentru 
function initFooterInteractions(root) {
  const toggle = root.querySelector("[data-toggle='students']");
  const content = root.querySelector("[data-content='students']");

  if (toggle && content) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      content.hidden = expanded;
    });
  }
}