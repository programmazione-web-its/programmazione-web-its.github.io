---
layout: page
title: Configurazioni progetto "Netflix"
permalink: /configurazione-progetto/
---

## Creazione del file .env

- nella root del progetto React, crea un file `.env`:

  ```env
  REACT_APP_BASE_URL=https://api.themoviedb.org/3
  REACT_APP_BEARER_TOKEN=il tuo token // sostituisci con il tuo token
  ```

- aggiungi il file `.env` al tuo `.gitignore` per evitare di caricare la chiave API su repository pubblici;
- crea un file `env.example` nella root del progetto, da committare, per mostrare la struttura del file `.env` senza esporre la chiave API:

  ```env
  REACT_APP_BASE_URL=https://api.themoviedb.org/3
  REACT_APP_BEARER_TOKEN=il-tuo-token
  ```

## Utilizzare le variabili d'ambiente nel codice

- per accedere alle variabili d'ambiente nel codice React, utilizza `process.env.NOME_VARIABILE`:

  ```javascript
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const API_KEY = process.env.REACT_APP_BEARER_TOKEN
  ```

⚠️ In React, tutte le variabili d'ambiente devono essere prefissate con `REACT_APP_` per essere accessibili nel codice.

## Esempio di chiamate API

```javascript
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_KEY
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL

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
