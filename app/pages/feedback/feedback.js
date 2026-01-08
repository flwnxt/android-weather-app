// feedback.js

const form = document.getElementById("feedbackForm");
const statusEl = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

function setStatus(message, type = "error") {
  statusEl.textContent = message;

  // Refolosim clasa .error din CSS, dar schimbam culoarea din JS la succes
  if (type === "success") {
    statusEl.style.color = "green";
  } else {
    statusEl.style.color = "#b00020"; // culoarea default din "error"
  }
}

// Luam datele introduse in Front-End
function getPayload() {
  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title").value.trim();
  const message = document.getElementById("message").value.trim();

  return { name, title, message };
}

// Validam datele introduse in front-end
function validate({ name, title, message }) {
  if (!name) return "Te rog completează numele.";
  if (!title) return "Te rog completează titlul.";
  if (!message) return "Te rog completează textul de feedback.";

  // alte validari
  if (name.length < 2) return "Numele trebuie să aibă minim 2 caractere.";
  if (title.length < 3) return "Titlul trebuie să aibă minim 3 caractere.";
  if (message.length < 5) return "Feedback-ul trebuie să aibă minim 5 caractere.";

  return null;
}

// Functie pentru a trimite datele din payload catre endpoint-ul "/feedback" din Flask
async function submitFeedback(payload) {
  // IMPORTANT:
  // const API_URL = "http://localhost:5001/feedback";
  const API_URL = "http://10.0.2.2:5001/feedback";

    // Trimitem propriu-zis request-ul catre server (si asteptam raspunsul - prin await)
    // Salvam response-ul in constanta "res"
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // try & catch in ideea in care primim eroare de la BE
  let data = null;
  try {
    data = await res.json();
  } catch (_) {}

  // Previne eroare in JS atunci cand raspunsul de la BE nu este JSON
  if (!res.ok) {
    const msg = data?.message || "Eroare la trimiterea feedback-ului.";
    throw new Error(msg);
  }

  return data;
}


sendBtn.addEventListener("click", async () => {
  setStatus("");
  statusEl.classList.remove("fade-out");

  const payload = getPayload();
  const validationError = validate(payload);
  if (validationError) {
    setStatus(validationError, "error");
    return;
  }

  const originalText = sendBtn.textContent;
  sendBtn.disabled = true;
  sendBtn.textContent = "Se trimite...";

  try {
    await submitFeedback(payload);
    setStatus("Feedback-ul a fost trimis ✅", "success");

    setTimeout(() => {
      statusEl.classList.add("fade-out");
    }, 2500);

    setTimeout(() => {
      statusEl.textContent = "";
      statusEl.classList.remove("fade-out");
      form.reset();
    }, 3000);

  } catch (err) {
    statusEl.classList.remove("fade-out");
    setStatus(err.message || "A apărut o eroare.", "error");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = originalText;
  }
});


// Asculta event-ul de "submit"
// form.addEventListener("submit", async (e) => {
//     e.preventDefault(); // anuleaza refresh-ul automat al form-ului
//     setStatus(""); // curatam mesajul anterior

// // Extragem datele din input-uri si afisam mesaje de eroare 
//   const payload = getPayload();
//   const validationError = validate(payload);
//   if (validationError) {
//     setStatus(validationError, "error");
//     return;
//   }

//   // Blocarea butonului de submit - previne multiple clicks 
//   const submitBtn = form.querySelector('button[type="submit"]');
//   const originalText = submitBtn.textContent;
//   submitBtn.disabled = true;
//   submitBtn.textContent = "Se trimite...";

// //   Trimiterea propriu-zisa a mesajului
//   try {
//     await submitFeedback(payload);
//     setStatus("Feedback-ul a fost trimis ✅", "success");

//      // afisam mesajul de "success" 3 secunde
//     setTimeout(() => {
//         statusEl.classList.add("fade-out");
//     }, 2500); // incepe fade-out dupa 2.5s

//     setTimeout(() => {
//         statusEl.textContent = "";
//         statusEl.classList.remove("fade-out");
//     }, 3000); // dispare complet dupa 3s

//     setTimeout(() => form.reset(), 6000);

//   } catch (err) {
//     statusEl.classList.remove("fade-out");
//     setStatus(err.message || "A aparut o eroare.", "error");
//   } finally {
//     submitBtn.disabled = false;
//     submitBtn.textContent = originalText;
//   }
// });
