---
layout: post
title: '#17. React Fragment: evitare div inutili'
categories: lezioni
excerpt: Cosa sono i Fragment in React, perché JSX richiede un unico elemento radice e come evitare i div inutili con `<>...</>`
featured_image:
---

{% capture standardcontent %}
Lavorando con React ti sarà capitato di voler restituire più elementi affiancati da un componente.
Proviamo:

```jsx
export default function Saluto() {
  return (
    <h1>Ciao!</h1>
    <p>Benvenuto in React.</p>
  )
}
```

Questo codice produce un errore:

```
SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag.
Did you want a JSX fragment <>...</>?
```

**Perché?** JSX non è HTML: viene trasformato in chiamate JavaScript.
`<h1>Ciao!</h1>` diventa `React.createElement('h1', null, 'Ciao!')`, e una funzione JavaScript può restituire **un solo valore**, non due.

La soluzione "ovvia" è avvolgere tutto in un `<div>`:

```jsx
export default function Saluto() {
  return (
    <div>
      <h1>Ciao!</h1>
      <p>Benvenuto in React.</p>
    </div>
  )
}
```

Funziona, ma introduce un elemento `<div>` nel DOM che spesso non vogliamo, perché:

- inquina la struttura HTML semantica;
- può rompere layout CSS che dipendono dalla gerarchia degli elementi (es. flexbox, grid);
- aggiunge nodi inutili ispezionando il DOM.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Fragment: doc ufficiale](https://react.dev/reference/react/Fragment)
  - 🔗 [Perché JSX richiede un unico elemento radice](https://react.dev/learn/writing-markup-with-jsx#why-do-multiple-jsx-tags-need-to-be-wrapped)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## La soluzione: React Fragment

React offre un componente speciale chiamato **Fragment** che fa da contenitore invisibile: raggruppa più elementi senza aggiungere nessun nodo al DOM.

Esistono due sintassi equivalenti:

### Sintassi estesa

```jsx
import { Fragment } from 'react'

export default function Saluto() {
  return (
    <Fragment>
      <h1>Ciao!</h1>
      <p>Benvenuto in React.</p>
    </Fragment>
  )
}
```

### Sintassi abbreviata (la più comune)

```jsx
export default function Saluto() {
  return (
    <>
      <h1>Ciao!</h1>
      <p>Benvenuto in React.</p>
    </>
  )
}
```

Le parentesi angolari vuote `<>...</>` sono la forma abbreviata di `<Fragment>...</Fragment>`.
Il risultato nel DOM è lo stesso: solo `<h1>` e `<p>`, nessun `<div>` in più.

## Un esempio pratico: righe di una tabella

I Fragment sono particolarmente utili quando un componente deve restituire più righe `<tr>` per una tabella. Usando un `<div>` si romperebbe la struttura HTML:

```jsx
// ❌ Sbagliato: un <div> dentro <tbody> non è HTML valido
export default function RigheUtente() {
  return (
    <div>
      <tr>
        <td>Mario</td>
        <td>Rossi</td>
      </tr>
      <tr>
        <td>Luigi</td>
        <td>Verdi</td>
      </tr>
    </div>
  )
}
```

```jsx
// ✅ Corretto: Fragment non aggiunge nodi al DOM
export default function RigheUtente() {
  return (
    <>
      <tr>
        <td>Mario</td>
        <td>Rossi</td>
      </tr>
      <tr>
        <td>Luigi</td>
        <td>Verdi</td>
      </tr>
    </>
  )
}
```

## Fragment con `key` nelle liste

Quando usi Fragment in un `.map()` e hai bisogno della prop `key`, devi usare la sintassi estesa (la forma abbreviata `<>` non accetta attributi):

```jsx
import { Fragment } from 'react'

const persone = [
  { id: 1, nome: 'Mario', ruolo: 'Designer' },
  { id: 2, nome: 'Luisa', ruolo: 'Developer' },
]

export default function ListaPersone() {
  return (
    <dl>
      {persone.map((persona) => (
        <Fragment key={persona.id}>
          <dt>{persona.nome}</dt>
          <dd>{persona.ruolo}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
```

☝️ Qui `<>` non funzionerebbe perché `<>` non accetta la prop `key`. Usiamo `<Fragment key={...}>`.

{% capture highlight %}

#### 🛠️ Regole pratiche

- Regola di JSX: ogni componente deve restituire **un solo elemento radice**;
- usa `<>...</>` (Fragment abbreviato) ogni volta che non ti serve un elemento HTML reale come contenitore;
- usa `<Fragment key={...}>` solo quando hai bisogno della prop `key` (es. dentro un `.map()`);
- evita il `<div>` di comodo: aggiunge nodi inutili al DOM e può rompere layout CSS.

{% endcapture %}

{% include highlight.html content=highlight %}
