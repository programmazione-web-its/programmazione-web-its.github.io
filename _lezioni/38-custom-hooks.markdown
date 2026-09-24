---
layout: post
title: '#37. Custom Hooks in React'
categories: lezioni
excerpt: Riutilizzare la logica di stato e di effetto con i custom hooks in React
featured_image:
---

React ci mette a disposizione diversi hook integrati, come `useState`,`useEffect` o `useContext`. Tuttavia, a volte, potremmo aver bisogno di un Hook personalizzato, per esigenze molto specifiche. Per fortuna, React ci permette di creare i nostri **custom hooks**.

## Cos'è un Custom Hook?

Un Custom Hook è semplicemente una funzione JavaScript il cui nome inizia con **use** e che può chiamare altri Hooks di React al suo interno.

Per creare un Custom Hook, seguiamo queste semplici regole:

1. Il nome del Custom Hook deve iniziare con "use" (ad esempio, `useFetch` o `useLocalStorage`);
2. all'interno del Custom Hook, possiamo utilizzare altri Hooks di React come `useState`, `useEffect`, ecc.;
3. il Custom Hook può restituire qualsiasi tipo di dato, come uno stato, una funzione o un oggetto.

## Perché usare un Custom Hook?

Principalmente, per evitare di ripetere codice. Se abbiamo una logica che viene utilizzata in più componenti, possiamo estrarla in un Custom Hook e riutilizzarla ovunque ne abbiamo bisogno.

## Un esempio per capire meglio

Immaginiamo di avere due componenti e in entrambi dobbiamo gestire uno stato che dipende dalla larghezza della finestra del browser. Potremmo fare questo:

```jsx
// ComponenteA.jsx

function ComponenteA() {
  const [larghezzaFinestra, setLarghezzaFinestra] = useState(window.innerWidth)

  useEffect(() => {
    const gestisciResize = () => {
      setLarghezzaFinestra(window.innerWidth)
    }

    window.addEventListener('resize', gestisciResize)
    return () => window.removeEventListener('resize', gestisciResize)
  }, [])

  return <div>Larghezza: {larghezzaFinestra}px</div>
}

// ComponenteB.jsx

function ComponenteB() {
  const [larghezzaFinestra, setLarghezzaFinestra] = useState(window.innerWidth)

  useEffect(() => {
    const gestisciResize = () => {
      setLarghezzaFinestra(window.innerWidth)
    }

    window.addEventListener('resize', gestisciResize)
    return () => window.removeEventListener('resize', gestisciResize)
  }, [])

  return (
    <div>La finestra è {larghezzaFinestra > 768 ? 'grande' : 'piccola'}</div>
  )
}
```

Invece di duplicare il codice in entrambi i componenti, però, possiamo creare un Custom Hook chiamato `useWindowSize`.

```jsx
// useWindowSize.js
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [larghezzaFinestra, setLarghezzaFinestra] = useState(window.innerWidth)

  useEffect(() => {
    const gestisciResize = () => {
      setLarghezzaFinestra(window.innerWidth)
    }

    window.addEventListener('resize', gestisciResize)
    return () => window.removeEventListener('resize', gestisciResize)
  }, [])

  return larghezzaFinestra
}

export default useWindowSize
```

Una volta creato il Custom Hook, possiamo usarlo nei nostri componenti:

```jsx
// ComponenteA.jsx
import useWindowSize from './useWindowSize'
function ComponenteA() {
  const larghezzaFinestra = useWindowSize()

  return <div>Larghezza: {larghezzaFinestra}px</div>
}
// ComponenteB.jsx
import useWindowSize from './useWindowSize'
function ComponenteB() {
  const larghezzaFinestra = useWindowSize()
  return (
    <div>La finestra è {larghezzaFinestra > 768 ? 'grande' : 'piccola'}</div>
  )
}
```

Un hook personalizzato può restituire anche più valori, ad esempio come un array o un oggetto:

```jsx
function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return { width, height }
}
```

In questo caso, `useWindowSize` restituisce un oggetto con due proprietà: `width` e `height`, che possiamo utilizzare nei nostri componenti.

```jsx
const { width, height } = useWindowSize()
```

## 💪 Esercizi

Gli esercizi che seguono hanno difficoltà diverse: dovrai usare `useState`,`useEffect`, la `Context API` , gestire la persistenza dei dati e le chiamate asincrone.

