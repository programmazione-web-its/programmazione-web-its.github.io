---
layout: post
title: '💡 Rimettiamo in ordine le idee prima di ricominciare'
categories: lezioni
excerpt: Ripasso generale di quanto visto fin qui, prima di ripartire con nuovi argomenti
featured_image:
---

Prima di andare avanti con nuovi argomenti, facciamo un passo indietro e ripercorriamo insieme tutto quello che abbiamo visto fin qui: dalle basi di React fino al routing con React Router.

## 1. Cos'è React

React è una **libreria\* JavaScript dichiarativa** per costruire interfacce utente: invece di descrivere passo passo come aggiornare il DOM (approccio imperativo, tipico di Vanilla JS), con React descriviamo **come deve apparire l'interfaccia in un dato stato**, e React si occupa di aggiornare il DOM per noi.

Per farlo, React mantiene una copia leggera dell'interfaccia in memoria, il **Virtual DOM**: confronta la versione nuova con quella precedente (_diffing_) e applica al DOM reale solo le modifiche minime necessarie, per motivi di performance.

\*React è definita una **libreria** e non un **framework** perché si occupa solo della UI lasciando a noi la libertà di scegliere come gestire routing, chiamate HTTP, gestione dello stato globale, ecc. (magari integrando altre librerie, come React Router).
Un framework, al contrario, fornisce una struttura più completa e vincolante, con scelte già prese su questi aspetti (ad esempio Flutter, Angular o per rimanere in ambiente React, Next.js).

## 2. Componenti e JSX

L'unità di base di ogni app React è il **componente**: una funzione JavaScript, con il nome in **PascalCase**, che restituisce del JSX.

```jsx
function MyComponent() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  )
}
export default MyComponent
```

Combinando componenti dentro altri componenti si costruisce il **Component Tree**, che React trasforma e inietta nel DOM reale a partire dal file di ingresso dell'app (es. `index.jsx`, tramite `createRoot()` e `render(<App />)`).

## 3. Rendere dinamico il contenuto

Un componente può ricevere dati dall'esterno tramite le **props** e mostrarli in JSX usando le parentesi graffe `{}` per inserire espressioni JavaScript:

```jsx
function TodoList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  )
}
```

Lo stesso vale per gli **attributi HTML**, comprese le immagini: qualsiasi valore dinamico va tra `{}`, mai tra virgolette. Le immagini, in particolare, vanno **importate come moduli** (`import MyImage from './img.jpg'`) così da essere gestite correttamente dal processo di build.

Una prop speciale è **`children`**: il contenuto racchiuso tra i tag di apertura e chiusura di un componente (`<MyComponent>...</MyComponent>`), utile per creare contenitori riutilizzabili (layout, modali, bottoni) ai quali non serve sapere in anticipo cosa mostreranno al loro interno.

Altri pattern utili per rendere i componenti flessibili:

- **Rest/spread delle props**, per inoltrare props "extra" a un elemento figlio: `function Container({ children, ...props }) { return <div {...props}>{children}</div> }`;
- **Default props**, assegnati direttamente in fase di destrutturazione: `function List({ tag = 'ul', children })`;
- **Tag dinamici**, tramite una variabile con iniziale maiuscola: `const Tag = tag; return <Tag>{children}</Tag>`.

## 4. Stili in React

{% raw %}
Per applicare classi CSS si usa **`className`** al posto di `class` (parola riservata in JS). Per gli stili inline, l'attributo `style` accetta un **oggetto JavaScript** con proprietà in camelCase: `style={{ backgroundColor: 'red', fontSize: 16 }}`.

| Metodo                                  | Quando usarlo                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `className="nome-classe"`               | Stili statici, definiti in un file CSS esterno                                      |
| `` className={`classe ${variabile}`} `` | Classi costruite dinamicamente in base a stato/props                                |
| `style={{ proprietà: valore }}`         | Valori di stile calcolati/dinamici in JavaScript                                    |
| CSS Modules (`.module.css`)             | Classi "scoperte" al componente, per evitare conflitti di nomi tra file CSS diversi |

