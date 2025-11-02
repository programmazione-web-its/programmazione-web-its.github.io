---
layout: post
title: '#36. Gestire la pagina 404 con React Router'
categories: lezioni
excerpt: Come gestire le pagine non trovate (404) in un'applicazione React utilizzando React Router e la route wildcard "*".
featured_image:
---

In un'applicazione web, è importante gestire le pagine non trovate (404) in modo che gli utenti ricevano un messaggio chiaro quando tentano di accedere a una route inesistente. In React Router, possiamo facilmente implementare questa funzionalità utilizzando una route wildcard (`*`).

## Creare una pagina 404

Per prima cosa, creiamo un componente React che rappresenta la nostra pagina 404. Questo componente può essere semplice, ad esempio:

```jsx
function NotFound() {
  return (
    <div>
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non esiste.</p>
    </div>
  )
}
```

## Configurare la route wildcard

Successivamente, dobbiamo configurare React Router per utilizzare questa pagina 404 quando l'utente tenta di accedere a una route inesistente. Per fare questo, aggiungiamo una route wildcard (`*`) alla nostra configurazione delle rotte:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // React Router < 7

import { createBrowserRouter } from 'react-router' // React Router >= 7
import { RouterProvider } from 'react-router/dom' // React Router >= 7

import NotFound from './NotFound' // Importa il componente NotFound
import Home from './Home'
import About from './About'

const routes = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/about', Component: About },
  { path: '*', Component: NotFound },
])
export default function App() {
  return <RouterProvider router={routes} />
}
```

In sostanza, la route con `path: '*'` cattura tutte le richieste che non corrispondono a nessuna delle route definite in precedenza, mostrando così la pagina 404.
