---
layout: post
title: '#26. Pattern del Provider Component'
categories: lezioni
excerpt: Isolare la logica del context per mantenere il codice pulito e manutenibile
featured_image:
---

## Il Problema della Centralizzazione

Quando si utilizza il Context API di React, è comune iniziare gestendo tutti i dati e la logica direttamente nel componente principale dell'applicazione. Sebbene questo approccio funzioni, presenta alcune criticità:

- Il componente principale diventa sovraccarico di logica;
- con più context nell'applicazione, la complessità aumenta esponenzialmente;
- diversi stati e valori da condividere si accumulano nello stesso posto;
- la manutenibilità del codice diminuisce progressivamente.

## La Soluzione: Pattern del Provider Component

Esiste un pattern alternativo molto diffuso nei progetti React che permette di isolare tutta la logica relativa al Context in **componenti separati**, mantenendo pulito il componente principale.

## Come si implementa il pattern

1. **Creazione del Provider Component**<br/>
   Possiamo creare una nuova cartella e chiamarla, ad esempio,`providers` e al suo interno creare un **componente provider** personalizzato. Questo componente avrà un nome descrittivo che riflette il suo scopo. Ad esempio `CartContextProivder`;

2. **Spostamento della Logica**<br/>
   Tutta la logica precedentemente presente nel componente principale viene trasferita nel provider component:

   - gestione dello stato con gli hook;
   - funzioni per manipolare lo stato;
   - costruzione dell'oggetto valore da condividere tramite context.

3. **Struttura del Provider Component**<br/>
   Il componente provider deve:

   - importare tutti gli hook e le dipendenze necessarie;
   - gestire lo stato e la logica interna;
   - restituire il componente provider del context con la prop value impostata;
   - accettare la prop children e renderizzarla all'interno del provider.
     La struttura sarà simile a questa:

     ```
     Provider Component
     ↓
     Context.Provider (con value)
     ↓
     {children}
     ```

4) **Utilizzo nel componente principale**<br/>
   Nel componente principale:
   - si importa il provider component personalizzato (non più l'oggetto context);
   - si rimuove tutta la logica di gestione dello stato;
   - si utilizza il provider component come wrapper attorno ai componenti che necessitano del context.

## Un esempio pratico:

{% capture col1 %}

### ❌ Direttamente nel componente principale

```jsx
// App.jsx
import { useState } from 'react'
import { DataContext } from './data-context.js'
import Header from './Header.jsx'
import Content from './Content.jsx'

function App() {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)

  function addItem(item) {
    setItems((prevItems) => [...prevItems, item])
  }

  function removeItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function updateUser(userData) {
    setUser(userData)
  }

  const contextValue = {
    items,
    user,
    addItem,
    removeItem,
    updateUser,
  }

  return (
    <DataContext.Provider value={contextValue}>
      <Header />
      <Content />
    </DataContext.Provider>
  )
}

export default App
```

```jsx
// data-context.js
import { createContext } from 'react'

export const DataContext = createContext({
  items: [],
  user: null,
  addItem: () => {},
  removeItem: () => {},
  updateUser: () => {},
})
```

{% endcapture %}
{% capture col2 %}

### ✅ Usando Provider Component

```jsx
// data-context.jsx
import { useState } from 'react'

import { DataContext } from './data-context.js'

export function DataContextProvider({ children }) {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)

  function addItem(item) {
    setItems((prevItems) => [...prevItems, item])
  }

  function removeItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function updateUser(userData) {
    setUser(userData)
  }

  const contextValue = {
    items,
    user,
    addItem,
    removeItem,
    updateUser,
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}
```

```jsx
// App.jsx
import { DataContextProvider } from './providers/DataContextProvider.jsx'
import Header from './Header.jsx'
import Content from './Content.jsx'

function App() {
  return (
    <DataContextProvider>
      <Header />
      <Content />
    </DataContextProvider>
  )
}

export default App
```

{% endcapture %}

{% include comparative_table.html col1=col1 col2=col2  %}