{% endraw %}

## 5. Rendering delle liste

Per trasformare un array di dati in elementi JSX si usa **`array.map()`**, un metodo nativo degli array di JavaScript (non è specifico di React) che per ogni elemento dell'array esegue la funzione che gli passiamo e restituisce un **nuovo array** con i risultati, lasciando invariato l'array di partenza.

Bisogna ricordarsi di assegnare sempre una **`key`** univoca a ogni elemento (usata internamente da React, non leggibile come prop).

## 6. Rendering condizionale

Per mostrare contenuto **in base ad una condizione**, esistono tre pattern principali:

- **Ternario**: `condizione ? <A /> : <B />` → mostra A se la condizione è vera, altrimenti B;
- **&&**: `condizione && <A />` → mostra A solo se la condizione è vera, altrimenti non mostra nulla;
- **Funzione di rendering**: `function renderSomething() { if (...) return <A />; else return <B />; }` → utile quando il markup diventa complesso.

```jsx
{
  isLoggedIn ? <Dashboard /> : <Login />
} // ternario: scelta tra due elementi

{
  isAdmin && <AdminPanel />
} // && : mostra l'elemento solo se la condizione è vera

function renderStatus() {
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <ErrorMessage />
  return <Content />
} // funzione di rendering: utile quando le condizioni sono più di due o la logica è complessa

function MyComponent() {
  return <div>{renderStatus()}</div> // la funzione viene chiamata dentro il JSX
}
```

## 7. Fragment

Quando serve restituire **più elementi affiancati senza aggiungere un div inutile** al DOM, si usa **`Fragment`** (`<>...</>`, oppure `<Fragment key={...}>` per esteso quando serve la prop `key` dentro una `.map()`).

## 8. Eventi e interattività

Gli eventi in React si gestiscono tramite props native come `onClick`, `onChange`, `onFocus`, passando **una funzione**, mai il risultato di una chiamata a funzione:

```jsx
<button onClick={handleClick}>Clicca</button> // ✅
<button onClick={handleClick()}>Clicca</button> // ❌ viene eseguita subito, non al click
```

Le funzioni che gestiscono eventi possono essere passate anche come **props**, in modo che un componente non conosca i dettagli di cosa succede al click ma si limiti a eseguire la funzione ricevuta dall'esterno. Per passare argomenti a queste funzioni si usa una funzione anonima: `onClick={() => handleDelete(item.id)}`.

## 9. Stato: `useState`

Le variabili "normali" non causano un nuovo render se cambiano: per dati che devono aggiornare l'interfaccia serve lo **stato**, gestito con l'hook `useState`:

```jsx
const [count, setCount] = useState(0)
```

Alcuni punti chiave:

- l'aggiornamento dello stato **non è immediato**: il nuovo valore è disponibile solo al render successivo;
- quando il nuovo valore dipende dal precedente si usa la **forma funzionale**: `setCount((prev) => prev + 1)`;
- lo stato va trattato in modo **immutabile**: mai mutare direttamente un array/oggetto (`items.push(...)` ❌), ma creare sempre una nuova copia (`setItems((prev) => [...prev, newItem])` ✅);
- se un valore può essere **calcolato** a partire da altro stato, è preferibile derivarlo al momento del render (_derived state_, es. `const completedCount = tasks.filter(t => t.completed).length`) invece di mantenerlo come stato separato, per evitare incoerenze.

## 10. Condividere lo stato tra componenti

Quando più componenti hanno bisogno dello stesso stato, si sposta lo stato nel **genitore comune più vicino** e lo si passa in basso via props: è la tecnica della **elevazione dello stato** (_lifting state up_), che garantisce un'unica fonte di verità. Il componente figlio comunica verso l'alto tramite una funzione ricevuta come prop (pattern a callback), ad esempio `onComplete(task.id)`.