Qui 👉 [il link alla repository](https://github.com/programmazione-web-its/custom-hooks-esercizi/tree/main) per iniziare.

{% capture esercizio1 %}

## 💪 1. `useToggle`

Nel progetto trovi due componenti già pronti, `Faq` e `ThemeSwitcher`, che gestiscono entrambi un valore booleano con `useState` e lo invertono al click. La logica è la stessa: estraila in un custom hook `useToggle`.

- Crea il file `hooks/useToggle.js`: l'hook riceve un valore iniziale (di default `false`) e restituisce un **array** con il valore corrente e una funzione `toggle` che lo inverte;
- Modifica `Faq` e `ThemeSwitcher` in modo che usino `useToggle` al posto di `useState`: il comportamento dei componenti deve restare identico;
- Inserisci nella pagina **due** componenti `Faq` e verifica che ognuno abbia il proprio stato indipendente: aprire una risposta non deve aprire anche l'altra;
- In `ThemeSwitcher`, sposta il `<div>` di testo in un componente separato `Content` e crea anche un componente `Footer`, da inserire nella pagina **fuori** da `ThemeSwitcher`. Il tema deve essere unico per tutta l'app: cliccando il pulsante ☀/☾, sia `Content` che `Footer` devono cambiare colori.

{% endcapture %}
{% include exercise_box.html content=esercizio1 %}

{% capture esercizio2 %}

## 💪 2. `useCounter`

Crea un custom hook `useCounter` che gestisca un contatore configurabile:

- L'hook riceve un oggetto di opzioni `{ initialValue = 0, step = 1, min, max }` e restituisce un **oggetto** con `count`, `increment`, `decrement` e `reset`;
- `increment` e `decrement` devono aggiungere/sottrarre `step` senza mai superare `max` o scendere sotto `min` (se sono stati passati), aggiornando lo stato con la forma funzionale di `setCount`;
- `reset` riporta il contatore a `initialValue`;
- Usa l'hook in un componente `ProductQuantity` (quantità da 1 a 10, step 1) e in un componente `VolumeControl` (volume da 0 a 100, step 10), disabilitando i pulsanti `+` e `-` quando si raggiunge il limite.

{% endcapture %}
{% include exercise_box.html content=esercizio2 %}

{% capture esercizio3 %}

## 💪 3. `useLocalStorage`

Crea un custom hook `useLocalStorage` che funzioni **come `useState`**, ma che salvi automaticamente il valore in `localStorage`:

- L'hook riceve una `id` e un `initialValue` e restituisce un array `[value, setValue]`, esattamente come `useState`;
- Al primo render, se in `localStorage` esiste già un valore per quella chiave, deve essere usato come stato iniziale (ricorda `JSON.parse`); altrimenti si usa `initialValue`. Suggerimento: passa una **funzione** a `useState` per leggere `localStorage` solo al primo render;
- Con `useEffect`, salva il valore in `localStorage` (con `JSON.stringify`) ogni volta che cambia;
- Usa l'hook per creare un componente `NotesApp` in cui l'utente può aggiungere note testuali tramite un form controllato ed eliminarle: ricaricando la pagina, le note devono essere ancora presenti;

{% endcapture %}
{% include exercise_box.html content=esercizio3 %}

{% capture esercizio4 %}

## 💪 4. `useFetch`

Crea un custom hook `useFetch` che gestisca il recupero di dati da un'API:

- L'hook riceve un `url` e restituisce un oggetto `{ data, loading, error }`;
- All'interno di un `useEffect` (con dipendenza `[url]`), esegui la chiamata con `fetch` e `async/await`: imposta `loading` a `true` prima della richiesta e a `false` al termine, sia in caso di successo che di errore;
- Gestisci gli errori con `try/catch`, controllando anche `response.ok` (una risposta 404 non genera un'eccezione da sola!);
- Usa l'hook in un componente `UserList` che mostra l'elenco degli utenti da `https://jsonplaceholder.typicode.com/users`, con un messaggio "Caricamento..." durante l'attesa e un messaggio di errore se qualcosa va storto (prova a sbagliare apposta l'URL);
- Crea poi un componente `UserPosts` con un `<select>` per scegliere un utente: al cambio di selezione, usa `useFetch` con l'URL `https://jsonplaceholder.typicode.com/posts?userId=ID` per mostrare i post di quell'utente;

{% endcapture %}
{% include exercise_box.html content=esercizio4 %}
