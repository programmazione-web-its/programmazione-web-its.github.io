---
layout: post
title: "#27. L'useEffect e gli effetti 'laterali'"
categories: lezioni
excerpt: Gestire gli side effects e le dipendenze  in React con gli hook
featured_image:
---

{% capture standardcontent %}

## Cosa sono i _side effects_

I _side effects_ sono tutte quelle operazioni che **devono essere eseguite per far funzionare correttamente l’applicazione**, ma che **non influenzano** direttamente e immediatamente il ciclo di rendering del componente.

In altre parole, si tratta di compiti che un componente deve svolgere, ma che **non hanno a che fare con la generazione del suo output visivo** (il JSX restituito).

### Un piccolo esempio teorico per capire meglio

Immaginiamo di voler migliorare l'esperienza utente della nostra app "Fakeshop" ordinando i prodotti in base ad un criterio esterno come la data di pubblicazione, il punteggio della recensione oppure un valore qualsiasi proveniente da una API esterna.
Per ottenere questi dati, come le informazioni da un server, dobbiamo eseguiore del codice che interagisce con l'ambiente esterno, ad esempio:

- chiamare un'API REST per scaricare i dati;
- accedere al `localStorage`;
- impostare un timer (`setTimeout`, `setInterval`)

Tutte queste operazioni, nel nostro esempio, potrebbero essere necessarie ma non sarebbero comunque parte del processo di rendering del componente.
Il **compito principale** di un componente React, infatti, è **restituire del JSX renderizzabile**.
Le chiamate di rete, le interazioni con il browser o il caricamento di risorse esterne **non modificano direttamente il JSX**: avvengono **accanto al rendering**.
Ecco perché vengono chiamate _side effects_.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>

- 🔗 [useEffect Hook](https://react.dev/reference/react/useEffect)
- 🔗 [Gestire la sincronizzazione](https://react.dev/learn/synchronizing-with-effects)
- 🔗 [Mastering useEffect](https://medium.com/@greennolgaa/mastering-useeffect-in-react-js-a-comprehensive-guide-709a8024cb60)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## Perché sono _side_ effects?

Di fatto, sono effetti:

- **asincroni**. Ad esempio, una chiamata API o una richiesta al browser impiegano del tempo;
- **avvengono dopo** che il componente ha terminato il proprio ciclo di esecuzione iniziale;
- **non producono cambiamenti immediatamente visibili** ma possono causarli indirettamente, ad esempio aggiornando lo stato con i dati ricevuti.

## Come si gestiscono i _side effects_ in React: l'hook useEffect

React ci mette a disposizione l'hook `useEffect()` per gestire in modo **controllato e sicuro** questi effetti laterali, permettendo di:

- eseguire codice **dopo** che il componente è stato renderizzato;
- reagire ai cambiamenti di stato o di props;
- se necessario, **pulire (cleanup)** gli effetti quando il componente viene smontato o aggiornato.

```jsx
import { useEffect, useState } from 'react'

function ExampleComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Effetto collaterale: chiamata a un’API esterna
    fetch('https://api.example.com/items')
      .then((response) => response.json())
      .then((result) => setData(result))
  }, []) // L’effetto viene eseguito una sola volta al montaggio

  return (
    <div>
      <h1>Elenco degli elementi</h1>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        'Caricamento...'
      )}
    </div>
  )
}
```

## Passare le dipendenze reattive allo useEffect

```jsx
useEffect(
  () => {
    // codice effetto
  },
  [
    /* array di dipendenze */
  ]
)
```

☝️ Quella qui sopra è la sintassi base di un hook `useEffect` e presenta:

- Il codice all'interno dell'hook che è l'effetto da eseguire;
- un array che indica a React **quando** eseguire quel'effetto. React "ascolta" le variabili dentro quell'array e richiama l'effetto solo se cambiano.

Il contenuto delle quadre, ovvero l'array delle dipendenze, serve a **controllare la frequenza di esecuzione** dell'effetto.
Queste variabili si chiamano dipendenze perché è da loro che dipende l'effetto: se una di queste variabili cambia, React sa che l'effetto dev'essere rieseguito.

{% capture highlight %}

### 👀 Regole base:

- Quando l'array è vuoto `[]`, significa che l'effetto non dipende da nulla e va eseguito solo una volta al primo render;
- Quando l'array ha qualche variabile al suo interno `[count]`, `[count, time, data]` l'effetto viene eseguito quando una di quelle variabili cambia;
- Se non c'è nessun array, l'effetto scatta ad ogni render.
  {% endcapture %}
  {% include highlight.html content=highlight  %}

## Il cleanup degli effetti

Immaginiamo questo scenario:

```jsx
useEffect(() => {
  setInterval(() => {
    console.log('Tick!')
  }, 1000)
}, [])
```

<iframe src="https://codesandbox.io/embed/qlw8hh?view=preview&module=%2Fsrc%2FApp.js&hidenavigation=1&expanddevtools=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ecstatic-worker-qlw8hh"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

🧐 Cosa succede?

Cosa succede?

- Il componente monta → parte un interval che stampa "Tick!" ogni secondo;
- il componente si smonta (cambio pagina, navigazione, ecc.);
- ⚠️ l'interval continua a girare! Anche se il componente non c'è più!

Questo è un **memory leak** - il timer resta in memoria e consuma risorse.

Per evitare che questo avvenga si usano le **cleanup function**

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log('Tick!')
  }, 1000)

  // ⬇️ CLEANUP FUNCTION
  return () => {
    clearInterval(intervalId)
  }
}, [])
```

☝️ Il cleanup viene eseguito **quando il componente si smonta** (viene rimosso dal DOM) o **prima di eseguire di nuovo l'effetto** se le dipendenze cambiano.

### Quando serve il cleanup

- Timer (setTimeout/setInterval)

```jsx
useEffect(() => {
  const timerId = setTimeout(() => {
    console.log('Fatto!')
  }, 3000)

  return () => clearTimeout(timerId) // ✅ Cleanup
}, [])
```

- Event listener

```jsx
useEffect(() => {
  function handleClick() {
    console.log('Clicked!')
  }

  window.addEventListener('click', handleClick)

  return () => {
    window.removeEventListener('click', handleClick) // ✅ Cleanup
  }
}, [])
```

- Fetch con [🔗`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

AbortController è un'API del browser che permette di annullare operazioni asincrone, principalmente le richieste fetch.

```jsx
useEffect(() => {
  const controller = new AbortController()

  fetch('/api/data', { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setData(data))

  return () => controller.abort() // ✅ Cleanup
}, [])
```

- Subscriptions (WebSocket, Firebase, ecc.)

```jsx
useEffect(() => {
  const unsubscribe = firebase.onSnapshot(callback)

  return unsubscribe // ✅ Cleanup
}, [])
```

### Quando non serve il cleanup

```jsx
// ✅ Va bene senza cleanup - è solo una lettura
useEffect(() => {
  const saved = localStorage.getItem('theme')
  setTheme(saved)
}, [])

// ✅ Va bene senza cleanup - è solo una scrittura
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])

// ✅ Va bene senza cleanup - modifica solo il DOM
useEffect(() => {
  document.body.className = theme
}, [theme])
```