Quando le props devono attraversare molti livelli di componenti che non le usano direttamente, si parla di **prop drilling**. Per evitarlo, oltre a una migliore composizione dei componenti, si può usare la **Context API**:

```jsx
const CartContext = createContext()

function CartContextProvider({ children }) {
  const [items, setItems] = useState([])
  const contextValue = {
    items,
    addItemToCart: (item) => setItems((prev) => [...prev, item]),
  }
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
```

Qualsiasi componente figlio può poi leggere il context con `useContext(CartContext)`, senza bisogno di passare le props manualmente ad ogni livello. Incapsulare stato e logica in un componente Provider dedicato (come sopra) tiene pulito il componente principale dell'app.

## 11. Organizzare i componenti

Man mano che un progetto cresce, conviene dividerlo in componenti seguendo un metodo:

1. identificare le parti di UI ripetute o isolabili;
2. separare componenti **container** (logica/stato) da componenti **presentazionali** (solo UI);
3. decidere la giusta granularità;
4. renderli configurabili con props, default props e props forwarding;
5. organizzare le cartelle (per funzionalità, per tipo, o in modo combinato).

Un riferimento utile è l'**Atomic Design**: Atomi → Molecole → Organismi → Template → Pagine. Non tutto, però, deve diventare per forza un componente React: markup statico che non dipende da props o stato può restare fuori.

## 12. `useRef`

`useRef(initialValue)` crea un riferimento **mutabile** che, a differenza dello stato, **non causa un nuovo render** quando cambia. Si legge/scrive tramite `.current` ed è usato tipicamente per accedere direttamente a un nodo del DOM (`inputRef.current.focus()`), tramite l'attributo `ref`.

## 13. `useEffect` e le operazioni asincrone

Per gestire **side effect** (fetch di dati, `localStorage`, timer, sottoscrizioni) che non fanno parte diretta del rendering, si usa `useEffect`:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(id) // cleanup, per evitare memory leak
}, []) // array delle dipendenze: [] = solo al mount
```

- array vuoto `[]` → l'effetto viene eseguito solo al primo render;
- array con variabili → l'effetto viene rieseguito quando quelle variabili cambiano;
- nessun array → l'effetto viene eseguito a ogni render.

La callback di `useEffect` **non può essere `async` direttamente** (deve restituire `undefined` o una funzione di cleanup, mai una Promise): la soluzione è definire una funzione `async` interna e richiamarla subito, con `try/catch` per gli errori.

## 14. Il routing con React Router

Le applicazioni React sono tipicamente **Single Page Application (SPA)**: un solo caricamento iniziale, poi è il JavaScript nel browser a osservare l'URL e mostrare componenti diversi senza reload (a differenza delle Multi-Page Application, dove è il server a gestire ogni cambio pagina).

I mattoncini principali di **React Router 6**:

```jsx
const routes = createBrowserRouter([
  { path: '/', Component: Home },
  {
    path: '/shop',
    Component: ShopLayout, // layout condiviso, con <Outlet />
    children: [
      { index: true, Component: ShopHome },
      { path: 'products/:productId', Component: ProductDetail }, // route dinamica
    ],
  },
  { path: '*', Component: NotFound }, // wildcard, sempre per ultima
])

