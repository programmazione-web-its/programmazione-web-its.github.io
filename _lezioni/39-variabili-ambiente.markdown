---
layout: post
title: "#39. Le variabili d'ambiente in React"
categories: lezioni
excerpt: Configurare l'applicazione React con variabili d'ambiente per gestire le configurazioni in modo sicuro e flessibile.
featured_image:
---

{% capture standardcontent %}

Quando la nostra applicazione comincia a comunicare con il mondo esterno, ad esempio con un'API, ci troviamo a dover gestire dei valori di **configurazione**: l'indirizzo del server, una chiave di accesso, il nome dell'app, un flag per attivare una funzionalità. Scriverli direttamente nel codice funziona, ma crea diversi problemi. Per questo esistono le **variabili d'ambiente**.

## Cosa sono le variabili d'ambiente?

Una variabile d'ambiente è un valore che **non viene scritto nel codice**, ma viene fornito all'applicazione dall'**ambiente** in cui gira: il nostro computer durante lo sviluppo, il server di test, il server di produzione.

In questo modo lo stesso codice può comportarsi in modo diverso a seconda di dove viene eseguito, senza doverlo modificare.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Vite - Env Variables and Modes](https://vite.dev/guide/env-and-mode)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## A cosa servono?

Immaginiamo di lavorare su un'app che recupera dei film da un'API:

```jsx
useEffect(() => {
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=abc123xyz')
    .then((res) => res.json())
    .then((data) => setMovies(data.results))
}, [])
```

Questo codice ha almeno tre problemi:

1. **La chiave è scritta nel codice**: se carichiamo il progetto su GitHub, chiunque può leggerla e usarla al posto nostro;
2. **L'indirizzo è fisso**: durante lo sviluppo potremmo voler usare un server di test, e in produzione quello reale. Con l'URL scritto nel codice dovremmo ricordarci di cambiarlo a mano ogni volta;
3. **Il valore è ripetuto**: se lo stesso URL compare in dieci componenti diversi e un giorno cambia, dobbiamo andare a modificarlo in dieci punti.

Le variabili d'ambiente risolvono tutti e tre i problemi: i valori vengono definiti **una sola volta**, **fuori dal codice**, e possono essere **diversi per ogni ambiente**.

## Il file `.env`

Il modo più comune per definire le variabili d'ambiente in un progetto frontend è il file `.env`, un semplice file di testo che si crea nella **root del progetto** (allo stesso livello di `package.json`, **non** dentro `src`).

```
moviehub/
├── node_modules/
├── public/
├── src/
├── .env          👈 qui
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

Al suo interno scriviamo una variabile per riga, nel formato `NOME=valore`:

```bash
# .env
VITE_API_URL=https://api.themoviedb.org/3
VITE_API_KEY=abc123xyz
VITE_APP_TITLE=MovieHub
```

Alcune regole da ricordare:

- **non** si usano spazi attorno all'`=`;
- le virgolette non servono (a meno che il valore non contenga spazi o caratteri speciali);
- le righe che iniziano con `#` sono commenti;
- per convenzione i nomi si scrivono in **MAIUSCOLO**, con le parole separate da `_`.

{% capture highlight %}

### ☝️ Il prefisso `VITE_`

In un progetto creato con Vite, **solo le variabili che iniziano con `VITE_`** vengono rese disponibili al codice React. Tutte le altre vengono ignorate.

```bash
VITE_API_URL=https://api.themoviedb.org/3   # ✅ accessibile da React
API_URL=https://api.themoviedb.org/3        # ❌ non accessibile
```

Si tratta di una misura di sicurezza: nel file `.env` potrebbero esserci anche valori che servono ad altri strumenti (ad esempio una password del database per un server) e che **non devono assolutamente** finire nel browser. Con il prefisso siamo noi a decidere esplicitamente cosa esporre.

{% endcapture %}
{% include highlight.html content=highlight %}

## Come si recuperano le variabili in React

Con Vite, le variabili d'ambiente si leggono dall'oggetto `import.meta.env`:

```jsx
const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
```

Riprendendo l'esempio iniziale:

```jsx
useEffect(() => {
  fetch(
    `${import.meta.env.VITE_API_URL}/movie/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((res) => res.json())
    .then((data) => setMovies(data.results))
}, [])
```

Per non ripetere `import.meta.env` in tutti i componenti, è buona pratica raccogliere la configurazione in un unico file:

```js
// src/config.js
export const API_URL = import.meta.env.VITE_API_URL
export const API_KEY = import.meta.env.VITE_API_KEY
export const APP_TITLE = import.meta.env.VITE_APP_TITLE
```

```jsx
// src/components/MovieList.jsx
import { API_URL, API_KEY } from '../config'

