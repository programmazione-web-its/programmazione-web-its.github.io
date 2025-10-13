---
layout: post
title: '#18. Immutabilità dello stato e best practice'
categories: lezioni
excerpt: Best practice e consigli per gestire lo stato in React
featured_image:
---

Quando gestiamo gli stati in React, specie se sono complessi, come array di oggetti o array multidimensionali, è importante seguire alcune best practice per evitare problemi di performance e di gestione del codice.

## 1. Aggiornare lo state basato sullo stato precedente

Quando lo stato dipende dal valore precedente, è fondamentale usare la forma funzionale di `setState` per garantire che si stia lavorando con il valore più aggiornato. Questo è particolarmente importante in situazioni asincrone o quando ci sono più aggiornamenti di stato in rapida successione.

```jsx
setCount((prevCount) => prevCount + 1)
```

In questo modo, `prevCount` rappresenta sempre il valore più recente di `count`.

## 2. Evitare la mutazione diretta dello stato

In React, lo stato deve essere trattato come **immutabile**. Modificare direttamente lo stato può portare a comportamenti imprevisti e problemi di rendering. Invece di modificare direttamente lo stato, si dovrebbe sempre creare una **nuova copia** dello stato con le modifiche desiderate.

```jsx
//✅ Corretto
setItems((prevItems) => [...prevItems, newItem])

//❌ Sbagliato
items.push(newItem)
setItems(items)
```

##

Quando vogliamo aggiornare un elemento specifico dobbiamo passare le informazioni necessarie agli **event handler**: possiamo farlo usando funzioni anonime da passare ai vari `onClick`, `onChange`, ecc.

```jsx
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

Questo assicura che la funzione venga chiamata solo al momento dell'evento, e non durante il rendering del componente.
