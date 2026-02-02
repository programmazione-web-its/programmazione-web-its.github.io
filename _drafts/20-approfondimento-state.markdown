---
layout: post
title: '#20. Derived State: creare valori calcolati a partire dallo stato'
categories: lezioni
excerpt: Come creare valori calcolati a partire dallo stato in React
featured_image:
---

In React, non sempre è necessario mantenere stati separati in ogni componente. Spesso è più efficiente derivare valori dai dati già presenti nello stato, evitando duplicazioni e ridondanza.

## Cos'è il Derived State?

Lo stato derivato (Derived State) si riferisce a valori che possono essere calcolati o derivati da altri stati o props. Invece di memorizzare questi valori come stati separati, possiamo calcolarli al volo durante il rendering del componente.
Ad esempio, supponiamo di avere uno stato che tiene traccia di una lista di attività e vogliamo mostrare il numero totale di attività completate. Invece di mantenere un altro stato per il conteggio delle attività completate, possiamo calcolarlo direttamente dalla lista delle attività.

```jsx
import { useState } from 'react'
export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: true },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: true },
  ])

  // Derived state: calcola il numero di attività completate
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div>
      <h1>Task List</h1>
      <p>Completed Tasks: {completedCount}</p> {/* Mostra il conteggio */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

In questo esempio, `completedCount` è un valore derivato che calcola il numero di attività completate filtrando la lista `tasks`. Non è necessario mantenere `completedCount` come stato separato, poiché può essere calcolato ogni volta che il componente viene renderizzato.

## Vantaggi del Derived State

1. **Evita la ridondanza**: Mantenere stati duplicati può portare a incoerenze e bug. Derivare valori aiuta a mantenere il codice più pulito e facile da mantenere;
2. **migliora le performance**: Calcolare valori al volo può essere più efficiente che aggiornare stati separati, specialmente in applicazioni complesse;
3. **semplifica la logica**: La logica di calcolo è centralizzata, rendendo più facile capire come i valori sono derivati.

## Best practice

- Gestire il minor numero possibile di stati reali;
- derivare tutti gli altri valori dai dati esistenti;
- usare funzioni di calcolo per ottenere stati computati nei componenti figli;
- garantire che le funzioni che aggiornano lo stato ricevano tutti i dati necessari tramite parametri.

{% capture highlight %}

In sintesi: lo stato derivato permette di calcolare ciò che serve dai dati **già presenti**, evitando duplicazioni e rendendo il flusso dei dati più chiaro e prevedibile in React.

{% endcapture %}
{% include highlight.html content=highlight  %}
