---
layout: post
title: '#54. Loading, Errori e 404'
categories: lezioni
excerpt: Gestione del loading, degli errori e della pagina 404
featured_image:
---

In generale, Next.js utilizza una cache aggressiva: alla prima richiesta di una risorsa potremmo avere un ritardo di caricamento, ma tornandoci successivamente non noteremmo questo ritardo. Next, infatti, memorizza le pagine già visitate insieme ai dati associati. Ciò nonstante è bene dare un feeback visivo all'utente durante il caricamento.

## Gestire il caricamento: loading.js

Come per le pagine e i layout, anche per il caricamento esiste un file speciale: `loading.js`: è possibile inserirlo nella cartella della pagina della quale vogliamo gestire il caricamento oppure inserirne uno generico nella root do `app/`.
Questo file verrà utilizzato come _fallback_ mentre la pagina o i dati vengono caricati

Come le altre pagine speciali, anche `loading.js` è un componente:

```jsx
export default function Loader() {
  return <p>Please wait while fetching data...</p>
}
```

Spesso alcune parti della pagina, come l'header o il footer, non dipendono dai dati. Possiamo dunque mostrare l'header subito e il testo del caricamento **dove** effettivamente **serve.**

Ad esempio:

```
/app/blog/
 ├─ page.js
 ├─ loading.js

```

Il nostro loading sarà gestio qui:

```jsx
// laoding.js
export default function Loader() {
  return <p>Please wait while fetching data...</p>
}
```

E la nostra pagina blog avrà questa struttura

```jsx
// blog/page.js
import Header from '../components/Header'
import PostsGrid from './PostGrid'
import { getPost } from '../../lib/posts'

export default async function MealsPage() {
  // Qui recuperi i dati direttamente dal DB
  const posts = await getPosts()

  return (
    <main>
      <Header /> {/* Questo è statico e sarà subito visibile */}
      <section>
        <PostsGrid posts={posts} /> {/* Questo carica i dati dinamici */}
      </section>
    </main>
  )
}
```

## Gestire gli errori: error.js

Un'altro componente speciale in Next.js è `error.js`:

- viene renderizzato se la pagina genera un errore;
- riceve delle props, tra cui `error`, che ci permette di mostrare messaggi personalizzati;

👀 `error.js` **deve essere** un Client Component, perché deve intercettare anche gli errori che avvengono lato client.

```
/app/blog/
 ├─ page.js
 ├─ loading.js
 └─ error.js

```

```jsx
'use client'
export default function BlogError({ error }) {
  return (
    <main className='error'>
      <h1>An error occurred</h1>
      <p>Failed to fetch posts data. Please try again later.</p>
    </main>
  )
}
```

## Gestire gli erorri 404: not-found.js

Per gestire URL non validi o risorse mancanti, possiamo creare un file `not-found.js`:

- funziona a livello globale o annidato, a seconda della cartella in cui viene inserito;
- permette di personalizzare la pagina 404 dell’applicazione.

```
/app/
 ├─ page.js
 └─ not-found.js

```

```jsx
export default function NotFound() {
  return (
    <main className='not-found'>
      <h1>Not found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </main>
  )
}
```
