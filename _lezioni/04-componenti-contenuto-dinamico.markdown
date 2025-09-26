---
layout: post
title: '#04.I contenuti dinamici'
categories: lezioni
excerpt: 'Come gestire il contenuto dinamico nei componenti React'
featured_image: /assets/images/contenuti_dinamici.webp
---

Nel nostro primo componente abbiamo inserito del contenuto statico, ovvero del testo fisso che non cambia mai.
In una vera applicazione, però, il contenuto di un componente spesso deve essere **dinamico**, ovvero deve poter cambiare in base a vari fattori, come ad esempio:

- Dati provenienti da un server o da un database;
- Input dell'utente;
- Stato dell'applicazione (ad esempio, se l'utente è loggato o no);
- Interazioni dell'utente (ad esempio, clic su bottoni, selezioni, ecc.).

Nel caso del nostro componente `TodoList`, il contenuto della lista delle attività è dinamico perché dipende dalle attività che l'utente aggiunge, completa o rimuove.

In un caso "reale" le task arriverebbero probabilmente da un server o da un database, ma per semplicità in questo esempio le gestiremo direttamente importandole da un file JS.

```
const dummyTasks = [
  {
    id: 1,
    text: 'Comprare il latte',
    status: 'pending',
  },
  {
    id: 2,
    text: 'Portare fuori il cane',
    status: 'done',
  },
  {
    id: 3,
    text: 'Studiare React',
    status: 'pending',
  },
  {
    id: 4,
    text: 'Preparare la cena',
    status: 'pending',
  },
  {
    id: 5,
    text: 'Pagare le bollette',
    status: 'done',
  },
  {
    id: 6,
    text: 'Scrivere email al cliente',
    status: 'pending',
  },
]
export default dummyTasks

```

Importando questo array di oggetti nel nostro componente `TodoList`, possiamo usarlo per generare dinamicamente il contenuto della lista delle attività. Per passari dinamicamente i dati al componente usiamo le **props** e poi mostriamo il risultato tramite le parentesi graffe `{}` in JSX.

```jsx
import React from 'react'
import dummyTasks from '../data/dummyTasks'
function TodoList() {
  return (
    <div>
      <ul>
        {dummyTasks.map((task) => (
          <li key={task.id}>
            {task.text} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList
```
