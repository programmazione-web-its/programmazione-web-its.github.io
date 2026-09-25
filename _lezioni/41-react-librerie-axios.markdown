---
layout: post
title: '#41. Librerie in React: Axios'
categories: lezioni
excerpt: Usare la libreria Axios per comunicare con le API in modo più semplice e ordinato rispetto a fetch.
featured_image:
---

{% capture standardcontent %}

Finora, per recuperare dati da un'API, abbiamo sempre usato `fetch`, la funzione integrata nel browser. Funziona bene, ma man mano che l'app cresce ci accorgiamo di scrivere sempre lo stesso codice: convertire la risposta in JSON, controllare se ci sono errori, ripetere l'indirizzo del server, aggiungere le intestazioni. **Axios** è una libreria che si occupa di tutto questo al posto nostro.

## Cos'è Axios?

Axios è una libreria JavaScript per fare **richieste HTTP**, cioè per comunicare con un server: leggere dati (`GET`), inviarli (`POST`), modificarli (`PUT` / `PATCH`) o cancellarli (`DELETE`).

Fa esattamente le stesse cose di `fetch`, ma con una sintassi più corta e con alcune funzionalità in più già pronte.

## Come installare Axios

Axios non è incluso in React, va installato nel progetto:

```bash
npm i axios
// oppure
npm install axios
```

E poi importato nei file in cui ci serve:

```jsx
import axios from 'axios'
```

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Axios - Documentazione ufficiale](https://axios-http.com/docs/intro)
  - 👀 [Richieste con Axios](https://axios-http.com/docs/api_intro)
  - 👀 [Gestione degli errori](https://axios-http.com/docs/handling_errors)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## La prima richiesta: `fetch` e Axios a confronto

Riprendiamo il modo in cui abbiamo imparato a recuperare dati con `fetch` e `async/await` dentro `useEffect`:

```jsx
useEffect(() => {
  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error(`Errore ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  getUsers()
}, [])
```

La stessa cosa, con Axios:

```jsx
import axios from 'axios'

useEffect(() => {
  const getUsers = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      setUsers(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  getUsers()
}, [])
```

La struttura è identica (funzione `async` dentro `useEffect`, `try/catch`), ma sono spariti due passaggi:

1. **Non serve `.json()`**: Axios converte automaticamente la risposta e ci mette i dati già pronti in `response.data`;
2. **Non serve controllare `response.ok`**: se il server risponde con un errore (ad esempio `404` o `500`), Axios **lancia un'eccezione** e finiamo direttamente nel `catch`.

{% capture highlight %}

### ☝️ Perché il controllo su `response.ok` è così importante?

Con `fetch`, una risposta `404` (risorsa non trovata) o `500` (errore del server) **non** è considerata un errore: la promessa viene risolta normalmente e il codice prosegue come se fosse andato tutto bene. `fetch` finisce nel `catch` solo se la richiesta non riesce proprio a partire, ad esempio perché manca la connessione.

Per questo con `fetch` dobbiamo sempre ricordarci di controllare `response.ok` a mano. Con Axios, invece, **ogni risposta con uno status diverso da 2xx finisce nel `catch`**, che è quello che ci aspetteremmo.

{% endcapture %}
{% include highlight.html content=highlight %}

## Cosa contiene la risposta

L'oggetto restituito da Axios non contiene solo i dati, ma anche altre informazioni sulla risposta:

```jsx
const response = await axios.get('https://jsonplaceholder.typicode.com/users')

console.log(response.data) // i dati veri e propri (già convertiti da JSON)
console.log(response.status) // il codice di stato, es. 200
console.log(response.headers) // le intestazioni della risposta
```

Nella maggior parte dei casi ci serve solo `data`, quindi è comune usare la destrutturazione:

```jsx
const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
setUsers(data)
```

## Gestire gli errori

Quando qualcosa va storto, Axios ci passa nel `catch` un oggetto errore che contiene informazioni utili per capire **cosa** è successo:

```jsx
try {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users/999',
  )
  setUser(data)
} catch (error) {
  if (error.response) {
    // il server ha risposto, ma con uno status di errore (4xx, 5xx)
    console.log(error.response.status) // es. 404
    console.log(error.response.data) // l'eventuale messaggio del server
  } else if (error.request) {
    // la richiesta è partita, ma non è arrivata nessuna risposta (server spento, niente connessione)
    console.log('Il server non risponde')
  } else {
    // qualcosa è andato storto prima ancora di inviare la richiesta
    console.log(error.message)
  }
}
```

In questo modo possiamo mostrare all'utente messaggi diversi a seconda del problema, ad esempio "Utente non trovato" per un `404` e "Controlla la connessione" se il server non risponde.

Mettiamo tutto insieme in un componente, con la gestione del caricamento e degli errori:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        )
        setUsers(data)
      } catch (error) {
        setError('Impossibile caricare gli utenti')
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  if (loading) return <p>Caricamento...</p>
  if (error) return <p>{error}</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

☝️ Il blocco `finally` viene eseguito **sempre**, sia dopo il `try` che dopo il `catch`: è il posto giusto per rimettere `loading` a `false`.

## I parametri nell'URL

Spesso dobbiamo aggiungere dei **parametri** all'indirizzo, ad esempio per filtrare i risultati: `.../posts?userId=1&_limit=5`. Con `fetch` dobbiamo costruire la stringa a mano; con Axios possiamo passarli come oggetto, nell'opzione `params`:

```jsx
const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
  params: {
    userId: 1,
    _limit: 5,
  },
})
// Axios chiamerà: https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5
```

È più leggibile e Axios si occupa anche di codificare correttamente i caratteri speciali (spazi, accenti, `&`…), cosa che costruendo la stringa a mano è facile dimenticare.

## Inviare dati: POST, PUT, PATCH e DELETE

Axios ha un metodo per ogni tipo di richiesta HTTP:

| Metodo                   | A cosa serve                         |
| ------------------------ | ------------------------------------ |
| `axios.get(url)`         | leggere dati                         |
| `axios.post(url, dati)`  | creare una nuova risorsa             |
| `axios.put(url, dati)`   | sostituire completamente una risorsa |
| `axios.patch(url, dati)` | modificare solo alcuni campi         |
| `axios.delete(url)`      | eliminare una risorsa                |

Per inviare dati al server, con `fetch` dobbiamo specificare il metodo, le intestazioni e convertire noi l'oggetto in JSON:

```jsx
// con fetch
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Nuovo post', body: 'Contenuto', userId: 1 }),
})
const data = await response.json()
```

Con Axios basta passare l'oggetto come secondo argomento: la conversione in JSON e l'intestazione `Content-Type` vengono aggiunte in automatico.

```jsx
// con Axios
const { data } = await axios.post(
  'https://jsonplaceholder.typicode.com/posts',
  {
    title: 'Nuovo post',
    body: 'Contenuto',
    userId: 1,
  },
)
```

Ad esempio, per inviare i dati di un form:

```jsx
function NewPostForm() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title,
          userId: 1,
        },
      )
      setMessage(`Post creato con id ${data.id}`)
      setTitle('')
    } catch (error) {
      setMessage('Errore durante il salvataggio')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type='submit'>Salva</button>
      {message && <p>{message}</p>}
    </form>
  )
}
```

☝️ Nota che qui la chiamata **non** è dentro `useEffect`: la richiesta parte in risposta a un **evento** (il submit del form), quindi va nel gestore dell'evento.

## Creare un'istanza: configurare Axios una volta sola

In un'app reale tutte le chiamate vanno quasi sempre allo **stesso server**, spesso con la stessa chiave o le stesse intestazioni. Invece di ripetere queste informazioni in ogni componente, possiamo creare un'**istanza** di Axios già configurata, con `axios.create()`.

Riprendendo quanto visto nella lezione sulle variabili d'ambiente:

```js
// src/api/client.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // dopo 5 secondi senza risposta, la richiesta viene considerata fallita
  params: {
    api_key: import.meta.env.VITE_API_KEY, // aggiunto automaticamente a ogni richiesta
  },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`, // aggiunto automaticamente a ogni richiesta
  },
})

export default api
```

Ora, nei componenti, importiamo `api` al posto di `axios` e scriviamo solo la parte finale dell'indirizzo:

```jsx
import api from '../api/client'

const { data } = await api.get('/movie/popular')
// chiamerà: VITE_API_URL + /movie/popular?api_key=VITE_API_KEY
```

Se un giorno cambia l'indirizzo del server o la chiave, dobbiamo modificare **un solo file**.

Possiamo fare un passo in più e raccogliere nello stesso posto anche le singole chiamate, in modo che i componenti non debbano nemmeno conoscere gli indirizzi:

```js
// src/api/movies.js
import api from './client'

export const getPopularMovies = async () => {
  const { data } = await api.get('/movie/popular')
  return data.results
}

export const getMovieById = async (id) => {
  const { data } = await api.get(`/movie/${id}`)
  return data
}
```

```jsx
// src/pages/HomePage.jsx
import { getPopularMovies } from '../api/movies'

useEffect(() => {
  const loadMovies = async () => {
    const movies = await getPopularMovies()
    setMovies(movies)
  }
  loadMovies()
}, [])
```

{% capture highlight %}

### ☝️ Gli interceptor

