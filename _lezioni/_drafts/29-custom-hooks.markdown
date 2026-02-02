---
layout: post
title: '#29. Custom Hooks in React'
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

Immaginiamo di avere due componenti e in entrambi dobbiamo gestire uno stato che dipende dalla largezza della finestra del browser. Potremmo fare questo:

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
