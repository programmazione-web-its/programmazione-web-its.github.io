---
layout: post
title: '#25. Context API'
categories: lezioni
excerpt: Cos'è la Context API e come si usa
featured_image:
---

{% capture standardcontent %}

La Context API è una funzionalità integrata in React che semplifica la condivisione di dati tra componenti, indipendentemente dal loro livello nella gerarchia e ci permette di ovviare al problema del _props drilling_ in maniera efficiente.

L’idea alla base della Context API è semplice:

- si crea un **contesto (_context_)** che contiene un determinato valore (ad esempio, un tema, un utente autenticato, una lingua, o uno stato globale);

- questo contesto viene poi **fornito (_provided_)** a una parte o a tutta l’applicazione, **avvolgendo** i componenti interessati con un **provider**;

- infine, qualsiasi componente all’interno di quell’albero può **accedere (_consume_)** a quei dati senza doverli ricevere tramite props.

Un altro aspetto importante è che il **valore del contesto** può essere **collegato a uno stato React**. Ciò significa che possiamo gestire e aggiornare lo stato centralmente, rendendolo **immediatamente disponibile** a tutti i componenti che ne fanno uso.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Props drilling e Context API](https://react.dev/learn/passing-data-deeply-with-context)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

In altre parole:

- non dobbiamo più passare manualmente lo stato e le funzioni di aggiornamento attraverso vari livelli di componenti;

- qualsiasi componente che ha bisogno di leggere o modificare lo stato può semplicemente “attingere” dal contesto.

La **Context API** rappresenta quindi una soluzione potente e pulita per gestire dati condivisi in un’app React.

## Come si crea il contesto (context)

1. È buona prassi creare una cartella dedicata ai _context_: questa cartella può chiamarsi ad esempio `store` e la creiamo all'interno della cartella `src`.
   All'interno della cartella `store` creiamo un nuovo file `jsx` per ciascuno dei context che ci potrebbero servire. Ad esempio, per la nostra app _FAKESHOP_ potremmo creare un file `cart-context.jsx`.

{% capture highlight %}

☝️ Il nome `store` non è obbligatorio, ma è una convenzione comune in molte applicazioni React. L’idea è che questa cartella conservi i file che gestiscono lo stato globale e i dati condivisi dell’applicazione.
Anche il nome del file del contesto è a libera scelta, aggiungere _context_ alla fine è solo una convenzione utile a ricordare che il file definisce e gestisce un Context di React.

{% endcapture %}

{% include highlight.html content=highlight  %}

2. All'interno del nostro file del Context, dobbiamo creare il contesto con `createContext()`

```jsx
import { createContext } from 'react'

const CartContext = createContext({
  items: [],
})

export default CartContext
```

☝️ Nell'esempio qui sopra stiamo creando un contesto chiamato `CartContext` a cui passiamo un valore iniziale: un oggetto con una proprietà `items`, che rappresenta un array vuoto. Questo valore iniziale sarà **accessibile a tutti** i componenti che consumeranno il contesto.
Il nostro context andrà esportato, per poter essere utilizzato nell'app

{% capture highlight2 %}
🔍 Il valore che forniamo a `createContext()` può essere di qualsiasi tipo: un numero, una stringa, un array o un oggetto.
Spesso si utilizza un oggetto, così da poter aggiungere più proprietà o funzioni man mano che l’app cresce.
{% endcapture %}

{% include highlight.html content=highlight2  %}

3. A questo punto dobbiamo fornire il contesto ai componenti che dovranno accedervi. Per farlo, React ci mette a disposizione un **Provider**, che fa parte dell'oggetto creato con `createContext()`.
   Tornando al nostro esempio, `CartContext` contiene una proprietà chiamata `.Provider,` che è a tutti gli effetti un componente React.
   Possiamo utilizzarlo per “avvolgere” i componenti che devono avere accesso al contesto.

```jsx
import CartContext from './store/cart-context'

function App() {
  const cartContextValue = {
    items: [],
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      <Header />
      <Shop />
    </CartContext.Provider>
  )
}
```

Qui, `CartContext.Provider` fornisce il valore `cartContextValue` a tutti i componenti figli, come `Header` e `Shop`.
Qualsiasi componente all’interno di questo wrapper **potrà leggere o modificare** il valore del contesto.

{% capture highlight3 %}
⚠️ `CartContext.Provider` è una **proprietà** del contesto, **non un valore** che abbiamo definito noi.
È React stesso che aggiunge il provider e il consumer al contesto quando lo creiamo.
{% endcapture %}

{% include highlight.html content=highlight3  %}

4. Finalmente, possiamo _consumare_ il contesto (leggerne i valori) all'interno di qualsiasi componente figlio. Per farlo, dobbiamo utilizzare **l'hook `useContext`**

```jsx
import { useContext } from 'react'
import CartContext from '../store/cart-context'

function Cart() {
  const cartCtx = useContext(CartContext)

  return (
    <div>
      <h2>Il tuo carrello</h2>
      <p>Hai {cartCtx.items.length} articoli nel carrello.</p>
    </div>
  )
}
```

`const cartCtx = useContext(CartContext)` ci dà accesso diretto ai dati del contesto, senza passare props da un componente all'altro.
