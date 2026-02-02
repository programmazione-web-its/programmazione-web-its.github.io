---
layout: post
title: '#32. Layout e nested routes'
categories: lezioni
excerpt: Gestire le rotte in modo centralizzato e creare layout condivisi con React Router
featured_image:
---

## Layout route

Con React Router possiamo **centralizzare il layout** direttamente nelle nostre route, grazie al concetto di layout route, cioè una **route “contenitore”** che racchiude tutte le altre.

Questa route non rappresenta una vera pagina, ma serve come **wrapper** per le pagine “figlie”.

## L'oggetto Outlet

Per poter visualizzare i componenti figli all'interno del layout route, dobbiamo utilizzare il componente `Outlet` fornito da React Router. Questo componente funge da segnaposto per il contenuto delle route figlie.

```jsx
// layouts/Layout.jsx

import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
```

In sostanza, `Outlet` verrà sostituito dal componente della route figlia attiva e `Layout` diventa un contenitore per tutte le pagine che ne fanno parte.

## Definire le rotte annidate (nested routes)

Una volta creato il layout, dobbiamo definire le rotte annidate nel nostro router

```jsx
import { createBrowserRouter } from 'react-router-dom'
...
 const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout, // route layout principale ** element: <Layout />
      children: [
        { index: true, Component Homepage }, // equivalente a path: '/'
        { path: 'about', Component: About },
      ],
    },
  ])

```

Così facendo:

- La route principale `/` utilizza il componente `Layout` come layout condiviso;
- le route figlie (`/` e `/about`) verranno renderizzate all'interno del componente `Layout`, precisamente nel punto in cui è posizionato l'`Outlet`

E quindi se visitiamo `/` vedremo il contenuto dell'homepage, se visitiamo `/about` vedremo il contenuto della pagina About, ma in entrambi i casi il layout (header, footer, ecc.) rimarrà lo stesso.

## In conclusione

Le Nested Routes permettono di dichiarare una gerarchia di pagine.
Ogni route figlia viene renderizzata dentro l’`Outlet` della route padre.

Questo approccio è utile quando:

- vogliamo avere layout diversi per diverse sezioni (es: `/admin`, `/shop`, `/auth`);
- vogliamo riutilizzare componenti comuni senza duplicarli;
- vogliamo costruire pagine strutturate (es: `/shop/products`, `/shop/cart` ecc.).
