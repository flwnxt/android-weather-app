from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

# Crearea aplicatiei si definire CORS (accepare request-uri de pe alt domeniu)
app = Flask(__name__)
CORS(app)

# Salvare date din formular in feedback.json
DATA_FILE = "feedback.json"

# Functie care citeste din json
# Returneaza o lista goala daca json-ul este gol sau daca returneaza o eroare
# Il citeste si il transforma in structura python daca acesta contine elemente
def load_feedback():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

# Primeste lista de feedback "items" si o scrie in feedback.json
def save_feedback(items):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

# Cream ruta de /feedback
@app.route("/feedback", methods=["POST"])
def create_feedback():
    data = request.get_json(silent=True) # parseaza body-ul request-ului ca pe un JSON

    # Daca nu a venit nimic intoarce 400 
    if not data:
        return jsonify({"message": "Body invalid sau lipsă (trebuie JSON)."}), 400

    # Extrage campurile
    name = str(data.get("name", "")).strip()
    title = str(data.get("title", "")).strip()
    message = str(data.get("message", "")).strip()

    # Validari
    if not name:
        return jsonify({"message": "Câmpul 'Nume' este obligatoriu."}), 400
    if not title:
        return jsonify({"message": "Câmpul 'Titlu' este obligatoriu."}), 400
    if not message:
        return jsonify({"message": "Câmpul 'Text feedback' este obligatoriu."}), 400

    # Crearea dictionarului "feedback"
    new_item = {
        "name": name,
        "title": title,
        "message": message,
        "created_at": datetime.utcnow().isoformat() + "Z",
    }

    # Salveaza in fisier
    items = load_feedback()
    items.append(new_item)
    save_feedback(items)

    # Raspuns de success
    return jsonify({"status": "ok", "message": "Feedback salvat cu succes."}), 201

# Cand accesam in browser returneaza lista feedback-urilor
@app.route("/feedback", methods=["GET"])
def list_feedback():
    return jsonify(load_feedback()), 200

# Pornirea serverului
# 0.0.0.0 - asculta pe toate interfetele
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