export default function App() {
  return <RouterProvider router={routes} />
}
```

- `<Link to="...">` (e `<NavLink>`, con stile automatico per il link attivo) per navigare senza reload della pagina;
- `<Outlet />` nel componente "layout" per indicare dove va renderizzata la route figlia attiva (nested routes);
- `useParams()` per leggere i parametri dinamici dall'URL (es. `productId`);
- `useNavigate()` per la **navigazione programmatica** (dopo un submit, un timer, ecc.), con opzioni come `{ replace: true }` o `{ state: {...} }`;
- `useLocation()` per leggere informazioni sulla route corrente (`pathname`, `search`, `hash`, `state`), utile ad esempio per leggere la query string o reagire ai cambi di route con `useEffect`;
- una route con `path: '*'` come **ultima** voce dell'array, per catturare qualsiasi URL non riconosciuto e mostrare una pagina 404.

## 📋 Riepilogo hook

Hook nativi di React:

| Hook         | A cosa serve                                                          |
| ------------ | --------------------------------------------------------------------- |
| `useState`   | gestire dati che, cambiando, devono aggiornare l'interfaccia          |
| `useEffect`  | eseguire side effect (fetch, timer, subscription) fuori dal rendering |
| `useRef`     | riferimento mutabile che non causa re-render, o accesso al DOM        |
| `useContext` | leggere un valore condiviso tramite Context API, senza prop drilling  |

Hook forniti da React Router:

| Hook          | A cosa serve                                   |
| ------------- | ---------------------------------------------- |
| `useParams`   | leggere i parametri dinamici dell'URL corrente |
| `useNavigate` | navigare tra le route via codice               |
| `useLocation` | leggere informazioni sulla route corrente      |

{% capture highlight %}
☝️ Se qualcuno di questi argomenti non ti è chiaro, è il momento giusto per tornare indietro e rivedere la lezione corrispondente: da qui in poi tutto quello che vedremo si costruisce su queste basi.
{% endcapture %}
{% include highlight.html content=highlight %}

## 💪 Esercizi di ripasso

Gli esercizi che seguono sono pensati per essere svolti **in ordine**: costruiscono via via la stessa mini-app, un catalogo di film ("MovieHub"), e ogni esercizio riprende gli argomenti di quello precedente aggiungendone di nuovi. La difficoltà cresce progressivamente, dall'esercizio 1 (componenti e props) fino all'8 (routing completo).

{% capture esercizio1 %}

## 💪 1. I primi componenti (livello: facile)

Crea un nuovo progetto React chiamato `moviehub` e imposta le basi del catalogo:

- Crea un componente `MovieCard` che riceve tramite props `title`, `year` e `poster` (url di un'immagine) e li mostra dentro un `<article>`;
- Crea un componente `Container` che accetta `children` e li racchiude in un `<div className="container">`, da usare come layout generale della pagina;
- In `App.jsx`, dentro `Container`, inserisci "a mano" 3-4 `<MovieCard />` con dati diversi (titolo, anno, poster);
- Applica uno stile di base al progetto (una classe CSS per la card, con `className`, assegna uno stile al container).

{% endcapture %}
{% include exercise_box.html content=esercizio1 %}

{% capture esercizio2 %}

## 💪 2. Dati dinamici e liste (livello: facile)

Sostituisci i dati "a mano" con un elenco dinamico:

- Sposta i dati dei film in un array di oggetti `movies` (in un file separato, es. `data/movies.js`), ognuno con `id`, `title`, `year`, `poster`, `genre` e `watched` (booleano);
- Crea un componente `MovieList` che riceve `movies` come prop e genera un `<MovieCard>` per ogni film con `.map()`, ricordando la prop `key`;
- In `MovieCard`, mostra condizionalmente una scritta "✅ Visto" oppure "👀 Da vedere" in base alla prop `watched`, usando l'operatore ternario;
- Aggiungi anche un badge con il genere, mostrato solo se il film ha effettivamente un genere impostato (operatore `&&`).

{% endcapture %}
{% include exercise_box.html content=esercizio2 %}

{% capture esercizio3 %}

## 💪 3. Stato ed eventi (livello: medio)

Rendi il catalogo interattivo:

- Sposta l'array `movies` nello stato di `App` con `useState`;
- Aggiungi in `MovieCard` un pulsante "★ Preferito" che, al click, deve aggiornare lo stato dei film segnando quel film come preferito (`favorite: true/false`);
- La funzione che gestisce il click va definita in `App` (dove vive lo stato) e passata a `MovieCard` come prop (funzione come prop), che la richiama passando l'`id` del film cliccato;
- **Non mutare mai l'array direttamente**: usa `setMovies` con la forma funzionale e `.map()` per creare una nuova copia dell'array con il film aggiornato;
- Applica una classe CSS diversa (es. `movie-card--favorite`) alle card dei film preferiti, tramite classe dinamica.

{% endcapture %}
{% include exercise_box.html content=esercizio3 %}

{% capture esercizio4 %}

## 💪 4. Form, filtri e stato derivato (livello: medio)

Aggiungi la ricerca e qualche informazione riassuntiva:

- Crea un componente `SearchBar` con un `<input>` **controllato** (`value` + `onChange`) per cercare i film per titolo;
- Lo stato della ricerca (`searchTerm`) deve vivere in `App` (elevazione dello stato): `SearchBar` riceve il valore e la funzione di aggiornamento come props;
- Filtra l'array che contiene i film in base a `searchTerm` **senza** creare un nuovo stato: calcola l'elenco filtrato come **stato derivato** ad ogni render (es. `const filteredMovies = movies.filter(...)`) e passalo a `MovieList`;
- Aggiungi un contatore, sempre come valore derivato, che mostra quanti film preferiti ci sono in totale (es. `"⭐ 3 preferiti"`).

{% endcapture %}
{% include exercise_box.html content=esercizio4 %}

{% capture esercizio5 %}

## 💪 5. `useRef` e `useEffect` (livello: medio/difficile)

Migliora l'esperienza d'uso e rendi persistenti i dati:

- Usa `useRef` per dare il focus automatico al campo di ricerca appena la pagina viene caricata (al mount del componente);
- Usa `useEffect` per salvare l'array `movies` in `localStorage` ogni volta che cambia (dipendenza `[movies]`), così i preferiti e i film segnati come "visti" non si perdono ricaricando la pagina;
- Sempre con `useEffect` (solo al mount, `[]`), leggi i dati da `localStorage` se presenti e usali come stato iniziale al posto dei dati di esempio; (👀 Attenzione qui: l'IDE segnala qualche errore?)

{% endcapture %}
{% include exercise_box.html content=esercizio5 %}

{% capture esercizio6 %}

## 💪 6. Context API e Provider pattern (livello: difficile)

L'app sta crescendo e passare la lista dei film e i preferiti e le relative funzioni attraverso più livelli di componenti sta diventando scomodo (prop drilling): risolvilo con la Context API.

- Crea un `MoviesContext` con `createContext()`;
- Crea un componente `MoviesContextProvider` che incapsula lo stato dei film (comprese le funzioni per aggiungere ai preferiti e segnare come "visto") e lo espone tramite `value`;
- Avvolgi `App` con `<MoviesContextProvider>` (in `index.jsx` o dentro `App.jsx`, a scelta);
- Rimuovi il prop drilling: `MovieCard` e gli altri componenti che ne hanno bisogno devono leggere dati e funzioni con `useContext(MoviesContext)`, invece di riceverli tramite props passate da `App` attraverso `MovieList`.

{% endcapture %}
{% include exercise_box.html content=esercizio6 %}

{% capture esercizio7 %}

## 💪 7. Dati da un'API con `async`/`await` (livello: difficile)

Sostituisci i dati statici con dati reali presi dall'API pubblica [The Movie Database](https://developer.themoviedb.org/reference/getting-started)

- Nel `MoviesContextProvider`, usa `useEffect` per effettuare una chiamata `fetch` all'API quando il componente viene montato;
- Poiché la callback di `useEffect` non può essere `async` direttamente, definisci una funzione `async` interna e richiamala subito, gestendo gli errori con `try/catch`;
- Aggiungi due stati, `isLoading` ed `error`, e mostra un messaggio di caricamento oppure un messaggio di errore in base al loro valore;
- Solo quando i dati sono arrivati correttamente, mostra `MovieList` con i film ricevuti dall'API.

La chiave API è

```js
jseyJhbGciOiJIUzI1NiJ9
  .eyJhdWQiOiJkZDU1M2VmZWMwNzRjOGJjZGM2YzFlMDJmODZjZTgwNSIsIm5iZiI6MTc0ODY4NDg0OC4xNjIsInN1YiI6IjY4M2FkMDMwZGFhNzJmZmMzN2ZkYTlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
  .q2YnB5D7gwHFSwZ9z2M66q308tt - Y1r97CGjw9cGOhU
