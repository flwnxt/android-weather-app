

// Inserare navbar in fiecare pagina 
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
  
})();
