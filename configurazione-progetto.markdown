---
layout: page
title: Info lavoro di gruppo
permalink: /configurazione-progetto/
---

# Specifiche in arrivo

<!--
## Creazione del file .env


- nella root del progetto React, crea un file `.env`:

  ```env
  VITE_API_BASE_URL=https://api.themoviedb.org/3
  VITE_APP_BEARER_TOKEN=il tuo token // sostituisci con il tuo token
  ```

- aggiungi il file `.env` al tuo `.gitignore` per evitare di caricare la chiave API su repository pubblici;
- crea un file `env.example` nella root del progetto, da committare, per mostrare la struttura del file `.env` senza esporre la chiave API:

  ```env
  VITE_API_BASE_URL=https://api.themoviedb.org/3
  VITE_APP_BEARER_TOKEN=il-tuo-token
  ```

## Utilizzare le variabili d'ambiente nel codice

- per accedere alle variabili d'ambiente nel codice React, utilizza `process.env.NOME_VARIABILE`:

  ```javascript
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const API_KEY = import.meta.env.VITE_APP_BEARER_TOKEN
  ```

⚠️ In React con VITE, tutte le variabili d'ambiente devono essere prefissate con `VITE_` per essere accessibili nel codice.

🕵️ [Env variables in Vite](https://vite.dev/guide/env-and-mode)

## Esempio di chiamate API

```javascript
const ACCESS_TOKEN = import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_APP_BEARER_TOKEN

async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?language=it-IT`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Errore nella chiamata API')
    }

    const data = await response.json()
    return data.results // Array di film
  } catch (error) {
    console.error('Errore:', error)
    throw error
  }
}
```

## Strumenti utili

[Postman](https://www.postman.com/) - per testare le API prima di integrarle nel codice.
[Esempio di Search Bar con React Router](https://codesandbox.io/p/sandbox/searchbar-demo-6lv6rr) - per implementare una barra di ricerca che aggiorna l'URL senza ricaricare la pagina. -->
