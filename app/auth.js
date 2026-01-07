// Fisier comun care tine regulile de autentificare



// Functia verifica daca isLoggedIn are valoarea "True" in localStorage
// Daca nu este logat, il trimite pe pagina de login
export function requireAuth() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "../login/index.html";
  }
}

// Functia sterge din localStorage indicatorul de login
// Face redirect catre pagina de login dupa ce ai efectuat logout
export function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedUser");
  window.location.href = "../login/index.html";
}
