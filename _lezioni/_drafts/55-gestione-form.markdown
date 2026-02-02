---
layout: post
title: '#55. Gestire i form e salvare i dati in Next.js'
categories: lezioni
excerpt: Gestione dei form e salvare i dati con Server Actions
featured_image:
---

Per gestire l'invio di form e il salvataggio dei dati in Next.js , oggi, si usano le [**Server Actions**](https://nextjs.org/docs/app/guides/forms), che permettono di:

- gestire l'invio dei form **senza** JS sul client;
- ricevere i dati del form **direttamente dal server**;
- evitare `onSubmit`, `preventDefault()`, `fetch()` o `API routes`;

## In React standard

Normalmente, in React classico quando un form viene inviato intercettiamo l'evento con `onSubmit`, chiamiamo `preventDefault()`, recuperiamo manualmente i valori degli input e poi inviamo tutto al backend tramite `fetch()`.

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  await fetch('/api/endpoint', { method: 'POST', body: data })
}
```

## In Next.js

Dal momento che Next.js App Router è full-stack, possiamo scrivere funzioni che **girano sul server**, ricevono i dati del form automaticamente e possono direttamente leggere file, scrivere sul db, salvare dati. Questo funzioni si chiamano, appunto, **Server Actions**.

### Come si crea una Server Action

Per creare una Server Action dobbiamo scrivere `"use server"` all'interno della nostra funzione:

```js
async function addPost(formData) {
  'use server'
  // formData è già un FormData con i dati inviati dal form
}
```

Questa funzione, così definita, potrà essere usate nel form:

```jsx
<form action={addPost}>...</form>
```

Quindi, quando l'utente invierà il form:

- il browser invierà in automatico i dati al server;
- Next.js eseguirà la funzione Server Action;
- non ci sarà alcun reload di pagina.

### Recuperare i dati del form

Next.js ci fornisce automaticamente un oggetto `FormData`.

```js
async function addPost(formData) {
  'use server'
  const post = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    author formData.get('name'),
  }

  console.log(meal)
}
```

Se abbiamo un input con `name="content"`, lo recuperiamo con `formData.get('content')`.

{% capture highlight %}
☝️ Se il componente fosse un Client Component ('use client'), **non** potremmo dichiarare Server Actions **dentro lo stesso file.**
Per questo motivo è consigliabile mettere le Server Actions in un file dedicato come: `lib/actions.js`, con all'inizio `"use server`:

```js
// lib/actions.js
'use server'

export async function addPost(formData) {
  const post = { ... }
}
```

e poi, nel componente

```js
// lib/addPost.js

'use client'

import { addPost } from '@/lib/actions'

<form action={addPost}>

```

{% endcapture %}

{% include highlight.html content=highlight  %}

## Redirect dopo un submit

Next.js ci mette a disposizione una funzione `redirect` che ci permette di reindirizzare l'utente verso un'altra URL dopo un evento o una mutation.

👀La funzione  `redirect` può essere usata nei Server Component, nelle Server Actions e nei Route Handlers.

Da un esempio della documentazione ufficiale:

```jsx
'use server'
 
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
 
export async function createPost(id) {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }
  redirect(`/post/${id}`) // Navigate to the new post page
}
```

👉 [Approfondimento sui redirect in Next.js](https://nextjs.org/docs/app/guides/redirecting)