Un'istanza di Axios può avere degli **interceptor**: funzioni che vengono eseguite automaticamente **prima di ogni richiesta** o **dopo ogni risposta**. Sono utili quando c'è qualcosa da fare per tutte le chiamate, ad esempio aggiungere il token dell'utente loggato o gestire in un unico punto un certo tipo di errore.

```js
// prima di ogni richiesta: aggiungiamo il token, se c'è
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// dopo ogni risposta: se il server risponde 401 (non autorizzato), rimandiamo al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
```

Non è necessario usarli da subito, ma è bene sapere che esistono: in molti progetti professionali li troverete nel file di configurazione di Axios.

{% endcapture %}
{% include highlight.html content=highlight %}

## Annullare una richiesta

Nella lezione sui custom hooks abbiamo visto che, se l'utente cambia pagina o selezione velocemente, una risposta "vecchia" potrebbe arrivare in ritardo e sovrascrivere quella nuova. Con Axios possiamo **annullare** la richiesta nella funzione di cleanup di `useEffect`, usando un `AbortController`, esattamente come si fa con `fetch`:

```jsx
useEffect(() => {
  const controller = new AbortController()

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: { userId },
          signal: controller.signal,
        },
      )
      setPosts(data)
    } catch (error) {
      if (axios.isCancel(error)) return // richiesta annullata da noi: non è un vero errore
      setError('Impossibile caricare i post')
    }
  }

  getPosts()

  return () => controller.abort() // annulla la richiesta se userId cambia o il componente viene smontato
}, [userId])
```

## Quindi, meglio `fetch` o Axios?

Non c'è una risposta giusta in assoluto: `fetch` è integrato nel browser e non richiede di installare nulla, Axios è una dipendenza in più ma fa risparmiare parecchio codice ripetitivo. In molti progetti professionali si usa Axios proprio per la possibilità di configurarlo una volta sola.

|                            | `fetch`                                        | Axios                          |
| -------------------------- | ---------------------------------------------- | ------------------------------ |
| Installazione              | non serve, è integrato nel browser             | `npm i axios`                  |
| Conversione della risposta | a mano, con `await response.json()`            | automatica, in `response.data` |
| Errori HTTP (404, 500…)    | non finiscono nel `catch`: serve `response.ok` | finiscono nel `catch`          |
| Invio di dati JSON         | `JSON.stringify` + `Content-Type` a mano       | basta passare l'oggetto        |
| Parametri nell'URL         | stringa costruita a mano                       | opzione `params`               |
| Configurazione condivisa   | va scritta da noi                              | `axios.create()` e interceptor |

La cosa importante è capire che **fanno la stessa cosa**: se sappiamo usare `fetch`, sappiamo già usare Axios, e viceversa.

## Riassumendo

- Axios è una libreria per fare **richieste HTTP**, alternativa a `fetch`; si installa con `npm i axios`;
- i dati della risposta si trovano già convertiti in **`response.data`**;
- le risposte con status di errore (4xx, 5xx) **finiscono direttamente nel `catch`**, senza bisogno di controllare `response.ok`;
- esiste un metodo per ogni tipo di richiesta: `get`, `post`, `put`, `patch`, `delete`; per inviare dati basta passare l'oggetto come secondo argomento;
- i parametri dell'URL si passano con l'opzione **`params`**;
- con **`axios.create()`** possiamo creare un'istanza configurata una volta sola (indirizzo base, chiave, timeout), da usare in tutta l'app insieme alle variabili d'ambiente;
- le richieste si possono **annullare** con un `AbortController`, nella funzione di cleanup di `useEffect`.

## 💪 Esercizi

Negli esercizi che seguono troverai del codice scritto con `fetch`: il tuo compito è **convertirlo in Axios**, senza cambiare il comportamento dell'app. Tutti gli esercizi usano [DummyJSON](https://dummyjson.com/docs/products), un'API gratuita che non richiede registrazione. Prima di iniziare, installa Axios nel progetto con `npm i axios`.

{% capture esercizio1 %}

## 💪 1. La prima conversione (livello: facile)

Il componente `ProductList` recupera un elenco di prodotti e li mostra in una lista:

```jsx
import { useState, useEffect } from 'react'

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore ' + response.status)
        }
        return response.json()
      })
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error))
  }, [])

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} - {product.price} €
        </li>
      ))}
    </ul>
  )
}

export default ProductList
```

- Converti la chiamata in Axios, usando la sintassi **`async/await`** al posto di `.then()`;
- Elimina tutto il codice che con Axios non serve più;
- Aggiungi due stati, `loading` ed `error`: mostra "Caricamento..." durante l'attesa e un messaggio di errore se la richiesta fallisce. Usa il blocco `finally` per rimettere `loading` a `false`;
- Verifica che la gestione degli errori funzioni modificando apposta l'URL (ad esempio `/prodotti` al posto di `/products`).