useEffect(() => {
  fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setMovies(data.results))
}, [])
```

Se un giorno l'API cambia indirizzo, basterà modificare una riga nel file `.env`.

### Le variabili predefinite di Vite

Oltre alle nostre, `import.meta.env` contiene anche alcune variabili che Vite imposta automaticamente:

| Variabile                  | Valore                                                          |
| -------------------------- | --------------------------------------------------------------- |
| `import.meta.env.MODE`     | la modalità in cui gira l'app: `'development'` o `'production'` |
| `import.meta.env.DEV`      | `true` se siamo in sviluppo (`npm run dev`)                     |
| `import.meta.env.PROD`     | `true` se siamo in produzione (`npm run build`)                 |
| `import.meta.env.BASE_URL` | il percorso base da cui viene servita l'app                     |

Sono utili, ad esempio, per mostrare dei messaggi di debug solo durante lo sviluppo:

```jsx
if (import.meta.env.DEV) {
  console.log('Film caricati:', movies)
}
```

### ⚠️ Due cose da sapere

- **Dopo aver modificato il file `.env` bisogna riavviare il server di sviluppo** (`Ctrl + C` e poi di nuovo `npm run dev`): Vite legge il file solo all'avvio;
- **I valori sono sempre stringhe**. Se scriviamo `VITE_MAX_RESULTS=20` o `VITE_DEBUG=true`, in React riceveremo `'20'` e `'true'`, non un numero e un booleano:

```js
const maxResults = Number(import.meta.env.VITE_MAX_RESULTS) // 20
const debug = import.meta.env.VITE_DEBUG === 'true' // true
```

## Un file `.env` per ogni ambiente

Vite supporta diversi file `.env`, che vengono caricati in base alla modalità in cui gira l'app:

| File               | Quando viene caricato                |
| ------------------ | ------------------------------------ |
| `.env`             | sempre                               |
| `.env.local`       | sempre, ma viene ignorato da Git     |
| `.env.development` | solo in sviluppo (`npm run dev`)     |
| `.env.production`  | solo in produzione (`npm run build`) |

Se la stessa variabile è definita in più file, vince quello **più specifico**: ad esempio, un valore in `.env.development` sovrascrive quello in `.env`.

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
```

```bash
# .env.production
VITE_API_URL=https://api.moviehub.it
```

Con questa configurazione, in sviluppo l'app chiamerà il nostro server locale, mentre la versione pubblicata chiamerà il server reale, **senza cambiare una riga di codice**.

## `.env` e Git

Il file `.env` spesso contiene valori che non vogliamo condividere, come chiavi personali. Per questo **non va caricato su GitHub**: aggiungiamolo al file `.gitignore`.

```bash
# .gitignore
.env
.env.local
.env.*.local
```

Ma allora come fa un collega (o noi stessi, su un altro computer) a sapere quali variabili servono al progetto? Per convenzione si crea un file **`.env.example`**, che invece **viene caricato** su Git: contiene gli stessi nomi del `.env`, ma senza i valori reali.

```bash
# .env.example
VITE_API_URL=https://api.themoviedb.org/3
VITE_API_KEY=la-tua-chiave-qui
VITE_APP_TITLE=MovieHub
```

Chi scarica il progetto dovrà solo copiarlo, rinominarlo in `.env` e inserire i propri valori.

{% capture highlight %}

### ⚠️ Attenzione: le variabili `VITE_` non sono segrete!

Le variabili d'ambiente di Vite vengono **sostituite con il loro valore al momento della build**: quando eseguiamo `npm run build`, ogni `import.meta.env.VITE_API_KEY` viene rimpiazzato dalla stringa `'abc123xyz'` direttamente nel file JavaScript che verrà scaricato dal browser.

