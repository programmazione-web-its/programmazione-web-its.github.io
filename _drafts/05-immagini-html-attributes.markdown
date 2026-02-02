---
layout: post
title: '#05. Immagini e attirbuti HTML dinamici'
categories: lezioni
excerpt: 'Come gestire il caricamento delle immagini e gli attributi HTML dinamici nei componenti React'
featured_image: /assets/images/05.webp
---

In React possiamo gestire in modo dinamico qualsiasi tipo di contenuto, comprese le immagini e gli attributi HTML e lo possiamo fare grazie alla sintassi JSX che ci permette di inserire espressioni JavaScript all'interno del markup HTML.

## Gestire immagini in React

Nella nostra app possiamo naturalmente inserire le immagini in modo statico, come faremmo in un normale file HTML:

```jsx
<img src="/path/to/image.jpg" alt="Descrizione dell'immagine" /> {/* Immagine statica */}
```

Questo però non è il modo migliore per gestire le immagini in React perché:

1. Spesso le immagini arrivano da fonti esterne o da un server, quindi il percorso non è fisso;
2. quando prepariamo il progetto per la distribuzione, il codice viene "compilato" (trasformato e ottimizzato) dal processo di **build** e i percorsi delle immagini potrebbero cambiare e non essere inclusi correttamente nel _bundle_ finale;
3. con il metodo "classico" non possiamo sfruttare alcuni vantaggi legati all'ottimizzazione automatica delle immagini offerte dagli strumenti di compilazione (come Vite)

### Uitilizzare `import` per caricare le immagini

Per gestire correttamente le immagini le **importiamo come moduli**. Ed esempio:

```jsx
import MyImage from './path/to/image.jpg' // Importa l'immagine come modulo
function MyComponent() {
  return (
      <img src={MyImage} alt="Descrizione dell'immagine" />{' '}
  )
}
```

In questo modo:

- Importiamo l'immagine come se fosse una variabile JS. Nel nostro esempio `MyImage`;
- grazie al processo di build, che gestisce anche JSX e CSS importati, l'immagine verrà inclusa correttamente nel _bundle_ finale;
- possiamo usare la variabile `MyImage` come valore dinamico per l'attributo `src` dell'elemento `<img>`, racchiudendola tra parentesi graffe `{}`.

{% capture highlight %}
☝️ Da ricordare:

- Le parentsi graffe `{}` in JSX indicano che stiamo inserendo valori dinamici o, più in generale, un'espressione JavaScript;
- **NON** vanno usate le virgolette `""` quando usiamo le parentesi graffe, perché in quel caso staremmo passando una stringa letterale (statica) e non il valore della variabile.

```jsx
 <img src="{MyImage}" alt="Descrizione dell'immagine" /> // ❌ ERRORE
 <img src={MyImage} alt="Descrizione dell'immagine" /> // ✅  CORRETTO
```

- in generale, qualsiasi attributo HTML che vogliamo valorizzare in modo dinamico (ad esempio `className`, `href`, `title`, ecc.) va racchiuso tra parentesi graffe `{}`.

{% endcapture %}

{% include highlight.html content=highlight  %}
