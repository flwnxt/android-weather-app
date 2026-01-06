1. Ecran de home
2. Ecran de login
3. Ecran de search pentru weather
4. Ecran de help (cum se foloseste aplicatia)
5. Ecran de contact (nume studenti + email)
6. Ecran de colectare feedback (formular pentru nume / prenume + text recenzie)

solutie:
1. Mergem pe varianta A. 2 Activities:
    a. MainActivity care contine un WebView cu cele 6 pagini 
    b. InfoActivity care incarca o ruta interna de /contact
2. Optiune in mentiul de sus cu "Iesire" si mesaj de confirmare 
3. Facem si splash screen 
4. BE Python + Flask 
    a. pagina de login local (client-side) cu flag in localStorage si BE pentru formularul de feedback in Python
    b. Folosim JSON file pe serverul de Flask pentru salvarea datelor din formularul de feedback



Sa nu modifici culorile initiale ale css-ului decat daca specific eu explicit asta
1. Creare structura de fisiere bazate pe ecranele care trebuiesc adaugate
2. Adaugarea ecranelor in navbar 
2. Creare pagini pentru fiecare menu