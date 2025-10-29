---
layout: post
title: '#28. Usare async/await con useEffect in React'
categories: lezioni
excerpt: Gestire operazioni asincrone in React con async/await e useEffect
featured_image:
---

Nel nostro Fakeshop abbiamo usato l'hook `useEffect` per gestire gli effetti laterali (side effects) come le chiamate API. Lo abbiamo fatto usando le **promesse** con il metodo `.then()`, ma spesso è più comodo e leggibile usare la sintassi `async/await`.

⚠️ Tuttavia, dobbiamo fare attenzione perché la funzione passata a `useEffect` **non può essere dichiarata come `async`** direttamente. Questo perché `useEffect` si aspetta che la funzione restituisca **`null` o una funzione di cleanup**, non una promessa.

Non possiamo quindi scrivere questo 👇:

```jsx
useEffect(async () => {
  await fetchData()
}, [])
```

Se proviamo, React ci mostrerà un warning in console segnalandoci che `useEffect` non supporta funzioni asincrone.

### Quindi qual è la soluzione 🤔?

La soluzione è definire una funzione asincrona **all'interno** di `useEffect` e chiamarla subito dopo. Ecco un esempio pratico:

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      // Aggiorna lo stato con i dati ricevuti
      setData(data)
    } catch (error) {
      console.error('Errore nel fetch dei dati:', error)
    }
  }

  fetchData()
}, [])
```

Vediamo cosa succede qui:

- Definiamo una funzione `fetchData` come `async` all'interno di `useEffect`. Possiamo aggiungere `async` perché la funzione non viene gessita direttamente da React;
- usiamo `await` per aspettare la risposta della chiamata `fetch`;
- attendiamo la conversione della risposta in JSON;
- aggiorniamo lo stato con i dati ricevuti;

☝️ La funzione va sempre invocata dopo essere stata definita.

### Possiamo deininire la funzione asincrona fuori da `useEffect`?

Si, possiamo farlo purché non dipenda da variabili di stato o props del componente. In quel caso, infatti, se qualcosa che cambia nel tempo o che dipende da useState o useContext viene usato nella funzione, è meglio definirla dentro `useEffect` per evitare problemi di sincronizzazione e assicurarsi che la funzione abbia accesso ai valori più aggiornati.
cco un esempio di funzion

#### ✅ Qui possiamo definire la funzione asicrona fuori da `useEffect`:

```jsx
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()
  return data
}
useEffect(() => {
  const getData = async () => {
    const data = await fetchData()
    setData(data)
  }

  getData()
}, [])
```

In questo esempio, `fetchData` è definita fuori da `useEffect` e non dipende da nessuna variabile di stato o props. All'interno di `useEffect`, definiamo un'altra funzione asincrona `getData` che chiama `fetchData` e aggiorna lo stato con i dati ricevuti.

#### ❌ Qui **non va bene** definire la funzione asicrona fuori da `useEffect`:

```jsx
const fetchData = async (userId) => {
  const response = await fetch(`https://api.example.com/data?user=${userId}`)
  const data = await response.json()
  return data
}
useEffect(() => {
  const getData = async () => {
    const data = await fetchData(userId) // userId potrebbe essere una variabile di stato o props
    setData(data)
  }

  getData()
}, [userId]) // userId è una dipendenza
```

In questo caso, `fetchData` dipende da `userId`, che potrebbe essere una variabile di stato o una prop. Se `userId` cambia, dobbiamo assicurarci che `fetchData` venga chiamata con il valore aggiornato. Per questo motivo, è meglio definire `fetchData` all'interno di `useEffect` per garantire che abbia accesso al valore più recente di `userId`.
