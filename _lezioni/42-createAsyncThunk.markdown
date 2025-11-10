---
layout: post
title: '#42. createAsyncThunk '
categories: lezioni
excerpt: Gestire le azioni asincrone in Redux
featured_image:
---

Redux, di default, **non gestisce azioni asincrone** perché si basa sul concetto che

1. lo store riceve un'azione (`action`);
2. il reducer la processa e restiuisce un nuovo stato.
   Tutto questo avviene in maniera sincrona, senza attese o callback.

Per questo motivo, quando abbiamo bisogno di effettuare operazioni asincrone non possiamo farlo direttamente all'interno di un reducer. Il reducer, infatti, seve sempre essere **puro**: stesso input -> stesso output, senza _side effects_.

In Redux, per gestire le azioni asicrone usiamo i _middleware_, in Redux TLK usiamo `createAsyncThunk`.

### Cos'è **createAsyncThunk**

È una funzione che accetta due argomenti:

1. una **stringa** che identifica il **tipo di azione** Redux;
2. una funzione di _callback_ che dovrebbe restituire una **promise** (ad esempio, una fetch API).

In automatico, `createAsyncThunk` genera tre tipi di azione per il ciclo di vita della Promise:

- `pending`: quando la richiesta è in corso;
- `fulffilled`: quando la richiesta ha successo;
- `rejected`: quando la richiesta fallsice.

Restituisce poi un **thunk action creator** che:

- esegue la callback asincrona;
- fa il dispatch in automatico delle 3 azioni generate (`pending`,`fulffilled`, `rejected` ) in base all'esito della promise.

{% capture highlight %}

⚠️ `createAsyncThunk` **non crea automaticamente i reducer** per gestire questi stati. Devi scrivere tu la logica nel reducer (o nello slice) per aggiornare lo stato, gestire il caricamento e processare i dati.

{% endcapture %}
{% include highlight.html content=highlight  %}

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('cart/getProducts', async () => {
  const response = await fetch('https://dummyjson.com/producfdts')
  if (!response.ok) throw new Error('Failed to fetch products')

  const data = await response.json()

  return data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ....
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products
      state.status = 'completed'
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error.message
      state.status = 'completed with errors'
    })
    builder.addCase(getProducts.pending, (state) => {
      state.status = 'pending'
    })
  },
})
```
