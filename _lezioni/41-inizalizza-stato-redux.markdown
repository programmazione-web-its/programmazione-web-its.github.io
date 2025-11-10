---
layout: post
title: '#41. Inizializzare lo stato in Redux'
categories: lezioni
excerpt: Gestire l'inizializzazione dello stato in Redux
featured_image:
---

In Redux ci sono due metodi principale per inizializzare lo stato:

1. `preloadedState`: un valora opzionale da passare a `createStore` o, nel caso di `Redux Toolkit`, a `configureStore`;


          ```jsx
          const store = configureStore({
            reducer: {
              items: itemsSlice,
            },
            preloadedState: {
              items: DUMMY_ITEMS,
            },
          })
          ```

2. valore inziale _di default_ nel reducer: che verrà impiegato qualora l'argomento `state` in ingresso risulti `undefined`.

   ```jsx

   const initialState = DUMMY_ITEMS

   const itemsSlice = createSlice({
     name: 'items',
     initialState,
     reducers: {
       ...
     },

   })
   ```

☝️ Se configuriamo il valore iniziale di default nello slice e poi definiamo anche il `preloadedState`, quest'ultimo sovrascriverà il valore di default.

```
Store (configureStore)
┌───────────────────────────────┐
│ preloadedState                │
│ ┌───────────────┐             │
│ │ items: [...]  │  <-- se presente, sovrascrive initialState del slice
│ └───────────────┘             │
└───────────────┬───────────────┘
                │
                ▼
Slice (itemsSlice)
┌───────────────────────────────┐
│ initialState: DUMMY_ITEMS      │
│ ┌───────────────┐             │
│ │ items: [...]  │  <-- usato SOLO se preloadedState.items è undefined
│ └───────────────┘             │
└───────────────────────────────┘
```
