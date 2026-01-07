// Fisier comun care tine regulile de autentificare


const AUTH_KEY = "isLoggedIn";
const USER_KEY = "loggedUser";

// A. LOGIN - Functie pentru routarea automata catre pagina de login
function getLoginUrl() {
  const path = window.location.pathname;
// Daca path-ul contine /pages/ -> merge 2 path-uri in spate
  if (path.includes("/pages/")) {
    return "../../pages/login/index.html";
  }
  // else: va merge pe calea directa din /pages/login
  return "./pages/login/index.html";
}

// B. LOGOUT - Functie pentru routarea automata catre pagina de home 
function getLogoutUrl() {
  const path = window.location.pathname;
  if (path.includes("/pages/")) {
    return "../../pages/home/index.html";
  }
  return "./pages/home/index.html";
}


// 1. Login
// Functia verifica daca isLoggedIn are valoarea "True" in localStorage
// Daca nu este logat, il trimite pe pagina de login
export function requireAuth() {
  if (localStorage.getItem(AUTH_KEY) !== "true") {
    window.location.href = getLoginUrl();
  }
}

// 2. Logout
// Functia sterge din localStorage indicatorul de login
// Face redirect catre pagina de login dupa ce ai efectuat logout
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = getLogoutUrl();
}


// 3. Navbar button switch between login <-> logout
// Functia cauta butonul cu id-ul "authBtn" in doom
export function setupAuthNav() {
  const btn = document.getElementById("authBtn");
  if (!btn) return;

  const isLoggedIn = localStorage.getItem(AUTH_KEY) === "true";

  // fix bug privind dublarea listener-elor
  const cleanBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(cleanBtn, btn);

  // Cazul in care userul este logat: textul devine "Logout"
  if (isLoggedIn) {
    cleanBtn.textContent = "Logout";
    cleanBtn.href = "#";

    // La click oprim navigarea si apelam functia logout()
    cleanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });

  } else {
    cleanBtn.textContent = "Login"; // textul devine 'Login'
    cleanBtn.href = getLoginUrl();  // butonul redirectioneaza catre login url
  }
}




