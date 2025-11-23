---
layout: post
title: '#56. API Routes'
categories: lezioni
excerpt: Creare enpoint interni all'app e consumarli sia lato client che lato server
featured_image:
---

# Cosa sono le API Routes?

In Next.js possiamo creare **endpoint API** direttamente nell'app, all'interno di della cartella `app/`. Questi endpoint sicomportano come una sorta di backend integrato nell'app e possono:

- rispodnere a richieste HTTP (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD` e `OPTIONS`);
- accedere ad un database o eseguire codice lato server;
- essere chiamati dal frontend usando `fetch`.

Per creare un'endpoint API:

```js
export async function GET(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}
```

- Il parametro `request`: è opzionale ed è un **oggetto NextRequest** (estensione di Web Request);
- il parametro `context`: è opzionale, ed è un oggetto che contiene i `params`

👉 [Approfondimento su route.js](https://nextjs.org/docs/app/api-reference/file-conventions/route)

## Come si crea una API Route:

```jsx
// /app/api/posts/route.js

export async function GET() {
  const posts = [
    { id: 1, title: 'Lorem ipsum dolor sit', content: '....' },
    { id: 2, title: 'Lorem ipsum dolor sit', content: '....' },
    { id: 3, title: 'Lorem ipsum dolor sit', content: '....' },
  ]

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
```

Un esempio con un endpoint esterno all'APP

```jsx
export async function GET(req) {
  try {
    // esempio: fetch verso API esterna
    const res = await fetch(
      'https://www.thepostdb.com/api/json/v1/1/search.php?f=a'
    )
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
```

## Come si consuma l'API Route lato client:

```jsx
'use client'

import { useEffect, useState } from 'react'

export default function PostsList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) return <p>Loading posts...</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## Come si consuma l'API Route lato server:

```jsx
// Server Component di default
export default async function PostsServer() {
  // fetch lato server
  const res = await fetch('/api/posts', {
    cache: 'no-store', // evita la cache, così vediamo i dati aggiornati
  })
  const posts = await res.json()

  return (
    <div>
      <h2>Posts (lato server)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