{% endcapture %}
{% include exercise_box.html content=esercizio1 %}

{% capture esercizio2 %}

## 💪 2. Parametri e messaggi di errore (livello: facile/medio)

Il componente `ProductSearch` cerca i prodotti in base a quello che l'utente scrive nell'input, mentre `ProductDetail` mostra il dettaglio di un prodotto dato il suo `id`:

```jsx
function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return

    const search = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          query,
        )}&limit=5&select=title,price`,
      )
      const data = await response.json()
      setResults(data.products)
    }

    search()
  }, [query])

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  )
}
```

```jsx
function ProductDetail({ id }) {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        setProduct(data)
      } catch {
        setError('Si è verificato un errore')
      }
    }

    getProduct()
  }, [id])

  if (error) return <p>{error}</p>
  if (!product) return <p>Caricamento...</p>

  return <h2>{product.title}</h2>
}
```

- Converti `ProductSearch` in Axios, passando i parametri della ricerca con l'opzione **`params`** invece di costruire l'URL a mano. Serve ancora `encodeURIComponent`?
- Converti `ProductDetail` in Axios;
- In `ProductDetail`, migliora la gestione degli errori mostrando messaggi diversi a seconda di cosa è successo: "Prodotto non trovato" se il server risponde con `404`, "Il server non risponde" se non arriva nessuna risposta, "Si è verificato un errore" negli altri casi;
- Prova il componente con un `id` che non esiste (ad esempio `9999`) e poi staccando la connessione (dagli strumenti per sviluppatori, tab _Network_ → _Offline_).

{% endcapture %}
{% include exercise_box.html content=esercizio2 %}

{% capture esercizio3 %}

## 💪 3. Creare, modificare, eliminare (livello: medio)

Il componente `ProductManager` permette di aggiungere un prodotto tramite un form, di modificarne il prezzo e di eliminarlo. Ecco le tre funzioni che si occupano delle chiamate:

```jsx
const addProduct = async (e) => {
  e.preventDefault()
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price: Number(price) }),
  })
  const newProduct = await response.json()
  setProducts((prev) => [...prev, newProduct])
}

const updatePrice = async (id, newPrice) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: newPrice }),
  })
  const updated = await response.json()
  setProducts((prev) =>
    prev.map((p) => (p.id === id ? { ...p, price: updated.price } : p)),
  )
}

const deleteProduct = async (id) => {
  await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
  setProducts((prev) => prev.filter((p) => p.id !== id))
}
```

- Costruisci il componente `ProductManager`: all'avvio carica 5 prodotti (con Axios, come nell'esercizio 1), mostra un form controllato con i campi `title` e `price`, e per ogni prodotto due pulsanti "Sconto 10%" ed "Elimina";
- Converti le tre funzioni in Axios, usando il metodo giusto per ogni operazione: cosa succede a `method`, `headers` e `JSON.stringify`?
- Aggiungi un `try/catch` a ogni funzione e mostra all'utente un messaggio in caso di errore;
- Rifletti: queste chiamate vanno dentro `useEffect`? Perché?

⚠️ DummyJSON **simula** le operazioni di scrittura: risponde come se il prodotto fosse stato creato, modificato o eliminato, ma non salva nulla sul server. Per questo aggiorniamo lo stato locale con i dati ricevuti nella risposta.

{% endcapture %}
{% include exercise_box.html content=esercizio3 %}

{% capture esercizio4 %}

## 💪 4. Un'istanza per tutta l'app (livello: difficile)

Ora che tutti i componenti usano Axios, l'indirizzo `https://dummyjson.com` è ripetuto ovunque. Riorganizza il codice degli esercizi precedenti:

- Aggiungi nel file `.env` la variabile `VITE_API_URL=https://dummyjson.com` e crea il file `src/api/client.js`, con un'istanza di Axios creata con `axios.create()` che usi questa variabile come `baseURL` e abbia un `timeout` di 5 secondi;
- Crea il file `src/api/products.js` e sposta al suo interno tutte le chiamate come funzioni esportate: `getProducts(limit)`, `searchProducts(query)`, `getProductById(id)`, `addProduct(product)`, `updateProduct(id, data)`, `deleteProduct(id)`. Ogni funzione deve restituire direttamente i dati, non l'intera risposta;
- Modifica i componenti in modo che importino queste funzioni: **nessun componente** deve più importare `axios` né contenere un URL;

{% endcapture %}
{% include exercise_box.html content=esercizio4 %}
