---
layout: post
title: '#38. Introduzione a Redux'
categories: lezioni
excerpt: Cos'è Redux e a cosa serve in un'applicazione React
featured_image:
---

{% capture standardcontent %}

# Cos'è Redux?

Redux è una libreria open-source per la gestione dello stato (_state management system_) pensato per gestire **stati condivisi** tra più componenti o stati a livello di applicazione (**app-wide state**).

In poche parole, Redux ci aiuta a gestire i dati che cambiano nel tempo e che influenzano ciò che viene mostrato sullo schermo, anche quando questi dati devono essere condivisi tra più parti dell’applicazione.

# Un passo indietro: lo stato in React

Abbiamo visto che in React lo stato può essere gestito con `useState` e `useReducer`.
Lo stato serve a memorizzare dati che cambiano nel tempo e a dire a React quando **aggiornare l’interfaccia utente (UI).**

Ogni volta che modifichiamo uno stato con setState, React sa che deve ridisegnare la parte dell’interfaccia che dipende da quel dato.

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Documentazione ufficiale di Redux](https://redux.js.org/introduction/getting-started)
  - 🔗 [Redux Best Practice](https://redux.js.org/style-guide/)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

### Tipi di stato

Possiamo distinguere tre principali tipi di stato (non ufficiali, ma molto utili per capire come organizzarli):

1. **Local state** → stato locale, legato a un singolo componente;
2. **Cross-component state** → stato condiviso tra più componenti;
3. **App-wide state** → stato condiviso da tutta l’applicazione.

#### Il Local State

È lo stato limitato a un solo componente.
Esempi:

- Il testo inserito in un input (`useState`per salvare i caratteri digitati);
- un pulsante che mostra o nasconde un dettaglio al click.

👉 Lo gestiamo normalmente con `useState` o, se più complesso, con `useReducer`.

#### Il Cross-Component State

A volte, più componenti devono collaborare per gestire uno stesso stato.

Esempio: un pulsante apre una modale (overlay), ma il pulsante e la modale sono in componenti diversi. Il pulsante “triggera” l’apertura, la modale gestisce la chiusura.

👉 Possiamo comunque usare `useState` , ma dobbiamo passare i dati e le funzioni come props tra vari componenti.
Questo meccanismo si chiama **prop drilling**.

Non è sbagliato, ma diventa più complesso quando i componenti coinvolti aumentano.

#### L'App-wide State

Alcuni stati influenzano gran parte o tutta l’applicazione.

Esempio:il login dell’utente. Se un utente effettua l’accesso:

- Cambia la barra di navigazione
- Alcune pagine mostrano più (o meno) contenuti

👉 Possiamo ancora usare `useState` o `useReducer`, ma dovremmo passare le props a tantissimi componenti e diventerebbe rapidamente difficile da gestire.

### Le possibili soluzioni: Context API vs Redux

La prima soluzione è usare la **Context API** di React per evitare il prop drilling.
La seconsa è usare **Redux**.

#### 🤔 Ma se esiste il Context, perché usare Redux?

Abbiamo visto che **React Context** può andare benissimo in molte situazioni, ma può anche presentare due problemi principali:

1. Struttura complessa e difficile da mantenere: quando l’app cresce, potremmo trovarci con tanti `Context.Provider` annidati o, al contrario, con un unico enorme provider che gestisce troppi stati diversi. Entrambe le soluzioni diventano difficili da gestire nel tempo;
2. Problemi di performance: React Context funziona bene quando lo stato cambia raramente (es. tema, autenticazione), ma non è pensato per stati che cambiano spesso (es. carrelli, input utente in tempo reale, liste che si aggiornano di frequente).
   Ogni volta che un valore nel Context cambia, tutti i componenti che lo consumano vengono rieseguiti, anche se a loro non serve il dato aggiornato — e questo può diventare pesante.

Quindi, quando l’applicazione diventa complessa e lo stato cambia frequentemente, Redux può essere una soluzione più adatta perché:

- Centralizza la gestione dello stato in un unico punto chiamato **store**;
- rende ogni aggiornamento dello stato più prevedibile e facile da tracciare;
- migliora le performance evitando riesecuzioni inutili dei componenti;
- offre strumenti avanzati per il debug e lo sviluppo, come Redux DevTools.

### I 3 principi fondamentali di Redux

Redux si basa su tre concetti chiave:

1. **Single Source of Truth (Un’unica fonte di verità)**: tutto lo stato della tua applicazione vive in un unico store globale. Questo elimina la necessità di creare decine di context diversi e rende più facile condividere i dati tra componenti;
2. **Lo stato è di sola lettura**: l’unico modo per cambiare lo stato è inviare un’**azione** (un oggetto che descrive cosa è successo) allo store. Questo rende le modifiche dello stato più prevedibili e tracciabili;
3. **Le modifiche sono effettuate con funzioni pure**: le azioni vengono “intercettate” dai reducers, che sono funzioni pure (cioè senza effetti collaterali) che ricevono lo stato attuale e l’azione, e restituiscono un nuovo stato aggiornato.
