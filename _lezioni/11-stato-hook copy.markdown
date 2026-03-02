---
layout: post
title: '#12. Lo stato (State) in React con gli Hook'
categories: lezioni
excerpt: Come gestire lo stato (state) in React con gli Hook
featured_image:
---

## Una premessa importante

In React, aggiornare una semplice variabile **non provoca automaticamente un aggiornamento** dell’interfaccia.
Questo perché i componenti funzione vengono **eseguiti** solo quando React li incontra per **la prima volta** o quando c’è un **motivo specifico** per rieseguirli.

Se modifichiamo una variabile dentro a un componente, il suo nuovo valore non viene preso in considerazione dal JSX già renderizzato: React non ricalcola l’interfaccia perché non sa che deve farlo. Di conseguenza, la **UI continua a mostrare il valore iniziale.**

Per forzare React a rieseguire il codice del componente e confrontare il nuovo output con quello precedente, dobbiamo usare lo **state.**

Lo state è il meccanismo con cui React “ricorda” i valori che possono cambiare nel tempo e, soprattutto, sa che quando questi valori vengono aggiornati deve ridisegnare il componente.

In sintesi:

- Le variabili normali non influenzano il rendering;
- lo state, invece, notifica a React che c’è stato un cambiamento e fa sì che la UI si aggiorni di conseguenza.

## Lo State e gli Hook

Lo _state_ permette di **registrare dei valori speciali** gestiti da React, che si aggiornano tramite una funzione fornita direttamente da React. Quando questa funzione viene chiamata, non solo cambia il valore memorizzato, ma avvisa anche React che il componente deve essere rieseguito, così da **aggiornare la UI.**

Per creare e gestire lo state si usa l’**Hook `useState`**, che va **importato dalla libreria `React`**.

```jsx
import { useState } from 'react'
```

Gli Hook in generale sono funzioni particolari (quelle che **iniziano con use**) che possono essere chiamate solo:

- all’interno di componenti React;
- oppure all’interno di altri Hook personalizzati.

In più, vanno chiamati sempre al livello superiore della funzione del componente, non dentro cicli, condizioni o funzioni annidate.

`useState` si usa passando un **valore iniziale**: React lo salva e lo utilizza quando il componente viene renderizzato per la prima volta. In cambio, `useState` restituisce un array con due elementi:

1. lo **stato corrente** (il valore “ricordato” da React per quel ciclo di rendering);
2. una **funzione per aggiornare** quello stato.

```jsx
const [value, setValue] = useState(initialValue)
```

La convenzione è chiamare il primo elemento con il nome del dato (es. `value`) e il secondo con `setValue`. La prima variabile contiene lo snapshot dello stato in quel preciso rendering, la seconda serve ad aggiornare il valore e a dire a React di rieseguire il componente.

È importante notare che **l’aggiornamento non è immediato** nel codice dove viene chiamata la funzione di update: React **programma il nuovo rendering**, e il valore aggiornato sarà disponibile solo alla **successiva esecuzione del componente.**

{% capture highlight %}
☝️ In sintesi: lo state è il modo in cui React gestisce dati che cambiano nel tempo e che devono riflettersi sull’interfaccia. È il concetto fondamentale che rende possibile costruire interfacce dinamiche e interattive.
{% endcapture %}
{% include highlight.html content=highlight  %}
{% capture esercizio %}

## 💪 Mostriamo le task filtrate per tipo

A questo punto possiamo mostrare in modo condizionale le task completate e quelle ancora da fare, usando lo state per tenere traccia di quale filtro è attivo.
Ragioniamo insieme su come potremmo fare

{% endcapture %}

{% include exercise_box.html content=esercizio %}

<!-- {% capture esercizio %} -->

<!-- ## 💪 Mostriamo le task completate e quelle ancora da fare con la gestione dello State

- Creiamo un nuovo pulsante "Aggiungi Task" usando il componente `Button` creato nella lezione precedente;
- Facciamo in modo che, quando viene cliccato, aggiunga una nuova task alla lista;
- La nuova task deve avere:

  - un id univoco;
  - un testo di default (es. "Nuova Task" oppure "");
  - lo stato `status` impostato a `pending` oppure `completed`:

```jsx
{
  id: 1,
  text: 'Comprare il latte',
  status: 'pending',
},
```

{% endcapture %}

{% include exercise_box.html content=esercizio %} -->
