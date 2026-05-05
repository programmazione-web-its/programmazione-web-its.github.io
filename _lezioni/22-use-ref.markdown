---
layout: post
title: "#23. L'hook useRef"
categories: lezioni
excerpt: Manipolare riferimenti a elementi DOM e valori mutabili con l'hook useRef.
featured_image:
---

`useRef` è un hook di React che permette di creare riferimenti ad un valore mutabile che non è parte del ciclo di rendering del componente. Viene comunemente utilizzato per accedere direttamente a elementi DOM o per mantenere valori che persistono tra i render senza causare un nuovo rendering quando cambiano.

Per utilizzare `useRef`, è necessario importarlo da React e poi chiamarlo all'interno del componente funzionale. Ecco un esempio di come utilizzare `useRef` per accedere a un elemento DOM:

```jsx
import { useRef } from 'react'
export default function FocusInput() {
  const inputRef = useRef(null)

  const handleFocus = () => {
    // Accede all'elemento DOM e imposta il focus
    inputRef.current.focus()
  }

  return (
    <div>
      <input
        ref={inputRef}
        type='text'
        placeholder='Clicca il bottone per il focus'
      />
      <button onClick={handleFocus}>Fai il Focus sull'Input</button>
    </div>
  )
}
```

Una volta definito un ref possiamo assegnarlo a un elemento JSX tramite l'attributo `ref`. `ref`, come `key`, è una proprietà speciale di React che non viene passata come prop al componente figlio, ma viene gestita internamente da React stesso.

Quando definiamo un ref stiamo definendo un valore gestito in maniera particolare da React. Questo valore è accessibile tramite la proprietà `current` dell'**oggetto** ritornato da `useRef`. Nel caso di riferimenti a elementi DOM, `current` conterrà il nodo DOM effettivo una volta che il componente è montato.

⚠️ useRef ritorna sempre un **oggetto** e questo oggetto avrà sempre la proprietà `current`, che può essere inizializzata con un valore passato come argomento a `useRef`. Se non viene passato nessun argomento, `current` sarà inizializzato a `null`.

## Quando ha senso usare useRef

`useRef` è utile in diversi scenari, tra cui:

- **Accesso a elementi DOM**: come mostrato nell'esempio sopra, per impostare il focus su un input o per misurare le dimensioni di un elemento;
- **Valori mutabili**: per mantenere valori che non richiedono un rendering quando cambiano, come timer, contatori o stati temporanei;
- **Persistenza tra render**: per conservare dati che devono persistere tra i render senza causare un nuovo rendering.

## Un esempio pratico: tecniche a confronto

{% capture col1 %}

### useRef e lettura diretta del DOM

```jsx
import { useState, useRef } from 'react'
export default function RefInput() {
  const inputRef = useRef(null)
  const [value, setValue] = useState()
  const handleClick = () => {
    setValue(inputRef.current.value)
  }
  return (
    <div>
      <p>Valore: {value}</p>
      <input ref={inputRef} type='text' />
      <button onClick={handleClick}>Mostra Valore</button>
    </div>
  )
}
```

#### Come funziona:

- `useRef` ti dà un riferimento diretto all’elemento DOM;
- React non tiene traccia del valore dell’input: **lo gestisce il browser**;
- leggiamo il valore **solo quando serve** (in questo caso, al click del bottone).

#### Pro:

- meno rendering: React non aggiorna lo stato a ogni battuta;
- utile quando ti serve il valore solo “a richiesta” (es. form submit);
- performance migliori su input molto grandi o numerosi.

#### Contro:

- il valore dell’input non è “controllato” da React;
- validazione, reset o reazione ai cambiamenti diventano complessi.

  {% endcapture %}
  {% capture col2 %}

### useState + onChange

```jsx
import { useState, useRef } from 'react'
export default function RefInput() {
  const [value, setValue] = useState()
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <p>Valore: {value}</p>
      <input onChange={handleChange} type='text' />
    </div>
  )
}
```

#### Come funziona:

- Ogni volta che scrivi qualcosa, `onChange` aggiorna lo stato;
- l’input mostra sempre il valore di name (che vive nello stato React).

#### Pro:

- Il valore è sempre aggiornato nello stato (sincronizzato con il DOM);
- facile da validare, filtrare o resettare;
- è il modo “React standard” per gestire input controllati.

#### Contro:

- Ogni carattere digitato causa un re-render del componente;
- a volte è semplicemente “troppo” se serve solo leggere il valore finale (es. su submit).
  {% endcapture %}

{% include comparative_table.html col1=col1 col2=col2  %}

{% capture highlight %}

#### ☝️ In breve:

- Usa `useRef` quando vuoi solo leggere il valore una tantum (es. su click, su submit).
- Usa `onChange` quando il valore fa parte dello stato dell’app o deve reagire dinamicamente.

