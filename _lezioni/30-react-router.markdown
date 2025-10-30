---
layout: post
title: '#30. React Router per la gestione delle SPA'
categories: lezioni
excerpt: Gestire la navigazione in una Single Page Application con React Router
featured_image:
---

{% capture standardcontent %}

## Come installare React Router

Per installare React Router nella tua applicazione React esegui uno dei seguenti il comando nel terminale all'interno della directory del tuo progetto:

```bash
npm i react-router-dom
```

## Configurare React Router

Una volta installato React Router possiamo aggiungere il router alla nostra app, seguendo questi passaggi:

1. **Definizione delle rotte** : la prima cosa da fare è definire le rotte che vogliamo supportare;
2. **Inizzializzare il Router** e caricare la definizione delle rotte nell'applicazione;
3. **Creare i componenti di navigazione** per permettere agli utenti di spostarsi tra le diverse pagine.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [React Router - Documentazione ufficiale](https://reactrouter.com/home)
  - 🔗 [Mastering React routing](https://www.contentful.com/blog/react-routing/)
  - 👀 [Configurazione delle rotte](https://reactrouter.com/start/data/routing)
  - 👀 [Approfondimento su Link](https://reactrouter.com/api/components/Link#link)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

### 1. Definizione delle rotte

Possiamo configurare le rotte importando `createBrowserRouter` all'interno del nostro componente principale `App`.

```jsx
// App.jsx

import { createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/Homepage'


export default function App()  {
  return <div></div>
}

const router = createBrowserRouter([{ path: '/', Component: <Homepage> }])
```

L'oggetto `router` contiene la definizione delle rotte della nostra applicazione. Oltre alla proprietà `path`, che definisce l'URL associato alla rotta, possiamo specificare anche altre proprietà come:

- `Component`: il componente React da renderizzare quando la rotta viene attivata;
- `children`: un array di rotte figlie per creare una struttura di navigazione annidata;
- `loader`: una funzione asincrona per caricare dati prima di renderizzare il componente.

Possiamo nidificare le rotte in modo più complesso, ad esempio aggiungendo una rotta per una pagina di dettaglio:

```jsx
createBrowserRouter([
  {
    path: '/dashboard',
    Component: Dashboard,
    children: [
      { index: true, Component: Home },
      { path: 'settings', Component: Settings },
    ],
  },
])
```

In questo esempio, la rotta `/dashboard` ha due rotte figlie: una per la home del dashboard e una per le impostazioni. Il parametro `index: true` indica che questa rotta figlia verrà renderizzata quando l'utente visita `/dashboard`.

### 2. Inizializzare il Router

Una volta definite le rotte, dobbiamo inizializzare il router all'interno del nostro componente principale `App`, utilizzando il componente `RouterProvider`:

```jsx
// App.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'


export default function App() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([{ path: '/', Component: <Homepage> }]);
```

### 3. Creare i componenti di navigazione

Per permettere agli utenti di navigare tra le diverse pagine della nostra applicazione, possiamo utilizzare il componente `Link` di React Router:

```jsx
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
    </nav>
  )
}
```

{% capture highlight %}

### ☝️ Perché usiamo Link e non un normale tag `<a>`?:

Se proviamo ad inserire un link usando un normale tag `<a>`, in effetti, la navigazione funzionerà, ma causerà un **refresh completo della pagina**. Questo perché il browser interpreta il click su un tag `<a>` come una richiesta di caricamento di una nuova pagina. In una Single Page Application (SPA) come quelle create con React, vogliamo evitare questo comportamento per mantenere lo stato dell'applicazione e migliorare l'esperienza utente. Utilizzando il componente `Link` di React Router, invece, la navigazione avviene **senza ricaricare la pagina**, permettendo a React di gestire il cambiamento di vista in modo fluido e veloce.
{% endcapture %}
{% include highlight.html content=highlight  %}
