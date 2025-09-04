---
layout: post
title: '#01. Introduzione a React'
date: 2025-09-03 16:48:45 +0200
categories: react javascript
excerpt: 'Che cosa è React e perché usarlo'
---

# Che cos'è React?

<img class="img-full-width" src="/assets/images/01.png" alt="React Logo" />

React è una libreria Javascript per creare interfacce utente.<br/>
È stata sviluppata da Facebook (ora Meta) e viene utilizzata per creare applicazioni web di diversa complessità e altamente interattive, in modo efficiente e scalabile.

# Perché si usa?

React si usa perché permette di creare **applicazioni web veloci, fluide e interattive**, che danno all’utente un’esperienza simile a quella di un’app mobile.<br/>

Quando navighiamo su siti sviluppati con React (come Netflix), i **passaggi** tra le varie sezioni avvengono in modo istantaneo, **senza dover ricaricare** l’intera pagina dal server. Questo è possibile perché **React utilizza JavaScript nel browser per aggiornare dinamicamente solo le parti della pagina che cambiano**, senza bisogno di un reload completo.<br/>

In teoria, tutto ciò si potrebbe fare anche con JavaScript “puro” (Vanilla JS), ma sarebbe molto più complicato, ripetitivo ed _error-prone_, soprattutto in applicazioni complesse. React semplifica enormemente questo processo grazie ai **componenti riutilizzabili** e al suo **Virtual DOM**, rendendo lo sviluppo più veloce, ordinato e scalabile.

### Esempi di siti sviluppati con React

- Facebook, Instagram, WhatsApp Web (naturalmente!);
- Netflix;
- Airbnb;
- Discord.

## React vs Vanilla JS: un esempio pratico

Di seguito un esempio di due semplici web app, una sviluppata in Vanilla Js e l'altra in React:

<a href="https://codesandbox.io/p/sandbox/vanilla-js-demo-6049kj" target="_blank">Vanilla JS</a><br/>
<a href="https://codesandbox.io/p/sandbox/react-vs-vanilla-demo-uc08fv" target="_blank">React</a>

Entrambe fanno la stessa cosa: mostrano delle tab con dei contenuti, e quando clicchiamo su una tab, il contenuto cambia dinamicamente senza ricaricare la pagina ma, naturalmente, lo fanno in maniera diversa.

{% capture highlight %}
Una delle più importanti differenze tra React e Vanilla Js sta nel fatto che React è **dichiariativo**, mentre Vanilla Js è **imperativo**.
{% capture col1 %}

### ![Logo React](/assets/images/React-icon.svg.png) React

- Definiamo lo **stato finale** desiderato dell'interfaccia utente (ad esempio, quale tab è attiva e quale contenuto mostrare);
- React si occupa **automaticamente** di aggiornare il DOM e rendere l'interfaccia coerente con quello stato;
- Questo rende il codice più semplice, leggibile e meno soggetto a errori.
  {% endcapture %}
  {% capture col2 %}

### ![Logo JS](/assets/images/javascript-logo.png) Vanilla Js

- Dobbiamo definire **tutti i passaggi** necessari per aggiornare il DOM (ad esempio, aggiungere/rimuovere classi CSS, mostrare/nascondere contenuti, ecc.);
- Questo rende il codice più complesso, verboso e più soggetto ad errori, soprattuto per interfacce complesse.

{% endcapture %}

{% include comparative_table.html col1=col1 col2=col2  %}

{% endcapture %}

{% include highlight.html content=highlight  %}

{% capture esercizio %}

## 💪 Esercizio di riscaldamento

- Scarica la repository da qui 👉 [React-001](https://github.com/programmazione-web-its/react-001)
- Installa l'app seguendo le istruzioni del `README.md`
- Aggiungi un nuovo elenco all'array `content` nel file `App.js` in questo modo:

  ```js
  [
    'lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    ...
  ]
  ```

- Aggiungi un quarto bottone alla lista delle tab, in modo che quando viene cliccato, mostri il nuovo elenco di contenuti.

{% endcapture %}

{% include exercise_box.html content=esercizio %}
