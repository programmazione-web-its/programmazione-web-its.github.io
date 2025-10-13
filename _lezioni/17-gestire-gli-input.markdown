---
layout: post
title: '#17. Gestire gli input in React'
categories: lezioni
excerpt: Come gestire gli input e i form in React, con `onChange` e  `useState`
featured_image:
---

{% capture standardcontent %}
Lavorando con gli input in React dobbiamo gestire i valori che l’utente inserisce e farli riflettere nell’interfaccia.
Supponiamo di avere un semplice campo di input testuale:

```jsx
export default function TextInput() {
  return <input type='text' value='Pluto' />
}
```

Se proviamo a modificare il testo nell’input, non succede nulla: il valore rimane sempre "Pluto".
Questo succede perché la prop value rende l’input un **controlled component**, e React controlla ciò che viene mostrato.

Una prima soluzione potrebbe essere quella di inserire un `defaultValue`:

```jsx
export default function TextInput() {
  return <input type='text' defaultValue='Pluto' />
}
```

In questo modo l’input diventa un **uncontrolled component**, e il valore iniziale è "Pluto", ma l’utente può modificarlo liberamente.
Tuttavia, in questo modo non abbiamo modo di sapere quale sia il valore attuale dell’input, perché React non ne tiene traccia.
Per gestire correttamente gli input in React, dobbiamo usare lo stato del componente e l’evento `onChange`.

```jsx
import { useState } from 'react'
export default function TextInput() {
  const [name, setName] = useState('Pluto')

  function handleChange(event) {
    setName(event.target.value)
  }

  return <input type='text' value={name} onChange={handleChange} />
}
```

In questo esempio, usiamo lo stato `name` per tenere traccia del valore dell’input.
La funzione `handleChange` viene chiamata ogni volta che l’utente modifica il testo nell’input, e aggiorna lo stato con il nuovo valore.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [input: doc ufficiale](https://react.dev/reference/react-dom/components/input)
  - 🔗 [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

### Come funziona `onChange`?

1.  Ogni volta che l'utente digita qualcosa nell’input, React chiama la funzione assegnata a `onChange`, nel nostro esempio `handleChange`;
2.  questa funzione riceve un oggetto evento (`event`) come argomento;
3.  il valore inserito dall'utente si trova in `event.target.value`;
4.  usiamo `setName` per aggiornare lo stato con il nuovo valore.

👉 In questo modo l'input diventa **interattivo** e **controllato** ma ora React sa qual è il valore attuale e lo può usare per aggiornare l’interfaccia.

### 🔁 Two-way binding

Questa tecnica è chiamata **two-way binding** perché:

- Da input a stato: prendiamo il valore inseirto dall'utente;
- da stato a input: aggioriniamo l'input con il valore dello stato.
  In questo modo, lo stato e l'input sono sempre sincronizzati.

#### I vantaggi di questo approccio

1. Possiamo usare il valore dell'input in altre parti del componente, ad esempio per mostrare un messaggio di benvenuto:

```jsx
import { useState } from 'react'
export default function TextInput() {
  const [name, setName] = useState('Pluto') // Stato per il nome
  function handleChange(event) {
    setName(event.target.value) // Aggiorna lo stato con il valore dell'input
  }
  return (
    <>
      <input type='text' value={name} onChange={handleChange} />
      <p>Ciao, {name}!</p> {/* Usa il valore dello stato */}
    </>
  )
}
```

2. Possiamo applicare validazioni o trasformazioni al valore inserito in tempo reale, ad esempio convertendo tutto in maiuscolo:

```jsx
import { useState } from 'react'
export default function TextInput() {
  const [name, setName] = useState('Pluto')
  function handleChange(event) {
    setName(event.target.value.toUpperCase()) // Converte in maiuscolo
  }
  return (
    <>
      <input type='text' value={name} onChange={handleChange} />
      <p>Ciao, {name}!</p>
    </>
  )
}
```

3. È scalabile: funziona per più input diversi nello stesso componente usando più `useState`.

```jsx
import { useState } from 'react'
export default function UserForm() {
  const [firstName, setFirstName] = useState('Donald')
  const [lastName, setLastName] = useState('Duck')
  function handleFirstNameChange(event) {
    setFirstName(event.target.value)
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value)
  }
  return (
    <>
      <input
        type='text'
        value={firstName}
        onChange={handleFirstNameChange}
        placeholder='Nome'
      />
      <input
        type='text'
        value={lastName}
        onChange={handleLastNameChange}
        placeholder='Cognome'
      />
      <p>
        Ciao, {firstName} {lastName}!
      </p>
    </>
  )
}
```

{% capture highlight %}

#### 🛠️ Regole pratiche

- Controlled component: usa `value` + `onChange` se vuoi gestire il valore in React;
- initial value statico: usa `defaultValue` solo se non ti serve salvare il valore;
- stato separato per ogni input: ogni campo può avere il suo `useState`;
- gestione dell'evento: sempre `event => setState(event.target.value)` per aggiornare dinamicamente.

{% endcapture %}

{% include highlight.html content=highlight  %}
{% capture esercizio %}

## 💪 Aggiungiamo un campo input alla TodoList

- Creiamo e gestiamo un campo di input per aggiungere nuove attività alla lista;
- Usiamo lo stato per tenere traccia del valore dell'input;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
