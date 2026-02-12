# ⚽ TeamBalancer

TeamBalancer è una web app statica per generare squadre bilanciate in modo semplice e veloce, basandosi sui valori di **Forza** e **Marcatura** dei giocatori.

Progettata con un’interfaccia moderna in stile glass, è deployabile facilmente su Vercel e non richiede backend.

---

## 🚀 Demo

Live demo: https://team-balancer-berna.vercel.app/

---

## ✨ Funzionalità

- ✅ Selezione giocatori
- ✅ Generazione squadre bilanciate
- 🔁 Rimescola squadre
- 🌓 Tema chiaro / scuro
- 💾 Persistenza dati in `localStorage`
- 🔐 Modalità Admin (gestione giocatori)
- 📊 Matchup per Forza
- 🎨 UI moderna con effetto glass
- 📱 Responsive

---

## 🧠 Algoritmo di bilanciamento

Le squadre vengono generate utilizzando:

- Ordinamento per Forza
- Distribuzione alternata (snake draft)
- Minimizzazione differenza forza totale

Obiettivo: rendere la differenza tra le squadre il più bassa possibile.

---

## 🛠️ Tecnologie

- HTML5
- CSS3 (Tailwind-style utilities)
- JavaScript Vanilla
- LocalStorage
- Deploy su Vercel

Nessuna dipendenza esterna o backend.

---

## 📦 Installazione Locale

Clona il repository:

```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
