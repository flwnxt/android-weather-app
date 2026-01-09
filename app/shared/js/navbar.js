
// navbar.js

(async function loadNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  const navbarPath = "../../shared/components/navbar.html";

  const res = await fetch(navbarPath);
  const html = await res.text();
  container.innerHTML = html;

  // Inserare setupAuthNav (face switch intre butoanele de Login si Logout)
  const authModule = await import("../../auth.js");
  authModule.setupAuthNav();

  // Script pentru deschiderea burger meniului pe mobile 
  const toggleBtn = container.querySelector(".nav-toggle");
  const navLinks = container.querySelector(".nav-links");
  const overlay = container.querySelector(".nav-overlay");

  if (!toggleBtn || !navLinks || !overlay) return;

  // IMPORTANT: scoatem overlay-ul din navbar ca să acopere tot viewport-ul
  document.body.appendChild(overlay);

  function closeMenu() {
    navLinks.classList.remove("is-open");
    overlay.classList.remove("is-open");
    toggleBtn.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    navLinks.classList.add("is-open");
    overlay.classList.add("is-open");
    toggleBtn.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  navLinks.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  // daca e desktop (meniul nu e drawer), nu intervenim
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  // prevenim navigarea imediata ca sa nu "inghete" animatia
  e.preventDefault();

  closeMenu();

  // asteptam sa se termine tranzitia si apoi navigam
  const href = link.getAttribute("href");
  setTimeout(() => {
    window.location.href = href;
  }, 260); // ~250ms (match cu CSS transition)
});


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