```

Le fetch vanno autenticate con un header `Authorization: Bearer <API_KEY>`, ad esempio

```js
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDU1M2VmZWMwNzRjOGJjZGM2YzFlMDJmODZjZTgwNSIsIm5iZiI6MTc0ODY4NDg0OC4xNjIsInN1YiI6IjY4M2FkMDMwZGFhNzJmZmMzN2ZkYTlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q2YnB5D7gwHFSwZ9z2M66q308tt-Y1r97CGjw9cGOhU',
  },
}

fetch('https://api.themoviedb.org/3/authentication', options)
  ...
```

Potete usare i seguenti endpoint per testare la fetch:

- Lista dei film più popolari: `https://api.themoviedb.org/3/movie/popular`;
- Lista delle serie più popolari: `https://api.themoviedb.org/3/tv/popular`;
- Lista dei film in uscita: `https://api.themoviedb.org/3/movie/upcoming`;
- Lista delle serie in uscita: `https://api.themoviedb.org/3/tv/on_the_air`.
- Lista dei film top rated: `https://api.themoviedb.org/3/movie/top_rated`;
- Lista delle serie top rated: `https://api.themoviedb.org/3/tv/top_rated`.

Per recuperare la locandina del film, l'API restituisce solo il nome del file (es. `poster_path: "/path/to/poster.jpg"`): per ottenere l'URL completo bisogna concatenarlo a un prefisso, ad esempio `https://image.tmdb.org/t/p/w500` per avere un'immagine larga 500px. Esempio completo di un url:   

