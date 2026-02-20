---
layout: post
title: '#09. Passare funzioni come Props in React'
categories: lezioni
excerpt: Come passare funzioni come Props in React
featured_image:
---

In React, per gestire gli eventi usiamo delle proprietà native della libreria come `onClick`, `onChange`, `onDrag`, `onFocus`, etc. Queste proprietà accettano come valore una funzione che verrà eseguita quando quel particolare evento si verificherà.

Per fare in modo che il componente riceva la funzione possiamo passarla alle Props in questo modo:

```jsx
export default function Button({ onButtonClick, children }) {
  return <button onClick={onButtonClick}>{children}</button>
}
```

In questo modo la funzione che gestisce il click non è interna al componente ma arriva dall'esterno e può essere diversa ad ogni utilizzo dello stesso componente:

```jsx

function sayHello() {
  alert('Hello')
}
function sayGoodbye() {
  alert('Goodbye')
}

<Button onButtonClick={sayHello}>Say Hello</Button>
<Button onButtonClick={sayGoodbye}>Say Goodbye</Button>
```

In questo modo:

- Il componente Button sa solo “quando il pulsante viene cliccato, eseguo la funzione che mi è stata passata”;
- non deve conoscere i dettagli di cosa succede quando l’evento si verifica;
- la funzione passata può fare qualsiasi cosa: aggiornare lo stato, modificare il contenuto, inviare dati a un server, ecc.

{% capture highlight %}
☝️ Possiamo passare una funzione a qualsiasi porprietà del componente, non solo a quelle che gestiscono gli eventi.
{% endcapture %}
{% include highlight.html content=highlight  %}

## Passare argomenti alla funzione

A volte può essere utile passare degli argomenti alla funzione che gestisce l'evento. Per farlo, invece di passare direttamente la funzione, possiamo usare una funzione anonima (arrow function) che chiama la funzione desiderata con gli argomenti necessari:

```jsx
function sayHello(name) {
  alert(`Ciao, ${name}!`)
}
<Button onButtonClick={() => sayHello('Alice')}>Saluta Alice</Button>
<Button onButtonClick={() => sayHello('Marco')}>Saluta Bob</Button>
```

In questo modo, quando il pulsante viene cliccato, la funzione anonima viene eseguita e a sua volta chiama `sayHello` con l'argomento specificato.

{% capture esercizio %}

## 💪 Aggiungiamo un parametro alle funzioni

- Riprendiamo le nostre funzioni `showCompleted` e `showPending` create nella lezione sugli eventi;
- Modifichiamole in modo che accettino un parametro `type` (stringa);
- Passiamo un messaggio diverso a seconda del bottone cliccato. Ad esempio:
  - `showCompleted('completed')` per il bottone delle task completate;
  - `showPending('pending')` per il bottone delle task non completate.
- Stampiamo in console il messaggio ricevuto come parametro;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
