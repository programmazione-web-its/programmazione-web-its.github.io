---
layout: post
title: '#43. Redux asincrono'
categories: lezioni
excerpt: Gestire le azioni asincrone in Redux
featured_image:
---

Redux, di default, **non gestisce azioni asincrone** perché si basa sul concetto che

1. lo store riceve un'azione (`action`);
2. il reducer la processa e restiuisce un nuovo stato.
   Tutto questo avviene in maniera sincrona, senza attese o callback.

Per questo motivo, quando abbiamo bisogno di effettuare operazioni asincrone non possiamo farlo direttamente all'interno di un reducer. Il reducer, infatti, seve sempre essere **puro**: stesso input -> stesso output, senza _side effects_.

In Redux, per gestire le azioni asicrone usiamo i _middleware_, in Redux TLK abbiamo 3 opzioni

1. Thunk manuali, che ci offrono il pieno controllo nella gestione;
2. `createAsyncThunk`, che automatizza gli stati asincroni;
3. RTK Query, che automatizza e standardizza tutto il _data fetching_.

## Il problema: i _side effects_ in Redux

Immaginamiamo di dover salvare un carrello sul server

```jsx
// ❌ Questo NON funziona nei reducer
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
      // ❌ ERRORE: i reducer devono essere funzioni pure!
      fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify(state.items),
      })
    },
  },
})
```

☝️L'esempio qui sopra non funzionerebbe, perché, come abbiamo detto prima, i reducer:

- devono essere funzioni pure;
- non possono fare chiamate asincrone;
- si limitano a calcolare il nuovo stato.

Quindi, come possiamo gestire un caso come quello dell'esempio?

## 1. Thunk manuali: soluzione base

Un **thunk** è una funziona che restituisce un'altra funzione. Redux TLK supporta nativamente questo pattern.

```jsx
// cart-slice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle' },
  // Status: idle ci indica che il carrello è in attesa, ovvero ancora non è successo nulla
  reducers: {
    setStatus(state, action) {
      state.status = action.payload
    },
  },
})

// 👀 Thunk manuale: funzione che ritorna una funzione
// ⚠️ La funzione va esportata, per poter essere uitlizzata nel componente
export const sendCartData = (cart) => {
  // Questa funzione viene eseguita quando dispatchiamo
  return async (dispatch) => {
    // Redux ci passa automaticamente dispatch

    dispatch(cartSlice.actions.setStatus('loading'))

    try {
      const response = await fetch('https://api.example.com/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      })

      if (!response.ok) {
        throw new Error('Failed to send cart data')
      }

      dispatch(cartSlice.actions.setStatus('success'))
    } catch (error) {
      dispatch(cartSlice.actions.setStatus('error'))
      console.error(error)
    }
  }
}

export default cartSlice.reducer
```

A questo punto, nel componente potremo utilizzare la funzione così:

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { sendCartData } from './store/cart-slice'

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return <div>...</div>
}
```

## 2. **createAsyncThunk**: la soluzione standard

`createAsyncThunk` è un _helper_ di Redux TLK che **automatizza** la creazione di un thunk per le operazioni asincrone.

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
// cart-slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const sendCartData = createAsyncThunk(
  'cart/sendData', // 👈 qui, nell'prefisso dell'azione, passiamo il nome dello slice (ad es cart, seguito dal nome dell'azione)
  async (cart, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.example.com/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      })

      if (!response.ok) {
        throw new Error('Failed to send cart data')
      }

      const data = await response.json()
      return data // diventa action.payload in fulfilled
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addItem(state, action) {
     ...
    },
  },
  // 👀 extraReducers: gestisce le azioni generate da createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(sendCartData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // action.payload contiene i dati ritornati dal thunk
      })
      .addCase(sendCartData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { addItem } = cartSlice.actions
export default cartSlice.reducer
```

A questo punto, nel componente possiamo:

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { sendCartData } from './store/cart-slice'

function App() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(sendCartData(items))
  }, [items, dispatch])

  if (status === 'loading') return <p>Salvando...</p>
  if (status === 'failed') return <p>Errore: {error}</p>

  return <div>Carrello salvato!</div>
}
```

## 3. RTK Query: l'upgrade

RTK Query è **una soluzione completa** per il data fetching e caching, pensata per semplificare i casi tipici per il caricamento dei dati, eliminando la necessità di scrivere a mano la logica di fetching e caching.

Se dovessimo trasformare l'esempio sopra, fatto con l'asyncThunk, faremmo questo:

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api', // definisce il nome della key con cui il reducer generato da createApi verra inserito nello store
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    updateCart: builder.mutation({
      query: (cart) => ({
        url: '/cart',
        method: 'PUT',
        body: cart,
      }),
      invalidatesTags: ['Cart'], // Re-fetch automatico!
    }),
  }),
})

export const { useGetCartQuery, useUpdateCartMutation } = apiSlice
```

e poi, nel componente

```jsx
import { useGetCartQuery, useUpdateCartMutation } from './store/api-slice'

function CartComponent() {
  const { data: cart, isLoading, error } = useGetCartQuery()
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation()

  const handleSave = async () => {
    await updateCart(cart)
    // Il carrello viene automaticamente re-fetched! 🎉
  }

  if (isLoading) return <p>Caricamento...</p>
  if (error) return <p>Errore: {error.message}</p>

  return (
    <div>
      {/* Usa cart.items */}
      <button onClick={handleSave} disabled={isUpdating}>
        Salva
      </button>
    </div>
  )
}
```

☝️ Con RTK Query bisogna aggiustare il setup dello store

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api-slice'
import cartReducer from './cart-slice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Aggiungi l'API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Importante!
})
```

`[apiSlice.reducerPath]: apiSlice.reducer` serve a Redux per sapere dove mettere tutti gli stati dell’API nel store globale:

- `apiSlice` è l'oggetto creato con `createApi()`;
- `apiSlice` reducer è il reducer generato in automatico da RTK che gestisce gli stati di **cache, loading, errori e dati delle nostre query e mutation**;
- `apiSlice.reducerPath` è il nome della chiave (`reducerPath: 'api'`): è come aver scritto `api: apiSlice.reducer`

`middleware: getDefaultMiddleware().concat(apiSlice.middleware)`

Redux Toolkit di default include alcuni middleware (es. redux-thunk) tramite `getDefaultMiddleware()`. RTK Query richiede un middleware aggiuntivo per:

- gestire la cache,

- fare invalidazioni automatiche dei dati (tags),

- aggiornare lo store quando arrivano nuove risposte dalle API.

- apiSlice.middleware è proprio questo middleware.

`concat()` serve a aggiungerlo a quelli di default senza sovrascriverli.

Senza questo middleware, RTK Query non sarebbe in grado di aggiornare la cache automaticamente e di triggerare i re-render dei componenti React quando cambiano i dati.
