---
layout: post
title: '#40. Redux in React con React Toolkit'
categories: lezioni
excerpt: Utilizzare Redux per la gestione dello stato in un'applicazione React
featured_image:
---

{% capture standardcontent %}
Partiamo da un'affermazione fondamentale:

{% capture highlight %}

### Redux è completamente separato da React.

{% endcapture %}
{% include highlight.html content=highlight  %}
Per integrare Redux in un'applicazione React abbiamo bisogno di `react-redux`, che fornisce hook come `useSelector` e `useDispatch` per leggere lo stato e inviare azioni, garantendo che i componenti si ri-renderizzino automaticamente quando lo stato Redux cambia.

Tuttavia, la configurazione di Redux "puro" può essere piuttosto verbosa. Per questo motivo oggi si utilizza quasi sempre **Redux Toolkit**, una libreria ufficiale che semplifica la creazione dello store, dei reducer e delle action, riducendo il boilerplate e seguendo le best practice consigliate dal team Redux.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Documentazione ufficiale di Redux](https://react-redux.js.org/)
  - 🔗 [Documentazione ufficiale di Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
  - 🔗 [Approfondimento: perché Redux Toolkit è lo standard moderno](https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## Integrare Redux in un progetto React

La prima cosa da fare è installare le dipendenze necessarie:

```bash
npm install @reduxjs/toolkit react-redux
```

A questo punto, ci spostiamo nell'entry point dell'applicazione (di solito `src/index.jsx` o `src/main.jsx`) e configuriamo lo store Redux utilizzando Redux Toolkit.

1. Importiamo `configureStore` da `@reduxjs/toolkit`

   ```jsx
   import { configureStore } from '@reduxjs/toolkit'
   ```

2. Creiamo lo store:

   ```jsx
   const store = configureStore({
     reducer: {},
   })
   ```

   Quando definiamo lo store, possiamo passare un oggetto `reducer` che conterrà i nostri _slice_ di stato. ☝️ La chiave si deve obbligatoriamente chiamare `reducer`.
   Gli slice sono porzioni di stato gestite da specifici reducer: una volta che avremo creato i nostri slice, li aggiungeremo qui dopo averli importati.

3. Avvolgiamo l'applicazione con il provider di Redux:
   ```jsx
   import { Provider } from 'react-redux'
   import App from './App.jsx'
   import { configureStore } from '@reduxjs/toolkit'
   const store = configureStore({
     reducer: {},
   })
   ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
       <App />
     </Provider>
   )
   ```
   ☝️ Esattamente come per il Context API di React, dobbiamo avvolgere l'intera applicazione con un provider per rendere lo store accessibile a tutti i componenti e passare a quel provider lo store che abbiamo appena creato, come passerremo il `value` a un Context.

## Creare uno slice di stato

Ogni _slice_ rappresenza un _pezzetto_ dello stato globale dell'applicazione, gestito da un reducer specifico. All'interno degli slice definiamo azioni e reducer per aggiornare lo stato. Per questo, e per mantenere il codice organizzato, di solito creiamo una cartella `src/store` dove mettiamo tutti i file relativi a Redux.

All'interno di `src/store`, creiamo un file per il nostro primo slice, ad esempio `cartSlice.js`:

1. Importiamo `createSlice` da `@reduxjs/toolkit`:
2. Creiamo lo slice utilizzando `createSlice`. All'interno di `createSlice`, definiamo un oggetto con le seguenti proprietà:

   - `name`: il nome dello slice;
   - `initialState`: lo stato iniziale dello slice;
   - `reducers`: un oggetto che contiene le funzioni reducer per gestire le azioni.

     ```javascript
     import { createSlice } from '@reduxjs/toolkit'
     const cartSlice = createSlice({
       name: 'cart',
       initialState: { items: [] },
       reducers: {
         addItem: (state, action) => {
           ...
         },
         updateQuantity: (state, action) => {
          ...
         },
       },
     })
     ```

     👀 Ai reducer passiamo lo stato attuale (`state`) e, se necessario, delle azioni (`action`). Le azioni, in modo simile a `useReducer`, conterranno un `payload` al quale possiamo accedere.

     Quindi, se dovessi usare la funziona addItem per aggiungere un elemento al carrello (basandomi sulla nostra app _Fakeshop_), potrei scrivere:

     `addItem({id: 'p1', products: products})`
     Qui il mio oggetto `{id: 'p1', products: products}` sarà il `payload` dell'azione.

3. Una volta definiti i reducer, dobbiamo esportare le azioni e il reducer generati da `createSlice`:

   ```javascript
   export const { addItem, updateQuantity } = cartSlice.actions
   export default cartSlice.reducer
   ```

   In pratica, esportiamo **tutte** le azioni per poterle usare nei componenti e esportiamo il reducer di default per poterlo aggiungere allo store.

## Aggiungere lo slice allo store

A questo punto possiamo tornare nel nostro entry point (`src/index.jsx` o `src/main.jsx`) e importare il reducer del nostro slice per aggiungerlo allo store:

```javascript
import cartReducer from './store/cartSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})
```

In pratica, stiamo dicendo a Redux che vogliamo gestire una porzione di stato chiamata `cart` utilizzando il `cartReducer` che abbiamo appena creato.

## Usare lo stato e le azioni nei componenti

Per leggere lo stato e inviare azioni dai componenti React, utilizziamo gli hook `useSelector` e `useDispatch` forniti da `react-redux`.

E, naturalmente, ci serviranno anche le azioni che abbiamo intenzione di usare . Dovremo importare tutto all'interno del componente desiderato:

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { addItem, updateQuantity } from '../store/cartSlice'
```

### Usare le azioni: useDispatch

L'hook `useDispatch` ci restituisce la funzione `dispatch` che usiamo per inviare azioni allo store.

Se, ad esempio volessimo leggere gli elementi del carrello e aggiungere un nuovo elemento, potremmo fare così:

- Importare gli hook e le azioni necessarie;
- definire una variable con `useDispatch`;
- una volta definito il dispatch, abbiamo accesso alle funzioni all'interno dello slice e possiamo usarle.

```jsx
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../store/cartSlice'
export default function Cart() {
  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
      >
        <MinusCircleIcon size={24} />
      </button>
      {item.quantity}
      <button
        onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
      >
        <PlusCircleIcon size={24} />
      </button>
    </>
  )
}
```

### Leggere lo slice dello stato: useSelector

L'hook `useSelector` ci permette di leggere lo stato dallo store. Accetta una funzione di selezione che riceve lo stato globale e restituisce la parte di stato di cui abbiamo bisogno.

Per leggere la porzione di stato che ci serve, definiamo la variabile con il nome desiderato e usiamo l'hook `useSelector`. All'interno dell'hook dobbiamo passara lo stato come parametro.
👀 Qui, `state` rappresenta l'interno store, quindi dobbiamo accedere solo alla porzione che ci serve con la _dot notation_.

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { updateQuantity } from '../store/cartSlice'
export default function Cart() {
  const dispatch = useDispatch()

  const { items } = useSelector((state) => state.cart)

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const formattedTotalPrice = `€ ${totalPrice.toFixed(2)}`
  return (
    <>
      <p className='my-8 text-right'>
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </>
  )
}
```

☝️ Qui, lo _slice state_ è trattato **come un stato di React**, questo significa che si aggiorna reattivamente quando l'azione lo "modifica".
