---
layout: post
title: '#52. Server component vs Client Component'
categories: lezioni
excerpt: Quando usare cosa
featured_image:
---

Next.js introduce un concetto fondamentale per capire come e dove viene eseguito il codice React: la distinzione tra Server Components e Client Components.

Questo è uno dei pilastri dell' App Router di Next.js.

## React: Client vs Server

In un progetto React tradizionale (CRA, Vite, ecc.), **tutti i componenti** sono Client Components:

- il codice gira completamente nel browser;

- React esegue tutto lato client.

- il server invia una pagina quasi vuota che poi React riempie via JavaScript.

**💡 Questo NON accade con Next.js.**

## Next.js è full-stack: esiste un backend

Next.js è un framework full-stack: ha frontend + backend, quindi può eseguire **React anche lato server.**
Per questo motivo, in Next.js, **tutti i componenti, per default, sono Server Components.**. Questo significa che:

- la funzione del componente viene eseguita sul server;
- il browser riceve l'HTML già pronto;
- viene inviato meno JS al client.

Per verificare se un componente è un Server Component possiamo fare un `console.log` al suo interno: se siamo in un componente server vedremo il log nel terminale e non in console. Nell'ultima versione di Next.js vediamo il log anche nei dev tools del browser, ma con etichettato come "server".

👀 Di default, tutti i componenti Next.js sono Server Component.

### Anche la navigazione è server-side

Anche quando navighi con `<Link>`, quindi in modalità SPA:

- non viene eseguito codice del componente nel browser;

- Next.js ricostruisce la pagina sul server;

- poi invia HTML/JS ottimizzato al client;

## I Server Component sono un vantaggio?

La risposta è si, perché:

- se c'è meno JS da scaricare il sito è più veloce;
- se viene servita una pagina già renderizzata in HTML, la SEO è salva;
- alcune logiche rimangono sul server rendendo l'app più sicura;
- possiamo accedere a risorse backend senza esporre API al client;

## I limiti dei Server Component

⚠️ I server component non possono usare:

- hook come `useState`, `useEffect`, `useRef`;
- event handler come `onClick`, `onChange`;
- le client API, come `window`, `document`;
- timers, interval, etc.

Perché tutte queste cose richiedono **JavaScript attivo nel browser**. Per questo, abbiamo comunque bisogno dei **Client Components**

## Come si creano i Client Component

Dal momento che, di default, tutti i componenti Next.js sono Server Component come facciamo a creare i Client Component?
Dichiarando, all'inzio del file `"use client"`

```jsx
'use client'

export default function Button() {
  return <button onClick={() => alert('clicked')}>Click</button>
}
```

⚠️ Se non scriviamo `"use client"` nei componenti Client, Next.js ci darà errore.

## Come interagiscono i Server Component e i Client Component?

- Le pagine (`page.js`) e layout sono **sempre server per default**;
- i componenti marcati con "`"use client"` diventano **isole client-side** all’interno dell’app.

Se ad esempio, avessimo uno slideshow nella nostra homepage, la struttura sarebbe del tipo

```
[ RootLayout (server) ]
     |
     |— [ Header (server) ]
     |— [ Page (server) ]
             |
             └── [ Slideshow (client) ]
```

E solo lo slideshow viene eseguito lato client.
