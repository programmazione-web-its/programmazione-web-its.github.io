---
layout: post
title: '#57. Build di un app Next.js'
categories: lezioni
excerpt: Prerendering, Cache e Dati Dinamici in Produzione con Next.js
featured_image:
---

Quando la nostra applicazione è pronta, dobbiamo fare la **build** per la produzione, con il comando:

```js
npm run build
```

Se poi vogliamo vedere se la build funziona possiamo lanciare il comando

```js
npm start
```

che renderà disponibile su localhost la nostra app compilata: ovvero come la vedremmo online.

## Cosa succede durante la build?

Durante la build Next.js:

- esegue il codice server-side di tutte le pagine **statiche**;
- salva l'HTML generato;
- lo memorizza in cache;
- lo serve **sempre uguale**, senza rieseguire il codice.

Quindi la pagina viene generata **una volta e basta** (fino a nuova richiesta) e, se il db cambia dopo la build, la nostra pagina **non viene aggiornata.**
Questo avviene perché, come già detto, Next.js ha un sistema di caching molto _aggressivo_ che consente di ottimizzare in maniere eccellente le performance ma che può diventare un limite quando abbiamo del contenuto che potrebbe cambiare.

## Come possiamo risolvere il problema?

Per fare in modo che una pagina si aggiorni in automatico, quando il suo contenuto cambia, dobbiamo dirlo a Next.js. Possiamo farlo in due con `revalidate`:

```jsx
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export default async function Page({ params }) {
  const { id } = await params
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then((res) =>
    res.json()
  )
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

👉 [Approfondimento sulla ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
