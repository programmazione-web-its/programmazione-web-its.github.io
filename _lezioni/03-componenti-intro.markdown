---
layout: post
title: '#03. I componenti'
categories: lezioni
excerpt: 'Cosa sono i compnenti e come si usano'
featured_image: /assets/images/03.web
---

<img class="img-full-width" src="/assets/images/03.webp" alt="Lego brics, react component" />

# Cosa sono i componenti?

Uno degli elementi fondamentali di React sono i **componenti**, ovvero sono dei blocchi potenzialmente riutilizzabili che permettono di costruire l'interfaccia utente in modo modulare e organizzato.

Di fatto, le applicazioni React sono costruite **combinando componenti**, ognuno dei quali gestisce una parte specifica della UI.

Naturalmente, l'idea di immaginare le interfacce utente come una combinazione di componenti non è esclusiva di React ma è un concetto comune in molti framework e librerie moderne per lo sviluppo web, come Vue.js, Angular, Svelte, ecc.
<br/>
<br/>
![screenshot](/assets/images/screenshot_goolge.webp)
<br/>
<br/>

## Perché usare i componenti?

L'idea alla base di un qualsiasi componente è quella di mettere insieme **struttura (HTML)**, **stile (CSS)** e **comportamento (JavaScript)** in un unico blocco riutilizzabile. Insieme questi tre elemento definiscono e controllano l'aspetto e il funzionamento del componente e, di conseguenza, una parte della UI.
Questo ci consente di suddividere interfacce complesse in parti più piccole, più facilmente gestibile e potenzilamente riutilizzabili.

<p class="img-group"><img src="" class="img-medium" src="/assets/images/component.webp" alt="Componenti React" />
<img src="" class="img-medium" src="/assets/images/component-layout.webp" alt="Componenti React" /></p>

Se non usassimo i compnenti dovremmo gestire file HTML, CSS e JavaScript separati, il che può diventare rapidamente complicato e difficile da mantenere, soprattutto in applicazioni complesse.

### I tre motivi principali per usare i componenti:

1. **Sono riutilizzabili**: ci permetteono di creare piccoli blocchi di codice e costruire la UI combinandoli in modi diversi;
2. **Il codice correlato è raggruppato**: HTML, CSS e possibilmente JS relativi al singolo componente sono raggruppati nello stesso file o nella stessa sezione;
3. **Separazione delle responsabilità**: componenti diversi gestiscono logica e dati diversi e si occupano di uno specifico elemento della UI, rendendo il codice più facile da capire, modificare e mantenere.

## 🧬 Anatomia di un componente

Un componente React è una funzione JS che restituisce un pezzo di UI in JSX (una sintassi speciale che permette di scrivere HTML all'interno di JavaScript) e lo fa in maniera **dichiarativa**, ovvero specificando **cosa** deve essere mostrato, non **come**.

L'estensione dei file che contengono i componenti è solitamente `.jsx` o ( `.js`).
Ecco un esempio di un semplice componente React:

```jsx
// MyFirstComponent.jsx
function MyComponent() {
  // Definisce il componente come una funzione
  return (
    // Restituisce il JSX che rappresenta la UI del componente
    <div>
      {/* Struttura HTML del componente */}
      <h1>Hello, world!</h1> {/* Titolo */}
      <p>This is my first React component.</p> {/* Paragrafo */}
    </div>
  )
}
export default MyComponent // Esporta il componente per poterlo usare in altri file
```

☝️ Di fatto, un componente React è semplicemente una funzione JavaScript che restituisce del JSX. Questa funziona, però, **deve seguire due regole:**

1. Il nome della funzione deve **iniziare** con la **lettera maiuscola** (PascalCase);
2. la funzoine deve **restituire** sempre un valore "renderizzabile" da React, come un elemento JSX, `null` o un booleano.

{% capture esercizio %}

## 💪 La nostra prima app React

- Crea il progetto in locale, chiamalo "to-do-list";
- Fai partire il progetto con `npm run dev`;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
<br/>
<br/>

## Come React gestisce i componenti e come viene generato il _Component Tree_

Quando creiamo un componente React personalizzato, è utile capire come il suo contenuto arrivi effettivamente sullo schermo.
Aprendo il sito e ispezionando il codice HTML generato, notiamo che lì non compaiono l’intestazione, le immagini o altri contenuti del sito ma solo alcuni metadati e almeno un file JavaScript caricato. Quel file è **l’entry point** della nostra applicazione (ad esempio index.jsx), che contiene il codice React **già trasformato in una versione che il browser può eseguire.**

Guardnado il file `index.jsx` di un'applicazione React notiamo in effetti che è molto semplice: contiene solo la struttura di base e un elemento `<div id="root"></div>`.

A partire da questo punto, React prende in mano il **rendering** dell’applicazione.

Dentro `index.jsx` viene importato il componente principale (`App.jsx`). Poi, usando la libreria **React DOM**, quel componente viene reso sullo schermo:

- si usa `createRoot()` per creare una "radice React" partendo da un elemento HTML già esistente, il `div#root`;

- poi si chiama render(`<App />`), che dice a React di **montare il componente** App dentro quel div.

Da qui parte la costruzione di tutto l’albero dei componenti:

- React **esegue la funzione del componente** App e legge il JSX che restituisce;
- se dentro App ci sono altri componenti (come `Header` o `Main`), anche questi vengono eseguiti e restituiscono a loro volta JSX.

Alla fine, React **raccoglie e combina** tutto questo codice JSX e lo **traduce in elementi HTML reali**, che vengono **inseriti nel DOM** e visualizzati sullo schermo.

☝️ Nel DOM reale vedremo solo elementi nativi come `<div>`, `<header>`, `<h1>`, `<img>` ecc. e non i componenti React come `<App />` o `<Header />`, che esistono solo nel codice JavaScript. Questo è il motifvo per cui i nomi dei componenti React iniziano con la lettera maiuscola: per distinguerli dagli elementi HTML nativi, che invece iniziano con la lettera minuscola.

Il risultato finale è un **albero dei componenti** (Component Tree): una **gerarchia di componenti** che restituiscono JSX, che React trasforma e inietta nel DOM reale.

<div style="background-color: black; padding: 2rem; margin: 2rem auto"><img class="img-full-width" src="/assets/images/render_tree.png" alt="Component Tree" /></div>

{% capture esercizio %}

## 💪 Aggiungiamo il nostro primo componente

- Crea un nuovo file chiamato `TodoItem.jsx` dentro la cartella `src`;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
