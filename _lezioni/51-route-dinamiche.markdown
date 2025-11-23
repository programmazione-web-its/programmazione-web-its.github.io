---
layout: post
title: '#51. Le route dinamiche'
categories: lezioni
excerpt: Configurare le route dinamiche in Next.js
featured_image:
---

Abbiamo già visto in React con React Router che, spesso, abbiamo biosgno di gestire rotte dinamiche all'interno delle nostre app. È il caso, ad esempio, di una sezione news, di un blog con i suoi post o dei prodotti di un e-commerce: dobbiamo gestire le rotte senza sapere in anticipo quale sarà l'url definitivo.
In Next.js possiamo gestire le route dinamiche esattamente come gestiamo quelle statiche, ovvero attraverso la struttura dei file:

```
app/
 └─ blog/
     ├─ page.js            ← rotta di blog (quella che conterrà tutte gli articoli)
     └─ [slug]/
         └─ page.js        ← rotta dinamica per il singolo articolo

```

La sintassi `[slug]` dice a Next.js che quella parte di URL è variabile e può essere, quindi, **qualsiasi valore**

Nella pagina principale del nostro blog potremmo dunque inserire i post in questo modo:

```jsx
// app/blog/page.js
import Link from 'next/link'

export default function BlogPage() {
  return (
    <main>
      <h1>The Blog</h1>

      <p>
        <Link href='/blog/post-1'>Post 1</Link>
      </p>
      <p>
        <Link href='/blog/post-2'>Post 2</Link>
      </p>
    </main>
  )
}
```

E nella pagina del singolo post, potremo recuperare i dati necessari in questo modo:

```jsx
// app/blog/[slug]/page.js

export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>Slug: {params.slug}</p>
    </main>
  )
}
```

## Come funziona _params_

Next.js **passa automaticamente** una proprietà `params` al componente della pagina. Analogamente ai parametri in React Router, passati nel `createBrowserRoute` e recuperati con l'hook `useParams`, anche in Next.js possiamo sfruttare `params` per ottenere i dati passati alla rotta.
👀 Se ho definito la mia cartella come `[slug]` allora, nei miei `params` avrò `params.slug`.

### Un esempio pratico

```jsx
// app/blog/[slug]/page.js
async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`)
  return res.json()
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```
