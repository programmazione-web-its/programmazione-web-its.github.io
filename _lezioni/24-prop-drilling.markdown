---
layout: post
title: '#24. Prop Drilling e Context API'
categories: lezioni
excerpt: Risolvere il problema del prop drilling centralizzando lo stato con la Context API
featured_image:
---

Come abbiamo visto, in React le applicazioni sono costituite da molti componenti.
Più complessa è l'applicazione, più componenti saranno necessari per svilupparla.
I componenti sono organizzati in un albero (**component tree**), dove un componente principale può renderizzare componenti figli, che a loro volta possono avere ulteriori componenti annidati.

## Gestione dello stato

Nella maggior parte delle applicazioni, oltre ai componenti, è necessario gestire lo _stato_.
Molto spesso questo stato deve essere **elevato (“lifted up”)** a un componente genitore che abbia accesso a tutti i componenti che devono leggerlo o aggiornarlo.
L'elevazione avviene condividendo lo stato tramite **props** e passando funzioni come proprietà per consentire ai componenti figli di modificarlo.

## Il problema del prop drilling

Quando si condivide uno stato tra componenti annidati, spesso bisogna passare le props **attraverso più livelli**, anche se molti componenti intermedi **non usano direttamente** quei dati. Questo processo è chiamato **prop drilling** e comporta alcuni problemi:

1. **Riduce la riusabilità dei componenti**: i componenti intermedi diventano dipendenti dai dati passati dall'alto, anche se non gli servono direttamente, e possono essere usati solo in contesti specifici;
2. **Aumenta il boilerplate**: bisogna ricevere, destrutturare e inoltrare le props a più livelli anche se il componente non ne ha bisogno diretto.

### Esempio pratico

Prendiamo un'app di e-commerce con un carrello:

<img class="img-full-width" src="/assets/images/drilling.png" alt="React Logo" />

- Lo stato del carrello è gestito nel componente `App`;
- Il componente `App` passa i dati del carrello e le funzioni per aggiornarlo ai componenti `Header` e `Shop`;
- A loro volta, questi componenti inoltrano i dati ai componenti che li devono usare realmente, ad esempio un componente `CartModal` che mostra gli articoli nel carrello.

In questo modo, anche componenti che non hanno bisogno diretto dello stato devono comunque riceverlo tramite props per inoltrarlo.

Questo inoltro delle proprietà può diventare difficile da gestire in applicazioni grandi. Fortunatamente, esistono diverse soluzione:

- possiamo gestire la composizione dei componenti in modo da limitare il passaggio di props;
- oppure possiamo gestire lo stato condiviso in modo più **pulito e centralizzato** con la **Context API**.

## La React Context API

La **Context API** è una funzionalità integrata in React che rende molto semplice condividere dati tra componenti, anche attraverso più livelli dell’albero dei componenti.

### Come funziona

1. Si **crea un valore di contesto** che rappresenta i dati che vogliamo condividere;
2. si **fornisce** quel contesto, avvolgendo uno o più componenti all'interno di un provider del contesto;
3. si **connette** il **valore** del contesto **ad uno stato**: in questo modo lo stato condiviso e le funzioni per aggiornarlo diventano immediatamente disponibili a tutti i componenti che ne hanno bisogno, senza passare props manualmente.
