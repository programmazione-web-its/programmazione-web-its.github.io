---
layout: post
title: '#30. Introduzione al routing'
categories: lezioni
excerpt: Gestire la navigazione in una Single Page Application con React Router
featured_image:
---

Uno dei principi alla base di React è la possibilità di creare **Single Page Application (SPA)**, ovvero applicazioni web che caricano una singola pagina HTML e aggiornano dinamicamente il contenuto senza ricaricare l'intera pagina. Questo approccio migliora l'esperienza utente, rendendo le applicazioni più veloci e reattiva ma ha un limite importante: si perde la possibilità di navigare tra diverse pagine con URL distinti.

È qui che entra in gioco il **routing lato client**. Grazie al routing, possiamo mantenere i benefici di una Single Page Application e allo stesso tempo gestire diversi percorsi e URL, ognuno associato a una sezione o “pagina” dell’app.

## Che cos'è il routing lato client?

Per capire il routing, bisogna partire da come funziona normalmente il web.
Quando visiti un sito, puoi aggiungere un percorso all’indirizzo principale — ad esempio `/about` — e questo caricherà la pagina corrispondente. Se poi inserisci un URL diverso nella barra del browser o clicchi su un link che porta a `/products`, il browser caricherà un’altra pagina con contenuti diversi.

In poche parole, il routing serve a **mostrare contenuti diversi a seconda dell’URL**.

Tradizionalmente, il routing viene gestito dal **server**: ogni volta che si visita un nuovo URL, il browser invia una nuova **richiesta HTTP** e riceve una nuova pagina HTML. Questo approccio, tipico delle **multi-page application (MPA)**, funziona bene ma può rallentare l’esperienza utente, poiché ogni passaggio richiede un nuovo caricamento della pagina.

Le **Single Page Application (SPA)**, invece, inviano **un’unica richiesta iniziale** per ottenere la struttura **HTML di base** e il codice **JavaScript necessario**. Da quel momento in poi, è il JavaScript a gestire tutto ciò che l’utente vede, senza ricaricare l’intera pagina.

Grazie al routing lato client, possiamo creare l’illusione di un comportamento “multi-pagina”: il codice React può “osservare” l’URL corrente e, quando questo cambia, caricare e mostrare un componente diverso, senza richiedere una nuova pagina al server. In questo modo, **restiamo all’interno** di una Single Page Application ma possiamo comunque gestire **percorsi diversi e contenuti dinamici**, garantendo un’esperienza fluida e naturale.

## React Router: la libreria di routing più popolare

Sebbene sia possibile implementare il routing lato client da zero, la maggior parte degli sviluppatori React utilizza una libreria dedicata chiamata **React Router**. Questa libreria semplifica notevolmente la gestione del routing, offrendo componenti e hook che facilitano la definizione di percorsi, la navigazione tra di essi e l’accesso ai parametri dell’URL.
