---
layout: post
title: '#33. Route dinamiche'
categories: lezioni
excerpt: Gestire le rotte dinamiche con React Router
featured_image:
---

## Cosa sono le route dinamiche?

Le **route dinamiche** sono rotte che contengono parametri variabili nell'URL. Questi parametri permettono di creare pagine dinamiche basate su dati specifici, come ad esempio il profilo di un utente o i dettagli di un prodotto.
Ad esempio, una rotta dinamica per visualizzare il profilo di un utente potrebbe essere definita come `/users/:userId`, dove `:userId` è un parametro che rappresenta l'ID dell'utente.

## Definire una rotta dinamica

Per definire una rotta dinamica in React Router, utilizziamo i due punti (`:`) seguiti dal nome del parametro nella definizione del percorso.
Ecco un esempio di come definire una rotta dinamica per visualizzare i dettagli di un prodotto:

```jsx

// App.jsx
import { createBrowserRouter } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
export default function App()  {
  return <div></div>
}
const router = createBrowserRouter([{
  path: '/products/:productId', Component: ProductDetails
}]
```

In questo esempio, `:productId` è un parametro dinamico che rappresenta l'ID del prodotto.

## Accedere ai parametri dinamici

Per accedere ai parametri dinamici all'interno del componente associato alla rotta, utilizziamo l'hook `useParams` fornito da React Router. Questo hook restituisce un oggetto contenente tutti i parametri definiti nella rotta.
Ecco come possiamo utilizzare `useParams` nel componente `ProductDetails` per ottenere l'ID del prodotto:

```jsx
// pages/ProductDetails.jsx
import { useParams } from 'react-router-dom'
export default function ProductDetails() {
  const { productId } = useParams()

  return (
    <div>
      <h1>Dettagli del Prodotto</h1>
      <p>ID Prodotto: {productId}</p>
    </div>
  )
}
```

In questo esempio, `useParams` ci permette di estrarre il valore di `productId` dall'URL e di utilizzarlo all'interno del componente.
