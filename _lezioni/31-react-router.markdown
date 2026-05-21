---
layout: post
title: '#31. React Router 6 per la gestione delle SPA'
categories: lezioni
excerpt: Gestire la navigazione in una Single Page Application con React Router
featured_image:
---

{% capture standardcontent %}

## Come installare React Router 6

Per installare React Router nella tua applicazione React esegui uno dei seguenti il comando nel terminale all'interno della directory del tuo progetto:

```bash
npm i react-router-dom@6
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
  - 👀 [Approfondimento su NavLink](https://reactrouter.com/api/components/NavLink#navlink)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

### 1. Definizione delle rotte

Possiamo configurare le rotte importando `createBrowserRouter` all'interno del nostro componente principale `App`.

```jsx
// App.jsx

import { createBrowserRouter } from 'react-router-dom'

import Homepage from './pages/Homepage'

export default function App() {
  return <div></div>
}

const router = createBrowserRouter([{ path: '/', element: <Homepage /> }])
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
    element: <Dashboard />,
    children: [
      { index: true, element: <Home /> },
      { path: 'settings', element: <Settings /> },
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

const router = createBrowserRouter([{ path: '/', element: <Homepage /> }])
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

### Il NavLink

Un altro componente utile per la navigazione è `NavLink`, che funziona in modo simile a `Link`, ma offre funzionalità aggiuntive per gestire lo stato attivo del link. Ad esempio, possiamo applicare uno stile diverso al link quando l'utente si trova sulla pagina corrispondente:

```jsx
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to='/'
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/about'
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
```

In questo esempio, il link corrispondente alla pagina attiva verrà visualizzato in grassetto, grazie alla proprietà `isActive` fornita da `NavLink`.

{% capture highlight %}

### ☝️ Quando usare NavLink invece di Link?

Usa `NavLink` quando vuoi applicare stili o classi specifiche ai link in base alla loro attivazione, ad esempio per evidenziare la pagina corrente nella barra di navigazione. Usa `Link` per i link standard che non richiedono uno stato attivo.
{% endcapture %}
{% include highlight.html content=highlight  %}

### Stato nei Link e NavLink

Possiamo anche passare uno stato personalizzato ai link utilizzando la proprietà `state`. Questo stato sarà accessibile nella pagina di destinazione tramite l'hook `useLocation`.<br/>
![Logo JS](/assets/images/link-state.png)
