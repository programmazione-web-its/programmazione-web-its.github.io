---
layout: post
title: "#37. L'hook useReducer"
categories: lezioni
excerpt: Gestione avanzata dello stato con l'hook useReducer
featured_image:
---

Quando iniziamo a costruire applicazioni React più complesse, **React Context** diventa uno strumento **fondamentale** perché ci permette di condividere stato tra più componenti senza dover passare dati manualmente tramite props (il cosiddetto prop drilling).

Tuttavia, Context non si occupa direttamente della gestione dello stato, ma **solo della condivisione**.
La logica di aggiornamento dello stato — cioè come cambiano i dati — resta a carico nostro.

Se prendiamo come esempio il carrello del nostro Fakeshop, notiamo che le funzioni di aggiornamento di stato sono piuttosto complesse e, di conseguenza, il codice diventa difficile da mantenere e testare.
Inoltre, quando lo stato è complesso, quasi sempre dobbiamo **aggiornare lo stato basandoci sullo stato precedente**, il che rende l'uso di `useState` meno pratico.

```jsx
setShoppingCart((prevCart) => {
  // aggiorno il carrello basandomi sul valore precedente
  return updatedCart
})
```

Questo schema potrebbe ripetersi molto spesso, rendendo il codice ripetitivo. Per fortuna, per risolvere questa situazione, React ci offre un altro hook chiamato `useReducer`.

## Cos'è un reducer?

Un reducer (in JavaScript e in React) è semplicemente una funzione che trasforma più valori in un **risultato unico.**

```js
const numbers = [1, 2, 3]
const sum = numbers.reduce((acc, num) => acc + num, 0)
console.log(sum) // 6
```

☝️ Qui sopra la funzione riduce un array di numeri a un solo valore: la loro somma.

Lo stesso concetto viene applicato in React con `useReducer`, ma invece di ridurre un array a un singolo valore, riduciamo **lo stato** a un nuovo stato basato su un'**azione**.

## Come funziona useReducer

L'hook `useReducer` accetta due argomenti principali:

1. Una funzione **reducer** che definisce come aggiornare lo stato in base a un'azione;
2. Un valore iniziale per lo stato.

Restituisce una coppia di valori:

1. Lo stato attuale;
2. Una funzione `dispatch` per inviare azioni al reducer.
   Ecco un esempio di come utilizzare `useReducer` per gestire lo stato di un contatore:

```jsx
import { useReducer } from 'react'

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 })
  // ...
}
```

### La funzione reducer

La funzione `reducer` prende due argomenti:

1. `state`: lo stato attuale;
2. `action`: un oggetto che descrive l'azione da eseguire.
   La funzione deve restituire il nuovo stato in base all'azione ricevuta.

Ecco un esempio di funzione reducer per un contatore:

### Gestire gli aggiornamenti di stato con le azioni

Per aggiornare lo stato gestito da `useReducer` non possiamo usare `useState`, ma dobbiamo inviare un'**azione** tramite la funzione dispatch che useReducer ci restituisce.
👀 Un'azione è semplicemente un oggetto che descrive cosa vogliamo fare.
Ecco un esempio di come inviare azioni per incrementare o decrementare un contatore:

```jsx
{
  type: 'ADD_ITEM',
  payload: { id: 'p1' }
}
{
  type: 'REMOVE_ITEM',
  payload: { id: 'p1' }
}
```

`type` è una stringa che identifica il tipo di azione, mentre `payload` contiene i dati necessari per eseguire l'azione.
Il nome `payload` è una convenzione comune, ma possiamo usare qualsiasi nome.

### Dispatching actions

All’interno del nostro componente, ad esempio in una funzione `handleAddItemToCart`, invece di scrivere tutta la logica di aggiornamento dello stato, inviamo un’azione:

```jsx
function handleAddItemToCart(id) {
  shoppingCartDispatch({
    type: 'ADD_ITEM',
    payload: id,
  })
}
```

Questa chiamata **non aggiorna direttamente lo stato**, ma **notifica** a React che vogliamo eseguire un'azione di tipo `ADD_ITEM`. A questo punto, React chiama la funzione `reducer`, passando lo stato attuale e l'azione appena inviata.

### Aggiornare lo stato nel reducer

All'interno di un `reducer`, possiamo gestire azioni diverse in base al loro type.

```jsx
function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items]
    const id = action.payload

    // Logica di aggiunta dell’item
    const existingItemIndex = updatedItems.findIndex((item) => item.id === id)
    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex].quantity++
    } else {
      updatedItems.push({ id, quantity: 1 })
    }

    // Restituiamo un nuovo stato aggiornato
    return { ...state, items: updatedItems }
  }

  return state
}
```

Cosa succede qui:

- Controlliamo il tipo di azione (`ADD_ITEM`);
- copiamo l’array di item per non modificare **lo stato originale**;
- usiamo `action.payload` per sapere quale prodotto aggiungere;
- restituiamo un **nuovo oggetto stato** con gli item aggiornati

a
