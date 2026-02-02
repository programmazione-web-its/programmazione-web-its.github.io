---
layout: post
title: '#48. Creare progetto Next.js'
categories: lezioni
excerpt: Come creare un App con Next.js
featured_image:
---

Per creare una nuova applicazione Next.js ci serve il comando

```js
npx create-next-app@latest nome-della-mia-app
```

Una volta lanciato il comando, il terminale potrebbe chiederci:

![next-1](/assets/images/next-1.png)

Per questa lezione scegliemo **"No, custom settings"** e impostiamo a mano il nostro progetto:

![next-2](/assets/images/next-2.png)

Quando l'istallazione è terminata, possiamo visualizzare il progetto in preview con:

```js
npm run dev
```

## La cartella app

Nelle versioni moderne di Next.js, la cartella `app/` è il punto centrale in cui definiamo la struttura del sito:

- qui creaimo le pagine;
- qui impostiamo i layout;
- qui organizziamo le sezioni dell'App.

## Il file page.js

All'interno di questa cartella troviamo un file fondamentale, `page.js`.
⚠️ `page.js` è un nome riservato, questo significa che ha un significato preciso per Next.js: quando creiamo un file `page.js` stiamo dicendo al framework che quella è una pagina e va renderizzata come tale.

`page.js` altro non è che un componente ma è un componente un po' speciale perché è un [**Server Component**](https://react.dev/reference/rsc/server-components), ovvero un componente che ci consente di recuperare i dati (fetch) e renderizzare il componente lato server per poi inviarlo al client. Quindi: il componente **non viene eseguito nel browser** ma Next.js lo **esegue lato server** e poi, il risultato della funzione (ovvero il JSX trasformato in HTML) viene inviato al browser.

👀 Una dimostrazione pratica: nel componente `page.js` della nostra app porivamo a scrivere un `console.log`: cosa succede?

### Aggiungere altre route all'app

Abbiamo visto che i nomi de file contanto in Next.js e che, se voglio aggiungere una pagina, devo usare il nome `page.js` ma quindi, se volessi aggiungere un'altra route, diciamo "About" alla mia app come faccio?

👉 Aggiungendo una **nuova cartella** dentro `App` che avrà il nome che voglio dare alla mia route, ad esempio `about` e al suo interno, aggiungero un file `page.js`

```
app/
 ├─ layout.js
 ├─ page.js           ← Homepage
 └─ about/
     └─ page.js       ← pagina "About"
```

### Navigare tra le route...

Per navigare da una route all'altra, rimanendo all'interno dell'App potremmo aggiungere un link in questo modo:

```html
<a href="/about">About Us</a>
```

Effettivamente, funziona, ma se usiamo il tag `<a>` causiamo ogni volta un caricamento della pagina dal server è un **problema.** perch\* in Next.js siamo in una situazione particolare dal momento che:

- quando visitiamo una pagina **per la prima volta** il contenuto è pre-renderizzato sul server e inviato al browser;
- quando navighiamo all'interno dell'app Next.js può usare **JavaScript lato client** per aggiornare solo ciò che serve, senza ricaricare l'intera pagina.
  Ci troviamo quindi a dover gestire un approccio ibrido che combina il SSR e le client side transition tipie di una Single Page Application.
  Per questo,`<a>` non è lo strumento adatto, perché dice al browser vai su un'altra pagina e ricarica tutto e quindi la SPA si interrompe, la pagina viene ricaricata da zero facendo perdere fluidità alla navigazione.

### ...con `<Link>`

Per mantenere attive tutte le funzionalità di una SPA e gestire la navigazione in un ambiente Next.js dobbiamo quindi usare `<Link>`:

```jsx
import Link from 'next/link'
```

```jsx
<Link href='/about'>About Us</Link>
```

`<Link>` ci permette di:

- evitare page reload;
- mantenere lo stato di SPA;
- usare routing client-side;
- ottimizzare la navigazione internamente;
- gestire automaticamente prefetching e ottimizzazione.

👀 Dietro le quinte Next.js renderizza la nuova pagina sul server e invia il risultato al browser, facendo aggiornare la UI senza fare un reload completo della pagina.
