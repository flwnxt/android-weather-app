// Logica de login din pagina login.html
// Cand userul se logheaza flag-ul "isLoggedIn" din localStorage va avea valoarea "True"

// username si password hardocate
const AUTH_KEY = "isLoggedIn";
const USERNAME = "admin";
const PASSWORD = "admin";

// redirectionare user pe pagina de home daca acesta este deja logat
if (localStorage.getItem(AUTH_KEY) === "true") {
  window.location.href = "../home/index.html"; 
}

// Preluare date din formular 
const form = document.getElementById("loginForm");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const errorEl = document.getElementById("error"); // error handling

// Listener pentru submit-ul form-ului
form.addEventListener("submit", (e) => {
  e.preventDefault(); // opreste refresh si request-uri HTTP
  errorEl.textContent = ""; // curata mesajul de eroare anterior (Daca exista)
    
// Citim datele introduse de user
  const u = usernameEl.value.trim();
  const p = passwordEl.value;

// Daca parola si username-ul sunt corecte facem log-in-ul
  if (u === USERNAME && p === PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true"); // seteaza auth_key pe "true"
    localStorage.setItem("loggedUser", u); // folositor pentru mesaj de greeting
    window.location.href = "../home/index.html"; // redirect catre home
    return;
  }

// Error handling - daca user sau parola sunt gresite, afisam eroare 
  errorEl.textContent = "Username sau parola incorecte.";
  passwordEl.value = "";
  passwordEl.focus();
});
