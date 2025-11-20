---
layout: post
title: '#43. React Router Loader: get data'
categories: lezioni
excerpt: Data fetching con React Router, usando il `loader()`
featured_image:
---

Finora abbiamo visto che possiamo recuperare i dati dal backend (_data fetching_) con l'hook `useEffect()` di React e, nel farlo, dobbiamo preoccuparci di gestire manualmente gli stati di caricamento ed errore.

Un approccio che funziona ed è sostanzialmente corretto ma che ci obbliga a considerare alcuni aspetti:

- il componente viene renderizzato **prima** che i dati siano disponibili;
- il caricamento parte **solo dopo** l'ingresso in pagina.
  Quindi, in caso di applicazioni complesse questo pattern potrebbe risultare inefficiente.

Una buona soluzione è rappresentato dai `loader` di React Router (disponibile dalla versioni >= 6.4)

## Cos'è un Loader

In parole semplici è una funzione che possiamo associare ad una route in questo modo 👇:

```jsx
createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const res = await fetch('http://myapis.com/')
      return res
    },
    Component: MyRoute,
  },
])
```

React Router si occuperà di eseguirla **in automatico** quando l'utente **sta per entrare** in quella pagina e **prima** che il componente venga renderizzato.
{% capture highlight %}
React Router carica **i dati in anticipo** e poi renderizza il componente quando ha già tutti i dati necessari.
👀 In questo contesto, non sarà necessario usare lo `useEffect()` nè gestire manualmente stati di caricamento ed errore.
{% endcapture %}
{% include highlight.html content=highlight  %}

## Accedere i dati del loader

In un loader non possiamo restituire qualsiasi tipo di valore (un oggetto, una stringa, un booleano, una Promise, etc). Qualunque sia questo valore, React Router lo renderà **disponibile al componente** associate alla route tramite **l'hook `useLoaderData()`**

```jsx

import { useLoaderData } from 'react-router-dom';

export default function My Route() {
  const data = useLoaderData()

  return <MyComponent data={data} />
}

```

Se il loader restituisce una Promise React Router la gestisce automaticamente: attende la sua risoluzione, usa il dato come risultato del loader e solo dopo renderizza la route. Non serve usare useEffect né gestire manualmente lo stato del caricamento.

## Come viene gestito lo stato di loading

Usando React Router non avremo più bisogno di `useState` per gestire lo stato di caricamento, ma la suo posto possiamo controllare i **navigation state**.
Sfruttando l'hook `useNavigation()` possiamo infatti vedere se React Router sta:

- caricando una nuova route;
- aspettando una promise di un loader;

```jsx
import { useNavigation } from "react-router-dom";

function MyRootLayout() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <p>Caricamento...</p>;
  }

  return (
    /* contenuto reale */
  );
}

```

{% capture highlight2 %}
⚠️ Il componente nel quale carichiamo i dati non vede il loading, perché il loader viene gestito fuori dal componente. Per questo, la UI legata allo stato di caricamento dovrà essere gestita nel layou padre.s
{% endcapture %}
{% include highlight.html content=highlight2  %}

```
<RootLayout>
  ├── header
  ├── main (👉 qui cambiano le pagine)
  └── footer
</RootLayout>
```

Il loader comparirà al cambio pagina.

## Come gestire gli stati di errore

Come per lo stato di loading, anche per gli errori non sarà più necessario l'utilizzo di `useState`, perché è React Router a gestirli con:

- `throw`nel loader;

  ```jsx
  export async function loader() {
    const res = await fetch('http://myapis.com/')

    if (!res.ok) {
      throw new Response('Failed to fetch', { status: 500 })
    }

    return res.json()
  }
  ```

- `errorElement`nella definizione della route;

  ```jsx
  createBrowserRouter([
    {
      path: '/',
      loader: async () => {
        const res = await fetch('http://myapis.com/')
        return res
      },
      errorElement: <EventsErrorPage />, // <- componente per la gestiione degli errori
      Component: MyRoute,
    },
  ])
  ```

- l'hook `useRouteError()` da usare nei componenti.

  ```jsx
  import { useRouteError } from 'react-router-dom'

  export default function EventsErrorPage() {
    const error = useRouteError()

    return (
      <div>
        <h1>Errore!</h1>
        <p>{error.statusText || error.message}</p>
      </div>
    )
  }
  ```

☝️ Se il loader fallisce, React Router **non renderizza mai la pagina del componente**, ma renderizza direttamente la pagina con il componente errore (`EventsErrorPage`).
