---
layout: post
title: '#03. I componenti'
categories: lezioni
excerpt: 'Cosa sono i compnenti e come si usano'
featured_image: /assets/images/03.webp
---

<img class="img-full-width" src="/assets/images/03.webp" alt="Lego brics, react component" />

# Cosa sono i componenti?

Uno degli elementi fondamentali di React sono i **componenti**, ovvero dei blocchi potenzialmente riutilizzabili che permettono di costruire l'interfaccia utente in modo modulare e organizzato.

Di fatto, le applicazioni React sono costruite **combinando componenti**, ognuno dei quali gestisce una parte specifica della UI.

Naturalmente, l'idea di immaginare le interfacce utente come una combinazione di componenti non è esclusiva di React ma è un concetto comune in molti framework e librerie moderne per lo sviluppo web, come Vue.js, Angular, Svelte, ecc.
<br/>
<br/>
![screenshot](/assets/images/screenshot_goolge.webp)
<br/>
<br/>

## Perché usare i componenti?

L'idea alla base di un qualsiasi componente è quella di mettere insieme **struttura (HTML)**, **stile (CSS)** e **comportamento / interattività (JavaScript)** in un unico blocco riutilizzabile. Insieme questi tre elementi definiscono e controllano l'aspetto e il funzionamento del componente e, di conseguenza, una parte della UI.
Questo ci consente di suddividere interfacce complesse in parti più piccole e potenzilamente riutilizzabili.

<p class="img-group"><img src="" class="img-medium" src="/assets/images/component.webp" alt="Componenti React" />
<img src="" class="img-medium" src="/assets/images/component-layout.webp" alt="Componenti React" /></p>

Se non usassimo i componenti dovremmo gestire file HTML, CSS e JavaScript separati, il che può diventare rapidamente complicato e difficile da mantenere, soprattutto in applicazioni complesse.

### I tre motivi principali per usare i componenti:

1. **Sono riutilizzabili**: ci permetteono di creare piccoli blocchi di codice e costruire la UI combinandoli in modi diversi;
2. **Il codice correlato è raggruppato**: HTML, CSS e possibilmente JS relativi al singolo componente sono raggruppati nello stesso file o nella stessa sezione;
3. **Separazione delle responsabilità**: componenti diversi gestiscono logica e dati diversi e si occupano di uno specifico elemento della UI, rendendo il codice più facile da capire, modificare e mantenere.

## 🧬 Anatomia di un componente

Un componente React è una **funzione JS** che restituisce un pezzo di UI in JSX (una sintassi speciale che permette di scrivere HTML all'interno di JavaScript) e lo fa in maniera **dichiarativa**, ovvero specificando **cosa** deve essere mostrato, non **come**.

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

☝️ Di fatto, un componente React è semplicemente una funzione JavaScript che restituisce del JSX. Questa funzione, però, **deve seguire due regole:**

1. Il nome della funzione deve **iniziare** con la **lettera maiuscola** (<a href="https://www.freecodecamp.org/italian/news/convenzioni-di-nomenclatura-nella-programmazione-camel-snake-kebab-e-pascal-case-spiegati/" target="_blanke">PascalCase</a>);
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

Guardando il file `index.jsx` di un'applicazione React notiamo in effetti che è molto semplice: contiene solo la struttura di base e un elemento `<div id="root"></div>`.

A partire da questo punto, React prende in mano il **rendering** dell’applicazione.

Dentro `index.jsx` viene importato il componente principale (`App.jsx`). Poi, usando la libreria **React DOM**, quel componente viene reso sullo schermo:

- si usa `createRoot()` per creare una "radice React" partendo da un elemento HTML già esistente, il `div#root`;

- poi si chiama render(`<App />`), che dice a React di **montare il componente** App dentro quel div.

Da qui parte la costruzione di tutto l’albero dei componenti:

- React **esegue la funzione del componente** App e legge il JSX che restituisce;
- se dentro App ci sono altri componenti (come `Header` o `Main`), anche questi vengono eseguiti e restituiscono a loro volta JSX.

Alla fine, React **raccoglie e combina** tutto questo codice JSX e lo **traduce in elementi HTML reali**, che vengono **inseriti nel DOM** e visualizzati sullo schermo.

☝️ Nel DOM reale vedremo solo elementi nativi come `<div>`, `<header>`, `<h1>`, `<img>` ecc. e non i componenti React come `<App />` o `<Header />`, che esistono solo nel codice JavaScript. Questo è il motivo per cui i nomi dei componenti React iniziano con la lettera maiuscola: per distinguerli dagli elementi HTML nativi, che invece iniziano con la lettera minuscola.

Il risultato finale è un **albero dei componenti** (Component Tree): una **gerarchia di componenti** che restituiscono JSX, che React trasforma e inietta nel DOM reale.

<div style="background-color: black; padding: 2rem; margin: 2rem auto"><img class="img-full-width" src="/assets/images/render_tree.png" alt="Component Tree" /></div>

## Che cos'è il DOM

Il DOM (Document Object Model) è una rappresentazione ad albero della pagina HTML che il browser costruisce a partire dal codice HTML ricevuto dal server. Ogni elemento HTML (ad es. `<div>`, `<p>`, `<img>`) diventa un nodo nell'albero del DOM: il browser usa questa struttura per sapere cosa mostrare e come rispondere alle interazioni.

Punti chiave sul DOM:

- È un'API fornita dal browser: JavaScript può leggere e modificare il DOM (es. aggiungere elementi, cambiare attributi, ascoltare eventi);
- ogni manipolazione del DOM reale può essere relativamente costosa in termini di prestazioni, specialmente se fatta ripetutamente;
- il DOM è distinto dal codice HTML sorgente: il browser traduce l'HTML in una struttura dati (il DOM) che poi può essere attraversata e modificata via script.

Ora che abbiamo chiaro cos'è il DOM reale, vediamo come React usa una rappresentazione virtuale per limitare le operazioni dirette sul DOM.

## Il Virtual DOM in React

Il Virtual DOM è una **rappresentazione leggera (in memoria)** del DOM reale: React mantiene una **copia virtuale** dell'albero dei componenti per **confrontarla** rapidamente con una nuova versione ogni volta che lo stato o le props cambiano.

Come funziona:

- React esegue la funzione del componente e costruisce un nuovo Virtual DOM (una struttura di oggetti che descrive gli elementi);
- confronta il nuovo Virtual DOM con la versione precedente (operazione chiamata _diffing_);
- calcola le differenze minime necessarie e **applica solo quelle** al DOM reale.

Perché è utile:

- Manipolare il DOM reale è relativamente costoso; riducendo il numero di operazioni effettive migliora le prestazioni percepite.
- il processo di diffing permette a React di **aggiornare solo le parti necessarie** dell'interfaccia.

In sintesi: il Virtual DOM è il meccanismo che permette a React di essere efficiente e dichiarativo, confrontando due rappresentazioni leggere dell'interfaccia e applicando al DOM reale solo le modifiche minime richieste.

{% capture esercizio %}

## 💪 Aggiungiamo il nostro primo componente

- Crea un nuovo file chiamato `TodoItem.jsx` dentro la cartella `src`;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
