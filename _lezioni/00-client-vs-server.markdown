---
layout: post
title: 'Lato client vs lato server'
date: 2025-09-03 16:48:45 +0200
categories: lezioni
excerpt: 'Qual è la differenza tra lato client e lato server'
featured_image: /assets/images/01.png
---

Capire la differenza tra lato client e lato server è fondamentale prima di addentrarsi nello sviluppo moderno del web, e in particolare nello studio di librerie come React.

Esempio pratico: quando digitiamo un indirizzo web (per esempio www.esempio.com), il browser invia una richiesta a un server remoto. Il server elabora la richiesta e risponde inviando risorse (HTML, dati, file). Il browser riceve queste risorse e le rende visibili all'utente. In questo scambio il **server è il fornitore delle informazioni, il client è il consumatore che le presenta.**

## Lato server

- Il server è il “lato nascosto” dell’applicazione: gestisce database, autenticazione, logiche di business e persistenza dei dati;
- riceve richieste dai client, le elabora (ad esempio interrogando un database) e restituisce risposte appropriate;
- può esporre API (ad esempio REST o GraphQL) che forniscono solo i dati grezzi, lasciando al client il compito di presentarli. Questo è il caso più comune nello sviluppo in React, dove il server si occupa di fornire dati e regole, mentre il client si occupa di mostrarli e renderli interattivi.

## Lato client

- Il client è ciò che gira nel browser dell'utente: HTML per la struttura, CSS per lo stile e JavaScript per l'interattività;
- con librerie come React, il client gestisce l'interfaccia e aggiorna il contenuto dinamicamente senza ricaricare tutta la pagina.

### Evoluzione: dal rendering server-side al client-side

In passato le pagine venivano spesso generate interamente dal server ad ogni navigazione (full page reload). Oggi molti progetti usano il client per aggiornare l'interfaccia in modo più fluido (Single Page Application, SPA). Tuttavia esistono approcci ibridi: il server può generare HTML iniziale (Server-Side Rendering, SSR) per migliorare SEO e tempo di prima visualizzazione, mentre il client prende il controllo dopo il caricamento (hydration).

## Per riassumere

Il server fornisce i dati e le regole, il client si occupa di mostrarli e renderli interattivi.

### ![Diagramma client-server](/assets/images/server-cliente.png)
