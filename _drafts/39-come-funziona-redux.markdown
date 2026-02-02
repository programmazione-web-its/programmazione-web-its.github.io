---
layout: post
title: '#39. Come funziona Redux'
categories: lezioni
excerpt: Come Redux gestisce lo stato in un'applicazione React
featured_image:
---

## Il Central Data Store

Redux si basa su un **unico store centrale** per tutta l'applicazione. ☝️ Con _store_ intendiamo lo stato dell'applicazione.
All'interno di questo store possiamo salvare qualsiasi tipo di stato condiviso tra componenti, come ad esempio:

- stati di autenticazione (login/logout);
- tema dell'interfaccia (modalità chiara/scura);
- dati utente (nome, email, preferenze);
- dati di un carrello in un'app di e-commerce.

Anche se tutto lo stato in unico store può sembrare difficile da gestire, in realtà dobbiamo tenere a mente che **non dobbiamo manipolare lo stato direttamente**.

### Leggere i dati dallo store

Lo scopo dello store è rendere i dati accessibili a qualsiasi componente dell'applicazione. Per leggere i dati, i componenti si "iscrivono" (subscribe) allo store e ricevono gli aggiornamenti quando lo stato cambia.
I componenti ricevono i dati **di cui hanno bisogno** , accedendo solo alla parte dello store che li riguarda, senza manipolarlo direttamente.

### Aggiornare lo store

I dati dello store possono cambiare ma dobbiamo ricordarci che **i componenti non possono manipolare lo stato direttamente**.
Per aggiornare lo stato, Redux utilizza un sistema basato su **azioni (actions)** e **reducer**.

#### I Reducer

In modo simile a `useReducer` in React, i reducer sono funzioni pure che prendono lo stato attuale e un'azione come argomenti e restituiscono un nuovo stato.
Un reducer **non modifica** mai lo **stato esistente**, ma ne crea una **nuova copia**, sulla base dell'azione ricevuta.

#### Le Azioni

Per collegare i componenti al reducer, Redux utilizza le azioni. Analogamente al `dispatch` di `useReducer`, un'azione è un semplice oggetto JavaScript che descrive quale operazione deve eseguire il reducer. Lo store passa l'azione al reducer che legge l'oggetto e aggiorna lo stato di conseguenza.

Quindi, il flusso completo è:

1. Il componente fa il `dispatch` un’azione;
2. L’azione viene inviata al reducer;
3. Il reducer crea un nuovo stato;
4. Lo store aggiorna lo stato;
5. I componenti iscritti allo store ricevono il nuovo stato e si aggiornano di conseguenza.