{% endcapture %}

{% include highlight.html content=highlight  %}

## 🤔 Ma perché, a questo punto, non posso usare direttamente `querySelector('element)`?

### ⚠️⚠️⚠️ **_React non è il DOM!_** ⚠️⚠️⚠️

React non lavora direttamente sul DOM ma lavora su una copia virtuale, chiamata appunto **Virtual DOM**. Quando scriviamo ad esempio:

```jsx
<input type='text' />
```

React **non crea subito** un vero elemento HTML ma crea un oggetto in memoria che rappresenta quell'elemento e decide poi **come e quando** aggiornarlo nel DOM reale.
Quindi, se provi a fare una query diretta sul DOM (ad esempio con `document.querySelector`), potresti non trovare l'elemento che ti aspetti, perché React potrebbe non aver ancora aggiornato il DOM reale. Potresi invece trovare:

- un elemento obsoleto che non riflette lo stato attuale dell'applicazione;
- o addirittura nessun elemento, se React non lo ha ancora creato.

### React è un maniaco del controllo 👀

<div class="gif-container">
  <div class="tenor-gif-embed" data-postid="4045253626073585579" data-share-method="host" data-aspect-ratio="1" data-width="50%"><a href="https://tenor.com/view/maniacal-laughing-dj-hunts-crazy-laugh-unhinged-laughter-gone-crazy-gif-4045253626073585579">Maniacal Laughing Dj Hunts GIF</a>from <a href="https://tenor.com/search/maniacal+laughing-gifs">Maniacal Laughing GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
  
<div> Vuole essere l'unico ad avere il controllo completo e a gestire il DOM. Se modifichiamo gli elementi direttamente con <code>document.querySelector</code> o con <code>innerHTML</code> React <strong>non lo sa</strong> e quindi al re-render successivo potrebbe:
<ul>
<li>non vedere le modifiche che abbiamo apportato;</li>
<li>sovrascriverle;</li>
<li>oppure produrre comportamenti imprevedibili come perdita di valori, flickering o bug.</li>
</ul>
</div>
</div>

In sostanza, `useRef` è la versione React del `querySelector`: dobbiamo usarlo per accedere ad un nodo del DOM in modo sicuro e sincronizzato con il ciclo di rendering.

<iframe src="https://codesandbox.io/embed/gd4hf5?view=editor+%2B+preview&module=%2Fsrc%2FApp.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="useRef Example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Qui link [https://codesandbox.io/p/sandbox/funny-ellis-gd4hf5?from-embed=](https://codesandbox.io/p/sandbox/funny-ellis-gd4hf5?from-embed=)


### useRef non serve solo per accedere al DOM:
<iframe src="https://codesandbox.io/embed/qq3qz8?view=editor+%2B+preview&module=%2Fsrc%2FApp.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="useRef - cronometri"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Qui link https://codesandbox.io/p/sandbox/useref-cronometri-qq3qz8  
## Forward di Refs ai componenti personalizzati

È possibile passare le Refs ai nostri componenti custom tramite le props:

#### React 19

```jsx
import { useRef } from 'react'

function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />
}

function App() {
  const theRef = useRef(null)
  return <MyInput ref={theRef} />
}
```

#### React <= 18

```jsx
import { forwardRef, useRef } from 'react'

const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})

function App() {
  const ref = useRef(null)
  return <MyInput ref={ref} />
}
```

---

{% capture esercizio %}

## 💪 Focus automatico e scroll

Usa `useRef` per manipolare elementi DOM:

- Crea un componente `SearchBar` con un campo `<input>` e un pulsante "Cerca";
- Usa `useRef` per ottenere il riferimento all'input e, quando si clicca il pulsante, porta il focus sull'input con `.focus()`;
- Aggiungi un secondo pulsante "Vai ai risultati" che fa scorrere la pagina fino a una `<div>` in fondo al componente usando `.scrollIntoView({ behavior: 'smooth' })`;
- Quella `<div>` deve avere il suo riferimento tramite un secondo `useRef`.
  <br/><br/>

## 💪 Form non controllato con useRef

Crea un form di registrazione che legge i valori degli input solo al momento del submit, senza `onChange` e senza `useState` per ogni campo:

- Crea un componente `RegisterForm` con tre campi: nome, email e password;
- Usa un `useRef` per ciascun campo per accedere al valore solo quando l'utente clicca "Registrati";
- Al submit, mostra in console un oggetto `{ nome, email, password }` con i valori letti tramite `.current.value`;
- Aggiungi un pulsante "Reset" che svuota tutti i campi usando i ref (`.current.value = ''`);
- Rifletti: in quale caso preferiresti `useState` + `onChange` a questo approccio?

{% endcapture %}

{% include exercise_box.html content=esercizio %}
