---
layout: post
title: '#13. Il rendering condizionale in React'
categories: lezioni
excerpt: Come mostrare o nascondere elementi in base a determinate condizioni
featured_image:
---

In React, capita spesso di voler mostrare contenuti diversi in base a determinate condizioni — per esempio, quando un utente clicca su un pulsante o quando un dato è stato caricato dal server.
Questa tecnica si chiama **rendering condizionale (_conditional rendering_)** e rappresenta un concetto fondamentale nello sviluppo di applicazioni.

Se prendiamo ad esempio la nostra app di gestione delle task, potremmo voler mostrare un messaggio speciale quando non ci sono task da completare, oppure visualizzare un'icona accanto alle task completate oppure ancora cambiare il colore di una task in base al suo stato.
Tutto questo si può fare facilmente gestendo lo stato (state).

## Diversi approcci al rendericon condizionale

### 1. **Operatore Ternario**

è un modo conciso per eseguire il rendering di uno dei due elementi in base a una condizione booleana.

```jsx
{
  isLoggedIn ? <LogoutButton /> : <LoginButton />
}
```

oppure

```jsx
{
  isLoggedIn ? <h1>Benvenuto!</h1> : <h1>Per favore, accedi.</h1>
}
```

### 2. **Operatore Logico AND (`&&`)**

è utile quando vogliamo renderizzare un elemento solo se una condizione è vera.

```jsx
{
  isAdmin && <AdminPanel />
}
```

oppure

```jsx
{
  tasks.length === 0 && <p>Nessuna task da mostrare</p>
}
```

### 3. **Variabile intermedia**

Possiamo usare una variabile per memorizzare il componente da renderizzare in base alla condizione.

```jsx
let tabContent = <p>Please select a topic</p>

if (selectedTopic) {
  tabContent = <div>{selectedTopic} content goes here</div>
}

return (
  <div>
    <Menu />
    {tabContent}
  </div>
)
```

### 4. **Funzioni di Rendering**

Per condizioni più complesse, possiamo creare una funzione che restituisce il componente appropriato in base alla logica desiderata.

```jsx
function renderContent() {
  if (isLoading) {
    return <LoadingSpinner />
  } else if (error) {
    return <ErrorMessage />
  } else {
    return <Content data={data} />
  }
}
```

E poi nel JSX:

```jsx
{
  renderContent()
}
```


