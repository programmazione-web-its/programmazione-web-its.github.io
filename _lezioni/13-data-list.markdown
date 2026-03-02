---
layout: post
title: '#14. Il rendering dinamico di liste in React'
categories: lezioni
excerpt: Gestire e mostrare liste di elementi in React
featured_image:
---

{% capture standardcontent %}
Finora abbiamo visto come mostrare contenuti condizionalmente e come applicare stili dinamici.
Ora è il momento di affrontare un’altra esigenza molto comune nello sviluppo di applicazioni React: generare automaticamente liste di elementi basate su dati dinamici.

In molte applicazioni, i dati non sono statici ma provengono da fonti esterne come API, database o input dell'utente. React offre un modo semplice ed efficiente per gestire e visualizzare questi dati sotto forma di liste.

## Renderizzare liste in React

In React, possiamo creare liste di elementi utilizzando il metodo `map()` di JavaScript, che consente di trasformare un array di dati in un array di componenti React.
Supponiamo di avere un array di oggetti che rappresentano delle task:

```jsx
const tasks = [
  { id: 1, title: 'Fare la spesa', completed: false },
  { id: 2, title: 'Pulire la casa', completed: true },
  { id: 3, title: 'Studiare React', completed: false },
]
```

{% endcapture %}
{% capture protips %}

  <h4>Per approfondire</h4>
  - 🔗 [Renderling Lists](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
  - 🔗 [Efficiently Rendering Lists in React: Best Practices and Pro Tips](https://medium.com/@komalshehza)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

Per renderizzare questa lista di task, possiamo usare `map()` all'interno del nostro componente:

```jsx
function TaskList() {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          {task.title}
        </li>
      ))}
    </ul>
  )
}
```

In questo esempio, `tasks.map()` itera su ogni elemento dell'array `tasks` e restituisce un elemento `<li>` per ciascuna task. La proprietà `key` è fondamentale per aiutare React a **identificare in modo univoco** ogni elemento della lista e ottimizzare il rendering.
{% capture highlight %}
☝️ La prop key **non è accessibile** all’interno del componente.
È usata solo da React internamente per tenere traccia degli elementi.
{% endcapture %}
{% include highlight.html content=highlight  %}

## Come funziona map()

- `map()` prende una funzione di callback che viene eseguita per ogni elemento dell’array;
- ogni volta, riceviamo un singolo elemento e possiamo restituire il JSX che vogliamo visualizzare per quell’elemento;
- il risultato finale è un nuovo array di elementi JSX che React può renderizzare.

<!-- {% capture esercizio %}

## 💪 ...ora siamo pronti per lavorare sulla nostra app!

- Recuperiamo il codice della todo list
- facciamo un refactoring dei pulsanti per mostrare le task completate o quelle ancora da fare usando il rendering condizionale:
  - se lo stato è `all`, mostriamo tutte le task;
  - se lo stato è `completed`, mostriamo solo le task completate;
  - se lo stato è `pending`, mostriamo solo le task ancora da fare.

{% endcapture %}

{% include exercise_box.html content=esercizio %} -->
