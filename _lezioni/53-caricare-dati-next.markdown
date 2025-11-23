---
layout: post
title: '#53. Caricamento dei dati'
categories: lezioni
excerpt: Gestire il caricamento dei dati tramite Server Side Components
featured_image:
---

In Next.js è possibile caricare i dati da un databse seza usare `useEffect`, `fetch` o un backend esterno, grazie ai Server Components.

In React, per recuperare i dati lato cliente useremmo `useEffect`:

```jsx
useEffect(() => {
  const getData = async () => {
    try {
      const res = await fetch('api/mypi')
      if (!res.ok) {
        throw new Error('failed to fecth')
      }

      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    }
  }
}, [])
```

In Next.js, tutto questo non è necessario perché essendo i componenti Server Component per impostazione predefinita, questi **girano sul server** e non sul client (browser), quindi:

- possiamo accedere al file system;
- possiamo fare query dirette al db;
- possiamo usare codice "backend" direttamente;
- NON servono backend esterni;
- NON servono fetch interni nè `useEffect`.

Quindi, con Next.js, una volta definito il modo di recuperare i dati da un DB possiamo usare quelle funzioni direttamente nei Server Components:

```js
import sql from 'better-sqlite3'

const db = sql('posts.db')

export async function getPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return db.prepare('SELECT * FROM posts').all()
}
```

e poi la useremmo nel nostro Server Component in questo modo

```jsx
import { getPosts } from '@/lib/posts'

export default async function Blog() {
  const post = await getPosts()
}
```

{% capture highlight %}
☝️ In Next.js, grazie ai Server Components, puoi accedere direttamente a un database dal componente senza passare per un backend separato. Questo è utile soprattutto se vuoi ridurre la complessità del progetto o se stai costruendo qualcosa di semplice.

Tuttavia, molto spesso Next.js viene usato come frontend React per un CMS headless, dove il backend è già gestito da Strapi, Sanity o simili. In questo scenario, Next.js si occupa di fare query a quell’API CMS e di renderizzare i dati sul server, mantenendo i vantaggi dei Server Components.

{% endcapture %}

{% include highlight.html content=highlight  %}
