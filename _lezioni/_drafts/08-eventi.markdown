---
layout: post
title: '#08. Gli eventi in React'
categories: lezioni
excerpt: Come gestire gli eventi in React
featured_image:
---

In Vanilla JS per gestire gli eventi si utilizza il metodo `addEventListener`, ad esempio:

```js
document.querySelector('button').addEventListener('click', () => {
  // fai qualcosa al click
})
```

In React, invece, non usiamo codice imperativo ma **dichiarativo** ed evitiamo di interagire direttamente con il DOM perché è React a farlo per noi. Infatti, per "attaccare" l'evento al componente usiamo delle prorietà native della libreria. Nel caso dell'eventi click, ad esempio è `onClick`, ma ce ne sono moltre altre come `onChange`,`onDrag`, `onFocus`, etc.

```jsx
<button onClick={}>TESTO</button>
```

Il valore fornito a queste proprietà **deve essere una funzione** che verrà eseguita quando quel particolare evento si verificherà.
Questa funzione può essere definita all'interno del componente:

```jsx
export default function Button({ children }) {
  function handleClick() {
    // function code
  }
  return <button onClick={handleClick}>{children}</button>
}
```

{% capture highlight %}
☝️ Possiamo dare alle funzioni che gestiscono gli eventi qualsiasi nome, ma di solito è buona pratica chiamarle in modo che riflettano l’evento che gestiscono. Tipicamente si chiamano `handle[NomeEvento]` oppure `[NomeEvento]handler` (es `clickHandler`)

✋ Alla funzione che gestisce l'evento non vanno aggiunge le parentesi perch la funzione **non va eseguita "da noi"** ma va **eseguita da React** allo scatenarsi dell'evento.
{% endcapture %}

{% include highlight.html content=highlight  %}

{% capture esercizio %}

## 💪 Aggiungiamo un evento al Button

- Creiamo due nuovi bottoni:
  - Uno per mostrare le task completate;
  - Uno per mostrare le task non completate;
- Aggiungiamo un evento `onClick` ad entrambi i bottoni;
- Creiamo due funzioni `showCompleted` e `showPending` che stampino un messaggio in console quando i bottoni vengono cliccati.

{% endcapture %}

{% include exercise_box.html content=esercizio %}