Questo significa che **chiunque visiti il sito può leggere quei valori**, semplicemente aprendo gli strumenti per sviluppatori (tab _Sources_ o _Network_).

Il file `.env` ci protegge dal pubblicare le chiavi **su GitHub**, ma **non** dal mostrarle agli utenti del sito. Quindi:

- ✅ va bene usare variabili d'ambiente per URL, nomi, flag di configurazione e chiavi **pubbliche** (pensate per essere usate nel browser, come quelle di molti servizi di mappe o di analytics);
- ❌ **non** vanno mai messi nel frontend password, token di accesso a database o chiavi private di servizi a pagamento. Questi valori devono restare su un **server** (backend), che fa da intermediario tra la nostra app React e il servizio esterno: lo vediamo nel prossimo paragrafo.

{% endcapture %}
{% include highlight.html content=highlight %}

## Le variabili d'ambiente come strumento di sicurezza

Quanto detto finora vale per le variabili che **esponiamo al browser**, cioè quelle con il prefisso `VITE_`. Ma le variabili d'ambiente nascono proprio per custodire valori riservati: il punto è **dove vengono lette**.

Una variabile **senza prefisso** non finisce mai nel codice inviato al browser. Resta sulla macchina che esegue il codice, e può essere letta solo da codice che gira **lato server**:

- un **backend** (ad esempio un server Node.js con Express), che legge le variabili da `process.env`;
- le **serverless functions** offerte da servizi come Netlify o Vercel: piccole funzioni che vengono eseguite sul server del servizio di hosting, non nel browser;
- i framework che hanno anche una parte server, come **Next.js**, dove vale la stessa regola con un prefisso diverso: solo le variabili `NEXT_PUBLIC_` arrivano al browser, tutte le altre restano sul server.

L'idea è quella di far passare la richiesta da un **intermediario**: la nostra app React non chiama più direttamente il servizio esterno, ma chiama il nostro server, che aggiunge la chiave segreta e inoltra la richiesta.

```
❌ React ──(con la chiave)──▶ API esterna          la chiave è visibile nel browser

✅ React ──▶ nostro server ──(con la chiave)──▶ API esterna
                  ▲
          legge la chiave da
          process.env: il browser
          non la vede mai
```

In sintesi, la stessa tecnica ha due usi diversi:

| Tipo di variabile | Dove viene letta    | È visibile agli utenti? | Cosa ci mettiamo                  |
| ----------------- | ------------------- | ----------------------- | --------------------------------- |
| `VITE_...`        | nel browser (React) | ✅ sì                   | URL, nomi, flag, chiavi pubbliche |
| senza prefisso    | sul server          | ❌ no                   | password, token, chiavi private   |

## E in produzione?

Il file `.env` non è su GitHub, quindi quando pubblichiamo l'app su un servizio di hosting (come Netlify o Vercel) le variabili non ci sono. Tutti questi servizi mettono a disposizione una sezione **Environment variables** nelle impostazioni del progetto, dove possiamo inserire le stesse variabili (con gli stessi nomi) e i valori di produzione. Al momento della build, Vite le leggerà da lì.

## E con Create React App?

Se ci capita di lavorare su un progetto creato con Create React App, il funzionamento è lo stesso, cambiano solo due dettagli:

|                 | Vite                           | Create React App                |
| --------------- | ------------------------------ | ------------------------------- |
| Prefisso        | `VITE_`                        | `REACT_APP_`                    |
| Come si leggono | `import.meta.env.VITE_API_URL` | `process.env.REACT_APP_API_URL` |

## Riassumendo

- Le variabili d'ambiente servono a **tenere la configurazione fuori dal codice** e a cambiarla in base all'ambiente;
- si definiscono nel file **`.env`**, nella root del progetto;
- con Vite devono iniziare con **`VITE_`** e si leggono da **`import.meta.env`**;
- dopo ogni modifica al `.env` bisogna **riavviare** il server di sviluppo;
- il `.env` va nel **`.gitignore`**, mentre il `.env.example` documenta quali variabili servono;
- le variabili `VITE_` **non sono segrete**: tutto ciò che mettiamo in `import.meta.env` finisce nel browser;
- i valori riservati vanno in variabili **senza prefisso**, lette solo da codice che gira **sul server** (backend o serverless functions).