{% endcapture %}
{% include exercise_box.html content=esercizio7 %}

{% capture esercizio8 %}

## 💪 8. Routing completo con React Router (livello: 🔥🔥🔥 )

Trasforma MovieHub in una vera SPA con più pagine:

- Installa `react-router-dom` e configura `createBrowserRouter` con `RouterProvider`;
- Crea un componente `Layout` con una barra di navigazione (link a "Home" e "Preferiti") e un `<Outlet />`, da usare come route "contenitore" per tutte le pagine;
- Route da implementare, tutte figlie di `Layout`:
  - `/` → `HomePage`, con la lista dei film e la barra di ricerca già realizzate;
  - `/favorites` → `FavoritesPage`, che mostra solo i film preferiti (letti dal context);
  - `/movies/:movieId` → `MovieDetailPage`, pagina di dettaglio del singolo film, che legge l'`id` con `useParams()` e recupera il film corrispondente dal context;
  - `*` → `NotFoundPage`, con un messaggio e un link per tornare alla home;
- In `MovieCard`, sostituisci il click sulla card con un `` <Link to={`/movies/${movie.id}`}> `` per andare al dettaglio;
- In `MovieDetailPage`, aggiungi un pulsante "← Torna indietro" che usa `useNavigate()` per tornare alla pagina precedente;
- Bonus: fai in modo che la ricerca da `SearchBar` aggiorni la query string dell'URL (es. `/?q=matrix`) e che `HomePage` legga il termine di ricerca da lì con `useLocation()`, così il risultato della ricerca è condivisibile tramite link.

{% endcapture %}
{% include exercise_box.html content=esercizio8 %}
