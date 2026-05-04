---
layout: post
title: '#27. Usare async/await con useEffect in React'
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

In questo esempio, `fetchData` è definita fuori da `useEffect` e non dipende da nessuna variabile di stato o props. All'interno di `useEffect`, definiamo un'altra funzione asincrona `getData` che chiama `fetchData` e aggiorna lo stato con i dati ricevuti.git

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

---

{% capture esercizio %}

## 💪 Da `.then()` ad `async/await`

Converti una chiamata API scritta con `.then()` in `async/await`:

Parti da questo codice con `.then()`:

```jsx
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((res) => res.json())
    .then((data) => setPost(data))
    .catch((err) => console.error(err))
}, [])
```

- Crea un componente `PostDetail` con uno stato `post` inizializzato a `null`;
- Riscrivi l'`useEffect` usando `async/await`: definisci una funzione asincrona `fetchPost` all'interno dell'effetto e chiamala subito dopo;
- Gestisci eventuali errori con `try/catch`;
- Mostra il titolo e il corpo del post nell'interfaccia, oppure "Caricamento..." se `post` è ancora `null`.

{% endcapture %}

{% include exercise_box.html content=esercizio %}

{% capture esercizio2 %}

## 💪 Lista di utenti con stato di caricamento

Fetcha una lista di utenti da un'API pubblica e mostra uno stato di caricamento:

- Crea un componente `UserList` con due stati: `users` (array vuoto) e `isLoading` (booleano, inizialmente `true`);
- Usa `useEffect` con una funzione asincrona interna per fetchare `https://jsonplaceholder.typicode.com/users`;
- Mentre la richiesta è in corso, mostra il testo "Caricamento utenti...";
- Una volta ricevuti i dati, imposta `isLoading` a `false` e mostra la lista con nome e email di ciascun utente;
- Gestisci gli errori con `try/catch` e, in caso di errore, mostra un messaggio "Errore nel caricamento".

{% endcapture %}

{% include exercise_box.html content=esercizio2 %}

{% capture esercizio3 %}

## 💪 Fetch che dipende da una selezione dell'utente

Crea un componente che fetcha dati diversi in base alla scelta dell'utente, con `async/await` e dipendenze nell'array di `useEffect`:

- Crea uno stato `selectedId` con `useState(1)` e uno stato `post` con `useState(null)`;
- Mostra una serie di pulsanti (da 1 a 5) che aggiornano `selectedId` al click;
- Usa `useEffect` con `selectedId` nell'array delle dipendenze per fetchare il post corrispondente da `https://jsonplaceholder.typicode.com/posts/[selectedId]`;
- Definisci la funzione `async` all'interno di `useEffect` (perché dipende da `selectedId`);
- Ogni volta che l'utente cambia selezione, il post si aggiorna automaticamente; mostra titolo e corpo del post corrente.

{% endcapture %}

{% include exercise_box.html content=esercizio3 %}
